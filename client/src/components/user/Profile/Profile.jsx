import React, { useEffect, useState } from "react";
import {
  httpGetProfile,
  httpGetHistory,
  httpRemoveFromHistory,
} from "../../../hooks/userRequest.js";
import { Button, HistoryPostCard } from "../../index.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [details, setDetails] = useState([]);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const userStatus = useSelector((state) => state.userAuth?.status);
  const channelStatus = useSelector((state) => state.channelAuth?.status);

  useEffect(() => {
    if (userStatus) {
      httpGetProfile()
        .then((res) => setDetails(res?.data))
        .catch((err) => console.error(err));

      httpGetHistory()
        .then((res) => {
          setHistory(res?.data);
          console.log(res?.data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const removeHistory = () => {
    httpRemoveFromHistory()
      .then(() => navigate("/profile"))
      .catch((err) => console.error(err));
  };

  const changePassword = () => {
    navigate("/changePassword");
  };

  return (
    <section className="flex justify-evenly h-lvh ">
      <section className="flex-col flex bg-white p-6 m-6 w-full rounded border-slate-400 border-2 border-opacity-25">
        <center className="text-4xl font-semibold mb-6">Profile</center>
        <label htmlFor="firstName" className="font-bold text-3xl">
          First Name:{" "}
        </label>
        <input
          className="bg-gray-200 p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.firstName}
          disabled
        />
        <label htmlFor="lastName" className="font-bold text-3xl">
          Last Name:{" "}
        </label>
        <input
          className="bg-gray-200 p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.lastName}
          disabled
        />
        <label htmlFor="email" className="font-bold text-3xl">
          Email:{" "}
        </label>
        <input
          className="bg-gray-200 p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.email}
          disabled
        />
        <label htmlFor="mobileNumber" className="font-bold text-3xl">
          Mobile Number:{" "}
        </label>
        <input
          className="bg-gray-200 p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.mobileNumber}
          disabled
        />
        <Button
          onClick={() => changePassword()}
          type="submit"
          children="change password"
        />
      </section>
      <span className=" border-r-2 border-opacity-25 border-slate-400"></span>
      {!history ? (
        <section className="w-full p-6">
          <center className="text-4xl font-semibold">History</center>
          <section className="bg-gray-200 m-6 p-6">No History!</section>
        </section>
      ) : (
        <section className="w-full p-6 ">
          <center className="text-4xl font-semibold">History</center>
          {/* {console.log(history)} */}
          {history?.data?.length === 0 ? null : (
            <button onClick={() => removeHistory()}>Remove All</button>
          )}
          {history?.data?.map((post) => (
            <div
              className="py-2 border-2 border-gray-300 rounded m-2"
              key={post?._id}
            >
              <HistoryPostCard {...post} />
            </div>
          ))}
        </section>
      )}
    </section>
  );
};

export default Profile;
