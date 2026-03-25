export type Feature = "Wheelchair Accessible" | "Free" | "Baby Changing" | "Gender Neutral" | "24/7";

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number; // 1-5
  text: string;
  date: string;
}

export interface Bathroom {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviewsCount: number;
  isOpen: boolean;
  status: 'Operational' | 'Maintenance' | 'Closed';
  openingHours: string;
  fee: string;
  distance?: number;
  walkingTime?: number;
  image?: string;
  gallery?: string[];
  features: Feature[];
  detailedFeatures?: { icon: string; label: string }[];
  reviews: Review[];
}

export const mockBathrooms: Bathroom[] = [
  {
    id: "1",
    name: "Place de la Concorde",
    address: "75008 Paris, France",
    lat: 48.8656,
    lng: 2.3212,
    rating: 4.8,
    reviewsCount: 124,
    isOpen: true,
    status: 'Operational',
    openingHours: '06:00 — 23:00',
    fee: '€0.50 (Free for LOO+)',
    distance: 400,
    walkingTime: 5,
    image: "https://images.unsplash.com/photo-1620002161245-0d04b6a9da0e?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1564540574859-0dfb634d4502?auto=format&fit=crop&q=80&w=800"
    ],
    features: ["Free", "Wheelchair Accessible", "Baby Changing"],
    detailedFeatures: [
      { icon: 'door', label: 'Extra-wide door' },
      { icon: 'baby', label: 'Changing station' },
      { icon: 'scan', label: 'Contactless entry' },
      { icon: 'eco', label: 'Eco-friendly flushes' },
      { icon: 'gender', label: 'Gender neutral' },
      { icon: 'seat', label: 'Heated seats' },
    ],
    reviews: [
      {
        id: "r1",
        author: "Amélie Roche",
        avatar: "https://i.pravatar.cc/150?u=amelie",
        rating: 5,
        text: "Incredible standards for a public facility. The automated entry was seamless and the interior felt more like a luxury hotel than a public toilet. Highly recommended if you are near the Louvre.",
        date: "2 hours ago"
      },
      {
        id: "r2",
        author: "Jean-Paul Dupont",
        avatar: "https://i.pravatar.cc/150?u=jean",
        rating: 4,
        text: "Very clean and smells like lavender. Only docking one star because there was a small queue, but that's expected for this location. The LOO app payment worked perfectly.",
        date: "Yesterday"
      },
      {
        id: "r3",
        author: "Sarah Jenkins",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        rating: 5,
        text: "Best toilet in Paris! The accessible entrance is actually accessible and not just a sign.",
        date: "3 days ago"
      }
    ]
  },
  {
    id: "2",
    name: "Jardin des Tuileries",
    address: "Jardin des Tuileries, 75001 Paris",
    lat: 48.8637,
    lng: 2.3276,
    rating: 4.2,
    reviewsCount: 89,
    isOpen: true,
    status: 'Operational',
    openingHours: '07:30 — 21:00',
    fee: '€0.80',
    distance: 850,
    walkingTime: 11,
    image: "https://images.unsplash.com/photo-1620002093390-3ce48eb3a683?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1590425339276-8803ad94dcff?auto=format&fit=crop&q=80&w=800"
    ],
    features: ["Wheelchair Accessible"],
    detailedFeatures: [
      { icon: 'door', label: 'Ramp access' },
      { icon: 'scan', label: 'Coin/Card entry' },
    ],
    reviews: [
      {
        id: "r3",
        author: "Sophie Blanc",
        rating: 4,
        text: "Convenient location while walking in the park.",
        date: "3 days ago"
      }
    ]
  },
  {
    id: "3",
    name: "Louvre Pyramid (Exterior)",
    address: "Cour Napoléon, 75001 Paris",
    lat: 48.8606,
    lng: 2.3376,
    rating: 3.5,
    reviewsCount: 205,
    isOpen: false,
    status: 'Maintenance',
    openingHours: 'Closed for repair',
    fee: 'Free',
    distance: 1200,
    walkingTime: 15,
    image: "https://images.unsplash.com/photo-1590425339276-8803ad94dcff?auto=format&fit=crop&q=80&w=800",
    features: ["Free", "Gender Neutral"],
    detailedFeatures: [
      { icon: 'gender', label: 'Gender neutral' },
    ],
    reviews: [
      {
        id: "r4",
        author: "Marc Laurent",
        rating: 3,
        text: "Often closed for maintenance, but okay when open.",
        date: "2 weeks ago"
      }
    ]
  },
  {
    id: "4",
    name: "Gare Saint-Lazare",
    address: "13 Rue d'Amsterdam, 75008 Paris",
    lat: 48.8767,
    lng: 2.3255,
    rating: 4.5,
    reviewsCount: 340,
    isOpen: true,
    status: 'Operational',
    openingHours: '24/7',
    fee: '€1.00',
    distance: 2000,
    walkingTime: 25,
    image: "https://images.unsplash.com/photo-1600566752355-35792bea4a9b?auto=format&fit=crop&q=80&w=800",
    features: ["Wheelchair Accessible", "Baby Changing", "24/7"],
    detailedFeatures: [
      { icon: 'door', label: 'Extra-wide door' },
      { icon: 'baby', label: 'Large changing table' },
    ],
    reviews: [
      {
        id: "r5",
        author: "Alice Dupont",
        rating: 5,
        text: "Always open, which is a life saver. Requires 1 Euro fee but worth it.",
        date: "1 month ago"
      }
    ]
  }
];
