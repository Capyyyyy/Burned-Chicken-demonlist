// script.js
const body = document.body;
const highResImage = new Image();

highResImage.src = "themes/default_cubes/background.png"; // high-res version

highResImage.onload = function () {
  body.style.backgroundImage = `url(${highResImage.src})`;
};

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const fullInfoContainer = document.querySelector(".full-info-container");

hamburger.addEventListener("click", () => {
  if (nav.classList.contains("show")) {
    nav.classList.remove("show");
    nav.classList.add("hide");
  } else {
    nav.classList.remove("hide");
    nav.classList.add("show");
  }
});

var footer = document.getElementById("footer");
if (footer) {
  footer.classList.add("footer-hidden");
}

// Get the elements
const submitButton = document.getElementById("submit-completion");
const mainListLink = document.getElementById("main-list");
const boxElement = document.querySelector(".box");
const tableElement = document.querySelector("table");

boxElement.style.display = "none";

submitButton.addEventListener("click", () => {
  console.log("Submit Completion button clicked");
  if (boxElement.classList.contains("show")) {
    boxElement.classList.remove("show");
    boxElement.classList.add("hide");
    tableElement.classList.remove("fade-out");
    setTimeout(() => {
      boxElement.style.display = "none";
      renderTable();
    }, 500); // Match the duration of the fadeOut animation (0.5s)
  } else {
    boxElement.classList.remove("hide");
    boxElement.classList.add("show");
    tableElement.classList.add("fade-out");
    boxElement.style.display = "block";
  }
});

mainListLink.addEventListener("click", () => {
  boxElement.classList.remove("show");
  boxElement.classList.add("hide");
  tableElement.classList.remove("fade-out");

  // Delay setting `display: none` until after the animation completes
  setTimeout(() => {
    boxElement.style.display = "none";
    renderTable();
  }, 500); // Match the duration of the fadeOut animation (0.5s)
});

/* CSS CHANGER WIP /*

/* const dropdownContent = document.querySelector('.dropdown-content');
const cssFiles = ['cssnew.css', 'cssnew copy.css']; // add more files as needed

// Create a list of links for the dropdown
cssFiles.forEach(file => {
  const link = document.createElement('a');
  link.href = '#';
  link.textContent = file;
  link.onclick = () => {
    changeCss(file);
  };
  const listItem = document.createElement('li');
  listItem.appendChild(link);
  dropdownContent.appendChild(listItem);
});

// Update the changeCss function to accept a file name
function changeCss(file) {
  var link = document.querySelector("link[rel='stylesheet']");
  link.href = `css/${file}`;
}
*/

// script.js

let levels = []; // Initialize the levels variable as an empty array

fetch("https://bcdbackend.onrender.com/levels")
  .then((response) => {
    console.log("Fetch call made successfully");
    return response.json();
  })
  .then((data) => {
    levels = data;
    renderTable();
  })
  .catch((error) => console.error(error));

/**
 * Renders the level table based on the sorted levels array.
 */
function renderTable() {
  const tableBody = document.getElementById("levelTable");
  const levelsSorted = getSortedLevels();
  const tableRows = levelsSorted.map(getTableRowHTML);

  // Set the innerHTML once, after the loop
  tableBody.innerHTML = tableRows.join("");

  // Force a reflow to ensure the table is properly sized
  void tableElement.offsetHeight;

  // Ensure the table is visible and not squished
  tableElement.style.display = "";
  tableElement.style.width = "100%";
  tableElement.style.visibility = "visible";
}

// Add this new function to handle table visibility
function toggleTableVisibility(visible) {
  if (visible) {
    tableElement.style.display = "";
    tableElement.style.visibility = "visible";
  } else {
    tableElement.style.visibility = "hidden";
  }
}

/**
 * Returns the sorted levels array.
 * @returns {Object[]} The sorted levels array.
 */
function getSortedLevels() {
  return levels.sort((a, b) => a.rank - b.rank);
}

/**
 * Returns the HTML for a single table row.
 * @param {Object} level The level object.
 * @returns {string} The HTML for the table row.
 */
function getTableRowHTML(level) {
  const videoThumbnailUrl = `https://i.ytimg.com/vi/${level.videoId}/mqdefault.jpg`;
  const videoLinkUrl = `https://www.youtube.com/watch?v=${level.videoId}`;

  return `
    <tr>
      <td class="video">
        <div class="video-container">
          <a href="${videoLinkUrl}" target="_blank">
            <img src="${videoThumbnailUrl}" class="video-thumbnail">
          </a>
          <button class="yt-button" onclick="window.open('${videoLinkUrl}', '_blank')"></button>
        </div>
      </td>
      <td>
        <button class="info" onclick="showFullInfo('${level.videoId}')">
          <h1 class="name">#${level.rank} - ${level.name}</h1>
          <br>
          <span class="completedBy">${level.completedBy}</span>
        </button>
      </td>
    </tr>
  `;
}

function showEmbed(videoId, containerId) {
  const container = document.getElementById(containerId);
  const iframe = `
    <iframe
      src="https://www.youtube.com/embed/${videoId}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      style="width: 100%; height: 100%;"
    ></iframe>
  `;
  container.innerHTML = iframe;
}

function showFullInfo(videoId) {
  document.getElementById("footer").style.display = "none";
  fullInfoContainer.classList.add("show-full-info");
  console.log("showFullInfo called with videoId:", videoId);
  toggleTableVisibility(false);
  // document.getElementById('side-boxes').style.display = 'none';
  const level = levels.find((level) => level.videoId === videoId);
  if (level) {
    // Use the level object to display the full info
    const table = document.getElementById("levelTable");

    // Hide the table
    table.style.display = "none";

    // Island 1: Level Details - Render Immediately
    const levelDetailsHTML = `
        <div class="level-details-island">
            <button onclick="hideFullInfo()" class="back-button"></button>
            <h2 class="fullinfoh2"> #${level.rank} - ${level.name}</h2>
            <h4 class="fullinfoh4">Beaten by <span class="fullcompletedby">${level.completedBy}</span>, published by: <span class="fullcreated">${level.creator}</span></h4>
            <div id="embed-container"></div>
        </div>
    `;

    // Island 2: Completions Placeholder - Render Immediately
    const completionsPlaceholderHTML = `
        <div class="completions-island">
            <h3>Completions</h3>
            <p>Loading completions...</p>
        </div>
    `;

    // Set initial HTML with placeholder for completions
    fullInfoContainer.innerHTML = levelDetailsHTML + completionsPlaceholderHTML;
    showEmbed(videoId, "embed-container"); // Show main video embed
    fullInfoContainer.style.display = "block"; // Show the container

    // Fetch completions for this level using the new endpoint (asynchronously)
    fetch(`https://bcdbackend.onrender.com/api/levels/${level.levelId}/completions`)
      .then(response => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(completions => {
        console.log("Completions fetched:", completions);
        const completionsIslandDiv = fullInfoContainer.querySelector(".completions-island");

        if (completionsIslandDiv) {
          // Format actual completions content (table or "no completions" message)
          let actualCompletionsContentHTML = '';
          if (completions.length > 0) {
            actualCompletionsContentHTML += `
              <table>
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Date</th>
                    <th>Video</th>
                  </tr>
                </thead>
                <tbody>
            `;
            completions.forEach(completion => {
              const completionDate = new Date(completion.completion_date);
              const formattedDate = completionDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
              actualCompletionsContentHTML += `
                <tr>
                  <td><strong>${completion.player_name}</strong></td>
                  <td>${formattedDate}</td>
                  <td><button class="yt-button" onclick="window.open('${completion.video_url}', '_blank')"></button></td>
                </tr>
              `;
            });
            actualCompletionsContentHTML += `
                </tbody>
              </table>
            `;
          } else {
            actualCompletionsContentHTML += '<p>No completions recorded yet.</p>';
          }
          // Update the completions island with the fetched data
          completionsIslandDiv.innerHTML = '<h3>Completions</h3>' + actualCompletionsContentHTML;
        }
      })
      .catch(error => {
        console.error("Error fetching completions:", error);
        const completionsIslandDiv = fullInfoContainer.querySelector(".completions-island");
        if (completionsIslandDiv) {
          // Update the completions island with an error message
          completionsIslandDiv.innerHTML = `
            <h3>Completions</h3>
            <p>Could not load completion data.</p>
          `;
        }
      });
  }
}

function hideFullInfo() {
  // document.getElementById('side-boxes').style.display = 'flex';
  document.getElementById("full-info-container").style.display = "none";
  // Show the table again
  toggleTableVisibility(true);
  renderTable();
  document.getElementById("levelTable").style.display = "block";
  document.getElementById("footer").style.display = "block";
  fullInfoContainer.classList.remove("show-full-info");
  renderTable();
}

// Initial table render
renderTable();
