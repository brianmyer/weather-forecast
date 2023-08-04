
let APIKey = 'd1cba3de9c1928443171663bf4bcd131';
let cityName = document.querySelector('#city-name');
let searchBtn = document.querySelector('#search');
let inputAlert = document.querySelector('.hidden');
let citiesSearched 
// = JSON.parse(localStorage.getItem('cities')) || [];
let citiesList = document.querySelector('.list-group');
let currentCity = document.querySelector('#current-city');
let currentCityTemp = document.querySelector('#current-city-temp');
let currentCityWind = document.querySelector('#current-city-wind');
let currentCityHumidity = document.querySelector('#current-city-humidity');
let day1 = document.querySelector('#day1');
let day2 = document.querySelector('#day2');
let day3 = document.querySelector('#day3');
let day4 = document.querySelector('#day4');
let day5 = document.querySelector('#day5');
let day1Weather = document.querySelector('#day1-weather');
let day2Weather = document.querySelector('#day2-weather');
let day3Weather = document.querySelector('#day3-weather');
let day4Weather = document.querySelector('#day4-weather');
let day5Weather = document.querySelector('#day5-weather');

searchBtn.addEventListener('click', function(event) {
    event.preventDefault()
    let cityQueryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&limit=5&appid=${APIKey}`
    if (cityName.value === '') {
        inputAlert.classList.remove('hidden')
    } else {
        // citiesSearched.push(cityName.value)
        localStorage.setItem('cities', cityName.value)
        let newLi = document.createElement('li')
        newLi.textContent = cityName.value
        citiesList.appendChild(newLi)

        fetch(cityQueryURL)
        .then(function (response) {
            console.log(response)
    return response.json();
})
.then(function (citiesFound) {
    console.log(citiesFound);
    let firstCity = citiesFound[0];
    console.log(firstCity.lat);
    console.log(firstCity.lon);
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=${APIKey}`)
})

.then(function (response) {
    return response.json();
})
.then(function (firstCity) {
    console.log(firstCity);
    // wrong times, get icon instead of url to render
    currentCity.textContent = `${firstCity.city.name} ${moment(firstCity.list[0].dt).format('MMM DD, YYYY')} https://openweathermap.org/img/wn/${firstCity.list[0].weather[0].icon}@2x.png`
    // convert from K to F
    currentCityTemp.textContent = `Temp: ${firstCity.list[0].main.temp}°F`
    currentCityWind.textContent = `Wind: ${firstCity.list[0].wind.speed} MPH`
    currentCityHumidity.textContent = `Humidity: ${firstCity.list[0].main.humidity}%`
    day1.textContent = `${moment(firstCity.list[8].dt).format('MMM DD, YYYY')}`
    day2.textContent = `${moment(firstCity.list[16].dt).format('MMM DD, YYYY')}`
    day3.textContent = `${moment(firstCity.list[24].dt).format('MMM DD, YYYY')}`
    day4.textContent = `${moment(firstCity.list[32].dt).format('MMM DD, YYYY')}`
    day5.textContent = `${moment(firstCity.list[39].dt).format('MMM DD, YYYY')}`
    // string literal?
    day1Weather.textContent = `https://openweathermap.org/img/wn/${firstCity.list[8].weather[0].icon}@2x.png
    Temp: ${firstCity.list[8].main.temp}°F 
    Wind: ${firstCity.list[8].wind.speed} MPH 
    Humidity: ${firstCity.list[8].main.humidity}%`
    day2Weather.textContent = `https://openweathermap.org/img/wn/${firstCity.list[16].weather[0].icon}@2x.png
    Temp: ${firstCity.list[16].main.temp}°F 
    Wind: ${firstCity.list[16].wind.speed} MPH 
    Humidity: ${firstCity.list[16].main.humidity}%`
    day3Weather.textContent = `https://openweathermap.org/img/wn/${firstCity.list[24].weather[0].icon}@2x.png
    Temp: ${firstCity.list[24].main.temp}°F 
    Wind: ${firstCity.list[24].wind.speed} MPH 
    Humidity: ${firstCity.list[24].main.humidity}%`
    day4Weather.textContent = `https://openweathermap.org/img/wn/${firstCity.list[32].weather[0].icon}@2x.png
    Temp: ${firstCity.list[32].main.temp}°F 
    Wind: ${firstCity.list[32].wind.speed} MPH 
    Humidity: ${firstCity.list[32].main.humidity}%`
    day5Weather.textContent = `https://openweathermap.org/img/wn/${firstCity.list[39].weather[0].icon}@2x.png
    Temp: ${firstCity.list[39].main.temp}°F 
    Wind: ${firstCity.list[39].wind.speed} MPH 
    Humidity: ${firstCity.list[39].main.humidity}%`
console.log(`https://openweathermap.org/img/wn/${firstCity.list[8].weather[0].icon}@2x.png`)
    
    


    cityName.value = ''
    inputAlert.classList.add('hidden')
});
}
})