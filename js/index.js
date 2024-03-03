let countMessage=1;


// all post
const createPost = async (searchText2) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText2}`);

    const data = await res.json();
    const info = data.posts;
    // console.log(info);

    displayPost(info);

}

const c = '';
createPost(c);
// call all post


// searchPost
// handle search
const handleSearch = () => {

    toggleSpinner(true);
    const inputText = document.getElementById('searchId');
    const searchText = inputText.value;

    // console.log(searchText);

    // clear 
    const postContainer = document.getElementById('postContainer');

    postContainer.textContent = '';

    createPost(searchText);

    // displayPost(info);



}









// latest post
const latestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');

    const data = await res.json();
    const latestInfo = data;
    // console.log(info);

    displayLatestPost(latestInfo);

}


latestPost();



// display all post
const displayPost = (postInfos) => {

    const postContainer = document.getElementById('postContainer');

    postInfos.forEach(postInfo => {
        // console.log(postInfo);
        const postDis = document.createElement('div');

        postDis.classList = `
        flex  justify-center items-center bg-[#797DFC1A] lg:p-10 p-3 rounded-xl my-5 border border-solid border-[#797DFC] lg:w-5/6
        
        `;
    
        console.log(postInfo.id);

        postDis.innerHTML = `

        <!-- image -->
                        <div class="relative">
                            <img class="rounded-2xl " src="${postInfo.image}" alt="">
                            <div  class="bg-green-500 h-3 w-3 rounded-full  absolute top-0 right-0"></div>
                        </div>

                        <!--card body -->
                        <div class="ml-3">
                            <div class="font-medium text-stone-500 flex gap-10">
                                <!-- category -->
                                <p># ${postInfo.category}</p>

                                <!--Author name  -->
                                <p>Author : ${postInfo.author.name}</p>

                            </div>

                            <div>
                                <!-- name -->
                                <h2 class="text-xl font-bold mt-5">${postInfo.title}</h2>

                                <!-- description -->
                                <p class="text-stone-400 my-4">${postInfo.description}</p>
                                <div class="mb-5 border-t border-dashed border-gray-400"></div>

                            </div>

                            <!-- card comment section -->
                            <div class="flex justify-between ">
                                <div class="flex gap-3 lg:gap-12 justify-center items-center">
                                    <!-- message -->
                                    <div class="flex gap-2 justify-center items-center">
                                        <i class="fa-solid fa-message"></i>
                                        <!-- message count -->
                                        <p>${postInfo.comment_count}</p>
                                    </div>
                                    <!-- view -->
                                    <div class="flex gap-2 justify-center items-center">
                                        <i class="fa-regular fa-eye"></i>
                                        <!-- view count -->
                                        <p> ${postInfo.view_count}</p>
                                    </div>
                                    <!-- time -->
                                    <div class="flex gap-2 justify-center items-center">
                                        <div> <i class="fa-regular fa-clock"></i></div>
                                        
                                        <!-- time count -->
                                        <p>${postInfo.posted_time}</p>
                                        <p class="lg:mr-12 mr-3">min</p>
                                    </div>

                                </div>
                                <!-- message button check -->
                                <div>
                                    <button onclick="handleMessage('${postInfo.view_count}','${postInfo.title}')" class="btn  bg-[#797DFC]"><i class="fa-regular fa-envelope"></i></button>
                                </div>

                            </div>
                        </div>

        `;

        postContainer.appendChild(postDis);

    });

    toggleSpinner(false);
}




// handleMessage
const handleMessage = (view,title) => {

    // calculate count
    countFunc(countMessage++);


    const messageContainer = document.getElementById('messageContainer');
    


    const messageDis = document.createElement('div');

    messageDis.classList = `flex justify-between bg-white pb-3 px-3 rounded-2xl mt-4`;

    messageDis.innerHTML = `
        <h2 class="text-lg font-bold mt-5">${title}</h2>

        <!-- view -->
        <div class="flex gap-2 justify-center items-center">
            <i class="fa-regular fa-eye"></i>
            <!-- view count -->
            <p> ${view}</p>
        </div>
        
        `;

        const getText=document.getElementById('id');

        messageContainer.appendChild(messageDis);

}


const countFunc = (num) =>{
    const countNum = document.getElementById('countTotalMessage');

    countNum.innerText=num;
}



// display latest post   

const displayLatestPost = (latestPostInfos) => {
    const latestContainer = document.getElementById('latestContainer');

    latestPostInfos.forEach(latestPostInfo => {
        // console.log(latestPostInfo);

        const latestPostDis = document.createElement('div');

        latestPostDis.classList = `p-6 border border-solid border-gray-900 rounded-3xl my-5`;

        latestPostDis.innerHTML = `
        
        <div>
        <img src="${latestPostInfo.cover_image}" alt="">
    </div>

    <div class="flex gap-3 my-3">
        <i class="fa-solid fa-calendar-days"></i>
        <p>${latestPostInfo.author.posted_date ? latestPostInfo.author.posted_date : "No Publish Date"}</p>
    </div>

    <div>
        <!-- name -->
        <h2 class="text-xl font-bold mt-5">${latestPostInfo.title}</h2>

        <!-- description -->
        <p class="text-stone-400 my-4">${latestPostInfo.description}</p>
    </div>

    <div class="flex gap-4">
        <!-- img -->
        <img class="w-11 h-11 rounded-full" src="${latestPostInfo.profile_image}" alt="">

        <div>
            <p class="font-semibold">${latestPostInfo.author.name}</p>
            <p class="text-gray-600">${latestPostInfo.author.designation ? latestPostInfo.author.designation : "Unknown"}</p>
        </div>
    </div>

        
        `;

        latestContainer.appendChild(latestPostDis);

    });
}


// spinner

const toggleSpinner=(isLoading)=>{
    const loadingSpinner = document.getElementById('loading-Spinner');
    
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{

        setTimeout(function() {
            loadingSpinner.classList.add('hidden');
        }, 2000);
    }
}

