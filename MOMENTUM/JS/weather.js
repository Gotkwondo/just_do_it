const APIKEY = "e92e60b1f915b2007b3a0942542aed35";
const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log("You live in", lat, lon);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;
    console.log(url)
    fetch(url).then((response) => response.json()).then((data) => {
        city.innerText = data.name;
        weather.innerText = `${data.main.temp}℃ / ${data.weather[0].main}`;
    }); //url에 들어가지 않아도 url의 정보를 불러옴, 응답하기 까지 시간이 걸림(promise)
}
function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
                        //사용자의 위치(object)를 콜백함