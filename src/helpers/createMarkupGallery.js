//Розмітка галереї
function createMarkupGallery(arr) {
    console.log('ARR_create:', arr)
    
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
         `
       <div class="gallery__item photo-card">
        <a class="image-box link" href="${largeImageURL}">
         <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a> 
         <div class="gallery__info">
            <p class="info-item">
                <b class="info-item__value">Likes: ${likes}</b>
            </p>
            <p class="info-item">
                <b class="info-item__value">Views: ${views}</b>
            </p>
            <p class="info-item">
                <b class="info-item__value">Comments: ${comments}</b>
            </p>
            <p class="info-item">
                <b class="info-item__value">Downloads: ${downloads}</b>
            </p>
         </div>
        </div>
    `).join('');
}

export { createMarkupGallery };

    
