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
		<span class="footer-link-span"
			><a
				href="https://www.reddit.com/r/geometrydash/comments/wzm4wk/gd_wallpapers_i_made_3840x2160_feel_free_to"
				>Credits: background - Reddit</a
			></span
		>
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
		width: 100%;
		padding: 1rem 0;
		background: #222;
		color: #fff;
		text-align: center;
		font-size: 1rem;
		box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
		margin-top: 2rem;
		border-radius: 24px;
	}
	.footer-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.2rem;
	}
	.footer-content a {
		color: #fff;
		text-decoration: none;
		transition: color 0.2s;
	}
	.footer-content a:hover {
		color: #bbb;
		text-decoration: none;
	}

	/* Mobile responsive footer */
	@media (max-width: 768px) {
		.footer {
			padding: 1.5rem 1rem;
			margin-top: 1rem;
			border-radius: 16px;
			font-size: 0.9rem;
		}

		.footer-content {
			gap: 0.5rem;
		}
	}

	@media (max-width: 480px) {
		.footer {
			padding: 1rem 0.5rem;
			font-size: 0.85rem;
			border-radius: 12px;
		}

		.footer-content {
			gap: 0.75rem;
		}

		.footer-content a {
			display: block;
			padding: 0.25rem 0;
		}
	}
</style>
