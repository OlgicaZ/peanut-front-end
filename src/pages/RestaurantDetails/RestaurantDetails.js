import './RestaurantDetails.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { mapDay, mapTime } from '../../utils/utils';

function RestaurantDetails() {
    const { id } = useParams();

    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    const [businessHours, setBusinessHours] = useState(null);

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
        <main>
            <div>
                <img src={currentRestaurant.image_url} alt={currentRestaurant.description} />
            </div>
            <div>
                <section>
                    <div>
                        <h1>{currentRestaurant.restaurant_name}</h1>
                        <h2>{currentRestaurant.cuisine} Restaurant</h2>
                    </div>
                    <div>View Menu</div>
                </section>
                <section>
                    <h2>About</h2>
                    <p>{currentRestaurant.about}</p>
                </section>
                <section>
                    <h2>Work Hours</h2>
                    <ul>
                        {
                            businessHours.map((day) => <li>{mapDay(day.day)} : {day.open_time} {mapTime(day.open_time)} - {day.close_time} {mapTime(day.close_time)}</li>)
                        }
                    </ul>
                </section>
            </div>
        </main>
    );
}

export default RestaurantDetails