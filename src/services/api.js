import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '24447293-d3f0d6bbd906e1eb5560775ff';

const fetchImages = ({ searchQuery = '', currentPage = 1 }) => {
  const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${currentPage}&per_page=12&key=${API_KEY}`;

  return axios.get(url);
};

// eslint-disable-next-line
export default { fetchImages };
