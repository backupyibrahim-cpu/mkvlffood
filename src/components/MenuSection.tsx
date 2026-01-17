import { useState } from 'react';
import { motion } from 'framer-motion';
import CategoryFilter from './CategoryFilter';
import FoodCard from './FoodCard';
import { menuItems } from '@/data/menuItems';

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Delicious</span> Menu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From juicy burgers to crispy fries, we've got everything to satisfy your cravings
          </p>
        </motion.div>

        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, index) => (
            <FoodCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;
