import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const cur = useSelector((state) => state.channelAuth?.channelData?.data);
  console.log(cur);
  return (
    <>
      {/* <p>{firstName}</p> */}
    </>
  );
};

export default Profile;
