import axios from "axios"; ////npm install axios ??

//Запит
async function fetchImages(searchImage, currentPage=1) {
    
    console.log('currentPage', currentPage)
   const API_KEY = '46431209-d317586b11431ebc8882cda13';
   const BASE_URL = 'https://pixabay.com/api/';
    
     const params = new URLSearchParams({
            key: API_KEY,
            q: searchImage,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: currentPage,
            per_page: 40,
     });
    
    //fetch(`${BASE_URL}?key=${API_KEY}&q=${searchImage}&image_type=photo&orientation=horizontal&safesearch=true`)
    const url = `${BASE_URL}?${params}`//запит

    ///////
    // const resp = await fetch(url);
    // if (!resp.ok) {
    //     console.log('resp.statusText', resp.statusText);
    //     throw new Error('resp.statusText');
    // }
    // return await resp.json();
    ///////замінюємо на axios 
    /////////!! У fetch().then((data) => {}) заміняємо на fetch ().then(({data}) => {}) 
return await axios.get(url);
  
}

export { fetchImages };


    
    
