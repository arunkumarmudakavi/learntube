import React from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {Container, LogoutButton, LogoutChannel} from '../../index.js'
import { useSelector } from 'react-redux';
import { SearchBar } from '../../SearchBar.jsx';

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
            <nav className="primary-background-color shadow-2xl flex justify-around pt-6 pb-6 white-color">
                <div className="caret-violet-50 text-4xl italic font-extrabold">
                    <Link to='/'>LearnTUBE</Link>
                </div>
                <ul className='flex items-center'>
                {
                        ( channelAuthStatus || userAuthStatus) && (
                            <li>
                                <SearchBar/>
                            </li>
                        )
                    }
                    {
                        navItems.map((item) => 
                        item.active ? (
                            <li key={item.name} className="mr-6 text-2xl font-bold">
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