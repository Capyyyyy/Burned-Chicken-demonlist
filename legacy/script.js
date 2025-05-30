// script.js
const body = document.body;
const highResImage = new Image();

highResImage.src = 'themes/default_cubes/background.png'; // high-res version

highResImage.onload = function() {
  body.style.backgroundImage = `url(${highResImage.src})`;
};








const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const fullInfoContainer = document.querySelector('.full-info-container');


hamburger.addEventListener('click', () => {
    if (nav.classList.contains('show')) {
        nav.classList.remove('show');
        nav.classList.add('hide');
    } else {
        nav.classList.remove('hide');
        nav.classList.add('show');
    }
});

var footer = document.getElementById('footer');
if (footer) {
  footer.classList.add('footer-hidden');
}



// Get the elements
const submitButton = document.getElementById('submit-completion');
const mainListLink = document.getElementById('main-list');
const boxElement = document.querySelector('.box');
const tableElement = document.querySelector('table');

boxElement.style.display = 'none';

submitButton.addEventListener('click', () => {
  console.log('Submit Completion button clicked');
  if (boxElement.classList.contains('show')) {
    boxElement.classList.remove('show');
    boxElement.classList.add('hide');
    tableElement.classList.remove('fade-out');
    setTimeout(() => {
      boxElement.style.display = 'none';
      renderTable();
    }, 500); // Match the duration of the fadeOut animation (0.5s)
  } else {
    boxElement.classList.remove('hide');
    boxElement.classList.add('show');
    tableElement.classList.add('fade-out');
    boxElement.style.display = 'block';
  }
});

mainListLink.addEventListener('click', () => {
  boxElement.classList.remove('show');
  boxElement.classList.add('hide');
  tableElement.classList.remove('fade-out');

  // Delay setting `display: none` until after the animation completes
  setTimeout(() => {
    boxElement.style.display = 'none';
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

fetch('https://bcdbackend.onrender.com/levels')
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
    const levelsSorted = getSortedLevels();
    const tableRows = levelsSorted.map(getTableRowHTML);
  
    // Set the innerHTML once, after the loop
    tableBody.innerHTML = tableRows.join('');
  
    // Force a reflow to ensure the table is properly sized
    void tableElement.offsetHeight;
  
    // Ensure the table is visible and not squished
    tableElement.style.display = '';
    tableElement.style.width = '100%';
    tableElement.style.visibility = 'visible';
  }
  
  // Add this new function to handle table visibility
  function toggleTableVisibility(visible) {
    if (visible) {
      tableElement.style.display = '';
      tableElement.style.visibility = 'visible';
    } else {
      tableElement.style.visibility = 'hidden';
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
  document.getElementById('footer').style.display = 'none';
  fullInfoContainer.classList.add('show-full-info');
  console.log('showFullInfo called with videoId:', videoId);
  toggleTableVisibility(false);
  // document.getElementById('side-boxes').style.display = 'none';
  const level = levels.find(level => level.videoId === videoId);
  if (level) {
    // Use the level object to display the full info
    const table = document.getElementById('levelTable');
    
    // Hide the table
    table.style.display = 'none';

    // Get the data for the specific level
    const levelData = `
        <div class="full-info">
            <button onclick="hideFullInfo()" class="back-button"></button>
            <h2 class="fullinfoh2"> #${level.rank} - ${level.name}</h2> 
            <h4 class="fullinfoh4">Beaten by <span class="fullcompletedby">${level.completedBy}</span>, published by: <span class="fullcreated">${level.creator}</span></h4>
            <div id="embed-container"></div>
            <!-- Your level-specific content here -->
     
        </div>
    `;
    
    fullInfoContainer.innerHTML = levelData; // Inject the level data dynamically

    // Show the embed
    const embedContainer = document.getElementById('embed-container');
    showEmbed(videoId, 'embed-container'); 
    // Show the full info container

    fullInfoContainer.style.display = 'block';
  }
}


function hideFullInfo() {
  // document.getElementById('side-boxes').style.display = 'flex';
  document.getElementById('full-info-container').style.display = 'none';
  // Show the table again
  toggleTableVisibility(true);
  renderTable();
  document.getElementById('levelTable').style.display = 'block';
  document.getElementById('footer').style.display = 'block';
  fullInfoContainer.classList.remove('show-full-info');
  renderTable();
}





// Initial table render
renderTable();
