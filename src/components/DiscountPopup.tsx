import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DiscountPopupProps {
  onApply: () => void;
  onClose: () => void;
}

const DiscountPopup = ({ onApply, onClose }: DiscountPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('discountPopupSeen');
      if (!hasSeenPopup) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleApply = () => {
    sessionStorage.setItem('discountPopupSeen', 'true');
    onApply();
    setIsVisible(false);
  };

  const handleClose = () => {
    sessionStorage.setItem('discountPopupSeen', 'true');
    onClose();
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md bg-background rounded-3xl overflow-hidden shadow-2xl">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header with Gradient */}
              <div className="gradient-hero p-8 text-center text-primary-foreground">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                  className="inline-block mb-4"
                >
                  <Gift className="w-16 h-16" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-2">Special Offer!</h2>
                <p className="text-primary-foreground/90">First-time order discount</p>
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-6 h-6 text-accent" />
                    <span className="text-6xl font-bold text-gradient">20%</span>
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-xl font-medium text-foreground">OFF YOUR ORDER</p>
                </div>

                <p className="text-muted-foreground mb-6">
                  Use code <span className="font-bold text-primary">WELCOME20</span> at checkout
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={handleApply}
                    className="w-full gradient-hero py-6 text-lg rounded-2xl shadow-button"
                  >
                    Apply Discount
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleClose}
                    className="w-full text-muted-foreground"
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DiscountPopup;
