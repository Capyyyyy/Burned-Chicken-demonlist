
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  console.log('Hamburger button clicked!');
  nav.classList.toggle('show');
});

// old data for the website not needed for now
const levelsold = [
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

  function renderTable() {
    const tableBody = document.getElementById('levelTable');
    let tableHTML = ''; // Initialize an empty string to store all the HTML

    // Sort the levels array by rank
    levels.sort((a, b) => a.rank - b.rank);

    levels.forEach(level => {
      tableHTML += `
        <tr>
          <td class="video">
            <div class="video-container">
              <img src="https://i.ytimg.com/vi/${level.videoId}/mqdefault.jpg" alt="Video thumbnail" class="video-thumbnail">
              <button class="yt-button" onclick="window.open('https://www.youtube.com/watch?v=${level.videoId}', '_blank')"></button>
            </div>
          </td>
          <td>
            <button class="info" style="background-color: transparent; border: none; padding: 6px; cursor: pointer; width: 100%; text-align: left; color: #ffffff;" onclick="showFullInfo('${level.videoId}')">
              <strong>${level.rank}. ${level.name}</strong> by ${level.creator} <br>
              First submission by: ${level.completedBy}
            </button>
          </td>
        </tr>
      `;
    });

    // Set the innerHTML once, after the loop
    tableBody.innerHTML = tableHTML;
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
