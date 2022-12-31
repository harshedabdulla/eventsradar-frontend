import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EventCard from  '../EventCard/EventCard';

import style from "./Events.module.scss";



const Events = () => {

  const [activeMenu, setActiveMenu] = useState("All")
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });


  useEffect(() => {
    setAnimateCard([{ y: 100, opacity: 0 }]);
    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
    }, 500);
  }, [])


  const handlesetActiveMenu = (item) => {
    setActiveMenu(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
    }, 500);
  }

  return (
    <div>
      <div id={style.event__page} >
        <div className={style.event__header}>
          <h1>Events</h1>
          <button>+ Add Event</button>
        </div>
        <div className={style.event__menu}>
          {["All", "Upcoming", "Past"].map((item, index) => (
            <p
              key={index}
              onClick={() => handlesetActiveMenu(item)}
              className={`${activeMenu === item ? style.active_menu : ''}`}>
              {item}
            </p>
          ))}
        </div>



        <motion.div
          animate={animateCard}
          transition={{ duration: 0.5, delayChildren: 0.5 }}
          className={style.event__card}
        >
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </motion.div>
         
      </div>
    </div>
  )
}

export default Events