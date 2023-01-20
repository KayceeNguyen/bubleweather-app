import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
// import { setMaxListeners } from 'events'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [location, setLocation] = useState('');
  const [data, setData] = useState({});
  const [weather, setWeather] = useState('');
  const [wind, setWind] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [icon, setIcon] = useState('');
  const [country, setCountry] = useState('');

  var apiKey = "a26e0a15f49a8c5e5634e795262ea5cd"
  var lang = "en";
  var units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`

  // const iconApi = await fetch('http://openweathermap.org/img/w/' + iconName + '.png')
  //           this.setState({
  //               icon : iconApi.url
  //           })

  // const imageUrl = `https://api.openweathermap.org/img/weather?q=${data.weather.icon}`

  console.log(url);

  const searchLocation = (event) => {
    if(event.key === "Enter") {
      axios.get(url)
      .then((response) => {

        console.clear();
        setData(response.data)
        console.log(response.data);
        setWeather(response.data.weather);
        // setMaxListeners(response.data.main)
        setWind(response.data.wind);
        setIcon(response.data.icon);
        setCountry(response.data.country)
        setErrorMessage("")

      }).catch(err => {

        console.log(err);
        setErrorMessage("Please enter another location");
        setData({});
        setWeather();
        setIcon();
        setWind();
        setCountry();

      })

      setLocation('')
    }
    

  }

  return (
    <>
      <Head>
        <title>Bubble Weather App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/cloudy.ico" />
      </Head>
      <main className={styles.main}>

          <div className={styles.area} >
            <ul className={styles.circles}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
          </div >

        <h1 className={styles.header}>Today's Weather</h1>
       
        <div className={styles.wrapper}>
                <div className={styles.shape1}></div>
                <div className={styles.shape2}></div>

          <div className={styles.searchContainer}>
            <input id={styles.input}
          
              value={location}
              onChange={event => setLocation(event.target.value)}
              placeholder ="Enter a City Name"
              onKeyDown={searchLocation}
              type="text"
          
            />

          <button className={styles.searchBtn} 
            type="submit"
            onClick={setWeather()}
          
          >SEARCH</button>

            
          </div>

          
                  

       
      </div>

        {
          weather && data.weather?.map((w, index) => {
            return (

                <div className={styles.container} key={index}>

                  <h2 className={styles.name}>{data.name}, {data.sys.country}</h2>

                  {/* <div className={styles.iconId}>{w.icon}</div> */}

                  <img className={styles.icon}
                    src={` http://openweathermap.org/img/wn/${w.icon}@2x.png`}
                  />
          
                  <br/>
                  <br/>
                  <br/>

                  <div className={styles.temp}>{data.main.temp}&#176;C</div>
                  <div className={styles.feelLike}>Feel Like: {data.main.feels_like}&#176;C</div>
                  <br/>
                  
                  

                  <div className={styles.desc}>
                    <div>{w.description} | {w.main}</div>
                    {/* <div>{w.imgUrl}</div> */}
                  </div>

                  <br/>
                  <br/>

                  <div className={styles.tempContainer}>

                    <div className={styles.low}>
                        <h4 className={styles.tittle}>Lowest Temp</h4>
                        <h4 className={styles.tempMin}>{data.main.temp_min}&#176;C</h4>
                    </div>

                    <div className={styles.high}>
                        <h4 className={styles.tittle}>Highest Temp</h4>
                        <div className={styles.tempMax}>{data.main.temp_max}&#176;C</div>
                    </div>
                    
                  </div>

                  <br/>
                  <br/>


                      <div className={styles.wind}>
                        <h4 className={styles.tittle}>Wind gust</h4>
                        <div className={styles.windNum}>{data.wind.gust} m/s</div>
                      </div>
                
                    
                </div>

              
            )
          })
        }

        

        
        
      </main>
    </>
  )
}
