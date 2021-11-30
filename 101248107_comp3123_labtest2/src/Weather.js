import React, {Component} from 'react'
import {Row, Col,Container} from 'react-bootstrap'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Weather extends Component{
    constructor(props){
        super(props)

        this.state={
            day:[],
            weather:[],
            date: new Date().toLocaleString()
        }
    }

    componentDidMount(){
       
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=43.65&lon=-79.34&exclude=daily,hourly,minutely,hourly&units=imperial&appid=24e988dc20af7e34d2272224ccf771f3`)
        .then(res => {
            const day = res.data;
            const weather = res.data.current.weather
            this.setState({ day:day, weather:weather });
        })
    }

    
    render(){
        return(
            <div>
             {
                 this.state.weather.map(u => (
                     <div>
                            <div className="display">
                            
                                        <h1>{this.state.day.timezone}</h1>
                                        <p>{this.state.date}</p>
                                        <img src={'http://openweathermap.org/img/wn/'+u.icon+'@2x.png'}/>
                                        <p>{u.description}</p>
                                        <hr/>
                            </div>
                            <div className="desc">
                                <Container>
                                    <Row>
                                        <Col>
                                            <p >Pressure: {this.state.day.current.pressure}kPa</p>
                                            <p>Humidity: {this.state.day.current.humidity}%</p>
                                            <p>lon: {this.state.day.lon}</p>
                                        </Col>
                                        <Col>
                                            <p>Wind: {this.state.day.current.wind_speed} km/h</p>
                                            <p>Feels Like: {this.state.day.current.feels_like}℃</p>
                                            <p>lat: {this.state.day.lat}</p>
                                        </Col>
                                        <p className="mt-3">Temp: {this.state.day.current.temp}℃</p>
                                    </Row>
                                </Container>
                                <hr/>
                            </div>  
                     </div>
                 ))
             }
             
            </div>
        )
    }
}