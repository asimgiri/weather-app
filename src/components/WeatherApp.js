import React, { Component } from 'react';


export default class WeatherApp extends Component {
    constructor() {
        super()
        this.state = {
            time: new Date().toLocaleTimeString(),
            city_input: '',
            success: null,
            city: 'Search Your city',
            country: null,
            icon: '',
            desc: '---',
            temp: '---',
            wind: '---',
            pressure: '---',
            humidity: '---',
            visibility: '---'
        }
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }
    
    tick = () => {
        this.setState({
            time: new Date().toLocaleTimeString()
        })
    }
    

    onChangeHandler = (event) => {
        this.setState({
            city_input: event.target.value,
        },

            //the data is fetched only when the city_input name is entered so it is placed in callback function
            //FETCH DATA

            async () => {

                if (this.state.city_input) {

                    // const response = await fetch(`http://api.weatherstack.com/current?access_key=d8cc62def33c9ac93c6758f07f31ad1f&query=${this.state.city_input}`);
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city_input}&appid=9be0d4fa00980cc0a436a361070dbfd0`)
                    const data = await response.json();
                    console.log(data);
                    // console.log('Feels', data.current.feelslike)
                    // console.log('Icons', data.current.weather_icons)
                    // console.log('UV index', data.current.uv_index)

                    this.setState({
                        success: data.cod,

                    }, () => {
                        if (this.state.success === "404") {
                            console.warn('Place/Country match not found')
                        }
                        else {
                            this.setState({
                                city: data.name,
                                country: data.sys.country,
                                wind: data.wind.speed,
                                // icon: data.weather[0].icon,
                                icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                                desc: data.weather[0].description,
                                temp: Math.round(data.main.temp - 273.15),
                                pressure: data.main.pressure * 0.75,
                                humidity: data.main.humidity,
                                visibility: Math.round(data.visibility / 1000),
                            }, () => console.log(this.state.icon))
                        }
                    })

                }
                else {
                    return;
                }

            })
    }

    render() {
        return (
            <div className="app_container">
                <input className={this.state.success === "404" ? 'warn' : null} type="text" placeholder="Search places or cities" onMouseLeave={this.onChangeHandler} />
                <div className="content">
                    <p className="font-gray">{this.state.time}</p>
                    <h4>{this.state.city}, {this.state.country}</h4>
                    <img src={this.state.icon} alt="" width="100" />
                    <p>{this.state.desc}</p>
                    <h2>{this.state.temp}<sup>o<sub>C</sub></sup></h2>
                    <div className="more left">
                        <p>Wind: {this.state.wind}</p>
                        <p>Pressure: {this.state.pressure}</p>
                    </div>
                    <div className="more right">
                        <p>Humidity: {this.state.humidity}</p>
                        <p>Visibility: {this.state.visibility}</p>
                    </div>
                </div>
            </div>
        )
    }
}    