const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');


hamburger.addEventListener('click', () => {
  if (nav.classList.contains('show')) {
    nav.classList.add('hide');
    setTimeout(() => {
      nav.classList.remove('show');
    }, 300);
  } else {
    nav.classList.add('show');
    nav.classList.remove('hide');
  }
});

const dropdownContent = document.querySelector('.dropdown-content');
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




// old data for the website not needed for now
const levelsolds = [
    { rank: 1, level: "Tidal Wave", creator: "OniLink", completedBy: "Zoink", videoId: "9fsZ014qB3s" },
    { rank: 2, level: "Untitled", creator: "iiLuna", completedBy: "Phát Võ", videoId: "JdkvhuCW3CQ" },
    { rank: 3, level: "Bloodbath", creator: "Riot", completedBy: "Frisk", videoId: "9bZkp7q19f0" },
    { rank: 4, level: "Acu", creator: "Neigefeu", completedBy: "TheRealTommy", videoId: "9bZkp7q19f0" },
    { rank: 5, level: "Windy Landscape", creator: "Woogi1411", completedBy: "Burnedchicken1", videoId: "PDub8iNVY4E" },
    { rank: 6, level: "B", creator: "Motleyorc", completedBy: "Capy", videoId: "9bZkp7q19f0" },
    { rank: 7, level: "Decode", creator: "Rek3dge ", completedBy: "Skittle503", videoId: "9bZkp7q19f0" },
    { rank: 8, level: "IspyWithMyLittleEye", creator: "Voxicat", completedBy: "Captenic593", videoId: "9bZkp7q19f0" },
    { rank: 9, level: "The Nightmare", creator: "Jax", completedBy: "彡SoᥙᥙꙆ", videoId: "9bZkp7q19f0" }
];

// script.js

let levels = []; // Initialize the levels variable as an empty array

fetch('http://localhost:3000/levels')
  .then(response => {
    console.log('Fetch call made successfully');
    return response.json();
  })
  .then(data => {
    levels = data;
    renderTable();
  })
  .catch(error => console.error(error));

  /**
 * Renders the level table based on the sorted levels array.
 */
function renderTable() {
  const tableBody = document.getElementById('levelTable');
  const levelsSorted = getSortedLevels(); // Extract sorting logic
  const tableRows = levelsSorted.map(getTableRowHTML); // Use map to create an array of table rows

  // Set the innerHTML once, after the loop
  tableBody.innerHTML = tableRows.join('');
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
            <img src="${videoThumbnailUrl}" alt="Video thumbnail" class="video-thumbnail">
          </a>
          <button class="yt-button" onclick="window.open('${videoLinkUrl}', '_blank')"></button>
        </div>
      </td>
      <td>
        <button class="info" onclick="showFullInfo('${level.videoId}')">
          <span class="name">#${level.rank} - ${level.name}</span>
          <br>
          First submission by: ${level.completedBy}
        </button>
      </td>
    </tr>
  `;
}

function showEmbed(videoId, containerId) {
  const container = document.getElementById(containerId);
  const iframe = `
    <iframe
      src="https://www.youtube-nocookie.com/embed/${videoId}"
      frameborder="0"
      allowfullscreen
    ></iframe>
  `;
  container.innerHTML = iframe;
}
  
function showFullInfo(videoId) {
  const tableBody = document.getElementById('levelTable');
  tableBody.innerHTML = '';
  const level = levels.find(level => level.videoId === videoId);

  if (level) {
    const fullInfoHTML = `
      <tr class="full-info">
        <td colspan="2" class="full-info">
          <button class="back-button" onclick="renderTable()">
            &#8592;
          </button>
          <div class="level-info">
            <h2>${level.rank}. ${level.name}</h2>
            <div class="level-details">
              <p><strong>Creator:</strong> ${level.creator}</p>
              <p><strong>First Victor:</strong> ${level.completedBy}</p>
            </div>
          </div>
          <div id="embed-container"></div>
        </td>
      </tr>
    `;

    tableBody.innerHTML = fullInfoHTML;
    showEmbed(videoId, 'embed-container');
  }
}


// Initial table render
renderTable();
