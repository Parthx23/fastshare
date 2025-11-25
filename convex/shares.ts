import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { encrypt, decrypt, sanitizeText } from "./encryption";

/* ------------------------------- Helpers ------------------------------- */

function generateToken(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function validateFileSize(fileData: string): boolean {
  const sizeInBytes = (fileData.length * 3) / 4;
  return sizeInBytes <= 50 * 1024 * 1024;
}

/* ------------------------------- Create Share ------------------------------- */

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
    const expiresAt = args.expiresAt || now + 3600 * 1000;

    let dataToEncrypt: string;
    let fileSize: number | undefined;

    if (args.type === "file") {
      if (!args.fileData) throw new Error("File data required");
      if (!validateFileSize(args.fileData)) throw new Error("File exceeds 10MB");

      dataToEncrypt = args.fileData;
      fileSize = (args.fileData.length * 3) / 4;
    } else {
      if (!args.text) throw new Error("Text required");
      dataToEncrypt = sanitizeText(args.text);
    }

    let token = generateToken();
    while (
      await ctx.db
        .query("shares")
        .withIndex("by_token", (q) => q.eq("token", token))
        .first()
    ) {
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

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    return { token, url: `${baseUrl}/${token}`, shareId };
  },
});

/* ------------------------------- Fetch Share ------------------------------- */

export const fetchShare = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const share = await ctx.db
      .query("shares")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!share || Date.now() > share.expiresAt) return null;

    const decryptedData = decrypt(share.encryptedData);

    if (share.type === "file") {
      return {
        type: "file",
        filename: share.filename,
        fileType: share.fileType,
        fileSize: share.fileSize,
        fileData: decryptedData,
        createdAt: share.createdAt,
        expiresAt: share.expiresAt,
      };
    }

    return {
      type: "text",
      text: decryptedData,
      createdAt: share.createdAt,
      expiresAt: share.expiresAt,
    };
  },
});

/* ------------------------------- Cleanup ------------------------------- */

export const deleteExpiredShares = mutation({
  handler: async (ctx) => {
    const now = Date.now();
    const expired = await ctx.db
      .query("shares")
      .withIndex("by_expiry")
      .filter((q) => q.lt(q.field("expiresAt"), now))
      .collect();

    for (const share of expired) {
      await ctx.db.delete(share._id);
    }

    return { deleted: expired.length };
  },
});
