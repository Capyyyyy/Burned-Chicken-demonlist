<script>
	import Header from '$lib/Header.svelte';
	import NavigationListener from '$lib/NavigationListener.svelte';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
	<NavigationListener />
</div>

<style>
	:global(body) {
		background-image: url('https://preview.redd.it/8nlc7ds4qdk91.png?width=640&crop=smart&auto=webp&s=5750f4515b3556925530cb06902ae80700d7a2d9');
		background-attachment: fixed;
		margin: 0;
		padding: 0;
		-webkit-text-size-adjust: 100%;
		-ms-text-size-adjust: 100%;
		overflow-x: hidden;
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

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
		width: 100%;
		margin-top: 140px; /* Account for fixed header */
	}

	/* Mobile responsive adjustments */
	@media (max-width: 768px) {
		main {
			padding: 1rem 0.5rem;
			margin-top: 160px; /* More space for mobile header */
		}
	}

	@media (max-width: 480px) {
		main {
			padding: 0.5rem 0.25rem;
			margin-top: 180px; /* Even more space for very small screens */
		}
	}

	/* Optimize background for mobile performance */
	@media (max-width: 768px) {
		:global(body) {
			min-height: 100vh;
		}
	}

	/* Handle orientation changes */
	@media screen and (orientation: landscape) and (max-height: 500px) {
		main {
			margin-top: 120px;
		}
	}

	@media screen and (orientation: portrait) and (max-width: 768px) {
		main {
			margin-top: 160px;
		}
	}

	/* Improve touch scrolling on iOS */
	@media (max-width: 768px) {
		:global(body) {
			-webkit-overflow-scrolling: touch;
			position: relative;
		}

		.app {
			position: relative;
			overflow-x: hidden;
		}
	}
</style>
