import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';

import EventCard from '../EventCard/EventCard';
import style from "./Events.module.scss";

const Events = ({ Events }) => {

  const [activeMenu, setActiveMenu] = useState("All")
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [filterEvents, setFilterEvents] = useState(Events);

  const getEventsTag = (Events) => {

    const currDate = new Date();

    Events?.map((event) => {
      const eventDate = new Date(event.event_date);
      if(eventDate >= currDate){
        event.tag = 'Upcoming';
      }else{
        event.tag = 'Past';
      }
    })
  }

  useEffect(() => {

    getEventsTag(Events);

    setAnimateCard([{ y: 100, opacity: 0 }]);
    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
    }, 500);
  }, [])


  const handlesetActiveMenu = (item) => {
    setActiveMenu(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    if (item === 'All') {
      setFilterEvents(Events);
    } else {
      setFilterEvents(Events.filter((event) => event.tag.includes(item)));
    }

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
          {filterEvents?.map((event, index) => (
            <EventCard key={index}
              organizer_name={event.organizer_name}
              title={event.title}
              date={event.event_date}
              location={event.location}
              description={event.short_description}
              eventImg={event.event_pic}
              application_link={event.application_link}
            />
          ))}

        </motion.div>

      </div>
    </div>
  )
}

export default Events