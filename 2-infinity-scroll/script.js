const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const COUNT = 10;
const APIKEY = 'eoLaffH5X9KT6E8uNmLs-V5GCRbWH3njG4rWue3D9p4';
// Unsplash API
const apiUrl =  `https://api.unsplash.com/photos/random?client_id=${APIKEY}&count=${COUNT}`;

// Create Elements For Links & Photos , Add to DOM
function displayPhotos(){
    photosArray.forEach((photo)=> {
        // Create <a> to link to Upsplash
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');
        // Create <img> for photo;
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}
async function getPhotos(){
    try {
        const res = await fetch(apiUrl);
        photosArray = await res.json();
        displayPhotos();
    }catch (e) {
        console.log('error:',e)
    }
}

//On Load
getPhotos();
