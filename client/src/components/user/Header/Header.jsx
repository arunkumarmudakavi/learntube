import React, { useEffect, useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {Container, LogoutButton, LogoutChannel} from '../../index.js'
import { useSelector } from 'react-redux';

const Header = () => {
    const navigate = useNavigate();

    const userAuthStatus = useSelector((state) => state.userAuth.status)
    const channelAuthStatus = useSelector((state) => state.channelAuth.status)
    // console.log(userAuthStatus);

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true && !channelAuthStatus
        },
        {
            name: 'Login',
            slug: '/login',
            active: !userAuthStatus && !channelAuthStatus
        },
        {
            name: 'Register',
            slug: '/register',
            active: !userAuthStatus && !channelAuthStatus
        },
        {
            name: 'Profile',
            slug: '/profile',
            active: userAuthStatus && !channelAuthStatus
        },
        {
            name: 'Login Channel',
            slug: '/login-channel',
            active: !channelAuthStatus && !userAuthStatus
        },
        {
            name: 'Home',
            slug: '/channel-home',
            active: channelAuthStatus
        },
        {
            name: 'Upload',
            slug: '/uploadVideo',
            active: channelAuthStatus 
        },
        {
            name: 'Profile',
            slug: '/channel-profile',
            active: channelAuthStatus  && !userAuthStatus
        }
    ]

  return (
    <header>
        <Container>
            <nav>
                <div>
                    <Link to='/'>LearnTUBE</Link>
                </div>
                <ul>
                    {
                        navItems.map((item) => 
                        item.active ? (
                            <li key={item.name}>
                                <button onClick={() => navigate(item.slug)}>
                                    {item.name}
                                </button>
                            </li>
                        ) : null)
                    }
                    {
                        ( channelAuthStatus && !userAuthStatus) && (
                            <li>
                                <LogoutChannel/>
                            </li>
                        )
                    }
                    {
                        (userAuthStatus && !channelAuthStatus) && (
                            <li>
                                <LogoutButton/>
                            </li>
                        )
                    }
                    
                </ul>
            </nav>
        </Container>
    </header>
  )
}

export default Header