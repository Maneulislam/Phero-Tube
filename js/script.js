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

        console.log(video);

        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
            <div class="card bg-base-100  ">
                <figure class="relative">
                    <img class="relative" src="${video.thumbnail
            }" alt="Shoes" />

                    <span class="absolute bg-black text-white px-2 py-1 right-4 bottom-4">
                       ${video.others.posted_date}
                    </span>
                </figure>
                <div class="py-5 flex gap-6">


                    <div class="avatar ">
                        <div class="ring-primary ring-offset-base-100 w-12 h-12  rounded-full ring-2 ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>

                    </div>
                    <div class="space-y-2">
                        <h2 class="card-title font-semibold text-2xl">Midnight Serenade</h2>
                        <p class="flex gap-2 text-gray-500 ">${video.title} <span>
                                <img class="w-6" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"
                                    alt="">
                            </span></p>
                        <p class="text-gray-500 text-sm ">${video.others.views}</p>

                    </div>

                </div>
            </div>

        `;

        videosContainer.appendChild(videoDiv);
    }
}