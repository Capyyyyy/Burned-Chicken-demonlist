<script>
	// import ColorThief from 'color-thief-browser';
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	// Removed SquicicleDetail import as we're using navigation instead

	export let levels = [];

	let clickedLevelId = null;

	// Navigation function for level details
	function navigateToLevel(levelId) {
		goto(`/levels/${levelId}`);
	}

	async function handleLevelNavigation(levelId) {
		// Prevent multiple clicks
		if (clickedLevelId === levelId) return;

		clickedLevelId = levelId;

		// Use navigation handler with loading
		await navigateToLevel(levelId);

		// Reset clicked state after navigation
		setTimeout(() => {
			clickedLevelId = null;
		}, 1000);
	}

	// Function to extract YouTube video ID and generate thumbnail URL
	function getYouTubeThumbnail(url) {
		const videoIdMatch = url.match(
			/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/
		);
		if (videoIdMatch && videoIdMatch[1]) {
			return `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`;
		}
		return ''; // Return empty string if no valid video ID found
	}

	// Reactive store for dominant colors
	let dominantColors = {}; // Use `let` for reactivity
	let imageLoadingStates = {}; // Track loading states
	let imageErrorStates = {}; // Track error states
	let cleanupInterval; // Store interval reference
	let observer; // Store MutationObserver reference

	async function extractDominantColor(imgElement, videoUrl) {
		// Temporarily disabled ColorThief to test canvas issue
		try {
			// Just use a fallback color instead of extracting
			dominantColors = { ...dominantColors, [videoUrl]: 'rgba(255, 255, 255, 0.237)' };
		} catch (error) {
			console.error('Error setting dominant color:', error);
			dominantColors = { ...dominantColors, [videoUrl]: 'rgba(255, 255, 255, 0.237)' }; // Fallback
		}
	}

	function handleImageLoad(videoUrl) {
		imageLoadingStates = { ...imageLoadingStates, [videoUrl]: false };
	}

	function handleImageError(videoUrl) {
		imageErrorStates = { ...imageErrorStates, [videoUrl]: true };
		imageLoadingStates = { ...imageLoadingStates, [videoUrl]: false };
	}

	function handleImageStart(videoUrl) {
		imageLoadingStates = { ...imageLoadingStates, [videoUrl]: true };
		imageErrorStates = { ...imageErrorStates, [videoUrl]: false };
	}

	// Aggressive cleanup function to remove any canvas elements
	function cleanupCanvasElements() {
		if (browser) {
			const canvasElements = document.querySelectorAll('canvas');
			canvasElements.forEach((canvas) => {
				// Remove any canvas that's not part of the main content
				if (
					canvas.parentNode === document.body ||
					!canvas.closest('.level-table-container') ||
					canvas.style.display === 'none' ||
					canvas.offsetParent === null
				) {
					canvas.remove();
					console.log('Removed stray canvas element');
				}
			});
		}
	}

	// Setup aggressive canvas monitoring
	function setupCanvasMonitoring() {
		if (browser) {
			// Periodic cleanup every 2 seconds
			cleanupInterval = setInterval(() => {
				cleanupCanvasElements();
			}, 2000);

			// MutationObserver to catch canvas elements as they're added
			observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					mutation.addedNodes.forEach((node) => {
						if (node.nodeType === Node.ELEMENT_NODE) {
							if (node.tagName === 'CANVAS') {
								// Remove canvas immediately if it's not in our container
								if (!node.closest('.level-table-container')) {
									node.remove();
									console.log('Removed canvas via MutationObserver');
								}
							}
							// Also check child elements
							const childCanvases = node.querySelectorAll && node.querySelectorAll('canvas');
							if (childCanvases) {
								childCanvases.forEach((canvas) => {
									if (!canvas.closest('.level-table-container')) {
										canvas.remove();
										console.log('Removed child canvas via MutationObserver');
									}
								});
							}
						}
					});
				});
			});

			// Start observing
			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		}
	}

	// Setup monitoring when component mounts
	onMount(() => {
		setupCanvasMonitoring();
		// Initial cleanup
		cleanupCanvasElements();
	});

	// Clean up on component destroy
	onDestroy(() => {
		cleanupCanvasElements();
		if (cleanupInterval) {
			clearInterval(cleanupInterval);
		}
		if (observer) {
			observer.disconnect();
		}
	});

	// Removed modal functions as we're using navigation instead
</script>

<div class="level-table-container">
	<table>
		<tbody>
			{#each levels as level, index (level.levelId)}
				<tr class="level-row" style="--thumbnail-url: url('{getYouTubeThumbnail(level.video)}');">
					<td
						class="level-cell"
						class:loading={clickedLevelId === level.levelId}
						style="--dominant-color: {dominantColors[level.video] || 'rgba(255, 255, 255, 0.237)'};"
						on:click={() => handleLevelNavigation(level.levelId)}
					>
						{#if level.video}
							<div class="thumbnail-preview">
								{#if imageLoadingStates[level.video]}
									<div class="image-loading">
										<div class="loading-spinner"></div>
									</div>
								{:else if imageErrorStates[level.video]}
									<div class="image-error">
										<span>🎬</span>
									</div>
								{:else}
									<img
										src={getYouTubeThumbnail(level.video)}
										alt="YouTube Thumbnail"
										on:load={(e) => {
											extractDominantColor(e.target, level.video);
											handleImageLoad(level.video);
										}}
										on:error={() => handleImageError(level.video)}
										on:loadstart={() => handleImageStart(level.video)}
									/>
								{/if}
							</div>
						{/if}
						<div class="level-info">
							<span class="position">{index + 1}.</span>
							<span class="level-name">{level.name}</span>
							<span class="creator">by {level.creator}</span>
							<span class="completedBy">{level.completedBy}</span>
						</div>
						{#if clickedLevelId === level.levelId}
							<div class="loading-indicator">
								<div class="mini-spinner"></div>
								<span>Loading...</span>
							</div>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<!-- Removed modal component as we're using navigation instead -->

<style>
	.level-table-container {
		width: 100%;
		max-width: 1200px; /* Limit max width on larger screens */
		overflow-x: auto;
		margin: -1.5rem auto; /* Center the container */
		padding: 0 1rem; /* Add some horizontal padding */
	}

	table {
		width: 80%;
		border-collapse: separate;
		color: var(--text-color, #333333);
		border-spacing: 0 20px; /* Adjusted spacing between rows */
	}

	.level-cell {
		display: flex; /* Use flexbox for the table cell */
		align-items: center; /* Vertically align items in the cell */
		justify-content: flex-start; /* Align content to the left */
		background: rgba(30, 30, 30, 0.02); /* More transparent background to let ambient effect show */
		border-radius: 24px; /* Apply border-radius to the single cell */
		backdrop-filter: blur(4px) saturate(150%); /* macOS-like blur with adjusted intensity and saturation */
		-webkit-backdrop-filter: blur(8px) saturate(150%); /* For Safari */
		border: 1px solid rgba(255, 255, 255, 0.237); /* Use dominant color for border */
		position: relative; /* Needed for absolute positioning of pseudo-element */
		overflow: hidden; /* Hide overflow from blurred background */
		box-shadow: 0 0 15px rgba(255, 255, 255, 0.237); /* Neon effect */
		transition:
			border-color 0.3s ease,
			box-shadow 0.3s ease,
			transform 0.2s ease; /* Smooth transition */
		cursor: pointer; /* Indicate clickable */
		-webkit-tap-highlight-color: transparent;
		touch-action: manipulation;
	}

	.level-cell::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: var(--thumbnail-url);
		background-size: cover;
		background-position: center;
		filter: blur(30px) brightness(0.7); /* Adjust blur and brightness as needed */
		opacity: 0.5; /* Adjust opacity for the ambient effect */
		z-index: -1; /* Place behind content */
		transition: opacity 0.3s ease; /* Smooth transition for hover */
		border-radius: 24px; /* Match parent border-radius */
	}

	.level-row:hover .level-cell::before {
		opacity: 0.7; /* Slightly more visible on hover */
	}

	.level-info {
		color: white !important;
		display: flex;
		flex-direction: column; /* Stack items vertically by default */
		align-items: flex-start; /* Align items to the start */
		gap: 0.2rem; /* Smaller space between stacked elements */
		padding: 0.5rem 1rem; /* Add padding to info block */
		flex-grow: 1; /* Allow info to take available space */
	}

	.position {
		font-weight: 700; /* Bolder for position */
		color: var(--primary-color, #4a90e2); /* Highlight position number */
		min-width: 30px; /* Ensure consistent width for position */
	}

	.level-name {
		font-family: 'Pusab', Arial, sans-serif;
		letter-spacing: 0.08em;
		font-weight: 600;
		font-size: 1.1em; /* Slightly larger font for level name */
		color: var(--heading-color, #ececec);
		-webkit-text-stroke: 4px #000;
		-webkit-text-fill-color: #fff;
		paint-order: stroke fill;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
	}

	.creator {
		color: var(--text-color-light, #f2f2f2);
		font-size: 0.9em;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
	}

	.completedBy {
		color: var(--text-color-light, #f2f2f2);
		font-size: 0.9em;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
	}

	.level-row {
		transition: transform 0.3s ease;
	}

	.level-row:hover {
		transform: translateY(-5px); /* Lift effect on hover */
	}

	.level-cell:active {
		transform: scale(0.98);
		transition: transform 0.1s ease;
	}

	/* Add a subtle glow on hover */
	.level-row:hover .level-cell {
		box-shadow:
			0 0 25px var(--dominant-color, rgba(255, 255, 255, 0.237)),
			0 0 40px var(--dominant-color, rgba(255, 255, 255, 0.237));
	}

	.level-cell.loading {
		opacity: 0.8;
		pointer-events: none;
	}

	.level-cell.loading::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(74, 144, 226, 0.1);
		border-radius: 24px;
		animation: pulse 1s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.5;
		}
		50% {
			opacity: 1;
		}
	}

	.level-row:hover td {
		background: var(--hover-bg-color, #ffffff07);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* More pronounced shadow on hover */
	}

	.thumbnail-preview {
		aspect-ratio: 16/9;
		margin-right: 1rem; /* Space between content and thumbnail */
		flex-shrink: 0; /* Prevent thumbnail from shrinking */
		display: flex; /* Use flexbox for centering */
		align-items: center; /* Center vertically */
		justify-content: center; /* Center horizontally */
	}

	.thumbnail-preview img {
		aspect-ratio: 16/9;
		object-fit: cover;
		width: 100%; /* Default to 100% width */
		height: auto; /* Maintain aspect ratio */
		border-radius: 24px 0 0 24px;
		display: block;
		max-width: 300px; /* Max width for PC */
		min-width: 120px; /* Min width for PC */
	}

	.image-loading,
	.image-error {
		aspect-ratio: 16/9;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 24px 0 0 24px;
		min-width: 120px;
		max-width: 300px;
		width: 100%;
		color: white;
	}

	.loading-spinner {
		width: 24px;
		height: 24px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top: 2px solid white;
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

	.image-error span {
		font-size: 2rem;
		opacity: 0.7;
	}

	.loading-indicator {
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--primary-color, #4a90e2);
		font-size: 0.9rem;
		font-weight: 600;
		z-index: 1;
	}

	.mini-spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
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

	/* PC/Tablet styles (larger screens) */
	@media (min-width: 769px) {
		.level-info {
			flex-direction: row; /* Row layout on larger screens */
			align-items: center;
			gap: 1rem;
		}
	}

	/* Mobile styles */
	@media (max-width: 768px) {
		:global(html),
		:global(body) {
			overflow-x: hidden;
		}
		.level-table-container {
			width: 92%;
			max-width: 100%;
			overflow-x: auto;
			box-sizing: border-box;
			margin: 0 auto;
			padding: 0 0.5rem;
			-webkit-overflow-scrolling: touch;
		}
		table {
			width: 100%;
			max-width: 100%;
			min-width: 0;
			margin: 0 auto;
			box-sizing: border-box;
			border-spacing: 0 25px;
		}
		.level-cell {
			flex-direction: column;
			align-items: center;
			padding: 1.25rem;
			box-sizing: border-box;
			width: 100%;
			min-height: 44px; /* Minimum touch target size */
			position: relative;
		}
		.thumbnail-preview {
			margin: 0 0 1rem 0;
			width: 100%;
			box-sizing: border-box;
		}
		.thumbnail-preview img {
			border-radius: 16px;
			max-width: 100%;
			min-width: 0;
			width: 100%;
			height: auto;
			box-sizing: border-box;
		}
		.image-loading,
		.image-error {
			border-radius: 16px;
			min-width: 0;
			width: 100%;
		}
		.level-info {
			width: 100%;
			align-items: center;
			text-align: center;
			box-sizing: border-box;
			gap: 0.5rem;
			position: relative;
		}

		.loading-indicator {
			position: relative;
			top: auto;
			right: auto;
			transform: none;
			justify-content: center;
			margin-top: 0.5rem;
		}
		.position,
		.level-name,
		.creator,
		.completedBy {
			width: 100%;
			text-align: center;
			box-sizing: border-box;
		}
		.level-name {
			font-size: 1.2em;
			-webkit-text-stroke: 3px #000;
			text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.9);
		}
		.position {
			font-size: 1.1em;
			color: var(--primary-color, #4a90e2);
			text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
		}
	}

	/* Extra small mobile styles */
	@media (max-width: 480px) {
		.level-table-container {
			padding: 0 0.25rem;
		}
		table {
			border-spacing: 0 30px;
		}
		.level-cell {
			padding: 1rem;
			border-radius: 16px;
		}
		.level-cell:active {
			transform: scale(0.95);
		}
		.thumbnail-preview img {
			border-radius: 12px;
		}
		.image-loading,
		.image-error {
			border-radius: 12px;
		}
		.level-info {
			gap: 0.25rem;
		}
		.level-name {
			font-size: 1.1em;
			-webkit-text-stroke: 2px #000;
			text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
		}
		.creator,
		.completedBy {
			font-size: 0.85em;
			color: #ddd;
			text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
		}
	}
</style>
