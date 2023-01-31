//Selectors
const searchBar = document.getElementById('search-bar');
const superheroContainer = document.querySelector('.superhero-container');

// getting array of favourite id's from local storage. if not present, creating one.
let favArr = JSON.parse(localStorage.getItem('favouriteId'));
if (favArr === null) {
    favArr = [];
    localStorage.setItem('favouriteId', JSON.stringify(favArr));
}

searchBar.addEventListener('keyup', superheroFinder);

//Functions 
function superheroFinder() {
    if (searchBar.value.trim().length !== 0) {
        superheroContainer.innerHTML = '<span>Loading...</span>';

        //Fetching data from API
        fetch(`https://superheroapi.com/api.php/5848540328600061/search/${searchBar.value}`).then((response) => {
            return response.json();
        }).then((data) => {
            superheroContainer.innerHTML = '';
            const heroData = data.results;
            console.log(heroData);
            if (heroData) {
                for (let hero of heroData) {
                    //Creating container for hero
                    let container = document.createElement('div');
                    container.classList.add('icon-container');

                    // For displaying name of superhero
                    let superheroName = document.createElement('span');
                    superheroName.classList.add('superhero-name');
                    superheroName.innerText = hero.name;
                    container.appendChild(superheroName);

                    // Setting the image of the superhero
                    let superheroImage = document.createElement('img');
                    superheroImage.setAttribute('src', hero.image.url);
                    superheroImage.classList.add('superhero-img');
                    container.appendChild(superheroImage);

                    // to show details of superhero
                    superheroImage.addEventListener('click', (() => { descriptionPage(hero.id) }));

                    // Creating favourite button
                    let addToFav = document.createElement('div');
                    addToFav.classList.add('add-to-fav');

                    // Checking if it is already added to favourites
                    if (favArr.includes(hero.id)) {
                        addToFav.innerHTML = '<span>My Favourite</span><i class="fa fa-heart red-color"></i>';
                    }
                    else {
                        addToFav.innerHTML = '<span>Add to Favourite</span><i class="fa fa-heart white-color"></i>';
                    }

                    // Adding to favourites or removing from favourites if already added on clicking 
                    addToFav.addEventListener('click', (() => { addToFavourite(hero.id, addToFav) }));

                    container.appendChild(addToFav);
                    superheroContainer.appendChild(container);
                }
            }
            else {
                superheroContainer.innerHTML = '<span>No Superhero found</span>';
            }
        })
    }
    else {
        superheroContainer.innerHTML = '';
    }
}

// function to show details of superhero when clicked
const descriptionPage = (detailsId) => {
    console.log(detailsId);

    // saving id to local starage
    localStorage.setItem('superoheroId', detailsId);

    // navigate to the superhero description page
    window.location = "superheroPage.html";
}

// Function to add to favourites and remove from favourites according to condition
const addToFavourite = (favId, addToFav) => {
    console.log(favId);
    // Checking whether the superhero is already added to favourites or not
    if (favArr.includes(favId)) {
        // if already added than looping through the array and deleting the superhero from favourites
        for (let i of favArr) {
            if (i === favId) {
                let index = favArr.indexOf(favId);
                favArr.splice(index, 1);
                localStorage.setItem('favouriteId', JSON.stringify(favArr));
                console.log("deleting", favId, favArr);
                break;
            }
        }
        addToFav.innerHTML = '<span>Add to Favourite</span><i class="fa fa-heart white-color"></i>'
    }
    else {
        // adding superhero to favourites and superhero id to favourite array in local storage
        favArr.push(favId);
        localStorage.setItem('favouriteId', JSON.stringify(favArr));
        console.log("adding", favId, favArr);
        addToFav.innerHTML = '<span>My Favourite</span><i class="fa fa-heart red-color"></i>';
    }
}




