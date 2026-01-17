import { motion } from 'framer-motion';
import { Clock, Percent, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const deals = [
  {
    id: 1,
    title: 'Family Bundle',
    description: '4 Burgers + 4 Fries + 4 Drinks',
    originalPrice: 59.99,
    discountPrice: 44.99,
    discount: 25,
    icon: '👨‍👩‍👧‍👦',
    color: 'from-primary to-secondary',
  },
  {
    id: 2,
    title: 'Lunch Special',
    description: 'Burger + Fries + Drink (11AM-3PM)',
    originalPrice: 15.99,
    discountPrice: 11.99,
    discount: 25,
    icon: '☀️',
    color: 'from-secondary to-accent',
  },
  {
    id: 3,
    title: 'Weekend Feast',
    description: '2 Double Burgers + Nuggets + 2 Milkshakes',
    originalPrice: 39.99,
    discountPrice: 29.99,
    discount: 25,
    icon: '🎉',
    color: 'from-accent to-primary',
  },
];

const DealsSection = () => {
  return (
    <section id="deals" className="py-20 bg-fastfood-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Flame className="w-4 h-4" />
            <span className="font-medium">Hot Deals</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Today's <span className="text-gradient">Special Offers</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Limited time offers you don't want to miss!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden border-0 shadow-card hover:shadow-card-hover rounded-2xl">
                  <CardContent className="p-0">
                    {/* Header with gradient */}
                    <div className={`bg-gradient-to-r ${deal.color} p-6 text-primary-foreground`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-5xl">{deal.icon}</span>
                        <div className="bg-primary-foreground/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                          <Percent className="w-4 h-4" />
                          <span className="font-bold">{deal.discount}% OFF</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{deal.title}</h3>
                      <p className="opacity-90">{deal.description}</p>
                    </div>

                    {/* Pricing */}
                    <div className="p-6 bg-card">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl font-bold text-primary">
                          ${deal.discountPrice.toFixed(2)}
                        </span>
                        <span className="text-lg text-muted-foreground line-through">
                          ${deal.originalPrice.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                        <Clock className="w-4 h-4" />
                        <span>Limited time offer</span>
                      </div>

                      <Button className="w-full gradient-hero rounded-xl py-6 text-lg shadow-button">
                        Order Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
