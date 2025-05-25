<script>
    import LevelTable from '$lib/LevelTable.svelte';
    export let data;
    const { demonList } = data;

    // Remove any accidental <canvas> elements that may have been added by Svelte HMR or other causes
    $: {
        // Remove all canvas elements from the DOM if they exist (defensive, runs on every update)
        if (typeof window !== 'undefined') {
            const canvases = document.querySelectorAll('canvas');
            canvases.forEach(c => c.remove());
        }
    }
</script>

<div class="container">
    <LevelTable levels={demonList} />
</div>

<footer class="footer">
    <div class="footer-content">
        <span>Made by Capy</span>
        <span class="footer-link-span"><a href='https://www.reddit.com/r/geometrydash/comments/wzm4wk/gd_wallpapers_i_made_3840x2160_feel_free_to'>Credits: background - Reddit</a></span>
    </div>
</footer>

<style>

    /* For Webkit browsers (Chrome, Safari, Edge) */
    ::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
    }

    /* For Firefox */
    :global(html) {
    scrollbar-width: none; /* Firefox */
    }

    /* For IE/Edge */
    :global(body) {
    -ms-overflow-style: none;  /* IE and Edge */
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
        box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
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
</style>