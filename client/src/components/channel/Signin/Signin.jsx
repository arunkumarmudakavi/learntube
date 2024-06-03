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
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(login)}>
        <Input
          type="email"
          placeholder="enter email"
          {...register("email", { required: true })}
        />
        <Input
          type="password"
          placeholder="enter password"
          {...register("password", { required: true })}
        />
        <Button type="submit" children="Sign In" />
      </form>
      <section>
        Don't have an account?
        <Link to="/register-channel">Sign Up</Link>
        {error && <p>{error}</p>}
      </section>
    </>
  );
}

export default Signin