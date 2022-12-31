import React,{ useState} from 'react'
import eventContext from './EventContext'
import axios from 'axios'

const HOST = "https://api.events.cusat.me"



const EventState = (props) => {

  const [events, setEvents] = useState([])



  const getEvents = async () => {
    
  
  }

  




  return (
    <eventContext.Provider value={{getEvents}}>
      {props.children}
    </eventContext.Provider>
  )
}

export default EventState