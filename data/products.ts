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
  {
    id: "p1",
    name: "Pro Racket X",
    price: 199,
    image: "/pro-racket-x.jpg",
    badge: "New",
    category: "equipment",
    description: "Professional-grade racket for competitive play",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "p2",
    name: "Grip Tape 3-Pack",
    price: 12,
    image: "/grip-tape-pack.jpg",
    category: "accessories",
    description: "High-quality grip tape for enhanced control",
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "p3",
    name: "Athlete Tee",
    price: 28,
    image: "/athlete-tee.jpg",
    category: "apparel",
    description: "Comfortable athletic t-shirt for training",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "p4",
    name: "Elite Training Shoes",
    price: 149,
    image: "/athlete-tee.jpg",
    category: "apparel",
    description: "Professional training shoes with advanced cushioning",
    rating: 4.9,
    reviews: 203,
  },
  {
    id: "p5",
    name: "Sports Water Bottle",
    price: 18,
    image: "/grip-tape-pack.jpg",
    category: "accessories",
    description: "Insulated water bottle for athletes",
    rating: 4.5,
    reviews: 67,
  },
  {
    id: "p6",
    name: "Training Resistance Bands",
    price: 35,
    image: "/pro-racket-x.jpg",
    category: "equipment",
    description: "Set of resistance bands for strength training",
    rating: 4.4,
    reviews: 98,
  },
];
