"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  CheckCircle,
  Truck,
  Shield,
  RotateCcw,
  Share2,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdded, setIsAdded] = useState(false);

  const product = PRODUCTS.find((x) => x.id === params.id);
  if (!product) return notFound();

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

  const addToCart = () => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart((prev) => [...prev, { ...product, quantity }]);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b bg-background/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/store" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Store
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/store" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Cart ({getTotalItems()})
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Product Details */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
                  {product.badge}
                </Badge>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-4 top-4 rounded-full bg-background/80 p-3 backdrop-blur-sm"
              >
                <Heart className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {[product.image, product.image, product.image, product.image].map(
                (img, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                )
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.category}</Badge>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({product.rating}) • {product.reviews} reviews
                  </span>
                </div>
              </div>

              <h1 className="font-mono text-3xl font-extralight tracking-wide text-foreground md:text-4xl">
                {product.name}
              </h1>

              <p className="mt-4 text-lg font-serif text-muted-foreground">
                {product.description}
              </p>

              <div className="mt-6">
                <span className="text-3xl font-bold text-primary">
                  ${product.price}
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    onClick={addToCart}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {isAdded ? "Added to Cart!" : "Add to Cart"}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Features */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-mono font-extralight tracking-wide mb-4">
                  Product Features
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-serif">
                      Professional grade materials
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-serif">
                      30-day money-back guarantee
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-serif">
                      Free shipping on orders over $50
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-mono font-extralight tracking-wide">
                    Free Shipping
                  </p>
                  <p className="text-xs font-serif text-muted-foreground">
                    On orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-mono font-extralight tracking-wide">
                    Secure Payment
                  </p>
                  <p className="text-xs font-serif text-muted-foreground">
                    SSL encrypted
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-mono font-extralight tracking-wide">
                    Easy Returns
                  </p>
                  <p className="text-xs font-serif text-muted-foreground">
                    30-day policy
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h2 className="font-mono text-2xl font-extralight tracking-wide mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="group overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {relatedProduct.badge && (
                        <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
                          {relatedProduct.badge}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-mono font-extralight tracking-wide text-foreground">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm font-serif text-muted-foreground">
                        {relatedProduct.category}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          ${relatedProduct.price}
                        </span>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/store/${relatedProduct.id}`}>View</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
