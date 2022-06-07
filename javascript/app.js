let weather = {
    apiKey: "d0ff7d0eb27891ebc6398e6b78131a54", // key

    getLocation: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid="+ this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    }, // function that gets the data

    displayWeather: function (data) {
        const { name } = data;
        const { country } = data.sys;
        const { icon, description } = data.weather[0];
        const { temp, humidity, feels_like } = data.main;
        const { speed } = data.wind;
        console.log(name, country, icon, description, temp, humidity, feels_like, speed);

        document.querySelector(".city").innerHTML = name +", "+ country;
        document.querySelector(".weather-icon").src = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".feels-like").innerHTML = "Feels Like: "+ feels_like +"°C";
        document.querySelector(".temp").innerHTML = temp +"°C";
        document.querySelector(".humidity").innerHTML = "Humidity: "+ humidity +"%";
        document.querySelector(".wind").innerHTML = "Wind Speed: "+ speed +" km/h";
        // removing dummy text
        document.querySelector(".weather").classList.remove("loading");
    }, // display the info

    seacrh: function () {
        this.getLocation(document.querySelector(".search-bar").value);
    } // get city from search bar, parameter for getLocation function
};

// Search bar
document.querySelector(".search button").addEventListener("click", function () {
    weather.seacrh();
});
// keyup
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if ( event.key == "Enter") {
        weather.seacrh();
    }
});

// first call 
weather.getLocation("Cartagena");