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
        <Link to="/register">Sign Up</Link>
        {error && <p>{error}</p>}
      </section>
    </>
  );
};

export default Signin ;
