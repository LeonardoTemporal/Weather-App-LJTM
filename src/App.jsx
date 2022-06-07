import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import ClipLoader from "react-spinners/PacmanLoader"



function App() {
  const [obj, setObj] = useState()
  const [weather, setweather] = useState()
  const [date, setdate] = useState()
  const [isBoolean, setIsBoolean] = useState(true)
  const [loading, setloading] = useState(true)


  let long, lat

  const getLatLong = () => {

    const success = pos => {

      long = pos.coords.longitude
      lat = pos.coords.latitude
      setObj({ lat, long })
      console.log(pos)
    }



    navigator.geolocation.getCurrentPosition(success)

  }

  const API_KEY = '5b43d9297aa1e2fb2036b0afd246d6a1'


  useEffect(() => {
    if (obj !== undefined) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.long}&appid=${API_KEY}`

      axios.get(url)
        .then(res => {
          setweather(res.data)
          setloading(false)
        })
        .catch(err => console.log(err))
    }
  }, [obj])

  
  

  console.log('Funciono?', weather)

  const getFullDate = new Date()
  const weekDay = getFullDate.getDay()
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthNumber = getFullDate.getMonth()
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const getDate = {
    day: week[weekDay],
    month: months[monthNumber],
    monthDay: getFullDate.getDate(),
    year: getFullDate.getFullYear()

  }

  

 const changeFC =  () =>  {
  setIsBoolean(!isBoolean)

 }

 
 const urlIcon = `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`

 


  return (
    <div className="App">
      {
        loading ?

        <ClipLoader
        color={"#F8E71C"} 
        loading={loading} 
        size={40} />

        
        
        :
        
        <>
        
      <div className='cityDate'>
        <h1>{weather?.name}, {weather?.sys.country}</h1>
        <div className='card__container'>
          <div className='cityDate__card'>
          <h2>{getDate['day']}, {getDate['month']} {getDate['monthDay']}th, {getDate['year']}</h2>
          <img className='wIcon' src={urlIcon} alt="" />
          <h2>"{weather?.weather[0].description}"</h2>
          <h2>Temperature:  {
              isBoolean
              ? (weather?.main.temp - 273.15).toFixed(1) 
              : ((weather?.main.temp - 273.15).toFixed(1) * 1.8 + 32)
            } {
             isBoolean
              ? '°C' 
              : '°F'}
          </h2>
          
        </div>
        
        </div>
        <button className='change-btn' onClick={changeFC}>Change to {isBoolean ? 'Fahrenheit' : 'Celsius'}</button>

      </div>
      <div className='weatherApp'>
        <h2> <i class='bx bx-cloud-upload' ></i> Clouds: {weather?.clouds.all}%</h2>
        <h2> <i class='bx bx-wind'></i> Wind: {weather?.wind.speed} km/h</h2>
        <h2> <i class='bx bxs-droplet-half' ></i> Humidity: {weather?.main.humidity}%</h2>
        <h2> <i class='bx bxs-down-arrow' ></i> pressure: {weather?.main.pressure} mb</h2>
         
      </div></>
      }
      
      <button className='get-btn' onClick={getLatLong} hidden={loading ? false : true}>Get Location</button>

    </div>
  )
}

export default App
