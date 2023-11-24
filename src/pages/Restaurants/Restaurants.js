import './Restaurants.scss';

import { ReactComponent as DropDownIcon } from './../../assets/icons/arrow_drop_down_black_24dp.svg';
import GoogleMapComponent from '../../components/GoogleMapsComponent/GoogleMapsComponent';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';

import { useState, useEffect } from 'react';
import axios from 'axios';

function Restaurants() {

    const categoryOptions = ['Japanese', 'Indian', 'American', 'Mexican', 'Italian', 'Vegetarian/Vegan', 'Mediterranean'];

    const [restaurants, setRestaurants] = useState(null);
    const [addresses, setAddresses] = useState(null);

    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Select Category');

    const toggleCategoryDropdown = () => {
        setIsCategoryOpen(!isCategoryOpen);
    }

    const handleCategoryDropDown = (option) => {
        setSelectedCategory(option);
        setIsCategoryOpen(false);
    }

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
        <main className='restaurants'>
            <section className='restaurants__map-container'>
                <GoogleMapComponent addresses={addresses} />
            </section>
            <section className='restaurants__filters-container'>
                <h3 className='section-subheader'>Filter:</h3>
                <div className='restaurants__categories-container' onClick={toggleCategoryDropdown}>
                    <div className='restaurants__selected-option'>
                        {selectedCategory}
                        <DropDownIcon className='restaurants__drop-down-icon' alt='A black down arrow on a white background' />
                    </div>
                    {
                        isCategoryOpen && (
                            <ul className='restaurants__categories-list'>
                                {
                                    categoryOptions.map((option) => {
                                        return <li
                                            key={option}
                                            className='restaurants__category-option'
                                            onClick={() => handleCategoryDropDown(option)}>
                                            {option}
                                        </li>
                                    })
                                }
                            </ul>
                        )
                    }
                </div>
                <div className='button'>
                    Open Now
                </div>
            </section >
            <section className='restaurants__card-container'>
                {
                    restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)
                }
            </section>
        </main >
    );
}

export default Restaurants;