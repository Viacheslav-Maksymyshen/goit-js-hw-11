const KEY = '29049670-414694ca11112f13396dffd69';
const PARAM = `image_type=photo&orientation=horizontal&safesearch=true`;
const fetchPhoto = searchQuery => {
  const url = `https://pixabay.com/api/?key=${KEY}&q=${searchQuery}&${PARAM}`;
  return fetch(url).then(response => response.json());
};

export { fetchPhoto };
