export const PRODUCTS = [
  {
    id: "lumera-arc",
    name: "GRAND OPTICALS ARC",
    subtitle: "Architectural Hexagonal Titanium Frame",
    category: "Eyeglasses",
    price: 2850,
    oldPrice: 3400,
    rating: 4.9,
    reviews: 128,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    gender: "Unisex",
    frameShape: "Geometric",
    frameSize: "Medium",
    rimType: "Full Rim",
    style: "Minimal",
    material: "Japanese Titanium & Bio-Acetate",
    description: "Sculpted from ultralight aerospace-grade Japanese titanium, the ARC redefines classic geometric silhouettes with whisper-thin rims and custom hand-finished chamfered temples.",
    details: {
      lensWidth: "51 mm",
      bridgeWidth: "19 mm",
      templeLength: "145 mm",
      frameWidth: "138 mm",
      weight: "14.2 g",
      origin: "Sabae, Japan"
    },
    colors: [
      { name: "Muted Gold", hex: "#C5A880", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85" },
      { name: "Charcoal Black", hex: "#1A1A1A", image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f68?auto=format&fit=crop&w=1000&q=85" },
      { name: "Silver Frost", hex: "#D8D8D8", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Oval", "Round", "Heart"]
  },
  {
    id: "lumera-noir",
    name: "GRAND OPTICALS NOIR",
    subtitle: "High-Density Sculpted Bio-Acetate",
    category: "Sunglasses",
    price: 3200,
    oldPrice: 3800,
    rating: 4.95,
    reviews: 214,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    gender: "Unisex",
    frameShape: "Square",
    frameSize: "Large",
    rimType: "Full Rim",
    style: "Bold",
    material: "Hand-polished Mazzucchelli Bio-Acetate",
    description: "An unapologetic silhouette featuring bold beveled bevels, hand-polished Italian acetate, and Zeiss polarized dark tint lenses with anti-reflective back coating.",
    details: {
      lensWidth: "54 mm",
      bridgeWidth: "20 mm",
      templeLength: "148 mm",
      frameWidth: "146 mm",
      weight: "26.5 g",
      origin: "Cadore, Italy"
    },
    colors: [
      { name: "Deep Charcoal", hex: "#121212", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85" },
      { name: "Havana Tortoise", hex: "#6D4C41", image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85" },
      { name: "Smoky Olive", hex: "#4A5342", image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Oval", "Round", "Diamond"]
  },
  {
    id: "lumera-vista",
    name: "GRAND OPTICALS VISTA",
    subtitle: "Featherweight Pantos Optical Frame",
    category: "Eyeglasses",
    price: 2600,
    oldPrice: 3100,
    rating: 4.88,
    reviews: 96,
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    gender: "Unisex",
    frameShape: "Round",
    frameSize: "Medium",
    rimType: "Full Rim",
    style: "Classic",
    material: "Beta-Titanium & Warm Tortoise Inlay",
    description: "A tribute to mid-century intellectual aesthetics, re-engineered for the digital era with ergonomic silicone nose pads and custom titanium core wire.",
    details: {
      lensWidth: "48 mm",
      bridgeWidth: "21 mm",
      templeLength: "142 mm",
      frameWidth: "135 mm",
      weight: "12.8 g",
      origin: "Sabae, Japan"
    },
    colors: [
      { name: "Champagne Tortoise", hex: "#A67C52", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=85" },
      { name: "Polished Gold", hex: "#D4AF37", image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=85" },
      { name: "Obsidian Black", hex: "#1A1A1A", image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f68?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Square", "Oblong", "Diamond"]
  },
  {
    id: "lumera-sol",
    name: "GRAND OPTICALS SOL",
    subtitle: "Modernist Aviator with Amber Tint Lenses",
    category: "Sunglasses",
    price: 3450,
    oldPrice: 3950,
    rating: 4.92,
    reviews: 167,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    gender: "Men",
    frameShape: "Aviator",
    frameSize: "Large",
    rimType: "Full Rim",
    style: "Vintage",
    material: "Surgical Stainless Steel & 18k Gold Plating",
    description: "An evocative dual-bridge navigator silhouette rendered in brushed 18k gold vermeil and warm amber high-contrast photochromic lenses.",
    details: {
      lensWidth: "56 mm",
      bridgeWidth: "16 mm",
      templeLength: "145 mm",
      frameWidth: "144 mm",
      weight: "18.4 g",
      origin: "Berlin, Germany"
    },
    colors: [
      { name: "Brushed Gold / Amber", hex: "#C5A880", image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85" },
      { name: "Matte Black / Smoke", hex: "#222222", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85" },
      { name: "Palladium / Forest Green", hex: "#7E8D85", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Square", "Oval", "Heart"]
  },
  {
    id: "lumera-muse",
    name: "GRAND OPTICALS MUSE",
    subtitle: "Refined Sculptural Cat-Eye Optical",
    category: "Eyeglasses",
    price: 2950,
    oldPrice: 3400,
    rating: 4.96,
    reviews: 189,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    gender: "Women",
    frameShape: "Cat Eye",
    frameSize: "Medium",
    rimType: "Full Rim",
    style: "Trendy",
    material: "Hand-carved Bio-Acetate & Rose Gold Inset",
    description: "Subtly upturned corners create an uplifting, graceful lift. Designed with balanced proportions for all-day comfort during creative focus.",
    details: {
      lensWidth: "52 mm",
      bridgeWidth: "17 mm",
      templeLength: "140 mm",
      frameWidth: "139 mm",
      weight: "16.1 g",
      origin: "Cadore, Italy"
    },
    colors: [
      { name: "Champagne Crystal", hex: "#E8D8C8", image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=85" },
      { name: "Onyx Black", hex: "#141414", image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f68?auto=format&fit=crop&w=1000&q=85" },
      { name: "Rose Quartz", hex: "#D6B4B4", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Round", "Oval", "Square"]
  },
  {
    id: "lumera-form",
    name: "GRAND OPTICALS FORM",
    subtitle: "Ultra-Minimalist Rimless Optical Wire",
    category: "Eyeglasses",
    price: 3100,
    oldPrice: 3600,
    rating: 4.87,
    reviews: 74,
    isFeatured: true,
    isNew: false,
    isBestSeller: false,
    gender: "Unisex",
    frameShape: "Rectangle",
    frameSize: "Small",
    rimType: "Rimless",
    style: "Minimal",
    material: "Memory Beta-Titanium (9.8g)",
    description: "Pure vision unhindered by frames. Featuring screwless titanium compression mounts and custom polished diamond-edge lens facets.",
    details: {
      lensWidth: "50 mm",
      bridgeWidth: "18 mm",
      templeLength: "145 mm",
      frameWidth: "132 mm",
      weight: "9.8 g",
      origin: "Sabae, Japan"
    },
    colors: [
      { name: "Silver Chrome", hex: "#E0E0E0", image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f68?auto=format&fit=crop&w=1000&q=85" },
      { name: "Raw Titanium", hex: "#8E8D8A", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85" },
      { name: "Pale Gold", hex: "#E5D3B3", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f68?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Heart", "Oval", "Oblong"]
  },
  {
    id: "lumera-aura",
    name: "GRAND OPTICALS AURA",
    subtitle: "Translucent Crystal Round Silhouette",
    category: "Eyeglasses",
    price: 2700,
    oldPrice: 3100,
    rating: 4.93,
    reviews: 142,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    gender: "Unisex",
    frameShape: "Round",
    frameSize: "Medium",
    rimType: "Full Rim",
    style: "Trendy",
    material: "High-Clarity Plant-Based Bio-Acetate",
    description: "Captures natural ambient light through luminous transparent acetate contours, offset by gold-wire core detailing visible through the temples.",
    details: {
      lensWidth: "49 mm",
      bridgeWidth: "20 mm",
      templeLength: "145 mm",
      frameWidth: "136 mm",
      weight: "17.3 g",
      origin: "Cadore, Italy"
    },
    colors: [
      { name: "Crystal Clear", hex: "#F3F3F3", image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=85" },
      { name: "Smoky Amber", hex: "#B8860B", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=85" },
      { name: "Pale Sage", hex: "#9CAF88", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Square", "Rectangle", "Oblong"]
  },
  {
    id: "lumera-eclipse",
    name: "GRAND OPTICALS ECLIPSE",
    subtitle: "Over-Sized Monolithic Shield Sunglasses",
    category: "Sunglasses",
    price: 3600,
    oldPrice: 4200,
    rating: 4.91,
    reviews: 83,
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    gender: "Unisex",
    frameShape: "Square",
    frameSize: "Large",
    rimType: "Full Rim",
    style: "Bold",
    material: "Hand-milled Monolithic Acetate & Metal Bridges",
    description: "An avant-garde runway statement with flush flat-top bridge geometry and deep pitch-black mirror lenses designed for high glare resistance.",
    details: {
      lensWidth: "58 mm",
      bridgeWidth: "15 mm",
      templeLength: "148 mm",
      frameWidth: "149 mm",
      weight: "29.0 g",
      origin: "Berlin, Germany"
    },
    colors: [
      { name: "Pitch Black", hex: "#0A0A0A", image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1000&q=85" },
      { name: "Marble White", hex: "#EAEAEA", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85" },
      { name: "Dark Havana", hex: "#4E3629", image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Oval", "Round", "Diamond"]
  },
  {
    id: "lumera-strata",
    name: "GRAND OPTICALS STRATA",
    subtitle: "Clubmaster-Inspired Semi-Rimless Optical",
    category: "Eyeglasses",
    price: 2750,
    oldPrice: 3200,
    rating: 4.89,
    reviews: 110,
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
    gender: "Men",
    frameShape: "Rectangle",
    frameSize: "Medium",
    rimType: "Half Rim",
    style: "Professional",
    material: "Hand-finished Acetate Brow & Titanium Rim",
    description: "A tailored executive profile combining a rich acetate browline with lightweight titanium lens wire, conveying effortless authority and poise.",
    details: {
      lensWidth: "52 mm",
      bridgeWidth: "19 mm",
      templeLength: "145 mm",
      frameWidth: "140 mm",
      weight: "16.8 g",
      origin: "Sabae, Japan"
    },
    colors: [
      { name: "Ebony & Gold", hex: "#1C1C1C", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=85" },
      { name: "Tortoise & Gunmetal", hex: "#5C4033", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1591076482161-42ce6da69f68?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Round", "Oval", "Heart"]
  },
  {
    id: "lumera-helios",
    name: "GRAND OPTICALS HELIOS",
    subtitle: "Round Wire Sunglasses with Gradient Glass",
    category: "Sunglasses",
    price: 3300,
    oldPrice: 3800,
    rating: 4.94,
    reviews: 153,
    isFeatured: false,
    isNew: true,
    isBestSeller: true,
    gender: "Unisex",
    frameShape: "Round",
    frameSize: "Small",
    rimType: "Full Rim",
    style: "Vintage",
    material: "Solid Sterling Silver Plated Monel",
    description: "Inspired by 1970s Riviera style, featuring filigree engraving along the perimeter and warm terracotta gradient mineral glass lenses.",
    details: {
      lensWidth: "48 mm",
      bridgeWidth: "22 mm",
      templeLength: "145 mm",
      frameWidth: "134 mm",
      weight: "15.0 g",
      origin: "Cadore, Italy"
    },
    colors: [
      { name: "Vintage Gold", hex: "#D4AF37", image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85" },
      { name: "Antique Silver", hex: "#B0B0B0", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Square", "Oblong", "Diamond"]
  },
  {
    id: "lumera-veil",
    name: "GRAND OPTICALS VEIL",
    subtitle: "Slimline Oval Bio-Acetate Optical",
    category: "Eyeglasses",
    price: 2650,
    oldPrice: 3000,
    rating: 4.86,
    reviews: 62,
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
    gender: "Women",
    frameShape: "Oval",
    frameSize: "Small",
    rimType: "Full Rim",
    style: "Minimal",
    material: "Ultra-compact Cellulose Acetate",
    description: "An elongated oval shape that flatters angular bone structure, featuring custom integrated spring barrel hinges for enduring fit.",
    details: {
      lensWidth: "47 mm",
      bridgeWidth: "19 mm",
      templeLength: "140 mm",
      frameWidth: "130 mm",
      weight: "14.5 g",
      origin: "Cadore, Italy"
    },
    colors: [
      { name: "Warm Taupe", hex: "#9E9285", image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=85" },
      { name: "Midnight Navy", hex: "#1C2833", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Square", "Diamond", "Oblong"]
  },
  {
    id: "lumera-optic-daily",
    name: "GRAND OPTICALS AQUA 1-DAY",
    subtitle: "Breathable Bio-Hydrogel Daily Lenses (30 Pack)",
    category: "Contact Lenses",
    price: 1499,
    oldPrice: 1899,
    rating: 4.97,
    reviews: 320,
    isFeatured: false,
    isNew: true,
    isBestSeller: true,
    gender: "Unisex",
    frameShape: "Round",
    frameSize: "Medium",
    rimType: "Rimless",
    style: "Minimal",
    material: "78% Water Content Bio-Silicone Hydrogel",
    description: "Ultra-breathable daily disposable contact lenses with sustained smart moisture cushion technology that keeps eyes clear and hydrated for 18+ hours.",
    details: {
      lensWidth: "14.2 mm",
      bridgeWidth: "8.5 mm BC",
      templeLength: "N/A",
      frameWidth: "30 lenses/box",
      weight: "50 g",
      origin: "Yokohama, Japan"
    },
    colors: [
      { name: "Pure Aqua (Clear)", hex: "#87CEEB", image: "https://images.unsplash.com/photo-1587304052726-11f87cb51a37?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1587304052726-11f87cb51a37?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Oval", "Round", "Square", "Heart", "Diamond", "Oblong"]
  },
  {
    id: "lumera-serene-monthly",
    name: "GRAND OPTICALS AIR-MOIST MONTHLY",
    subtitle: "High Dk/t Extended Wear Silicone Contacts (6 Pack)",
    category: "Contact Lenses",
    price: 1999,
    oldPrice: 2499,
    rating: 4.92,
    reviews: 184,
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
    gender: "Unisex",
    frameShape: "Round",
    frameSize: "Medium",
    rimType: "Rimless",
    style: "Classic",
    material: "Next-Gen Phosphorylcholine Hydrogel",
    description: "Designed for screen workers with anti-dryness lipid envelope shielding against blue-light eye strain and fatigue.",
    details: {
      lensWidth: "14.0 mm",
      bridgeWidth: "8.6 mm BC",
      templeLength: "N/A",
      frameWidth: "6 lenses/box (6 Months)",
      weight: "60 g",
      origin: "Zurich, Switzerland"
    },
    colors: [
      { name: "Ice Blue Tint", hex: "#B0E0E6", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1587304052726-11f87cb51a37?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Oval", "Round", "Square", "Heart", "Diamond", "Oblong"]
  },
  {
    id: "lumera-terra",
    name: "GRAND OPTICALS TERRA",
    subtitle: "Thick-Rimmed Geometric Square Frame",
    category: "Eyeglasses",
    price: 2900,
    oldPrice: 3300,
    rating: 4.85,
    reviews: 94,
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
    gender: "Men",
    frameShape: "Square",
    frameSize: "Large",
    rimType: "Full Rim",
    style: "Professional",
    material: "Recycled Bio-Polished Cellulose",
    description: "A commanding presence for creative directors and architects. Crisp beveling with brushed stainless hardware.",
    details: {
      lensWidth: "53 mm",
      bridgeWidth: "20 mm",
      templeLength: "147 mm",
      frameWidth: "143 mm",
      weight: "22.4 g",
      origin: "Cadore, Italy"
    },
    colors: [
      { name: "Matte Umber", hex: "#5D4037", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85" },
      { name: "Graphite", hex: "#37474F", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Round", "Oval", "Diamond"]
  },
  {
    id: "lumera-zephyr",
    name: "GRAND OPTICALS ZEPHYR",
    subtitle: "Ultra-Curved Wrap Sport Luxury Sunglasses",
    category: "Sunglasses",
    price: 3750,
    oldPrice: 4400,
    rating: 4.98,
    reviews: 140,
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    gender: "Unisex",
    frameShape: "Aviator",
    frameSize: "Large",
    rimType: "Full Rim",
    style: "Trendy",
    material: "TR-90 Polymer & Magnesium Alloys",
    description: "Speed-inspired aerodynamic wrap sunglasses crafted for high-motion lifestyles without sacrificing sartorial elegance.",
    details: {
      lensWidth: "62 mm",
      bridgeWidth: "14 mm",
      templeLength: "135 mm",
      frameWidth: "148 mm",
      weight: "21.0 g",
      origin: "Munich, Germany"
    },
    colors: [
      { name: "Liquid Chrome / Silver Flash", hex: "#E5E7EB", image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85" },
      { name: "Stealth Black", hex: "#111827", image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Square", "Heart", "Oval"]
  },
  {
    id: "lumera-prism",
    name: "GRAND OPTICALS PRISM",
    subtitle: "Octagonal Polished Gold Wire Frame",
    category: "Eyeglasses",
    price: 2950,
    oldPrice: 3400,
    rating: 4.91,
    reviews: 105,
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
    gender: "Women",
    frameShape: "Geometric",
    frameSize: "Medium",
    rimType: "Full Rim",
    style: "Trendy",
    material: "14k Gold Dipped Titanium",
    description: "Prismatic eight-sided optics that catch room lighting with subtle brilliance, providing an elegant uplift to everyday office wear.",
    details: {
      lensWidth: "50 mm",
      bridgeWidth: "19 mm",
      templeLength: "143 mm",
      frameWidth: "137 mm",
      weight: "13.6 g",
      origin: "Sabae, Japan"
    },
    colors: [
      { name: "Pale Gold", hex: "#D4AF37", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85" },
      { name: "Rose Vermeil", hex: "#C49A88", image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Round", "Oval", "Heart"]
  },
  {
    id: "lumera-nocturne",
    name: "GRAND OPTICALS NOCTURNE",
    subtitle: "D-Frame Cat-Eye Dark Sunglasses",
    category: "Sunglasses",
    price: 3150,
    oldPrice: 3600,
    rating: 4.88,
    reviews: 87,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    gender: "Women",
    frameShape: "Cat Eye",
    frameSize: "Medium",
    rimType: "Full Rim",
    style: "Bold",
    material: "Japanese High-Gloss Acetate",
    description: "An enigmatic dark silhouette with sharp angled bevels and custom titanium core rivets, offering 100% UVA/UVB optical protection.",
    details: {
      lensWidth: "53 mm",
      bridgeWidth: "18 mm",
      templeLength: "145 mm",
      frameWidth: "141 mm",
      weight: "24.0 g",
      origin: "Tokyo, Japan"
    },
    colors: [
      { name: "Deep Obsidian", hex: "#111111", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85" },
      { name: "Rich Burgundy", hex: "#4A0E17", image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Round", "Oval", "Heart"]
  },
  {
    id: "lumera-horizon",
    name: "GRAND OPTICALS HORIZON",
    subtitle: "Refined Wayfarer Reinterpretation",
    category: "Eyeglasses",
    price: 2800,
    oldPrice: 3200,
    rating: 4.90,
    reviews: 138,
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
    gender: "Unisex",
    frameShape: "Square",
    frameSize: "Medium",
    rimType: "Full Rim",
    style: "Classic",
    material: "Handcrafted Italian Acetate",
    description: "A perennial staple elevated with slim profile tapering, subtle keyhole bridge, and diamond-cut core temples.",
    details: {
      lensWidth: "51 mm",
      bridgeWidth: "20 mm",
      templeLength: "145 mm",
      frameWidth: "139 mm",
      weight: "18.2 g",
      origin: "Cadore, Italy"
    },
    colors: [
      { name: "Matte Black", hex: "#232323", image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1000&q=85" },
      { name: "Tokyo Tortoise", hex: "#7B5B3E", image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Round", "Oval", "Heart"]
  },
  {
    id: "lumera-oblique",
    name: "GRAND OPTICALS OBLIQUE",
    subtitle: "Precision Half-Rimmed Executive Optical",
    category: "Eyeglasses",
    price: 3100,
    oldPrice: 3500,
    rating: 4.87,
    reviews: 58,
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
    gender: "Men",
    frameShape: "Rectangle",
    frameSize: "Medium",
    rimType: "Half Rim",
    style: "Professional",
    material: "Aero-Grade Titanium & Brushed Palladium",
    description: "Minimalist upper rim with nylon suspension for the lower lens. Engineered for lightweight durability and modern executive presence.",
    details: {
      lensWidth: "53 mm",
      bridgeWidth: "18 mm",
      templeLength: "142 mm",
      frameWidth: "138 mm",
      weight: "12.5 g",
      origin: "Sabae, Japan"
    },
    colors: [
      { name: "Gunmetal Grey", hex: "#424242", image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=85" },
      { name: "Brushed Bronze", hex: "#8C6D58", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Oval", "Round", "Heart"]
  },
  {
    id: "lumera-color-lenses",
    name: "GRAND OPTICALS IRIS COLORED CONTACTS",
    subtitle: "Natural Blend Enhancing Monthly Lenses (2 Pack)",
    category: "Contact Lenses",
    price: 1299,
    oldPrice: 1599,
    rating: 4.93,
    reviews: 148,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    gender: "Unisex",
    frameShape: "Round",
    frameSize: "Medium",
    rimType: "Rimless",
    style: "Trendy",
    material: "Multi-layered Pigment Micro-Encapsulation",
    description: "Natural 3-tone color blending that enhances your eye color with ultra-smooth edges and zero corneal irritation.",
    details: {
      lensWidth: "14.2 mm",
      bridgeWidth: "8.6 mm BC",
      templeLength: "N/A",
      frameWidth: "2 lenses/box",
      weight: "40 g",
      origin: "Seoul, South Korea"
    },
    colors: [
      { name: "Hazel Amber", hex: "#C59A6F", image: "https://images.unsplash.com/photo-1587304052726-11f87cb51a37?auto=format&fit=crop&w=1000&q=85" },
      { name: "Misty Grey", hex: "#A9A9A9", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=85" },
      { name: "Forest Emerald", hex: "#507D63", image: "https://images.unsplash.com/photo-1587304052726-11f87cb51a37?auto=format&fit=crop&w=1000&q=85" }
    ],
    image: "https://images.unsplash.com/photo-1587304052726-11f87cb51a37?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=85",
    faceShapes: ["Oval", "Round", "Square", "Heart", "Diamond", "Oblong"]
  }
];

export const CATEGORIES = [
  {
    id: "eyeglasses",
    title: "Eyeglasses",
    subtitle: "Everyday frames designed for comfort and style.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85",
    count: "12 Designs",
    tag: "Optical Prescription"
  },
  {
    id: "sunglasses",
    title: "Sunglasses",
    subtitle: "Statement frames with certified 100% UV protection.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85",
    count: "9 Designs",
    tag: "Polarized & UV400"
  },
  {
    id: "contact-lenses",
    title: "Contact Lenses",
    subtitle: "Comfortable, crystal-clear vision for every lifestyle.",
    image: "https://images.unsplash.com/photo-1587304052726-11f87cb51a37?auto=format&fit=crop&w=1200&q=85",
    count: "3 Formulas",
    tag: "Smart Hydration"
  }
];

export const TESTIMONIALS = [
  {
    quote: "GRAND OPTICALS is the rare brand that unites architectural minimalism with bespoke optical precision. Wearing the ARC titanium feels like wearing almost nothing at all.",
    author: "Elena Rostova",
    role: "Architect & Industrial Designer",
    city: "New York",
    rating: 5,
    frame: "GRAND OPTICALS ARC"
  },
  {
    quote: "The optical consultation predicted my frame shape with uncanny accuracy. The Japanese bio-acetate finish looks and feels like a ₹15,000 luxury boutique frame.",
    author: "Julian Vance",
    role: "Creative Director",
    city: "London",
    rating: 5,
    frame: "GRAND OPTICALS NOIR"
  },
  {
    quote: "The blue-light transition lenses have eliminated my end-of-day eye strain completely. Beautiful packaging, sublime customer service.",
    author: "Sophia Chen",
    role: "Software Architect",
    city: "San Francisco",
    rating: 5,
    frame: "GRAND OPTICALS MUSE"
  },
  {
    quote: "Booking the in-store eye exam was effortless, and the precision fitting session was the most thorough eye test I have ever had.",
    author: "Marcus Lindqvist",
    role: "Brand Strategist",
    city: "Stockholm",
    rating: 5,
    frame: "GRAND OPTICALS SOL"
  }
];

export const STORES = [
  {
    id: "nyc-soho",
    name: "GRAND OPTICALS New York — SoHo Flagship",
    address: "472 Broome Street, SoHo, NY 10013",
    phone: "+1 (212) 890-4421",
    hours: "Mon – Sat: 10:00 AM – 7:30 PM | Sun: 11:00 AM – 6:00 PM",
    services: ["Comprehensive Eye Exam", "Bespoke Frame Fitting", "Ultrasonic Cleaning", "Same-Day Prescription Lenses"]
  },
  {
    id: "lon-mayfair",
    name: "GRAND OPTICALS London — Mayfair Studio",
    address: "24 Mount Street, Mayfair, London W1K 2RH",
    phone: "+44 (0)20 7493 8812",
    hours: "Mon – Sat: 10:00 AM – 7:00 PM | Sun: 12:00 PM – 5:00 PM",
    services: ["Ophthalmic Consultations", "Virtual Face Geometry", "Frame Restoration", "Private VIP Styling Suite"]
  },
  {
    id: "tok-ginza",
    name: "GRAND OPTICALS Tokyo — Ginza Pavilion",
    address: "6-10-1 Ginza, Chuo-ku, Tokyo 104-0061",
    phone: "+81 3 5537 9000",
    hours: "Daily: 11:00 AM – 8:00 PM",
    services: ["Sabae Master Titanium Fitting", "Precision Corneal Topography", "Custom Engraving"]
  },
  {
    id: "par-marais",
    name: "GRAND OPTICALS Paris — Le Marais",
    address: "18 Rue de Turenne, 75004 Paris",
    phone: "+33 1 42 78 95 30",
    hours: "Tue – Sun: 11:00 AM – 7:30 PM",
    services: ["Haute Eyewear Styling", "Refractive Vision Suite", "Artisan Polishing"]
  }
];

export const FACE_SHAPES_DATA = [
  {
    shape: "Oval",
    subtitle: "Balanced proportions with a slightly narrower chin than forehead.",
    recommendations: ["Geometric", "Square", "Cat Eye", "Aviator"],
    description: "Most frame shapes flatter an oval face. Bold geometric or rectangular frames add structure without overwhelming soft curves.",
    avoid: "Overly oversized frames that exceed cheekbone width."
  },
  {
    shape: "Round",
    subtitle: "Equal width and length with soft curves and full cheeks.",
    recommendations: ["Square", "Rectangle", "Geometric", "Cat Eye"],
    description: "Angular and rectangular frames create contrast, sharpen facial contours, and make round faces appear longer and slimmer.",
    avoid: "Small round circular frames that emphasize roundness."
  },
  {
    shape: "Square",
    subtitle: "Broad forehead and a strong, defined angular jawline.",
    recommendations: ["Round", "Oval", "Aviator", "Rimless"],
    description: "Curved and rounded silhouettes soften strong angular lines and bring harmony and balance to the facial architecture.",
    avoid: "Sharp boxy square frames with heavy bottom edges."
  },
  {
    shape: "Heart",
    subtitle: "Wider forehead tapering down to a delicate, pointed chin.",
    recommendations: ["Round", "Oval", "Rimless", "Cat Eye", "Half Rim"],
    description: "Frames that are wider at the top or feature light bottom rims balance a broader forehead and harmonize with a delicate chin.",
    avoid: "Heavy top-heavy frames that accentuate the forehead width."
  },
  {
    shape: "Diamond",
    subtitle: "Narrow forehead and jawline with dramatic high cheekbones.",
    recommendations: ["Cat Eye", "Oval", "Rimless", "Geometric"],
    description: "Soft curves and frames with detailed browlines soften prominent cheekbones and highlight the eyes gracefully.",
    avoid: "Narrow frames that crowd high cheekbones."
  },
  {
    shape: "Oblong",
    subtitle: "Longer face length with straight cheekline and tall forehead.",
    recommendations: ["Large Square", "Aviator", "Round", "Bold Full Rim"],
    description: "Taller, oversized frames with decorative temples break up vertical face length and add horizontal balance.",
    avoid: "Narrow or short frames that exaggerate length."
  }
];
