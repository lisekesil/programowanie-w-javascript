export default class WeatherUi {
    constructor(container) {
        this.container = container;
        this.cityInput = document.querySelector('.searchbar__input');
        this.searchBtn = document.querySelector('.searchbar__btn');
        this.modal = document.querySelector('.modal');
    }

    renderCityTile(cityObj) {
        const template = `
        <div class='city__tile'>
        <div class='city__top-info'>
        
        <h2 class='city__name'>${cityObj.city}</h2>
        <img class='city__daily-icon' data-city='${cityObj.city}' src='./img/forecast.png'>
        </div>
        
        <div class='city__extra-info'>
        <ul>
        <li class='city__pressure'>Ciśnienie: ${cityObj.pressure}</li>
        <li class='city__humidity'>Wilgotność: ${cityObj.humidity}</li>
        <li class="city__feels-like">Temp. odczuwalna: ${cityObj.feelsLike}°C</li>
        </ul>
        <img src="http://openweathermap.org/img/wn/${cityObj.icon}@2x.png">
        </div>
        
        <div class='city__main-info'>
        <span class='city__desc'>${cityObj.desc}</span>
        <span class='city__temp'>${cityObj.temp}°C</span>
        </div>
        <div class='city__footer'>
            ${cityObj.date.toLocaleTimeString()}
            <span class='city__delete' data-deleteCity='${cityObj.city}'>USUŃ</span>
        </div>
        </div>
        `;

        this.container.insertAdjacentHTML('afterbegin', template);
    }

    renderDayTile(day) {
        const template = `   
            <div class='day'>
            <h1 class='day__date'>${day.date.toLocaleDateString()}</h1>
            <img src='http://openweathermap.org/img/wn/${day.icon}@2x.png'>
            <span class='day__desc'>${day.desc}</span>
            <span class='day__temp'>${day.temp}°C</span>
            </div>
             `;

        this.modal.insertAdjacentHTML('beforeend', template);
    }
}
