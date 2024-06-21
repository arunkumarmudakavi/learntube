import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { httpGetProfile } from "./hooks/userRequest";
import { userLogin, userLogout } from "./features/userAuthSlice";
import { Header } from "./components/index.js";
import { Outlet } from "react-router-dom";
import axios from "axios";
import "./index.css";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.userAuth?.userData)
  // console.log(userInfo);

  // useEffect(() => {
  //     if(userInfo) {
  //       dispatch(userLogin({userInfo}))
  //     }else{
  //       dispatch(userLogout())
  //       setLoading(false)
  //     }
  // }, []);

  useEffect(() => {
    httpGetProfile()
      .then((userData) => {
        if (userData) {
          dispatch(userLogin({ userData }));
        } else {
          dispatch(userLogout());
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  ) : (
    <div
      id="loading-overlay"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60"
    >
      <svg
        class="animate-spin h-8 w-8 text-white mr-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      <span class="text-white text-3xl font-bold">Loading...</span>
    </div>
  );
};

export default App;
