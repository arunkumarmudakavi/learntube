import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AuthLayout,
  Home,
  Profile,
  Signin,
  Signup,
  SingleVideo,
  ChannelAuthLayout,
  ChannelHome,
  ChannelProfile,
  ChannelSignin,
  ChannelSignup,
  VideoUpload,
  ChangePassword,
} from "./components/index.js";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { SearchResult } from "./components/SearchResult.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Signin />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication>
            {" "}
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/changePassword",
        element: (
          <AuthLayout authentication>
            <ChangePassword />
          </AuthLayout>
        ),
      },
      {
        path: "/videos/:_id",
        element: <SingleVideo />,
      },
      {
        path: "/search-result",
        element: (
            <SearchResult />
        ),
      },
      {
        path: "/register-channel",
        element: (
          <ChannelAuthLayout authentication={false}>
            <ChannelSignup />
          </ChannelAuthLayout>
        ),
      },
      {
        path: "/login-channel",
        element: (
          <ChannelAuthLayout authentication={false}>
            <ChannelSignin />
          </ChannelAuthLayout>
        ),
      },
      {
        path: "/channel-home",
        element: (
          <ChannelAuthLayout authentication>
            <ChannelHome />
          </ChannelAuthLayout>
        ),
      },
      {
        path: "/channel-profile",
        element: (
          <ChannelAuthLayout authentication>
            <ChannelProfile />
          </ChannelAuthLayout>
        ),
      },
      {
        path: "/change-password",
        element: (
          <ChannelAuthLayout authentication>
            <ChangePassword />
          </ChannelAuthLayout>
        ),
      },
      {
        path: "/uploadVideo",
        element: (
          <ChannelAuthLayout authentication>
            <VideoUpload />
          </ChannelAuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
