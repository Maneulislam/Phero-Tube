// -----------------------------------------
// Spinner show and hide
// -----------------------------------------

const showLoader = () => {
    document.getElementById('loader').classList.remove('hidden');

    document.getElementById('videos-container').classList.add('hidden');
}

const hiddenLoader = () => {
    document.getElementById('loader').classList.add('hidden');

    document.getElementById('videos-container').classList.remove('hidden');
}


// -----------------------------------------
// Remove button active class
// -----------------------------------------

const removeClass = () => {

    const activeBtn = document.getElementsByClassName('active');

    for (let btn of activeBtn) {
        btn.classList.remove('active');
    }
}



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
         <button id="btn-${category.category_id}" onclick="loadCategoriesVideos(${category.category_id})"  class="btn btn-sm hover:bg-red-300 hover:text-white">${category.category}</button>
         `
        // console.log(category);
        categoryContainer.appendChild(categoryDiv)
    }

}




// -----------------------------------------
// fetch category videos
// -----------------------------------------



const loadCategoriesVideos = (id) => {

    showLoader();

    console.log(id);
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {

            removeClass();

            const btnId = document.getElementById(`btn-${id}`);
            btnId.classList.add('active');

            displayVideos(data.category)

        })
}





// -----------------------------------------
// fetch videos
// -----------------------------------------


function loadVideos(searchText = "") {

    showLoader();

    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => {

            removeClass();

            document.getElementById('btn-all').classList.add('active');

            displayVideos(data.videos)
        })
}



function displayVideos(videos) {

    const videosContainer = document.getElementById('videos-container');

    videosContainer.innerHTML = '';

    if (videos == 0) {
        videosContainer.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center py-20">
                <img class="w-[150px]" src="assets/Icon.png" alt="">
                <h2 class="text-3xl font-bold">
                    Oops!! Sorry, There is no content here
                </h2>
            </div>
        `
        hiddenLoader();
        return;
    }


    for (const video of videos) {

        // console.log(video);

        const videoDiv = document.createElement('div');



        videoDiv.innerHTML = `
            <div class="card bg-base-100  ">
                <figure class="relative">
                    <img class="w-full h-[200px] object-cover" src="${video.thumbnail
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
                        <h2 class="card-title font-semibold text-2xl">${video.title}</h2>
                        <p class="flex gap-2 text-gray-500 ">${video.authors[0].profile_name} <span>
                                ${video.authors[0].verified == true ? `<img class="w-6" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"
                                    alt="">` : ``}
                            </span></p>
                        <p class="text-gray-500 text-sm ">${video.others.views}</p>

                    </div>

                </div>
                <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
            </div>

        `;

        videosContainer.appendChild(videoDiv);
        hiddenLoader();
    }
}



// -----------------------------------------
// fetch video details
// -----------------------------------------

const loadVideoDetails = (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayVideoDetails(data.video))
}



const displayVideoDetails = (video) => {


    document.getElementById('videoDetails').showModal();



    const detailsContainer = document.getElementById('detalsContainer');


    detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>
    
    `




}


document.getElementById('search-input').addEventListener("keyup", (event) => {
    const value = event.target.value;
    loadVideos(value);
})