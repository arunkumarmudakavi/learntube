import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChannelAuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const channelAuth = useSelector((state) => state.channelAuth.status);

  useEffect(() => {
    if (authentication && channelAuth !== authentication) {
      navigate("/login-channel");
    } else if (!authentication && channelAuth !== authentication) {
      navigate("/channel-home");
    }
    setLoader(false);
  }, [channelAuth, navigate, authentication]);
  return loader ? <h1>Loading...</h1> : <>{children}</>;
};

export default ChannelAuthLayout;
