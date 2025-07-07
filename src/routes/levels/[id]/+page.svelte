<script>
	import { onMount, onDestroy } from 'svelte';
	import { navigateToHome } from '$lib/navigationHandler.js';
	import { stopLoading } from '$lib/stores/loading.js';

	export let data;
	const { level } = data;

	let completions = [];
	let loading = true;
	let error = null;
	let mounted = false;
	let buttonLoading = false;

	onMount(async () => {
		mounted = true;

		try {
			const response = await fetch(
				`https://bcdbackend.onrender.com/api/levels/${level.levelId}/completions`
			);

			if (response.ok) {
				const data = await response.json();
				completions = data.sort(
					(a, b) => new Date(a.completion_date) - new Date(b.completion_date)
				);
			} else {
				error = 'Failed to fetch completions';
			}
		} catch (err) {
			error = 'Error fetching completions';
		} finally {
			loading = false;
			// Stop the navigation loading
			stopLoading();
		}
	});

	onDestroy(() => {
		mounted = false;
	});

	async function handleBackClick() {
		if (buttonLoading) return;
		buttonLoading = true;
		await navigateToHome();
		buttonLoading = false;
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
		<div class="back-button-container">
			<button
				class="back-button"
				class:loading={buttonLoading}
				on:click={handleBackClick}
				disabled={buttonLoading}
			>
				{#if buttonLoading}
					<div class="button-spinner"></div>
				{:else}
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M19 12H5" />
						<path d="M12 19l-7-7 7-7" />
					</svg>
				{/if}
				Back to List
			</button>
		</div>
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
		<div class="other-completions">
			<h2>Records</h2>
			{#if loading}
				<p>Loading completions...</p>
			{:else if error}
				<p>{error}</p>
			{:else if completions.length === 0}
				<p>There's no completions</p>
			{:else}
				<div class="table-container">
					<table>
						<thead>
							<tr>
								<th>Player</th>
								<th>Video</th>
							</tr>
						</thead>
						<tbody>
							{#each completions as completion}
								<tr>
									<td>{completion.player_name}</td>
									<td>
										{#if completion.videoId}
											<a
												href="https://www.youtube.com/watch?v={completion.videoId}"
												target="_blank"
												rel="noopener"
											>
												Watch
											</a>
										{:else}
											N/A
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
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

	.back-button-container {
		margin-bottom: 1rem;
	}

	.back-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: rgba(74, 144, 226, 0.1);
		border: 2px solid var(--primary-color, #4a90e2);
		border-radius: 12px;
		color: var(--primary-color, #4a90e2);
		font-family: 'Pusab', Arial, sans-serif;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.back-button:hover {
		background: rgba(74, 144, 226, 0.2);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
	}

	.back-button:active {
		transform: translateY(0);
		box-shadow: 0 2px 8px rgba(74, 144, 226, 0.2);
	}

	.back-button svg {
		transition: transform 0.3s ease;
	}

	.back-button:hover svg {
		transform: translateX(-2px);
	}

	.back-button.loading {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.back-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.button-spinner {
		width: 20px;
		height: 20px;
		border: 2px solid rgba(74, 144, 226, 0.3);
		border-top: 2px solid var(--primary-color, #4a90e2);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
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
		width: 100%;
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

		.back-button {
			font-size: 0.9rem;
			padding: 0.6rem 1.2rem;
		}
	}

	.other-completions {
		margin-top: 2rem;
	}

	.other-completions h2 {
		font-family: 'Pusab', Arial, sans-serif;
		color: var(--primary-color, #4a90e2);
		margin-bottom: 1rem;
		font-size: 1.8rem;
		text-align: center;
	}

	.table-container {
		overflow-x: auto;
		border-radius: 12px;
		background: rgba(25, 25, 25, 0.9);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		min-width: 300px;
	}

	th,
	td {
		padding: 0.75rem;
		text-align: left;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	th {
		background: rgba(15, 15, 15, 0.9);
		font-weight: bold;
		color: var(--primary-color, #4a90e2);
	}

	td {
		color: white;
	}

	tr:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	a {
		color: var(--primary-color, #4a90e2);
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
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

		.other-completions h2 {
			font-size: 1.5rem;
		}

		th,
		td {
			padding: 0.5rem;
			font-size: 0.9rem;
		}

		.back-button {
			font-size: 0.85rem;
			padding: 0.5rem 1rem;
			gap: 0.3rem;
		}

		.back-button svg {
			width: 16px;
			height: 16px;
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
