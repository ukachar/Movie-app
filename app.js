const API = "26e28fb8b1c4360d316abed4edc9ebac";
const search = document.getElementById("search");
const srchbtn = document.getElementById("srchbtn");
const moviesGroup = document.getElementById("movies-group");
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
function searchFun() {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${search.value}&page=1`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.results);

      data.results.forEach((element) => {
        moviesGroup.innerHTML += `  
        <div class="col mb-4">
        <div class="card">
          <img src="${
            IMGPATH + element.poster_path
          }" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
        </div>
      </div>
            `;
      });
    });
}
/*
const results = {
  poster_path: "/cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
  adult: false,
  overview:
    "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
  release_date: "2012-04-25",
  genre_ids: [878, 28, 12],
  id: 24428,
  original_title: "The Avengers",
  original_language: "en",
  title: "The Avengers",
  backdrop_path: "/hbn46fQaRmlpBuUrEiFqv0GDL6Y.jpg",
  popularity: 7.353212,
  vote_count: 8503,
  video: false,
  vote_average: 7.33,
};
*/
