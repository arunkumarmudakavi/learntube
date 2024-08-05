import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {httpGetChannelDetails, httpChannelLogin} from "../../../hooks/channelRequest.js"
import {Input, Button} from "../../index.js"
import {channelLogin} from "../../../features/channelAuthSlice.js"

const Signin = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (data) => {
    setError("");
    try {
      const response = await httpChannelLogin(data);
      if (response?.data?.success) {
        const userData = await httpGetChannelDetails();
        console.log(userData);
        if (userData) {dispatch(channelLogin(userData))};
        navigate("/channel-home");
      }else{
        setError("Invalid Credentials!")
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-96 m-16 rounded justify-center items-center gray-background-color">
      <span className="text-6xl m-6 font-semibold secondary-color">Channel Sign In</span>
      <form className="flex flex-col mb-4" onSubmit={handleSubmit(login)}>
        <Input
          className="text-black p-4 rounded-md font-bold mb-3 w-96"
          type="email"
          placeholder="enter email"
          {...register("email", { required: true })}
        />
        <Input
          className="text-black p-4 rounded-md font-bold mb-3 w-96"
          type="password"
          placeholder="enter password"
          {...register("password", { required: true })}
        />
        <Button className="primary-background-color w-96 rounded p-2 text-xl font-bold text-white" type="submit" children="Sign In" />
      </form>
      <section className="font-bold text-xl secondary-color">
        Don't have an account?
        <Link to="/register-channel" className='underline'> Sign Up</Link>
        {error && <p className="font-bold italic text-white">{error}</p>}
      </section>
    </div>
  );
}

export default Signin