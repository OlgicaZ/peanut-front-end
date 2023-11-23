import './RestaurantCard.scss'

function RestaurantCard( {restaurant} ) {

    const name = 'Pao by Paul Qui'
    const description = 'A Filipino inspired restaurant blending bold flavors accross different continents.'
    const imageUrl = 'https://thefoodiephysician.com/wp-content/uploads/2023/02/fullsizeoutput_327c.jpeg';


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