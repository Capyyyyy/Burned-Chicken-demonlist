<header>
    <nav>
        <a href="/"><b>Burned Chicken Demonlist</b></a>
        <div class="nav-links">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
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
        min-width: 700px;
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

    @media (max-width: 640px) {
        nav {
            flex-direction: column;
            gap: 1rem;
        }

        .nav-links {
            gap: 1rem;
        }

        header {
            left: 50%;
            transform: translate(-50%);
            width: 90%;
        }
    }
</style>