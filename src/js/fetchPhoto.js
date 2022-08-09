import axios from 'axios';

const KEY = '29049670-414694ca11112f13396dffd69';
const PARAM = `image_type=photo&orientation=horizontal&safesearch=true`;
const NUMBER_PICTURES = `per_page=40`;
const BASE_URL = 'https://pixabay.com/api/';
const fetchPhoto = async (searchQuery, page) => {
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${searchQuery}&${PARAM}&${NUMBER_PICTURES}&page=${page}`
  );
  return response;
};

export { fetchPhoto };
