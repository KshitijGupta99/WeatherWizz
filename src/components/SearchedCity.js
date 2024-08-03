import React, { Component } from 'react';

export default class SearchedCity extends Component {
    state = {
        weatherData: null,
        error: null,
    };

    async fetchData() {
        const { name } = this.props;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&APPID=485f78de99bb8696639cfadfaeefb2ef`;
        try {
            const rawData = await fetch(url);
            const data = await rawData.json();
            if (rawData.ok) {  // Check if the response is OK
                this.setState({ weatherData: data, error: null });
            } else {
                throw new Error(data.message || "Error fetching weather data");
            }
            console.log("Fetched weather data:", data);
        } catch (error) {
            this.setState({ error: "Error fetching weather data" });
            console.error("Error fetching weather data:", error);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.name !== this.props.name) {
            this.fetchData(this.props.name); // Fetch data for the new city name
        }
    }
    componentDidMount() {
        // Fetch data when the component mounts if name is provided
        this.fetchData();
    }

    convertUnixToIST(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
        const istOffset = 5.5 * 60; // IST is UTC +5:30 in minutes
        const istDate = new Date(date.getTime() + istOffset * 60 * 1000); // Add IST offset
    
        const year = istDate.getUTCFullYear(); // Get the year
        const month = String(istDate.getUTCMonth() + 1).padStart(2, '0'); // Get the month (0-based, so add 1)
        const day = String(istDate.getUTCDate()).padStart(2, '0'); // Get the day
        const hours = String(istDate.getUTCHours()).padStart(2, '0'); // Get IST hours
        const minutes = String(istDate.getUTCMinutes()).padStart(2, '0'); // Get IST minutes
    
        return {
            fullDate: `${year}-${month}-${day} ${hours}:${minutes}`, // Format as YYYY-MM-DD HH:MM
            time: `${hours}:${minutes}` // Time only in HH:MM format
        };
    }

    render() {
        const { name } = this.props;
        const { weatherData, error } = this.state;

        return (
            <div className="p-3 mb-2 bg-primary-subtle text-primary-emphasis">
                <div className="p-3 mb-2 bg-primary text-white card ml-5 mr-3 mt-4 w-75 p-3 border border-5" style={{ width: '25rem' }}>
                    <div className="card-body ">
                        <div className='d-flex justify-content-around'>
                            <h5 className="card-title">{name}</h5>
                            <p> <b>{weatherData ? this.convertUnixToIST( weatherData.dt).fullDate : 'Loading...'} </b></p>
                        </div>
                        {/* public/50n.png */}
                        <div className="d-flex justify-content-start">
                            <div className='d-flex justify-content-between w-50 p-3'>
                                <img src = {weatherData ? `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png` : 'public\\loading.png' } alt="weather icon" />
                                <h3>{weatherData ? `${weatherData.main.temp}°C` : 'Loading...'}</h3>
                                <div>
                                    <h4>{weatherData ? weatherData.weather[0].main : 'Loading...'}</h4>
                                    <h5>{weatherData ? `Feels like: ${weatherData.main.feels_like}°C` : 'Loading...'}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 d-flex justify-content-around h-25 d-inline-block px-2 grid gap-0 column-gap-3" style ={ {width: '20vw' }}>
                            <h5 className="border border-2 rounded container">{weatherData ? `Wind: ${weatherData.wind.speed} m/s` : 'Loading...'}</h5>
                            <h5 className="border border-2 rounded container">{weatherData ? `Visibilty: ${weatherData.visibility / 1000} kms` : 'Loading...'}</h5>
                            <h5 className="border border-2 rounded container">{weatherData ? `Humidity: ${weatherData.main.humidity}%` : 'Loading...'}</h5>
                            <h5 className="border border-2 rounded container">{weatherData ? `Clouds: ${weatherData.clouds.all}%` : 'Loading...'}</h5>
                            <h5 className="border border-2 rounded container">{weatherData ? `Sunrise: ${this.convertUnixToIST( weatherData.sys.sunrise).time}` : 'Loading...'}</h5>
                            <h5 className="border border-2 rounded container">{weatherData ? `Sunset: ${this.convertUnixToIST(weatherData.sys.sunset).time}` : 'Loading...'}</h5>
                        </div>
                        <div className='mt-2 mb-2'>
                            {weatherData ? (
                                <div>
                                    <p>Pressure: {weatherData.main.pressure} hPa</p>
                                    
                                </div>
                            ) : 'Loading...'}
                        </div>
                        <h6 className="card-subtitle mb-2 text-body-secondary">Sources</h6>
                        <p className="card-text">OpenWeatherApp</p>
                        <p className="card-text">* All time and date is in IST *</p>

                        {error && <p className="text-danger glow-text">{error}</p>}
                    </div>
                </div>
            </div>
        );
    }
}
