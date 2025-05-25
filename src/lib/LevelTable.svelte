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
                <tr class="level-row" style="--thumbnail-url: url('{getYouTubeThumbnail(level.video)}');">
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
        max-width: 1200px; /* Limit max width on larger screens */
        overflow-x: auto;
        margin: 2rem auto; /* Center the container */
        padding: 0 1rem; /* Add some horizontal padding */
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
        background: rgba(30, 30, 30, 0.02); /* More transparent background to let ambient effect show */
        border-radius: 24px; /* Apply border-radius to the single cell */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); /* Optional: Add a subtle shadow */
        backdrop-filter: blur(4px) saturate(150%); /* macOS-like blur with adjusted intensity and saturation */
        -webkit-backdrop-filter: blur(8px) saturate(150%); /* For Safari */
        border: rgba(255, 255, 255, 0.237) 1px solid; /* Even softer border */
        position: relative; /* Needed for absolute positioning of pseudo-element */
        overflow: hidden; /* Hide overflow from blurred background */
    }

    .level-cell::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: var(--thumbnail-url);
        background-size: cover;
        background-position: center;
        filter: blur(30px) brightness(0.7); /* Adjust blur and brightness as needed */
        opacity: 0.3; /* Adjust opacity for the ambient effect */
        z-index: -1; /* Place behind content */
        transition: opacity 0.3s ease; /* Smooth transition for hover */
        border-radius: 24px; /* Match parent border-radius */
    }

    .level-row:hover .level-cell::before {
        opacity: 0.5; /* Slightly more visible on hover */
    }

    .level-info {
        color: white !important;
        display: flex;
        flex-direction: column; /* Stack items vertically by default */
        align-items: flex-start; /* Align items to the start */
        gap: 0.2rem; /* Smaller space between stacked elements */
        padding: 0.5rem 1rem; /* Add padding to info block */
        flex-grow: 1; /* Allow info to take available space */
    }

    .position {
        font-weight: 700; /* Bolder for position */
        color: var(--primary-color, #4a90e2); /* Highlight position number */
        min-width: 30px; /* Ensure consistent width for position */
    }

    .level-name {
        font-weight: 600;
        font-size: 1.1em; /* Slightly larger font for level name */
        color: var(--heading-color, #ececec);
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
        display: flex; /* Use flexbox for centering */
        align-items: center; /* Center vertically */
        justify-content: center; /* Center horizontally */
    }

    .thumbnail-preview img {
        aspect-ratio: 16/9;
        object-fit: cover;
        width: 100%; /* Default to 100% width */
        height: auto; /* Maintain aspect ratio */
        border-radius: 24px 0 0 24px;
        display: block;
        max-width: 300px; /* Max width for PC */
        min-width: 120px; /* Min width for PC */
    }

    /* PC/Tablet styles (larger screens) */
    @media (min-width: 769px) {
        .level-info {
            flex-direction: row; /* Row layout on larger screens */
            align-items: center;
            gap: 1rem;
        }
    }

    /* Mobile styles */
    @media (max-width: 768px) {
        table {
            width: 100%; /* Full width on mobile */
            max-width: 400px; /* Limit table width on mobile */
            margin: 0 auto; /* Center the table */
        }

        .level-cell {
            flex-direction: column; /* Stack items vertically on small screens */
            align-items: center; /* Center items horizontally */
            padding: 1rem; /* Add padding to the cell */
        }

        .thumbnail-preview {
            margin: 0 0 1rem 0; /* Adjust margins for stacking */
            width: 100%; /* Full width for thumbnail container */
        }

        .thumbnail-preview img {
            border-radius: 24px; /* Full border-radius for stacked thumbnail */
            max-width: 250px; /* Adjust max width for mobile */
            min-width: unset; /* Remove min-width constraint */
        }

        .level-info {
            width: 100%; /* Full width for info block */
            align-items: center; /* Center text on mobile */
            text-align: center;
        }

        .position, .level-name, .creator, .completedBy {
            width: 100%; /* Ensure each info item takes full width */
            text-align: center;
        }
    }
</style>