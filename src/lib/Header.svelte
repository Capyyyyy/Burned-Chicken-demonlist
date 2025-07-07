<header>
	<nav>
		<a href="/"><b>Burned Chicken Demonlist</b></a>
		<div class="nav-links">
			<a href="/">Main List</a>
			<a href="https://discord.gg/9qwtk8nJKP">Submit completion</a>
		</div>
	</nav>
</header>

<style>
	header {
		position: fixed;
		z-index: 1;
		background-color: #0000007c;
		backdrop-filter: blur(10px);
		color: white;
		padding: 1rem;
		position: fixed;
		left: 50%;
		top: 2%;
		transform: translate(-50%, -2%);
		border-radius: 24px;
	}

	nav {
		max-width: 1200px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	nav a {
		color: white;
		text-decoration: none;
		font-size: 1.2rem;
	}

	.nav-links {
		margin-left: 40px;
		display: flex;
		gap: 2rem;
	}

	.nav-links a {
		font-size: 1rem;
	}

	@media (max-width: 768px) {
		nav {
			flex-direction: column;
			gap: 0.75rem;
			min-width: 0;
			width: 100%;
			max-width: 100%;
		}

		.nav-links {
			gap: 1.5rem;
			margin-left: 0;
			width: 100%;
			justify-content: center;
			flex-wrap: wrap;
		}

		header {
			left: 50%;
			transform: translate(-50%);
			width: 95vw;
			min-width: 0;
			max-width: 100vw;
			padding: 0.75rem 1rem;
			box-sizing: border-box;
		}

		nav a {
			font-size: 0.95rem;
			padding: 0.25rem 0.5rem;
		}
	}

	@media (max-width: 480px) {
		nav {
			gap: 0.5rem;
		}

		.nav-links {
			gap: 1rem;
			flex-direction: column;
			align-items: center;
		}

		header {
			width: 98vw;
			padding: 0.5rem 0.75rem;
			top: 1%;
		}

		nav a {
			font-size: 0.9rem;
			padding: 0.5rem 0.75rem;
			white-space: nowrap;
		}

		nav > a {
			font-size: 1.1rem;
			text-align: center;
		}
	}
</style>
