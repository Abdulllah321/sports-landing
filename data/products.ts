export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  badge?: string;
  category: string;
  description?: string;
  rating?: number;
  reviews?: number;
};

export const PRODUCTS: Product[] = [
  // Equipment
  {
    id: "p1",
    name: "Pro Racket X",
    price: 199,
    image: "/pro-racket-x.jpg",
    badge: "New",
    category: "equipment",
    description: "Professional-grade racket for competitive play with enhanced grip and power",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "p6",
    name: "Training Resistance Bands",
    price: 35,
    image: "/pro-racket-x.jpg",
    category: "equipment",
    description: "Set of resistance bands for strength training - 5 levels of resistance included",
    rating: 4.4,
    reviews: 98,
  },
  {
    id: "p7",
    name: "Professional Basketball",
    price: 65,
    image: "/athlete-tee.jpg",
    category: "equipment",
    description: "Official size basketball with premium grip and durable construction",
    rating: 4.9,
    reviews: 187,
  },
  {
    id: "p8",
    name: "Football Training Set",
    price: 89,
    image: "/grip-tape-pack.jpg",
    badge: "Hot",
    category: "equipment",
    description: "Complete training kit with cones, agility ladder, and practice ball",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "p9",
    name: "Tennis Ball Machine",
    price: 299,
    image: "/pro-racket-x.jpg",
    category: "equipment",
    description: "Automatic ball machine with adjustable speed and trajectory settings",
    rating: 4.6,
    reviews: 73,
  },
  
  // Apparel
  {
    id: "p3",
    name: "Athlete Tee",
    price: 28,
    image: "/athlete-tee.jpg",
    category: "apparel",
    description: "Comfortable athletic t-shirt for training - moisture-wicking fabric",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "p4",
    name: "Elite Training Shoes",
    price: 149,
    image: "/athlete-tee.jpg",
    category: "apparel",
    description: "Professional training shoes with advanced cushioning and support",
    rating: 4.9,
    reviews: 203,
  },
  {
    id: "p10",
    name: "Pro Training Shorts",
    price: 42,
    image: "/grip-tape-pack.jpg",
    category: "apparel",
    description: "Lightweight athletic shorts with breathable mesh panels",
    rating: 4.6,
    reviews: 134,
  },
  {
    id: "p11",
    name: "Compression Leggings",
    price: 55,
    image: "/pro-racket-x.jpg",
    badge: "New",
    category: "apparel",
    description: "High-performance compression leggings for optimal muscle support",
    rating: 4.8,
    reviews: 201,
  },
  {
    id: "p12",
    name: "Athletic Hoodie",
    price: 75,
    image: "/athlete-tee.jpg",
    category: "apparel",
    description: "Premium athletic hoodie with zippered pockets and thumb holes",
    rating: 4.7,
    reviews: 167,
  },
  
  // Accessories
  {
    id: "p2",
    name: "Grip Tape 3-Pack",
    price: 12,
    image: "/grip-tape-pack.jpg",
    category: "accessories",
    description: "High-quality grip tape for enhanced control and comfort",
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "p5",
    name: "Sports Water Bottle",
    price: 18,
    image: "/grip-tape-pack.jpg",
    category: "accessories",
    description: "Insulated water bottle for athletes - BPA-free and leak-proof",
    rating: 4.5,
    reviews: 67,
  },
  {
    id: "p13",
    name: "Sports Headband Set",
    price: 15,
    image: "/pro-racket-x.jpg",
    category: "accessories",
    description: "Pack of 3 sports headbands - sweat-wicking and comfortable",
    rating: 4.4,
    reviews: 145,
  },
  {
    id: "p14",
    name: "Athletic Socks 6-Pack",
    price: 24,
    image: "/athlete-tee.jpg",
    category: "accessories",
    description: "Premium athletic socks with cushioned sole and moisture-wicking",
    rating: 4.6,
    reviews: 212,
  },
  {
    id: "p15",
    name: "Sports Watch",
    price: 129,
    image: "/grip-tape-pack.jpg",
    badge: "Hot",
    category: "accessories",
    description: "Advanced fitness tracker with heart rate monitor and GPS",
    rating: 4.8,
    reviews: 278,
  },
];
