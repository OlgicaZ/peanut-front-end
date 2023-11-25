import './RestaurantMenu.scss'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function RestaurantMenu() {

    const { id } = useParams();

    const [menuItems, setMenuItems] = useState(null);

    useState(() => {
        const fetchMenuItems = async () => {
            const response = await axios.get(`http://localhost:8080/api/restaurants/${id}/menu-items`);
            setMenuItems(response.data);
        }

        fetchMenuItems();
    }, [])

    if (!menuItems) {
        return <div>Loading!</div>
    }

    return (
        <main>
            <h1>{menuItems[0].restaurant_name}</h1>
            <section>
                <section>
                    <div>
                        <h2>Allergens</h2>
                    </div>
                    <div>
                        <div>Diary</div>
                        <div>Gluten</div>
                        <div>Shellfish</div>
                    </div>
                    <div>
                        <div>Tree Nuts</div>
                        <div>Peanuts</div>
                        <div>Fish</div>
                    </div>
                </section>
                <section>
                    <div>
                        <h2>Dietary Restrictions</h2>
                    </div>
                    <div>
                        <div>Vegan</div>
                        <div>Vegetarian</div>
                        <div>Pescatarian</div>
                    </div>
                </section>
            </section>
        </main>
    );
}

export default RestaurantMenu;