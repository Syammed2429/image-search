let dataDiv = document.querySelector('.images')
let searchData = document.getElementById('search-data')
let imagesData;
let timerId;
let imageDiv;

const getImages = async () => {
    const response = await fetch(process.env.API);
    const results = await response.json();
    imagesData = results

    for (let images of imagesData) {
        imageDiv = document.createElement('img');
        imageDiv.src = images.urls.regular
        dataDiv.append(imageDiv)

    }
}

const getSearchResults = async (query) => {
    const response = await fetch(process.env.SEARCH_IMAGE);
    const results = await response.json();
    return results.results


}

const main = async () => {
    var searchInput = document.querySelector('.search-bar').value;
    if (!searchInput) {
        searchData.style.display = "none";

    } else {
        searchData.style.display = "flex";
        searchData.style.background = '#2d2f30';
        searchData.style.color = '#fff';


    }
    let queryInput = await getSearchResults(searchInput)
    if (queryInput === undefined) {
        return false;
    }
    appendingQuery(queryInput)

}

let appendingQuery = (q) => {
    dataDiv.innerHTML = ''
    searchData.innerHTML = ''
    for (let data of q) {
        let altDec = document.createElement("div");
        altDec.innerHTML = data.alt_description
        altDec.className = 'altDesc'
        searchData.append(altDec)

        altDec.addEventListener('click', () => {
            searchData.style.display = "none";


            let imageDiv = document.createElement('img')
            imageDiv.className = 'imageDiv'
            imageDiv.src = data.urls.regular
            dataDiv.append(imageDiv)
        })

    }
}

const debounce = (func, delay) => {
    let searchInput = document.querySelector('.search-bar').value;
    if (searchInput < 3) {
        return false;
    }

    if (timerId) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
        func();
    }, delay);
}


//Infinite scrolling 
window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 10) {
        getImages();

    }
})

getImages();