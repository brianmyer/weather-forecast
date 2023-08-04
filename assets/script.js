
let APIKey = 'd1cba3de9c1928443171663bf4bcd131';
let cityName = document.querySelector('#city-name');
let searchBtn = document.querySelector('#search')
let inputAlert = document.querySelector('.hidden')

searchBtn.addEventListener('click', function(event) {
    event.preventDefault()
    let cityQueryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&limit=5&appid=${APIKey}`
    if (cityName.value === '') {
        inputAlert.classList.remove('hidden')
    } else {

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
.then(function (data) {
    console.log(data);
    cityName.value = ''
    inputAlert.classList.add('hidden')




    
});
}
})