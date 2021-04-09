import arrayDayInOrder from './Utilitaire/gestionTemps.js';

const APIKEY = "dc8c9152e8adaad0ec8bf635818c0d42";
let APIresults;
const time = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const location = document.querySelector('.localisation');
const hour = document.querySelectorAll('.heure-nom-prevision');
const tempForH = document.querySelectorAll('.heure-prevision-valeur');
const logo = document.querySelector('.logo-meteo');
const previsionName = document.querySelectorAll('.jour-prevision-nom');
const previsionTemp = document.querySelectorAll('.jour-prevision-temps');
const containerChargement = document.querySelector('.overlay-icone-chargement');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        let long = position.coords.longitude;
        let lat = position.coords.latitude;

        APICall(long,lat);
    }, () => {
        alert('Vous avez refusé la géolocalisation, l\'applicaition ne peut pas fonctionner, veuillez l\'activer');
    });
} else {
    
}

function APICall(long, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lon=${long}&lat=${lat}&exclude=minutely&appid=${APIKEY}&units=metric&lang=fr`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        APIresults = data;
        time.innerText = APIresults.current.weather[0].description;
        temperature.innerText = Math.trunc(APIresults.current.temp) + "°";
        location.innerText = APIresults.timezone;

        // les heures, par tranche de trois, avec leur température
        let thisHour = new Date().getHours();

        for (let i = 0; i < hour.length; i++) {
            let incrHour = thisHour + i * 3;

            if (incrHour > 24) {
                hour[i].innerText = `${incrHour - 24} h`;
            } else if (incrHour === 24) {
                hour[i].innerText = '00 h';
            } else{
                hour[i].innerText = `${incrHour} h`;
            }

        }

        // temps pour 3 h
        for (let j = 0; j < tempForH.length; j++) {
            tempForH[j].innerText = `${Math.trunc(APIresults.hourly[j * 3].temp)} °`;
        }

        // Trois premieres lettres des jours
        for (let h = 0; h < previsionName.length; h++) {
            previsionName[h].innerText = arrayDayInOrder[h].slice(0,3);
            previsionTemp[h].innerText = `${Math.trunc(APIresults.daily[h + 1].temp.day)} °`
        }

        // Logo dynamique
        if (thisHour >= 6 && thisHour < 17) {
            logo.src = `Ressources/jour/${APIresults.current.weather[0].icon}.svg`;
        } else{
            logo.src = `Ressources/nuit/${APIresults.current.weather[0].icon}.svg`;
        }

        containerChargement.classList.add('disparition');
    });
}