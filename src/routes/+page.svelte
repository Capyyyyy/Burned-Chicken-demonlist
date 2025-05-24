<script>
    import LevelTable from '$lib/LevelTable.svelte';
    export let data;
    const { demonList } = data;
</script>

<div class="container">

    <LevelTable levels={demonList} />

    <div class="submit-info">
        <a href="https://discord.gg/8EYVSk2f" target="_blank" rel="noopener noreferrer" class="discord-link">
            Submit your completion on Discord
        </a>
    </div>
</div>

<style>
    .container {
        width: 100%;
    }

    .submit-info {
        text-align: center;
        margin-top: 2rem;
        padding: 2rem;
    }

    .discord-link {
        display: inline-block;
        background-color: #7289da;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        text-decoration: none;
        font-weight: 500;
        transition: background-color 0.2s;
    }

    .discord-link:hover {
        background-color: #5f73bc;
    }
</style>