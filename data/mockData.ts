
import { Tour, Quotation, User } from '../types';

export const tours: Tour[] = [
  {
    id: '1',
    name: 'Kashmir: Paradise on Earth',
    location: 'Srinagar, Jammu & Kashmir',
    description: 'Experience the serene Dal Lake, alpine meadows of Gulmarg, and the snowy peaks of Pahalgam.',
    fullOverview: 'Known as the "Paradise on Earth," Kashmir is a region defined by its stunning landscapes, houseboats, and vibrant culture. This 6-day tour takes you through the heart of the valley.',
    duration: '6 Days / 5 Nights',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1598324789736-4861f89564a0?auto=format&fit=crop&q=80&w=800',
    category: 'Domestic',
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar', activities: ['Meet & Greet', 'Check-in to Houseboat', 'Shikara Ride at Dal Lake'] },
      { day: 2, title: 'Gulmarg Expedition', activities: ['Gondola Ride', 'Skiing (seasonal)', 'Apharwat Peak visit'] },
      { day: 3, title: 'Pahalgam Retreat', activities: ['Betaab Valley', 'Aru Valley', 'Lidder River walk'] }
    ],
    inclusions: ['4-star Accommodation', 'Breakfast & Dinner', 'Private Cab for Sightseeing', 'Shikara Ride'],
    exclusions: ['Airfare', 'Personal Expenses', 'Gondola Tickets', 'Lunch']
  },
  {
    id: '2',
    name: 'Royal Rajasthan Heritage',
    location: 'Jaipur & Udaipur',
    description: 'Walk through the majestic forts of Jaipur and enjoy the romantic lakes of Udaipur.',
    fullOverview: 'A royal journey through the land of Maharajas. Experience vibrant culture, grand palaces, and spicy Rajasthani cuisine.',
    duration: '7 Days / 6 Nights',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800',
    category: 'Domestic',
    itinerary: [
      { day: 1, title: 'Jaipur Arrival', activities: ['Chokhi Dhani visit', 'Dinner with folk music'] },
      { day: 2, title: 'Jaipur Forts', activities: ['Amer Fort', 'Hawa Mahal', 'Jantar Mantar'] },
      { day: 3, title: 'Drive to Udaipur', activities: ['Visit Chittorgarh on the way'] }
    ],
    inclusions: ['Heritage Hotel Stays', 'Breakfast', 'City Guided Tours', 'Private Transport'],
    exclusions: ['Entry tickets to monuments', 'Travel Insurance']
  },
  {
    id: '3',
    name: 'Goa Coastal Escape',
    location: 'North & South Goa',
    description: 'Sun-kissed beaches, Portuguese architecture, and vibrant nightlife.',
    fullOverview: 'Goa is more than just beaches. Discover the Latin quarters of Panjim and the tranquil sands of Palolem.',
    duration: '5 Days / 4 Nights',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800',
    category: 'Domestic',
    itinerary: [],
    inclusions: ['Resort Stay', 'Breakfast', 'Scuba Diving Intro'],
    exclusions: ['Flight', 'Dinner']
  },
  {
    id: '4',
    name: 'Dubai Sky-High Luxury',
    location: 'Dubai, UAE',
    description: 'Burj Khalifa, Desert Safari, and world-class shopping experiences.',
    fullOverview: 'Dubai offers a futuristic skyline blended with traditional Arabic charm. A must-visit for families and luxury seekers.',
    duration: '5 Days / 4 Nights',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    category: 'International',
    itinerary: [],
    inclusions: ['Luxury Hotel', 'Visa Fees', 'Desert Safari with BBQ', 'Burj Khalifa Tickets'],
    exclusions: ['Flights', 'Optional Tours']
  },
  {
    id: '5',
    name: 'Bali Spiritual Journey',
    location: 'Ubud & Kuta, Indonesia',
    description: 'Lush rice terraces, ancient temples, and serene beaches.',
    fullOverview: 'Find your zen in Bali. From the spiritual heart of Ubud to the beach clubs of Seminyak.',
    duration: '6 Days / 5 Nights',
    price: 62000,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    category: 'International',
    itinerary: [],
    inclusions: ['Private Villa', 'Daily Breakfast', 'Uluwatu Temple Visit'],
    exclusions: ['International Airfare']
  },
  {
    id: '6',
    name: 'Kerala Backwater Serenity',
    location: 'Alleppey & Munnar',
    description: 'Cruise through emerald backwaters and wander in tea gardens.',
    fullOverview: 'God\'s Own Country awaits you with its healing Ayurvedic massages and breathtaking tea plantations.',
    duration: '6 Days / 5 Nights',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
    category: 'Domestic',
    itinerary: [],
    inclusions: ['Houseboat Stay', 'Breakfast', 'Spice Garden Tour'],
    exclusions: ['Lunch', 'Personal Porter']
  }
];

export const quotations: Quotation[] = [
  { id: 'Q1', customerName: 'Arjun Sharma', destination: 'Kashmir', travelDate: '2024-06-15', people: 4, budget: '₹1.5L - ₹2L', status: 'Pending', notes: 'Need vegetarian food options.' },
  { id: 'Q2', customerName: 'Priya Verma', destination: 'Bali', travelDate: '2024-07-20', people: 2, budget: '₹1.2L', status: 'Processed', notes: 'Honeymoon package requested.' },
  { id: 'Q3', customerName: 'Amit Patel', destination: 'Dubai', travelDate: '2024-08-05', people: 5, budget: '₹4L', status: 'Pending', notes: 'Group travel for family.' }
];

export const users: User[] = [
  { id: 'U1', name: 'Rahul Khanna', email: 'rahul@relax-tours.com', role: 'Admin', joinDate: '2023-01-10' },
  { id: 'U2', name: 'Simran Kaur', email: 'simran@support.com', role: 'Support', joinDate: '2023-05-12' },
  { id: 'U3', name: 'Deepak Rao', email: 'deepak@user.com', role: 'User', joinDate: '2024-02-28' }
];
