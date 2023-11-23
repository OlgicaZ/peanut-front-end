import './Home.scss';

import homeImg from './../../assets/images/picture1.png';

function Home() {
    return (
        <>
        <h1>Peanut</h1>
        <h2>Enjoy your meal</h2>
        
        <img src={homeImg} />
        </>
    );
}

export default Home;