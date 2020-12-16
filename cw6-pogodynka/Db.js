export default class Db {
    constructor() {
        this.citiesLSKey = 'cities';
    }

    saveCities(cities) {
        localStorage.setItem(this.citiesLSKey, JSON.stringify(cities));
    }

    getCities() {
        const citiesFromStorage = JSON.parse(localStorage.getItem(this.citiesLSKey));
        if (citiesFromStorage) {
            const cities = citiesFromStorage.map((city) => {
                city.createDate = new Date(city.createDate);
                return city;
            });

            return cities;
        }
        return;
    }
}
