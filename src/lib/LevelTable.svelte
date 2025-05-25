<script>
    import { onMount } from 'svelte';
    import ColorThief from 'color-thief-browser';
    import SquicicleDetail from './FullInfo.svelte'; // Import the new component

    export let levels = [];

    // State for the squicicle detail view
    let showSquicicleDetail = false;
    let selectedLevel = null;
    let clickedCellRect = null; // To store the bounding rect of the clicked cell

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

    // Reactive store for dominant colors
    let dominantColors = {}; // Use `let` for reactivity

    async function extractDominantColor(imgElement, videoUrl) {
        // Add a small delay to ensure the image is fully rendered and accessible
        await new Promise(resolve => setTimeout(resolve, 100));
        try {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(imgElement);
            console.log(`Dominant color for ${videoUrl}: rgb(${color[0]}, ${color[1]}, ${color[2]})`);
            dominantColors = { ...dominantColors, [videoUrl]: `rgb(${color[0]}, ${color[1]}, ${color[2]})` };
        } catch (error) {
            console.error('Error getting dominant color from loaded image:', error);
            dominantColors = { ...dominantColors, [videoUrl]: 'rgba(255, 255, 255, 0.237)' }; // Fallback
        }
    }

    function openSquicicleDetail(level, event) {
        selectedLevel = level;
        clickedCellRect = event.currentTarget.getBoundingClientRect(); // Get the bounding rect
        showSquicicleDetail = true;
    }

    function closeSquicicleDetail() {
        showSquicicleDetail = false;
        selectedLevel = null;
    }
</script>

<div class="level-table-container">
    <table>
        <tbody>
            {#each levels as level, index}
                <tr class="level-row" style="--thumbnail-url: url('{getYouTubeThumbnail(level.video)}');">
                    <td class="level-cell"
                        style="--dominant-color: {dominantColors[level.video] || 'rgba(255, 255, 255, 0.237)'};"
                        on:click={(e) => openSquicicleDetail(level, e)}
                    >
                        {#if level.video}
                            <div class="thumbnail-preview">
                                <img
                                    src={getYouTubeThumbnail(level.video)}
                                    alt="YouTube Thumbnail"
                                    on:load={(e) => extractDominantColor(e.target, level.video)}
                                    crossorigin="anonymous"
                                />
                            </div>
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

{#if showSquicicleDetail && selectedLevel}
    <SquicicleDetail level={selectedLevel} initialRect={clickedCellRect} on:close={closeSquicicleDetail} />
{/if}

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
        backdrop-filter: blur(4px) saturate(150%); /* macOS-like blur with adjusted intensity and saturation */
        -webkit-backdrop-filter: blur(8px) saturate(150%); /* For Safari */
        border: 1px solid var(--dominant-color, rgba(255, 255, 255, 0.237)); /* Use dominant color for border */
        position: relative; /* Needed for absolute positioning of pseudo-element */
        overflow: hidden; /* Hide overflow from blurred background */
        box-shadow: 0 0 15px var(--dominant-color, rgba(255, 255, 255, 0.237)); /* Neon effect */
        transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transition */
        cursor: pointer; /* Indicate clickable */
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

    /* Add a subtle glow on hover */
    .level-row:hover .level-cell {
        box-shadow: 0 0 25px var(--dominant-color, rgba(255, 255, 255, 0.237)), 0 0 40px var(--dominant-color, rgba(255, 255, 255, 0.237));
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
        :global(html), :global(body) {
            overflow-x: hidden;
        }
        .level-table-container {
            width: 100%;
            max-width: 100%;
            overflow-x: auto;
            box-sizing: border-box;
            margin: 0 auto;
            padding: 0 0.5rem;
        }
        table {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            margin: 0 auto;
            box-sizing: border-box;
        }
        .level-cell {
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            box-sizing: border-box;
            width: 100%;
        }
        .thumbnail-preview {
            margin: 0 0 1rem 0;
            width: 100%;
            box-sizing: border-box;
        }
        .thumbnail-preview img {
            border-radius: 24px;
            max-width: 100%;
            min-width: 0;
            width: 100%;
            height: auto;
            box-sizing: border-box;
        }
        .level-info {
            width: 100%;
            align-items: center;
            text-align: center;
            box-sizing: border-box;
        }
        .position, .level-name, .creator, .completedBy {
            width: 100%;
            text-align: center;
            box-sizing: border-box;
        }
    }
</style>