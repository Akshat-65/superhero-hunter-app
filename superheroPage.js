//Selectors
const heroImage = document.getElementById('detail-img');
const heroName = document.getElementById('detail-name');
const intelligence = document.getElementById('intelligence');
const strength = document.getElementById('strength');
const speed = document.getElementById('speed');
const durability = document.getElementById('durability');
const power = document.getElementById('power');
const combat = document.getElementById('combat');
const fullName = document.getElementById('full-name');
const placeOfBirth = document.getElementById('place-of-birth');
const firstAppearance = document.getElementById('first-appearance');
const publisher = document.getElementById('publisher');
const alignment = document.getElementById('alignment');
const gender = document.getElementById('gender');
const race = document.getElementById('race');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const eyeColor = document.getElementById('eye-color');
const hairColor = document.getElementById('hair-color');
const occupation = document.getElementById('occupation');

// Getting superheroId from local Storage
let id = JSON.parse(localStorage.getItem('superoheroId'));

fetch(`https://superheroapi.com/api.php/5848540328600061/${id}`).then((response) => {
    return response.json();
}).then((data) => {
    const details = data;

    // Setting the image of the superhero
    heroImage.setAttribute("src", details.image.url);
    console.log('fetchedImage');

    // Displaying the name of the superhero
    heroName.innerHTML = details.name;

    // Setting up the stats
    intelligence.append(details.powerstats.intelligence);
    strength.append(details.powerstats.strength);
    speed.append(details.powerstats.speed);
    durability.append(details.powerstats.durability);
    power.append(details.powerstats.power);
    combat.append(details.powerstats.combat);

    fullName.append(details.biography["full-name"]);
    placeOfBirth.append(details.biography["place-of-birth"]);
    firstAppearance.append(details.biography["first-appearance"]);
    publisher.append(details.biography["publisher"]);
    alignment.append(details.biography["alignment"]);

    //good or bad stamp depending upon the alignment of hero
    const alignmentImage = document.getElementById('alignment-image');
    if (details.biography["alignment"] == 'good') {
        alignmentImage.setAttribute('src', 'asset/' + 'good.jpg');
    } else {
        alignmentImage.setAttribute('src', 'asset/' + 'bad.jpg');
    }

    gender.append(details.appearance["gender"]);
    race.append(details.appearance["race"]);
    height.append(details.appearance["height"][0]);
    weight.append(details.appearance["weight"][1]);
    eyeColor.append(details.appearance["eye-color"]);
    hairColor.append(details.appearance["hair-color"]);
    occupation.append(details.work["occupation"]);

});


