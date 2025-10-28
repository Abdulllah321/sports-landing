"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/translation-context";
import { getClientTranslation } from "@/lib/client-translations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ShoppingCart,
  Search,
  Filter,
  Star,
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  X,
  CreditCard,
  CheckCircle,
  Package,
  Shirt,
  Watch,
  Loader2,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const { locale, setLocale } = useLanguage();
  const t = getClientTranslation(locale);

  // State for showing cart button in sticky tabs
  const [showStickyCart, setShowStickyCart] = useState(false);
  // State for search bar visibility
  const [showSearchBar, setShowSearchBar] = useState(false);
  // Scroll detection for header rounded-t-none
  useEffect(() => {
    const checkHeaderRounded = () => {
      const header = document.querySelector('header');
      if (header) {
        const hasRoundedNone = header.classList.contains('element-sticky');

        setShowStickyCart(hasRoundedNone);
      }
    };

    // Check on mount
    checkHeaderRounded();

    // Check on scroll
    window.addEventListener('scroll', checkHeaderRounded);
    
    // Check when DOM changes (for header class updates)
    const observer = new MutationObserver(checkHeaderRounded);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      window.removeEventListener('scroll', checkHeaderRounded);
      observer.disconnect();
    };
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("sports-store-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sports-store-cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(false);
    setIsPaymentOpen(true);
  };

  const handlePayment = () => {
    if (!paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv || !paymentForm.cardName) {
      alert("Please fill in all payment details");
      return;
    }
    setIsPaymentOpen(false);
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    setTimeout(() => {
      setIsConfirmOpen(false);
    setIsCartOpen(false);
      setCart([]);
      setCheckoutForm({ name: "", email: "", phone: "", address: "", city: "" });
      setPaymentForm({ cardNumber: "", expiryDate: "", cvv: "", cardName: "" });
      alert("Order placed successfully! You will receive an email confirmation shortly.");
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-16">
        <div className="absolute inset-0 bg-[url('/images/section-pattern.jpg')] opacity-5" />
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className={cn(
              "font-mono text-4xl font-extralight tracking-wide text-foreground md:text-6xl",
              locale === 'ar' && 'font-arabic-heading'
            )}>
              {t('store.hero.title')}
            </h1>
            <p className={cn(
              "mt-6 text-lg font-serif text-muted-foreground md:text-xl",
              locale === 'ar' && 'font-arabic-body'
            )}>
              {t('store.hero.description')}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={t('store.hero.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            {!showStickyCart&&  <motion.div layoutId="cart-button">
                <Button
                  onClick={() => setIsCartOpen(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 relative"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t('store.cart.title')} ({getTotalItems()})
                </Button>
              </motion.div>}
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className={"sticky z-40 w-full header-sticky-element " + (showSearchBar ? '!rounded-b-none' : '')}>
        <div className="container mx-auto px-6 py-4 relative w-full">
          {/* Left Side - Select Box and Search */}
          <div className="flex items-center gap-4 absolute top-1/2 left-6 -translate-y-1/2">
            {/* Select Box */}
            <AnimatePresence>
              {showStickyCart && (
                <motion.div
                  layoutId="select-box"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder={t('store.filters.sortBy')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">{t('store.filters.sortName')}</SelectItem>
                      <SelectItem value="price-low">{t('store.filters.sortPriceLow')}</SelectItem>
                      <SelectItem value="price-high">{t('store.filters.sortPriceHigh')}</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center ">
            <Button
              variant={selectedCategory === "all" ? "default" : "ghost"}
              onClick={() => setSelectedCategory("all")}
              size="sm"
              className={cn(
                "gap-2",
                selectedCategory !== "all" && "opacity-60"
              )}
            >
              <Package className="h-4 w-4" />
              <span className={cn(locale === 'ar' && 'font-arabic-body')}>
                {t('store.categories.allCategories')}
              </span>
            </Button>
            <Button
              variant={selectedCategory === "equipment" ? "default" : "ghost"}
              onClick={() => setSelectedCategory("equipment")}
              size="sm"
              className={cn(
                "gap-2",
                selectedCategory !== "equipment" && "opacity-60"
              )}
            >
              <Package className="h-4 w-4" />
              <span className={cn(locale === 'ar' && 'font-arabic-body')}>
                {t('store.categories.equipment')}
              </span>
            </Button>
            <Button
              variant={selectedCategory === "apparel" ? "default" : "ghost"}
              onClick={() => setSelectedCategory("apparel")}
              size="sm"
              className={cn(
                "gap-2",
                selectedCategory !== "apparel" && "opacity-60"
              )}
            >
              <Shirt className="h-4 w-4" />
              <span className={cn(locale === 'ar' && 'font-arabic-body')}>
                {t('store.categories.apparel')}
              </span>
            </Button>
            <Button
              variant={selectedCategory === "accessories" ? "default" : "ghost"}
              onClick={() => setSelectedCategory("accessories")}
              size="sm"
              className={cn(
                "gap-2",
                selectedCategory !== "accessories" && "opacity-60"
              )}
            >
              <Watch className="h-4 w-4" />
              <span className={cn(locale === 'ar' && 'font-arabic-body')}>
                {t('store.categories.accessories')}
              </span>
            </Button>
          </div>
          
          {/* Animated Search Bar */}
          <AnimatePresence>
            {showSearchBar && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25 
                }}
                className="absolute top-full left-0 right-0 border border-border/50 rounded-b-2xl shadow-lg p-4 z-50 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/70"
              >
                <div className="container mx-auto px-6">
                  <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder={t('store.hero.searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-12"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSearchBar(false)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
           <div className="absolute top-1/2 right-6 -translate-y-1/2 flex items-center gap-2 px-2"> 
           {/* Search Icon / Close Icon */}
           <AnimatePresence mode="wait">
              {showStickyCart && (
                <motion.div
                  key={showSearchBar ? "close" : "search"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSearchBar(!showSearchBar)}
                    className="h-9 w-9 p-0 shadow-none hover:bg-transparent"
                  >
                    {showSearchBar ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          {/* Animated Cart Button */}
          <AnimatePresence>
            {showStickyCart && (
              <motion.div
                layoutId="cart-button"

              >
                <Button
                  onClick={() => setIsCartOpen(true)}
                  variant="ghost"
                  className="h-9 w-9 p-0 shadow-none overflow-visible hover:bg-transparent"
                  >
                  <div className="relative">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    <span className="absolute w-4 h-4 -top-2 -right-2 bg-destructive text-white rounded-full flex items-center justify-center text-xs">
                      {getTotalItems()}
                    </span>
                  </div>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className={cn(
              "font-mono text-3xl font-extralight tracking-wide text-foreground",
              locale === 'ar' && 'font-arabic-heading'
            )}>
              {t('store.sections.all.title')}
            </h2>
            <p className={cn(
              "mt-2 font-serif text-muted-foreground",
              locale === 'ar' && 'font-arabic-body'
            )}>
              {t('store.sections.all.description')}
            </p>
          </div>
          {!showStickyCart&& <motion.div layoutId="select-box">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t('store.filters.sortBy')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">{t('store.filters.sortName')}</SelectItem>
                <SelectItem value="price-low">{t('store.filters.sortPriceLow')}</SelectItem>
                <SelectItem value="price-high">{t('store.filters.sortPriceHigh')}</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>}
            </div>

        {sortedProducts.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className={cn(
              "mt-4 text-lg font-mono font-extralight tracking-wide",
              locale === 'ar' && 'font-arabic-heading'
            )}>
              {t('store.empty.title')}
            </h3>
            <p className={cn(
              "font-serif text-muted-foreground",
              locale === 'ar' && 'font-arabic-body'
            )}>
              {t('store.empty.message')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product, index) => (
              <Card 
                  key={product.id}
                className="group !py-0 overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all duration-200 hover:shadow-lg"
              >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {product.badge && (
                        <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
                          {product.badge}
                        </Badge>
                      )}
                  <button
                    className="absolute right-3 top-3 rounded-full bg-background/90 p-2 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Add to favorites"
                      >
                        <Heart className="h-4 w-4" />
                  </button>
                    </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                        <div>
                      <h3 className={cn(
                        "font-mono font-extralight tracking-wide text-foreground text-sm",
                        locale === 'ar' && 'font-arabic-heading'
                      )}>
                            {product.name}
                          </h3>
                      <p className={cn(
                        "text-xs font-serif text-muted-foreground capitalize",
                        locale === 'ar' && 'font-arabic-body'
                      )}>
                            {product.category}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className={cn(
                          "text-xs text-muted-foreground",
                          locale === 'ar' && 'font-arabic-body'
                        )}>
                          {product.rating}
                            </span>
                          </div>
                      <span className={cn(
                        "text-sm font-bold text-primary",
                        locale === 'ar' && 'font-arabic-heading'
                      )}>
                            ${product.price}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            asChild
                        size="sm"
                        className="flex-1"
                        variant="outline"
                          >
                            <Link href={`/store/${product.id}`}>
                          {t('store.buttons.viewDetails')}
                            </Link>
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>
        )}
      </section>

      {/* Cart Dialog */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className={cn(
              "flex items-center gap-2",
              locale === 'ar' && 'font-arabic-heading'
            )}>
              <ShoppingCart className="h-5 w-5" />
              {t('store.cart.title')} ({getTotalItems()})
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {cart.length === 0 ? (
              <div className="py-8 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className={cn(
                  "mt-2 text-muted-foreground",
                  locale === 'ar' && 'font-arabic-body'
                )}>
                  {t('store.cart.empty')}
                </p>
              </div>
            ) : (
              <>
                <div className="max-h-96 space-y-3 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded-md">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className={cn(
                          "text-sm font-medium",
                          locale === 'ar' && 'font-arabic-body'
                        )}>
                          {item.name}
                        </h4>
                        <p className={cn(
                          "text-sm text-muted-foreground",
                          locale === 'ar' && 'font-arabic-body'
                        )}>
                          ${item.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className={cn(
                          "w-8 text-center text-sm",
                          locale === 'ar' && 'font-arabic-body'
                        )}>
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className={cn(
                    "flex justify-between text-lg font-semibold",
                    locale === 'ar' && 'font-arabic-heading'
                  )}>
                    <span>{t('store.cart.total')}</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="mt-4 w-full"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    {t('store.cart.checkout')}
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className={cn(
              "flex items-center gap-2",
              locale === 'ar' && 'font-arabic-heading'
            )}>
              <CreditCard className="h-5 w-5" />
              {t('store.checkout.title')}
            </DialogTitle>
            <DialogDescription className={cn(locale === 'ar' && 'font-arabic-body')}>
              {t('store.checkout.description')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className={cn(
                "text-sm font-medium",
                locale === 'ar' && 'font-arabic-body'
              )}>
                {t('store.checkout.name')}
              </label>
              <Input
                placeholder={t('store.checkout.namePlaceholder')}
                value={checkoutForm.name}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className={cn(
                "text-sm font-medium",
                locale === 'ar' && 'font-arabic-body'
              )}>
                {t('store.checkout.email')}
              </label>
              <Input
                type="email"
                placeholder={t('store.checkout.emailPlaceholder')}
                value={checkoutForm.email}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className={cn(
                "text-sm font-medium",
                locale === 'ar' && 'font-arabic-body'
              )}>
                {t('store.checkout.phone')}
              </label>
              <Input
                type="tel"
                placeholder={t('store.checkout.phonePlaceholder')}
                value={checkoutForm.phone}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className={cn(
                "text-sm font-medium",
                locale === 'ar' && 'font-arabic-body'
              )}>
                {t('store.address.address')}
              </label>
              <Input
                placeholder={t('store.address.addressPlaceholder')}
                value={checkoutForm.address}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
              />
              </div>

            <div className="space-y-2">
              <label className={cn(
                "text-sm font-medium",
                locale === 'ar' && 'font-arabic-body'
              )}>
                {t('store.address.city')}
              </label>
              <Input
                placeholder={t('store.address.cityPlaceholder')}
                value={checkoutForm.city}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsCheckoutOpen(false)}
                className="flex-1"
              >
                {t('store.buttons.cancel')}
              </Button>
              <Button
                onClick={handleCheckout}
                disabled={
                  !checkoutForm.name ||
                  !checkoutForm.email ||
                  !checkoutForm.phone ||
                  !checkoutForm.address ||
                  !checkoutForm.city
                }
                className="flex-1"
              >
                {t('store.buttons.continueToPayment')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className={cn(
              "flex items-center gap-2",
              locale === 'ar' && 'font-arabic-heading'
            )}>
              <CreditCard className="h-5 w-5" />
              {t('store.payment.title')}
            </DialogTitle>
            <DialogDescription className={cn(locale === 'ar' && 'font-arabic-body')}>
              {t('store.payment.description')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className={cn(
                "text-sm font-medium",
                locale === 'ar' && 'font-arabic-body'
              )}>
                {t('store.payment.cardNumber')}
              </label>
              <Input
                placeholder={t('store.payment.cardNumberPlaceholder')}
                value={paymentForm.cardNumber}
                onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                maxLength={19}
              />
            </div>

            <div className="space-y-2">
              <label className={cn(
                "text-sm font-medium",
                locale === 'ar' && 'font-arabic-body'
              )}>
                {t('store.payment.cardholderName')}
              </label>
              <Input
                placeholder={t('store.payment.cardholderPlaceholder')}
                value={paymentForm.cardName}
                onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={cn(
                  "text-sm font-medium",
                  locale === 'ar' && 'font-arabic-body'
                )}>
                  {t('store.payment.expiryDate')}
                </label>
                <Input
                  placeholder={t('store.payment.expiryPlaceholder')}
                  value={paymentForm.expiryDate}
                  onChange={(e) => setPaymentForm({ ...paymentForm, expiryDate: e.target.value })}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <label className={cn(
                  "text-sm font-medium",
                  locale === 'ar' && 'font-arabic-body'
                )}>
                  {t('store.payment.cvv')}
                </label>
                <Input
                  placeholder={t('store.payment.cvvPlaceholder')}
                  value={paymentForm.cvv}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                  maxLength={3}
                />
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className={cn(
                "flex items-center gap-2 text-sm text-muted-foreground",
                locale === 'ar' && 'font-arabic-body'
              )}>
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{t('store.payment.secure')}</span>
              </div>
              <p className={cn(
                "mt-1 text-xs text-muted-foreground",
                locale === 'ar' && 'font-arabic-body'
              )}>
                {t('store.payment.secureMessage')}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsPaymentOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="flex-1"
              >
                {t('store.buttons.back')}
              </Button>
              <Button
                onClick={handlePayment}
                className="flex-1"
              >
                {t('store.buttons.completePayment')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="max-w-md">
          <div className="text-center py-6">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
            <h3 className={cn(
              "text-lg font-semibold mb-2",
              locale === 'ar' && 'font-arabic-heading'
            )}>
              {t('store.buttons.processingOrder')}
            </h3>
            <p className={cn(
              "text-sm text-muted-foreground mb-4",
              locale === 'ar' && 'font-arabic-body'
            )}>
              {t('store.buttons.processingMessage')}
            </p>
            <Button
              onClick={handleConfirm}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t('store.buttons.completeOrder')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
