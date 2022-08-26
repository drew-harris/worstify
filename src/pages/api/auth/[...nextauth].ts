import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import SpotifyProvider from "next-auth/providers/spotify";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
	// Include user.id on session
	callbacks: {
		session({ session, user }) {
			if (session.user) {
				session.user.id = user.id;
			}
			return session;
		},
	},
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	providers: [
		// DiscordProvider({
		//   clientId: env.DISCORD_CLIENT_ID,
		//   clientSecret: env.DISCORD_CLIENT_SECRET,
		// }),
		SpotifyProvider({
			clientId: env.SPOTIFY_CLIENT_ID,
			clientSecret: env.SPOTIFY_CLIENT_SECRET,
			authorization: {
				params: {
					scope: "user-top-read",
				},
			},
		}),

		// ...add more providers here
	],
};

export default NextAuth(authOptions);
