import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Clock, Check, Tag, Trash2, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe
// Replace with your actual publishable key from Stripe Dashboard
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_TYooMQauvdEDq54NiTphI7jx");

const CheckoutContent = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();

  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const discountAmount = discountApplied ? totalPrice * 0.2 : 0;
  const deliveryFee = 0;
  const finalTotal = totalPrice - discountAmount + deliveryFee;

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === 'WELCOME20') {
      setDiscountApplied(true);
      toast({
        title: "Discount Applied! 🎉",
        description: "20% off has been applied to your order.",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid discount code.",
        variant: "destructive",
      });
    }
  };

  // Add new state for visible error
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Clear previous errors

    if (items.length === 0) {
      setErrorMessage("Your cart is empty. Please add items first.");
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart first.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.phone || !formData.address) {
      setErrorMessage("Please fill in all delivery details (Name, Phone, Address).");
      toast({
        title: "Missing Details",
        description: "Please fill in all delivery details.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      if (paymentMethod === 'card') {
        if (!stripe || !elements) {
          console.warn("Stripe not initialized");
          // Don't throw here for demo purposes, just log
        }

        const cardElement = elements?.getElement(CardElement);
        if (cardElement) {
          const { error, paymentMethod: stripePaymentMethod } = await stripe!.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
              name: formData.name,
              phone: formData.phone,
              address: {
                line1: formData.address
              }
            }
          });

          if (error) {
            throw error;
          }
          console.log('[PaymentMethod]', stripePaymentMethod);
        }
      }

      // Simulate network request / backend processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
      toast({
        title: "Order Placed! 🚀",
        description: "Your delicious food is on the way.",
      });
    } catch (err: any) {
      setIsProcessing(false);
      console.error(err);
      setErrorMessage(err.message || "Payment failed. Please check your card details.");
      toast({
        title: "Payment Issue",
        description: err.message || "Please check your card details.",
        variant: "destructive"
      });
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 mx-auto mb-6 rounded-full gradient-hero flex items-center justify-center"
          >
            <Check className="w-12 h-12 text-primary-foreground" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed! 🎉</h1>
          <p className="text-muted-foreground mb-2">Your order has been placed successfully.</p>
          <p className="text-lg font-medium text-primary mb-8">
            Estimated delivery: 15-25 minutes
          </p>
          <div className="bg-muted rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5" />
              <span>Order #MK{Math.floor(Math.random() * 10000)}</span>
            </div>
          </div>
          <Button
            onClick={() => navigate('/')}
            className="gradient-hero px-8 py-6 rounded-2xl text-lg"
          >
            Back to Menu
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fastfood-cream">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="rounded-2xl border-0 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h2 className="text-xl font-bold">Delivery Details</h2>
                  </div>

                  {errorMessage && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-2">
                      <span className="text-xl">⚠️</span>
                      <p className="font-medium">{errorMessage}</p>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="rounded-xl py-5"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="(555) 123-4567"
                        className="rounded-xl py-5"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <Label htmlFor="address">Delivery Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street, Apt 4B, City"
                        className="rounded-xl py-5"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="rounded-2xl border-0 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h2 className="text-xl font-bold">Payment Method</h2>
                  </div>

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    <div className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 ml-3 cursor-pointer">
                        <span className="font-medium">Credit/Debit Card</span>
                      </Label>
                      <span className="text-2xl">💳</span>
                    </div>
                    <div className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 ml-3 cursor-pointer">
                        <span className="font-medium">Cash on Delivery</span>
                      </Label>
                      <span className="text-2xl">💵</span>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 space-y-4"
                    >
                      <div className="p-4 border rounded-xl bg-white">
                        <CardElement options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#424770',
                              '::placeholder': { color: '#aab7c4' },
                            },
                          },
                          hidePostalCode: true
                        }} />
                      </div>
                      <p className='text-xs text-muted-foreground'>Secured by Stripe</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl border-0 shadow-card sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                  {items.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Your cart is empty
                    </p>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-primary font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-md bg-muted flex items-center justify-center hover:bg-muted/80"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-md bg-muted flex items-center justify-center hover:bg-muted/80"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <Separator className="my-4" />

                {/* Discount Code */}
                <div className="mb-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Discount code"
                        className="pl-10 rounded-xl"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        disabled={discountApplied}
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleApplyDiscount}
                      disabled={discountApplied}
                      className="rounded-xl"
                    >
                      {discountApplied ? <Check className="w-4 h-4" /> : 'Apply'}
                    </Button>
                  </div>
                  {discountApplied && (
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      20% discount applied!
                    </p>
                  )}
                </div>

                <Separator className="my-4" />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (20%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing || items.length === 0}
                  className="w-full mt-6 gradient-hero py-6 text-lg rounded-2xl shadow-button"
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                  ) : (
                    `Place Order · $${finalTotal.toFixed(2)}`
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  By placing this order, you agree to our Terms of Service
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutContent />
    </Elements>
  )
}

export default Checkout;
