import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import {getPicture, perPage} from "./js/pixabay-api"
import {rendering} from "./js/render-function";
import {list} from "./js/render-function";
const form = document.querySelector("form");
const input = document.querySelector("input");
const PgBtn = document.querySelector(".pagin-button");
const loader = document.querySelector(".loader");
let page = 1;

function scrollOn(element){
  const value = element.getBoundingClientRect();
  const scrolHeight = value.height*2;
  window.scrollBy({
    top: scrolHeight,
    behavior : "smooth"
  });
}

function showLoader() {
  loader.classList.remove("is-hidden");
  }

  function hideLoader() {
    loader.classList.add("is-hidden");
    }

    function showBtn() {
      PgBtn.classList.remove("is-hidden");
      }
    
      function hideBtn() {
        PgBtn.classList.add("is-hidden");
        }

        function theEnd(length, page){
          if(length < page){
            iziToast.warning({
              message: 'We are sorry, but youve reached the end of search results.!', position: "center", close: false, closeOnClick: true, progressBar: false, messageSize: 30, timeout: false, displayMode: 1
            }); 
            hideBtn();
        }
        }

async function forListener(e){
  e.preventDefault();
  page = 1;
  showLoader();
  list.innerHTML = "";
  const inputValue = form.elements.field.value;
 if(inputValue){ 
  try{ 
   const result = await getPicture(inputValue, page);
    if(result.data.total !== 0){
    rendering(result.data.hits);
    modal.refresh();
    showBtn();
    theEnd(result.data.hits.length, perPage)
  }else{
  iziToast.warning({
    message: 'Sorry, there are no images matching your search query. Please try again!', position: "center", close: false, closeOnClick: true, progressBar: false, messageSize: 30, timeout: false, displayMode: 1
})
input.value = ""
hideBtn();
 }}
 catch(eror){
      iziToast.warning({
        message: 'Ups, something wrong bad. Please try again!', position: "center", close: false, closeOnClick: true, progressBar: false, messageSize: 30, timeout: false, displayMode: 1
    })  
     }
     finally{hideLoader()} 
}else{iziToast.warning({
  message: 'Please enter the name of the picture!', position: "center", close: false, closeOnClick: true, progressBar: false, messageSize: 30, timeout: false, displayMode: 1, transitionIn: "flipInX"
})
hideLoader()
}
}

async function forPgBtn(e){
 page++;
  e.preventDefault();
  showLoader();
  const inputValue = form.elements.field.value;
  try{ 
    const result = await getPicture(inputValue, page);
    rendering(result.data.hits);
    modal.refresh();
    const item = document.querySelector(".gallery-item");
scrollOn(item);
theEnd(result.data.hits.length, perPage)}
catch(eror){
  iziToast.warning({
    message: 'Ups, something wrong bad. Please try again!', position: "center", close: false, closeOnClick: true, progressBar: false, messageSize: 30, timeout: false, displayMode: 1
})}  
finally{hideLoader()}  
}

form.addEventListener("submit", forListener);
PgBtn.addEventListener("click", forPgBtn); 
const modal = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: '250'});
