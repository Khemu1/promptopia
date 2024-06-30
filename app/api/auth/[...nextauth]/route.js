import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@utils/database";
import { User } from "@models/user";

// making a handler to handle authentication

console.log("checkinfg Auth");

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    /**
     * The part where the session user's email is assigned to the session happens automatically when the session is created by NextAuth.
     * When a user logs in successfully, NextAuth creates a session and includes basic user information, such as the user's email,in the session object.
     * This basic information is derived from the authentication provider (e.g., Google) and is included in the JWT (JSON Web Token) that NextAuth manages.
     */
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      if (sessionUser) session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectDB();
        /**
         * need to check if the user already exists, if not create a new user
         */
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "_").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export { handler as GET, handler as POST };
