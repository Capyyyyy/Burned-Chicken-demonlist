<script>
	import { onMount, onDestroy } from 'svelte';
	import { navigating } from '$app/stores';
	import { browser } from '$app/environment';
	import { startLevelLoading, startListLoading, stopLoading } from './stores/loading.js';

	let unsubscribe = null;
	let navigationTimeout = null;
	let minimumLoadingTime = 500;
	let navigationStartTime = null;

	onMount(() => {
		if (!browser) return;

		// Subscribe to SvelteKit's navigating store
		unsubscribe = navigating.subscribe((nav) => {
			if (nav) {
				handleNavigationStart(nav);
			} else {
				handleNavigationEnd();
			}
		});
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
		if (navigationTimeout) {
			clearTimeout(navigationTimeout);
		}
	});

	function handleNavigationStart(navigationInfo) {
		// Clear any existing timeout
		if (navigationTimeout) {
			clearTimeout(navigationTimeout);
		}

		// Start loading immediately
		navigationStartTime = Date.now();

		// Determine loading message based on destination
		const { to } = navigationInfo;

		if (to && to.url) {
			const url = to.url.pathname;

			if (url.includes('/levels/') && url !== '/levels') {
				// Extract level ID from URL
				const levelId = url.split('/levels/')[1];
				startLevelLoading(levelId ? `Level ${levelId}` : '');
			} else if (url === '/') {
				startListLoading();
			} else {
				startLevelLoading();
			}
		} else {
			startLevelLoading();
		}
	}

	function handleNavigationEnd() {
		// Clear timeout if navigation completes quickly
		if (navigationTimeout) {
			clearTimeout(navigationTimeout);
			navigationTimeout = null;
		}

		// Ensure minimum loading time for smooth UX
		const elapsed = Date.now() - (navigationStartTime || 0);
		const remainingTime = Math.max(0, minimumLoadingTime - elapsed);

		navigationTimeout = setTimeout(() => {
			stopLoading();
		}, remainingTime);
	}
</script>

<!-- This component has no visual output, it only listens for navigation events -->
