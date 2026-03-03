import {backgroundUpdate} from "./backgroundUpdate.js"


const form = document.querySelector('form')
let card = document.querySelector('.card')
const error404Display = document.querySelector('.error_404')
const apiKey = '80ceb5c298164f5180960308260303'

// const url = `https://api.unsplash.com/search/photos?query=${countryName}`

form.addEventListener('submit', (event) => {
    let cityName = (document.querySelector('.weatherApp_form-input')).value.toLowerCase() // immediately getting city name 
    console.log(cityName)
    event.preventDefault()

    cityName !== "" ? checkCity(cityName) : error404Function(cityName)


})


async function checkCity(cityName) {

    try {
        const weatherData = await getWeatherData(cityName)
        
        uploadWeatherInformation(weatherData)

    }
    catch (error) {
        console.log(error)
        error404Function(cityName)
    }

}

async function getWeatherData(cityName) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=80ceb5c298164f5180960308260303&q=${cityName}`
    const cityData = await (await fetch(apiUrl)).json()
    console.log(cityData)
    const {location}  = cityData
    const {current} = cityData
    uploadWeatherInformation(location , current)
}

function uploadWeatherInformation({name , country}, {last_updated, humidity , condition , temp_c}) {
    console.log(condition.text)
    console.log(condition)
     backgroundUpdate(name)

    let content =  `
                <div class="card_city">
                    <fieldset>
                        <h2 class="city_name">${name}</h2>
                        <legend class="city_country">${country}</legend>
                    </fieldset>
                    <div class="city_temp">${temp_c}</div>
                    <div class="city_humidity">humidity: ${humidity}</div>
                    <div class="time">local time : ${last_updated}</div>
                    <div class="descDisplay">consdition :  ${condition.text}</div>
                </div>
                <div class="card_emoji">
                    <img src="${condition.icon}" alt="">
                </div> 
    `
    card.innerHTML = content

    card.style.display = "flex"
}

function searchEmoji() {

}

function searchCityimage() {

}


function error404Function(cityName) {

    card.style.display = "flex"
    error404Display.classList.add("display")
    error404Display.textContent = `please input a valid city name. ${cityName}`
}