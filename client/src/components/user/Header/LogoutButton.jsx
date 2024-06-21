import React from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { userLogout } from '../../../features/userAuthSlice.js'
import {httpUserLogout} from '../../../hooks/userRequest.js'

const LogoutButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        httpUserLogout()
        .then(() => {
            dispatch(userLogout())
            navigate('/login')
        })
        .catch((err) => console.log(err))
    }

  return (
    <button className='bg-white text-indigo-500 px-3 py-1 rounded-md font-semibold' onClick={() => logoutHandler()}>Logout</button>
  )
}

export default LogoutButton