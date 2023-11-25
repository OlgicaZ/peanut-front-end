import './Restaurants.scss';

import { ReactComponent as DropDownIcon } from './../../assets/icons/arrow_drop_down_black_24dp.svg';
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

    let isOpen = false;

    const toggleOpenButton = () => {
        
    }

    const handleOpenButton = () => {
        setIsRestaurantOpen(!isRestaurantOpen);

        // const dayOfTheWeek = new Date().getDay();

        // if (isRestaurantOpen) {
        //     const fetchOpenRestaurants = async () => {
        //         try {
        //             const response = await axios.get('http://localhost:8080/api/restaurants/business-hours', { day: dayOfTheWeek });

        //             const openRestaurants = response.data.filter((restaurant) => isCurrentTimeInRange(restaurant.open_time, restaurant.close_time));

        //             console.log(openRestaurants);
        //         } catch (error) {
                    
        //         }
        //     }

        //     fetchOpenRestaurants();
        // } else {
        //     setFilteredRestaurants(restaurants);
        // }
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

        if (restaurants) {
            const filtered = restaurants.filter((restaurant) => restaurant.cuisine === selectedCategory);
            setFilteredRestaurants(filtered);
        }

    }, [selectedCategory]);

    useEffect(() => {

        if (isRestaurantOpen) {
            const dayOfTheWeek = new Date().getDay();

            const fetchOpenRestaurants = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/api/restaurants/business-hours', { params: {day : dayOfTheWeek}});
                
                    const openRestaurants = response.data.filter((restaurant) => isCurrentTimeInRange(restaurant.open_time, restaurant.close_time));

                    console.log(openRestaurants);
                } catch (error) {
                    console.error(error);
                }
            }

            fetchOpenRestaurants();
        }
    }, [isRestaurantOpen]);

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