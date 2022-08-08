const KEY = '29049670-414694ca11112f13396dffd69';
const PARAM = `image_type=photo&orientation=horizontal&safesearch=true`;
const NUMBER_PICTURES = `per_page=5`;

const fetchPhoto = (searchQuery, page) => {
  const url = `https://pixabay.com/api/?key=${KEY}&q=${searchQuery}&${PARAM}&${NUMBER_PICTURES}&page=${page}`;
  return fetch(url).then(response => response.json());
};

export { fetchPhoto };
