import { Product } from '@/lib/types'

export const products: Product[] = [
  // Soaps
  {
    id: 'soap-001',
    name: 'Lavender Bliss Soap',
    category: 'Soap',
    price: 199,
    description: 'Luxurious handmade soap infused with pure lavender oil and organic shea butter. Perfect for sensitive skin and daily cleansing.',
    ingredients: 'Coconut oil, Palm oil, Shea butter, Lavender essential oil, Natural colorants',
    benefits: 'Moisturizing, Soothing, Anti-inflammatory, Aromatherapy',
    usage_instructions: 'Wet hands, lather the soap bar, massage gently on face and body, rinse thoroughly with water.',
    image_url: '/products/soap-lavender.jpg',
    variants: [
      { id: 'soap-001-single', size_label: 'Single Bar (100g)', price: 199 },
      { id: 'soap-001-triple', size_label: 'Pack of 3 (300g)', price: 500 },
    ],
  },
  {
    id: 'soap-002',
    name: 'Charcoal Detox Soap',
    category: 'Soap',
    price: 199,
    description: 'Activated charcoal soap that deeply cleanses and detoxifies. Ideal for oily and acne-prone skin.',
    ingredients: 'Coconut oil, Activated charcoal, Tea tree oil, Neem extract, Natural botanicals',
    benefits: 'Deep cleansing, Pore minimizing, Acne fighting, Detoxifying',
    usage_instructions: 'Apply to damp skin, create a lather, massage in circular motions, rinse with water.',
    image_url: '/products/soap-charcoal.jpg',
    variants: [
      { id: 'soap-002-single', size_label: 'Single Bar (100g)', price: 199 },
      { id: 'soap-002-triple', size_label: 'Pack of 3 (300g)', price: 500 },
    ],
  },

  // Shampoos
  {
    id: 'shampoo-001',
    name: 'Coconut Care Shampoo',
    category: 'Shampoo',
    price: 299,
    description: 'Natural coconut-infused shampoo that cleanses gently while maintaining moisture balance. Free from harmful chemicals.',
    ingredients: 'Coconut oil, Coconut extract, Aloe vera, Vitamin E, Essential oils',
    benefits: 'Moisturizing, Scalp nourishing, Shine enhancing, Chemical-free',
    usage_instructions: 'Wet hair thoroughly, apply a quarter-sized amount, massage scalp gently, rinse well with water.',
    image_url: '/products/shampoo-coconut.jpg',
    variants: [
      { id: 'shampoo-001-500ml', size_label: '500ML', price: 299 },
      { id: 'shampoo-001-1l', size_label: '1L', price: 499 },
      { id: 'shampoo-001-2l', size_label: '2L', price: 899 },
    ],
  },
  {
    id: 'shampoo-002',
    name: 'Neem & Tulsi Shampoo',
    category: 'Shampoo',
    price: 299,
    description: 'Herbal shampoo combining ancient neem and tulsi for scalp health and hair strength. Perfect for dandruff control.',
    ingredients: 'Neem extract, Tulsi (Holy Basil), Tea tree oil, Henna powder, Shikakai',
    benefits: 'Dandruff control, Scalp healing, Hair strengthening, Anti-bacterial',
    usage_instructions: 'Apply to wet hair, massage for 2-3 minutes, rinse thoroughly with water.',
    image_url: '/products/shampoo-neem.jpg',
    variants: [
      { id: 'shampoo-002-500ml', size_label: '500ML', price: 299 },
      { id: 'shampoo-002-1l', size_label: '1L', price: 499 },
      { id: 'shampoo-002-2l', size_label: '2L', price: 899 },
    ],
  },

  // Hair Oils
  {
    id: 'oil-001',
    name: 'Brahmi Bhringraj Hair Oil',
    category: 'Hair Oil',
    price: 299,
    description: 'Traditional Ayurvedic hair oil blend with brahmi and bhringraj for complete hair nourishment and growth.',
    ingredients: 'Brahmi extract, Bhringraj extract, Coconut oil, Sesame oil, Hibiscus, Fenugreek',
    benefits: 'Hair growth, Scalp cooling, Stress relief, Hair darkening',
    usage_instructions: 'Warm oil slightly, apply to scalp and hair, massage for 5-10 minutes, leave for 30 minutes to overnight, wash with shampoo.',
    image_url: '/products/oil-brahmi.jpg',
    variants: [
      { id: 'oil-001-100ml', size_label: '100ML', price: 299 },
      { id: 'oil-001-200ml', size_label: '200ML', price: 499 },
      { id: 'oil-001-500ml', size_label: '500ML', price: 999 },
    ],
  },
  {
    id: 'oil-002',
    name: 'Amla & Mint Hair Oil',
    category: 'Hair Oil',
    price: 299,
    description: 'Refreshing hair oil with vitamin C-rich amla and cooling mint. Strengthens hair from root to tip.',
    ingredients: 'Amla extract, Mint oil, Coconut oil, Lemon oil, Fenugreek seeds, Sesame oil',
    benefits: 'Vitamin C rich, Cooling effect, Hair strengthening, Premature graying prevention',
    usage_instructions: 'Apply oil to scalp and hair length, massage gently, leave for 30-60 minutes, shampoo thoroughly.',
    image_url: '/products/oil-amla.jpg',
    variants: [
      { id: 'oil-002-100ml', size_label: '100ML', price: 299 },
      { id: 'oil-002-200ml', size_label: '200ML', price: 499 },
      { id: 'oil-002-500ml', size_label: '500ML', price: 999 },
    ],
  },

  // Face Wash
  {
    id: 'facewash-001',
    name: 'Rose & Glycerin Face Wash',
    category: 'Face Wash',
    price: 249,
    description: 'Gentle rose water and glycerin based face wash suitable for all skin types. Removes impurities while maintaining natural moisture.',
    ingredients: 'Rose water, Glycerin, Aloe vera gel, Green tea extract, Vitamin E',
    benefits: 'Gentle cleansing, Hydrating, Soothing, Suitable for all skin types',
    usage_instructions: 'Wet face with water, apply a coin-sized amount, massage gently for 30 seconds, rinse thoroughly with water.',
    image_url: '/products/facewash-rose.jpg',
    variants: [
      { id: 'facewash-001-250ml', size_label: '250ML', price: 249 },
    ],
  },
  {
    id: 'facewash-002',
    name: 'Turmeric & Honey Face Wash',
    category: 'Face Wash',
    price: 249,
    description: 'Ayurvedic face wash with turmeric and honey for brightening and anti-bacterial cleansing. Perfect for acne-prone skin.',
    ingredients: 'Turmeric powder, Honey, Neem extract, Sandalwood, Aloe vera',
    benefits: 'Anti-bacterial, Brightening, Acne fighting, Skin toning',
    usage_instructions: 'Apply to wet face, massage with fingertips for 1-2 minutes, rinse with lukewarm water.',
    image_url: '/products/facewash-turmeric.jpg',
    variants: [
      { id: 'facewash-002-250ml', size_label: '250ML', price: 249 },
    ],
  },
]
