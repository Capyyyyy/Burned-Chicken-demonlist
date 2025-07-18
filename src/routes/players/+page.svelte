<script>
	import NavigateBackToList from '$lib/back-to-list.svelte';
</script>

<div class="container">
	<NavigateBackToList />
	<h1>Coming Soon!</h1>
</div>

<style>
	.container {
		background: rgba(0, 0, 0, 0.35);
		backdrop-filter: blur(24px);
		border-radius: 24px;
		padding: 2rem;
		color: white;
		box-sizing: border-box;
	}
	h1 {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 1rem;
		text-align: center;
	}
</style>
