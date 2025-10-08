export type Product = {
  id: string
  name: string
  price: number
  image: string
  badge?: string
}

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Pro Racket X", price: 199, image: "/pro-racket-x.jpg", badge: "New" },
  { id: "p2", name: "Grip Tape 3-Pack", price: 12, image: "/grip-tape-pack.jpg" },
  { id: "p3", name: "Athlete Tee", price: 28, image: "/athlete-tee.jpg" },
]
