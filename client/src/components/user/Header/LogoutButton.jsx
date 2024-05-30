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
    }

  return (
    <button onClick={() => logoutHandler()}>Logout</button>
  )
}

export default LogoutButton