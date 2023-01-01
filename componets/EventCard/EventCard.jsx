import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import style from "./EventCard.module.scss"
import Dp from "../../public/assets/dp.png";
import placeholder from "../../public/assets/placeholder.png";


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
const EventCard = (props) => {

  const { organizer_name, title, date, location, description, eventImg, application_link } = props;

  return (
    <motion.div variants={scaleVariants}
      whileInView={scaleVariants.whileInView}
    >
      <div className={style.card}>
        <div className={style.card_header}>
          <div className={style.club__icon}>
            <Image src={Dp} className={style.club__iconImg}
              alt="icon" />
            <div className={style.club__name}>
              <h3>{title}</h3>
            </div>
          </div>
          <Image src={eventImg ? eventImg : placeholder} className={style.header_img} alt="rover" />
        </div>
        <div className={style.card_body}>
          <p>{description}</p>
          <span className={style.time}>{date}</span>
          <button><Link href={application_link}><p> Register Now</p></Link></button>
        </div>
        <div>
        </div>
      </div>
    </motion.div>
  )
}

export default EventCard