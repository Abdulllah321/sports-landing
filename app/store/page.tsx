"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
  DialogTrigger,
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
  Mail,
  Phone,
  User,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";

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
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

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
    // In a real app, this would integrate with a payment processor
    // For now, we'll just show a success message
    alert(
      "Checkout requires payment integration — invoice will be sent to your email"
    );
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20"
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-20"
      >
        <div className="absolute inset-0 bg-[url('/images/section-pattern.jpg')] opacity-5" />
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30, x: -50 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-mono text-4xl font-extralight tracking-wide text-foreground md:text-6xl"
            >
              Sports Store
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30, x: 50 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-6 text-lg font-serif text-muted-foreground md:text-xl"
            >
              Premium gear for athletes, coaches, and sports enthusiasts.
              Discover equipment that elevates your game.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Cart ({getTotalItems()})
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Filters */}
      <motion.section
        initial={{ opacity: 0, y: 30, x: -100 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="border-b bg-background/50 backdrop-blur-sm sticky top-[64.5px] z-40 w-full border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70"
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="apparel">Apparel</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>
      </motion.section>

      {/* Featured Items Section */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50, x: -200 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-mono text-3xl font-extralight tracking-wide text-foreground">
                Featured Items
              </h2>
              <p className="mt-2 font-serif text-muted-foreground">
                Handpicked products for the best performance
              </p>
            </div>
            <Badge className="bg-secondary text-secondary-foreground px-4 py-2">
              Premium
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.filter((p) => p.badge === "New" || p.rating >= 4.8).map(
              (product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30, x: -50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 pt-0">
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
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-3 top-3 rounded-full bg-background/80 p-2 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Heart className="h-4 w-4" />
                      </motion.button>
                    </div>

                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-mono font-extralight tracking-wide text-foreground">
                            {product.name}
                          </h3>
                          <p className="text-sm font-serif text-muted-foreground">
                            {product.category}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                            <span className="ml-1 text-sm text-muted-foreground">
                              ({product.rating})
                            </span>
                          </div>
                          <span className="text-lg font-bold text-primary">
                            ${product.price}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            asChild
                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 ring-0"
                          >
                            <Link href={`/store/${product.id}`}>
                              View Details
                            </Link>
                          </Button>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              onClick={() => addToCart(product)}
                              className="bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* Hot Items Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-mono text-3xl font-extralight tracking-wide text-foreground">
                Hot Items
              </h2>
              <p className="mt-2 font-serif text-muted-foreground">
                Trending products everyone's talking about
              </p>
            </div>
            <Badge className="bg-secondary text-secondary-foreground px-4 py-2">
              🔥 Trending
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.filter((p) => p.reviews >= 100).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 pt-0">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute left-3 top-3 bg-red-500 text-white">
                      Hot
                    </Badge>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute right-3 top-3 rounded-full bg-background/80 p-2 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Heart className="h-4 w-4" />
                    </motion.button>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-mono font-extralight tracking-wide text-foreground text-sm">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-primary">
                          ${product.price}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          asChild
                          size="sm"
                          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <Link href={`/store/${product.id}`}>View</Link>
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Items for Sale Section */}
        <motion.div
          initial={{ opacity: 0, y: 50, x: -100 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-mono text-3xl font-extralight tracking-wide text-foreground">
                Items for Sale
              </h2>
              <p className="mt-2 font-serif text-muted-foreground">
                All products with search and filter options
              </p>
            </div>
            <Badge className="bg-secondary text-secondary-foreground px-4 py-2">
              {PRODUCTS.length} Items
            </Badge>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${searchQuery}-${selectedCategory}-${sortBy}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30, x: -30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 pt-0">
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
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-3 top-3 rounded-full bg-background/80 p-2 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Heart className="h-4 w-4" />
                      </motion.button>
                    </div>

                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-mono font-extralight tracking-wide text-foreground">
                            {product.name}
                          </h3>
                          <p className="text-sm font-serif text-muted-foreground">
                            {product.category}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                            <span className="ml-1 text-sm text-muted-foreground">
                              (4.8)
                            </span>
                          </div>
                          <span className="text-lg font-bold text-primary">
                            ${product.price}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            asChild
                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 ring-0"
                          >
                            <Link href={`/store/${product.id}`}>
                              View Details
                            </Link>
                          </Button>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              onClick={() => addToCart(product)}
                              className="bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="py-20 text-center"
            >
              <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-mono font-extralight tracking-wide">
                No products found
              </h3>
              <p className="font-serif text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Cart Sidebar */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shopping Cart ({getTotalItems()})
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {cart.length === 0 ? (
              <div className="py-8 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="max-h-96 space-y-3 overflow-y-auto">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
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
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          ${item.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
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
                    </motion.div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Checkout Modal */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Checkout
            </DialogTitle>
            <DialogDescription>
              Complete your purchase by providing your contact information.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                placeholder="Enter your full name"
                value={checkoutForm.name}
                onChange={(e) =>
                  setCheckoutForm({ ...checkoutForm, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={checkoutForm.email}
                onChange={(e) =>
                  setCheckoutForm({ ...checkoutForm, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={checkoutForm.phone}
                onChange={(e) =>
                  setCheckoutForm({ ...checkoutForm, phone: e.target.value })
                }
              />
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4" />
                <span>Payment integration required</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                An invoice will be sent to your email for payment processing.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsCheckoutOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCheckout}
                disabled={
                  !checkoutForm.name ||
                  !checkoutForm.email ||
                  !checkoutForm.phone
                }
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Mail className="mr-2 h-4 w-4" />
                Send Invoice
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
