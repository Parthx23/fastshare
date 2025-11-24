import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { encrypt, decrypt, sanitizeText } from "./encryption";

function generateToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function validateFileSize(fileData: string): boolean {
  // Base64 encoded size check (10MB limit)
  const sizeInBytes = (fileData.length * 3) / 4;
  return sizeInBytes <= 10 * 1024 * 1024; // 10MB
}

export const createShare = mutation({
  args: {
    type: v.union(v.literal("text"), v.literal("file")),
    text: v.optional(v.string()),
    filename: v.optional(v.string()),
    fileData: v.optional(v.string()),
    fileType: v.optional(v.string()),
    expiresAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const expiresAt = args.expiresAt || (now + (60 * 60 * 1000)); // 1 hour default
    
    let dataToEncrypt: string;
    let fileSize: number | undefined;
    
    if (args.type === "file") {
      if (!args.fileData) throw new Error("File data required for file type");
      if (!validateFileSize(args.fileData)) {
        throw new Error("File size exceeds 10MB limit");
      }
      dataToEncrypt = args.fileData;
      fileSize = (args.fileData.length * 3) / 4;
    } else {
      if (!args.text) throw new Error("Text required for text type");
      dataToEncrypt = sanitizeText(args.text);
    }
    
    let token = generateToken();
    
    // Ensure token is unique
    while (await ctx.db.query("shares").withIndex("by_token", q => q.eq("token", token)).first()) {
      token = generateToken();
    }
    
    const encryptedData = encrypt(dataToEncrypt);
    
    const shareId = await ctx.db.insert("shares", {
      token,
      type: args.type,
      encryptedData,
      filename: args.filename,
      fileType: args.fileType,
      fileSize,
      createdAt: now,
      expiresAt,
    });
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    
    return { 
      token, 
      url: `${baseUrl}/${token}`,
      shareId 
    };
  },
});

export const fetchShare = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const share = await ctx.db
      .query("shares")
      .withIndex("by_token", q => q.eq("token", args.token))
      .first();
    
    if (!share || Date.now() > share.expiresAt) {
      return null; // 404 equivalent
    }
    
    const decryptedData = decrypt(share.encryptedData);
    
    if (share.type === "file") {
      return {
        type: "file",
        filename: share.filename,
        fileType: share.fileType,
        fileSize: share.fileSize,
        fileData: decryptedData, // Base64 data for download
        createdAt: share.createdAt,
        expiresAt: share.expiresAt,
      };
    } else {
      return {
        type: "text",
        text: decryptedData,
        createdAt: share.createdAt,
        expiresAt: share.expiresAt,
      };
    }
  },
});

// Legacy query for backward compatibility
export const getShare = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const result = await ctx.runQuery("shares:fetchShare", { token: args.token });
    if (!result) return null;
    
    // Convert to legacy format
    return {
      token: args.token,
      content: result.type === "text" ? result.text : result.fileData,
      filename: result.type === "file" ? result.filename : undefined,
      fileType: result.type === "file" ? result.fileType : undefined,
      createdAt: result.createdAt,
      expiresAt: result.expiresAt,
    };
  },
});

export const deleteExpiredShares = mutation({
  handler: async (ctx) => {
    const now = Date.now();
    const expiredShares = await ctx.db
      .query("shares")
      .withIndex("by_expiry")
      .filter(q => q.lt(q.field("expiresAt"), now))
      .collect();
    
    for (const share of expiredShares) {
      await ctx.db.delete(share._id);
    }
    
    return { deleted: expiredShares.length };
  },
});