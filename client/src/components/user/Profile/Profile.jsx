import React, { useEffect, useState } from "react";
import { httpGetProfile, httpGetHistory } from "../../../hooks/userRequest.js";

const Profile = () => {
  const [details, setDetails] = useState([]);
  const [history, setHistory] = useState([])
  useEffect(() => {
    httpGetProfile()
      .then((res) => setDetails(res?.data))
      .catch((err) => console.log(err));

    httpGetHistory()
    .then((res) => setHistory(res?.data))
    .catch((err) => console.log(err));
  }, []);

  // console.log(history?.data);
  // console.log(history?.data[0]?.result[0]?.title);
  // console.log(details?.data);
  return (
    <section className="flex justify-evenly h-lvh ">
      <section className="flex-col flex bg-white p-6 m-6 w-full rounded border-slate-400 border-2 border-opacity-25">
        <center className="text-4xl font-semibold mb-6">Profile</center>
        <label htmlFor="firstName" className="font-bold text-3xl">First Name: </label>
        <input
          className="bg-gray-200 p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.firstName}
          disabled
        />
        <label htmlFor="lastName" className="font-bold text-3xl">Last Name: </label>
        <input
          className="bg-gray-200 p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.lastName}
          disabled
        />
        <label htmlFor="email" className="font-bold text-3xl">Email: </label>
        <input
          className="bg-gray-200 p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.email}
          disabled
        />
        <label htmlFor="mobileNumber" className="font-bold text-3xl">Mobile Number: </label>
        <input
          className="bg-gray-200 p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.mobileNumber}
          disabled
        />
      </section>
      <span className=" border-r-2 border-opacity-25 border-slate-400"></span>
      {details ?
      <section className="w-full p-6">
      <center className="text-4xl font-semibold">History</center>
      <section className="bg-gray-200 m-6 p-6">
        No History!
      </section>
    </section> : 
    <section>
      {
        
        // history?.data?.map((post) => (
        //     <div key={post?._id}>
        //         {/* <PostCard {...post}/> */}
        //         <div>{post}</div>
        //     </div>
        // ))
    }
    
    </section>
    
    }
      
    </section>
  );
};

export default Profile;
