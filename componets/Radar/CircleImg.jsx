import React from 'react'
import Logo from "../../assets/tedLogo.png"

import style from "./CircleImg.module.scss"

const CircleImg = ({zoom}) => {
  return (
    <div className={`${style.circularMapR1}`}>
      <img src={Logo} alt="logo" className={`${style.circleImg}  ${style.left}`} style={{ transform: `scale(${zoom})`}}/>
    </div>
  )
}

export default CircleImg