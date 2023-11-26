import MenuItemCard from '../MenuItemCard/MenuItemCard';
import './CategoryCard.scss';

function CategoryCard({ category, items }) {
    return (
        <div key={category}>
            <h2>{category}</h2>
            <ul>
                {items.map(item => <MenuItemCard item={item} />)}
            </ul>
        </div>
    );
}

export default CategoryCard;