import React, { useState } from 'react';
const api = {
  key: "cc41c7840e57996be4899d351cc244a0",
  base: "http://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] =   useState('');
  const [weather, setWeather] =   useState({});

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
         setWeather(result);
         setQuery('');
       });
    }
  }
  const dateBuilder = (d) => {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
  "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
   let days = ["Domingo", "Segunda", "terça", "Quarta", "Quinta", "Sexta", "Sábado"]
  
   let day = days[d.getDay()];
   let date = d.getDate();
   let month = months[d.getMonth()];
   let year = d.getFullYear();
   
   return `${day} ${date} de ${month} de ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app' ) :'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>

                 <div className="location-box">
                   <div className="location">{weather.name}, {weather.sys.country}</div>
                    <div className="date">{dateBuilder(new Date())}</div>
          </div>
       <div className="weather-box">
         <div className="temp">
            {Math.round(weather.main.temp)}ºc
         </div>
         <div className="humidity">
            Humidity: {(weather.main.humidity)}%
         </div>
         <div className="pressure">
            Pressure: {(weather.main.pressure)}hPa
         </div>
         <div className="feels_like">
           Feels Like: {Math.round(weather.main.feels_like)}ºc
         </div>
          <div className="weather">{weather.weather[0].main}</div>
       </div>
          </div>
       ) :  ('')}
      </main>
    </div>
  );
}

export default App;
