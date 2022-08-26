import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";

const Home: NextPage = () => {
	const { data, status } = useSession();

	return (
		<>
			<Head>
				<title>Worstify</title>
				<meta name="description" content="Get BAD recommendations" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>Worstify</div>
			{data ? (
				<div>{data.user?.email}</div>
			) : (
				<button onClick={() => signIn("spotify")}>Log In With Spotify</button>
			)}
		</>
	);
};

export default Home;
