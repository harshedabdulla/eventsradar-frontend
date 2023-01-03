import axios from 'axios';

export const fetchEvents = async () => {
  try {
    const HOST = "https://api.events.cusat.me"
    const url = `${HOST}/user/AllEvents`
    const {data} = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        }
        })
    return data;
  } catch (error) {
    return error.message;
  }
}



