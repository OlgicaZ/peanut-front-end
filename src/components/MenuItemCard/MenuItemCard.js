import './MenuItemCard.scss';

function MenuItemCard({ item }) {
    return (
        <li key={item.id} className='restaurant-menu__menu-item-card'>
            <div className='restaurant-menu__details-container'>
                <h3 className='restaurant-menu__item-name'>{item.menu_item_name}</h3>
                <span className='restaurant-menu__item-description'>{item.description}</span>
            </div>
            <div className='restaurant-menu__price'>${item.price}</div>
        </li>
    )
}

export default MenuItemCard;