const gallery = document.querySelector('.gallery-box');

const createList = ({
  largeImageURL,
  webformatURL,
  likes,
  views,
  comments,
  downloads,
}) =>
  `<div class="photo-card">
  <a class="gallery__link" href="${largeImageURL}">
  <img src="${webformatURL}" class="photo-img" alt="" loading="lazy"   height= "200" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;

const generateContentList = array => {
  return array?.reduce((acc, item) => acc + createList(item), '');
};

const renderingPhoto = array => {
  const resultList = generateContentList(array);
  gallery.insertAdjacentHTML('beforeend', resultList);
};

export { renderingPhoto };
