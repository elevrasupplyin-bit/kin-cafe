/**
 * Kin Cafe — Client-side UX Controller
 * Manages configuration hydration, interactive filtering, order cart, lightbox, and WhatsApp integrations.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Application State
  const state = {
    cart: [],
    activeCategory: "all",
    activeDiet: "all",
    searchQuery: ""
  };

  // 1. Hydrate Site Metadata from data/config.js
  function hydrateConfig() {
    if (typeof SITE_CONFIG === "undefined") return;

    // Announcement
    const annStrip = document.getElementById("announcement-strip");
    const annText = document.getElementById("announcement-text");
    if (annStrip && annText) {
      if (SITE_CONFIG.announcement && SITE_CONFIG.announcement.enabled) {
        annText.textContent = SITE_CONFIG.announcement.text;
      } else {
        annStrip.style.display = "none";
      }
    }

    // Story & Hero
    const taglineElem = document.getElementById("hero-tagline");
    if (taglineElem && SITE_CONFIG.brand.tagline) {
      taglineElem.textContent = SITE_CONFIG.brand.tagline;
    }

    const storyElem = document.getElementById("story-content");
    if (storyElem && SITE_CONFIG.brand.shortStory) {
      storyElem.textContent = SITE_CONFIG.brand.shortStory;
    }

    // Hours
    const hoursList = document.getElementById("hours-list");
    if (hoursList && SITE_CONFIG.hours && Array.isArray(SITE_CONFIG.hours.schedule)) {
      hoursList.innerHTML = SITE_CONFIG.hours.schedule
        .map(h => `<li><span class="days-label">${escapeHtml(h.days)}</span><span class="hours-val">${escapeHtml(h.hours)}</span></li>`)
        .join("");
    }

    const hoursNotice = document.getElementById("hours-notice");
    if (hoursNotice && SITE_CONFIG.hours.notice) {
      hoursNotice.textContent = SITE_CONFIG.hours.notice;
    }

    // Contact & Phone
    const phoneDisplay = document.getElementById("contact-phone-display");
    if (phoneDisplay && SITE_CONFIG.contact.phoneDisplay) {
      phoneDisplay.textContent = `Phone: ${SITE_CONFIG.contact.phoneDisplay}`;
    }

    // Dynamic Copyright Year
    const yearElem = document.getElementById("current-year");
    if (yearElem) {
      yearElem.textContent = new Date().getFullYear();
    }

    renderGallery();
  }

  // 2. Render Gallery
  function renderGallery() {
    const galleryGrid = document.getElementById("gallery-grid");
    if (!galleryGrid || !SITE_CONFIG.images || !Array.isArray(SITE_CONFIG.images.gallery)) return;

    galleryGrid.innerHTML = SITE_CONFIG.images.gallery.map((img, idx) => `
      <div class="gallery-card" data-index="${idx}" tabindex="0" role="button" aria-label="Open image: ${escapeHtml(img.alt)}">
        <img src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt)}" loading="lazy">
        <span class="gallery-overlay-badge" aria-hidden="true">Enlarge</span>
      </div>
    `).join("");

    galleryGrid.querySelectorAll(".gallery-card").forEach(card => {
      card.addEventListener("click", () => openLightbox(parseInt(card.dataset.index, 10)));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(parseInt(card.dataset.index, 10));
        }
      });
    });
  }

  // 3. Lightbox Logic
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCloseBtn = document.getElementById("lightbox-close-btn");
  const lightboxOverlay = document.getElementById("lightbox-overlay");

  function openLightbox(index) {
    const item = SITE_CONFIG.images.gallery[index];
    if (!item || !lightboxModal) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxCaption.textContent = item.caption || item.alt;
    lightboxModal.removeAttribute("hidden");
    lightboxModal.setAttribute("aria-hidden", "false");
    lightboxCloseBtn.focus();
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.setAttribute("hidden", "true");
    lightboxModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxModal && !lightboxModal.hasAttribute("hidden")) {
      closeLightbox();
    }
  });

  // 4. Render Highlights
  function renderHighlights() {
    const container = document.getElementById("highlights-container");
    if (!container || typeof MENU_DATA === "undefined") return;

    const featuredItems = [];
    MENU_DATA.forEach(cat => {
      cat.items.forEach(item => {
        if (item.featured) featuredItems.push({ ...item, category: cat.category });
      });
    });

    if (featuredItems.length === 0) {
      container.innerHTML = `<p class="text-muted">Explore our full menu section below for handcrafted specialties.</p>`;
      return;
    }

    container.innerHTML = featuredItems.slice(0, 4).map(item => `
      <div class="highlight-item-card">
        <div class="item-top">
          <div class="badge-row">
            <span class="badge-diet">
              <span class="${item.diet === 'veg' ? 'veg-badge' : 'non-veg-badge'}" aria-hidden="true"></span>
              ${item.diet === 'veg' ? 'Veg' : 'Non-Veg'}
            </span>
            <small class="text-muted">${escapeHtml(item.category)}</small>
          </div>
          <h3 class="item-title">${escapeHtml(item.name)}</h3>
          <p class="item-desc">${escapeHtml(item.description)}</p>
        </div>
        <div class="item-bottom">
          <div>
            <span class="item-price">₹ ${item.price}</span>
            ${item.calories ? `<span class="item-cal">(${item.calories} kcal)</span>` : ''}
          </div>
          <button class="btn-add-cart" data-id="${item.id}" aria-label="Add ${escapeHtml(item.name)} to order tray">+ Add to Order</button>
        </div>
      </div>
    `).join("");
  }

  // 5. Render Interactive Menu
  function initMenu() {
    const tabsContainer = document.getElementById("category-tabs");
    const displayContainer = document.getElementById("menu-items-display");
    if (!tabsContainer || !displayContainer || typeof MENU_DATA === "undefined") return;

    // Render Category Tabs
    let tabsHtml = `<button class="cat-tab-btn active" data-category="all">All Categories</button>`;
    MENU_DATA.forEach(cat => {
      tabsHtml += `<button class="cat-tab-btn" data-category="${escapeHtml(cat.category)}">${escapeHtml(cat.category)}</button>`;
    });
    tabsContainer.innerHTML = tabsHtml;

    // Category Tabs Event Delegation
    tabsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".cat-tab-btn");
      if (!btn) return;
      tabsContainer.querySelectorAll(".cat-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeCategory = btn.dataset.category;
      renderFilteredMenu();
    });

    // Dietary Filter Buttons
    const dietBtns = document.querySelectorAll(".diet-btn");
    dietBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        dietBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.activeDiet = btn.dataset.diet;
        renderFilteredMenu();
      });
    });

    // Search Input
    const searchInput = document.getElementById("menu-search-input");
    const clearBtn = document.getElementById("search-clear-btn");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        if (clearBtn) clearBtn.hidden = state.searchQuery.length === 0;
        renderFilteredMenu();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        state.searchQuery = "";
        clearBtn.hidden = true;
        renderFilteredMenu();
        searchInput.focus();
      });
    }

    renderFilteredMenu();
  }

  function renderFilteredMenu() {
    const displayContainer = document.getElementById("menu-items-display");
    if (!displayContainer || typeof MENU_DATA === "undefined") return;

    if (!Array.isArray(MENU_DATA) || MENU_DATA.length === 0) {
      displayContainer.innerHTML = `
        <div class="text-center" style="padding: 3rem 0;">
          <h3 style="margin-bottom: 0.5rem;">Menu Coming Soon</h3>
          <p class="text-muted">We are curating our newest seasonal offerings. Please visit the cafe counter for daily fresh bakes.</p>
        </div>
      `;
      return;
    }

    let renderedCategoriesHtml = "";
    let totalItemsFound = 0;

    MENU_DATA.forEach(cat => {
      // Category Filter Check
      if (state.activeCategory !== "all" && state.activeCategory !== cat.category) {
        return;
      }

      // Filter category items by diet and search term
      const matchedItems = cat.items.filter(item => {
        const matchesDiet = (state.activeDiet === "all") || (item.diet === state.activeDiet);
        const matchesQuery = (state.searchQuery === "") || 
          (item.name.toLowerCase().includes(state.searchQuery)) ||
          (item.description && item.description.toLowerCase().includes(state.searchQuery));
        return matchesDiet && matchesQuery;
      });

      if (matchedItems.length > 0) {
        totalItemsFound += matchedItems.length;
        renderedCategoriesHtml += `
          <div class="menu-category-block">
            <div class="category-header-wrap">
              <h3 class="category-name">${escapeHtml(cat.category)}</h3>
              ${cat.timing ? `<span class="category-time-badge">${escapeHtml(cat.timing)}</span>` : ''}
            </div>
            ${cat.description ? `<p class="category-desc-note">${escapeHtml(cat.description)}</p>` : ''}
            
            <div class="menu-items-grid">
              ${matchedItems.map(item => `
                <div class="menu-item-row">
                  <div>
                    <div class="row-main">
                      <div class="dish-name-wrap">
                        <span class="${item.diet === 'veg' ? 'veg-badge' : 'non-veg-badge'}" title="${item.diet === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
                        <h4 class="dish-name">${escapeHtml(item.name)}</h4>
                      </div>
                      <span class="dish-price">₹ ${item.price}</span>
                    </div>
                    ${item.description ? `<p class="dish-desc">${escapeHtml(item.description)}</p>` : ''}
                  </div>
                  <div class="dish-meta-row">
                    <div>
                      ${item.calories ? `<span class="dish-kcal">${item.calories} kcal</span>` : ''}
                      ${item.sizeVariants ? `<span class="dish-variant">${escapeHtml(item.sizeVariants)}</span>` : ''}
                    </div>
                    <button class="btn-add-cart" data-id="${item.id}" aria-label="Add ${escapeHtml(item.name)} to order tray">+ Add</button>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }
    });

    if (totalItemsFound === 0) {
      displayContainer.innerHTML = `
        <div class="text-center" style="padding: 3rem 0;">
          <p class="text-muted">No dishes matched your search filters. Try resetting the search or dietary preference.</p>
        </div>
      `;
    } else {
      displayContainer.innerHTML = renderedCategoriesHtml;
    }
  }

  // 6. WhatsApp Cart & Tray Flow
  function findMenuItemById(id) {
    if (typeof MENU_DATA === "undefined") return null;
    for (const cat of MENU_DATA) {
      const found = cat.items.find(i => i.id === id);
      if (found) return found;
    }
    return null;
  }

  function addToCart(id) {
    const item = findMenuItemById(id);
    if (!item) return;

    const existing = state.cart.find(c => c.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1
      });
    }
    updateCartUI();
  }

  function updateItemQty(id, delta) {
    const itemIndex = state.cart.findIndex(c => c.id === id);
    if (itemIndex > -1) {
      state.cart[itemIndex].quantity += delta;
      if (state.cart[itemIndex].quantity <= 0) {
        state.cart.splice(itemIndex, 1);
      }
    }
    updateCartUI();
  }

  function updateCartUI() {
    const countElem = document.getElementById("cart-count");
    const mobileCountElem = document.getElementById("mobile-cart-count");
    const subtotalElem = document.getElementById("cart-subtotal");
    const container = document.getElementById("cart-items-container");

    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (countElem) countElem.textContent = totalCount;
    if (mobileCountElem) mobileCountElem.textContent = totalCount;
    if (subtotalElem) subtotalElem.textContent = `₹ ${subtotal}`;

    if (!container) return;

    if (state.cart.length === 0) {
      container.innerHTML = `<p class="cart-empty-text">Your order tray is empty. Tap any "+ Add to Order" button in the menu to select dishes.</p>`;
      return;
    }

    container.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <div>
          <div class="cart-item-name">${escapeHtml(item.name)}</div>
          <div class="cart-item-price">₹ ${item.price} each</div>
        </div>
        <div class="cart-qty-ctrl">
          <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity of ${escapeHtml(item.name)}">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Increase quantity of ${escapeHtml(item.name)}">+</button>
        </div>
      </div>
    `).join("");
  }

  // Cart Drawer open/close
  const cartDrawer = document.getElementById("cart-drawer");
  const cartToggleBtn = document.getElementById("cart-toggle-btn");
  const mobileOrderPill = document.getElementById("mobile-order-pill");
  const cartCloseBtn = document.getElementById("cart-close-btn");
  const cartBackdrop = document.getElementById("cart-backdrop");

  function openCart() {
    if (!cartDrawer) return;
    cartDrawer.removeAttribute("hidden");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    if (!cartDrawer) return;
    cartDrawer.setAttribute("hidden", "true");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener("click", openCart);
  if (mobileOrderPill) mobileOrderPill.addEventListener("click", openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener("click", closeCart);

  // Cart Qty Clicks Delegation
  const cartItemsContainer = document.getElementById("cart-items-container");
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".qty-btn");
      if (!btn) return;
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      updateItemQty(id, action === "inc" ? 1 : -1);
    });
  }

  // Global Add-To-Cart listener
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".btn-add-cart");
    if (!addBtn) return;
    const itemId = addBtn.dataset.id;
    addToCart(itemId);

    // Subtle button feedback
    const originalText = addBtn.textContent;
    addBtn.textContent = "✓ Added";
    setTimeout(() => {
      addBtn.textContent = originalText;
    }, 900);
  });

  // 7. Order via WhatsApp Action
  const cartWhatsAppBtn = document.getElementById("cart-whatsapp-btn");
  const cartWarning = document.getElementById("cart-config-warning");

  if (cartWhatsAppBtn) {
    cartWhatsAppBtn.addEventListener("click", () => {
      if (state.cart.length === 0) {
        alert("Please add items to your order tray first.");
        return;
      }

      const waNumber = SITE_CONFIG.contact.whatsappNumber;
      if (!waNumber || waNumber.trim() === "") {
        if (cartWarning) cartWarning.removeAttribute("hidden");
        return;
      }

      const userName = document.getElementById("order-user-name")?.value.trim() || "Guest";
      const notes = document.getElementById("order-notes")?.value.trim() || "None";
      const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      let text = `*New Order Request — Kin Cafe, Rourkela*\n`;
      text += `*Customer:* ${userName}\n\n`;
      text += `*Items Ordered:*\n`;
      state.cart.forEach(item => {
        text += `• ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}\n`;
      });
      text += `\n*Estimated Subtotal:* ₹${subtotal} (Taxes included)\n`;
      if (notes !== "None") {
        text += `*Special Instructions:* ${notes}\n\n`;
      }
      text += `\n_(This is an order request generated from the Kin Cafe website. Please confirm availability and preparation time.)_`;

      const encodedUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
      window.open(encodedUrl, "_blank", "noopener,noreferrer");
    });
  }

  // 8. Table Reservation Form Handler
  const resForm = document.getElementById("reservation-form");
  const resFallback = document.getElementById("reservation-fallback-notice");

  if (resForm) {
    const dateInput = document.getElementById("res-date");
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    resForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById("res-name");
      const phoneInput = document.getElementById("res-phone");
      const dateVal = document.getElementById("res-date")?.value;
      const timeVal = document.getElementById("res-time")?.value;
      const guestsVal = document.getElementById("res-guests")?.value;
      const notesVal = document.getElementById("res-notes")?.value.trim() || "None";

      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add("has-error");
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove("has-error");
      }

      if (!phoneInput.value.trim() || phoneInput.value.trim().length < 8) {
        phoneInput.parentElement.classList.add("has-error");
        isValid = false;
      } else {
        phoneInput.parentElement.classList.remove("has-error");
      }

      if (!isValid) return;

      const waNumber = SITE_CONFIG.contact.whatsappNumber;
      if (!waNumber || waNumber.trim() === "") {
        if (resFallback) resFallback.removeAttribute("hidden");
        return;
      }

      let resMsg = `*Table Reservation Request — Kin Cafe, Rourkela*\n\n`;
      resMsg += `*Name:* ${nameInput.value.trim()}\n`;
      resMsg += `*Phone:* ${phoneInput.value.trim()}\n`;
      resMsg += `*Date:* ${dateVal}\n`;
      resMsg += `*Time:* ${timeVal}\n`;
      resMsg += `*Party Size:* ${guestsVal} person(s)\n`;
      if (notesVal !== "None") {
        resMsg += `*Notes:* ${notesVal}\n`;
      }
      resMsg += `\n_(Please reply to confirm availability. Table booking is subject to cafe confirmation.)_`;

      const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(resMsg)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  // 9. Mobile Hamburger Navigation
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileNav = document.getElementById("mobile-nav");

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
      mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
      if (isExpanded) {
        mobileNav.setAttribute("hidden", "true");
      } else {
        mobileNav.removeAttribute("hidden");
      }
    });

    mobileNav.querySelectorAll(".mobile-link").forEach(link => {
      link.addEventListener("click", () => {
        mobileNav.setAttribute("hidden", "true");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Utility Sanitizer
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Initialize
  hydrateConfig();
  renderHighlights();
  initMenu();
});/**
 * Kin Cafe — Client-side UX Controller
 * Manages configuration hydration, interactive filtering, order cart, lightbox, and WhatsApp integrations.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Application State
  const state = {
    cart: [],
    activeCategory: "all",
    activeDiet: "all",
    searchQuery: ""
  };

  // 1. Hydrate Site Metadata from data/config.js
  function hydrateConfig() {
    if (typeof SITE_CONFIG === "undefined") return;

    // Announcement
    const annStrip = document.getElementById("announcement-strip");
    const annText = document.getElementById("announcement-text");
    if (annStrip && annText) {
      if (SITE_CONFIG.announcement && SITE_CONFIG.announcement.enabled) {
        annText.textContent = SITE_CONFIG.announcement.text;
      } else {
        annStrip.style.display = "none";
      }
    }

    // Story & Hero
    const taglineElem = document.getElementById("hero-tagline");
    if (taglineElem && SITE_CONFIG.brand.tagline) {
      taglineElem.textContent = SITE_CONFIG.brand.tagline;
    }

    const storyElem = document.getElementById("story-content");
    if (storyElem && SITE_CONFIG.brand.shortStory) {
      storyElem.textContent = SITE_CONFIG.brand.shortStory;
    }

    // Hours
    const hoursList = document.getElementById("hours-list");
    if (hoursList && SITE_CONFIG.hours && Array.isArray(SITE_CONFIG.hours.schedule)) {
      hoursList.innerHTML = SITE_CONFIG.hours.schedule
        .map(h => `<li><span class="days-label">${escapeHtml(h.days)}</span><span class="hours-val">${escapeHtml(h.hours)}</span></li>`)
        .join("");
    }

    const hoursNotice = document.getElementById("hours-notice");
    if (hoursNotice && SITE_CONFIG.hours.notice) {
      hoursNotice.textContent = SITE_CONFIG.hours.notice;
    }

    // Contact & Phone
    const phoneDisplay = document.getElementById("contact-phone-display");
    if (phoneDisplay && SITE_CONFIG.contact.phoneDisplay) {
      phoneDisplay.textContent = `Phone: ${SITE_CONFIG.contact.phoneDisplay}`;
    }

    // Dynamic Copyright Year
    const yearElem = document.getElementById("current-year");
    if (yearElem) {
      yearElem.textContent = new Date().getFullYear();
    }

    renderGallery();
  }

  // 2. Render Gallery
  function renderGallery() {
    const galleryGrid = document.getElementById("gallery-grid");
    if (!galleryGrid || !SITE_CONFIG.images || !Array.isArray(SITE_CONFIG.images.gallery)) return;

    galleryGrid.innerHTML = SITE_CONFIG.images.gallery.map((img, idx) => `
      <div class="gallery-card" data-index="${idx}" tabindex="0" role="button" aria-label="Open image: ${escapeHtml(img.alt)}">
        <img src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt)}" loading="lazy">
        <span class="gallery-overlay-badge" aria-hidden="true">Enlarge</span>
      </div>
    `).join("");

    galleryGrid.querySelectorAll(".gallery-card").forEach(card => {
      card.addEventListener("click", () => openLightbox(parseInt(card.dataset.index, 10)));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(parseInt(card.dataset.index, 10));
        }
      });
    });
  }

  // 3. Lightbox Logic
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCloseBtn = document.getElementById("lightbox-close-btn");
  const lightboxOverlay = document.getElementById("lightbox-overlay");

  function openLightbox(index) {
    const item = SITE_CONFIG.images.gallery[index];
    if (!item || !lightboxModal) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxCaption.textContent = item.caption || item.alt;
    lightboxModal.removeAttribute("hidden");
    lightboxModal.setAttribute("aria-hidden", "false");
    lightboxCloseBtn.focus();
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.setAttribute("hidden", "true");
    lightboxModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxModal && !lightboxModal.hasAttribute("hidden")) {
      closeLightbox();
    }
  });

  // 4. Render Highlights
  function renderHighlights() {
    const container = document.getElementById("highlights-container");
    if (!container || typeof MENU_DATA === "undefined") return;

    const featuredItems = [];
    MENU_DATA.forEach(cat => {
      cat.items.forEach(item => {
        if (item.featured) featuredItems.push({ ...item, category: cat.category });
      });
    });

    if (featuredItems.length === 0) {
      container.innerHTML = `<p class="text-muted">Explore our full menu section below for handcrafted specialties.</p>`;
      return;
    }

    container.innerHTML = featuredItems.slice(0, 4).map(item => `
      <div class="highlight-item-card">
        <div class="item-top">
          <div class="badge-row">
            <span class="badge-diet">
              <span class="${item.diet === 'veg' ? 'veg-badge' : 'non-veg-badge'}" aria-hidden="true"></span>
              ${item.diet === 'veg' ? 'Veg' : 'Non-Veg'}
            </span>
            <small class="text-muted">${escapeHtml(item.category)}</small>
          </div>
          <h3 class="item-title">${escapeHtml(item.name)}</h3>
          <p class="item-desc">${escapeHtml(item.description)}</p>
        </div>
        <div class="item-bottom">
          <div>
            <span class="item-price">₹ ${item.price}</span>
            ${item.calories ? `<span class="item-cal">(${item.calories} kcal)</span>` : ''}
          </div>
          <button class="btn-add-cart" data-id="${item.id}" aria-label="Add ${escapeHtml(item.name)} to order tray">+ Add to Order</button>
        </div>
      </div>
    `).join("");
  }

  // 5. Render Interactive Menu
  function initMenu() {
    const tabsContainer = document.getElementById("category-tabs");
    const displayContainer = document.getElementById("menu-items-display");
    if (!tabsContainer || !displayContainer || typeof MENU_DATA === "undefined") return;

    // Render Category Tabs
    let tabsHtml = `<button class="cat-tab-btn active" data-category="all">All Categories</button>`;
    MENU_DATA.forEach(cat => {
      tabsHtml += `<button class="cat-tab-btn" data-category="${escapeHtml(cat.category)}">${escapeHtml(cat.category)}</button>`;
    });
    tabsContainer.innerHTML = tabsHtml;

    // Category Tabs Event Delegation
    tabsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".cat-tab-btn");
      if (!btn) return;
      tabsContainer.querySelectorAll(".cat-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeCategory = btn.dataset.category;
      renderFilteredMenu();
    });

    // Dietary Filter Buttons
    const dietBtns = document.querySelectorAll(".diet-btn");
    dietBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        dietBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.activeDiet = btn.dataset.diet;
        renderFilteredMenu();
      });
    });

    // Search Input
    const searchInput = document.getElementById("menu-search-input");
    const clearBtn = document.getElementById("search-clear-btn");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        if (clearBtn) clearBtn.hidden = state.searchQuery.length === 0;
        renderFilteredMenu();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        state.searchQuery = "";
        clearBtn.hidden = true;
        renderFilteredMenu();
        searchInput.focus();
      });
    }

    renderFilteredMenu();
  }

  function renderFilteredMenu() {
    const displayContainer = document.getElementById("menu-items-display");
    if (!displayContainer || typeof MENU_DATA === "undefined") return;

    if (!Array.isArray(MENU_DATA) || MENU_DATA.length === 0) {
      displayContainer.innerHTML = `
        <div class="text-center" style="padding: 3rem 0;">
          <h3 style="margin-bottom: 0.5rem;">Menu Coming Soon</h3>
          <p class="text-muted">We are curating our newest seasonal offerings. Please visit the cafe counter for daily fresh bakes.</p>
        </div>
      `;
      return;
    }

    let renderedCategoriesHtml = "";
    let totalItemsFound = 0;

    MENU_DATA.forEach(cat => {
      // Category Filter Check
      if (state.activeCategory !== "all" && state.activeCategory !== cat.category) {
        return;
      }

      // Filter category items by diet and search term
      const matchedItems = cat.items.filter(item => {
        const matchesDiet = (state.activeDiet === "all") || (item.diet === state.activeDiet);
        const matchesQuery = (state.searchQuery === "") || 
          (item.name.toLowerCase().includes(state.searchQuery)) ||
          (item.description && item.description.toLowerCase().includes(state.searchQuery));
        return matchesDiet && matchesQuery;
      });

      if (matchedItems.length > 0) {
        totalItemsFound += matchedItems.length;
        renderedCategoriesHtml += `
          <div class="menu-category-block">
            <div class="category-header-wrap">
              <h3 class="category-name">${escapeHtml(cat.category)}</h3>
              ${cat.timing ? `<span class="category-time-badge">${escapeHtml(cat.timing)}</span>` : ''}
            </div>
            ${cat.description ? `<p class="category-desc-note">${escapeHtml(cat.description)}</p>` : ''}
            
            <div class="menu-items-grid">
              ${matchedItems.map(item => `
                <div class="menu-item-row">
                  <div>
                    <div class="row-main">
                      <div class="dish-name-wrap">
                        <span class="${item.diet === 'veg' ? 'veg-badge' : 'non-veg-badge'}" title="${item.diet === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
                        <h4 class="dish-name">${escapeHtml(item.name)}</h4>
                      </div>
                      <span class="dish-price">₹ ${item.price}</span>
                    </div>
                    ${item.description ? `<p class="dish-desc">${escapeHtml(item.description)}</p>` : ''}
                  </div>
                  <div class="dish-meta-row">
                    <div>
                      ${item.calories ? `<span class="dish-kcal">${item.calories} kcal</span>` : ''}
                      ${item.sizeVariants ? `<span class="dish-variant">${escapeHtml(item.sizeVariants)}</span>` : ''}
                    </div>
                    <button class="btn-add-cart" data-id="${item.id}" aria-label="Add ${escapeHtml(item.name)} to order tray">+ Add</button>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }
    });

    if (totalItemsFound === 0) {
      displayContainer.innerHTML = `
        <div class="text-center" style="padding: 3rem 0;">
          <p class="text-muted">No dishes matched your search filters. Try resetting the search or dietary preference.</p>
        </div>
      `;
    } else {
      displayContainer.innerHTML = renderedCategoriesHtml;
    }
  }

  // 6. WhatsApp Cart & Tray Flow
  function findMenuItemById(id) {
    if (typeof MENU_DATA === "undefined") return null;
    for (const cat of MENU_DATA) {
      const found = cat.items.find(i => i.id === id);
      if (found) return found;
    }
    return null;
  }

  function addToCart(id) {
    const item = findMenuItemById(id);
    if (!item) return;

    const existing = state.cart.find(c => c.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1
      });
    }
    updateCartUI();
  }

  function updateItemQty(id, delta) {
    const itemIndex = state.cart.findIndex(c => c.id === id);
    if (itemIndex > -1) {
      state.cart[itemIndex].quantity += delta;
      if (state.cart[itemIndex].quantity <= 0) {
        state.cart.splice(itemIndex, 1);
      }
    }
    updateCartUI();
  }

  function updateCartUI() {
    const countElem = document.getElementById("cart-count");
    const mobileCountElem = document.getElementById("mobile-cart-count");
    const subtotalElem = document.getElementById("cart-subtotal");
    const container = document.getElementById("cart-items-container");

    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (countElem) countElem.textContent = totalCount;
    if (mobileCountElem) mobileCountElem.textContent = totalCount;
    if (subtotalElem) subtotalElem.textContent = `₹ ${subtotal}`;

    if (!container) return;

    if (state.cart.length === 0) {
      container.innerHTML = `<p class="cart-empty-text">Your order tray is empty. Tap any "+ Add to Order" button in the menu to select dishes.</p>`;
      return;
    }

    container.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <div>
          <div class="cart-item-name">${escapeHtml(item.name)}</div>
          <div class="cart-item-price">₹ ${item.price} each</div>
        </div>
        <div class="cart-qty-ctrl">
          <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity of ${escapeHtml(item.name)}">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Increase quantity of ${escapeHtml(item.name)}">+</button>
        </div>
      </div>
    `).join("");
  }

  // Cart Drawer open/close
  const cartDrawer = document.getElementById("cart-drawer");
  const cartToggleBtn = document.getElementById("cart-toggle-btn");
  const mobileOrderPill = document.getElementById("mobile-order-pill");
  const cartCloseBtn = document.getElementById("cart-close-btn");
  const cartBackdrop = document.getElementById("cart-backdrop");

  function openCart() {
    if (!cartDrawer) return;
    cartDrawer.removeAttribute("hidden");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    if (!cartDrawer) return;
    cartDrawer.setAttribute("hidden", "true");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener("click", openCart);
  if (mobileOrderPill) mobileOrderPill.addEventListener("click", openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener("click", closeCart);

  // Cart Qty Clicks Delegation
  const cartItemsContainer = document.getElementById("cart-items-container");
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".qty-btn");
      if (!btn) return;
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      updateItemQty(id, action === "inc" ? 1 : -1);
    });
  }

  // Global Add-To-Cart listener
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".btn-add-cart");
    if (!addBtn) return;
    const itemId = addBtn.dataset.id;
    addToCart(itemId);

    // Subtle button feedback
    const originalText = addBtn.textContent;
    addBtn.textContent = "✓ Added";
    setTimeout(() => {
      addBtn.textContent = originalText;
    }, 900);
  });

  // 7. Order via WhatsApp Action
  const cartWhatsAppBtn = document.getElementById("cart-whatsapp-btn");
  const cartWarning = document.getElementById("cart-config-warning");

  if (cartWhatsAppBtn) {
    cartWhatsAppBtn.addEventListener("click", () => {
      if (state.cart.length === 0) {
        alert("Please add items to your order tray first.");
        return;
      }

      const waNumber = SITE_CONFIG.contact.whatsappNumber;
      if (!waNumber || waNumber.trim() === "") {
        if (cartWarning) cartWarning.removeAttribute("hidden");
        return;
      }

      const userName = document.getElementById("order-user-name")?.value.trim() || "Guest";
      const notes = document.getElementById("order-notes")?.value.trim() || "None";
      const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      let text = `*New Order Request — Kin Cafe, Rourkela*\n`;
      text += `*Customer:* ${userName}\n\n`;
      text += `*Items Ordered:*\n`;
      state.cart.forEach(item => {
        text += `• ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}\n`;
      });
      text += `\n*Estimated Subtotal:* ₹${subtotal} (Taxes included)\n`;
      if (notes !== "None") {
        text += `*Special Instructions:* ${notes}\n\n`;
      }
      text += `\n_(This is an order request generated from the Kin Cafe website. Please confirm availability and preparation time.)_`;

      const encodedUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
      window.open(encodedUrl, "_blank", "noopener,noreferrer");
    });
  }

  // 8. Table Reservation Form Handler
  const resForm = document.getElementById("reservation-form");
  const resFallback = document.getElementById("reservation-fallback-notice");

  if (resForm) {
    const dateInput = document.getElementById("res-date");
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    resForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById("res-name");
      const phoneInput = document.getElementById("res-phone");
      const dateVal = document.getElementById("res-date")?.value;
      const timeVal = document.getElementById("res-time")?.value;
      const guestsVal = document.getElementById("res-guests")?.value;
      const notesVal = document.getElementById("res-notes")?.value.trim() || "None";

      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add("has-error");
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove("has-error");
      }

      if (!phoneInput.value.trim() || phoneInput.value.trim().length < 8) {
        phoneInput.parentElement.classList.add("has-error");
        isValid = false;
      } else {
        phoneInput.parentElement.classList.remove("has-error");
      }

      if (!isValid) return;

      const waNumber = SITE_CONFIG.contact.whatsappNumber;
      if (!waNumber || waNumber.trim() === "") {
        if (resFallback) resFallback.removeAttribute("hidden");
        return;
      }

      let resMsg = `*Table Reservation Request — Kin Cafe, Rourkela*\n\n`;
      resMsg += `*Name:* ${nameInput.value.trim()}\n`;
      resMsg += `*Phone:* ${phoneInput.value.trim()}\n`;
      resMsg += `*Date:* ${dateVal}\n`;
      resMsg += `*Time:* ${timeVal}\n`;
      resMsg += `*Party Size:* ${guestsVal} person(s)\n`;
      if (notesVal !== "None") {
        resMsg += `*Notes:* ${notesVal}\n`;
      }
      resMsg += `\n_(Please reply to confirm availability. Table booking is subject to cafe confirmation.)_`;

      const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(resMsg)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  // 9. Mobile Hamburger Navigation
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileNav = document.getElementById("mobile-nav");

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
      mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
      if (isExpanded) {
        mobileNav.setAttribute("hidden", "true");
      } else {
        mobileNav.removeAttribute("hidden");
      }
    });

    mobileNav.querySelectorAll(".mobile-link").forEach(link => {
      link.addEventListener("click", () => {
        mobileNav.setAttribute("hidden", "true");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Utility Sanitizer
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Initialize
  hydrateConfig();
  renderHighlights();
  initMenu();
});
