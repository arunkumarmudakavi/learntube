import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../index.js";
import { httpGetProfile, httpUserLogin } from "../../../hooks/userRequest.js";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../features/userAuthSlice.js";
import { useForm } from "react-hook-form";

const Signin = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (data) => {
    setError("");
    try {
      const response = await httpUserLogin(data);
      if (response?.data?.success) {
        const userData = await httpGetProfile();
        if (userData) dispatch(userLogin(userData));
        navigate("/");
      }else{
        setError("Invalid Credentials!")
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-96 m-16 rounded justify-center items-center shadow-2xl gray-background-color">
      <span className="text-6xl m-6 secondary-color font-semibold">Sign In</span>
      <form className="flex flex-col mb-4" onSubmit={handleSubmit(login)}>
        <Input
          className="p-4 rounded-md font-bold mb-3 w-96"
          type="email"
          placeholder="enter email"
          {...register("email", { required: true })}
        />
        <Input
          className="p-4 rounded-md font-bold mb-3 w-96"
          type="password"
          placeholder="enter password"
          {...register("password", { required: true })}
        />
        <Button className="primary-background-color w-96 rounded p-2 text-xl font-bold text-white" type="submit" children="Sign In" />
      </form>
      <section className="font-bold text-xl mb-6 secondary-color">
        Don't have an account?
        <Link to="/register" className="underline"> Sign Up</Link>
      </section>
        {error && <p className="font-bold italic text-white">{error}</p>}
    </div>
  );
};

export default Signin ;
