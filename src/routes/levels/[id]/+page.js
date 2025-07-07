import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const levelId = params.id;

	// Fetch all levels from the API
	const res = await fetch('https://bcdbackend.onrender.com/levels');
	const data = await res.json();

	// Find the specific level by levelId
	const level = data.find((level) => level.levelId.toString() === levelId);

	if (!level) {
		throw error(404, `Level with ID ${levelId} not found`);
	}

	// Transform the data to match the expected format
	const levelData = {
		...level,
		video: `https://www.youtube.com/watch?v=${level.videoId}`
	};

	return {
		level: levelData
	};
}
