import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MenuSection from '@/components/MenuSection';
import DealsSection from '@/components/DealsSection';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import DiscountPopup from '@/components/DiscountPopup';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === 'menu') {
      menuRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'deals') {
      document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection('menu');
  };

  const handleDiscountApply = () => {
    toast({
      title: "Discount Code Saved! 🎉",
      description: "Use code WELCOME20 at checkout for 20% off.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onCartClick={() => setCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
      
      <HeroSection onOrderClick={scrollToMenu} />
      
      <div ref={menuRef}>
        <MenuSection />
      </div>
      
      <DealsSection />
      
      <Footer />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      
      <DiscountPopup 
        onApply={handleDiscountApply}
        onClose={() => {}}
      />
    </div>
  );
};

export default Index;
