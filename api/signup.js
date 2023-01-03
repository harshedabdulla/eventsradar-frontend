import axios from "axios";

export const SignupReqeust = async (body_data) => {
  const HOST = "https://api.events.cusat.me";
  const url = `${HOST}/user/signup`;
  const { data } = await axios.post(url, JSON.stringify(body_data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}