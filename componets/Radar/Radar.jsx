import React, { useEffect } from 'react';
import Image from 'next/image';

import CircleImg from './CircleImg';
import Logo from "../../assets/tedLogo.png"


import style from "./Radar.module.scss";

const Radar = ({ zoom }) => {


  return (
    <div className={style.radarContainer} >
      <div className={style.spinner}></div>
      <div className={style.points}></div>
      <div className={`${style.spins} ${style.spin0}`} style={{ transform: `scale(${zoom})` }}></div>
      <div className={`${style.spins} ${style.spin1}`} style={{ transform: `scale(${zoom})` }}></div>
      <div className={`${style.spins} ${style.spin2}`} style={{ transform: `scale(${zoom})` }}></div>
      <div className={`${style.spins} ${style.spin3}`} style={{ transform: `scale(${zoom})` }}></div>
      <div className={`${style.spins} ${style.spin4}`} style={{ transform: `scale(${zoom})` }}></div>
      <div className={`${style.spins} ${style.spin5}`} style={{ transform: `scale(${zoom})` }}></div>
      <div className={`${style.spins} ${style.spin6}`} style={{ transform: `scale(${zoom})` }}></div>
      <div className={`${style.spins} ${style.spin7}`} style={{ transform: `scale(${zoom})` }}></div>
      <div className={`${style.spins} ${style.spin8}`} style={{ transform: `scale(${zoom})` }}></div>
      <div className={`${style.spins} ${style.spin9}`} style={{ transform: `scale(${zoom})` }}></div>
      <div className={`${style.spins} ${style.spin10}`} style={{ transform: `scale(${zoom})` }}></div>



      <div className={`${style.spins} ${style.imgSpin}`} style={{ transform: `scale(${zoom})` }}>
        <div  className={`${style.circleImg}  ${style.right}`}>
          <Image src={Logo} alt="logo" className={`${style.circleImg}`} />
          <svg className={style.svg}>
            <circle className={`${style.circle} ${style.circle3} ${style.circleImg} ${style.right}`} cx="50%" cy="50%" r="15px" />
            <circle className={`${style.circle} ${style.circle4} ${style.circleImg} ${style.right}`}  cx="50%" cy="50%" r="15px" />
          </svg>
        </div>


        <div  className={`${style.circleImg}  ${style.bottom}`}>
          <Image src={Logo} alt="logo" className={`${style.circleImg}`} />
          <svg className={style.svg}>
            <circle className={`${style.circle} ${style.circle3} ${style.circleImg} ${style.right}`} cx="50%" cy="50%" r="15px" />
            <circle className={`${style.circle} ${style.circle4} ${style.circleImg} ${style.right}`}  cx="50%" cy="50%" r="15px" />
          </svg>
        </div>
      </div>


    </div>
  )
}

export default Radar

