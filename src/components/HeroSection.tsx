import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import burgerHero from '@/assets/burger-hero.jpg';

interface HeroSectionProps {
  onOrderClick: () => void;
}

const HeroSection = ({ onOrderClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden bg-gradient-to-br from-fastfood-cream via-background to-fastfood-cream/50">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🍟</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🥤</div>
        <div className="absolute bottom-40 left-20 text-4xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🍔</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>🍦</div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
            >
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">#1 Fast Food in Town</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-foreground">Taste the</span>
              <br />
              <span className="text-gradient">Best Burgers</span>
              <br />
              <span className="text-foreground">in Town!</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              Fresh ingredients, mouth-watering recipes, and lightning-fast delivery. Your cravings deserve the best!
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onClick={onOrderClick}
                className="gradient-hero text-lg px-8 py-6 rounded-2xl shadow-button hover:shadow-card-hover transition-all duration-300"
              >
                Start Order
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 rounded-2xl border-2 border-primary/30 hover:border-primary hover:bg-primary/5"
              >
                View Menu
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center lg:justify-start gap-8 mt-12"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="w-px bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">4.9</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
              <div className="w-px bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-foreground">15min</div>
                <div className="text-sm text-muted-foreground">Delivery</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Burger Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-radial from-primary/30 via-transparent to-transparent blur-3xl scale-150"></div>
              
              {/* Main Image */}
              <motion.img
                src={burgerHero}
                alt="Delicious Burger"
                className="relative z-10 w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-3xl shadow-2xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Price Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
                className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-6 py-3 rounded-2xl shadow-lg"
              >
                <div className="text-sm font-medium">Starting at</div>
                <div className="text-2xl font-bold">$8.99</div>
              </motion.div>

              {/* Delivery Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="absolute -top-4 -right-4 bg-background shadow-card px-4 py-2 rounded-full flex items-center gap-2"
              >
                <span className="text-2xl">🚀</span>
                <span className="font-medium">Free Delivery</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
