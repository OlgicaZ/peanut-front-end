import './RestaurantCard.scss'

function RestaurantCard( {restaurant} ) {

    const name = restaurant.restaurant_name;
    const description = restaurant.description;
    const imageUrl = restaurant.image_url;


    return (        
        <div className="restaurant-card">
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