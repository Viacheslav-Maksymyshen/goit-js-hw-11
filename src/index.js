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
    noEmptySearch();
    return;
  }

  fetchPhoto(searchQuery, page)
    .then(({ data }) => {
      if (data.hits.length < 1) {
        noImagesFound();
        return;
      }
      renderingPhoto(data.hits);

      modal = new SimpleLightbox('.gallery-box a', {
        captionsData: 'alt',
        captionDelay: 250,
        captionPosition: 'bottom',
      }).refresh();
      alertImagesFound(data);
    })

    .catch(error => {
      console.log('no', error);
    });
};

inputForm.addEventListener('submit', readingInput);

const infinteObserver = new IntersectionObserver(
  ([entry], observer) => {
    // проверяем что достигли последнего элемента
    if (entry.isIntersecting) {
      // перестаем его отслеживать
      observer.unobserve(entry.target);
      // и загружаем новую порцию контента
      LoadMorePhoto();
    }
  },
  { threshold: 0.5 }
);

const LoadMorePhoto = () => {
  page += 1;
  modal.destroy();

  fetchPhoto(searchQuery, page)
    .then(({ data }) => {
      renderingPhoto(data.hits);

      modal = new SimpleLightbox('.gallery-box a', {
        captionsData: 'alt',
        captionDelay: 250,
        captionPosition: 'bottom',
      }).refresh();

      const lastCard = document.querySelector('.photo-card:last-child');
      if (lastCard) {
        infinteObserver.observe(lastCard);
      }

      const { height: cardHeight } = document
        .querySelector('.gallery-box')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    })

    .catch(error => {
      console.log('no', error);
    });
};

loadMoreBtn.addEventListener('click', LoadMorePhoto);

const alertImagesFound = data =>
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

const noImagesFound = () =>
  Notiflix.Notify.failure(
    '"Sorry, there are no images matching your search query. Please try again."'
  );
const noEmptySearch = () =>
  Notiflix.Notify.failure('The search field must be filled');

const endOfSearch = () =>
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
