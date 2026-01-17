import { motion } from 'framer-motion';
import { categories } from '@/data/menuItems';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-full font-medium text-base transition-all duration-200
            ${activeCategory === category.id
              ? 'gradient-hero text-primary-foreground shadow-button'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }
          `}
        >
          <span className="text-xl">{category.icon}</span>
          <span>{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;
