import './Restaurants.scss';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';

import { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMapComponent from '../../components/GoogleMapsComponent/GoogleMapsComponent';

function Restaurants() {

    const [restaurants, setRestaurants] = useState(null);
    const [addresses, setAddresses] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const restaurantsResponse = await axios.get('http://localhost:8080/api/restaurants');
                // console.log(restaurantsResponse.data);
                setRestaurants(restaurantsResponse.data)
            
                const addressesResponse = await axios.get('http://localhost:8080/api/restaurants/locations');
                // console.log(addressesResponse.data);
                setAddresses(addressesResponse.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    if (!restaurants || !addresses) {
        return (
            <div>Loading</div>
        );
    }

    return (
        <main>
            <section>
                <GoogleMapComponent addresses={addresses} />
            </section>
            <section>
                {
                    restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)
                }
            </section>
        </main>
    );
}

export default Restaurants;