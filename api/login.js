import axios from "axios"

export const LoginReqeust = async (body_data) => {

  const HOST = "https://api.events.cusat.me"
  const url = `${HOST}/user/login`
  const {data} = await axios.post(url, JSON.stringify(body_data), {
    headers: {
      'Content-Type': 'application/json',
      }
      })
  return data;
}

