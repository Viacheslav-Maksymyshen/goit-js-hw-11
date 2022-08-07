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

const readingInput = event => {
  event.preventDefault();
  let formElements = event.currentTarget.elements;
  let searchQuery = formElements.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }
  fetchPhoto(searchQuery)
    .then(data => {
      if (data.hits.length < 1) {
        Notiflix.Notify.failure(
          '"Sorry, there are no images matching your search query. Please try again."'
        );
        return;
      }
      renderingPhoto(data.hits);

      let modal = new SimpleLightbox('.gallery-box a', {
        captionsData: 'alt',
        captionDelay: 250,
        captionPosition: 'bottom',
      }).refresh();

      modal.on('show.simplelightbox', function () {
        console.log('ok');
      });

      modal.on('error.simplelightbox', function () {
        console.log('error');
      });
    })

    .catch(error => {
      console.log('no', error);
    });
};

inputForm.addEventListener('submit', readingInput);
loadMoreBtn.addEventListener('click');
