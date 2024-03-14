import React, {useEffect, useState} from 'react';
import axios from 'axios';

const WeatherClass = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d2d6780a55f1db9fb298cd5e9ab9ab88`
        );
        setWeatherData(response.data);
        console.log(response.data); 
        } catch (error) {
        console.error(error);
        }
    };

    if (city) {
        fetchData();
    }
    }, [city]);


    const handleInputChange = (e) => {
    setCity(e.target.value);
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    };



    return (
        <div className = "weather-info">
            <form onSubmit = {handleSubmit} id = "submit-form">
                <input 
                type="text" 
                placeholder="Enter city name" 
                value = {city}
                onChange = {handleInputChange}
                />
            </form>
            {weatherData? (
                <>
                <h2 id = "city"> {city} Weather Forecast</h2>
                <p id = "date"> {new Date().toDateString()}</p>
                <p id = "temp"> Temperature {weatherData.main.temp}°C</p>
                <p id = "description"> {weatherData.weather[0].description}</p>
                {/* <p id = "icon-id"> Icon ID: {weatherData.weather[0].icon}</p> */}
                <p id = "feels-like"> Feels like: {weatherData.main.feels_like}°C</p>
                <p id = "humidity"> Humidity: {weatherData.main.humidity}%</p>
                <p id = "wind-speed"> Wind Speed: {weatherData.wind.speed} m/s</p>
                <p id = "rain">Rain: {weatherData.rain ? weatherData.rain['1h'] : 0} mm</p> 
                <p id = "sunrise">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour:'numeric' , minute: '2-digit' })}</p>
                <p id = "sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour:'numeric' , minute: '2-digit' })}</p>
                </>
            ) : (
                <p>Enter City ...</p>
            )}
        </div>

        );

};

export default WeatherClass;