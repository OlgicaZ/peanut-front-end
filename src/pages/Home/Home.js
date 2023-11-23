import './Home.scss';

import homeImg from './../../assets/images/picture1.png';

function Home() {
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