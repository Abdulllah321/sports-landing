export type Facility = {
  id: string;
  name: string;
  city: string;
  type: "Outdoor" | "Indoor";
  amenities: string[];
  price: string;
  images: string[];
  rating: number;
  capacity: string;
  description: string;
  rules: string[];
  availableSlots: {
    date: string;
    timeSlots: string[];
  }[];
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  contact: {
    phone: string;
    email: string;
  };
  features: {
    parking: boolean;
    wifi: boolean;
    changingRooms: boolean;
    equipmentRental: boolean;
    foodService: boolean;
    security: boolean;
  };
};

export const facilities: Facility[] = [
  {
    id: "s1",
    name: "Marina Sports Complex",
    city: "Dubai",
    type: "Outdoor",
    amenities: ["Lights", "Lockers", "Parking", "WiFi", "Changing Rooms"],
    price: "AED 250/hr",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80",
    ],
    rating: 4.8,
    capacity: "500 people",
    description:
      "Premium outdoor sports complex with state-of-the-art facilities and stunning marina views. Perfect for football, basketball, and tennis matches.",
    rules: [
      "No smoking in the facility",
      "Proper sports attire required",
      "Booking must be made 24 hours in advance",
      "Maximum 2 hours per booking",
      "Equipment must be returned in good condition",
    ],
    availableSlots: [
      {
        date: "2024-01-15",
        timeSlots: ["09:00", "11:00", "14:00", "16:00", "18:00"],
      },
      {
        date: "2024-01-16",
        timeSlots: ["09:00", "11:00", "14:00", "16:00", "18:00", "20:00"],
      },
      { date: "2024-01-17", timeSlots: ["09:00", "11:00", "14:00", "16:00"] },
    ],
    location: {
      address: "Marina Walk, Dubai Marina, Dubai, UAE",
      coordinates: { lat: 25.0772, lng: 55.1308 },
    },
    contact: {
      phone: "+971 4 123 4567",
      email: "marina@ficro.com",
    },
    features: {
      parking: true,
      wifi: true,
      changingRooms: true,
      equipmentRental: true,
      foodService: true,
      security: true,
    },
  },
  {
    id: "s2",
    name: "Downtown Arena",
    city: "Abu Dhabi",
    type: "Indoor",
    amenities: [
      "AC",
      "Showers",
      "Parking",
      "WiFi",
      "Changing Rooms",
      "Equipment Rental",
    ],
    price: "AED 350/hr",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80",
    ],
    rating: 4.9,
    capacity: "300 people",
    description:
      "Modern indoor arena with climate control and premium facilities. Ideal for basketball, volleyball, and badminton tournaments.",
    rules: [
      "Indoor shoes required",
      "No food or drinks on the court",
      "Booking confirmation required",
      "Maximum 3 hours per booking",
      "Equipment rental available at reception",
    ],
    availableSlots: [
      {
        date: "2024-01-15",
        timeSlots: [
          "08:00",
          "10:00",
          "12:00",
          "14:00",
          "16:00",
          "18:00",
          "20:00",
        ],
      },
      {
        date: "2024-01-16",
        timeSlots: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
      },
      {
        date: "2024-01-17",
        timeSlots: [
          "08:00",
          "10:00",
          "12:00",
          "14:00",
          "16:00",
          "18:00",
          "20:00",
        ],
      },
    ],
    location: {
      address: "Corniche Road, Downtown Abu Dhabi, UAE",
      coordinates: { lat: 24.4539, lng: 54.3773 },
    },
    contact: {
      phone: "+971 2 123 4567",
      email: "downtown@ficro.com",
    },
    features: {
      parking: true,
      wifi: true,
      changingRooms: true,
      equipmentRental: true,
      foodService: false,
      security: true,
    },
  },
  {
    id: "s3",
    name: "Corniche Field",
    city: "Abu Dhabi",
    type: "Outdoor",
    amenities: ["Lights", "Parking", "Changing Rooms"],
    price: "AED 200/hr",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
    ],
    rating: 4.6,
    capacity: "400 people",
    description:
      "Scenic outdoor field along the Corniche with beautiful waterfront views. Perfect for football and rugby matches.",
    rules: [
      "No metal cleats allowed",
      "Booking must be confirmed 2 hours in advance",
      "Maximum 2 hours per booking",
      "Proper sports equipment required",
      "No littering on the field",
    ],
    availableSlots: [
      {
        date: "2024-01-15",
        timeSlots: ["06:00", "08:00", "10:00", "16:00", "18:00"],
      },
      {
        date: "2024-01-16",
        timeSlots: ["06:00", "08:00", "10:00", "16:00", "18:00", "20:00"],
      },
      {
        date: "2024-01-17",
        timeSlots: ["06:00", "08:00", "10:00", "16:00", "18:00"],
      },
    ],
    location: {
      address: "Corniche Road, Abu Dhabi, UAE",
      coordinates: { lat: 24.4539, lng: 54.3773 },
    },
    contact: {
      phone: "+971 2 123 4568",
      email: "corniche@ficro.com",
    },
    features: {
      parking: true,
      wifi: false,
      changingRooms: true,
      equipmentRental: false,
      foodService: false,
      security: true,
    },
  },
  {
    id: "s4",
    name: "Riyadh Dome",
    city: "Riyadh",
    type: "Indoor",
    amenities: [
      "AC",
      "Lockers",
      "Parking",
      "WiFi",
      "Changing Rooms",
      "Equipment Rental",
      "Food Service",
    ],
    price: "SAR 300/hr",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
    ],
    rating: 4.7,
    capacity: "600 people",
    description:
      "State-of-the-art indoor dome with premium facilities and full-service amenities. Perfect for large tournaments and events.",
    rules: [
      "Indoor shoes mandatory",
      "No outside food or drinks",
      "Booking confirmation required 48 hours in advance",
      "Maximum 4 hours per booking",
      "Equipment must be returned to designated area",
    ],
    availableSlots: [
      {
        date: "2024-01-15",
        timeSlots: [
          "08:00",
          "10:00",
          "12:00",
          "14:00",
          "16:00",
          "18:00",
          "20:00",
          "22:00",
        ],
      },
      {
        date: "2024-01-16",
        timeSlots: [
          "08:00",
          "10:00",
          "12:00",
          "14:00",
          "16:00",
          "18:00",
          "20:00",
        ],
      },
      {
        date: "2024-01-17",
        timeSlots: [
          "08:00",
          "10:00",
          "12:00",
          "14:00",
          "16:00",
          "18:00",
          "20:00",
          "22:00",
        ],
      },
    ],
    location: {
      address: "King Fahd Road, Riyadh, Saudi Arabia",
      coordinates: { lat: 24.7136, lng: 46.6753 },
    },
    contact: {
      phone: "+966 11 123 4567",
      email: "riyadh@ficro.com",
    },
    features: {
      parking: true,
      wifi: true,
      changingRooms: true,
      equipmentRental: true,
      foodService: true,
      security: true,
    },
  },
  {
    id: "s5",
    name: "Doha Sports Park",
    city: "Doha",
    type: "Outdoor",
    amenities: [
      "Lights",
      "Café",
      "Parking",
      "WiFi",
      "Changing Rooms",
      "Equipment Rental",
    ],
    price: "QAR 220/hr",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80",
    ],
    rating: 4.5,
    capacity: "350 people",
    description:
      "Modern outdoor sports park with multiple courts and recreational facilities. Features a café and equipment rental services.",
    rules: [
      "No smoking in the facility",
      "Proper sports attire required",
      "Booking must be made 12 hours in advance",
      "Maximum 3 hours per booking",
      "Café area is for customers only",
    ],
    availableSlots: [
      {
        date: "2024-01-15",
        timeSlots: [
          "06:00",
          "08:00",
          "10:00",
          "14:00",
          "16:00",
          "18:00",
          "20:00",
        ],
      },
      {
        date: "2024-01-16",
        timeSlots: ["06:00", "08:00", "10:00", "14:00", "16:00", "18:00"],
      },
      {
        date: "2024-01-17",
        timeSlots: [
          "06:00",
          "08:00",
          "10:00",
          "14:00",
          "16:00",
          "18:00",
          "20:00",
        ],
      },
    ],
    location: {
      address: "Aspire Zone, Doha, Qatar",
      coordinates: { lat: 25.2854, lng: 51.531 },
    },
    contact: {
      phone: "+974 44 123 4567",
      email: "doha@ficro.com",
    },
    features: {
      parking: true,
      wifi: true,
      changingRooms: true,
      equipmentRental: true,
      foodService: true,
      security: true,
    },
  },
  {
    id: "s6",
    name: "Khalifa Sports Center",
    city: "Dubai",
    type: "Indoor",
    amenities: ["AC", "Lights", "Parking", "WiFi", "Changing Rooms", "Equipment Rental"],
    price: "AED 280/hr",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
    ],
    rating: 4.7,
    capacity: "250 people",
    description: "Modern indoor facility with climate control and top-tier amenities for professional training and competitions.",
    rules: ["Indoor shoes required", "Booking must be made 24 hours in advance", "Maximum 3 hours per booking"],
    availableSlots: [
      { date: "2024-01-15", timeSlots: ["08:00", "10:00", "14:00", "16:00", "18:00", "20:00"] },
      { date: "2024-01-16", timeSlots: ["08:00", "10:00", "14:00", "16:00", "18:00", "20:00", "22:00"] },
      { date: "2024-01-17", timeSlots: ["08:00", "10:00", "14:00", "16:00", "18:00"] },
    ],
    location: {
      address: "Khalifa City, Dubai, UAE",
      coordinates: { lat: 25.0772, lng: 55.1308 },
    },
    contact: {
      phone: "+971 4 234 5678",
      email: "khalifa@ficro.com",
    },
    features: {
      parking: true,
      wifi: true,
      changingRooms: true,
      equipmentRental: true,
      foodService: false,
      security: true,
    },
  },
  {
    id: "s7",
    name: "Sharjah Sports Complex",
    city: "Sharjah",
    type: "Outdoor",
    amenities: ["Lights", "Parking", "Changing Rooms"],
    price: "AED 180/hr",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
    ],
    rating: 4.4,
    capacity: "450 people",
    description: "Community-focused outdoor complex with excellent facilities for all skill levels.",
    rules: ["Proper sports attire required", "Maximum 2 hours per booking"],
    availableSlots: [
      { date: "2024-01-15", timeSlots: ["06:00", "08:00", "16:00", "18:00"] },
      { date: "2024-01-16", timeSlots: ["06:00", "08:00", "16:00", "18:00", "20:00"] },
      { date: "2024-01-17", timeSlots: ["06:00", "08:00", "16:00", "18:00"] },
    ],
    location: {
      address: "Sharjah Sports Complex, Sharjah, UAE",
      coordinates: { lat: 25.3463, lng: 55.4209 },
    },
    contact: {
      phone: "+971 6 123 4567",
      email: "sharjah@ficro.com",
    },
    features: {
      parking: true,
      wifi: false,
      changingRooms: true,
      equipmentRental: false,
      foodService: false,
      security: true,
    },
  },
  {
    id: "s8",
    name: "King Fahd Stadium",
    city: "Riyadh",
    type: "Outdoor",
    amenities: ["Lights", "Parking", "WiFi", "Changing Rooms", "Food Service"],
    price: "SAR 400/hr",
    images: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
    ],
    rating: 4.9,
    capacity: "800 people",
    description: "Premier outdoor stadium with world-class facilities and full-service amenities.",
    rules: ["No metal cleats allowed", "Maximum 4 hours per booking", "Insurance required"],
    availableSlots: [
      { date: "2024-01-15", timeSlots: ["06:00", "08:00", "10:00", "14:00", "16:00", "18:00", "20:00"] },
      { date: "2024-01-16", timeSlots: ["06:00", "08:00", "10:00", "14:00", "16:00", "18:00"] },
      { date: "2024-01-17", timeSlots: ["06:00", "08:00", "10:00", "14:00", "16:00", "18:00", "20:00"] },
    ],
    location: {
      address: "King Fahd Road, Riyadh, Saudi Arabia",
      coordinates: { lat: 24.7136, lng: 46.6753 },
    },
    contact: {
      phone: "+966 11 123 4567",
      email: "riyadh@ficro.com",
    },
    features: {
      parking: true,
      wifi: true,
      changingRooms: true,
      equipmentRental: true,
      foodService: true,
      security: true,
    },
  },
  {
    id: "s9",
    name: "Al-Ahli Sports Club",
    city: "Doha",
    type: "Indoor",
    amenities: ["AC", "Lockers", "Parking", "WiFi", "Changing Rooms", "Equipment Rental", "Food Service"],
    price: "QAR 380/hr",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80",
    ],
    rating: 4.8,
    capacity: "400 people",
    description: "Elite indoor sports club with premium facilities and comprehensive services.",
    rules: ["Indoor shoes mandatory", "No outside food", "Booking confirmation required"],
    availableSlots: [
      { date: "2024-01-15", timeSlots: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
      { date: "2024-01-16", timeSlots: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"] },
      { date: "2024-01-17", timeSlots: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
    ],
    location: {
      address: "Aspire Zone, Doha, Qatar",
      coordinates: { lat: 25.2854, lng: 51.531 },
    },
    contact: {
      phone: "+974 44 123 4567",
      email: "doha@ficro.com",
    },
    features: {
      parking: true,
      wifi: true,
      changingRooms: true,
      equipmentRental: true,
      foodService: true,
      security: true,
    },
  },
  {
    id: "s10",
    name: "Sports City Arena",
    city: "Abu Dhabi",
    type: "Indoor",
    amenities: ["AC", "Showers", "Parking", "WiFi", "Changing Rooms", "Equipment Rental"],
    price: "AED 420/hr",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80",
    ],
    rating: 4.95,
    capacity: "550 people",
    description: "State-of-the-art indoor arena with exceptional facilities for elite competitions and training.",
    rules: ["Indoor shoes required", "Booking confirmation required 48 hours in advance", "Maximum 4 hours per booking"],
    availableSlots: [
      { date: "2024-01-15", timeSlots: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"] },
      { date: "2024-01-16", timeSlots: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
      { date: "2024-01-17", timeSlots: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"] },
    ],
    location: {
      address: "Corniche Road, Abu Dhabi, UAE",
      coordinates: { lat: 24.4539, lng: 54.3773 },
    },
    contact: {
      phone: "+971 2 234 5678",
      email: "sportscity@ficro.com",
    },
    features: {
      parking: true,
      wifi: true,
      changingRooms: true,
      equipmentRental: true,
      foodService: false,
      security: true,
    },
  },
];

export const FACILITIES = facilities;
