console.log('Home work 11')
import './sass/main.scss'; //css

import ImagesApiService from './component/imagesApiService'; //class
import LoadMoreBtn from './component/load-more-btn'; //class

import { createMarkupGallery } from './helpers/createMarkupGallery'; //розмітка галереї

import Notiflix from 'notiflix'; //(сповіщення) ////npm i notiflix 
Notiflix.Notify.init({
    width: '340px',
    timeout: 4000,
});

import SimpleLightbox from "simplelightbox"; //бібліотека відображання зображання ////npm install simplelightbox
import "simplelightbox/dist/simple-lightbox.min.css";// Додатковий імпорт стилів


refs = {
    formSearch: document.querySelector('.js-form'),
    gallery: document.querySelector('.js-gallery'),
    input: document.querySelector('input'),
    loadBtn: document.querySelector('.js-load-more'),
    containerBtnPage: document.querySelector('.container__btn-page')
}

const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]', //передали що
    hidden: true //відразу кнопка дозавантаження схована
});

refs.formSearch.addEventListener('submit', handlerFormSearch);
//refs.loadBtn.addEventListener('click', onLoadMoreBtn)//повісимо слухача через класс:
loadMoreBtn.refs.button.addEventListener('click', onLoadMoreBtn);

//перший пошук--
function handlerFormSearch(evt) {
    evt.preventDefault();
 
    //записуємо в query класу значення
    imagesApiService.query = evt.currentTarget.searchQuery.value; //what find
    imagesApiService.resetPage();//сторінка з 1

    // refs.loadBtn.classList.remove('is-hidden');// показуємо кнопку loadMore (перенеслі цю функцію в class)
     loadMoreBtn.show(); // показуємо кнопку loadMore
     loadMoreBtn.disable(); //'Завантажуємо...'
        
    imagesApiService.fetchArticles().then(({ data }) => {

        if (data.total === 0) { 
                //Нічого не знайдено
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
          refs.loadBtn.classList.add('is-hidden');
            clearGalleryContainer();
               return
        };

        Notiflix.Notify.success(`Horray! We found ${data.totalHits} images`);
        isAllImages(data);  //якщо більше немає чого завантажувати

        refs.gallery.innerHTML = (createMarkupGallery(data.hits));

        let gallery = new SimpleLightbox('.gallery a'); //бібліотека відображання зображень
        gallery.refresh(); //Destroys and reinitilized the lightbox, needed for eg. Ajax Calls, or after dom manipulations

        loadMoreBtn.enable(); //'Показати ще'
        refs.input.value = ''; //очищаємо поле вводу
    }).catch(err => console.log(err));
}

//loadMore через class--
function onLoadMoreBtn() {
   
    imagesApiService.incrementPage();// +1 page
    console.log(`Дозавантажуємо картинки, сторінка - "${imagesApiService.page}"`)

    loadMoreBtn.disable(); //'Завантажуємо...'
    
    imagesApiService.fetchArticles().then(({ data }) => {  
        isAllImages(data);  //якщо більше немає чого завантажувати
         
       console.log('loadMoreData:', data)
       refs.gallery.insertAdjacentHTML('beforeend', createMarkupGallery(data.hits)); 
       
        let gallery = new SimpleLightbox('.gallery a'); //бібліотека відображання зображень
        gallery.refresh();
            
        loadMoreBtn.enable(); //'Показати ще'   
        })
        .catch(err => console.log(err));  
}

function clearGalleryContainer() {
    refs.gallery.innerHTML = '';
}

function isAllImages(data) {
      if ((imagesApiService.page * imagesApiService.per_page) > data.total) {
        loadMoreBtn.hide();
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
            return
     }
    
   // console.log(`page - ${imagesApiService.page}, download - ${downloadImg}, total - ${data.total}`)
  
}



//===============================///===================///=====
//let searchImage = ''; //що шукаємо   //не потрібно при class -----
// let currentPage = 1; //поточна сторінка
//----------------якщо fetch не через class---------------------
//import {fetchImages} from './component/api' //запит на бекенд
//
// //Пошук
// function handlerFormSearch(evt) {
//     evt.preventDefault();
//    searchImage = evt.currentTarget.searchQuery.value;
//     currentPage = 1; //
//     //refs.containerBtnPage.innerHTML = '';

//     fetchImages(searchImage)
//         .then(({data}) => {
            
//             if (data.total === 0) { 
//                 //Нічого не знайдено
//                 Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//                 refs.loadBtn.classList.add('is-hidden');
//                 refs.gallery.innerHTML = '';
//                return
//             }
//             Notiflix.Notify.success(`Horray! We found ${data.totalHits} images`);
//             refs.gallery.innerHTML = (createMarkupGallery(data.hits));

//             let gallery = new SimpleLightbox('.gallery a'); //бібліотека відображання зображень
//             gallery.refresh(); //Destroys and reinitilized the lightbox, needed for eg. Ajax Calls, or after dom manipulations

//             refs.loadBtn.classList.remove('is-hidden');
            
//         })
//         .catch(err => console.log(err));
    
//     //??пагінація по сторінкам
// //     setTimeout(() => {
// //         const buttonPage = `<button class="btn btn-page">${currentPage}</button>`
// //         refs.containerBtnPage.insertAdjacentHTML('beforeend', buttonPage);
// //         console.log('BUTTONPAGE', buttonPage)
// // }, 1000)
    
//     refs.input.value = ''; //очищаємо поле вводу


// }
//дозавантаження
// function onLoadBtn() {
    
//     currentPage += 1;
//     console.log(`Дозавантажуємо картинки, сторінка - "${currentPage}"`)
//     console.log('2searchImage_load', searchImage);

//     fetchImages(searchImage, currentPage)
//         .then(({data}) => {
         
//             refs.gallery.insertAdjacentHTML('beforeend', createMarkupGallery(data.hits)); 
//             let gallery = new SimpleLightbox('.gallery a'); //бібліотека відображання зображень
//             gallery.refresh();
            
//             isAllImages(data);  //якщо більше немає чого завантажувати
//         })
//         .catch(err => console.log(err));
    
// //      //??пагінація по сторінкам
// //     setTimeout(() => {
// //         const buttonPage = `<button class="btn btn-page">${currentPage}</button>`
// //         refs.containerBtnPage.insertAdjacentHTML('beforeend', buttonPage);
// //         console.log('BUTTONPAGE', buttonPage)
// // }, 1000)
// }
// function isAllImages(data) {
//     const downloadImg = currentPage * 40;
//     console.log(`currentPage - ${currentPage}, download - ${downloadImg}, total - ${data.total}`)
//     if (currentPage * 40 >= data.total) {
//         refs.loadBtn.hidden = true;
//         Notify.success("We're sorry, but you've reached the end of search results.");
//     }
// }
//--------------------------------------
//refs.loadBtn.classList.add('is-hidden');//кнопка дозавантаження (якщо не через клас)
////Load more img--
// function onLoadMoreBtn() {
    
//    imagesApiService.incrementPage();// +1 page
//     console.log(`Дозавантажуємо картинки, сторінка - "${imagesApiService.page}"`)
    
//    imagesApiService.fetchArticles().then(({data}) => {
         
//        console.log('loadMoreData:', data)
//        refs.gallery.insertAdjacentHTML('beforeend', createMarkupGallery(data.hits)); 
       
//         let gallery = new SimpleLightbox('.gallery a'); //бібліотека відображання зображень
//         gallery.refresh();
            
//         isAllImages(data);  //якщо більше немає чого завантажувати
//         })
//         .catch(err => console.log(err));  
// }