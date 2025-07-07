import { writable } from 'svelte/store';

// Create a writable store for loading state
export const isLoading = writable(false);

// Create a store for loading message
export const loadingMessage = writable('Loading...');

// Simple loading management
let loadingTimeout = null;

// Helper functions to control loading state
export function startLoading(message = 'Loading...') {
	// Clear any pending timeout
	if (loadingTimeout) {
		clearTimeout(loadingTimeout);
		loadingTimeout = null;
	}

	loadingMessage.set(message);
	isLoading.set(true);
}

export function stopLoading() {
	// Add small delay to prevent flashing
	loadingTimeout = setTimeout(() => {
		isLoading.set(false);
		loadingMessage.set('Loading...');
	}, 200);
}

// Navigation-specific loading functions
export function startLevelLoading(levelName = '') {
	const message = levelName ? `Loading ${levelName}...` : 'Loading level...';
	startLoading(message);
}

export function startListLoading() {
	startLoading('Loading demon list...');
}
