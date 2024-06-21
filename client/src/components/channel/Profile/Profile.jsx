import React, {useEffect, useState} from "react";
import { httpGetChannelDetails } from "../../../hooks/channelRequest.js";

const Profile = () => {
  const [details, setDetails] = useState([])
  useEffect(() => {
    httpGetChannelDetails()
      .then((res) => setDetails(res))
  },[])
  // console.log(details?.data?.data);
  return (
    <section className="flex justify-evenly h-lvh ">
      <section className="flex-col flex bg-white p-6 m-6 w-full rounded border-slate-400 border-2 border-opacity-25">
        <center className="text-4xl font-semibold mb-6">Profile</center>
        <label htmlFor="firstName" className="font-bold text-3xl">First Name: </label>
        <input
          className="bg-gray-200 p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.data?.firstName}
          disabled
        />
        <label htmlFor="lastName" className="font-bold text-3xl">Last Name: </label>
        <input
          className="bg-gray-200 p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.data?.lastName}
          disabled
        />
        <label htmlFor="email" className="font-bold text-3xl">Email: </label>
        <input
          className="bg-gray-200 p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.data?.email}
          disabled
        />
        <label htmlFor="mobileNumber" className="font-bold text-3xl">Mobile Number: </label>
        <input
          className="bg-gray-200 p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.data?.mobileNumber}
          disabled
        />
        <label htmlFor="password" className="font-bold text-3xl">Password: </label>
        <input
          className="bg-gray-200 p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.data?.password}
          disabled
        />
      </section>
      <span className=" border-r-2 border-opacity-25 border-slate-400"></span>
      <section className="w-full p-6">
        <center className="text-4xl font-semibold">History</center>
        <section className="bg-gray-200 m-6 p-6">
          No History!
        </section>
      </section>
    </section>
    // <>
    //   <p>{details?.data?.data?.firstName}</p>
    //   <p>{details?.data?.data?.lastName}</p>
    //   <p>{details?.data?.data?.email}</p>
    //   <p>{details?.data?.data?.mobileNumber}</p>
    //   <p>{details?.data?.data?.password}</p>
    // </>
  );
};

export default Profile;
