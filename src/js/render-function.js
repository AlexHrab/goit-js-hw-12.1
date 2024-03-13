

export const list = document.querySelector(".gallery")

export function createMarkup(arr){
    return arr.map(el => `<li class="gallery-item">
    <a href="${el.largeImageURL}" class="gallery-link">
    <img class="gallery-img" src="${el.webformatURL}" alt="${el.tags}" loading="lazy"/>
    </a>
    <div class="gallery-container">
    <p class="gallery-text">Likes<span>${el.likes}</span></p>
      <p class="gallery-text">Views<span>${el.views}</span></p>
      <p class="gallery-text">Comments<span>${el.comments}</span></p>
      <p class="gallery-text">Downloads<span>${el.downloads}</span></p>
    </div>
  </li>`).join(' ')
  }

  

  export function rendering(arr){
    list.insertAdjacentHTML("beforeend", createMarkup(arr)) 
    
  }