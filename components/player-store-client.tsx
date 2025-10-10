"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Heart,
  Star,
  Plus,
  Minus,
  CreditCard,
  Truck,
  Shield
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";

interface PlayerStoreClientProps {
  locale: Locale;
}

export function PlayerStoreClient({ locale }: PlayerStoreClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("products");
  const [cart, setCart] = useState<{[key: number]: number}>({});

  const isArabic = locale === 'ar';

  // Mock data for products
  const products = [
    {
      id: 1,
      name: isArabic ? "حذاء كرة القدم الاحترافي" : "Professional Football Boots",
      category: isArabic ? "الأحذية" : "Footwear",
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
      description: isArabic ? "حذاء كرة قدم عالي الجودة للمحترفين" : "High-quality football boots for professionals",
      inStock: true,
      isFavorite: false
    },
    {
      id: 2,
      name: isArabic ? "قميص كرة القدم" : "Football Jersey",
      category: isArabic ? "الملابس" : "Clothing",
      price: 89,
      originalPrice: 120,
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop",
      description: isArabic ? "قميص كرة قدم مريح وذو جودة عالية" : "Comfortable and high-quality football jersey",
      inStock: true,
      isFavorite: true
    },
    {
      id: 3,
      name: isArabic ? "كرة قدم رسمية" : "Official Football",
      category: isArabic ? "المعدات" : "Equipment",
      price: 45,
      originalPrice: 60,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
      description: isArabic ? "كرة قدم رسمية للبطولات" : "Official football for tournaments",
      inStock: false,
      isFavorite: false
    }
  ];

  const categories = [
    { value: "all", label: isArabic ? "جميع الفئات" : "All Categories" },
    { value: isArabic ? "الأحذية" : "Footwear", label: isArabic ? "الأحذية" : "Footwear" },
    { value: isArabic ? "الملابس" : "Clothing", label: isArabic ? "الملابس" : "Clothing" },
    { value: isArabic ? "المعدات" : "Equipment", label: isArabic ? "المعدات" : "Equipment" },
    { value: isArabic ? "الاكسسوارات" : "Accessories", label: isArabic ? "الاكسسوارات" : "Accessories" }
  ];

  const priceRanges = [
    { value: "all", label: isArabic ? "جميع الأسعار" : "All Prices" },
    { value: "0-50", label: "$0 - $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-200", label: "$100 - $200" },
    { value: "200+", label: "$200+" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesPrice = priceFilter === "all" || 
      (priceFilter === "0-50" && product.price <= 50) ||
      (priceFilter === "50-100" && product.price > 50 && product.price <= 100) ||
      (priceFilter === "100-200" && product.price > 100 && product.price <= 200) ||
      (priceFilter === "200+" && product.price > 200);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const cartItems = Object.keys(cart).length;
  const cartTotal = Object.entries(cart).reduce((total, [productId, quantity]) => {
    const product = products.find(p => p.id === parseInt(productId));
    return total + (product ? product.price * quantity : 0);
  }, 0);

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">
            {isArabic ? 'المنتجات' : 'Products'}
          </TabsTrigger>
          <TabsTrigger value="cart">
            {isArabic ? 'السلة' : 'Cart'} ({cartItems})
          </TabsTrigger>
          <TabsTrigger value="orders">
            {isArabic ? 'الطلبات' : 'Orders'}
          </TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'البحث والتصفية' : 'Search & Filter'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isArabic ? 'البحث عن منتج...' : 'Search product...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 ${isArabic ? 'font-arabic-body' : ''}`}
                  />
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className={isArabic ? 'font-arabic-body' : ''}>
                    <SelectValue placeholder={isArabic ? 'الفئة' : 'Category'} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className={isArabic ? 'font-arabic-body' : ''}>
                    <SelectValue placeholder={isArabic ? 'السعر' : 'Price'} />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>{isArabic ? 'تصفية متقدمة' : 'Advanced Filter'}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    {product.originalPrice > product.price && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        {isArabic ? 'خصم' : 'Sale'}
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Heart className={`h-4 w-4 ${product.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <CardTitle className={`text-xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                      {product.name}
                    </CardTitle>
                    <CardDescription className={`mt-1 ${isArabic ? 'font-arabic-body' : ''}`}>
                      {product.description}
                    </CardDescription>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className={`text-sm font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                        {product.rating}
                      </span>
                      <span className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                        ({product.reviews} {isArabic ? 'تقييم' : 'reviews'})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-2xl font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                        ${product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className={`text-lg text-muted-foreground line-through ${isArabic ? 'font-arabic-body' : ''}`}>
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={product.inStock ? "default" : "destructive"}>
                        {product.inStock ? (isArabic ? 'متوفر' : 'In Stock') : (isArabic ? 'غير متوفر' : 'Out of Stock')}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1" 
                      disabled={!product.inStock}
                      onClick={() => addToCart(product.id)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {isArabic ? 'أضف للسلة' : 'Add to Cart'}
                    </Button>
                    <Button variant="outline" size="sm">
                      {isArabic ? 'عرض' : 'View'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Cart Tab */}
        <TabsContent value="cart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={isArabic ? 'font-arabic-heading' : ''}>
                {isArabic ? 'سلة التسوق' : 'Shopping Cart'}
              </CardTitle>
              <CardDescription className={isArabic ? 'font-arabic-body' : ''}>
                {isArabic ? 'مراجعة طلبك قبل الدفع' : 'Review your order before checkout'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {cartItems > 0 ? (
                <div className="space-y-4">
                  {Object.entries(cart).map(([productId, quantity]) => {
                    const product = products.find(p => p.id === parseInt(productId));
                    if (!product) return null;
                    
                    return (
                      <div key={productId} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className={`font-medium ${isArabic ? 'font-arabic-body' : ''}`}>
                              {product.name}
                            </h4>
                            <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic-body' : ''}`}>
                              ${product.price} {isArabic ? 'لكل قطعة' : 'each'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFromCart(parseInt(productId))}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className={`w-8 text-center ${isArabic ? 'font-arabic-body' : ''}`}>
                              {quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addToCart(parseInt(productId))}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${isArabic ? 'font-arabic-heading' : ''}`}>
                              ${product.price * quantity}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span className={isArabic ? 'font-arabic-body' : ''}>
                        {isArabic ? 'المجموع' : 'Total'}
                      </span>
                      <span className={isArabic ? 'font-arabic-heading' : ''}>
                        ${cartTotal}
                      </span>
                    </div>
                    <Button className="w-full mt-4" size="lg">
                      <CreditCard className="h-4 w-4 mr-2" />
                      {isArabic ? 'الدفع' : 'Checkout'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className={`text-lg font-semibold mb-2 ${isArabic ? 'font-arabic-heading' : ''}`}>
                    {isArabic ? 'السلة فارغة' : 'Your cart is empty'}
                  </h3>
                  <p className={`text-muted-foreground mb-4 ${isArabic ? 'font-arabic-body' : ''}`}>
                    {isArabic ? 'أضف بعض المنتجات إلى سلة التسوق' : 'Add some products to your cart'}
                  </p>
                  <Button onClick={() => setActiveTab("products")}>
                    {isArabic ? 'تسوق الآن' : 'Shop Now'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardContent className="text-center py-12">
              <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-2 ${isArabic ? 'font-arabic-heading' : ''}`}>
                {isArabic ? 'لا توجد طلبات' : 'No Orders Yet'}
              </h3>
              <p className={`text-muted-foreground mb-4 ${isArabic ? 'font-arabic-body' : ''}`}>
                {isArabic ? 'ستظهر طلباتك هنا بعد الشراء' : 'Your orders will appear here after purchase'}
              </p>
              <Button onClick={() => setActiveTab("products")}>
                {isArabic ? 'تسوق الآن' : 'Shop Now'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
