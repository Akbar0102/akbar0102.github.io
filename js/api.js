let base_url = "https://api.football-data.org/v2/";
const api_token = 'e483fa19387a4ec1907f235fb6f7e07c';
const id_liga = 2002;

//global data team
let data_team;

//url untuk api
let standing = `${base_url}competitions/${id_liga}/standings?standingType=TOTAL`;
let teams = `${base_url}competitions/${id_liga}/teams`;
let team_by_id = `${base_url}teams/`;

function fetchAPI(url){
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_token
    }
  });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getArticles() {
  if ("caches" in window) {
    caches.match(standing).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let articlesHTML = "";
      data.standings.forEach(function(standing){
        let info = "";
        standing.table.forEach(function(article) {
          info += `<tr>
            <td>${article.position}</td>
            <td><img class="responsive-img" width="24" height="24" src="${ article.team.crestUrl || 'img/empty_badge.svg'}"> ${article.team.name}</td>
            <td>${article.playedGames}</td>
            <td>${article.won}</td>
            <td>${article.draw}</td>
            <td>${article.lost}</td>
            <td>${article.goalsFor}</td>
            <td>${article.goalsAgainst}</td>
            <td>${article.goalDifference}</td>
            <td>${article.points}</td>
          </tr>`;
        })
        articlesHTML += `
        <div class="col s12 m12">
          <div class="card">
            <div class="card-content">
              <h5 class="header">${standing.stage}</h5>
              <table class="responsive-table striped">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Team</th>
                    <th>Played</th>
                    <th>Won</th>
                    <th>Draw</th>
                    <th>Lost</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>` + info + `</tbody>
              </table>
            </div>
          </div>
        </div>`
      });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetchAPI(standing)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      let articlesHTML = "";
      data.standings.forEach(function(standing){
        let info = "";
        standing.table.forEach(function(article) {
          info += `<tr>
            <td>${article.position}</td>
            <td><img class="responsive-img" width="24" height="24" src="${ article.team.crestUrl || 'img/empty_badge.svg'}"> ${article.team.name}</td>
            <td>${article.playedGames}</td>
            <td>${article.won}</td>
            <td>${article.draw}</td>
            <td>${article.lost}</td>
            <td>${article.goalsFor}</td>
            <td>${article.goalsAgainst}</td>
            <td>${article.goalDifference}</td>
            <td>${article.points}</td>
          </tr>`;
        })
        articlesHTML += `
        <div class="col s12 m12">
          <div class="card">
            <div class="card-content">
              <h5 class="header">${standing.stage}</h5>
              <table class="responsive-table striped">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Team</th>
                    <th>Played</th>
                    <th>Won</th>
                    <th>Draw</th>
                    <th>Lost</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>` + info + `</tbody>
              </table>
            </div>
          </div>
        </div>`
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getTeams() {
  if ("caches" in window) {
    caches.match(teams).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          // simpan response ke variabel
          data_team = data;
          let articlesHTML = "";
          articlesHTML += '<div class="row">'
          data.teams.forEach(function(team){
            articlesHTML +=  `
            <div class="col s12 m6 l6">
              <div class="card">
                <div class="card-content">
                  <div class="center"><img width="64" height="64" src="${team.crestUrl || 'img/empty_badge.svg'}"></div>
                  <div class="center flow-text">${team.name}</div>
                  <div class="center">${team.area.name}</div>
                  <div class="center"><a href="${team.website}" target="_blank">${team.website}</a></div>
                </div>
                <div class="card-action right-align">
                    <a class="waves-effect waves-light btn-small" onclick="getTeamById(${team.id})"><i class="material-icons left">star</i>Add to Favorite</a>
                </div>
              </div>
            </div>
          `
          });
          articlesHTML += "</div>";
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetchAPI(teams)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      data_team = data;
      // Menyusun komponen card artikel secara dinamis
      let articlesHTML = "";
      articlesHTML += '<div class="row">';
      data.teams.forEach(function(team){
        articlesHTML +=  `
        <div class="col s12 m6 l6">
          <div class="card">
            <div class="card-content">
              <div class="center"><img width="64" height="64" src="${team.crestUrl || 'img/empty_badge.svg'}"></div>
              <div class="center flow-text">${team.name}</div>
              <div class="center">${team.area.name}</div>
              <div class="center"><a href="${team.website}" target="_blank">${team.website}</a></div>
            </div>
            <div class="card-action right-align">
                <a class="waves-effect waves-light btn-small" onclick="getTeamById(${team.id})"><i class="material-icons left">star</i>Add to Favorite</a>
            </div>
          </div>
        </div>
      `
      });
      articlesHTML += "</div>";
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getTeamById(idParam) {
  var team = data_team.teams.filter(team => team.id == idParam)[0]
  saveForLater(team);
}

function getSavedTeams(){
  getAll().then(function(data){
    console.log(data);
    //menyusun komponen card artikel secara dinamis
    let articlesHTML = "";
    articlesHTML += '<div class="row">'
    data.forEach(function(team){
      articlesHTML +=  `
      <div class="col s12 m6 l6">
        <div class="card">
          <div class="card-content">
            <div class="center"><img width="64" height="64" src="${team.crestUrl || 'img/empty_badge.svg'}"></div>
            <div class="center flow-text">${team.name}</div>
            <div class="center">${team.area.name}</div>
            <div class="center"><a href="${team.website}" target="_blank">${team.website}</a></div>
          </div>
          <div class="card-action right-align">
              <a class="waves-effect waves-light btn-small" onclick="removeTeamById(${team.id})"><i class="material-icons left">delete</i>Delete</a>
          </div>
        </div>
      </div>
    `
    });
    articlesHTML += "</div>";
    //sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
  })
}

function removeTeamById(idParam){
  deleteFromLater(idParam);
}

