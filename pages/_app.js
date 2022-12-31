import '../styles/globals.scss';
import EventState from '../context/events/EventState';

export default function App({ Component, pageProps }) {
  return (
    
    <EventState>
      <Component {...pageProps} />
    </EventState>
  );
}
