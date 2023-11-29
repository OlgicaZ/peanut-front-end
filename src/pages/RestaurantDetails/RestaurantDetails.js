import './RestaurantDetails.scss';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { mapDay, mapTime } from '../../utils/utils';

import { ReactComponent as BackIcon } from './../../assets/icons/arrow_back_black_24dp.svg'; 


function RestaurantDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    const [businessHours, setBusinessHours] = useState(null);
    // const [isSelected, setIsSelected] = useState(false);

    const handleSelection = () => {
        navigate(`/restaurant-menu/${id}`)
    }

    const handleBackNavigation = () => {
        navigate('/restaurants');
        window.location.reload();
    }

    useEffect(() => {

        const fetchRestaurant = async () => {
            try {
                const restaurantDetails = await axios.get(`http://localhost:8080/api/restaurants/${id}`);
                setCurrentRestaurant(restaurantDetails.data[0]);

                const businessHours = await axios.get(`http://localhost:8080/api/restaurants/${id}/business-hours`);
                setBusinessHours(businessHours.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchRestaurant();
    }, []);

    if (!currentRestaurant || !businessHours) {
        return <div>Loading!</div>
    }

    return (
        <main className='restaurant-details'>
            <div className='restaurant-details__hero'>
                <div className='restaurant-details__back-button-container'>
                    <BackIcon className='restaurant-details__back-icon' onClick={handleBackNavigation} />
                </div>
                <img className='restaurant-details__image' src={currentRestaurant.image_url} alt={currentRestaurant.description} />
            </div>
            <div className='restaurant-details__info-container'>
                <section className='restaurant-details__header-container'>
                    <div className='restaurant-details__header'>
                        <h1 className='restaurant-details__name section-header'>{currentRestaurant.restaurant_name}</h1>
                        <h2 className='restaurant-details__cuisine section-subheader'>{currentRestaurant.cuisine} Restaurant</h2>
                    </div>
                    <div className='button--secondary' onClick={handleSelection}>View Menu</div>
                </section>
                <section className='restaurant-details__about-container'>
                    <h2 className='section-subheader'>About</h2>
                    <p className='restaurant-details__about-content'>{currentRestaurant.about}</p>
                </section>
                <section className='restaurant-details__business-hours-container'>
                    <h2 className='section-subheader'>Hours of Operation</h2>
                    <ul className='restaurant-details__list'>
                        {
                            businessHours.map((day) => <li key={day.id} className='restaurant-details__list-item'>{mapDay(day.day)} : {day.open_time} {mapTime(day.open_time)} - {day.close_time} {mapTime(day.close_time)}</li>)
                        }
                    </ul>
                </section>
            </div>
        </main>
    );
}

export default RestaurantDetails