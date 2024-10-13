console.log('Home work 11')
import './sass/main.scss';


//import axios from "axios"; ////npm install axios ??

import {fetchImages} from './component/api' //запит на бекенд
import { createMarkupGallery } from './helpers/createMarkupGallery'; //розмітка галереї

import Notiflix from 'notiflix'; //(сповіщення) ////npm i notiflix 
Notiflix.Notify.init({
    width: '340px'
});

import SimpleLightbox from "simplelightbox"; //бібліотека відображання зображання ////npm install simplelightbox
import "simplelightbox/dist/simple-lightbox.min.css";// Додатковий імпорт стилів

refs = {
    formSearch: document.querySelector('.js-form'),
    gallery: document.querySelector('.js-gallery'),
    input: document.querySelector('input'),
    loadBtn: document.querySelector('.js-load-more')
}

refs.formSearch.addEventListener('submit', handlerFormSearch);
refs.loadBtn.addEventListener('click', onLoadBtn)

let currentPage = 1; //поточна сторінка
let searchImage = ''; //що шукаємо
refs.loadBtn.classList.add('is-hidden');// ховаємо кнопку дозавантаження



//Пошук
function handlerFormSearch(evt) {
    evt.preventDefault();
   searchImage = evt.currentTarget.searchQuery.value;
    currentPage = 1; //

    fetchImages(searchImage)
        .then(({data}) => {

            console.log('What is this?:', data.hits)
            
            if (data.total === 0) { 
                //Нічого не знайдено
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                refs.loadBtn.classList.add('is-hidden');
                refs.gallery.innerHTML = '';
               return
            }
            Notiflix.Notify.success(`Horray! We found ${data.totalHits} images`);
            refs.gallery.innerHTML = (createMarkupGallery(data.hits));

            let gallery = new SimpleLightbox('.gallery a'); //бібліотека відображання зображень
            gallery.refresh(); //Destroys and reinitilized the lightbox, needed for eg. Ajax Calls, or after dom manipulations

            refs.loadBtn.classList.remove('is-hidden');
            
        })
        .catch(err => console.log(err));
    
    refs.input.value = ''; //очищаємо поле вводу

   console.log('1searchImage', searchImage)
    
}


//дозавантаження
function onLoadBtn() {
    
    currentPage += 1;
    console.log(`Дозавантажуємо картинки, сторінка - "${currentPage}"`)
    console.log('2searchImage_load', searchImage);

    fetchImages(searchImage, currentPage)
        .then(({data}) => {
        
            refs.gallery.insertAdjacentHTML('beforeend', createMarkupGallery(data.hits)); 
            let gallery = new SimpleLightbox('.gallery a'); //бібліотека відображання зображень
            gallery.refresh();
            
            isAllImages(data);  //якщо більше немає чого завантажувати
        })
        .catch(err => console.log(err));
}

function isAllImages(data) {
    const downloadImg = currentPage * 40;
    console.log(`currentPage - ${currentPage}, download - ${downloadImg}, total - ${data.total}`)
    if (currentPage * 40 >= data.total) {
        refs.loadBtn.hidden = true;
        Notify.success("We're sorry, but you've reached the end of search results.");
    }
}
