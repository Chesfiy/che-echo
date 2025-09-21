import { mutation, query } from "./_generated/server";

export const getMany = query({
    args: {
    },
    handler: async (ctx) => {
        const users = await ctx.db.query("users").collect();

        return users;
    },
});

export const ad = mutation({
    args: {
    },
    handler: async (ctx, args) => {
        
        const identity = await ctx.auth.getUserIdentity();

            if (identity === null) {
            throw new Error("Not authenticated");
        }

        const userId = await ctx.db.insert("users", { name: "Frank" });

        return userId;
    },
});