export async function load({ fetch }) {
	const res = await fetch('https://bcdbackend.onrender.com/levels');
	const data = await res.json();

	const demonList = data.map((level) => ({
		name: level.name,
		creator: level.creator,
		completedBy: level.completedBy,
		video: `https://www.youtube.com/watch?v=${level.videoId}`, // Constructing video URL
		levelId: level.levelId // Include levelId for navigation
	}));

	return {
		demonList
	};
}
