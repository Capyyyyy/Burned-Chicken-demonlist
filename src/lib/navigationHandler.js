import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import { startLevelLoading, startListLoading, stopLoading } from './stores/loading.js';

// Simplified navigation handler without store subscription
export class NavigationHandler {
	constructor() {
		this.isNavigating = false;
		this.navigationTimeout = null;
	}

	// Manual navigation methods with loading
	async navigateToLevel(levelId, levelName = '') {
		if (!browser) return goto(`/levels/${levelId}`);

		const displayName = levelName || `Level ${levelId}`;
		startLevelLoading(displayName);

		try {
			await goto(`/levels/${levelId}`);
		} catch (error) {
			console.error('Navigation error:', error);
			stopLoading();
		}
	}

	async navigateToHome() {
		if (!browser) return goto('/');

		startListLoading();

		try {
			await goto('/');
		} catch (error) {
			console.error('Navigation error:', error);
			stopLoading();
		}
	}

	// Utility method to navigate with custom loading message
	async navigateWithLoading(path, loadingMessage = 'Loading...') {
		if (!browser) return goto(path);

		startLevelLoading(loadingMessage);

		try {
			await goto(path);
		} catch (error) {
			console.error('Navigation error:', error);
			stopLoading();
		}
	}
}

// Create singleton instance
export const navigationHandler = new NavigationHandler();

// Export convenience functions
export function navigateToLevel(levelId, levelName = '') {
	return navigationHandler.navigateToLevel(levelId, levelName);
}

export function navigateToHome() {
	return navigationHandler.navigateToHome();
}

export function navigateWithLoading(path, loadingMessage = 'Loading...') {
	return navigationHandler.navigateWithLoading(path, loadingMessage);
}
