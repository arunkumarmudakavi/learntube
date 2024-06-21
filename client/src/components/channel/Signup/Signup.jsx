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
    <div className="flex flex-col min-h-96 m-16 rounded justify-center items-center bg-indigo-500">
      <span className="text-6xl m-6 font-semibold">Channel Registration</span>
      <form className="flex flex-col mb-4" onSubmit={handleSubmit(userRegister)}>
        <Input
          className="p-4 rounded-md font-bold mb-3 w-96"
          type="text"
          placeholder="First Name"
          {...register("firstName", { required: true })}
        />
        <Input
          className="p-4 rounded-md font-bold mb-3 w-96"
          type="text"
          placeholder="Last Name"
          {...register("lastName", { required: true })}
        />
        <Input
          className="p-4 rounded-md font-bold mb-3 w-96"
          type="text"
          placeholder="channel Name"
          {...register("channelName", { required: true })}
        />
        <Input
          className="p-4 rounded-md font-bold mb-3 w-96"
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <Input
          className="p-4 rounded-md font-bold mb-3 w-96"
          type="text"
          placeholder="Mobile Number"
          {...register("mobileNumber", { required: true })}
        />
        <Input
          className="p-4 rounded-md font-bold mb-3 w-96"
          type="text"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <Button className="border-white w-96 border-2 rounded p-2 text-xl font-bold text-white" type="submit" children="Sign Up" />
      </form>
      <div>
        <section className="font-bold text-xl mb-6">
          Already have an account?
          <Link to="/login-channel" className='underline'> Sign In</Link>
        </section>
      </div>
        {error && <p className="font-bold italic text-white">{error}</p>}
    </div>
  );
}

export default Signup