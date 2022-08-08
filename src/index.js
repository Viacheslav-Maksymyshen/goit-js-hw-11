import './css/styles.css';

import { fetchPhoto } from './js/fetchPhoto';
import { renderingPhoto } from './js/renderPhoto';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

Notiflix.Notify.init({
  timeout: 4000,
});

const inputForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('[data-action="Load-more"]');
const gallery = document.querySelector('.gallery-box');

let searchQuery = '';
let modal;
let page = 1;

const readingInput = event => {
  event.preventDefault();
  page = 1;
  let formElements = event.currentTarget.elements;
  searchQuery = formElements.searchQuery.value.trim();
  gallery.innerHTML = '';
  if (searchQuery === '') {
    return;
  }

  fetchPhoto(searchQuery, page)
    .then(data => {
      if (data.hits.length < 1) {
        Notiflix.Notify.failure(
          '"Sorry, there are no images matching your search query. Please try again."'
        );
        return;
      }
      renderingPhoto(data.hits);

      modal = new SimpleLightbox('.gallery-box a', {
        captionsData: 'alt',
        captionDelay: 250,
        captionPosition: 'bottom',
      }).refresh();
    })

    .catch(error => {
      console.log('no', error);
    });
};

inputForm.addEventListener('submit', readingInput);

const LoadMorePhoto = () => {
  page += 1;
  modal.destroy();
  if (searchQuery === '') {
    return;
  }
  fetchPhoto(searchQuery, page)
    .then(data => {
      renderingPhoto(data.hits);

      modal = new SimpleLightbox('.gallery-box a', {
        captionsData: 'alt',
        captionDelay: 250,
        captionPosition: 'bottom',
      }).refresh();
    })

    .catch(error => {
      console.log('no', error);
    });
};

loadMoreBtn.addEventListener('click', LoadMorePhoto);
