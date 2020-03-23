import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
const Home = () => {
    return (
        <Hero>
            <Banner title="luxurious rooms" subtitle="deluxe rooms starting at $322">
                <Link to="/rooms" className="btn-primary">
                    Our Rooms
                </Link>
            </Banner>
        </Hero>
    )
}
export default Home;