import './Home.scss';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/restaurants');
        }, 4000);
    }, [])

    return (
        <main className='home'>
            <div className='home__heading-container'>
                <h1 className='home__logo header'>Peanut</h1>
                <h1 className='home__slogan header--slogan'>Enjoy every bite</h1>
            </div>
            <div className='home__hero'></div>
        </main>
    );
}

export default Home;