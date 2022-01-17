const API = "26e28fb8b1c4360d316abed4edc9ebac";
const search = document.getElementById("search");
const srchbtn = document.getElementById("srchbtn");
const moviesGroup = document.getElementById("movies-group");
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const hero = document.getElementById("hero");
const nav = document.getElementById("navigacija");
const searchDio = document.getElementById("searchDio");
const btnLoadMore = document.getElementById("btnLoadMore");

//Funkcija za dohvaćanje rezultata s API-ja
const searchFun = () => {
  if (praznoPolje(search.value)) {
    alert("Field is empty!");
  } else {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${search.value}&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.results);

        //Uklanjanje Hero-a nakon klika search i dodavanje NAV (VISIBILITY)
        hero.classList.add("d-none");
        searchDio.classList.add("d-none");
        nav.classList.remove("d-none");
        //Load more button prikaz
        btnLoadMore.classList.remove("d-none");

        data.results.forEach((element) => {
          let id = element.id;

          console.log(id);

          //Kreiranje "CARD" elemenata sa filmovima
          moviesGroup.innerHTML += `  
        <div class="col mb-4">
        <div class="card">
       <a data-bs-toggle="modal" data-bs-target="#modal${id}">
          <img src="${
            IMGPATH + element.poster_path
          }" class="card-img-top" id="movie_img${id}" alt="..." style="cursor: pointer;" />
         </a>
          <div class="card-body">
            <h5 class="card-title">${element.original_title}</h5>
            <p class="card-text">${provjeraDuljine(element.overview)}
            </p>
          </div>
        </div>
      </div>
            `;

          //Kreiranje "MODAL" elemenata za svaki film sa detaljnim informacijama
          moviesGroup.innerHTML += `
            <div class="modal fade" id="modal${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${
                      element.original_title
                    }</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <img src="${
                      IMGPATH + element.backdrop_path
                    }" class="card-img-top" id="movie_img${id}" alt="..." style="cursor: pointer;" />
                    <p>Release date: ${element.release_date}</p>
                    <div class="progress">
                    <div class="progress-bar bg-warning" id="progressBar" role="progressbar" style="width: ${
                      element.vote_average * 10
                    }%" aria-valuenow="${
            element.vote_average * 10
          }" aria-valuemin="0" aria-valuemax="100" data-toggle="tooltip" data-placement="top" title="Average vote is ${
            element.vote_average
          }/10">${element.vote_average}/10</div>
                  </div>
                  <br>
                     <p style="font-weight:bold;">Overview:</p>
                     <p>${element.overview}</p>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
          </div>
            `;
        });
      });
  }
};

//Funkcija za ponovno pretraživanje(briše rezultate)
const searchAgain = () => {
  moviesGroup.innerHTML = "";
  hero.classList.remove("d-none");
  searchDio.classList.remove("d-none");
  nav.classList.add("d-none");
  btnLoadMore.classList.add("d-none");
};

//Funkcija za provjeru duljine descriptiona(dodaje tri točke nakon 100 znakova)
const provjeraDuljine = (tekst) => {
  let getText = tekst.substring(tekst, 100);
  let addDots = (getText += "...");
  return addDots;
};

//Funkcija za provjeru SEARCH polja(da li je prazno)
const praznoPolje = (str) => {
  return !str.trim().length;
};

//Funkcija za učitavanje dodatnih rezultata s API-ja
const loadMore = () => {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${search.value}&page=2`
  )
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((element) => {
        let id = element.id;

        //Kreiranje "CARD" elemenata sa filmovima
        moviesGroup.innerHTML += `  
      <div class="col mb-4">
      <div class="card">
     <a data-bs-toggle="modal" data-bs-target="#modal${id}">
        <img src="${
          IMGPATH + element.poster_path
        }" class="card-img-top" id="movie_img${id}" alt="..." style="cursor: pointer;" />
       </a>
        <div class="card-body">
          <h5 class="card-title">${element.original_title}</h5>
          <p class="card-text">${provjeraDuljine(element.overview)}
          </p>
        </div>
      </div>
    </div>
          `;

        //Kreiranje "MODAL" elemenata za svaki film sa detaljnim informacijama
        moviesGroup.innerHTML += `
          <div class="modal fade" id="modal${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">${
                    element.original_title
                  }</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                  <img src="${
                    IMGPATH + element.backdrop_path
                  }" class="card-img-top" id="movie_img${id}" alt="..." style="cursor: pointer;" />
                  <p>Release date: ${element.release_date}</p>
                  <p>Average vote: ${element.vote_average}/10</p>
                   <p style="font-weight:bold;">Overview:</p>
                   <p>${element.overview}</p>
                  </div>
                  <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
        </div>
          `;
        btnLoadMore.classList.add("d-none");
      });
    });
};
