import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import User from "@/backend/models/user";
import dbConnect from "@/lib/dbConnect";

export default NextAuth({
	adapter: MongoDBAdapter(clientPromise),
	session: {
		strategy: "jwt",
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
			clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
			httpOptions: {
				timeout: 80000,
			},
		}),
		GithubProvider({
			clientId: process.env.GITHUB_OAUTH_CLIENT_ID,
			clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: "Credentials",
			async authorize(credentials) {
				await dbConnect();
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
			await dbConnect();
			const userFromDatabase = await User.findOne({ email: token.user.email });
			// session.user = token.user;
			session.user = userFromDatabase;
			return Promise.resolve(session);
		},
	},
	events: {
		async createUser(message) {
			await dbConnect();
			// Find user in db
			const user = await User.findOne({ email: message.user.email });
			if (!user) {
				throw new Error("Invalid email or password");
			}
			user.role = "user";
			// Default credits
			user.credits = 10;
			await user.save();
		},
	},
});
