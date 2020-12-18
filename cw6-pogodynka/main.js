import City from './City.js';
import Db from './Db.js';
import WeatherUi from './WeatherUi.js';

class WeatherApp {
    constructor() {
        this.API_KEY = 'dc7951fe1d80006952ad09468447f61b';

        this.weatherUi = new WeatherUi(document.querySelector('.container'));
        this.db = new Db();

        this.cities = [];
        this.citiesObjects = [];
    }

    init() {
        this.weatherUi.searchBtn.addEventListener('click', () => this.searchCity());

        const citiesFromLs = this.db.getCities();
        if (citiesFromLs) {
            this.cities = [...citiesFromLs];
            this.cities.forEach((city) => this.searchCity(city));
        }
    }

    searchCity(cityName) {
        const city = cityName ? cityName : this.weatherUi.cityInput.value;
        const cityData = fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&units=metric&lang=pl`
        );

        cityData
            .then((resp) => {
                return resp.json();
            })
            .then((response) => {
                const newCity = new City(
                    response.name,
                    response.main.temp,
                    response.main.pressure,
                    response.main.humidity,
                    response.main.feels_like,
                    response.weather[0].description,
                    response.weather[0].icon
                );

                if (!this.cities.includes(response.name)) {
                    this.cities.push(response.name);
                }
                this.citiesObjects.push(newCity);

                console.log(this.cities);

                this.weatherUi.renderCityTile(newCity);
                this.db.saveCities(this.cities);
            })
            .catch(() => {
                alert('BŁĄD! Spróbuj jeszcze raz.');
            });
    }
}

const app = new WeatherApp();
app.init();
