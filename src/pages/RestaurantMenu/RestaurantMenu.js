import './RestaurantMenu.scss'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { ReactComponent as BackIcon } from './../../assets/icons/arrow_back_black_24dp.svg';


function RestaurantMenu() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [menuItems, setMenuItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);
    // const [adjustedItems, setAdjustedItems] = useState(null);


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

    const handleFilter = async () => {
        const filterParams = {
            dairy,
            gluten,
            shellfish,
            treeNuts,
            peanuts,
            fish,
            vegan,
            vegetarian,
            pescatarian,
        };

        if (!dairy && !gluten && !shellfish && !treeNuts && !peanuts && !fish && !vegan && !vegetarian && !pescatarian) {
            setFilteredItems(menuItems)
            return;
        }

        const filteredParams = Object.keys(filterParams)
            .filter((key) => filterParams[key])
            .map((key) => `${key}=${filterParams[key]}`)
            .join('&');

        try {
            const response = await axios.get(`http://localhost:8080/api/restaurants/${id}/allergens?${filteredParams}`);

            let menuItems = response.data;

            console.table(response.data);

            setFilteredItems(menuItems);
        } catch (error) {
            console.error(error);
        }
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

    const handleBackNavigation = () => {
        navigate(-1);
    }

    useEffect(() => {
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
            <section className='restaurant-menu__header-container'>
                <div className='restaurant-menu__back-button-container'>
                    <BackIcon className='restaurant-menu__back-icon' onClick={handleBackNavigation} />
                </div>
                <h1 className='section-header restaurant-menu__header'>{menuItems[0].restaurant_name}</h1>
                <section className='restaurant-menu__filters-container'>
                    <section className='restaurant-menu__allergens-container'>
                        <div className='restaurant-menu__filter-name'>
                            <h2 className='section-subheader white'>Allergens</h2>
                        </div>
                        <div className='restaurant-menu__subcontainer'>
                            <div className='restaurant-menu__allergens'>
                                <div className={`${(dairy) ? 'restaurant-menu__allergen_button selected' : 'restaurant-menu__allergen_button'}`} onClick={handleDairySelection}>Dairy</div>
                                <div className={`${(gluten) ? 'restaurant-menu__allergen_button selected' : 'restaurant-menu__allergen_button'}`} onClick={handleGlutenSelection}>Gluten</div>
                                <div className={`${(shellfish) ? 'restaurant-menu__allergen_button selected' : 'restaurant-menu__allergen_button'}`} onClick={handleShellfishSelection}>Shellfish</div>
                            </div>
                            <div className='restaurant-menu__allergens'>
                                <div className={`${(treeNuts) ? 'restaurant-menu__allergen_button selected' : 'restaurant-menu__allergen_button'}`} onClick={handleTreeNutsSelection}>Tree Nuts</div>
                                <div className={`${(peanuts) ? 'restaurant-menu__allergen_button selected' : 'restaurant-menu__allergen_button'}`} onClick={handlePeanutsSelection}>Peanuts</div>
                                <div className={`${(fish) ? 'restaurant-menu__allergen_button selected' : 'restaurant-menu__allergen_button'}`} onClick={handleFishSelection}>Fish</div>
                            </div>
                        </div>
                    </section>
                    <section className='restaurant-menu__restrictions-container'>
                        <div className='restaurant-menu__filter-name'>
                            <h2 className='section-subheader white'>Dietary Restrictions</h2>
                        </div>
                        <div className='restaurant-menu__allergens subcontainer'>
                            <div className={`${(vegan) ? 'restaurant-menu__allergen_button selected' : 'restaurant-menu__allergen_button'}`} onClick={handleVeganSelection}>Vegan</div>
                            <div className={`${(vegetarian) ? 'restaurant-menu__allergen_button selected' : 'restaurant-menu__allergen_button'}`} onClick={handleVegetarianSelection}>Vegetarian</div>
                            <div className={`${(pescatarian) ? 'restaurant-menu__allergen_button selected' : 'restaurant-menu__allergen_button'}`} onClick={handlePescatarianSelection}>Pescatarian</div>
                        </div>
                    </section>
                    <section className='restaurant-menu__filter-button-container'>
                        <div className='restaurant-menu__filter-button button--secondary' onClick={handleFilter}>Apply</div>
                    </section>
                </section>
            </section>
            <section className='restaurant-menu__custom-menu'>
                <h2 className='restaurant-menu__custom-menu-heading'>Your Custom Menu</h2>
                {
                    (filteredItems.length > 0) ? (
                        Object.entries(groupByCategory(filteredItems)).map(([category, items]) => <CategoryCard key={category} category={category} items={items} />)
                    ) : (<div className='restaurant-menu__error-message'>The restaurant cannot accomodate the provided allergies and/or dietary restrictions</div>)

                }
            </section>

        </main>
    );
}

export default RestaurantMenu;