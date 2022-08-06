import './css/styles.css';

import { fetchPhoto } from './js/fetchPhoto';
import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

Notiflix.Notify.init({
  timeout: 1000,
});

const inputForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery-box');
const readingInput = event => {
  event.preventDefault();
  let formElements = event.currentTarget.elements;
  let searchQuery = formElements.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }
  fetchPhoto(searchQuery)
    .then(data => {
      if (data.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        return;
      }
      renderingPhoto(data.hits);
    })

    .catch(error => {
      console.log('no', error);
    });
};

inputForm.addEventListener('submit', readingInput);

const createList = item =>
  `<div class="photo-card">
  <a class="gallery__link" href="${item.webformatURL}">
  <img src="${item.webformatURL}" class="photo-img" alt="" loading="lazy"   height= "200" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${item.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${item.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${item.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${item.downloads}
    </p>
  </div>
</div>`;

const generateContentList = array => {
  return array?.reduce((acc, item) => acc + createList(item), '');
};

const renderingPhoto = array => {
  const resultList = generateContentList(array);
  gallery.innerHTML = resultList;
};

let modal = new SimpleLightbox('.gallery-box a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

modal.on('show.simplelightbox', function () {
  console.log('ok');
});

modal.on('error.simplelightbox', function () {
  console.log('error');
});
