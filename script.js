require('dotenv').config();


// Sample data with YouTube video IDs for embedding
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

fetch('/levels')
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
  console.log('renderTable called'); // Add this line to print a message to the console
  const tableBody = document.getElementById('levelTable');
  tableBody.innerHTML = ''; // Clear the table

  levels.forEach(level => {
    const row = `
      <tr>
        <td class="video">
          <div class="video-container">
            <img src="https://i.ytimg.com/vi/${level.videoId}/mqdefault.jpg" alt="Video thumbnail" class="video-thumbnail">
            <button class="yt-button" onclick="window.open('https://www.youtube.com/watch?v=${level.videoId}', '_blank')"></button>
          </div>
        </td>
        <td class="info">
          <strong>${level.rank}. ${level.name}</strong> by ${level.creator} <br>
          First submition by: ${level.completedBy}
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Initial table render
renderTable();
