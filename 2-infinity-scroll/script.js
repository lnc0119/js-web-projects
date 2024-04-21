const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let isReadyToLoadMore = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let initialCount = 5;
const apiKey = 'eoLaffH5X9KT6E8uNmLs-V5GCRbWH3njG4rWue3D9p4';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;

// Check if all image were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        isReadyToLoadMore = true;
        loader.hidden = true;
    }
}

function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}


// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attribute) {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key]);
    }
}

// Create Elements For Links & Photos , Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        // Create <a> to link to Upsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })

        // Create <img> for photo;
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

async function getPhotos() {
    try {
        const res = await fetch(apiUrl);
        photosArray = await res.json();
        displayPhotos();
        if (isInitialLoad) {
            updateAPIURLWithNewCount(30)
            isInitialLoad = false }
    } catch (e) {
        console.log('error:', e)
    }
}

//Check to see if scrolling near button of page, Load more Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isReadyToLoadMore) {
        isReadyToLoadMore = false;
        console.log('load more');
        getPhotos();
    }
})
//On Load
getPhotos();
