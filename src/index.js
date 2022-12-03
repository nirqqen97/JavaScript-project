import axios from 'axios'; 
import refs from './js/refs';

refs.hideMessage.classList.add('clear');
refs.searchForm.addEventListener('submit', onClickBtnSearch);

fetchFilmotekaPopularFilms();

async function fetchFilmotekaPopularFilms(){  
  refs.hideMessage.classList.add('clear'); 
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=dbc34002be87151e0df6d0e75806eaf7`);
    const filme = response.data.results;        
    refs.filmCards.insertAdjacentHTML("beforeend", filme.map(item=>
      `<div class="photo-card">
        <a class="photo-card__link"  href="https://image.tmdb.org/t/p/w500${item.backdrop_path}">
          <img  src="https://image.tmdb.org/t/p/w500${item.poster_path}" data-source="${item.poster_path}" alt="${item.original_title}" loading="lazy" width="100%" height="90%" style="border-radius: 5px;"/>
        </a>  
        <div class="info">
          <p class="">${item.original_title}</p>
          <p class="info-item">${item.media_type}</p>           
        </div>          
      </div> `) 
    .join(''));
  }
  catch (error) {   
    refs.hideMessage.classList.remove('clear');    
  }
}

function onClickBtnSearch(evt) {
  evt.preventDefault();
  if(refs.input.value===''){  
    fetchFilmotekaPopularFilms();
    return;
  }
  refs.filmCards.innerHTML ='';
  refs.hideMessage.classList.add('clear');
  fetchFilmoteka(refs.input.value.trim()); 
 
} 
   
async function fetchFilmoteka(name){    
  try {
    const response = await axios.get(`https://api.themoviedb.org/3//search/movie?api_key=dbc34002be87151e0df6d0e75806eaf7&query=${name}`);
    const filme = response.data.results;         
    if (filme.length === 0){ 
      refs.hideMessage.classList.remove('clear');    
      refs.filmCards.innerHTML = '';      
    }     
    else {               
      refs.filmCards.insertAdjacentHTML("beforeend", filme.map(item=>
        `<div class="photo-card">
        <a class="photo-card__link"  href="https://image.tmdb.org/t/p/w500${item.backdrop_path}">
          <img  src="https://image.tmdb.org/t/p/w500${item.poster_path}" data-source="${item.poster_path}" alt="${item.original_title}" loading="lazy" width="100%" height="90%" style="border-radius: 5px;"/>
        </a>  
        <div class="info">
          <p class="">${item.original_title}</p>
          <p class="info-item">${item.release_date}</p>           
        </div>          
      </div> `) 
    .join(''));                  
    }       
  }
  catch (error) {   
    refs.hideMessage.classList.remove('clear'); 
  }
}













