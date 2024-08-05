import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "./index.js";
import {
  httpChangeUserPassword,
  httpUserLogout,
} from "../hooks/userRequest.js";
import { useNavigate } from "react-router-dom";
import {
  httpChangeChannelPassword,
  httpChannelLogout,
} from "../hooks/channelRequest.js";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../features/userAuthSlice.js";
import { channelLogout } from "../features/channelAuthSlice.js";

const ChangePassword = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userStatus = useSelector((state) => state.userAuth?.status);
  const channelStatus = useSelector((state) => state.channelAuth?.status);
  // console.log(userStatus);
  // console.log(channelStatus);

  const passwordChange = async (data) => {
    console.log(data);
    try {
      if (userStatus) {
        const res = await httpChangeUserPassword(data);
        console.log(res?.data);
        if (res?.data?.success) {
          httpUserLogout()
          .then(() => {
            dispatch(userLogout())
            navigate('/login')
          })
          .catch((err) => console.log(err))
        }
      }

      if (channelStatus) {
        const res = await httpChangeChannelPassword(data);
        console.log(res);
        if (res?.data?.success) {
          const response = await httpChannelLogout()

          if (response?.data?.success) {
            httpChannelLogout()
            .then(() => {
              dispatch(channelLogout())
              navigate("/login-channel")
            })
            .catch((err) => console.error(err));
          }
        }
      }
    } catch (error) {
      return {
        ok: false,
      };
    }
  };

  return (
    <div className="flex flex-col min-h-96 m-16 rounded justify-center items-center shadow-2xl gray-background-color">
      <span className="text-6xl m-6 secondary-color font-semibold">Change Password</span>
      <form
        className="flex flex-col mb-4"
        onSubmit={handleSubmit(passwordChange)}
      >
        <Input
          className="p-4 rounded-md font-bold mb-3 w-96"
          type="text"
          placeholder="enter old password"
          {...register("oldPassword", { required: true })}
        />
        <Input
          className="p-4 rounded-md font-bold mb-3 w-96"
          type="text"
          placeholder="enter new password"
          {...register("newPassword", { required: true })}
        />
        <Button
          className="w-96 rounded p-2 text-xl font-bold text-white primary-background-color"
          type="submit"
          children="Change Password"
        />
        {/* <button type='submit' onClick={()}></button> */}
      </form>
      {error && <p className="font-bold italic text-white">{error}</p>}
    </div>
  );
};

export { ChangePassword };
