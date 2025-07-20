<script>
	import { navigateToHome } from '$lib/navigationHandler.js';
	let buttonLoading = false;

	async function handleBackClick() {
		if (buttonLoading) return;
		buttonLoading = true;
		await navigateToHome();
		buttonLoading = false;
	}
</script>

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

<style>
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
</style>
