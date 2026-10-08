// ===== FoodDash Core App =====

// ---- Cart ----
const Cart = {
  items: JSON.parse(localStorage.getItem('fd_cart') || '[]'),

  save() {
    localStorage.setItem('fd_cart', JSON.stringify(this.items));
    this.updateBadge();
  },

  add(item) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.qty++;
    } else {
      this.items.push({ ...item, qty: 1 });
    }
    this.save();
    Toast.show(`${item.emoji} ${item.name} added to cart!`, 'success');
    this.animateBadge();
  },

  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  },

  updateQty(id, qty) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    if (qty <= 0) { this.remove(id); return; }
    item.qty = qty;
    this.save();
  },

  clear() {
    this.items = [];
    this.save();
  },

  get count() {
    return this.items.reduce((s, i) => s + i.qty, 0);
  },

  get subtotal() {
    return this.items.reduce((s, i) => s + i.price * i.qty, 0);
  },

  updateBadge() {
    document.querySelectorAll('#cartBadge, #mobileCartBadge').forEach(el => {
      el.textContent = this.count;
      el.style.display = this.count ? 'flex' : 'none';
    });
  },

  animateBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    badge.classList.remove('bump');
    void badge.offsetWidth;
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 400);
  }
};

// ---- Toast ----
const Toast = {
  container: null,

  init() {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    document.body.appendChild(this.container);
  },

  show(message, type = 'info', duration = 3000) {
    if (!this.container) this.init();
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
    this.container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

// ---- Auth ----
const Auth = {
  getUser() {
    try { return JSON.parse(localStorage.getItem('fd_user')); }
    catch { return null; }
  },

  setUser(user) {
    localStorage.setItem('fd_user', JSON.stringify(user));
    this.updateUI();
  },

  logout() {
    localStorage.removeItem('fd_user');
    this.updateUI();
    Toast.show('Logged out successfully', 'info');
    setTimeout(() => window.location.href = getRoot() + 'index.html', 800);
  },

  updateUI() {
    const user = this.getUser();
    const btn  = document.getElementById('authBtn');
    if (!btn) return;
    if (user) {
      btn.textContent = user.name.split(' ')[0];
      btn.href = '#';
      btn.onclick = (e) => { e.preventDefault(); Auth.logout(); };
    } else {
      btn.textContent = 'Login';
      btn.href = getRoot() + 'pages/login.html';
      btn.onclick = null;
    }
  }
};

// ---- Search ----
const Search = {
  init() {
    const input    = document.getElementById('globalSearch');
    const dropdown = document.getElementById('searchDropdown');
    if (!input || !dropdown) return;

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { dropdown.classList.remove('active'); return; }
      const results = this.query(q);
      this.render(results, dropdown);
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  },

  query(q) {
    const out = [];
    (window.RESTAURANTS || []).forEach(r => {
      if (r.name.toLowerCase().includes(q) || r.cuisine.some(c => c.toLowerCase().includes(q))) {
        out.push({ type: 'restaurant', name: r.name, sub: r.cuisine.join(', '), emoji: r.emoji, id: r.id });
      }
      r.menu.forEach(item => {
        if (item.name.toLowerCase().includes(q)) {
          out.push({ type: 'dish', name: item.name, sub: r.name + ' • ₹' + item.price, emoji: item.emoji, id: r.id, itemId: item.id });
        }
      });
    });
    return out.slice(0, 8);
  },

  render(results, dropdown) {
    if (!results.length) {
      dropdown.innerHTML = '<div class="search-item"><div class="search-item-info"><p>No results found</p></div></div>';
      dropdown.classList.add('active');
      return;
    }
    dropdown.innerHTML = results.map(r => `
      <div class="search-item" onclick="window.location.href='${getRoot()}pages/menu.html?rest=${r.id}'">
        <span class="search-item-emoji">${r.emoji}</span>
        <div class="search-item-info">
          <h4>${r.name}</h4>
          <p>${r.sub}</p>
        </div>
      </div>
    `).join('');
    dropdown.classList.add('active');
  }
};

// ---- Helpers ----
function getRoot() {
  const path = window.location.pathname;
  return path.includes('/pages/') ? '../' : '';
}

function formatPrice(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function generateOrderId() {
  return 'FD' + Date.now().toString(36).toUpperCase();
}

function saveOrder(order) {
  const orders = JSON.parse(localStorage.getItem('fd_orders') || '[]');
  orders.unshift(order);
  localStorage.setItem('fd_orders', JSON.stringify(orders));
}

function getOrders() {
  return JSON.parse(localStorage.getItem('fd_orders') || '[]');
}

// ---- Navbar scroll effect ----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- Hamburger ----
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  }

  Cart.updateBadge();
  Auth.updateUI();
  Toast.init();
  Search.init();
});
