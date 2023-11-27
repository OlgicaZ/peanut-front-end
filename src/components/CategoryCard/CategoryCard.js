import MenuItemCard from '../MenuItemCard/MenuItemCard';
import './CategoryCard.scss';

function CategoryCard({ category, items }) {
    return (
        <div key={category} className='restaurant-menu__category-card'>
            <h2 className='restaurant-menu__category-heading'>{category}</h2>
            <ul className='restaurant-menu__category-list'>
                {
                    items.map(item => <MenuItemCard key={item.id} item={item} />)
                }
            </ul>
        </div>
    );
}

export default CategoryCard;