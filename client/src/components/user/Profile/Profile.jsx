import React from 'react'
import {useSelector} from "react-redux"

const Profile = () => {
    const currentUser = useSelector((state) => state.userAuth?.userData?.data);
    console.log(currentUser?.data?.firstName);
  return (
    <>
    <p>{currentUser?.data?.firstName}</p>
    </>
  )
}

export default Profile