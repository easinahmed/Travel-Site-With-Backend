const ContentModel = require('../models/content.model');

const defaultContent = {
  hero: {
    badge: 'Award-Winning Luxury Tourism Brand 2026',
    title: 'Explore The World With TR Travel',
    subtitle: 'Trusted Travel Partner for Premium Tours, Holiday Packages, Visa Assistance, and Comfort-Guaranteed Hajj & Umrah Expeditions.',
    primaryButton: 'Book Now',
    secondaryButton: 'View Packages',
    backgroundImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80',
    fromOptions: ['Dhaka (DAC)', 'Chittagong (CGP)', 'Sylhet (ZYL)'],
    toOptions: ['Saudi Arabia (JED)', 'Turkey (IST)', 'Dubai (DXB)', 'Malaysia (KUL)', 'Thailand (BKK)', 'Singapore (SIN)', 'Bangladesh (Cox\'s Bazar)']
  },
  features: [
    {
      title: 'Easy Online Booking',
      description: 'Book flights, premium accommodation tours, and secure visa consultancies instantly with streamlined electronic pipelines.'
    },
    {
      title: 'Best Price Guarantee',
      description: 'Direct tie-ups with premium 5-Star chains in Makkah, Turkey, and Singapore ensure unbeatable luxury pricing structures.'
    },
    {
      title: '24/7 Customer Support',
      description: 'A continuous, reliable support desk located in Dhaka and dedicated agents active on WhatsApp to resolve travel dilemmas.'
    },
    {
      title: 'Trusted Travel Experts',
      description: 'Highly experienced Muallems for Hajj & Umrah, certified historians guides, and veteran visa specialists at your service.'
    },
    {
      title: 'Secure Payments',
      description: 'Your money is protected by multiple encryption layers. Safe card/bank settlements and full invoicing issued instantly.'
    },
    {
      title: 'Custom Travel Plans',
      description: 'Tailor-make your family itinerary, from dedicated luxury land transfers to customized culinary lists in destinations.'
    }
  ],
  destinations: [
    {
      id: 'bangladesh',
      name: 'Bangladesh',
      country: 'Bangladesh',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=800&q=80',
      description: 'Land of rivers, lush green tea gardens, and the world\'s longest natural sandy beach in Cox\'s Bazar.',
      attractionsCount: 15,
      averagePrice: 250
    },
    {
      id: 'saudi-arabia',
      name: 'Saudi Arabia',
      country: 'Saudi Arabia',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=800&q=80',
      description: 'The spiritual heartland of Islam featuring the holy cities of Makkah and Madinah, alongside historic Al-Ula.',
      attractionsCount: 12,
      averagePrice: 1500
    },
    {
      id: 'turkey',
      name: 'Turkey',
      country: 'Turkey',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
      description: 'Where East meets West in architectural marvels, mesmerizing hot air balloon flights, and Mediterranean coastlines.',
      attractionsCount: 22,
      averagePrice: 1100
    },
    {
      id: 'dubai',
      name: 'Dubai (UAE)',
      country: 'United Arab Emirates',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      description: 'Futuristic city of skyscrapers, luxury shopping, indoor ski slopes, and thrilling golden desert safaris.',
      attractionsCount: 18,
      averagePrice: 1300
    },
    {
      id: 'malaysia',
      name: 'Malaysia',
      country: 'Malaysia',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
      description: 'A rich mixture of modern high-rises, tropical rainforests, historic islands, and mouth-watering street food.',
      attractionsCount: 16,
      averagePrice: 750
    },
    {
      id: 'thailand',
      name: 'Thailand',
      country: 'Thailand',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
      description: 'Ornate temples, vibrant street markets, pristine beaches, and world-renowned spa retreats.',
      attractionsCount: 20,
      averagePrice: 650
    },
    {
      id: 'singapore',
      name: 'Singapore',
      country: 'Singapore',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
      description: 'Bustling clean city-state featuring futuristic biodomes, luxury hotels, and high-fashion shopping belts.',
      attractionsCount: 14,
      averagePrice: 950
    },
    {
      id: 'maldives',
      name: 'Maldives',
      country: 'Maldives',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
      description: 'A tropical paradise of pristine white sandy beaches, crystal-clear turquoise lagoons, and luxury overwater villas.',
      attractionsCount: 10,
      averagePrice: 1200
    }
  ],
  packages: [
    {
      id: 'pkg-coxs-bazar-sajek',
      name: 'Cox\'s Bazar & Sajek Valley Explorer',
      type: 'tour',
      destination: 'Bangladesh',
      description: 'Experience the best of Bangladesh: the clouds and peaks of Sajek Valley coupled with the serene blue waves of Cox\'s Bazar sand beach.',
      price: 349,
      duration: '6 Days, 5 Nights',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviewsCount: 42,
      inclusions: ['Luxury AC Bus Transfers', 'Premium Resorts/Cottage Stay', 'Guided Peak Trekking', 'Daily Traditional Buffet Breakfast', 'In-person Local Coordinator'],
      itinerary: [
        'Day 1: Rise above the clouds in Sajek Valley, check-in to peak-view premium resort',
        'Day 2: Morning mountain trek to Kanglakpara, breathtaking sunset at Helipad',
        'Day 3: Travel via scenic mountain road to Cox\'s Bazar beach city',
        'Day 4: Marine drive tour to Inani Beach and Himchori waterfall',
        'Day 5: High-speed catamaran cruise to Saint Martin\'s coral island',
        'Day 6: Final souvenir shopping and departure to Dhaka'
      ],
      hotels: ['Sajek Resort & Spa', 'Sayeman Beach Resort (Cox\'s Bazar)'],
      spots: ['Sajek Valley', 'Kanglakpara', 'Inani Coral Beach', 'Saint Martin\'s Island', 'Marine Drive'],
      isFeatured: true
    },
    {
      id: 'pkg-sylhet-tea-gardens',
      name: 'Sylhet Scenic Tea & Swamp Trails',
      type: 'tour',
      destination: 'Bangladesh',
      description: 'Immerse yourself in nature with tree-covered hills, emerald tea gardens, the unique Ratargul swamp forest, and transparent rivers of Jaflong.',
      price: 199,
      duration: '4 Days, 3 Nights',
      image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviewsCount: 29,
      inclusions: ['Private Microbus Transport', 'Eco Resort Accommodations', 'Boat Safari tickets', 'Complementary Rain Canopy hats', 'Dedicated Tour Guide'],
      itinerary: [
        'Day 1: Arrive in Sylhet, tea garden stroll and evening luxury tea tasting session',
        'Day 2: Canoe boat safari through Ratargul freshwater swamp forest',
        'Day 3: Scenic border view tour of Shari River and Jaflong Zero point',
        'Day 4: Explore Sreemangal tea estates & Lawachara Forest trek before departure'
      ],
      hotels: ['Grand Sultan Tea Resort & Golf', 'Nazimgarh Wilderness Resort'],
      spots: ['Ratargul Swamp Forest', 'Jaflong Blue River', 'Lalakkhal', 'Sreemangal Tea Estates'],
      isFeatured: false
    },
    {
      id: 'pkg-turkey-marvels',
      name: 'Turkish Marvels: Istanbul & Cappadocia',
      type: 'tour',
      destination: 'Turkey',
      description: 'Our top-rated absolute luxury experience linking Ottoman heritage in Istanbul with the surreal volcanic landscapes of Cappadocia.',
      price: 1250,
      duration: '8 Days, 7 Nights',
      image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviewsCount: 118,
      inclusions: ['Domestic Flights included', 'Cave Hotel experience', 'Sunrise Hot Air Balloon Ticket', 'Bosphorus Dinner Yacht Cruise', 'Professional English Historian Guide'],
      itinerary: [
        'Day 1: Arrive in Istanbul, VIP transfer, welcome dinner and standard luxury briefing',
        'Day 2: Guided tour of Blue Mosque, Hagia Sophia, and bustling Grand Bazaar',
        'Day 3: Topkapi Palace exploration and luxurious evening Bosphorus yacht cruise',
        'Day 4: Short flight to Cappadocia, check-in to luxury traditional cave suite',
        'Day 5: Breathtaking Sunrise Hot Air Balloon flight, Goreme Open-air Museum tour',
        'Day 6: Red Valley hike, underground city of Kaymakli exploration',
        'Day 7: Pottery workshop in Avanos, traditional Turkish cultural night with gourmet meal',
        'Day 8: Transfer to airport for flight back'
      ],
      hotels: ['Swissôtel The Bosphorus (Istanbul)', 'Museum Hotel (Cappadocia Cave Resort)'],
      spots: ['Hagia Sophia', 'Bosphorus Strait', 'Goreme Caves', 'Uchisar Castle', 'Grand Bazaar'],
      isFeatured: true
    },
    {
      id: 'pkg-dubai-opulence',
      name: 'Dubai Opulence & Desert Glamour',
      type: 'tour',
      destination: 'Dubai',
      description: 'Live like royalty in the world\'s most futuristic playground. Includes VIP Burj Khalifa lounge tickets, desert safaris, and marine adventures.',
      price: 1450,
      duration: '5 Days, 4 Nights',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviewsCount: 88,
      inclusions: ['5-Star Luxury Beach Resort', 'VIP Burj Khalifa 148th Floor Access', 'Luxury GMC Desert Dune Bashing', 'Ultra Yacht Sunset Cruise', 'Dubai Marina Dinner'],
      itinerary: [
        'Day 1: Arrival with red carpet limousine, check-in to beachside resort',
        'Day 2: Dubai City Tour, Framed Arch, Dubai Mall, and VIP Burj Khalifa Observation',
        'Day 3: Morning at leisure, afternoon luxury Desert Safari with premium BBQ dinner show',
        'Day 4: Helicopter tour of Palm Jumeirah, evening Marina Luxury yacht sail',
        'Day 5: Souk Madinat souvenir hunting, VIP airport departure transfer'
      ],
      hotels: ['Atlantis The Palm', 'Sofitel Dubai Downtown'],
      spots: ['Burj Khalifa Level 148', 'Palm Jumeirah', 'Dubai Marina', 'Desert Dune Reserve'],
      isFeatured: true
    },
    {
      id: 'pkg-malaysia-singapore-twin',
      name: 'Malaysia & Singapore Premium Twin Delight',
      type: 'tour',
      destination: 'Malaysia',
      description: 'Two spectacular Southeast Asian capital nations in one seamless, high-class journey. Enjoy pristine coordination and luxurious business transfers.',
      price: 999,
      duration: '7 Days, 6 Nights',
      image: 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviewsCount: 74,
      inclusions: ['4 to 5-Star City Hotels', 'Express cross-border private car transfer', 'Kuala Lumpur half-day tour', 'Universal Studios VIP lane tickets', 'Gardens by the Bay pass'],
      itinerary: [
        'Day 1: Arrive in Kuala Lumpur, Petronas Twin Towers photo walk, buffet dinner',
        'Day 2: Genting Highlands Cable Car excursion and Batu Caves pilgrimage',
        'Day 3: Scenic VIP private land journey to lush clean Singapore city-state',
        'Day 4: Full day Sentosa Island theme-park adventure with luxury shuttle',
        'Day 5: Marveling at Gardens by the Bay domes, Marina Bay Sands SkyPark skyline views',
        'Day 6: Shopping spree at Orchard Road, night-time Safari exclusive tram ride',
        'Day 7: Changi Jewel waterfall experience (VIP lounge) and flight out'
      ],
      hotels: ['Grand Hyatt Kuala Lumpur', 'Marina Bay Sands (Singapore)'],
      spots: ['Petronas Twin Towers', 'Genting Highlands', 'Marina Bay Sands', 'Gardens by the Bay'],
      isFeatured: false
    },
    {
      id: 'pkg-thailand-paradise',
      name: 'Phuket & Bangkok Tropical Sanctuary',
      type: 'tour',
      destination: 'Thailand',
      description: 'An expert escape combining the cultural splendors of historical Siam temples with the crystal beaches of Phuket.',
      price: 699,
      duration: '6 Days, 5 Nights',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      reviewsCount: 61,
      inclusions: ['Full domestic flights', 'Private long-tail boat to Phi Phi Ley', 'Traditional Royal Thai Spa Session', 'Grand Palace guided historic tour', 'Gourmet dinner transfers'],
      itinerary: [
        'Day 1: Arrive in Bangkok, traditional flower garland welcome, riverside check-in',
        'Day 2: Royal Grand Palace, Wat Phra Kaew, and Emerald Buddha private tour',
        'Day 3: Fly from Bangkok to tropical Phuket, check-in to ocean-facing villa',
        'Day 4: Guided VIP speed-boat tour of James Bond Island and Phi Phi Islands',
        'Day 5: Indulge in 120-min Royal Thai herb message, romantic sunset beachside BBQ',
        'Day 6: Local bazaar exploration and airport VIP shuttle'
      ],
      hotels: ['The Peninsular Bangkok', 'Banyan Tree Phuket (Private Pool Suite)'],
      spots: ['The Grand Palace', 'Phi Phi Islands', 'James Bond Island', 'Patong Coastline'],
      isFeatured: false
    },
    {
      id: 'pkg-maldives-luxury',
      name: 'Maldives Private Island Resort Serenity',
      type: 'tour',
      destination: 'Maldives',
      description: 'Experience ultimate relaxation in a luxury overwater villa. Includes private speedboat transfers, premium all-inclusive meals, and sunset snorkeling.',
      price: 1200,
      duration: '5 Days, 4 Nights',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviewsCount: 52,
      inclusions: ['Premium All-Inclusive meals', 'Return Speedboat Transfers', 'Overwater Villa residency', 'Complimentary snorkeling gear', 'Sunset dolphin cruise'],
      itinerary: [
        'Day 1: Arrival at Male airport, private speedboat transfer to lush island resort',
        'Day 2: Morning lagoon swimming, afternoon guided coral garden snorkeling session',
        'Day 3: Pampering spa treatment, evening luxury yacht sunset dolphin cruise',
        'Day 4: Sandbank private lunch, romantic beach candlelit dinner',
        'Day 5: Leisurely breakfast, speedboat ride back to Male and flight out'
      ],
      hotels: ['Centara Grand Island Resort', 'Anantara Veli Maldives Resort'],
      spots: ['Male Lagoon', 'Banana Reef', 'Ari Atoll Sandbank', 'Dolphin Channel'],
      isFeatured: true
    }
  ],
  hajjPackages: [
    {
      id: 'hu-umrah-luxury',
      name: 'Royal Elite Star Umrah Package',
      category: 'Umrah',
      tier: 'Luxury',
      price: 1950,
      duration: '10 Days, 9 Nights',
      makkahHotel: 'Swissôtel Al Maqam Makkah (Clock Tower)',
      makkahHotelRating: 5,
      madinahHotel: 'Pullman Zamzam Madinah (Front Row Haram)',
      madinahHotelRating: 5,
      distanceToHaram: '0 Meters (Inside Clock Tower / Haram Courtyard Front)',
      transportation: 'Private Luxury GMC Yukon Transfers with Personal Chauffeur',
      inclusions: [
        'Direct Flights on Premium Airlines (Saudi Arabian / Emirates)',
        'Luxury 5-Star Hotel Stay with Kaaba View rooms',
        'Daily International Buffet Breakfast at Hotels',
        'Exclusive Visa processing with VIP Premium fast-track',
        'Personal bilingual Muallem (Guide) for Umrah rituals',
        'VIP lounge services at Jeddah, Makkah, and Madinah terminals'
      ],
      features: [
        'Interactive pre-departure seminar and literature kit',
        'All local historical Ziyarah places guided in luxury AC vehicles',
        '24/7 designated English & Bengali speaking on-ground manager support',
        'Complementary Premium Ihram kits and Zamzam water (5 Liter pack)'
      ],
      registrationDeadline: 'July 15, 2026',
      itinerary: [
        'Day 1: Departure flight to Jeddah, luxurious GMC transfer directly to Makkah 5-star suite',
        'Day 2: Guided Umrah ritual performing with professional Muallem',
        'Day 3: Rest and private prayer sessions in Al Haram, evening Clock Tower stroll',
        'Day 4: Exclusive historical Ziyarah of Makkah (Cave of Hira, Thawr, Mina, Arafat)',
        'Day 5: Luxury private chauffeur transfer via VIP train/GMC to Madinah Al Munawwarah',
        'Day 6: Check-in, Salam performance in Al-Masjid an-Nabawi',
        'Day 7: Guided historical Ziyarah of Madinah (Masjid Quba, Qiblatayn, Mount Uhud)',
        'Day 8: Day of spiritual reflection and prayer inside Nabawi Mosque yard',
        'Day 9: Farwell prayers and packing high-grade souvenirs',
        'Day 10: VIP transfer to Jeddah airport for return journey'
      ]
    },
    {
      id: 'hu-umrah-premium',
      name: 'Premium Shifting Umrah Comfort',
      category: 'Umrah',
      tier: 'Premium',
      price: 1450,
      duration: '14 Days, 13 Nights',
      makkahHotel: 'Movenpick Hotel & Residences Hajar Tower Makkah',
      makkahHotelRating: 5,
      madinahHotel: 'Anwar Al Madinah Mövenpick',
      madinahHotelRating: 5,
      distanceToHaram: '50 Meters (Immediate Walkway)',
      transportation: 'High-Speed Haramain Bullet Train (Business Class Ticket) + Private Coaster',
      inclusions: [
        'Return Flights Included',
        '5-Star Luxury Accommodations right beside the courtyard',
        'Bilingual experienced guide representing Islamic history',
        'Saudi Tourist/Umrah Visa with full medical insurances',
        'Ziyarah tours in Makkah & Madinah'
      ],
      features: [
        'Highly comfortable family layout rooms',
        'Buffet breakfast with Western, Middle Eastern, and Asian choices',
        'Pre-departure comprehensive guide book and bag essentials',
        'Zamzam water included'
      ],
      registrationDeadline: 'July 30, 2026',
      itinerary: [
        'Day 1-7: Holy days in Makkah Al-Mukarramah with 24/7 prayers and guided Umrah',
        'Day 8: Luxury Bullet Train high-speed transition to Madinah',
        'Day 9-13: Deep spiritual devotion in Al-Masjid an-Nabawi, Ziyarah of holy sites',
        'Day 14: Transfer back to Medina/Jeddah Airport'
      ]
    },
    {
      id: 'hu-umrah-standard',
      name: 'Spiritual Heritage Umrah Budget Plus',
      category: 'Umrah',
      tier: 'Standard',
      price: 999,
      duration: '14 Days, 13 Nights',
      makkahHotel: 'Elaf Bakkah Hotel (Haram Shuttle Service)',
      makkahHotelRating: 4,
      madinahHotel: 'Saja Al Madinah Hotel (3-min stroll)',
      madinahHotelRating: 4,
      distanceToHaram: 'Makkah: 800m (With 24/7 Dedicated Free Private Shuttle), Madinah: 150m walk',
      transportation: 'Modern AC Shuttle Coasters & Coaches',
      inclusions: [
        'Aero Flights booked, all taxes covered',
        '4-Star standard highly rated hygienic hotels',
        'Umrah Electronic E-Visa services',
        'Experienced Tour Guide managing batches',
        'Complimentary Ihram sheet or Prayer mat'
      ],
      features: [
        'Incredible value for budget-conscious families',
        '24-Hour continuous shuttle buses departing every 2 minutes from lobby',
        'Clean double/triple sharing setups',
        'Reliable, highly secure guide system'
      ],
      registrationDeadline: 'August 10, 2026',
      itinerary: [
        'Day 1-7: Makkah stay - easily complete multiple Umrah rounds with shuttle support',
        'Day 8: Group bus transit to Madinah City',
        'Day 9-13: Madinah stay nearby Nabawi courtyard, local landmark tours',
        'Day 14: Departure transfer'
      ]
    },
    {
      id: 'hu-hajj-platinum',
      name: 'Royal VIP Non-Shifting Hajj Package',
      category: 'Hajj',
      tier: 'Luxury',
      price: 6500,
      duration: '21 Days, 20 Nights',
      makkahHotel: 'Fairmont Makkah Clock Royal Tower (Right in Front)',
      makkahHotelRating: 5,
      madinahHotel: 'Oberoi Madinah (Ultimate Premium Luxury)',
      madinahHotelRating: 5,
      distanceToHaram: '0 Meters (Haram Frontline Luxury)',
      transportation: 'VIP bullet trains (Executive class) & luxury bulletproof buses in Mina/Arafat',
      inclusions: [
        'Full VIP Hajj Visa processing with government credentials',
        'Exquisite air-conditioned premium VIP tents in Mina (closest to Jamarat, Zone A)',
        'Gourmet 3-course customized meals & hot/cold beverages 24/7 in Mina',
        'Highly esteemed Islamic scholars in-person for daily seminars & counseling',
        'Full Medical assistance with on-board doctors'
      ],
      features: [
        'Non-shifting model: You keep your Fairmont room even during the 5 days of Hajj for extreme comfort',
        'Mina luxury tents with gypsum dry-walls, comfortable beds, and proper air-condition units',
        'Full customized Ziyarah tours and VIP souvenirs'
      ],
      registrationDeadline: 'March 15, 2027',
      itinerary: [
        'Day 1-5: Check-in Madinah Royal Oberoi, intense prayers, spiritual lectures',
        'Day 6: Drive to Makkah Fairmont, wear Ihram and perform Initial Welcome Tawaf',
        'Day 7: Rest and briefing in preparation for Mina shifting',
        'Day 8 (Hajj Begin): Relocate to VIP Mina Tents',
        'Day 9 (Arafat Day): Stand in prayers at Arafat, stay in premium tents, sunset Muzdalifah VIP bedding',
        'Day 10 (Jamarat): Mina stoning rituals, sacrificial animal arrangement, return to Fairmont room rest',
        'Day 11-12 (Tashreeq): Continuous stoning guide with scholar, high luxury dining',
        'Day 13-18: Non-shifting hotel residency, continuous Islamic lectures, group feedback sessions',
        'Day 19: Perform Farwell Tawaf in Makkah',
        'Day 20-21: Return transfers via Jeddah airport with 5L Zamzam bottle'
      ]
    }
  ],
  visas: [
    {
      id: 'visa-saudi',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      subtitle: 'Tourist & Umrah Electronic Visa Services',
      processingTime: '24 to 48 Hours',
      validity: '1 Year (Multiple Entry, 90 days stay maximum)',
      fee: 140,
      requirements: [
        'Fast online passport scanning',
        'No complex bank statements required for standard e-Visas',
        'Valid for multiple entry tourism & spiritual Umrah'
      ],
      requiredDocuments: [
        'Clear color scanned biography page of Passport (Minimum 6-month validity)',
        'One digital professional photograph with white background',
        'Detailed current residency address and contact phone number',
        'Existing active email to receive official PDF electronic visa'
      ],
      explanation: 'Saudi Arabia now provides rapid e-Visa systems for global travellers. Our fast-track agency portal processes it in less than 48 hours with guaranteed medical insurance registration.'
    },
    {
      id: 'visa-turkey',
      country: 'Turkey',
      flag: '🇹🇷',
      subtitle: 'Sticker Class & Electronic Visa Processing',
      processingTime: '7 to 10 Working Days',
      validity: '180 Days (Single or Multiple Entry, 30 days stay max)',
      fee: 195,
      requirements: [
        'Thorough document checking and official embassy slot appointment booking',
        'Detailed professional background files submission support',
        'Official interview guidance'
      ],
      requiredDocuments: [
        'Original Physical Passport with at least two empty pages',
        'Biometric photo (35x45mm size) on matte paper',
        '6 Months certified active bank statement with healthy balance',
        'Profession proof details: Trade license for business, NOC form for job holders',
        'Detailed itinerary and confirmed airline reservation files'
      ],
      explanation: 'We handle the complete application flow for Turkish sticker visa, including professional appointment management, file arranging, invitation letters, and interview coaching to ensure maximum success rates.'
    },
    {
      id: 'visa-dubai',
      country: 'Dubai (UAE)',
      flag: '🇦🇪',
      subtitle: 'Tourist e-Visa Fast Processing Services',
      processingTime: '1 to 3 Working Days',
      validity: '30 or 60 Days (Single/Multiple Entry options)',
      fee: 110,
      requirements: [
        'Fully digital process, no embassy visits required',
        'All ages eligible, children require fast birth certificate translation scans',
        'High acceptance rate online'
      ],
      requiredDocuments: [
        'High-resolution passport cover and first page scan copy',
        'Passport size colored photograph with white backdrop',
        'Copy of National Identification (NID) or previous country visas if any',
        'Guarantee security deposit from the agency (Fully covered by TR Travel)'
      ],
      explanation: 'United Arab Emirates offers fully online e-Visas. TR Travel is an authorized sponsor agent, meaning we guarantee fast approval without high security deposit demands from your side.'
    },
    {
      id: 'visa-malaysia',
      country: 'Malaysia',
      flag: '🇲🇾',
      subtitle: 'eVisa & Sticker Submission Assistance',
      processingTime: '3 to 5 Working Days',
      validity: '3 Months (Single entry or Multiple Entry tourism)',
      fee: 85,
      requirements: [
        'Official online portal registration and document alignment',
        'Fast processing tracking and immediate query response',
        'NOC and institutional clearance checks'
      ],
      requiredDocuments: [
        'Passport scan showing biographical pages',
        'Recent studio photo with white backdrop strictly conform to Malaysian rules',
        'Last 3 months local bank statement proving travel expenses capacity',
        'Flight tickets return reference and hotel reservation certificate',
        'No Objection Certificate (NOC) or student ID template'
      ],
      explanation: 'Malaysian eVisa system requires precise document aspect ratios and specific bank statement formats. We provide free editing and prep tools to guarantee zero rejections due to formatting.'
    },
    {
      id: 'visa-thailand',
      country: 'Thailand',
      flag: '🇹🇭',
      subtitle: 'Tourist Entry Visa & Professional Consultancy',
      processingTime: '5 to 7 Working Days',
      validity: '3 to 6 Months (Single Entry)',
      fee: 95,
      requirements: [
        'Royal Thai Embassy physical matching of files',
        'Accurate asset valuation declarations guidance',
        'Hassle-free passport pick and drop support'
      ],
      requiredDocuments: [
        'Original Passport with minimum 6 months validity from travel date',
        'Two studio visa photos with light grey/white background',
        'Bank statement (6 Months) with seal, showing sufficient single/family balance',
        'Valid profession proof (Job certificate with NOC, trade license or student card)'
      ],
      explanation: 'We deliver comprehensive processing for Thai sticker visas directly with the consular office. Our specialists review your ledger balance and paperwork before submission.'
    },
    {
      id: 'visa-singapore',
      country: 'Singapore',
      flag: '🇸🇬',
      subtitle: 'Authorized ICA Electronic Visa Invitation Card',
      processingTime: '4 to 6 Working Days',
      validity: '9 Weeks Multiple Entry (Up to 30 days per entry)',
      fee: 80,
      requirements: [
        'Local Singaporean Citizen sponsor letter of invitation (Form 39A)',
        'Highly professional tracking of ICA portal submissions',
        'Full confirmation support'
      ],
      requiredDocuments: [
        'Complete scanned pages of Passport biography and details',
        'Two recent biometric photos with crisp resolution and matte finish',
        'Employment verification letters or high-status company incorporation papers',
        'Form 14A completely signed by the traveler'
      ],
      explanation: 'Singapore visas require an official local citizen or corporate sponsor located in Singapore. TR Travel provides this official corporate support directly, resulting in highly reliable, swift approvals for tourist groups.'
    }
  ],
  airlines: [
    { id: 1, name: "Biman Bangladesh Airlines", code: "BG", color: "border-emerald-600/30 hover:border-emerald-500", iconBg: "bg-emerald-600", textColor: "text-emerald-700", logoChar: "B", type: "domestic", rating: "4.5" },
    { id: 2, name: "US-Bangla Airlines", code: "BS", color: "border-blue-900/30 hover:border-blue-800", iconBg: "bg-blue-900", textColor: "text-blue-900", logoChar: "U", type: "domestic", rating: "4.6" },
    { id: 3, name: "NOVOAIR", code: "VQ", color: "border-blue-500/30 hover:border-blue-400", iconBg: "bg-blue-500", textColor: "text-blue-600", logoChar: "N", type: "domestic", rating: "4.4" },
    { id: 4, name: "Air Astra", code: "2A", color: "border-amber-500/30 hover:border-amber-400", iconBg: "bg-amber-500", textColor: "text-amber-600", logoChar: "A", type: "domestic", rating: "4.3" },
    { id: 5, name: "Emirates", code: "EK", color: "border-red-600/30 hover:border-red-500", iconBg: "bg-red-600", textColor: "text-red-600", logoChar: "E", type: "international", rating: "4.9" },
    { id: 6, name: "Singapore Airlines", code: "SQ", color: "border-indigo-950/30 hover:border-indigo-900", iconBg: "bg-indigo-950", textColor: "text-indigo-950", logoChar: "S", type: "international", rating: "4.9" },
    { id: 7, name: "Malaysia Airlines", code: "MH", color: "border-indigo-600/30 hover:border-indigo-500", iconBg: "bg-indigo-600", textColor: "text-indigo-700", logoChar: "M", type: "international", rating: "4.5" },
    { id: 8, name: "Qatar Airways", code: "QR", color: "border-rose-900/30 hover:border-rose-800", iconBg: "bg-rose-900", textColor: "text-rose-900", logoChar: "Q", type: "international", rating: "4.9" },
    { id: 9, name: "Saudia Airlines", code: "SV", color: "border-amber-700/30 hover:border-amber-600", iconBg: "bg-amber-700", textColor: "text-amber-800", logoChar: "S", type: "international", rating: "4.7" },
    { id: 10, name: "Air India", code: "AI", color: "border-orange-500/30 hover:border-orange-400", iconBg: "bg-orange-600", textColor: "text-orange-600", logoChar: "A", type: "international", rating: "4.2" },
    { id: 11, name: "Gulf Air", code: "GF", color: "border-yellow-600/30 hover:border-yellow-500", iconBg: "bg-yellow-600", textColor: "text-yellow-700", logoChar: "G", type: "international", rating: "4.4" },
    { id: 12, name: "Turkish Airlines", code: "TK", color: "border-red-700/30 hover:border-red-600", iconBg: "bg-red-700", textColor: "text-red-700", logoChar: "T", type: "international", rating: "4.8" },
    { id: 13, name: "Thai Airways International", code: "TG", color: "border-purple-800/30 hover:border-purple-700", iconBg: "bg-purple-800", textColor: "text-purple-800", logoChar: "T", type: "international", rating: "4.6" },
    { id: 14, name: "Cathay Pacific Airways", code: "CX", color: "border-teal-800/30 hover:border-teal-700", iconBg: "bg-teal-800", textColor: "text-teal-800", logoChar: "C", type: "international", rating: "4.8" },
    { id: 15, name: "China Southern Airlines", code: "CZ", code: "CZ", color: "border-sky-600/30 hover:border-sky-500", iconBg: "bg-sky-600", textColor: "text-sky-600", logoChar: "C", type: "international", rating: "4.4" },
    { id: 16, name: "SriLankan Airlines", code: "UL", color: "border-teal-600/30 hover:border-teal-500", iconBg: "bg-teal-600", textColor: "text-teal-600", logoChar: "S", type: "international", rating: "4.5" },
    { id: 17, name: "AirAsia", code: "AK", color: "border-red-500/30 hover:border-red-400", iconBg: "bg-red-500", textColor: "text-red-600", logoChar: "A", type: "international", rating: "4.4" },
    { id: 18, name: "Batik Air", code: "OD", color: "border-rose-700/30 hover:border-rose-600", iconBg: "bg-rose-700", textColor: "text-rose-700", logoChar: "B", type: "international", rating: "4.3" },
    { id: 19, name: "IndiGo", code: "6E", color: "border-cyan-800/30 hover:border-cyan-700", iconBg: "bg-cyan-800", textColor: "text-cyan-800", logoChar: "I", type: "international", rating: "4.5" },
    { id: 20, name: "Air Arabia", code: "G9", color: "border-red-800/30 hover:border-red-700", iconBg: "bg-red-800", textColor: "text-red-800", logoChar: "A", type: "international", rating: "4.4" }
  ],
  gallery: [
    { id: 1, url: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=700&q=80", title: "Spiritual Devotion inside Masjid al-Haram", location: "Makkah, Saudi Arabia", tag: "Umrah", aspectClass: "h-80" },
    { id: 2, url: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=700&q=80", title: "Magical Sunrise Ballooning over Historic Valleys", location: "Cappadocia, Turkey", tag: "Cultural Tour", aspectClass: "h-96" },
    { id: 3, url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80", title: "The Breathtaking Futuristic Marina Skyline", location: "Dubai, UAE", tag: "Sightseeing", aspectClass: "h-72" },
    { id: 4, url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=700&q=80", title: "Fishermen Sailboat Cruise on Cox\'s Bazar", location: "Cox's Bazar, Bangladesh", tag: "Nature", aspectClass: "h-96" },
    { id: 5, url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=700&q=80", title: "Sunset glow on the Twin Towers", location: "Kuala Lumpur, Malaysia", tag: "City Life", aspectClass: "h-80" },
    { id: 6, url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=700&q=80", title: "Spiritual Traditional Temples of Siam", location: "Bangkok, Thailand", tag: "Religious Landmarks", aspectClass: "h-72" },
    { id: 7, url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=700&q=80", title: "Gardens by the Bay Supertree Light Show", location: "Marina Bay Sands, Singapore", tag: "Adventure", aspectClass: "h-96" },
    { id: 8, url: "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=700&q=80", title: "Emerald Slopes of Sreemangal Estate", location: "Sylhet, Bangladesh", tag: "Nature", aspectClass: "h-80" }
  ],
  about: {
    eyebrow: 'Our Heritage',
    title: 'Honoring Trust, Delivering Luxury Adventures',
    intro: [
      'Formed in Dhaka, Bangladesh, with a burning commitment to rectify standard tour-group overpromising, TR Travel has emerged as the country\'s gold standard for premium leisure and holy voyages.',
      'We do not act as secondary brokers. Rather, we command absolute direct wholesale hotel contracts, dedicated executive land fleets, and high-speed train quotas inside the destinations.'
    ],
    highlights: ['Government Authorized Agency', 'Approved IATA Global Code', 'Over 15,000+ Happy Pilgrims', '24/7 Dedicated Ground Crew'],
    mission: {
      title: 'To Demystify Standard Group Tours',
      description: 'Our mission is providing fully transparent travel deliverables, eliminating hidden costs, and establishing absolute elite luxury stay conditions that physical flyers and pilgrims expect.'
    },
    vision: {
      title: 'A Globally Synchronized Agency Ecosystem',
      description: 'We envision a synchronized digital ecosystem ensuring Bangladeshi travellers secure immediate visa permits, top-tier airline tickets, and flawless, personalized ground guidance in seconds.'
    },
    values: {
      title: 'Loyalty, Directness & Respect',
      description: 'We maintain deep spiritual reverence during holy operations, radical honesty about distances to physical steps, and ultimate respect for every traveler’s lifetime resources.'
    },
    team: []
  },
  contact: {
    eyebrow: 'Get In Touch',
    title: 'Connect With Our Tour Specialists',
    description: 'Connect via phone, email, or schedule an in-person meeting. Select an office down below to synchronize structural coordinates, hotlines, and instant WhatsApp support numbers.',
    offices: {
      dhaka: {
        address: 'Suites 405-407, Landmark Tower, Road 11, Banani C/A, Dhaka-1213, Bangladesh',
        phone: '+880 1712-345678',
        hotline: '+880 9612-TRTRAVEL',
        email: 'dhaka.desk@trtravel.com',
        latitude: '23.7937° N',
        longitude: '90.4066° E'
      },
      makkah: {
        address: 'Tower 3, King Abdul Aziz Endowment Clock Tower, Abraj Al Bait, Makkah, Saudi Arabia',
        phone: '+966 50 123 4567',
        hotline: '+966 12 570 0000',
        email: 'makkah.desk@trtravel.com',
        latitude: '21.4192° N',
        longitude: '39.8263° E'
      }
    },
    formTitle: 'Submit Direct Travel Inquiry'
  },
  navbar: {
    brand: 'TR TRAVEL',
    tagline: 'Premium Expeditions',
    phone: '+880 1712-345678 (Dhaka)',
    email: 'info@trtravel.com'
  },
  footer: {
    description: 'Fully approved Ministry of Religious Affairs Pilgrimage sponsor and designated IATA Travel Broker. Curating elite journeys for generations.',
    newsletterTitle: 'Newsletter Despatch',
    copyright: '© 2026 TR Travel. All Rights Reserved Worldwide.'
  }
};

let inMemoryContent = null;

const seedContent = () => {
  if (inMemoryContent) return inMemoryContent;
  inMemoryContent = defaultContent;
  return inMemoryContent;
};

const getSiteContent = async (req, res) => {
  try {
    if (process.env.MONGO_URI) {
      const document = await ContentModel.findOne({ name: 'site-content' }).lean();
      if (document) {
        return res.json({ success: true, data: document.sections });
      }

      const created = await ContentModel.create({ name: 'site-content', sections: defaultContent });
      return res.json({ success: true, data: created.sections });
    }

    const content = seedContent();
    return res.json({ success: true, data: content });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to load content', error: error.message });
  }
};

const updateSiteContent = async (req, res) => {
  try {
    const payload = req.body || {};

    if (process.env.MONGO_URI) {
      const updated = await ContentModel.findOneAndUpdate(
        { name: 'site-content' },
        { $set: { sections: payload, updatedAt: new Date() } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).lean();
      return res.json({ success: true, data: updated.sections });
    }

    inMemoryContent = payload;
    return res.json({ success: true, data: payload });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to save content', error: error.message });
  }
};

const resetSiteContent = async (req, res) => {
  try {
    if (process.env.MONGO_URI) {
      const updated = await ContentModel.findOneAndUpdate(
        { name: 'site-content' },
        { $set: { sections: defaultContent, updatedAt: new Date() } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).lean();
      return res.json({ success: true, data: updated.sections });
    }

    inMemoryContent = defaultContent;
    return res.json({ success: true, data: inMemoryContent });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to reset content', error: error.message });
  }
};

module.exports = { getSiteContent, updateSiteContent, resetSiteContent };
