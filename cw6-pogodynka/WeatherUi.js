export default class WeatherUi {
    constructor(container) {
        this.container = container;
        this.cityInput = document.querySelector('.searchbar__input');
        this.searchBtn = document.querySelector('.searchbar__btn');
    }

    renderCityTile(cityObj) {
        const template = `
        <div class='city__tile'>
            <h2 class='city__name'>${cityObj.city}</h2>

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
        </div>
        `;

        this.container.insertAdjacentHTML('beforeend', template);
    }
}
