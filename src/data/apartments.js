// Realistic demo catalog. Images are Unsplash URLs (free to use).
// Each apartment has multiple images, amenities and a few reviews.

const img = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const APARTMENT_TYPES = ['Apartment', 'Studio', 'Villa', 'Loft', 'House']

export const apartments = [
  {
    id: 'sf-101',
    name: 'Sunlit Loft near the Old Town',
    type: 'Loft',
    location: 'Gothic Quarter, Barcelona',
    city: 'Barcelona',
    pricePerNight: 142,
    rating: 4.9,
    reviewsCount: 214,
    maxGuests: 4,
    shortDescription:
      'Airy top-floor loft with exposed beams, steps from La Rambla and tapas bars.',
    description:
      'A beautifully restored loft in the heart of the Gothic Quarter. Floor-to-ceiling windows flood the open-plan living space with light, while original stone walls keep it cool in summer. You are a two-minute walk from markets, museums and the beach metro line.',
    images: [
      img('photo-1502672260266-1c1ef2d93688'),
      img('photo-1505691938895-1758d7feb511'),
      img('photo-1522708323590-d24dbb6b0267'),
      img('photo-1560448204-e02f11c3d0e2'),
      img('photo-1493809842364-78817add7ffb'),
    ],
    amenities: ['Wi-Fi', 'Air conditioning', 'Kitchen', 'Workspace', 'TV', 'Self check-in'],
    reviews: [
      { author: 'Marta L.', rating: 5, date: 'May 2026', text: 'Incredible location and the loft is even better in person. Spotless and full of light.' },
      { author: 'David R.', rating: 5, date: 'Apr 2026', text: 'Perfect base for exploring Barcelona on foot. Host was super responsive.' },
      { author: 'Yuki T.', rating: 4, date: 'Mar 2026', text: 'Loved the space. A little street noise at night but that is old town living!' },
    ],
  },
  {
    id: 'sf-102',
    name: 'Ocean Breeze Villa with Pool',
    type: 'Villa',
    location: 'Uluwatu, Bali',
    city: 'Bali',
    pricePerNight: 268,
    rating: 4.8,
    reviewsCount: 176,
    maxGuests: 8,
    shortDescription: 'Private cliffside villa with infinity pool and uninterrupted sea views.',
    description:
      'Wake up to the sound of waves in this stunning four-bedroom villa perched above Uluwatu. The infinity pool blends into the horizon, and the open living pavilion invites the breeze in. Daily housekeeping and an on-call driver make it effortless.',
    images: [
      img('photo-1613490493576-7fde63acd811'),
      img('photo-1512917774080-9991f1c4c750'),
      img('photo-1499793983690-e29da59ef1c2'),
      img('photo-1600607687939-ce8a6c25118c'),
      img('photo-1600566753086-00f18fb6b3ea'),
    ],
    amenities: ['Wi-Fi', 'Pool', 'Air conditioning', 'Kitchen', 'Free parking', 'Sea view', 'Breakfast'],
    reviews: [
      { author: 'Sophie M.', rating: 5, date: 'Jun 2026', text: 'A dream. The pool and view are worth every cent. We never wanted to leave.' },
      { author: 'Liam K.', rating: 5, date: 'May 2026', text: 'Staff went above and beyond. Villa is enormous and immaculate.' },
      { author: 'Priya S.', rating: 4, date: 'Feb 2026', text: 'Beautiful property, roads up the hill are steep but the driver handled it.' },
    ],
  },
  {
    id: 'sf-103',
    name: 'Cozy Studio in Alfama',
    type: 'Studio',
    location: 'Alfama, Lisbon',
    city: 'Lisbon',
    pricePerNight: 89,
    rating: 4.7,
    reviewsCount: 132,
    maxGuests: 2,
    shortDescription: 'Charming studio on a tiled lane with a balcony over the rooftops.',
    description:
      'This compact, thoughtfully designed studio sits on one of Alfama’s winding cobbled lanes. Step onto the tiny balcony for coffee and a view across terracotta rooftops to the river. Fado bars, viewpoints and tram 28 are all on your doorstep.',
    images: [
      img('photo-1522771739844-6a9f6d5f14af'),
      img('photo-1560185007-cde436f6a4d0'),
      img('photo-1502005229762-cf1b2da7c5d6'),
      img('photo-1484154218962-a197022b5858'),
    ],
    amenities: ['Wi-Fi', 'Kitchen', 'Air conditioning', 'TV', 'Self check-in'],
    reviews: [
      { author: 'Anna B.', rating: 5, date: 'Jun 2026', text: 'The balcony view is magic at sunset. Tiny but has everything you need.' },
      { author: 'Tom H.', rating: 4, date: 'Apr 2026', text: 'Great value and location. Lots of stairs to reach it though!' },
    ],
  },
  {
    id: 'sf-104',
    name: 'Modern Apartment by Central Park',
    type: 'Apartment',
    location: 'Upper West Side, New York',
    city: 'New York',
    pricePerNight: 315,
    rating: 4.6,
    reviewsCount: 98,
    maxGuests: 4,
    shortDescription: 'Bright two-bedroom with a doorman, one block from Central Park.',
    description:
      'A polished pre-war apartment updated with a chef’s kitchen and king beds. Enjoy the park in the morning and Broadway at night — the C train is around the corner. The building has a 24/7 doorman and elevator.',
    images: [
      img('photo-1493809842364-78817add7ffb'),
      img('photo-1502672260266-1c1ef2d93688'),
      img('photo-1560448204-e02f11c3d0e2'),
      img('photo-1522708323590-d24dbb6b0267'),
    ],
    amenities: ['Wi-Fi', 'Air conditioning', 'Kitchen', 'TV', 'Workspace', 'Washer'],
    reviews: [
      { author: 'Grace P.', rating: 5, date: 'May 2026', text: 'Unbeatable location. Doorman was lovely and the beds were so comfy.' },
      { author: 'Marco V.', rating: 4, date: 'Mar 2026', text: 'Spacious for NYC. A bit of traffic noise but that is the city.' },
    ],
  },
  {
    id: 'sf-105',
    name: 'Alpine Chalet with Mountain View',
    type: 'House',
    location: 'Zermatt, Switzerland',
    city: 'Zermatt',
    pricePerNight: 340,
    rating: 4.9,
    reviewsCount: 87,
    maxGuests: 6,
    shortDescription: 'Wood-clad chalet with a fireplace and Matterhorn views from the deck.',
    description:
      'A classic Swiss chalet blending cosy timber interiors with floor-to-ceiling glass framing the Matterhorn. Ski-in access in winter and hiking trails in summer. Curl up by the fire after a day on the slopes.',
    images: [
      img('photo-1449158743715-0a90ebb6d2d8'),
      img('photo-1508009603885-50cf7c579365'),
      img('photo-1502672260266-1c1ef2d93688'),
      img('photo-1518602164578-cd0074062767'),
    ],
    amenities: ['Wi-Fi', 'Kitchen', 'Free parking', 'TV', 'Breakfast', 'Pet friendly'],
    reviews: [
      { author: 'Elena F.', rating: 5, date: 'Feb 2026', text: 'Woke up to the Matterhorn every morning. Chalet is warm and beautiful.' },
      { author: 'Jonas W.', rating: 5, date: 'Jan 2026', text: 'Perfect ski week. Fireplace and hot chocolate — pure magic.' },
    ],
  },
  {
    id: 'sf-106',
    name: 'Design Loft in Shoreditch',
    type: 'Loft',
    location: 'Shoreditch, London',
    city: 'London',
    pricePerNight: 178,
    rating: 4.5,
    reviewsCount: 143,
    maxGuests: 3,
    shortDescription: 'Industrial-chic loft above the coffee shops and galleries of East London.',
    description:
      'Polished concrete, Crittall windows and mid-century furniture define this creative loft. You are surrounded by the best independent coffee, street art and record stores in London, with Liverpool Street a short walk away.',
    images: [
      img('photo-1536376072261-38c75010e6c9'),
      img('photo-1524758631624-e2822e304c36'),
      img('photo-1502672260266-1c1ef2d93688'),
      img('photo-1493809842364-78817add7ffb'),
    ],
    amenities: ['Wi-Fi', 'Air conditioning', 'Kitchen', 'Workspace', 'TV', 'Washer'],
    reviews: [
      { author: 'Chloe D.', rating: 5, date: 'Jun 2026', text: 'So stylish and the neighbourhood is buzzing. Would book again.' },
      { author: 'Sam O.', rating: 4, date: 'Apr 2026', text: 'Great design and comfy bed. Weekend mornings are a little lively outside.' },
    ],
  },
  {
    id: 'sf-107',
    name: 'Riad-Style Apartment in the Medina',
    type: 'Apartment',
    location: 'Medina, Marrakech',
    city: 'Marrakech',
    pricePerNight: 76,
    rating: 4.7,
    reviewsCount: 121,
    maxGuests: 4,
    shortDescription: 'Serene courtyard apartment with zellige tiles and a rooftop terrace.',
    description:
      'Hidden behind a traditional door in the Medina, this calm apartment wraps around a tiled courtyard. Climb to the rooftop terrace for mint tea beneath the stars. Souks, spice markets and Jemaa el-Fnaa are minutes away.',
    images: [
      img('photo-1539020140153-e479b8c22e70'),
      img('photo-1548013146-72479768bada'),
      img('photo-1489749798305-4fea3ae63d43'),
      img('photo-1502672260266-1c1ef2d93688'),
    ],
    amenities: ['Wi-Fi', 'Air conditioning', 'Kitchen', 'Breakfast', 'Self check-in'],
    reviews: [
      { author: 'Nadia H.', rating: 5, date: 'May 2026', text: 'An oasis of calm in the busy Medina. The rooftop at night is unforgettable.' },
      { author: 'Ben C.', rating: 4, date: 'Mar 2026', text: 'Authentic and peaceful. A guide met us as the lanes are a maze — very helpful.' },
    ],
  },
  {
    id: 'sf-108',
    name: 'Beachfront Studio on the Promenade',
    type: 'Studio',
    location: 'Copacabana, Rio de Janeiro',
    city: 'Rio de Janeiro',
    pricePerNight: 104,
    rating: 4.4,
    reviewsCount: 79,
    maxGuests: 2,
    shortDescription: 'Wake up to the waves in this bright studio right on Copacabana beach.',
    description:
      'This cheerful studio sits directly across from Copacabana’s famous mosaic promenade. Surf, sun and caipirinhas are steps from the door, and Sugarloaf is a short taxi ride away. Perfect for a couple chasing the beach life.',
    images: [
      img('photo-1483729558449-99ef09a8c325'),
      img('photo-1516306580123-e6e52b1b7b5f'),
      img('photo-1502672260266-1c1ef2d93688'),
      img('photo-1560448204-e02f11c3d0e2'),
    ],
    amenities: ['Wi-Fi', 'Air conditioning', 'Kitchen', 'Sea view', 'TV'],
    reviews: [
      { author: 'Isabela G.', rating: 5, date: 'Jan 2026', text: 'The beach view is unreal. Loved falling asleep to the ocean.' },
      { author: 'Peter S.', rating: 4, date: 'Dec 2025', text: 'Great spot right on the sand. Compact but well equipped.' },
    ],
  },
  {
    id: 'sf-109',
    name: 'Minimalist Apartment in Shibuya',
    type: 'Apartment',
    location: 'Shibuya, Tokyo',
    city: 'Tokyo',
    pricePerNight: 158,
    rating: 4.8,
    reviewsCount: 167,
    maxGuests: 3,
    shortDescription: 'Calm, minimalist flat moments from Shibuya crossing and the metro.',
    description:
      'A serene retreat above the energy of Shibuya. Clean lines, tatami textures and blackout blinds make it a restful base after long days exploring Tokyo. Two metro lines and endless ramen are just downstairs.',
    images: [
      img('photo-1524758631624-e2822e304c36'),
      img('photo-1522708323590-d24dbb6b0267'),
      img('photo-1493809842364-78817add7ffb'),
      img('photo-1502672260266-1c1ef2d93688'),
    ],
    amenities: ['Wi-Fi', 'Air conditioning', 'Kitchen', 'Workspace', 'TV', 'Self check-in'],
    reviews: [
      { author: 'Kenji A.', rating: 5, date: 'Jun 2026', text: 'Spotless and quiet despite being so central. Thoughtful design throughout.' },
      { author: 'Laura N.', rating: 5, date: 'Apr 2026', text: 'Perfect Tokyo base. Everything you need within a five-minute walk.' },
    ],
  },
  {
    id: 'sf-110',
    name: 'Garden Villa in the Tuscan Hills',
    type: 'Villa',
    location: 'Val d’Orcia, Tuscany',
    city: 'Tuscany',
    pricePerNight: 225,
    rating: 4.9,
    reviewsCount: 64,
    maxGuests: 6,
    shortDescription: 'Stone farmhouse with olive groves, a pool and endless vineyard views.',
    description:
      'A lovingly restored stone farmhouse surrounded by cypress trees, olive groves and rolling vineyards. Spend lazy afternoons by the pool and evenings cooking with produce from the local market. Siena and Montalcino are a short drive away.',
    images: [
      img('photo-1600585154340-be6161a56a0c'),
      img('photo-1512917774080-9991f1c4c750'),
      img('photo-1449158743715-0a90ebb6d2d8'),
      img('photo-1600607687939-ce8a6c25118c'),
    ],
    amenities: ['Wi-Fi', 'Pool', 'Kitchen', 'Free parking', 'Breakfast', 'Pet friendly'],
    reviews: [
      { author: 'Giulia R.', rating: 5, date: 'May 2026', text: 'Absolute paradise. The views, the pool, the quiet — perfect family trip.' },
      { author: 'Henry B.', rating: 5, date: 'Sep 2025', text: 'A slice of the real Tuscany. We cooked, swam and did nothing. Bliss.' },
    ],
  },
  {
    id: 'sf-111',
    name: 'Bright Family House with Backyard',
    type: 'House',
    location: 'Mission District, San Francisco',
    city: 'San Francisco',
    pricePerNight: 289,
    rating: 4.5,
    reviewsCount: 58,
    maxGuests: 6,
    shortDescription: 'Colourful three-bedroom Victorian with a sunny backyard and BBQ.',
    description:
      'A classic painted Victorian in the vibrant Mission. Three bedrooms, a bright kitchen and a private backyard make it ideal for families. Taquerias, murals and Dolores Park are all within a few blocks.',
    images: [
      img('photo-1570129477492-45c003edd2be'),
      img('photo-1560448204-e02f11c3d0e2'),
      img('photo-1502672260266-1c1ef2d93688'),
      img('photo-1493809842364-78817add7ffb'),
    ],
    amenities: ['Wi-Fi', 'Kitchen', 'Free parking', 'Washer', 'TV', 'Pet friendly'],
    reviews: [
      { author: 'Rachel T.', rating: 5, date: 'Jun 2026', text: 'Loved the backyard for morning coffee. Great location for exploring the city.' },
      { author: 'Owen M.', rating: 4, date: 'Feb 2026', text: 'Spacious and comfy for our family. Parking on the street can be tricky.' },
    ],
  },
  {
    id: 'sf-112',
    name: 'Canal-View Loft in Jordaan',
    type: 'Loft',
    location: 'Jordaan, Amsterdam',
    city: 'Amsterdam',
    pricePerNight: 196,
    rating: 4.7,
    reviewsCount: 110,
    maxGuests: 4,
    shortDescription: 'Warm loft overlooking a leafy canal in Amsterdam’s prettiest district.',
    description:
      'Tucked into a historic canal house, this warm loft pairs original beams with a modern kitchen. Watch boats drift by from the window seat, then wander Jordaan’s cafés, markets and galleries. Central Station is a 15-minute stroll.',
    images: [
      img('photo-1560185007-cde436f6a4d0'),
      img('photo-1502672260266-1c1ef2d93688'),
      img('photo-1522708323590-d24dbb6b0267'),
      img('photo-1493809842364-78817add7ffb'),
    ],
    amenities: ['Wi-Fi', 'Kitchen', 'Workspace', 'TV', 'Washer', 'Self check-in'],
    reviews: [
      { author: 'Femke V.', rating: 5, date: 'May 2026', text: 'The canal view is postcard perfect. Cosy, clean and brilliantly located.' },
      { author: 'Aiden L.', rating: 4, date: 'Mar 2026', text: 'Lovely loft, steep Dutch stairs as expected. Would happily return.' },
    ],
  },
]

export const destinations = [
  { city: 'Barcelona', country: 'Spain', image: img('photo-1583422409516-2895a77efded', 800) },
  { city: 'Bali', country: 'Indonesia', image: img('photo-1537996194471-e657df975ab4', 800) },
  { city: 'Lisbon', country: 'Portugal', image: img('photo-1585208798174-6cedd86e019a', 800) },
  { city: 'Tokyo', country: 'Japan', image: img('photo-1540959733332-eab4deabeeaf', 800) },
  { city: 'New York', country: 'USA', image: img('photo-1496442226666-8d4d0e62e6e9', 800) },
  { city: 'Amsterdam', country: 'Netherlands', image: img('photo-1534351590666-13e3e96b5017', 800) },
  { city: 'Marrakech', country: 'Morocco', image: img('photo-1597212618440-806262de4f6b', 800) },
  { city: 'Tuscany', country: 'Italy', image: img('photo-1523906834658-6e24ef2386f9', 800) },
]

export function getApartmentById(id) {
  return apartments.find((a) => a.id === id)
}
