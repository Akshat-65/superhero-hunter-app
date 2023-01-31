// Selector
const favouriteWrapper = document.getElementById('favourite-wrapper');

// getting array of favourite ids
let favArr = JSON.parse(localStorage.getItem('favouriteId'));

if (favArr.length === 0) {
    favouriteWrapper.innerHTML = '<span class = "no-fav">No Favourites Added</span>';
}

// looping through array of favourite ids
for(let ids of favArr){

    // Fetching data from API  
    fetch(`https://superheroapi.com/api.php/5848540328600061/${ids}`).then((response)=>{
    return response.json();
}).then((data)=>{
    const details = data;

                    //Creating container for hero
    let container = document.createElement('div');
                    container.classList.add('icon-container');

                    // Displaying the name of the superhero
                    let superheroName = document.createElement('span');
                    superheroName.classList.add('superhero-name');
                    superheroName.innerText = details.name;
                    container.appendChild(superheroName);

                    // Setting the image of the superhero
                    let superheroImage = document.createElement('img');
                    superheroImage.setAttribute('src', details.image.url);
                    superheroImage.classList.add('superhero-img');
                    container.appendChild(superheroImage);

                    // to show details of superhero
                    superheroImage.addEventListener('click',(()=>{detail(details.id)}));

                    // Creating delete button
                    let deleteFav = document.createElement('div');
                    deleteFav.classList.add('delete-fav');
                    deleteFav.innerHTML = '<span> Delete </span><i class="fa-solid fa-trash"></i>';

                    // To delete favourites
                    deleteFav.addEventListener('click', (() => {deleteFavourite(ids,container)}));
                    container.appendChild(deleteFav);
                    favouriteWrapper.appendChild(container); 
})
}

// Function to delete favourite hero from favourites 
const deleteFavourite = (id,container)=>{
    container.remove();
    for(let i of favArr){
        if(i==id){
            let index = favArr.indexOf(id);
            favArr.splice(index,1);
            localStorage.setItem('favouriteId', JSON.stringify(favArr));
            console.log("deleting",id,favArr);
            break;
        }
    }
    if (favArr.length === 0) {
        favouriteWrapper.innerHTML = '<span class = "no-fav">No Favourites Added</span>';
    }
}

// function to show details of superhero when clicked
const detail = (id)=>{
    console.log(id);
    // saving id to local starage
    localStorage.setItem('superoheroId', id); 
    // navigate to the superhero page
    window.location = "superheroPage.html"; 
}