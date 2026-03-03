import { backgroundUpdate } from "./backgroundUpdate.js"


const form = document.querySelector('form')
let card = document.querySelector('.card')
const error404Display = document.querySelector('.error_404')
const apiKey = '80ceb5c298164f5180960308260303'

// const url = `https://api.unsplash.com/search/photos?query=${countryName}`

form.addEventListener('submit', (event) => {
    let cityName = (document.querySelector('.weatherApp_form-input')).value.toLowerCase() // immediately getting city name 
    console.log(cityName)
    event.preventDefault()

    getWeatherData(cityName)

})


async function getWeatherData(cityName) {

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=80ceb5c298164f5180960308260303&q=${cityName}`

    let cityData = await fetch(apiUrl)
    console.log(cityData)
    if(!cityData.ok){
        console.log(cityData.ok)
        error404Function(cityName)
    }
    cityData = await cityData.json()
    const { location } = cityData
    const { current } = cityData
    uploadWeatherInformation(location, current)
    

    

  
}

function uploadWeatherInformation({ name, country }, { last_updated, humidity, condition, temp_c }) {
    console.log(condition.text)
    console.log(condition)
    backgroundUpdate(name)

    let content = `
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

function error404Function(cityName) {
    console.log(cityName)
    let content = `
                <h1 class="card_city">plsease enter a valid city name<br> ${cityName} is not a city</h1> 

    `
    card.innerHTML = content
}