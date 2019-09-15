import React, { Component } from 'react';

export default class WeatherApp extends Component {
    constructor() {
        super()
        this.state = {
            city_input: '',
            city: 'Search Your city',
            country: null,
            icon: '',
            desc: '---',
            temp: '---',
            feels: '---',
            uv: '---',
            pressure: '---',
            humidity: '---',
            precip: '---',
            visibility: '---'
        }
    }

    onChangeHandler = (event) => {
        console.log(event.target.value)
        this.setState({
            city_input: event.target.value
        },

            //the data is fetched only when the city_input name is entered so it is placed in callback function
            //FETCH DATA

            async () => {

                if (this.state.city_input) {

                    const response = await fetch(`http://api.weatherstack.com/current?access_key=d8cc62def33c9ac93c6758f07f31ad1f&query=${this.state.city_input}`);
                    const data = await response.json();
                    console.log(data);
                    // console.log('Feels', data.current.feelslike)
                    // console.log('Icons', data.current.weather_icons)
                    // console.log('UV index', data.current.uv_index)

                    this.setState({
                        city: data.location.name,
                        country: data.location.country,
                        icon: data.current.weather_icons[0],
                        desc: data.current.weather_descriptions[0],
                        temp: data.current.temperature,
                        feels: data.current.feelslike,
                        uv: data.current.uv_index,
                        pressure: data.current.pressure,
                        humidity: data.current.humidity,
                        precip: data.current.precip,
                        visibility: data.current.visibility,
                        city_input: ''

                    }, () => console.log(this.state.city, this.state.desc, this.state.icon, this.state.temp))

                }
                else {
                    return;
                }

            })
    }

    render() {
        return (
            <div className="app_container">
                <input type="text" placeholder="Search places or cities" onMouseLeave={this.onChangeHandler}/>
                <div className="content">
                    <p className="font-gray">Sun, Sep 15</p>
                    <h4>{this.state.city}, {this.state.country}</h4>
                    <img src={this.state.icon} alt="" width="100" />
                    <p>{this.state.desc}</p>
                    <h2>{this.state.temp}<sup>o<sub>C</sub></sup></h2>
                    <div className="more left">
                        <p>Feels: {this.state.feels}</p>
                        <p>UV: {this.state.uv}</p>
                        <p>Pressure: {this.state.pressure}</p>
                    </div>
                    <div className="more right">
                        <p>Humidity: {this.state.humidity}</p>
                        <p>Precipitation: {this.state.precip}</p>
                        <p>Visibility: {this.state.visibility}</p>
                    </div>
                </div>
            </div>
        )
    }
}    