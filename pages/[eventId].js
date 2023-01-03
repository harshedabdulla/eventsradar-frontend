import { useRouter } from 'next/router';

export default function EventPage({ event }) {
  const router = useRouter();
  const { eventId } = router.query;

  return (
    <div>
    <h4>{event.company}</h4>
    <h1>{event.name}</h1>
    <h5>{event.location}</h5>
    <button onClick={showShareInfo}>Share</button>
    <h4>{event.date}</h4>
    <p>{event.details}</p>  
    <img src={event.photo} alt={event.name} className='eventImage'/>
    <br />
    <button>View more</button>
    <br />    
    <button className='bbGreen'>FAQ</button>
    <button className='bbGreen'>Write a review</button> 
    </div>
  );
}

export async function getStaticProps({ params }) {
  const eventId = params.eventId;
  const event = await fetchEventData(eventId);
  return {
    props: {
      event,
    },
  };
}

export async function getStaticPaths() {
  const eventIds = await fetchEventIds();
  return {
    paths: eventIds.map((eventId) => ({
      params: { eventId },
    })),
    fallback: false,
  };
}

async function fetchEventIds() {
     const eventIds = ['123', '456', '789'];
    return eventIds;
  }

  async function fetchEventData(eventId) {
     const event = {
      id: eventId,
      company: 'TinkerHub',
      name: 'Product Design Camp',
      date: '1-1-2023',
      location: 'Seminar Hall',
      photo: 'https://www.tinkerhub.org/files/TH%20Report%20Cover%202021-22.png',
      details: 'The workshop should start with a round of introduction as an icebreaker. As a minimum everyone in the group should take turns to state their name where they work and their role. If wanted, people can add something a bit more personal about their background.',
    };
    return event;
  }
  function showRegistrationForm() {
     alert('Registration form shown!');
  }
  function showShareInfo() {
    alert('Share done!');
  }
  