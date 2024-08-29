import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { ResendOTP } from "./otp/ResendOTP";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Password,
    Password({
      id: "password-code",
      verify: ResendOTP,
    }),
  ],
  // callbacks: {
  //   // `args` are the same the as for `createOrUpdateUser` but include `userId`
  //   async afterUserCreatedOrUpdated(ctx, args) {
  //     console.log(args);
  //     await ctx.db.insert("users", { userId: args.userId, name: "some data" });
  //   },
  // },
  callbacks: {
    async redirect({ redirectTo }) {
      // Check that `redirectTo` is valid
      // and return the relative or absolute URL
      // to redirect to.
      return redirectTo;
    },
  },
});
