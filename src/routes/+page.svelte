<script>
	import { onMount } from 'svelte';
	import LevelTable from '$lib/LevelTable.svelte';
	import { stopLoading } from '$lib/stores/loading.js';

	export let data;
	const { demonList } = data;

	onMount(() => {
		// Stop loading when main page is loaded
		setTimeout(() => {
			stopLoading();
		}, 100);
	});
</script>

<div class="container">
	<LevelTable levels={demonList} />
</div>

<footer class="footer">
	<div class="footer-content">
		<span>Made by Capy</span>
	</div>
</footer>

<style>
	@font-face {
		font-family: 'Pusab';
		src: url('/themes/default_cubes/pusab.otf') format('opentype');
		font-weight: normal;
		font-style: normal;
	}

	/* For Webkit browsers (Chrome, Safari, Edge) */
	::-webkit-scrollbar {
		width: 0; /* Remove scrollbar space */
		background: transparent; /* Optional: just make scrollbar invisible */
	}

	/* For Firefox */
	:global(html) {
		scrollbar-width: none; /* Firefox */
	}

	/* For IE/Edge */
	:global(body) {
		-ms-overflow-style: none; /* IE and Edge */
	}

	:global(html),
	:global(body),
	.container,
	.footer,
	.footer-content {
		font-family: Arial, sans-serif;
		letter-spacing: normal;
	}

	.container {
		width: 100%;
	}

	.footer {
		width: 25%;
		padding: 1rem 0;
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(12px);
		color: #fff;
		text-align: center;
		font-size: 1rem;
		box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
		margin-top: 2rem;
		border-radius: 128px;
		margin-left: auto;
		margin-right: auto;
	}

	.footer-content {
		justify-content: center;
		align-items: center;
		flex-direction: column;
		display: flex;
	}

	/* Mobile responsive footer */
	@media (max-width: 768px) {
		.footer {
			padding: 1.5rem 1rem;
			margin-top: 1rem;
		}
	}

	@media (max-width: 480px) {
		.footer {
			font-size: 0.95rem;
			border-radius: 48px;
		}
	}
</style>
