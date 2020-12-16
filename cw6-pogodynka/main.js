class WeatherApp {
    constructor() {
        this.API_KEY = 'dc7951fe1d80006952ad09468447f61b';
        this.cityInput = document.querySelector('.city-input');
    }

    init() {
        const btn = document.querySelector('.btn');
        btn.addEventListener('click', () => this.searchCity());
    }

    searchCity() {
        const city = this.cityInput.value;
        const weather = fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}`
        );
        weather
            .then((resp) => {
                console.log(resp);
                return resp.json();
            })
            .then((response) => console.log(response));
    }
}

const app = new WeatherApp();
app.init();
