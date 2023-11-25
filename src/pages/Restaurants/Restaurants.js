import './Restaurants.scss';

import { ReactComponent as DropDownIcon } from './../../assets/icons/arrow_drop_down_black_24dp.svg';
import { ReactComponent as CloseIcon } from './../../assets/icons/close_black_24dp.svg';

import GoogleMapComponent from '../../components/GoogleMapsComponent/GoogleMapsComponent';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';

import { useState, useEffect } from 'react';
import axios from 'axios';

function Restaurants() {

    const categoryOptions = ['Japanese', 'Indian', 'American', 'Mexican', 'Italian', 'Vegetarian/Vegan', 'Mediterranean'];

    const [restaurants, setRestaurants] = useState(null);
    const [filteredRestaurants, setFilteredRestaurants] = useState(null);
    const [addresses, setAddresses] = useState(null);

    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Select Category');

    const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);

    const handleOpenButton = () => {
        setIsRestaurantOpen(!isRestaurantOpen);
    }

    const toggleCategoryDropdown = () => {
        setIsCategoryOpen(!isCategoryOpen);
    }

    const handleCategoryDropDown = (option) => {
        setSelectedCategory(option);
        setIsCategoryOpen(false);
    }

    const isCurrentTimeInRange = (startTime, endTime) => {
        const now = new Date();
        const start = new Date();
        let end = new Date();

        const [startHours, startMinutes, startSeconds] = startTime.split(':').map(Number);
        const [endHours, endMinutes, endSeconds] = endTime.split(':').map(Number);

        start.setHours(startHours, startMinutes, startSeconds);
        end.setHours(endHours, endMinutes, endSeconds);

        if (end < start) {
            end.setDate(end.getDate() + 1);
        }

        return now >= start && now <= end;
    }

    const clearFilters = () => {
        setSelectedCategory('Select Category');
        setIsRestaurantOpen(false);
    }

    const applyFilters = async () => {
        if (isRestaurantOpen && selectedCategory !== 'Select Category') {
            try {
                const dayOfTheWeek = new Date().getDay();

                const response = await axios.get('http://localhost:8080/api/restaurants/business-hours', {
                    params: { day: dayOfTheWeek },
                });

                const openRestaurants = response.data.filter((restaurant) => isCurrentTimeInRange(restaurant.open_time, restaurant.close_time));

                const doubleFiltered = openRestaurants.filter((restaurant) => restaurant.cuisine === selectedCategory);

                setFilteredRestaurants(doubleFiltered);
            } catch (error) {
                console.error(error);
            }
        } else if (isRestaurantOpen) {
            try {
                const dayOfTheWeek = new Date().getDay();

                const response = await axios.get('http://localhost:8080/api/restaurants/business-hours', {
                    params: { day: dayOfTheWeek },
                });

                const openRestaurants = response.data.filter((restaurant) => isCurrentTimeInRange(restaurant.open_time, restaurant.close_time));

                setFilteredRestaurants(openRestaurants)
            } catch (error) {
                console.error(error);
            }
        } else if (selectedCategory !== 'Select Category') {
            const categoryFiltered = restaurants.filter((restaurant) => restaurant.cuisine === selectedCategory);

            setFilteredRestaurants(categoryFiltered);
        } else {
            setFilteredRestaurants(restaurants);
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const restaurantsResponse = await axios.get('http://localhost:8080/api/restaurants');
                // console.log(restaurantsResponse.data);
                setRestaurants(restaurantsResponse.data);
                setFilteredRestaurants(restaurantsResponse.data);

                const addressesResponse = await axios.get('http://localhost:8080/api/restaurants/locations');
                // console.log(addressesResponse.data);
                setAddresses(addressesResponse.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [isRestaurantOpen, selectedCategory, restaurants]);

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
                <div
                    className={`${(isRestaurantOpen) ? 'button--selected' : 'button'}`}
                    onClick={handleOpenButton}
                >
                    Open Now
                </div>
                <CloseIcon className='restaurants__close_icon' onClick={clearFilters}/>
            </section >
            <section className='restaurants__card-container'>
                {
                    filteredRestaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)
                }
            </section>
        </main >
    );
}

export default Restaurants;