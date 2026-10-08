// ===== FoodDash Data =====

const RESTAURANTS = [
  {
    id: 1, name: "Pizza Palace", emoji: "🍕",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    cuisine: ["Pizza","Italian"], rating: 4.8, reviews: 2340,
    deliveryTime: "25-35", deliveryFee: 29, minOrder: 199,
    tags: ["Best Seller","Fast Delivery"], badge: "⭐ Top Rated",
    description: "Authentic Italian pizzas with fresh ingredients",
    menu: [
      { id: 101, name: "Margherita Pizza", emoji: "🍕", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&q=80", price: 299, originalPrice: 399, category: "Pizza", rating: 4.9, description: "Classic tomato sauce, mozzarella, fresh basil", veg: true, bestseller: true },
      { id: 102, name: "Pepperoni Blast", emoji: "🍕", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&q=80", price: 399, originalPrice: 499, category: "Pizza", rating: 4.7, description: "Loaded pepperoni with extra cheese", veg: false, bestseller: true },
      { id: 103, name: "BBQ Chicken Pizza", emoji: "🍕", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80", price: 449, originalPrice: 549, category: "Pizza", rating: 4.6, description: "Smoky BBQ sauce, grilled chicken, onions", veg: false, bestseller: false },
      { id: 104, name: "Farmhouse Pizza", emoji: "🍕", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300&q=80", price: 349, originalPrice: 449, category: "Pizza", rating: 4.8, description: "Fresh veggies on tangy tomato base", veg: true, bestseller: false },
      { id: 105, name: "Garlic Bread", emoji: "🥖", image: "https://images.unsplash.com/photo-1619740455993-9d622e5e9e78?w=300&q=80", price: 99, originalPrice: 129, category: "Sides", rating: 4.5, description: "Crispy garlic bread with herb butter", veg: true, bestseller: false },
      { id: 106, name: "Tiramisu", emoji: "🍰", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&q=80", price: 149, originalPrice: 199, category: "Desserts", rating: 4.9, description: "Classic Italian coffee dessert", veg: true, bestseller: false }
    ]
  },
  {
    id: 2, name: "Burger Barn", emoji: "🍔",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    cuisine: ["Burgers","American"], rating: 4.6, reviews: 1890,
    deliveryTime: "20-30", deliveryFee: 19, minOrder: 149,
    tags: ["Fast Food","Popular"], badge: "🔥 Trending",
    description: "Juicy smash burgers made fresh to order",
    menu: [
      { id: 201, name: "Classic Smash Burger", emoji: "🍔", image: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=300&q=80", price: 249, originalPrice: 299, category: "Burgers", rating: 4.8, description: "Double smash patty, special sauce, pickles", veg: false, bestseller: true },
      { id: 202, name: "Veggie Delight Burger", emoji: "🍔", image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300&q=80", price: 199, originalPrice: 249, category: "Burgers", rating: 4.5, description: "Crispy veggie patty, lettuce, tomato", veg: true, bestseller: false },
      { id: 203, name: "Crispy Chicken Burger", emoji: "🍗", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=300&q=80", price: 279, originalPrice: 329, category: "Burgers", rating: 4.7, description: "Southern fried chicken with coleslaw", veg: false, bestseller: true },
      { id: 204, name: "Loaded Fries", emoji: "🍟", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&q=80", price: 149, originalPrice: 179, category: "Sides", rating: 4.6, description: "Fries topped with cheese sauce & jalapeños", veg: true, bestseller: false },
      { id: 205, name: "Milkshake", emoji: "🥤", image: "https://images.unsplash.com/photo-1568901839119-631418a3910d?w=300&q=80", price: 129, originalPrice: 159, category: "Drinks", rating: 4.8, description: "Thick creamy shake - chocolate/vanilla/strawberry", veg: true, bestseller: false }
    ]
  },
  {
    id: 3, name: "Sushi Central", emoji: "🍣",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80",
    cuisine: ["Japanese","Sushi"], rating: 4.9, reviews: 3120,
    deliveryTime: "35-45", deliveryFee: 49, minOrder: 499,
    tags: ["Premium","Fresh"], badge: "🌟 Premium",
    description: "Authentic Japanese sushi crafted by master chefs",
    menu: [
      { id: 301, name: "Salmon Nigiri (6pc)", emoji: "🍣", image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300&q=80", price: 499, originalPrice: 599, category: "Nigiri", rating: 4.9, description: "Fresh Atlantic salmon on seasoned rice", veg: false, bestseller: true },
      { id: 302, name: "Dragon Roll (8pc)", emoji: "🍱", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&q=80", price: 649, originalPrice: 799, category: "Rolls", rating: 4.8, description: "Avocado, cucumber, shrimp tempura", veg: false, bestseller: true },
      { id: 303, name: "Veggie Rainbow Roll", emoji: "🥗", image: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=300&q=80", price: 399, originalPrice: 499, category: "Rolls", rating: 4.6, description: "Colorful veggie roll with sesame", veg: true, bestseller: false },
      { id: 304, name: "Miso Soup", emoji: "🍜", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&q=80", price: 99, originalPrice: 129, category: "Soups", rating: 4.7, description: "Traditional Japanese miso with tofu", veg: true, bestseller: false },
      { id: 305, name: "Matcha Ice Cream", emoji: "🍦", image: "https://images.unsplash.com/photo-1505394033641-40908f348eba?w=300&q=80", price: 149, originalPrice: 199, category: "Desserts", rating: 4.9, description: "Premium matcha green tea ice cream", veg: true, bestseller: false }
    ]
  },
  {
    id: 4, name: "Taco Fiesta", emoji: "🌮",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80",
    cuisine: ["Mexican","Tex-Mex"], rating: 4.5, reviews: 1560,
    deliveryTime: "25-35", deliveryFee: 29, minOrder: 199,
    tags: ["Spicy","Street Food"], badge: "🌶️ Spicy",
    description: "Authentic Mexican street food with bold flavors",
    menu: [
      { id: 401, name: "Chicken Tacos (3pc)", emoji: "🌮", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&q=80", price: 249, originalPrice: 299, category: "Tacos", rating: 4.7, description: "Grilled chicken, salsa, guacamole, cilantro", veg: false, bestseller: true },
      { id: 402, name: "Veg Tacos (3pc)", emoji: "🌮", image: "https://images.unsplash.com/photo-1640719028782-8230f1bdc5fe?w=300&q=80", price: 199, originalPrice: 249, category: "Tacos", rating: 4.5, description: "Grilled peppers, beans, cheese, sour cream", veg: true, bestseller: false },
      { id: 403, name: "Beef Burrito", emoji: "🌯", image: "https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?w=300&q=80", price: 329, originalPrice: 399, category: "Burritos", rating: 4.6, description: "Seasoned beef, rice, beans, cheese wrap", veg: false, bestseller: true },
      { id: 404, name: "Nachos Supreme", emoji: "🧀", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300&q=80", price: 199, originalPrice: 249, category: "Sides", rating: 4.8, description: "Crispy nachos with cheese, jalapeños, salsa", veg: true, bestseller: true },
      { id: 405, name: "Churros", emoji: "🍩", image: "https://images.unsplash.com/photo-1624374053855-39a5a1b8a5e3?w=300&q=80", price: 129, originalPrice: 159, category: "Desserts", rating: 4.7, description: "Fried dough with cinnamon sugar & chocolate dip", veg: true, bestseller: false }
    ]
  },
  {
    id: 5, name: "Noodle House", emoji: "🍜",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
    cuisine: ["Chinese","Asian"], rating: 4.4, reviews: 2100,
    deliveryTime: "30-40", deliveryFee: 29, minOrder: 249,
    tags: ["Comfort Food","Noodles"], badge: "🥢 Asian Fav",
    description: "Steaming bowls of authentic Asian noodles",
    menu: [
      { id: 501, name: "Veg Hakka Noodles", emoji: "🍜", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&q=80", price: 179, originalPrice: 219, category: "Noodles", rating: 4.5, description: "Stir-fried noodles with fresh vegetables", veg: true, bestseller: false },
      { id: 502, name: "Chicken Ramen", emoji: "🍲", image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=300&q=80", price: 299, originalPrice: 349, category: "Ramen", rating: 4.8, description: "Rich broth, tender chicken, soft egg, nori", veg: false, bestseller: true },
      { id: 503, name: "Fried Rice Combo", emoji: "🍚", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&q=80", price: 229, originalPrice: 279, category: "Rice", rating: 4.6, description: "Wok-tossed fried rice with choice of protein", veg: false, bestseller: true },
      { id: 504, name: "Dim Sum Basket (6pc)", emoji: "🥟", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&q=80", price: 199, originalPrice: 249, category: "Dim Sum", rating: 4.7, description: "Steamed dumplings with soy dipping sauce", veg: true, bestseller: false },
      { id: 505, name: "Spring Rolls (4pc)", emoji: "🥚", image: "https://images.unsplash.com/photo-1606525437394-8bca01fe98c9?w=300&q=80", price: 149, originalPrice: 179, category: "Starters", rating: 4.4, description: "Crispy vegetable spring rolls with sweet chili", veg: true, bestseller: false }
    ]
  },
  {
    id: 6, name: "Biryani Bazaar", emoji: "🍛",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
    cuisine: ["Indian","Biryani"], rating: 4.7, reviews: 4500,
    deliveryTime: "35-50", deliveryFee: 29, minOrder: 299,
    tags: ["Spicy","Traditional"], badge: "🏆 Most Loved",
    description: "Authentic dum biryani slow-cooked with aromatic spices",
    menu: [
      { id: 601, name: "Chicken Biryani", emoji: "🍛", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=300&q=80", price: 349, originalPrice: 429, category: "Biryani", rating: 4.9, description: "Aromatic basmati, tender chicken, saffron", veg: false, bestseller: true },
      { id: 602, name: "Veg Biryani", emoji: "🍛", image: "https://images.unsplash.com/photo-1590197447519-c0f5bc851c8e?w=300&q=80", price: 279, originalPrice: 349, category: "Biryani", rating: 4.7, description: "Fresh veggies, basmati rice, whole spices", veg: true, bestseller: false },
      { id: 603, name: "Mutton Biryani", emoji: "🍛", image: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=300&q=80", price: 449, originalPrice: 549, category: "Biryani", rating: 4.8, description: "Slow-cooked mutton with caramelized onions", veg: false, bestseller: true },
      { id: 604, name: "Raita", emoji: "🥣", image: "https://images.unsplash.com/photo-1562059394-096a9875a9df?w=300&q=80", price: 49, originalPrice: 69, category: "Sides", rating: 4.5, description: "Cool yogurt with cucumber and spices", veg: true, bestseller: false },
      { id: 605, name: "Gulab Jamun (4pc)", emoji: "🍮", image: "https://images.unsplash.com/photo-1666189143387-b9a78bc2c1c9?w=300&q=80", price: 79, originalPrice: 99, category: "Desserts", rating: 4.8, description: "Soft milk dumplings in rose sugar syrup", veg: true, bestseller: true }
    ]
  }
];

const CATEGORIES = [
  { name: "Pizza",     emoji: "🍕", filter: "Pizza",    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80" },
  { name: "Burgers",   emoji: "🍔", filter: "Burgers",  image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80" },
  { name: "Sushi",     emoji: "🍣", filter: "Japanese", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&q=80" },
  { name: "Tacos",     emoji: "🌮", filter: "Mexican",  image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200&q=80" },
  { name: "Noodles",   emoji: "🍜", filter: "Chinese",  image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&q=80" },
  { name: "Biryani",   emoji: "🍛", filter: "Indian",   image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&q=80" },
  { name: "Desserts",  emoji: "🧁", filter: "Desserts", image: "https://images.unsplash.com/photo-1567327613485-fbc7bf196198?w=200&q=80" },
  { name: "Drinks",    emoji: "🥤", filter: "Drinks",   image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&q=80" }
];

const POPULAR_DISHES = [
  { id: 101, name: "Margherita Pizza",     emoji: "🍕", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&q=80", price: 299, restaurant: "Pizza Palace",   rating: 4.9, restId: 1 },
  { id: 201, name: "Smash Burger",         emoji: "🍔", image: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=300&q=80", price: 249, restaurant: "Burger Barn",    rating: 4.8, restId: 2 },
  { id: 601, name: "Chicken Biryani",      emoji: "🍛", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=300&q=80", price: 349, restaurant: "Biryani Bazaar", rating: 4.9, restId: 6 },
  { id: 301, name: "Salmon Nigiri",        emoji: "🍣", image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300&q=80", price: 499, restaurant: "Sushi Central",  rating: 4.9, restId: 3 },
  { id: 403, name: "Beef Burrito",         emoji: "🌯", image: "https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?w=300&q=80", price: 329, restaurant: "Taco Fiesta",    rating: 4.6, restId: 4 },
  { id: 502, name: "Chicken Ramen",        emoji: "🍲", image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=300&q=80", price: 299, restaurant: "Noodle House",   rating: 4.8, restId: 5 },
  { id: 203, name: "Crispy Chicken Burger",emoji: "🍗", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=300&q=80", price: 279, restaurant: "Burger Barn",    rating: 4.7, restId: 2 },
  { id: 302, name: "Dragon Roll",          emoji: "🍱", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&q=80", price: 649, restaurant: "Sushi Central",  rating: 4.8, restId: 3 }
];

// Expose globally
if (typeof window !== 'undefined') {
  window.RESTAURANTS    = RESTAURANTS;
  window.CATEGORIES     = CATEGORIES;
  window.POPULAR_DISHES = POPULAR_DISHES;
}
