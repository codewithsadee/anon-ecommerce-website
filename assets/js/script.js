'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);





// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}





// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}





// Deal of the day countdown timers
// Each deal has its own end date so the countdown is real and meaningful
function startCountdown(endDate, ids) {
  const { days, hours, mins, secs } = ids;

  function tick() {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance <= 0) {
      document.getElementById(days).textContent = '00';
      document.getElementById(hours).textContent = '00';
      document.getElementById(mins).textContent = '00';
      document.getElementById(secs).textContent = '00';
      return;
    }

    const pad = n => String(Math.floor(n)).padStart(2, '0');

    document.getElementById(days).textContent  = pad(distance / (1000 * 60 * 60 * 24));
    document.getElementById(hours).textContent = pad((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById(mins).textContent  = pad((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById(secs).textContent  = pad((distance % (1000 * 60)) / 1000);
  }

  tick();
  setInterval(tick, 1000);
}

// Deal 1 ends 30 days from now, Deal 2 ends 15 days from now
const deal1End = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
const deal2End = new Date().getTime() + 15 * 24 * 60 * 60 * 1000;

startCountdown(deal1End, { days: 'deal1-days', hours: 'deal1-hours', mins: 'deal1-mins', secs: 'deal1-secs' });
startCountdown(deal2End, { days: 'deal2-days', hours: 'deal2-hours', mins: 'deal2-mins', secs: 'deal2-secs' });





// ─── Theme Panel ────────────────────────────────────────────────────────────

const themePanel       = document.getElementById('themePanel');
const themePanelToggle = document.getElementById('themePanelToggle');
const lightModeBtn     = document.getElementById('lightModeBtn');
const darkModeBtn      = document.getElementById('darkModeBtn');
const themeToggle      = document.getElementById('themeToggle');
const themeIcon        = document.getElementById('themeIcon');
const colorSwatches    = document.querySelectorAll('.color-swatch');

// open / close the side panel
themePanelToggle.addEventListener('click', () => {
  themePanel.classList.toggle('open');
});

// close panel when clicking outside
document.addEventListener('click', (e) => {
  if (!themePanel.contains(e.target)) {
    themePanel.classList.remove('open');
  }
});

// ── Dark / Light mode ───────────────────────────────────────────────────────

function applyTheme(mode) {
  if (mode === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.setAttribute('name', 'sunny-outline');
    darkModeBtn.classList.add('active');
    lightModeBtn.classList.remove('active');
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.setAttribute('name', 'moon-outline');
    lightModeBtn.classList.add('active');
    darkModeBtn.classList.remove('active');
  }
  localStorage.setItem('anon-theme', mode);
}

darkModeBtn.addEventListener('click',  () => applyTheme('dark'));
lightModeBtn.addEventListener('click', () => applyTheme('light'));

// header moon/sun button also toggles
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  applyTheme(isDark ? 'light' : 'dark');
});

// ── Accent color ────────────────────────────────────────────────────────────

const accentMap = {
  pink:   { h: 353, s: '100%', l: '78%', ld: '60%' },
  blue:   { h: 220, s: '90%',  l: '64%', ld: '50%' },
  green:  { h: 152, s: '51%',  l: '52%', ld: '38%' },
  purple: { h: 262, s: '100%', l: '72%', ld: '58%' },
  orange: { h: 25,  s: '100%', l: '62%', ld: '48%' },
};

function applyColor(color) {
  const c = accentMap[color];
  document.documentElement.style.setProperty('--accent',      `hsl(${c.h}, ${c.s}, ${c.l})`);
  document.documentElement.style.setProperty('--accent-dark', `hsl(${c.h}, ${c.s}, ${c.ld})`);
  // also keep salmon-pink in sync so existing CSS rules still work
  document.documentElement.style.setProperty('--salmon-pink', `hsl(${c.h}, ${c.s}, ${c.l})`);
  colorSwatches.forEach(s => s.classList.toggle('active', s.dataset.color === color));
  localStorage.setItem('anon-color', color);
}

colorSwatches.forEach(swatch => {
  swatch.addEventListener('click', () => applyColor(swatch.dataset.color));
});

// ── Restore saved preferences on load ───────────────────────────────────────

const savedTheme = localStorage.getItem('anon-theme') || 'light';
const savedColor = localStorage.getItem('anon-color') || 'pink';
applyTheme(savedTheme);
applyColor(savedColor);





// ─── Product data (scraped from the DOM on load) ────────────────────────────

const productData = [];

// Collect all products from the product grid
document.querySelectorAll('.product-grid .showcase').forEach(card => {
  const titleEl    = card.querySelector('.showcase-title');
  const categoryEl = card.querySelector('.showcase-category');
  const priceEl    = card.querySelector('.price');
  const delEl      = card.querySelector('del');
  const imgEl      = card.querySelector('.product-img.default') || card.querySelector('img');
  const ratingEls  = card.querySelectorAll('.showcase-rating ion-icon');

  if (!titleEl || !imgEl) return;

  productData.push({
    title:    titleEl.textContent.trim(),
    category: categoryEl ? categoryEl.textContent.trim() : '',
    price:    priceEl    ? priceEl.textContent.trim()    : '',
    del:      delEl      ? delEl.textContent.trim()      : '',
    img:      imgEl.src,
    stars:    ratingEls.length,
    filledStars: [...ratingEls].filter(i => i.getAttribute('name') === 'star').length,
    card,
  });
});

// Also collect from product-minimal showcases
document.querySelectorAll('.product-minimal .showcase').forEach(card => {
  const titleEl    = card.querySelector('.showcase-title');
  const categoryEl = card.querySelector('.showcase-category');
  const priceEl    = card.querySelector('.price');
  const delEl      = card.querySelector('del');
  const imgEl      = card.querySelector('.showcase-img');

  if (!titleEl || !imgEl) return;

  productData.push({
    title:    titleEl.textContent.trim(),
    category: categoryEl ? categoryEl.textContent.trim() : '',
    price:    priceEl    ? priceEl.textContent.trim()    : '',
    del:      delEl      ? delEl.textContent.trim()      : '',
    img:      imgEl.src,
    stars:    5,
    filledStars: 4,
    card,
  });
});


// ─── Quick-view modal ────────────────────────────────────────────────────────

const productModal      = document.getElementById('productModal');
const productModalClose = document.getElementById('productModalClose');
const productModalOverlay = document.getElementById('productModalOverlay');
const modalImg          = document.getElementById('modalImg');
const modalCategory     = document.getElementById('modalCategory');
const modalTitle        = document.getElementById('modalTitle');
const modalRating       = document.getElementById('modalRating');
const modalPrice        = document.getElementById('modalPrice');
const modalDel          = document.getElementById('modalDel');
const modalCartBtn      = document.getElementById('modalCartBtn');
const modalWishBtn      = document.getElementById('modalWishBtn');

// cart & wishlist counters (desktop + mobile)
const cartCounts    = document.querySelectorAll('.header-user-actions .action-btn[aria-label="Shopping Bag"] .count, .mobile-bottom-navigation .action-btn .count');
const wishCounts    = document.querySelectorAll('.header-user-actions .action-btn[aria-label="Wishlist"] .count, .mobile-bottom-navigation .action-btn .count');

let cartCount = 0;
let wishCount = 0;

function openProductModal(product) {
  modalImg.src          = product.img;
  modalImg.alt          = product.title;
  modalCategory.textContent = product.category;
  modalTitle.textContent    = product.title;
  modalPrice.textContent    = product.price;
  modalDel.textContent      = product.del;

  // build star rating
  modalRating.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const icon = document.createElement('ion-icon');
    icon.setAttribute('name', i < product.filledStars ? 'star' : 'star-outline');
    modalRating.appendChild(icon);
  }

  modalWishBtn.classList.remove('wished');
  productModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  productModal.classList.remove('open');
  document.body.style.overflow = '';
}

productModalClose.addEventListener('click', closeProductModal);
productModalOverlay.addEventListener('click', closeProductModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProductModal(); });

// Add to cart from modal
modalCartBtn.addEventListener('click', () => {
  cartCount++;
  document.querySelectorAll('.header-user-actions .action-btn[aria-label="Shopping Bag"] .count').forEach(el => {
    el.textContent = cartCount;
    el.classList.remove('pop');
    void el.offsetWidth; // reflow to restart animation
    el.classList.add('pop');
  });
  modalCartBtn.textContent = '';
  modalCartBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon> Added!';
  setTimeout(() => {
    modalCartBtn.innerHTML = '<ion-icon name="bag-add-outline"></ion-icon> Add to Cart';
  }, 1500);
});

// Wishlist toggle from modal
modalWishBtn.addEventListener('click', () => {
  const wished = modalWishBtn.classList.toggle('wished');
  wishCount += wished ? 1 : -1;
  if (wishCount < 0) wishCount = 0;
  document.querySelectorAll('.header-user-actions .action-btn[aria-label="Wishlist"] .count').forEach(el => {
    el.textContent = wishCount;
  });
});

// Wire eye buttons in product grid to open modal
document.querySelectorAll('.product-grid .showcase').forEach((card, idx) => {
  const eyeBtn = card.querySelectorAll('.btn-action')[1]; // eye is 2nd button
  if (!eyeBtn) return;
  eyeBtn.addEventListener('click', () => {
    const p = productData.find(d => d.card === card);
    if (p) openProductModal(p);
  });

  // Wire bag-add button
  const bagBtn = card.querySelectorAll('.btn-action')[3];
  if (bagBtn) {
    bagBtn.addEventListener('click', () => {
      cartCount++;
      document.querySelectorAll('.header-user-actions .action-btn[aria-label="Shopping Bag"] .count').forEach(el => {
        el.textContent = cartCount;
        el.classList.remove('pop');
        void el.offsetWidth;
        el.classList.add('pop');
      });
    });
  }

  // Wire heart button
  const heartBtn = card.querySelectorAll('.btn-action')[0];
  if (heartBtn) {
    heartBtn.addEventListener('click', () => {
      const active = heartBtn.classList.toggle('wished');
      wishCount += active ? 1 : -1;
      if (wishCount < 0) wishCount = 0;
      document.querySelectorAll('.header-user-actions .action-btn[aria-label="Wishlist"] .count').forEach(el => {
        el.textContent = wishCount;
      });
      heartBtn.style.color = active ? 'var(--accent)' : '';
    });
  }
});

// Wire "add to cart" buttons in featured deals
document.querySelectorAll('.add-cart-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount++;
    document.querySelectorAll('.header-user-actions .action-btn[aria-label="Shopping Bag"] .count').forEach(el => {
      el.textContent = cartCount;
      el.classList.remove('pop');
      void el.offsetWidth;
      el.classList.add('pop');
    });
    const orig = btn.textContent;
    btn.textContent = '✓ Added!';
    setTimeout(() => { btn.textContent = orig; }, 1500);
  });
});

// Make product titles in grid clickable (open modal)
document.querySelectorAll('.product-grid .showcase-title, .product-grid .showcase-banner').forEach(el => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => {
    const card = el.closest('.showcase');
    const p = productData.find(d => d.card === card);
    if (p) openProductModal(p);
  });
});


// ─── Live Search ─────────────────────────────────────────────────────────────

const searchField    = document.querySelector('.search-field');
const searchBtn      = document.querySelector('.search-btn');
const searchDropdown = document.getElementById('searchDropdown');

function highlight(text, query) {
  if (!query) return text;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

function runSearch(query) {
  query = query.trim();
  if (!query) { searchDropdown.classList.remove('visible'); return; }

  const results = productData.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  if (results.length === 0) {
    searchDropdown.innerHTML = `<p class="search-no-result">No products found for "<strong>${query}</strong>"</p>`;
  } else {
    searchDropdown.innerHTML = results.map(p => `
      <div class="search-result-item" data-title="${p.title}">
        <img src="${p.img}" alt="${p.title}" class="search-result-img">
        <div class="search-result-info">
          <p class="search-result-title">${highlight(p.title, query)}</p>
          <p class="search-result-category">${p.category}</p>
        </div>
        <span class="search-result-price">${p.price}</span>
      </div>
    `).join('');

    // clicking a result opens the modal
    searchDropdown.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const p = productData.find(d => d.title === item.dataset.title);
        if (p) { openProductModal(p); searchDropdown.classList.remove('visible'); searchField.value = ''; }
      });
    });
  }

  searchDropdown.classList.add('visible');
}

searchField.addEventListener('input', () => runSearch(searchField.value));

searchBtn.addEventListener('click', () => runSearch(searchField.value));

searchField.addEventListener('keydown', e => {
  if (e.key === 'Enter') runSearch(searchField.value);
  if (e.key === 'Escape') { searchDropdown.classList.remove('visible'); searchField.value = ''; }
});

// close dropdown when clicking outside
document.addEventListener('click', e => {
  if (!searchField.contains(e.target) && !searchDropdown.contains(e.target) && !searchBtn.contains(e.target)) {
    searchDropdown.classList.remove('visible');
  }
});
