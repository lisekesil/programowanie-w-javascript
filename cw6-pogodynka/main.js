import City from './City.js';
import Db from './Db.js';

class WeatherApp {
    constructor() {
        this.API_KEY = 'dc7951fe1d80006952ad09468447f61b';

        this.db = new Db();
        this.cityInput = document.querySelector('.searchbar__input');
        this.searchBtn = document.querySelector('.searchbar__btn');
        this.cities = [];
    }

    init() {
        this.searchBtn.addEventListener('click', () => this.searchCity());
        const citiesFromLs = this.db.getCities();
        if (citiesFromLs) {
            this.cities = [...citiesFromLs];
            this.cities.forEach((city) => this.renderCityTile(city));
        }
    }

    searchCity() {
        const city = this.cityInput.value;
        const cityData = fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&units=metric&lang=pl`
        );

        cityData
            .then((resp) => {
                return resp.json();
            })
            .then((response) => {
                console.log(response);
                const newCity = new City(response.name, response.main.temp);
                this.cities.push(newCity);
                console.log(this.cities);
                this.renderCityTile(newCity);
                this.db.saveCities(this.cities);
            })
            .catch(() => {
                alert('BŁĄD! Spróbuj jeszcze raz.');
            });
    }

    renderCityTile(cityObj) {
        const template = `
            <div>
                <h1>${cityObj.city}</h1>
                <span>${cityObj.temp}°C</span>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', template);
    }
}

const app = new WeatherApp();
app.init();
