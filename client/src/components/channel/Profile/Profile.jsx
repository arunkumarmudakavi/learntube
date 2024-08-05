import React, { useEffect, useState } from "react";
import { httpGetChannelDetails } from "../../../hooks/channelRequest.js";
import { Button } from "../../index.js";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    httpGetChannelDetails().then((res) => setDetails(res));
  }, []);

  const changePassword = () => {
    navigate("/change-password");
  };

  return (
    <section className="flex justify-evenly h-lvh secondary-background-color text-white">
      <section className="flex-col flex p-6 m-6 w-full rounded gray-background-color border-opacity-25">
        <center className="text-4xl font-semibold mb-6 secondary-color">Profile</center>
        <label htmlFor="firstName" id="firstName" className="font-bold text-3xl">
          First Name:{" "}
        </label>
        <input
          className="bg-gray-200 text-black p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.data?.firstName}
          disabled
        />
        <label htmlFor="lastName" id="lastName" className="font-bold text-3xl">
          Last Name:{" "}
        </label>
        <input
          className="bg-gray-200 text-black p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.data?.lastName}
          disabled
        />
        <label htmlFor="email" id="email" className="font-bold text-3xl">
          Email:{" "}
        </label>
        <input
          className="bg-gray-200 text-black p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.data?.email}
          disabled
        />
        <label htmlFor="mobileNumber" id="mobileNumber" className="font-bold text-3xl">
          Mobile Number:{" "}
        </label>
        <input
          className="bg-gray-200 text-black p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.data?.mobileNumber}
          disabled
        />
        <Button
          className="text-white primary-background-color w-60 h-16 font-semibold text-2xl rounded-md"
          onClick={() => changePassword()}
          type="submit"
          children="change password"
        />
      </section>
    </section>
  );
};

export default Profile;
