import React, { useState, useEffect, useRef } from 'react';

import Radar from "../componets/Radar/Radar";
import NavBar from "../componets/Navbar/NavBar";

import style from "../styles/Home.module.scss";
import Events from '../componets/Events/Events';


const Home = () => {

  const [zoomin, setZoomIn] = useState(false)
  const [zoomout, setZoomOut] = useState(false)
  const [isRadar, setIsRadar] = useState(true)
  const [mainoffsetHeight, setMainoffsetHeight] = useState()

  const zoomIn = () => {
    setZoomIn(true)
  }
  const zoomOut = () => {
    setZoomOut(true)
  }



  useEffect(() => {

    const radar = document.querySelector('#radar');
    const nav = document.querySelector('#navbarContainer');

    const handleScroll = () => {
      if (window.pageYOffset > 40) {
        radar.classList.add('hide');
      }
      else if(window.pageYOffset === 0) {
        radar.classList.remove('hide');
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }

  }, []);


  return (
    <>

      <div id="radar" className={style.RadarContainer}>
        <Radar zoomin={zoomin} zoomout={zoomout} />
        <div className={style.radar_btn}>
          <button onClick={zoomIn}> + </button>
          <button onClick={zoomOut}> - </button>
        </div>
      </div>
      <style jsx>
        {`
        #radar {
          transition: all 0.5s ease;
        }
      .hide {
        max-height: 0;
      }
        `}
      </style>


      <div id="navbarContainer" >
        <NavBar mainoffsetHeight={mainoffsetHeight} />
      </div>
      <div id="events" className={style.EventsContainer}>
        <Events />
      </div>


    </>
  )
}

export default Home;