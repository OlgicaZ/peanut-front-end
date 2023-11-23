import './Restaurants.scss';

import { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';

function Restaurants() {

    const [restaurants, setRestaurants] = useState(null);

    useEffect(() => {

        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/restaurants');
                console.log(response.data);
                setRestaurants(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRestaurants();
    }, [])

    if (!restaurants) {
        return (
            <div>Loading</div>
        );
    }

    return (
        <main>
            <section>
                <RestaurantCard restaurant={restaurants[0]} />
            </section>
        </main>
    );
}

export default Restaurants;