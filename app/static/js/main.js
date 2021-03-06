console.log("hello");

// weather API key 
APIkey = "bafa75dd208a9fa962808a4e9190d531";

let dayNum = new Date().getDay()
let literal_day = new Date();

console.log(dayNum)
console.log(literal_day)
// console.log(literal_day.split(' ')[1])
// console.log(literal_day.split(' ')[2])
console.log(literal_day.getMonth())

let day = () => {
    switch(dayNum){
        case 0:
            return 'Sunday';
            break;
        case 1:
            return 'Monday';
            break;
        case 2:
            return 'Tuesday';
            break;
        case 3:
            return 'Wednesday';
            break;
        case 4:
            return 'Thursday';
            break;
        case 5:
            return 'Friday';
            break;
        case 6:
            return 'Saturday';
            break;
    };
};
let month = () => {
    switch(literal_day.getMonth()){
        case 0:
            return 'January';
            break;
        case 1:
            return 'Febuary';
            break;
        case 2:
            return 'March';
            break;
        case 3:
            return 'April';
            break;
        case 4:
            return 'May';
            break;
        case 5:
            return 'June';
            break;
        case 6:
            return 'July';
            break;
        case 7:
            return 'August';
            break;
        case 8:
            return 'September';
            break;
        case 9:
            return 'October';
            break;
        case 10:
            return 'Novemeber';
            break;
        case 11:
            return 'December';
            break;
    };
};

console.log(day())

//calling the API
const getData = async(city,state) => {
    let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&units=imperial&appid=${APIkey}`);
    let response = await result.json();

    // console.log(response);
    return response;
}

//loading the info
const loadData = async (city,state) => {
    const weather = await getData(city,state);
    weatherData(city,state,weather.main.temp, weather.main.humidity, weather.weather[0].main, weather.weather[0].description, weather.weather,weather.main.temp_max,weather.main.temp_min,
        weather.sys.sunrise,weather.sys.sunset,weather.wind.speed,weather.main.feels_like);
}

//creating const to hold the dom
const DOM_Elements = {
    weatherAppList: '.weatherAppList'
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

const weatherData = (city,state,temp, hum, main, desc, weth, max, min,rise,set,wind,feel) =>{
    desc1 = main.replace(' ','_');
    console.log(desc1);
    city = capitalize(city);
    state = capitalize(state);
    desc = capitalize(desc);
    temp = Math.floor(temp);
    rise = new Date(rise*1000).toLocaleTimeString("en-US");
    set = new Date(set*1000).toLocaleTimeString("en-US");
    const html = `<div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
            <div class="col-lg-8 grid-margin stretch-card">
                <!--weather card-->
                <div class="card card-weather ">
                    <div class="card-body-${desc1}">
                        <div class="weather-date-location">
                            <h3>${day()}</h3>
                            <p class="text-gray"> <span class="weather-date">${literal_day.getDate()} ${month()}, ${literal_day.getFullYear()}</span> <span class="weather-location">${city} ${state}</span> </p>
                        </div>
                        <div class="weather-data d-flex">
                            <div class="mr-auto">
                                <h4 class="display-3">${temp}<span class="symbol">??</span>F</h4>
                                <p> ${desc} </p>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="d-flex weakly-weather">
                            <div class="weakly-weather-item">
                                <p class="mb-1"> Feels Like </p> <i class="m di mdi-weather-snowy"></i>
                                <p class="mb-0"> ${feel} </p>
                            </div>
                            <div class="weakly-weather-item">
                                <p class="mb-0"> Max </p> <i class="mdi mdi-weather-cloudy"></i>
                                <p class="mb-0"> ${max}?? </p>
                            </div>
                            <div class="weakly-weather-item">
                                <p class="mb-1"> Min </p> <i class="mdi mdi-weather-hail"></i>
                                <p class="mb-0"> ${min}?? </p>
                            </div>
                            <div class="weakly-weather-item">
                                <p class="mb-1"> Humidity </p> <i class="mdi mdi-weather-partlycloudy"></i>
                                <p class="mb-0"> ${hum}% </p>
                            </div>
                            <div class="weakly-weather-item">
                                <p class="mb-1"> Sunrise </p> <i class="mdi mdi-weather-pouring"></i>
                                <p class="mb-0"> ${rise} </p>
                            </div>
                            <div class="weakly-weather-item">
                                <p class="mb-1"> Sunset </p> <i class="mdi mdi-weather-pouring"></i>
                                <p class="mb-0"> ${set} </p>
                            </div>
                            <div class="weakly-weather-item">
                                <p class="mb-1"> Wind </p> <i class="mdi mdi-weather-snowy-rainy"></i>
                                <p class="mb-0"> ${wind}mph </p>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <!--weather card ends-->
            </div>
        </div>
    </div>
</div>`;
document.querySelector(DOM_Elements.weatherAppList).insertAdjacentHTML('beforeend',html);

}

const getWeather = async () =>{
    const citys = await document.getElementById("frm1").elements[0].value;
    const states = await document.getElementById("frm1").elements[1].value;

    console.log(citys);
    console.log(states);

    await loadData(citys,states);
};