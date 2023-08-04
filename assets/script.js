
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
    // get icon instead of url to render
    currentCity.textContent = `${firstCity.city.name} ${firstCity.list[0].dt} https://openweathermap.org/img/wn/${firstCity.list[0].weather[0].icon}@2x.png'`
    // convert from K to F
    currentCityTemp.textContent = `Temp: ${firstCity.list[0].main.temp}`
    currentCityWind.textContent = `Wind: ${firstCity.list[0].wind.speed} MPH`
    currentCityHumidity.textContent = `Humidity: ${firstCity.list[0].main.humidity}%`


    
    


    cityName.value = ''
    inputAlert.classList.add('hidden')
});
}
})