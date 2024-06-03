import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {httpChannelRegister} from '../../../hooks/channelRequest.js'
import {Input, Button} from "../../index.js"

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const userRegister = async (data) => {
    setError("");

    try {
      const response = await httpChannelRegister(data);
      console.log(response);
      if (response?.data?.success) {
        navigate("/login-channel");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(userRegister)}>
        <Input
          type="text"
          placeholder="First Name"
          {...register("firstName", { required: true })}
        />
        <Input
          type="text"
          placeholder="Last Name"
          {...register("lastName", { required: true })}
        />
        <Input
          type="text"
          placeholder="channel Name"
          {...register("channelName", { required: true })}
        />
        <Input
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <Input
          type="text"
          placeholder="Mobile Number"
          {...register("mobileNumber", { required: true })}
        />
        <Input
          type="text"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <Button type="submit" children="Sign Up" />
      </form>
      <div>
        <p>
          Already have an account?
          <Link to="/login-channel">Sign In</Link>
        </p>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Signup