<script>
	import NavigateBackToList from '$lib/back-to-list.svelte';
	import { onMount } from 'svelte';
	import { stopLoading } from '$lib/stores/loading.js';
	let players = [];
	let playerName = '';
	let playerRank = '';
	let playerScore = '';
	let hardestLevel = '';
	let completedLevels = '';

	let showElement = false;

	onMount(async () => {
		try {
			const response = await fetch(`https://bcdbackend.onrender.com/api/players/`);

			if (response.ok) {
				const data = await response.json();
				// Sort players by score in descending order
				players = data.sort((a, b) => b.score - a.score);
			}
		} finally {
			// Stop the navigation loading
			stopLoading();
		}
	});

	/**
	 * This function is called when a table row is clicked.
	 * @param {string} playerName - The name of the player from the clicked row.
	 */
	function handleRowClick(
		clickedPlayerName,
		clickedRank,
		clickedScore,
		clickedHardest,
		clickedCompleted
	) {
		showElement = true;

		// Update the component's playerName state variable, which is bound to the <p> element.
		playerName = clickedPlayerName;
		playerRank = clickedRank;
		playerScore = clickedScore;
		hardestLevel = clickedHardest;
		completedLevels = clickedCompleted;

		// You can add navigation or other logic here. For example:
		// import { goto } from '$app/navigation';
		// goto(`/players/${playerName}`);
	}
</script>

<div class="container">
	<NavigateBackToList />
	<h1>Player Stats</h1>
	<div class="player-stats">
		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th>Player</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					{#each players as player (player.player_name)}
						<tr
							class="clickable-row"
							on:click={() =>
								handleRowClick(
									player.player_name,
									player.rank,
									player.score,
									player.hardest,
									player.completedLevels
								)}
						>
							<td>#{player.rank} {player.player_name}</td>
							<td>{player.score}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class="stats">
			<h1 align="center" class:hidden={showElement}>First select a player</h1>
			<div class="stats-container" class:hidden={!showElement}>
				<h2 id="selected_player">{playerName}</h2>
				<div class="rankandscore">
					<div class="rank">
						<h3>Rank</h3>
						<p align="center">{playerRank}</p>
					</div>
					<div class="score">
						<h3>Score</h3>
						<p align="center">{playerScore}</p>
					</div>
				</div>
				<h3 align="center">Hardest Level</h3>
				<p align="center">{hardestLevel}</p>
				<h3 align="center">Completed Levels</h3>
				<p align="center">{completedLevels}</p>
			</div>
		</div>
	</div>
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

	#selected_player {
		text-align: center;
	}

	h1 {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 1rem;
		text-align: center;
	}

	.player-stats {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.stats {
		background: rgba(0, 0, 0, 0.35);
		backdrop-filter: blur(24px);
		border-radius: 24px;
		padding: 1rem;
		color: white;
		box-sizing: border-box;
		min-width: 45%;
		min-height: 50px;
	}

	.rankandscore {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 4rem;
		padding: 0, 12rem;
	}

	.rank {
		margin-left: 2rem;
	}

	.score {
		margin-right: 2rem;
	}

	.table-container {
		background: rgba(0, 0, 0, 0.35);
		backdrop-filter: blur(24px);
		border-radius: 24px;
		padding: 1rem;
		color: white;
		box-sizing: border-box;
		min-width: 45%;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding: 0.75rem;
		text-align: left;
		border-bottom: 1px solid rgba(60, 60, 60, 0.3);
	}

	th {
		background: rgba(15, 15, 15, 0.4);
		font-weight: bold;
		color: var(--primary-color, #4a90e2);
	}

	td {
		color: white;
	}

	tr:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	/* Essential CSS for making rows clickable and providing visual feedback. */
	.clickable-row {
		cursor: pointer;
		transition:
			background-color 0.2s ease-in-out,
			transform 0.1s ease-in-out;
	}
	.clickable-row:hover {
		background-color: rgba(224, 231, 255, 0.1); /* Light blue on hover, adjusted for dark theme */
		transform: translateY(-2px); /* Slight lift effect */
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Subtle shadow */
	}
	.clickable-row:active {
		transform: translateY(0); /* Press down effect */
		box-shadow: none;
	}

	.hidden {
		display: none; /* Or use opacity/transform for animations */
		opacity: 0;
		pointer-events: none;
		transform: translateY(20px);
	}

	@media (max-width: 768px) {
		.table-container {
			max-width: 100%;
		}

		.player-stats {
			display: flex;
			flex-direction: column;
			gap: 4rem;
		}
	}
</style>
