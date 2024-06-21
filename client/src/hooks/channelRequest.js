import axios from "axios";

const httpChannelRegister = async (data) => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_CHANNEL_API_URL}/register-channel`,
      data
    );
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpChannelLogin = async (data) => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_CHANNEL_API_URL}/login-channel`,
      data
    );
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpGetChannelDetails = async () => {
  try {
    return await axios.get(
      `${import.meta.env.VITE_CHANNEL_API_URL}/channel-profile`
    );
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpUploadVideo = async (data) => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_CHANNEL_API_URL}/uploadVideo`,
      data
    );
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpChannelLogout = async (data) => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_CHANNEL_API_URL}/logout-channel`,
      data
    );
    
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpChangeChannelPassword = async (data) => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_CHANNEL_API_URL}/changePassword`,
      data
    );
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpUpdateAvatar = async (data) => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_CHANNEL_API_URL}/avatar`,
      data
    );
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export {
  httpChannelRegister,
  httpChannelLogin,
  httpChannelLogout,
  httpGetChannelDetails,
  httpUploadVideo,
  httpChangeChannelPassword,
  httpUpdateAvatar,
};
