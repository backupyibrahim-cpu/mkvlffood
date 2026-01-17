import burgerHero from '@/assets/burger-hero.jpg';
import fries from '@/assets/fries.jpg';
import cola from '@/assets/cola.jpg';
import sundae from '@/assets/sundae.jpg';
import nuggets from '@/assets/nuggets.jpg';
import doubleBurger from '@/assets/double-burger.jpg';
import milkshake from '@/assets/milkshake.jpg';
import onionRings from '@/assets/onion-rings.jpg';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'burgers' | 'sides' | 'drinks' | 'desserts';
  popular?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with melted cheese, lettuce, tomato & our special sauce',
    price: 8.99,
    image: burgerHero,
    category: 'burgers',
    popular: true,
  },
  {
    id: '2',
    name: 'Double Bacon Burger',
    description: 'Two beef patties, crispy bacon, cheddar cheese & pickles',
    price: 12.99,
    image: doubleBurger,
    category: 'burgers',
    popular: true,
  },
  {
    id: '3',
    name: 'Crispy Fries',
    description: 'Golden, crispy fries with our signature seasoning',
    price: 3.99,
    image: fries,
    category: 'sides',
  },
  {
    id: '4',
    name: 'Onion Rings',
    description: 'Crispy battered onion rings served with dipping sauce',
    price: 4.99,
    image: onionRings,
    category: 'sides',
  },
  {
    id: '5',
    name: 'Chicken Nuggets',
    description: '8 pieces of crispy, tender chicken nuggets',
    price: 6.99,
    image: nuggets,
    category: 'sides',
    popular: true,
  },
  {
    id: '6',
    name: 'Classic Cola',
    description: 'Refreshing cola with ice',
    price: 2.49,
    image: cola,
    category: 'drinks',
  },
  {
    id: '7',
    name: 'Vanilla Milkshake',
    description: 'Creamy vanilla milkshake topped with whipped cream',
    price: 4.99,
    image: milkshake,
    category: 'drinks',
    popular: true,
  },
  {
    id: '8',
    name: 'Chocolate Sundae',
    description: 'Rich chocolate ice cream with hot fudge & cherry on top',
    price: 5.49,
    image: sundae,
    category: 'desserts',
  },
];

export const categories = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'sides', name: 'Sides', icon: '🍟' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
  { id: 'desserts', name: 'Desserts', icon: '🍨' },
];
