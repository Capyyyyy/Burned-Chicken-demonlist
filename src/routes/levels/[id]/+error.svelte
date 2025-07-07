<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	function goHome() {
		goto('/');
	}
</script>

<svelte:head>
	<title>Level Not Found - Burned Chicken Demonlist</title>
</svelte:head>

<div class="error-container">
	<div class="error-content">
		<h1>Level Not Found</h1>
		<p>The level with ID "{$page.params.id}" could not be found.</p>
		<p>It might have been removed or the ID might be incorrect.</p>

		<button class="home-button" on:click={goHome}> ← Back to Demonlist </button>
	</div>
</div>

<style>
	@font-face {
		font-family: 'Pusab';
		src: url('/themes/default_cubes/pusab.otf') format('opentype');
		font-weight: normal;
		font-style: normal;
	}

	.error-container {
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		padding: 2rem;
		text-align: center;
	}

	.error-content {
		background: rgba(30, 30, 30, 0.9);
		border-radius: 24px;
		padding: 3rem 2rem;
		color: white;
		box-shadow: 0 0 30px rgba(255, 100, 100, 0.5);
		border: 1px solid rgba(255, 100, 100, 0.7);
	}

	h1 {
		font-family: 'Pusab', Arial, sans-serif;
		letter-spacing: 0.08em;
		color: #ff6464;
		margin-top: 0;
		margin-bottom: 1.5rem;
		font-size: 2.5rem;
		-webkit-text-stroke: 4px #000;
		-webkit-text-fill-color: #ff6464;
		paint-order: stroke fill;
	}

	p {
		font-size: 1.1rem;
		color: #cccccc;
		margin-bottom: 1rem;
		line-height: 1.6;
	}

	.home-button {
		background: linear-gradient(45deg, #4a90e2, #357abd);
		color: white;
		border: none;
		padding: 1rem 2rem;
		border-radius: 12px;
		font-size: 1.1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-top: 2rem;
		font-weight: bold;
	}

	.home-button:hover {
		background: linear-gradient(45deg, #357abd, #2c5f99);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
	}

	@media (max-width: 768px) {
		.error-container {
			padding: 1rem;
		}

		.error-content {
			padding: 2rem 1.5rem;
		}

		h1 {
			font-size: 2rem;
		}

		p {
			font-size: 1rem;
		}
	}
</style>
