import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import User from "@/backend/models/user";
import dbConnect from "@/config/dbConnect";

export default NextAuth({
	adapter: MongoDBAdapter(clientPromise),
	session: {
		strategy: "jwt",
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		CredentialsProvider({
			name: "Credentials",
			async authorize(credentials) {
				dbConnect();
				const { email, password } = credentials;

				// Checks
				if (!email || !password) {
					throw new Error("Please enter email and password");
				}
				// Find user in db
				const user = await User.findOne({ email }).select("+password");
				if (!user) {
					throw new Error("Invalid email or password");
				}

				// Check if password is correct
				const isPasswordMatching = await user.comparePassword(password);
				if (!isPasswordMatching) {
					throw new Error("Invalid email or password");
				}
				return Promise.resolve(user);
			},
		}),
	],
	secret: process.env.JWT_SECRET,
	callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user);
			return Promise.resolve(token);
		},
		async session({ session, user, token }) {
			const userFromDatabase = await User.findOne({ email: token.user.email });
			// session.user = token.user;
			session.user = userFromDatabase;
			return Promise.resolve(session);
		},
	},
	events: {
		async createUser(message) {
			// Find user in db
			const user = await User.findOne({ email: message.user.email });
			if (!user) {
				throw new Error("Invalid email or password");
			}
			user.role = "user";
			user.credits = 3;

			await user.save();
		},
	},
});
