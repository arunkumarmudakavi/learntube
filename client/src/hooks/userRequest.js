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
  return await axios.get(`${import.meta.env.VITE_API_URL}/profile`);
  // try {
  // } catch (error) {
  //   return {
  //     ok: false,
  //   };
  // }
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

const httpLikeVideo = async ({ _id }) => {
  try {
    return await axios.put(`${import.meta.env.VITE_API_URL}/likes/${_id}`);
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpGetAllLikes = async ({ _id }) => {
  try {
    return await axios.get(`${import.meta.env.VITE_API_URL}/likes/${_id}`);
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpCommentVideo = async ({  videoId,commentedBy,userName,content}) => {
  try {
    return await axios.put(`${import.meta.env.VITE_API_URL}/videos/comments/${videoId}`, {videoId,commentedBy,userName,content});
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const httpStoreHistory = async () => {
  try {
    return await axios.post(`${import.meta.env.VITE_API_URL}/history`);
  } catch (error) {
    return {
      ok: false,
    };
  }
}  

const httpGetHistory = async () => {
  try {
    return await axios.get(`${import.meta.env.VITE_API_URL}/history`);
  } catch (error) {
    return {
      ok: false,
    };
  }
}  

export {
  httpUserRegister,
  httpUserLogin,
  httpUserLogout,
  httpGetProfile,
  httpChangeUserPassword,
  httpGetVideos,
  httpGetSingleVideo,
  httpLikeVideo,
  httpGetAllLikes,
  httpCommentVideo,
  httpGetHistory,
  httpStoreHistory,
};
