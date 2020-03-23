import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Banner from '../components/Banner';
const Rooms = () => {
    return (
        <Hero hero="roomsHero">
            <Banner title="our rooms" subtitle="deluxe rooms starting at $322">
            <Link to="/" className="btn-primary">
                    return Home
            </Link>
        </Banner>
        </Hero>
    )
}
export  default Rooms;