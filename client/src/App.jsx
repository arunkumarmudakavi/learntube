import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { httpGetProfile } from './hooks/userRequest';
import { userLogin, userLogout } from './features/userAuthSlice';
import { Header } from './components/index.js';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    httpGetProfile()
    .then((userData) => {
      if(userData) {
        dispatch(userLogin({userData}))
      }else{
        dispatch(userLogout())
      }
    })
    .finally(() => setLoading(false))
  }, []);

  return !loading ? (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </>
  ) : null;
}

export default App
