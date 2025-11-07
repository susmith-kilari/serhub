export const COUNTRIES = [
  "India",
];

export const SERVICEABLE_CITIES = [
    "Hyderabad", "Mumbai", "Bangalore", "Chennai", "Tirupati", "Vijayawada", "Vizag"
];

export const SERVICEABLE_CITY_COORDS: { [key: string]: { lat: number, lon: number } } = {
    Hyderabad: { lat: 17.3850, lon: 78.4867 },
    Mumbai: { lat: 19.0760, lon: 72.8777 },
    Bangalore: { lat: 12.9716, lon: 77.5946 },
    Chennai: { lat: 13.0827, lon: 80.2707 },
    Tirupati: { lat: 13.6288, lon: 79.4192 },
    Vijayawada: { lat: 16.5062, lon: 80.6480 },
    Vizag: { lat: 17.6868, lon: 83.2185 },
};


export const SERVICES = [
  "Cleaning",
  "Cooking",
  "Plumbing",
  "Electrician",
  "Gardening",
  "Babysitting",
  "Painting",
  "Pest Control",
  "Car Wash",
  "Housekeeping",
  "Appliance Repair",
  "Moving",
  "AC Servicing",
  "Handyman",
  "Lawn Care",
  "Window Cleaning",
];

export const FEATURED_SERVICES = [
  "Cleaning",
  "Plumbing",
  "Electrician",
  "Painting",
  "Gardening",
  "Appliance Repair",
];

export const SERVICE_IMAGES: { [key: string]: string } = {
  Cleaning: "https://images.pexels.com/photos/7534221/pexels-photo-7534221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  Cooking: "https://images.pexels.com/photos/6999086/pexels-photo-6999086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  Plumbing: "https://images.pexels.com/photos/8483321/pexels-photo-8483321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  Electrician: "https://images.pexels.com/photos/6474811/pexels-photo-6474811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  Gardening: "https://images.pexels.com/photos/7745564/pexels-photo-7745564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  Babysitting: "https://images.pexels.com/photos/7897750/pexels-photo-7897750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  Painting: "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Pest Control": "https://images.pexels.com/photos/7137452/pexels-photo-7137452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Car Wash": "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Housekeeping": "https://images.pexels.com/photos/6186813/pexels-photo-6186813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Appliance Repair": "https://images.pexels.com/photos/3825880/pexels-photo-3825880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Moving": "https://images.pexels.com/photos/4392036/pexels-photo-4392036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "AC Servicing": "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Handyman": "https://images.pexels.com/photos/8005396/pexels-photo-8005396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Lawn Care": "https://images.pexels.com/photos/4750275/pexels-photo-4750275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Window Cleaning": "https://images.pexels.com/photos/7218641/pexels-photo-7218641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
};

export const SERVICE_ICONS: { [key: string]: string } = {
  Cleaning: "https://img.icons8.com/fluency/48/cleaning-a-surface.png",
  Cooking: "https://img.icons8.com/fluency/48/cooking-pot.png",
  Plumbing: "https://img.icons8.com/fluency/48/plumber.png",
  Electrician: "https://img.icons8.com/fluency/48/electrician.png",
  Gardening: "https://img.icons8.com/fluency/48/garden-shears.png",
  Babysitting: "https://img.icons8.com/fluency/48/rocking-horse.png",
  Painting: "https://img.icons8.com/fluency/48/paint-roller.png",
  "Pest Control": "https://img.icons8.com/fluency/48/ladybug.png",
  "Car Wash": "https://img.icons8.com/fluency/48/car-wash.png",
  "Housekeeping": "https://img.icons8.com/fluency/48/maid.png",
  "Appliance Repair": "https://img.icons8.com/fluency/48/maintenance.png",
  "Moving": "https://img.icons8.com/fluency/48/delivery-truck.png",
  "AC Servicing": "https://img.icons8.com/fluency/48/air-conditioner.png",
  "Handyman": "https://img.icons8.com/fluency/48/toolbox.png",
  "Lawn Care": "https://img.icons8.com/fluency/48/lawn-mower.png",
  "Window Cleaning": "https://img.icons8.com/fluency/48/window-cleaner.png",
};

export const PROMOTIONAL_BANNERS = [
  {
    title: "Fridge Repair Expert?",
    description: "Book now for speedy service.",
    image: "https://images.pexels.com/photos/8961340/pexels-photo-8961340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bgColor: "bg-blue-100",
  },
  {
    title: "AC Servicing",
    description: "Cool comfort, delivered.",
    image: "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bgColor: "bg-sky-100",
  },
  {
    title: "Need An Electrician?",
    description: "Safe & reliable electrical work.",
    image: "https://images.pexels.com/photos/545014/pexels-photo-545014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bgColor: "bg-green-100",
  },
  {
    title: "Expert Cleaning Services",
    description: "Relax & rejuvenate at home.",
    image: "https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bgColor: "bg-rose-100",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    title: "Book Online or Phone",
    description: "Select the service you need and schedule a time that works for you, either online or by phone.",
    image: "https://images.pexels.com/photos/7131422/pexels-photo-7131422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Get Booking Details",
    description: "Receive a confirmation with all the details of your scheduled service and assigned professional.",
    image: "https://images.pexels.com/photos/7821516/pexels-photo-7821516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Confirm & Pay",
    description: "Make a secure online payment to confirm your booking and schedule your professional.",
    image: "https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export const SERVICE_BASE_PRICES: { [key: string]: number } = {
    Cleaning: 499,
    Cooking: 599,
    Plumbing: 799,
    Electrician: 699,
    Gardening: 399,
    Babysitting: 499,
    Painting: 999,
    "Pest Control": 1499,
    "Car Wash": 299,
    "Housekeeping": 549,
    "Appliance Repair": 899,
    Moving: 2499,
    "AC Servicing": 799,
    Handyman: 599,
    "Lawn Care": 449,
    "Window Cleaning": 649,
};

export const EXPERIENCE_LEVELS = [
    { name: "Junior (1-2 years)", multiplier: 1 },
    { name: "Mid-Level (3-5 years)", multiplier: 1.25 },
    { name: "Senior (5+ years)", multiplier: 1.5 },
];