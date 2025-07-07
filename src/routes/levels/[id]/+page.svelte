<script>
	import { goto } from '$app/navigation';
	export let data;
	const { level } = data;

	function goBack() {
		goto('/');
	}
</script>

<svelte:head>
	<title>{level.name} - Burned Chicken Demonlist</title>
	<meta
		name="description"
		content="{level.name} by {level.creator}, completed by {level.completedBy}"
	/>
</svelte:head>

<div class="level-detail-container">
	<div class="level-detail-content">
		<button class="back-button" on:click={goBack}>← Back to List</button>
		<h1>{level.name}</h1>
		<p class="creator">by {level.creator}</p>
		<p class="completed-by">Completed by: {level.completedBy}</p>
		<p class="rank">Rank: #{level.rank}</p>
		<p class="level-id">Level ID: {level.levelId}</p>

		{#if level.video}
			<div class="video-container">
				<iframe
					src="https://www.youtube.com/embed/{level.video.match(
						/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/
					)[1]}"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
					title="YouTube video player"
				></iframe>
			</div>
		{/if}
	</div>
</div>

<style>
	@font-face {
		font-family: 'Pusab';
		src: url('/themes/default_cubes/pusab.otf') format('opentype');
		font-weight: normal;
		font-style: normal;
	}

	.level-detail-container {
		width: 100%;
		max-width: 1000px;
		margin: 0 auto;
		padding: 2rem;
		box-sizing: border-box;
	}

	.level-detail-content {
		background: rgba(30, 30, 30, 0.9);
		border-radius: 24px;
		padding: 2rem;
		color: white;
		box-sizing: border-box;
	}

	h1 {
		font-family: 'Pusab', Arial, sans-serif;
		letter-spacing: 0.08em;
		color: var(--primary-color, #4a90e2);
		margin-top: 0;
		margin-bottom: 1rem;
		font-size: 2.5rem;
		-webkit-text-stroke: 4px #000;
		-webkit-text-fill-color: #fff;
		paint-order: stroke fill;
		text-align: center;
	}

	.creator,
	.completed-by,
	.rank,
	.level-id {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
	}

	.creator {
		color: #bbb;
		font-style: italic;
	}

	.completed-by {
		color: #4a90e2;
		font-weight: 500;
	}

	.rank {
		color: #e74c3c;
		font-weight: 600;
	}

	.level-id {
		color: #95a5a6;
		font-size: 0.9rem;
	}

	.back-button {
		background: rgba(74, 144, 226, 0.8);
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 12px;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-bottom: 1rem;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.back-button:hover {
		background: rgba(74, 144, 226, 1);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
	}

	.back-button:active {
		transform: translateY(0);
	}

	.video-container {
		position: relative;
		width: 100%;
		padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
		height: 0;
		margin-top: 1rem;
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 12px;
	}

	@media (max-width: 768px) {
		.level-detail-container {
			padding: 1rem 0.5rem;
		}

		.level-detail-content {
			padding: 1.5rem 1rem;
			border-radius: 16px;
		}

		h1 {
			font-size: 1.8rem;
		}

		.creator,
		.completed-by,
		.rank,
		.level-id {
			font-size: 1rem;
			text-align: center;
		}

		.back-button {
			width: 100%;
			padding: 1rem;
			font-size: 1.1rem;
			margin-bottom: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.level-detail-container {
			padding: 0.5rem 0.25rem;
		}

		.level-detail-content {
			padding: 1rem 0.75rem;
			border-radius: 12px;
		}

		h1 {
			font-size: 1.5rem;
			margin-bottom: 1.5rem;
		}

		.creator,
		.completed-by,
		.rank,
		.level-id {
			font-size: 0.9rem;
			margin-bottom: 0.75rem;
		}

		.video-container {
			margin-top: 1.5rem;
		}

		.back-button {
			padding: 0.875rem;
			font-size: 1rem;
			border-radius: 8px;
		}
	}
	:global(html) {
		scroll-behavior: smooth;
		-webkit-tap-highlight-color: transparent;
		overflow-x: hidden;
	}

	:global(*) {
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	:global(input, textarea, select) {
		-webkit-user-select: auto;
		-khtml-user-select: auto;
		-moz-user-select: auto;
		-ms-user-select: auto;
		user-select: auto;
	}
</style>
