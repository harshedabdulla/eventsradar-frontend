import React from 'react';
import { motion } from 'framer-motion';

import style from "./EventCard.module.scss"

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  }
};
const EventCard = () => {
  return (
    <motion.div variants={scaleVariants}
    whileInView={scaleVariants.whileInView} >
    <div className={style.container}>
    <div className={style.card}>
      <div className={style.card_header}>
        <div className={style.club__icon}>
          <img src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo"
            alt="icon" />
          <div className={style.club__name}>
            <h3>Space Up</h3>
          </div>
        </div>
        <img src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg" alt="rover" />
      </div>
      <div className={style.card_body}>
        <p>An exploration into the truck's polarising design</p>
        <span className={style.time}>32 DEC 2020</span>
        <button><p>Register Now</p></button>
      </div>
      <div>
      </div>
    </div>
  </div>
  </motion.div>
  )
}

export default EventCard