import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectToDB();
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
        return session;
      } catch (error) {
        console.error("Error fetching session user:", error);
        return session;
      }
    },
    async signIn({ user }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: user.email });

        if (!userExists) {
          const newUser = new User({
            username: user.name,
            email: user.email,
            image: user.image,
          });
          await newUser.save();
        }
        return true;
      } catch (error) {
        console.error("Error checking if user exists:", error.message);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
