import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  shares: defineTable({
    token: v.string(),
    type: v.union(v.literal("text"), v.literal("file")),
    encryptedData: v.string(),
    filename: v.optional(v.string()),
    fileType: v.optional(v.string()),
    fileSize: v.optional(v.number()),
    createdAt: v.number(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]).index("by_expiry", ["expiresAt"]),
});