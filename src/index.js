import axios from 'axios';

const btnSubmit = document.querySelector('.search__form');
const input = document.querySelector('.input');
const filmoteka = document.querySelector('.filmoteka');
const message = document.querySelector('.message');

message.classList.add('clear');

btnSubmit.addEventListener('submit', onClickBtnSearch);

fetchFilmotekaPopularFilms();

async function fetchFilmotekaPopularFilms() {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=dbc34002be87151e0df6d0e75806eaf7`
    );
    const film = response.data.results;
    console.log(film);
    filmoteka.insertAdjacentHTML(
      'beforeend',
      film
        .map(
          item =>
            `<div class="photo-card">
        <a class="photo-card__link"  href="https://image.tmdb.org/t/p/w500${item.backdrop_path}">
          <img  src="https://image.tmdb.org/t/p/w500${item.poster_path}" data-source="${item.poster_path}" alt="${item.original_title}" loading="lazy" width="100%" height="90%" style="border-radius: 5px;"/>
        </a>  
        <div class="info">
          <p class="">${item.original_title}</p>
          <p class="info-item">${item.media_type}</p>           
        </div>          
      </div> `
        )
        .join('')
    );
  } catch (error) {
    message.classList.remove('clear');
  }
}

function onClickBtnSearch(evt) {
  evt.preventDefault();
  if (input.value === '') {
    return;
  }
  filmoteka.innerHTML = '';
  message.classList.add('clear');
  fetchFilmoteka(input.value.trim());
}

async function fetchFilmoteka(name) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3//search/movie?api_key=dbc34002be87151e0df6d0e75806eaf7&query=${name}`
    );
    const film = response.data.results;
    if (film.length === 0) {
      message.classList.remove('clear');
      filmoteka.innerHTML = '';
    } else {
      filmoteka.insertAdjacentHTML(
        'beforeend',
        film
          .map(
            item =>
              `<div class="photo-card">
        <a class="photo-card__link"  href="https://image.tmdb.org/t/p/w500${item.backdrop_path}">
          <img  src="https://image.tmdb.org/t/p/w500${item.poster_path}" data-source="${item.poster_path}" alt="${item.original_title}" loading="lazy" width="100%" height="90%" style="border-radius: 5px;"/>
        </a>  
        <div class="info">
          <p class="">${item.original_title}</p>
          <p class="info-item">${item.release_date}</p>           
        </div>          
      </div> `
          )
          .join('')
      );
    }
  } catch (error) {
    message.classList.remove('clear');
  }
}
