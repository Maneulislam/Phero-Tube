// -----------------------------------------
// fetch category
// -----------------------------------------


function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}
loadCategories();


function displayCategories(categories) {

    const categoryContainer = document.getElementById('category-container');

    for (const category of categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
         <button class="btn btn-sm hover:bg-red-500 hover:text-white">${category.category}</button>
         `
        // console.log(category);
        categoryContainer.appendChild(categoryDiv)
    }

}



// -----------------------------------------
// fetch videos
// -----------------------------------------

function loadVideos() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
}

loadVideos();


function displayVideos(videos) {

    const videosContainer = document.getElementById('videos-container');

    for (const video of videos) {
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
        
        `;
    }
}