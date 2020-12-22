export default class City {
    constructor(city, temp, pressure, humidity, feelsLike, desc, icon, dt, timezone, lat, lon) {
        this.city = city;
        this.temp = Math.round(temp);
        this.pressure = pressure;
        this.humidity = humidity;
        this.feelsLike = Math.round(feelsLike);
        this.desc = desc.charAt(0).toUpperCase() + desc.slice(1);
        this.icon = icon;
        this.date = new Date((dt + timezone) * 1000 - 3600000);
        this.lat = lat;
        this.lon = lon;
    }
}
