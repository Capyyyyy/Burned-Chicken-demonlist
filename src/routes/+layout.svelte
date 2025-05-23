<script>
    // Add your layout-wide logic here if needed
</script>

<div class="app">
    <header>
        <nav>
            <a href="/">Burned Chicken Demonlist</a>
            <div class="nav-links">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </div>
        </nav>
    </header>

    <main>
        <slot />
    </main>
</div>

<style>
    :global(body) {
        background-image: url("https://preview.redd.it/8nlc7ds4qdk91.png?width=640&crop=smart&auto=webp&s=5750f4515b3556925530cb06902ae80700d7a2d9");
    }

    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    header {
        background-color: #333;
        color: white;
        padding: 1rem;
    }

    nav {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    nav a {
        color: white;
        text-decoration: none;
        font-size: 1.2rem;
    }

    .nav-links {
        display: flex;
        gap: 2rem;
    }

    .nav-links a {
        font-size: 1rem;
    }

    main {
        flex: 1;
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
        width: 100%;
    }

    @media (max-width: 640px) {
        nav {
            flex-direction: column;
            gap: 1rem;
        }

        .nav-links {
            gap: 1rem;
        }
    }
</style>
