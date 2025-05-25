<script>
    import { createEventDispatcher } from 'svelte';

import { onMount } from 'svelte';
export let level;
export let initialRect = null; // Prop to receive the initial bounding rectangle

let detailContentElement; // Reference to the detail content element
let overlayElement; // Reference to the overlay element
let closing = false; // Track if we are closing
let closeTimeout = null; // Track the close animation timeout

onMount(() => {
    closing = false;
    if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
    }
    if (initialRect && detailContentElement && overlayElement) {
        // Reset styles for immediate re-open
        detailContentElement.style.transition = 'none';
        detailContentElement.style.opacity = '0';
        overlayElement.style.transition = 'none';
        overlayElement.style.background = 'rgba(0,0,0,0)';
        overlayElement.style.backdropFilter = 'blur(0px)';

        // Animate overlay in
        requestAnimationFrame(() => {
            overlayElement.style.transition = 'background 0.5s ease-out, backdrop-filter 0.5s ease-out';
            overlayElement.style.background = 'rgba(0,0,0,0.7)';
            overlayElement.style.backdropFilter = 'blur(10px)';
        });

        // Calculate the center of the screen
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate the target position (centered)
        const targetWidth = detailContentElement.offsetWidth;
        const targetHeight = detailContentElement.offsetHeight;
        const targetX = (viewportWidth - targetWidth) / 2;
        const targetY = (viewportHeight - targetHeight) / 2;

        // Calculate initial scale and translation
        const scaleX = initialRect.width / targetWidth;
        const scaleY = initialRect.height / targetHeight;
        const translateX = initialRect.left - targetX;
        const translateY = initialRect.top - targetY;

        // Apply the initial style
        detailContentElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
        detailContentElement.style.transformOrigin = 'top left';
        requestAnimationFrame(() => {
            detailContentElement.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
            detailContentElement.style.transform = 'translate(0, 0) scale(1)';
            detailContentElement.style.opacity = '1';
        });
    }
});

const dispatch = createEventDispatcher();

async function closeDetail() {
    if (closing) return;
    closing = true;
    if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
    }
    if (initialRect && detailContentElement && overlayElement) {
        // Calculate the center of the screen
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const targetWidth = detailContentElement.offsetWidth;
        const targetHeight = detailContentElement.offsetHeight;
        const targetX = (viewportWidth - targetWidth) / 2;
        const targetY = (viewportHeight - targetHeight) / 2;
        const scaleX = initialRect.width / targetWidth;
        const scaleY = initialRect.height / targetHeight;
        const translateX = initialRect.left - targetX;
        const translateY = initialRect.top - targetY;
        // Animate back to initial style
        detailContentElement.style.transition = 'transform 0.5s ease-in, opacity 0.5s ease-in';
        detailContentElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
        detailContentElement.style.opacity = '0';
        overlayElement.style.transition = 'background 0.5s ease-in, backdrop-filter 0.5s ease-in';
        overlayElement.style.background = 'rgba(0,0,0,0)';
        overlayElement.style.backdropFilter = 'blur(0px)';

        // Wait for the transition to finish, but allow interruption
        await new Promise(resolve => {
            closeTimeout = setTimeout(() => {
                closeTimeout = null;
                resolve();
            }, 500);
        });
    }
    dispatch('close');
}

</script>

<div
    class="squicicle-detail-overlay"
    bind:this={overlayElement}
    role="dialog"
    tabindex="0"
    aria-modal="true"
    on:click|self={closeDetail}
    on:keydown={(e) => { if (e.key === 'Escape') closeDetail(); }}
>
    <div class="squicicle-detail-content" bind:this={detailContentElement}>
        <button class="close-button" on:click={closeDetail}>&times;</button>
        <h2>{level.name}</h2>
        <p>by {level.creator}</p>
        <p>Completed by: {level.completedBy}</p>
        {#if level.video}
            <div class="video-container">
                <iframe
                    src="https://www.youtube.com/embed/{level.video.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/)[1]}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    title="YouTube video player"
                ></iframe>
            </div>
        {/if}
        <!-- Add more level details here as needed -->
    </div>
</div>

<style>
    .squicicle-detail-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        backdrop-filter: blur(10px);
    }

    .squicicle-detail-content {
        background: rgba(30, 30, 30, 0.9);
        border-radius: 24px;
        padding: 2rem;
        color: white;
        position: relative;
        min-width: 70%;
        max-width: 100%;
        max-height: 100%;
        overflow-y: auto;
        box-shadow: 0 0 30px rgba(0, 255, 255, 0.5); /* Neon glow */
        border: 1px solid rgba(0, 255, 255, 0.7);
        /* Initial styles for morphing, overridden by JS */
        transform: scale(1);
        opacity: 1;
        transition: none; /* Disable initial CSS transition to allow JS to control */
    }


    .close-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 2rem;
        color: white;
        cursor: pointer;
        padding: 0.5rem;
        line-height: 1;
    }

    .close-button:hover {
        color: cyan;
    }

    h2 {
        color: var(--primary-color, #4a90e2);
        margin-top: 0;
    }

    .video-container {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
        height: 0;
        margin-top: 1rem;
    }

    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
    }
</style>