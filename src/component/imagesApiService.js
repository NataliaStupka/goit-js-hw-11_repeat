//fetch через class
import axios from "axios";

const API_KEY = '46431209-d317586b11431ebc8882cda13';
const BASE_URL = 'https://pixabay.com/api/';

// const options = { //????
//   headers: {
//     Authorization: API_KEY,
//   },
// };

export default class ImagesApiService {
    //ініціалізація
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  fetchArticles() {
  //console.log('this', this)
  const searchParams = new URLSearchParams({
        key: API_KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: this.per_page,
        
      });
     
    const url = `${BASE_URL}?${searchParams}`;
    console.log('axios.get(url):', axios.get(url));

    return axios.get(url);
    //fetch(url).then(r => r.json()).then(data => { console.log('2then:', data) })
    
  
  
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }


  //використовуємо get/set щоб щось записати із зовнішнього коду
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}