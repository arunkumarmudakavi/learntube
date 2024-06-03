import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const {firstName, lastName, email, mobileNumber} = useSelector((state) => state.userAuth?.userData?.data?.data);
  console.log(firstName);
  return (
    <>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{email}</p>
      <p>{mobileNumber}</p>
    </>
  );
};

export default Profile;
