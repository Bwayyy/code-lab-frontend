import axios from "axios";
axios.defaults.withCredentials = true;
const { REACT_APP_API_BASE_URL } = process.env;
export const postSignup = async (user: any) => {
  const resp = await axios.post(REACT_APP_API_BASE_URL + "/register", user);
  return resp;
};
export const postLogin = async (user: any) => {
  const resp = await axios.post(REACT_APP_API_BASE_URL + "/login", user, {
    withCredentials: true,
  });
  return resp;
};
export const postSignout = async () => {
  return await axios.post(REACT_APP_API_BASE_URL + "/logout");
};

export const fetchUserData = async () => {
  return await (
    await axios.get(REACT_APP_API_BASE_URL + "/userdata", {
      withCredentials: true,
    })
  ).data;
};
