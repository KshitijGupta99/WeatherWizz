import React, { Component } from 'react'

export default class NewsCard extends Component {
    state = {
        weatherData: null,
        error: null,
    };
    async fetchData() {




        const { city } = this.props;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=485f78de99bb8696639cfadfaeefb2ef`;
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
    componentDidMount() {
        // Fetch data when the component mounts if name is provided
        this.fetchData();
    }
    render() {
        const { city } = this.props;
        const { weatherData, error } = this.state;


        return (

            <div className="col p-3 mb-2 bg-primary-subtle text-primary-emphasis rounded">
                <div className="p-3 mb-2 text-info-emphasiscard rounded d-flex justify-content-around"  style={{backgroundColor : '#85c4d3e8'}}>
                    <div className="card-body">
                        <h5 className="card-title">{city}</h5>
                        <h6>{weatherData ? `${weatherData.main.temp}°C` : 'Loading...'}</h6>
                        <p className="card-text">{weatherData ? weatherData.weather[0].main : 'Loading...'}</p>

                    </div>
                    <div>
                    <img src = {weatherData ? `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png` : 'public\\loading.png' } alt="weather icon" />
                    </div>
                </div>
            </div>
        )
    }
}
