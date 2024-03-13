import axios from 'axios';
export const perPage = 15;

  axios.defaults.baseURL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const KEY = '42750923-b31641a9e28119200a05c3b82';
  
  export async function getPicture(value, page) {
  const result =  await axios.get(`${END_POINT}`, {params: {
    key: KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page
  }})
  return result
}
