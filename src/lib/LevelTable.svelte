<script>
    export let levels = [];

    // Difficulty icons mapping
    const difficultyIcons = {
        easy: '/icons/easy.png',
        medium: '/icons/medium.png',
        hard: '/icons/hard.png',
        insane: '/icons/insane.png',
        extreme: '/icons/extreme.png'
    };

    // Function to extract YouTube video ID and generate thumbnail URL
    function getYouTubeThumbnail(url) {
        const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/);
        if (videoIdMatch && videoIdMatch[1]) {
            return `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`;
        }
        return ''; // Return empty string if no valid video ID found
    }
</script>
<div class="level-table-container">
    <table>
        <tbody>
            {#each levels as level, index}
                <tr class="level-row">
                    <td class="level-cell">
                        {#if level.video}
                            <a href={level.video} target="_blank" rel="noopener noreferrer" class="thumbnail-preview">
                                <img src={getYouTubeThumbnail(level.video)} alt="YouTube Thumbnail" />
                            </a>
                        {/if}
                        <div class="level-info">
                            <span class="position">{index + 1}.</span>
                            <span class="level-name">{level.name}</span>
                            <span class="creator">by {level.creator}</span>
                            <span class="completedBy">{level.completedBy}</span>
                        </div>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .level-table-container {
        width: 100%;
        overflow-x: auto;
        margin: 2rem 0;
    }

    table {
        width: 80%;
        border-collapse: separate;
        color: var(--text-color, #333333);
        border-spacing: 0 20px; /* Adjusted spacing between rows */
    }

    .level-cell {
        display: flex; /* Use flexbox for the table cell */
        align-items: center; /* Vertically align items in the cell */
        justify-content: flex-start; /* Align content to the left */
        background: var(--bg-color, #ffffff00);
        border-radius: 24px; /* Apply border-radius to the single cell */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); /* Optional: Add a subtle shadow */
        backdrop-filter: blur(2px);
        border: #ffffff 1px solid;
    }

    .level-info {
        display: flex;
        align-items: center;
        gap: 1rem; /* Space between elements */
        flex-wrap: wrap; /* Allow items to wrap on smaller screens */
    }

    .position {
        font-weight: 700; /* Bolder for position */
        color: var(--primary-color, #4a90e2); /* Highlight position number */
        min-width: 30px; /* Ensure consistent width for position */
    }

    .level-name {
        font-weight: 600;
        font-size: 1.1em; /* Slightly larger font for level name */
        color: var(--heading-color, #2c3e50);
    }

    .creator {
        color: var(--text-color-light, #7f8c8d);
        font-size: 0.9em;
    }

    .completedBy {
        color: var(--text-color-light, #7f8c8d);
        font-size: 0.9em;
    }

    .level-row {
        transition: transform 0.3s ease;
    }

    .level-row:hover {
        transform: translateY(-5px); /* Lift effect on hover */
    }

    .level-row:hover td {
        background: var(--hover-bg-color, #ffffff07);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* More pronounced shadow on hover */
    }

    .thumbnail-preview {
        aspect-ratio: 16/9;
        margin-right: 1rem; /* Space between content and thumbnail */
        flex-shrink: 0; /* Prevent thumbnail from shrinking */
    }

    .thumbnail-preview {
        height: 100%;
        display: flex;
        align-items: stretch;
    }

    .thumbnail-preview img {
        aspect-ratio: 16/9;
        object-fit: cover;
        width: auto;
        height: 100%;
        border-radius: 24px 0 0 24px;
        display: block;
        max-width: 300px;
        min-width: 120px;
        transition: order 0.3s;
    }

    @media (max-width: 900px) {
        .level-cell {
            flex-direction: row-reverse;
        }
        .thumbnail-preview {
            margin-left: 1rem;
            margin-right: 0;
        }
    }

    @media (max-width: 768px) {
        .level-cell {
            flex-direction: column; /* Stack items vertically on small screens */
            align-items: flex-start; /* Align items to the start */
        }

        .thumbnail-preview {
            margin-right: 0; /* Remove right margin */
            margin-bottom: 1rem; /* Add bottom margin when stacked */
            width: 100%; /* Full width for thumbnail on small screens */
            text-align: center; /* Center the thumbnail image */
        }

        .thumbnail-preview img {
            width: 100%; /* Make thumbnail full width on small screens */
            max-width: 200px; /* Max width to prevent excessive stretching */
            height: auto;
        }
    }
</style>