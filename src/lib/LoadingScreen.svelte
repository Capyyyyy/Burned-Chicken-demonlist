<script>
	import { onMount } from 'svelte';
	import { isLoading, loadingMessage } from './stores/loading.js';

	let visible = false;
	let dots = '';
	let dotInterval;

	// Subscribe to loading state
	$: if ($isLoading && !visible) {
		showLoading();
	} else if (!$isLoading && visible) {
		hideLoading();
	}

	function showLoading() {
		visible = true;
	}

	function hideLoading() {
		setTimeout(() => {
			visible = false;
		}, 300);
	}

	onMount(() => {
		dotInterval = setInterval(() => {
			dots = dots.length >= 3 ? '' : dots + '.';
		}, 500);

		return () => {
			if (dotInterval) clearInterval(dotInterval);
		};
	});
</script>

{#if false}
	<div class="loading-bar">
		<div class="loading-progress"></div>
	</div>
	<div class="loading-text">
		{$loadingMessage}{dots}
	</div>
{/if}

<style>
	.loading-bar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background: rgba(74, 144, 226, 0.3);
		z-index: 9999;
		opacity: 0;
		animation: slideDown 0.3s ease-out forwards;
	}

	.loading-progress {
		height: 100%;
		background: linear-gradient(90deg, #4a90e2, #ff6b6b, #4ecdc4);
		width: 0%;
		animation: progressGrow 2s ease-out forwards;
	}

	.loading-text {
		position: fixed;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		font-family: 'Pusab', Arial, sans-serif;
		font-size: 1rem;
		color: white;
		background: rgba(0, 0, 0, 0.8);
		padding: 0.5rem 1rem;
		border-radius: 16px;
		z-index: 10000;
		opacity: 0;
		animation: fadeIn 0.3s ease-out 0.1s forwards;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-100%);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes progressGrow {
		0% {
			width: 0%;
		}
		70% {
			width: 70%;
		}
		100% {
			width: 100%;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.loading-text {
			font-size: 0.9rem;
			padding: 0.4rem 0.8rem;
			top: 15px;
		}
	}
</style>
