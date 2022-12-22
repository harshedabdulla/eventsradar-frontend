import React, { useState } from 'react';

import Radar from "../componets/Radar/Radar";

import style from "../styles/Home.module.scss";


const Home = () => {

  const [zoomin, setZoomIn] = useState(false)
  const [zoomout, setZoomOut] = useState(false)

  const zoomIn = () => {
    setZoomIn(true)
  }
  const zoomOut = () => {
    setZoomOut(true)
  }

  return (
    <>
      <div className={style.container}>
        <Radar zoomin={zoomin} zoomout={zoomout}/>

        <div className={style.radar_btn}>
          <button onClick={zoomIn}> + </button>
          <button onClick={zoomOut}> - </button>
        </div>
      </div>

    </>
  )
}

export default Home;