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
  distance?: number; // Distance in meters (mocked)
  walkingTime?: number; // Time in minutes (mocked)
  image?: string;
  features: Feature[];
  reviews: Review[];
}

export const mockBathrooms: Bathroom[] = [
  {
    id: "1",
    name: "Place de la Concorde",
    address: "Place de la Concorde, 75008 Paris",
    lat: 48.8656,
    lng: 2.3212,
    rating: 4.8,
    reviewsCount: 124,
    isOpen: true,
    distance: 400,
    walkingTime: 5,
    image: "https://images.unsplash.com/photo-1620002161245-0d04b6a9da0e?auto=format&fit=crop&q=80&w=800",
    features: ["Free", "Wheelchair Accessible", "Baby Changing"],
    reviews: [
      {
        id: "r1",
        author: "Camille Dubois",
        rating: 5,
        text: "Very clean and well maintained. The accessibility ramp is a great addition.",
        date: "2 days ago"
      },
      {
        id: "r2",
        author: "Jean-Paul Roux",
        rating: 4,
        text: "Good facility, slightly busy at peak times but moves fast.",
        date: "1 week ago"
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
    distance: 850,
    walkingTime: 11,
    image: "https://images.unsplash.com/photo-1620002093390-3ce48eb3a683?auto=format&fit=crop&q=80&w=800",
    features: ["Wheelchair Accessible"],
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
    distance: 1200,
    walkingTime: 15,
    image: "https://images.unsplash.com/photo-1590425339276-8803ad94dcff?auto=format&fit=crop&q=80&w=800",
    features: ["Free", "Gender Neutral"],
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
    distance: 2000,
    walkingTime: 25,
    image: "https://images.unsplash.com/photo-1600566752355-35792bea4a9b?auto=format&fit=crop&q=80&w=800",
    features: ["Wheelchair Accessible", "Baby Changing", "24/7"],
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
