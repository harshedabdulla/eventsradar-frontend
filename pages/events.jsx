import React from 'react'
import Events from  '../componets/Events/Events';

import { fetchEvents } from '../api/FetchEvents';


export const getServerSideProps = async (context) => {
  const events = await fetchEvents();
  return {
    props: {
      events
    }
  }
}

const events = ({events}) => {
  return (
    <div id="canvas">
      <Events Events={events.data.Events} />
    </div>
  )
}

export default events