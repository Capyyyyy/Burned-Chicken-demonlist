<script>
	import Header from "$lib/Header.svelte";

    // Add your layout-wide logic here if needed
</script>

<div class="app">
    <Header />

    <main>
        <slot />
    </main>
</div>

<style>
    :global(body) {
        background-image: url("https://preview.redd.it/8nlc7ds4qdk91.png?width=640&crop=smart&auto=webp&s=5750f4515b3556925530cb06902ae80700d7a2d9");
    }

    :global(html) {
        scroll-behavior: smooth;
    }


    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
        width: 100%;
    }

</style>
