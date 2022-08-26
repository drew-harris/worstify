import { createProtectedRouter } from "./protected-router";

export const spotifyRouter = createProtectedRouter()
	.middleware(async ({ ctx, next }) => {
		try {
			const account = await ctx.prisma.account.findFirst({
				where: {
					userId: ctx.session.user.id,
				},
			});
			if (!account) {
				throw new Error("Account not found");
			}
			return next({
				ctx: {
					...ctx,
					accessToken: account?.access_token,
				},
			});
		} catch (error: any) {
			throw new Error("Spotify error");
		}
	})
	.query("my-top-song", {
		async resolve({ ctx }) {
			console.log("Fetching top song, access token:", ctx.accessToken);
			try {
				const response = await fetch(
					"https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=1",
					{
						headers: {
							Authorization: `Bearer ${ctx.accessToken}`,
						},
					}
				);
				console.log(response);
				const data = await response.json();
				return data.items[0] as SpotifyApi.TrackObjectFull;
			} catch (error: any) {
				console.error(error.message);
			}
		},
	});
