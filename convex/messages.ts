import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";
import { v } from "convex/values";

export const list = query(async (ctx): Promise<Doc<"messages">[]> => {
  return await ctx.db.query("messages").collect();
});

export const send = mutation({
  args: {
    body: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { body } = args;
    await ctx.db.insert("messages", { body });
  },
});
