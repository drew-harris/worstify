import { trpc } from "../utils/trpc";

export default function RecommendationsPage() {
	const { data, error } = trpc.useQuery(["spotify.my-top-song"]);
	return (
		<div>
			<h1>Recommendations</h1>
			<p>This is the page where you can see the recommendations for you.</p>
			{data && <div>{data.name}</div>}
		</div>
	);
}
