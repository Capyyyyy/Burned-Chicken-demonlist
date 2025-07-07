<script>
	export let data;
	const { level } = data;
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
		<h1>#{level.rank} - {level.name}</h1>
		<p class="completed-by">Completed by: {level.completedBy}, published by {level.creator}</p>
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
		<div class="other-info">
			<div class="level-id">
				<p>ID: {level.levelId}</p>
			</div>
		</div>
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
		padding: 0 2rem;
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

	.completed-by {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		font-weight: bold;
		opacity: 75%;
	}

	.other-info {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 1.1rem;
		font-weight: bold;
	}

	.level-id {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 1.1rem;
		font-weight: bold;
		background-color: rgba(25, 25, 25, 0.9);
		border-radius: 12px;
		max-width: 15rem;
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

		.completed-by {
			font-size: 1rem;
			text-align: center;
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

		.completed-by {
			font-size: 0.9rem;
			margin-bottom: 0.75rem;
		}

		.video-container {
			margin-top: 1.5rem;
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
