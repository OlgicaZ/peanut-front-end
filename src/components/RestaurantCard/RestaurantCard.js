import './RestaurantCard.scss';

import { useNavigate } from 'react-router-dom';

function RestaurantCard( {restaurant} ) {

    const id = restaurant.id;
    const name = restaurant.restaurant_name;
    const description = restaurant.description;
    const imageUrl = restaurant.image_url;

    const navigate = useNavigate();

    const handleRestaurantSelection = () => {
        navigate(`/restaurant-details/${id}`);
    }

    return (        
        <div className="restaurant-card" onClick={handleRestaurantSelection}>
            <div className="restaurant-card__image-container">
                <img className="restaurant-card__image" src={imageUrl}  alt={name} />
            </div>
            <div className="restaurant-card__description-container">
                <h3 className="restaurant-card__header section-header">{name}</h3>
                <p className="section-body">{description}</p>
            </div>
        </div>
    );
}

export default RestaurantCard;