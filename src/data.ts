import { VehicleDetails, ServicePackage, AddOnService, FAQItem } from './types';

export const VEHICLE_TYPES: VehicleDetails[] = [
  {
    id: 'sedan',
    name: 'Coupe / Sedan',
    priceMultiplier: 0, // No extra cost
    sizeCategory: 'Compact / Mid-Size',
    description: 'Perfect for standard cars, 2-doors, hatchbacks, and executive sedans.'
  },
  {
    id: 'suv',
    name: 'Crossover / Standard SUV',
    priceMultiplier: 35, // +$35
    sizeCategory: 'Medium / Two-Row SUV',
    description: 'Perfect for compact SUVs, compact crossovers, and mid-size family transporters.'
  },
  {
    id: 'truck',
    name: 'Truck / Large SUV / Van',
    priceMultiplier: 60, // +$60
    sizeCategory: 'Large / Three-Row / Commercial',
    description: 'Perfect for lifted trucks, 3-row SUVs, crew cabs, and full-sized passenger vans.'
  }
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'eco-essential',
    name: 'Eco Essential Detail',
    priceBase: 120,
    durationMinutes: 90,
    tag: 'Budget Friendly',
    shortDescription: 'Eco-conscious chemical-free steam sanitize + gentle outer polymer protection. Over 40 gallons of water saved.',
    features: [
      'Biodegradable exterior waterless / steam wash',
      'Ultra-plush scratch-free micro-fiber hand wipe',
      'Tire cleaning & non-sling natural dressing & wheel shine',
      'Full interior deep vacuum (seats, carpets, floor mats)',
      'High-pressure steam-wipe of dash, console & door panels',
      'Steam sanitation of high-touch contact surfaces',
      'Streak-free interior + exterior window polish',
      'High-performance polymer sealant coat (60-day coat)'
    ],
    recommendedFor: 'Drivers seeking a regular premium maintenance wash that is protective and heavy on sanitation.'
  },
  {
    id: 'ngreen-signature',
    name: 'Green Car Detailing Signature Setup',
    priceBase: 240,
    durationMinutes: 180,
    tag: 'Most Popular',
    shortDescription: 'Deep microscopic carpet extraction, leather conditioning, clay bar outer rejuvenation & organic carnauba paste wax with complimentary organic scent infusion.',
    features: [
      'Everything in Eco Essential package included',
      'Exterior optical clay bar & iron decontamination treatment',
      'Chemical-free engine bay steam wipe-down & dressing',
      'Hot-water high-temp carpet extraction (removes deep stains & odors)',
      'Premium leather scrub, pH-balancing & organic aloe conditioning',
      'Choose one of our handcrafted premium organic cabin scents',
      'Fabric protection guard defense treatment (shields future spills)',
      'Detailed cleaning of exhaust tips, wheel wells and chrome trim',
      'Hand-applied raw Brazilian Carnauba paste wax coat (180-day gloss)'
    ],
    recommendedFor: 'Vehicles that need deep restoration of carpets/leather or want that stunning wet-look carnauba reflection with long-lasting premium botanical freshness.'
  },
  {
    id: 'showroom-ceramic',
    name: 'Showroom Ceramic Reset',
    priceBase: 495,
    durationMinutes: 360,
    tag: 'Elite Protection',
    shortDescription: 'Ultimate protection bundle. Includes 1-stage machine paint corrective polish and full professional Graphene/Ceramic Coating with premium organic aroma lock.',
    features: [
      'Everything in Green Car Detailing Signature package included',
      'Deep exterior paint solvent wipe & chemical preparation prep',
      'Single-stage dual-action machine paint polish (removes 75%+ of light swirls)',
      'Microscopic paint thickness inspections prior to polishing',
      'Professional 2-year Graphene Oxide infused Ceramic Coating coat',
      'Ceramic coating coating of outer glass windshield (rain repellent)',
      'Wheel barrels ceramic coat & anti-dust protective coating',
      'Ozone interior shock treatment (deodorizes & eliminates 99.9% of bacteria)',
      'Deep organic plant-based custom oil scent diffuser setup'
    ],
    recommendedFor: 'Automotive enthusiasts, luxury cars, or daily drivers wanting permanent hydrophobic self-cleaning coats and deep glass shine.'
  }
];

export interface ScentDetails {
  id: string;
  name: string;
  intensity: 'Subtle' | 'Moderate' | 'Rich';
  notes: string;
  description: string;
}

export const ORGANIC_SCENTS: ScentDetails[] = [
  {
    id: 'lavender-mint',
    name: 'French Lavender & Forest Mint',
    intensity: 'Moderate',
    notes: 'Soothing floral notes backed by crisp botanical mint',
    description: '100% steam-distilled French lavender flower buds blended with cooling organic peppermint leaves. Perfect for reducing driving stress.'
  },
  {
    id: 'citrus-bloom',
    name: 'Cold-Pressed Sweet Orange & Grapefruit',
    intensity: 'Rich',
    notes: 'Sunny, vibrant citrus explosion and fresh tree sap',
    description: 'Cold-extracted oil from organic ripe Florida oranges and sweet ruby grapefruit tags. Energizing, bright, and neutralizes pet hair odors.'
  },
  {
    id: 'evergreen-cedar',
    name: 'Cascadian Pine & Himalayan Cedarwood',
    intensity: 'Moderate',
    notes: 'Subtle earthiness, crushed evergreen pine needles, deep balsam wood',
    description: 'Hand-pressed pinene resin and rich cedar oil extract. Evokes an early morning pacific northwest alpine forest cabin cabin ambiance.'
  },
  {
    id: 'aloe-cucumber',
    name: 'Pure Organic Aloe & Crisp Melon',
    intensity: 'Subtle',
    notes: 'Preternaturally clean, watery, allergen-free mountain air',
    description: 'A delicate hydration-inspired fragrance of freshly cut cucumber and skin-nourishing organic aloe vera. Exceptionally light.'
  },
  {
    id: 'amber-vanilla',
    name: 'Warm Amber & Organic Madagascar Vanilla',
    intensity: 'Rich',
    notes: 'Creamy sweet vanilla orchid, honeyed amber glaze, light patchouli',
    description: 'Premium absolute vanillin bean distillate blended with golden amber resins. Warm, luxurious, reminiscent of hand-stitched premium classic leather cabin luxury.'
  },
  {
    id: 'pure-unscented',
    name: 'Active Charcoal Oxygen Reset (Unscented)',
    intensity: 'Subtle',
    notes: 'Unscented, sterile purity, absolute absence of background odor',
    description: 'Perfect for drivers with severe chemical allergies. We run high-density activated carbon pellets to strip out all background odors without adding anything back.'
  }
];

export const ADD_ON_SERVICES: AddOnService[] = [
  {
    id: 'pet-hair',
    name: 'Extreme Pet Hair Extraction',
    price: 45,
    durationMinutes: 45,
    description: 'We use specialized pet-hair scrapers and static brushes to extract deeply embedded dog & cat fur.',
    category: 'interior'
  },
  {
    id: 'engine-steam',
    name: 'Engine Bay Deep Steam Degreasing',
    price: 60,
    durationMinutes: 45,
    description: 'Safe eco-friendly high-temp vapor steam is used to melt motor grime, oil deposits and restore plastics.',
    category: 'exterior'
  },
  {
    id: 'headlight-resto',
    name: 'Oxidized Headlight Restoration',
    price: 50,
    durationMinutes: 60,
    description: 'Multi-stage wet sanding, compound polishing, and professional clear coat UV shield application.',
    category: 'exterior'
  },
  {
    id: 'ozone-shock',
    name: 'Ozone Machine Odor Lock',
    price: 40,
    durationMinutes: 30,
    description: 'Medical-grade ozone generators disintegrate smoke, pet, and biological scent molecules at the root.',
    category: 'interior'
  },
  {
    id: 'leather-ceramic',
    name: 'Premium Leather Ceramic Shield',
    price: 75,
    durationMinutes: 45,
    description: 'Hydrophobic coating applied to all seats to resist jean dye transfer, spill stains, and cracking.',
    category: 'protection'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    category: 'exterior',
    title: 'Multi-Stage Paint Correction & Polish',
    subtitle: 'Dodge Challenger SRT Hellcat - Pitch Black',
    beforeUrl: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&q=80&w=600',
    afterUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600',
    beforeDesc: 'Heavy swirl marks, spiderwebs, dull paint reflection.',
    afterDesc: 'Glass-like 99% mirror finish. Swirls completely removed in our premium Chicago studio.'
  },
  {
    id: 'gal-2',
    category: 'interior',
    title: 'Hot Water Extraction Carpet Clean & Reset',
    subtitle: 'Tesla Model Y Tan Leather - Mojave Desert Trail Spec',
    beforeUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
    afterUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=600',
    beforeDesc: 'Dark mud stains, organic spills, general gray soil.',
    afterDesc: 'Spotless deep sanitation. Premium leather nourishment with a pure California coastline feel.'
  },
  {
    id: 'gal-3',
    category: 'exterior',
    title: 'Graphene Ceramic Gloss Reflection',
    subtitle: 'Corvette Z06 - Michigan Shoreline Edition',
    beforeUrl: 'https://images.unsplash.com/photo-1617469767053-d3b508a0d84d?auto=format&fit=crop&q=80&w=600',
    afterUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600',
    beforeDesc: 'Flat matte, minor water etching from harsh storms.',
    afterDesc: 'Deep metallic flakes popping. Ultimate water beading shield designed for rugged American highways.'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'What makes Green Car Detailing eco-friendly?',
    answer: 'Traditional detailing shops waste 50 to 100 gallons of toxic soapy water per vehicle that runs straight into storm drains. At Green Car Detailing, we utilize state-of-the-art dry-vapor steam extraction and eco-polymer systems which use less than 2 gallons of water per car! Our cleaners are 100% biological, biodegradable, toxic-free and paint-safe. We also exclusively premium-infuse with organic plant-based essential scents and natural fresheners.',
    category: 'Method'
  },
  {
    question: 'How long do these detailing services take?',
    answer: 'Typical times range: Eco Essential is around 1.5 hours, Green Car Detailing Signature Setup takes 3 hours, and our comprehensive Showroom Ceramic Paint Restoration package takes 5 to 7 hours of dedicated hand crafting. We advise planning ahead or utilizing our comfortable lounge. You are also welcome to call us anytime at +1 (773) 335 - 5446 to discuss specific scheduling.',
    category: 'Booking'
  },
  {
    question: 'Will steam cleaning damage any interior electronics or materials?',
    answer: 'Not at all. We utilize medical-grade low-moisture "dry" vapor steam. It naturally dissolves grime and kills 99.9% of bacteria/mites instantly, but contains only 4-6% water content, making it exceptionally safe for sensitive electronics, navigation screens, premium leather, and headliners.',
    category: 'Method'
  },
  {
    question: 'What is Ceramic Graphene Coating and is it worth it?',
    answer: 'Yes, absolutely! Unlike temporary waxes that wash away in weeks, a Ceramic/Graphene Graphene Oxide Coating creates a permanent crystalline covalent bond over your paint. It acts as an ultra-hard second clear coat that repels bird droppings, road salt, mud, UV fading, and creates unmatched self-cleaning traits (water simply sheets right off).',
    category: 'Protection'
  },
  {
    question: 'Do you offer mobile detailing, or must I drop off my vehicle?',
    answer: 'We currently run a climate-controlled state-of-the-art detailing studio at our core location. This allows us to guarantee perfect clean air flow, UV-curing lighting, and dust-free surroundings crucial for pristine coating applications and claying. Feel free to use our simple online system to book a slot, or call +1 (773) 335 - 5446 to arrange special pick-ups!',
    category: 'Booking'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    authorName: 'Marcus Thorne',
    rating: 5,
    comment: 'The excellent service at Green Car Detailing is in a league of its own. My Corvette came back looking better than showroom condition. Their laser-focused attention to detail on the chrome trim and wheel wells was incredible. Pure custom satisfaction, through and through!',
    date: '2026-05-12',
    serviceType: 'Green Car Detailing Signature Setup',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'rev-2',
    authorName: 'Elena Rostova',
    rating: 5,
    comment: 'With children and dogs, my SUV interior was a nightmare. The team provided an excellent service, cleaning every crack and crevice. What stands out most is their absolute customer satisfaction guarantee and meticulous attention to detail. No harsh chemicals, only a lovely organic mint lavender freshener scent that feels so incredibly light and fresh!',
    date: '2026-05-19',
    serviceType: 'Eco Essential with Organic Scent Choice',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'rev-3',
    authorName: 'David K. Liu',
    rating: 5,
    comment: 'Outstanding attention to detail on my Tesla! I opted for the ceramic coating, and their craftsmanship is second to none. They even treated me to their Cascadian Pine & Cedarwood organic freshener. If you want maximum satisfaction and stellar customer care, Green Car Detailing is the gold standard.',
    date: '2026-05-22',
    serviceType: 'Showroom Ceramic Reset',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
  }
];
