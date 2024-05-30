import React, { useEffect, useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {Container, LogoutButton} from '../../index.js'
import { useSelector } from 'react-redux';

const Header = () => {
    const navigate = useNavigate();

    const userAuthStatus = useSelector((state) => state.userAuth.status)
    // console.log(userAuthStatus);

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !userAuthStatus
        },
        {
            name: 'Register',
            slug: '/register',
            active: !userAuthStatus
        },
        {
            name: 'Profile',
            slug: '/profile',
            active: userAuthStatus
        },
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
                        (userAuthStatus) && (
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