import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Radar from "../componets/Radar/Radar";
import NavBar from "../componets/Navbar/NavBar";

import style from "../styles/Home.module.scss";
import Events from '../componets/Events/Events';




const scaleVariants = {
  whileInView: {
    scale: [0.6, 1],
    opacity: [0, 1],
    transition: {
      duration: .8,
      ease: "easeInOut",
    },
  }
}


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
    const navbarContainer = document.querySelector('#navbarContainer');
    const events = document.querySelector('#events');
    const setTimeoutId = setTimeout(() => {
      radar.style.visibility = 'visible';
      events.style.visibility = 'visible';
      navbarContainer.style.visibility = 'visible';
    }, 40);

    const handleScroll = () => {
      if (window.pageYOffset > 40) {
        radar.classList.add('hide');
      }
      else if (window.pageYOffset === 0) {
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
      <motion.div variants={scaleVariants}
        whileInView={scaleVariants.whileInView} >
        <div id="radar" className={style.RadarContainer}>
          <Radar zoomin={zoomin} zoomout={zoomout} />
          <div className={style.radar_btn}>
            <button onClick={zoomIn}> + </button>
            <button onClick={zoomOut}> - </button>
          </div>
        </div>
      </motion.div>
      <style jsx>
        {`
        #radar {
          transition: all 0.5s ease;
          visibility: hidden;
        }
      .hide {
        max-height: 0;
      }
        `}
      </style>


      <div id="navbarContainer" >
        <NavBar mainoffsetHeight={mainoffsetHeight} />
      </div>
      <style jsx>
        {`
        #navbarContainer {
          visibility: hidden;
        }
      `}
      </style>


      <div id="events" className={style.EventsContainer}>
        <Events />
      </div>
      <style jsx>
        {`
        #events {
          visibility: hidden;
        }
      `}
      </style>
    </>
  )
}

export default Home;