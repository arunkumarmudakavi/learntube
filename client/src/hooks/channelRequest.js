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

const httpGetOwnVideos = async () => {
  try {
    return await axios.get(`${import.meta.env.VITE_CHANNEL_API_URL}/home`);
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpGetChannelSingleVideo = async ({ _id }) => {
  try {
    return await axios.get(
      `${import.meta.env.VITE_CHANNEL_API_URL}/videos/${_id}`
    );
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpChannelLogout = async () => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_CHANNEL_API_URL}/logout-channel`
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

const httpCommentVideoFromChannel = async ({ videoId, content }) => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_CHANNEL_API_URL}/comments/${videoId}`,
      { content }
    );
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpGetAllCommentsFromChannel = async ({ _id }) => {
  try {
    return await axios.get(
      `${import.meta.env.VITE_CHANNEL_API_URL}/comments/${_id}`
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
  httpGetOwnVideos,
  httpGetChannelSingleVideo,
  httpCommentVideoFromChannel,
  httpGetAllCommentsFromChannel,
};
