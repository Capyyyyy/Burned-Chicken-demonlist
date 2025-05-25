<script>
    import LevelTable from '$lib/LevelTable.svelte';
    export let data;
    const { demonList } = data;
</script>

<div class="container">

    <LevelTable levels={demonList} />
</div>

<style>

    /* Custom scrollbar styling */
    :global(body)::-webkit-scrollbar {
        width: 12px;
    }
    :global(body)::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,0.4);
        border-radius: 8px;
        border: 2px solid #444;
    }
    :global(body)::-webkit-scrollbar-track {
        background: rgba(255,255,255,0.1);
    }
    :global(body) {
        scrollbar-width: thin;
        scrollbar-color: #444 rgba(255,255,255,0.1);
    }

    .container {
        width: 100%;
    }
</style>