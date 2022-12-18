import React, { useState } from 'react';

import Radar from "../componets/Radar/Radar";

import style from "../styles/Home.module.scss";


const Home = () => {

  const [zoom, setZoom] = useState(1)
  const zoomArr = [.5, .6, .7, .8, .9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2];

  const zoomIn = () => {
    let index = zoomArr.indexOf(zoom);
    if (index < zoomArr.length - 1) {
      index++;
    }
   
    setZoom(zoomArr[index]);
  }
  const zoomOut = () => {
    let index = zoomArr.indexOf(zoom);
    if (index > 0 ) {
      index--;
    }
    setZoom(zoomArr[index]);
  }


  

  return (
    <>
      <div className={style.container}>
        <Radar zoom={zoom} />

        <div className={style.radar_btn}>
          <button onClick={zoomIn}> + </button>
          <button onClick={zoomOut}> - </button>
        </div>
      </div>

    </>
  )
}

export default Home;