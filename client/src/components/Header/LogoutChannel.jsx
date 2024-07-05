import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {httpChannelLogout} from '../../hooks/channelRequest.js'
import {channelLogout} from '../../features/channelAuthSlice.js'

const LogoutChannel = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        httpChannelLogout()
        .then(() => {
            dispatch(channelLogout())
            navigate('/login-channel')
        })
    }
  return (
    <button className='bg-white text-zinc-800 px-3 py-1 rounded-md font-semibold' onClick={() => logoutHandler()}>Logout</button>
  )
}

export default LogoutChannel