import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MenuItem } from '@/data/menuItems';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface FoodCardProps {
  item: MenuItem;
  index: number;
}

const FoodCard = ({ item, index }: FoodCardProps) => {
  const { addToCart, items } = useCart();
  const { toast } = useToast();
  const [showCheck, setShowCheck] = useState(false);
  
  const cartItem = items.find(i => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    
    setShowCheck(true);
    setTimeout(() => setShowCheck(false), 1000);
    
    toast({
      title: "Added to cart! 🎉",
      description: `${item.name} has been added to your order.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="overflow-hidden bg-card border-0 shadow-card hover:shadow-card-hover transition-shadow duration-300 rounded-2xl">
          <CardContent className="p-0">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-fastfood-cream">
              {/* Price Badge - Positioned on image */}
              <div className="absolute bottom-3 left-3 z-10 bg-accent text-accent-foreground px-4 py-2 rounded-xl shadow-lg">
                <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
              </div>
              
              {/* Popular Badge */}
              {item.popular && (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  🔥 Popular
                </div>
              )}
              
              <motion.img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
                
                {/* Animated Add Button */}
                <motion.div className="relative" whileTap={{ scale: 0.9 }}>
                  <Button
                    size="icon"
                    onClick={handleAddToCart}
                    className="gradient-hero h-12 w-12 rounded-xl shadow-button hover:shadow-card-hover transition-all relative overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {showCheck ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Check className="h-6 w-6" />
                        </motion.div>
                      ) : quantity > 0 ? (
                        <motion.span
                          key="quantity"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="text-lg font-bold"
                        >
                          {quantity}
                        </motion.span>
                      ) : (
                        <motion.div
                          key="plus"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Plus className="h-6 w-6" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default FoodCard;
