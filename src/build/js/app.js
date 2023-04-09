"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Main components.
const btnNext = document.getElementById('btnNext');
let bgBlob = document.getElementById('bgBlob');
let jokeContent;
const reportJokes = [];
const newDate = new Date();
let actualDate = newDate.toISOString();
// Icons are shown only after getting a joke.
const showButtons = (idElement) => {
    let shownButtons = document.getElementById(idElement);
    shownButtons.style.display = "flex";
};
// Dad & Chuck Norris jokes.
function getDadJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const dadJokes = yield fetch("https://icanhazdadjoke.com/", {
            headers: {
                Accept: "application/json",
            },
        });
        const data = yield dadJokes.json();
        jokeContent = data.joke;
        document.getElementById('jokeContent').innerHTML = jokeContent;
        showButtons("rateJoke");
        return jokeContent;
    });
}
;
function getChuckNorrisJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const chuckNorrisJokes = yield fetch("https://geek-jokes.sameerkumar.website/api?format=json", {
            headers: {
                Accept: "application/json",
            },
        });
        const data = yield chuckNorrisJokes.json();
        jokeContent = data.joke;
        document.getElementById('jokeContent').innerHTML = jokeContent;
        showButtons("rateJoke");
        return jokeContent;
    });
}
;
// Dad&Chuck jokes: Randomizer to intercalete jokes.
function randomJoke() {
    let randomOption = Math.floor(Math.random() * 2) + 1;
    if (randomOption === 1) {
        getChuckNorrisJoke();
    }
    else {
        getDadJoke();
    }
}
;
//Scoring the jokes and updating the array.
const rateJoke = (score) => {
    let evaluation = {
        joke: jokeContent,
        score: score,
        date: actualDate,
    };
    reportJokes.push(evaluation);
    console.log(reportJokes);
};
// Switching between backgrounds for each new joke.
function switchBackground() {
    const randomBg = Math.round(Math.random() * 8);
    bgBlob.style.backgroundImage = `url('./images/blob-${randomBg}.svg')`;
}
;
// Weather API functionalities.
function getLocation() {
    navigator.geolocation.getCurrentPosition(weatherUser);
}
;
function weatherUser(position) {
    return __awaiter(this, void 0, void 0, function* () {
        let weatherToday = document.getElementById('weather');
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let token = 'abd700ead8fc5a6f7b3b5a9ed2b031f6';
        let units = 'metric';
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${token}&units=${units}`;
        var getWeather = {
            method: "GET",
            redirect: "follow",
        };
        const result = yield fetch(url, getWeather);
        const info = yield result.json();
        //Get weather icon and temperature.
        let temp = Math.floor(info.main.temp);
        let icon = `<img
    src="http://openweathermap.org/img/wn/${info.weather[0].icon}.png"
    alt="${info.weather[0].description}"/>`;
        weatherToday.innerHTML = `${icon} | ${temp} ºC`;
    });
}
;
getLocation();
// Event listeners.
btnNext === null || btnNext === void 0 ? void 0 : btnNext.addEventListener("click", randomJoke);
btnNext === null || btnNext === void 0 ? void 0 : btnNext.addEventListener("click", switchBackground);
