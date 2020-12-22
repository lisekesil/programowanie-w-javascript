import City from './City.js';
import Db from './Db.js';
import WeatherUi from './WeatherUi.js';

export default class WeatherApp {
    constructor() {
        this.API_KEY = 'dc7951fe1d80006952ad09468447f61b';

        this.weatherUi = new WeatherUi(document.querySelector('.container'));
        this.db = new Db();

        this.cities = [];
    }

    init() {
        this.weatherUi.searchBtn.addEventListener('click', () => this.searchCity());

        const citiesFromLs = this.db.getCities();
        if (citiesFromLs) {
            this.cities = [...citiesFromLs];
            this.cities.forEach((city) => this.searchCity(city));
        }

        setInterval(() => {
            if (this.cities.length === 0) return;

            this.weatherUi.container.innerHTML = '';
            this.cities.forEach((city) => this.searchCity(city));
        }, 300000);
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
                    response.weather[0].icon,
                    response.dt,
                    response.timezone,
                    response.coord.lat,
                    response.coord.lon
                );

                if (!this.cities.includes(response.name)) {
                    this.cities.push(response.name);
                }

                this.weatherUi.renderCityTile(newCity);
                this.addEventListeners(newCity);
                this.db.saveCities(this.cities);
            })
            .catch(() => {
                alert('BŁĄD! Spróbuj jeszcze raz.');
            });

        this.weatherUi.cityInput.value = '';
    }

    addEventListeners(city) {
        const dailyIcons = document.querySelectorAll('[data-city]');
        dailyIcons.forEach((icon) => {
            if (city.city === icon.dataset.city)
                icon.addEventListener('click', () => {
                    this.showForecast(city);
                });
        });

        const deleteCities = document.querySelectorAll('[data-deleteCity]');
        deleteCities.forEach((deleteCity) => {
            if (city.city === deleteCity.dataset.deletecity) {
                deleteCity.addEventListener('click', () => {
                    const updatedCities = this.cities.filter(
                        (el) => el !== deleteCity.dataset.deletecity
                    );
                    this.cities = updatedCities;
                    this.db.saveCities(this.cities);

                    this.weatherUi.container.innerHTML = '';
                    this.cities.forEach((city) => this.searchCity(city));
                });
            }
        });
    }

    showForecast(city) {
        const forecast = fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&units=metric&lang=pl&exclude=hourly&appid=${this.API_KEY}`
        );
        forecast
            .then((res) => res.json())
            .then((res) => {
                this.weatherUi.modal.innerHTML = '';
                this.weatherUi.modal.style.display = 'flex';
                for (let i = 0; i < 6; i++) {
                    const daily = res.daily[i];
                    const timezone = res.timezone_offset;

                    const day = {
                        date: new Date((daily.dt + timezone) * 1000 - 3600000),
                        icon: daily.weather[0].icon,
                        desc: daily.weather[0].description,
                        temp: Math.round(daily.temp.day),
                    };

                    this.weatherUi.renderDayTile(day);
                }
            })
            .catch(() => {
                console.log('error');
            });

        this.weatherUi.modal.addEventListener('click', (ev) => {
            if (ev.target == this.weatherUi.modal) this.weatherUi.modal.style.display = 'none';
        });
    }
}
