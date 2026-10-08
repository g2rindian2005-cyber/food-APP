// ===== Home Page Logic =====

document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderRestaurants(RESTAURANTS);
  renderDishes();
});

// ── Categories ─────────────────────────────────────────────────────────────

function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card" onclick="filterByCategory('${cat.filter}', this)">
      <div class="category-img-wrap">
        <img
          src="${cat.image}"
          alt="${cat.name}"
          class="category-photo"
          loading="lazy"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
        />
        <div class="category-emoji-fallback" style="display:none">${cat.emoji}</div>
      </div>
      <div class="category-name">${cat.name}</div>
    </div>
  `).join('');
}

function filterByCategory(filter, el) {
  document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');

  let filtered;
  if (filter === 'Desserts') {
    filtered = RESTAURANTS.filter(r => r.menu.some(m => m.category === 'Desserts'));
  } else if (filter === 'Drinks') {
    filtered = RESTAURANTS.filter(r => r.menu.some(m => m.category === 'Drinks'));
  } else {
    filtered = RESTAURANTS.filter(r => r.cuisine.some(c => c.toLowerCase().includes(filter.toLowerCase())));
  }

  renderRestaurants(filtered.length ? filtered : RESTAURANTS);
}

// ── Restaurants ─────────────────────────────────────────────────────────────

function renderRestaurants(list) {
  const grid = document.getElementById('restaurantsGrid');
  if (!grid) return;

  if (!list.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🍽️</div><h3>No restaurants found</h3><p>Try a different category</p></div>`;
    return;
  }

  grid.innerHTML = list.map(r => `
    <div class="restaurant-card card" onclick="window.location.href='pages/menu.html?rest=${r.id}'">
      <div class="restaurant-img">
        <img
          src="${r.image}"
          alt="${r.name}"
          class="restaurant-photo"
          loading="lazy"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
        />
        <div class="restaurant-emoji-fallback" style="display:none">${r.emoji}</div>
        ${r.badge ? `<div class="restaurant-badge">${r.badge}</div>` : ''}
        <div class="restaurant-fav" onclick="toggleFav(event, ${r.id})">
          <span id="fav-${r.id}">${getFavIcon(r.id)}</span>
        </div>
      </div>
      <div class="restaurant-info">
        <div class="restaurant-name">${r.name}</div>
        <div class="restaurant-meta">
          <span>⭐ ${r.rating} (${r.reviews.toLocaleString()})</span>
          <span>🕐 ${r.deliveryTime} min</span>
          <span>🛵 ₹${r.deliveryFee}</span>
        </div>
        <div class="restaurant-tags">
          ${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// ── Popular Dishes ───────────────────────────────────────────────────────────

function renderDishes() {
  const grid = document.getElementById('dishesGrid');
  if (!grid) return;
  grid.innerHTML = POPULAR_DISHES.map(dish => `
    <div class="dish-card">
      <div class="dish-img">
        <img
          src="${dish.image}"
          alt="${dish.name}"
          class="dish-photo"
          loading="lazy"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
        />
        <div class="dish-emoji-fallback" style="display:none">${dish.emoji}</div>
      </div>
      <div class="dish-info">
        <div class="dish-name">${dish.name}</div>
        <div class="dish-rest">${dish.restaurant} • ⭐${dish.rating}</div>
        <div class="dish-footer">
          <span class="dish-price">₹${dish.price}</span>
          <button class="btn-add" onclick="addDishToCart(${dish.id}, ${dish.restId})">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ── Cart helpers ─────────────────────────────────────────────────────────────

function addDishToCart(dishId, restId) {
  const restaurant = RESTAURANTS.find(r => r.id === restId);
  if (!restaurant) return;
  const item = restaurant.menu.find(m => m.id === dishId);
  if (!item) return;
  Cart.add({ id: item.id, name: item.name, emoji: item.emoji, price: item.price, restaurant: restaurant.name, restId: restaurant.id });
}

// ── Favourites ───────────────────────────────────────────────────────────────

function getFavIcon(id) {
  const favs = JSON.parse(localStorage.getItem('fd_favs') || '[]');
  return favs.includes(id) ? '❤️' : '🤍';
}

function toggleFav(e, id) {
  e.stopPropagation();
  const favs = JSON.parse(localStorage.getItem('fd_favs') || '[]');
  const idx = favs.indexOf(id);
  if (idx > -1) {
    favs.splice(idx, 1);
    Toast.show('Removed from favourites', 'info');
  } else {
    favs.push(id);
    Toast.show('Added to favourites ❤️', 'success');
  }
  localStorage.setItem('fd_favs', JSON.stringify(favs));
  const el = document.getElementById(`fav-${id}`);
  if (el) el.textContent = idx > -1 ? '🤍' : '❤️';
}
