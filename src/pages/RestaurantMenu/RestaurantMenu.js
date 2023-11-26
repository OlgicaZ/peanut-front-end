import './RestaurantMenu.scss'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function RestaurantMenu() {

    const { id } = useParams();

    const [menuItems, setMenuItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);

    const [dairy, setDairy] = useState(false);
    const [gluten, setGluten] = useState(false);
    const [shellfish, setShellfish] = useState(false);
    const [treeNuts, setTreeNuts] = useState(false);
    const [peanuts, setPeanuts] = useState(false);
    const [fish, setFish] = useState(false);
    const [vegan, setVegan] = useState(false);
    const [vegetarian, setVegetarian] = useState(false);
    const [pescatarian, setPescatarian] = useState(false);

    const handleDairySelection = () => {
        const flag = !dairy;
        setDairy(flag);
    }

    const handleGlutenSelection = () => {
        const flag = !gluten;
        setGluten(flag);
    }

    const handleShellfishSelection = () => {
        const flag = !shellfish;
        setShellfish(flag);
    }

    const handleTreeNutsSelection = () => {
        const flag = !treeNuts;
        setTreeNuts(flag);
    }

    const handlePeanutsSelection = () => {
        const flag = !peanuts;
        setPeanuts(flag);
    }

    const handleFishSelection = () => {
        const flag = !fish;
        setFish(flag);
    }

    const handleVeganSelection = () => {
        const flag = !vegan;
        setVegan(flag);
    }

    const handleVegetarianSelection = () => {
        const flag = !vegetarian;
        setVegetarian(flag);
    }

    const handlePescatarianSelection = () => {
        const flag = !pescatarian;
        setPescatarian(flag);
    }

    const groupByCategory = (menuItems) => {
        return menuItems.reduce((groupedItems, item) => {
            if (!groupedItems[item.category]) {
                groupedItems[item.category] = [];
            }
            groupedItems[item.category].push(item);
            return groupedItems;
        }, {})
    }

    useState(() => {
        const fetchMenuItems = async () => {
            const response = await axios.get(`http://localhost:8080/api/restaurants/${id}/menu-items`);
            setMenuItems(response.data);
            setFilteredItems(response.data);
        }

        fetchMenuItems();
    }, [])

    if (!menuItems) {
        return <div>Loading!</div>
    }

    return (
        <main className='restaurant-menu'>
            <h1 className='section-header restaurant-menu__header'>{menuItems[0].restaurant_name}</h1>
            <section className='restaurant-menu__filters-container'>
                <section className='restaurant-menu__allergens-container'>
                    <div className='restaurant-menu__filter-name'>
                        <h2 className='section-subheader'>Allergens</h2>
                    </div>
                    <div className='restaurant-menu__subcontainer'>
                        <div className='restaurant-menu__allergens'>
                            <div className={`${(dairy) ? 'restaurant-menu__allergen_button--selected' : 'restaurant-menu__allergen_button'}`} onClick={handleDairySelection}>Dairy</div>
                            <div className={`${(gluten) ? 'restaurant-menu__allergen_button--selected' : 'restaurant-menu__allergen_button'}`} onClick={handleGlutenSelection}>Gluten</div>
                            <div className={`${(shellfish) ? 'restaurant-menu__allergen_button--selected' : 'restaurant-menu__allergen_button'}`} onClick={handleShellfishSelection}>Shellfish</div>
                        </div>
                        <div className='restaurant-menu__allergens'>
                            <div className={`${(treeNuts) ? 'restaurant-menu__allergen_button--selected' : 'restaurant-menu__allergen_button'}`} onClick={handleTreeNutsSelection}>Tree Nuts</div>
                            <div className={`${(peanuts) ? 'restaurant-menu__allergen_button--selected' : 'restaurant-menu__allergen_button'}`} onClick={handlePeanutsSelection}>Peanuts</div>
                            <div className={`${(fish) ? 'restaurant-menu__allergen_button--selected' : 'restaurant-menu__allergen_button'}`} onClick={handleFishSelection}>Fish</div>
                        </div>
                    </div>
                </section>
                <section className='restaurant-menu__restrictions-container'>
                    <div className='restaurant-menu__filter-name'>
                        <h2 className='section-subheader'>Dietary Restrictions</h2>
                    </div>
                    <div className='restaurant-menu__allergens subcontainer'>
                        <div className={`${(vegan) ? 'restaurant-menu__allergen_button--selected' : 'restaurant-menu__allergen_button'}`} onClick={handleVeganSelection}>Vegan</div>
                        <div className={`${(vegetarian) ? 'restaurant-menu__allergen_button--selected' : 'restaurant-menu__allergen_button'}`} onClick={handleVegetarianSelection}>Vegetarian</div>
                        <div className={`${(pescatarian) ? 'restaurant-menu__allergen_button--selected' : 'restaurant-menu__allergen_button'}`} onClick={handlePescatarianSelection}>Pescatarian</div>
                    </div>
                </section>
            </section>
            <section>
                <h2>Your Custom Menu</h2>
                {Object.entries(groupByCategory(menuItems)).map(([category, items]) => (
                    <div key={category}>
                        <h2>{category}</h2>
                        <ul>
                            {items.map(item => (
                                <li key={item.id}>
                                    <strong>{item.menu_item_name}</strong>: {item.description} - ${item.price}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

        </main>
    );
}

export default RestaurantMenu;