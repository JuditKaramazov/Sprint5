// Main components.
const btnNext = document.getElementById('btnNext');
let bgBlob = document.getElementById('bgBlob');

let jokeContent: string;
const reportJokes: any = [];

const newDate = new Date();
let actualDate = newDate.toISOString()


// Icons are shown only after getting a joke.
const showButtons = (idElement: string) => {
    let shownButtons = document.getElementById(idElement) as HTMLElement;
    shownButtons.style.display = "flex";
}

// Dad & Chuck Norris jokes.
async function getDadJoke() {
    const dadJokes = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json",
        },
     });
    const data = await dadJokes.json();
    jokeContent = data.joke;
    document.getElementById('jokeContent')!.innerHTML = jokeContent;
    showButtons("rateJoke");
    return jokeContent
};

async function getChuckNorrisJoke() {
    const chuckNorrisJokes = await fetch("https://geek-jokes.sameerkumar.website/api?format=json", {
        headers: {
            Accept: "application/json",
        },
    });
    const data = await chuckNorrisJokes.json();
    jokeContent = data.joke;
    document.getElementById('jokeContent')!.innerHTML = jokeContent;
    showButtons("rateJoke");
    return jokeContent
};

// Dad&Chuck jokes: Randomizer to intercalete jokes.
function randomJoke() {
    let randomOption = Math.floor(Math.random() *2) + 1;

    if (randomOption === 1) { getChuckNorrisJoke() }
    else { getDadJoke() }
};

//Scoring the jokes and updating the array.
const rateJoke = (score: number) => {
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
    bgBlob!.style.backgroundImage = `url('./images/blob-${ randomBg }.svg')`;
    };

// Weather API functionalities.
function getLocation() {
    navigator.geolocation.getCurrentPosition(weatherUser);
};

async function weatherUser(position: any) {
    let weatherToday: any = document.getElementById('weather');
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let token = 'abd700ead8fc5a6f7b3b5a9ed2b031f6';
    let units = 'metric';
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${token}&units=${units}`;

    var getWeather: any = {
      method: "GET",
      redirect: "follow",
    };

    const result: any = await fetch(url, getWeather);
    const info: any = await result.json();

    //Get weather icon and temperature.
    let temp =  Math.floor(info.main.temp);
    let icon = `<img
    src="http://openweathermap.org/img/wn/${info.weather[0].icon}.png"
    alt="${info.weather[0].description}"/>`;

    weatherToday.innerHTML = `${icon} | ${temp} ºC`;
};

getLocation();

// Event listeners.
btnNext?.addEventListener("click", randomJoke);
btnNext?.addEventListener("click", switchBackground);
