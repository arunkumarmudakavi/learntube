import axios from "axios";

const httpUserRegister = async (data) => {
  try {
    return await axios.post(`${import.meta.env.VITE_API_URL}/register`, data);
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpUserLogin = async (data) => {
  try {
    return await axios.post(`${import.meta.env.VITE_API_URL}/login`, data);
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpUserLogout = async (data) => {
  try {
    return await axios.post(`${import.meta.env.VITE_API_URL}/logout`, data);
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpGetProfile = async () => {
  try {
    return await axios.get(`${import.meta.env.VITE_API_URL}/profile`);
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpChangeUserPassword = async (data) => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_API_URL}/changePassword`,
      data
    );
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpGetVideos = async () => {
  try {
    return await axios.get(`${import.meta.env.VITE_API_URL}/videos`);
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpGetSingleVideo = async ({ _id }) => {
  try {
    return await axios.get(`${import.meta.env.VITE_API_URL}/videos/${_id}`);
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export {
  httpUserRegister,
  httpUserLogin,
  httpUserLogout,
  httpGetProfile,
  httpChangeUserPassword,
  httpGetVideos,
  httpGetSingleVideo,
};
