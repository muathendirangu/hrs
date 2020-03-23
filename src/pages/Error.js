import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Barner from '../components/Barner';
 const Error = () => {
    return (
        <Hero>
            <Barner title="404" subtitle="page not found">
                <Link to="/" className="btn-primary">
                    return home
                </Link>
            </Barner>
        </Hero>
    )
}
export default Error;