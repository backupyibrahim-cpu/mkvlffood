import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col bg-background">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2 text-2xl">
            <ShoppingBag className="w-6 h-6 text-primary" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-8xl"
            >
              🛒
            </motion.div>
            <p className="text-xl text-muted-foreground">Your cart is empty</p>
            <Button onClick={onClose} className="gradient-hero rounded-xl">
              Browse Menu
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 p-4 bg-muted rounded-2xl"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground">{item.name}</h4>
                      <p className="text-lg font-bold text-primary mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-lg"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-lg w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-lg"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg text-muted-foreground">Subtotal</span>
                <span className="text-lg font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg text-muted-foreground">Delivery</span>
                <span className="text-lg font-medium text-green-600">Free</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
              </div>

              <Button 
                onClick={handleCheckout}
                className="w-full gradient-hero py-6 text-lg rounded-2xl shadow-button"
              >
                Checkout
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
