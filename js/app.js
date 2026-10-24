/**
 * ID CRAFTS LUXURY ATELIER — UNIVERSAL UI CONTROLLER & APP SHELL
 * Controls unified header, search modal, cart drawer, wishlist drawer, toasts, and shell navigation.
 */

(function(window, document) {
  'use strict';

  // Make sure state is loaded
  const State = window.IDCraftState;

  const IDCraftApp = {
    init() {
      this.ensureToastContainer();
      this.renderSearchModal();
      this.renderCartDrawer();
      this.renderWishlistDrawer();
      this.renderMobileMenu();
      this.bindHeader();
      this.bindGlobalKeyboardShortcuts();
      this.updateHeaderBadges();
      this.bindGenericActionButtons();
      this.subscribeToState();
      this.bindNewsletter();
    },

    // ==========================================
    // TOAST NOTIFICATIONS
    // ==========================================
    ensureToastContainer() {
      let container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
      }
    },

    showToast(message, title = 'Atelier Notice', icon = 'verified') {
      this.ensureToastContainer();
      const container = document.getElementById('toast-container');
      
      const toast = document.createElement('div');
      toast.className = 'toast-item';
      toast.innerHTML = `
        <span class="material-symbols-outlined text-primary text-[24px] shrink-0">${icon}</span>
        <div class="flex flex-col flex-1 pr-2">
          <span class="font-label-eyebrow text-[10px] tracking-widest text-primary uppercase font-bold">${title}</span>
          <span class="font-body-sm text-sm text-on-surface leading-tight mt-0.5">${message}</span>
        </div>
        <button class="text-on-surface-variant hover:text-primary transition-colors text-lg" aria-label="Dismiss">✕</button>
      `;

      toast.querySelector('button').addEventListener('click', () => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
      });

      container.appendChild(toast);

      setTimeout(() => {
        if (toast.parentNode) {
          toast.classList.add('hide');
          setTimeout(() => toast.remove(), 300);
        }
      }, 4000);
    },

    // ==========================================
    // SEARCH OVERLAY MODAL
    // ==========================================
    renderSearchModal() {
      if (document.getElementById('global-search-modal')) return;

      const modal = document.createElement('div');
      modal.id = 'global-search-modal';
      modal.className = 'modal-backdrop fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl flex items-start justify-center pt-24 px-4';
      modal.innerHTML = `
        <div class="modal-content w-full max-w-2xl bg-surface-container-low border border-outline-variant/60 rounded-lg shadow-2xl overflow-hidden flex flex-col">
          <!-- Search Header Input -->
          <div class="flex items-center px-5 py-4 border-b border-outline-variant/40 gap-3 bg-surface-container">
            <span class="material-symbols-outlined text-primary text-[24px]">search</span>
            <input id="global-search-input" type="text" placeholder="Search bespoke cards, lanyards, tumblers, metallurgy..." 
              class="w-full bg-transparent font-body-lg text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none text-base">
            <span class="font-label-mono-spec text-xs text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">ESC</span>
            <button id="close-search-btn" class="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <!-- Quick Filters Pills -->
          <div class="px-5 py-3 border-b border-outline-variant/20 flex items-center gap-2 overflow-x-auto text-xs">
            <span class="font-label-mono-spec text-on-surface-variant uppercase tracking-wider text-[10px]">Filter:</span>
            <button class="search-tag-pill px-2.5 py-1 rounded bg-surface-container hover:bg-primary/20 hover:text-primary text-on-surface-variant transition-colors" data-tag="all">All</button>
            <button class="search-tag-pill px-2.5 py-1 rounded bg-surface-container hover:bg-primary/20 hover:text-primary text-on-surface-variant transition-colors" data-tag="cards">ID Cards</button>
            <button class="search-tag-pill px-2.5 py-1 rounded bg-surface-container hover:bg-primary/20 hover:text-primary text-on-surface-variant transition-colors" data-tag="lanyards">Lanyards</button>
            <button class="search-tag-pill px-2.5 py-1 rounded bg-surface-container hover:bg-primary/20 hover:text-primary text-on-surface-variant transition-colors" data-tag="tumblers">Tumblers</button>
            <button class="search-tag-pill px-2.5 py-1 rounded bg-surface-container hover:bg-primary/20 hover:text-primary text-on-surface-variant transition-colors" data-tag="reels">Badge Reels</button>
          </div>

          <!-- Live Search Results List -->
          <div id="search-results-container" class="max-h-96 overflow-y-auto p-4 flex flex-col gap-2">
            <!-- Populated dynamically -->
          </div>

          <!-- Search Footer -->
          <div class="px-5 py-3 bg-surface-container-lowest border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant font-label-mono-spec">
            <span>Press <strong class="text-primary">↵ Enter</strong> to view</span>
            <span>ID CRAFT Bespoke Catalog</span>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      // Event Handlers
      const input = modal.querySelector('#global-search-input');
      const closeBtn = modal.querySelector('#close-search-btn');

      closeBtn.addEventListener('click', () => this.closeSearch());
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeSearch();
      });

      input.addEventListener('input', (e) => {
        this.executeSearch(e.target.value);
      });

      modal.querySelectorAll('.search-tag-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const tag = pill.getAttribute('data-tag');
          if (tag === 'all') {
            input.value = '';
            this.executeSearch('');
          } else {
            input.value = tag;
            this.executeSearch(tag);
          }
        });
      });
    },

    openSearch() {
      const modal = document.getElementById('global-search-modal');
      if (modal) {
        modal.classList.add('active');
        const input = modal.querySelector('#global-search-input');
        if (input) {
          input.value = '';
          input.focus();
          this.executeSearch('');
        }
      }
    },

    closeSearch() {
      const modal = document.getElementById('global-search-modal');
      if (modal) modal.classList.remove('active');
    },

    executeSearch(query) {
      const container = document.getElementById('search-results-container');
      if (!container) return;

      let results = [];
      if (!query || query.trim() === '') {
        results = State.catalog.slice(0, 6); // show top recommendations
      } else {
        results = State.searchCatalog(query);
      }

      if (results.length === 0) {
        container.innerHTML = `
          <div class="py-12 flex flex-col items-center justify-center text-center">
            <span class="material-symbols-outlined text-outline-variant text-4xl mb-2">search_off</span>
            <p class="font-body-md text-on-surface-variant">No atelier references found for "${query}".</p>
            <a href="custom-order.html" class="mt-3 text-primary text-xs uppercase font-label-action tracking-wider hover:underline">
              Request Bespoke Custom Commission →
            </a>
          </div>
        `;
        return;
      }

      container.innerHTML = results.map(item => `
        <a href="${item.link}" class="group flex items-center justify-between p-3 rounded bg-surface-container hover:bg-surface-container-high transition-all border border-transparent hover:border-outline-variant/40">
          <div class="flex items-center gap-3.5">
            <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded object-cover border border-outline-variant/30 shrink-0">
            <div class="flex flex-col">
              <span class="font-headline-sm text-sm text-on-surface group-hover:text-primary transition-colors font-semibold">${item.name}</span>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="font-label-mono-spec text-[10px] text-tertiary uppercase tracking-wider">${item.categoryName}</span>
                <span class="text-outline-variant text-[10px]">•</span>
                <span class="font-body-sm text-xs text-on-surface-variant truncate max-w-xs">${item.badge || 'Atelier Series'}</span>
              </div>
            </div>
          </div>
          <div class="text-right shrink-0 pl-3">
            <span class="font-headline-sm text-sm text-primary font-bold">${item.price.toFixed(3)} KWD</span>
            <span class="block font-label-mono-spec text-[10px] text-on-surface-variant uppercase tracking-wider">In Stock</span>
          </div>
        </a>
      `).join('');
    },

    // ==========================================
    // GLOBAL CART SLIDE-OVER DRAWER
    // ==========================================
    renderCartDrawer() {
      if (document.getElementById('global-cart-drawer')) return;

      const drawer = document.createElement('div');
      drawer.id = 'global-cart-drawer';
      drawer.className = 'drawer-backdrop fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-end';
      drawer.innerHTML = `
        <div class="drawer-panel w-full max-w-md bg-surface-container-lowest border-l border-outline-variant/40 h-full flex flex-col shadow-2xl">
          <!-- Drawer Header -->
          <div class="px-6 py-5 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low">
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-primary text-[22px]">shopping_bag</span>
              <span class="font-headline-sm text-base uppercase tracking-wider text-on-surface font-semibold">Bespoke Cart</span>
              <span id="drawer-cart-count-badge" class="px-2 py-0.5 rounded-full bg-primary/20 text-primary font-label-mono-spec text-[11px] font-bold">0</span>
            </div>
            <button id="close-cart-btn" class="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
              <span class="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          <!-- Cart Items Container -->
          <div id="drawer-cart-items-list" class="flex-1 overflow-y-auto p-6 space-y-4">
            <!-- Dynamic Cart Items -->
          </div>

          <!-- Drawer Footer & Checkout Action -->
          <div id="drawer-cart-footer" class="p-6 border-t border-outline-variant/30 bg-surface-container-low flex flex-col gap-3">
            <!-- Promo Voucher Input -->
            <div class="flex items-center gap-2">
              <input id="drawer-coupon-input" type="text" placeholder="Promo code (e.g. ROYAL10)" 
                class="flex-1 h-9 px-3 bg-surface-container text-xs rounded border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary">
              <button id="drawer-apply-coupon-btn" class="h-9 px-3 bg-surface-container-high hover:bg-primary hover:text-on-primary text-xs uppercase font-label-action tracking-wider rounded transition-colors text-primary font-semibold">
                Apply
              </button>
            </div>
            <div id="drawer-coupon-status" class="text-xs font-label-mono-spec text-primary"></div>

            <!-- Price Breakdown -->
            <div class="space-y-1.5 pt-2 border-t border-outline-variant/20 text-sm">
              <div class="flex justify-between text-on-surface-variant font-body-sm">
                <span>Subtotal</span>
                <span id="drawer-subtotal-val" class="font-semibold text-on-surface">0.000 KWD</span>
              </div>
              <div id="drawer-discount-row" class="hidden justify-between text-tertiary font-body-sm">
                <span id="drawer-discount-label">Voucher Discount</span>
                <span id="drawer-discount-val">-0.000 KWD</span>
              </div>
              <div class="flex justify-between text-on-surface-variant font-body-sm">
                <span>Kuwait Dispatch</span>
                <span id="drawer-shipping-val" class="text-xs uppercase font-label-mono-spec text-primary">Complimentary</span>
              </div>
              <div class="flex justify-between text-on-surface font-headline-sm pt-2 border-t border-outline-variant/20 font-bold">
                <span>Total Protocol</span>
                <span id="drawer-total-val" class="text-primary text-lg">0.000 KWD</span>
              </div>
            </div>

            <!-- Checkout Action Button -->
            <a href="checkout.html" id="drawer-checkout-btn" class="w-full py-3.5 mt-2 bg-primary hover:bg-primary-fixed text-on-primary text-center font-label-action uppercase tracking-[0.16em] text-xs font-bold rounded shadow-md hover:shadow-[0_0_20px_rgba(242,202,80,0.3)] transition-all flex items-center justify-center gap-2">
              <span>Proceed to Protocol Checkout</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>
      `;

      document.body.appendChild(drawer);

      // Event handlers
      const closeBtn = drawer.querySelector('#close-cart-btn');
      closeBtn.addEventListener('click', () => this.closeCart());
      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) this.closeCart();
      });

      // Coupon listener
      const couponBtn = drawer.querySelector('#drawer-apply-coupon-btn');
      const couponInput = drawer.querySelector('#drawer-coupon-input');
      couponBtn.addEventListener('click', () => {
        const res = State.applyCoupon(couponInput.value);
        this.showToast(res.message, 'Atelier Privilege', res.success ? 'verified' : 'error');
        this.updateCartDrawer();
      });
    },

    openCart() {
      const drawer = document.getElementById('global-cart-drawer');
      if (drawer) {
        this.updateCartDrawer();
        drawer.classList.add('active');
      }
    },

    closeCart() {
      const drawer = document.getElementById('global-cart-drawer');
      if (drawer) drawer.classList.remove('active');
    },

    updateCartDrawer() {
      const listContainer = document.getElementById('drawer-cart-items-list');
      const countBadge = document.getElementById('drawer-cart-count-badge');
      const subtotalVal = document.getElementById('drawer-subtotal-val');
      const shippingVal = document.getElementById('drawer-shipping-val');
      const discountRow = document.getElementById('drawer-discount-row');
      const discountLabel = document.getElementById('drawer-discount-label');
      const discountVal = document.getElementById('drawer-discount-val');
      const totalVal = document.getElementById('drawer-total-val');
      const couponStatus = document.getElementById('drawer-coupon-status');
      const checkoutBtn = document.getElementById('drawer-checkout-btn');

      if (!listContainer) return;

      const cart = State.getCart();
      const totals = State.getCalculatedTotals();

      countBadge.textContent = State.getCartCount();
      subtotalVal.textContent = totals.subtotal + ' KWD';
      shippingVal.textContent = totals.shippingLabel;
      totalVal.textContent = totals.total + ' KWD';

      if (totals.discountLabel && parseFloat(totals.discount) > 0) {
        discountRow.classList.remove('hidden');
        discountRow.classList.add('flex');
        discountLabel.textContent = totals.discountLabel;
        discountVal.textContent = '-' + totals.discount + ' KWD';
        couponStatus.textContent = `Applied Privilege: ${totals.couponCode} (${totals.discountLabel})`;
      } else {
        discountRow.classList.add('hidden');
        discountRow.classList.remove('flex');
        couponStatus.textContent = '';
      }

      if (cart.length === 0) {
        listContainer.innerHTML = `
          <div class="py-16 flex flex-col items-center justify-center text-center">
            <span class="material-symbols-outlined text-outline-variant text-5xl mb-3">production_quantity_limits</span>
            <span class="font-headline-sm text-sm uppercase text-on-surface font-semibold">Your Bespoke Cart is Empty</span>
            <p class="font-body-sm text-xs text-on-surface-variant mt-1 max-w-xs">
              Explore our curated collection of luxury smart credentials, neckwear, and architectural vessels.
            </p>
            <a href="shop.html" class="mt-4 px-5 py-2.5 bg-primary text-on-primary rounded font-label-action text-xs uppercase tracking-widest hover:bg-tertiary transition-colors">
              Explore The Collection →
            </a>
          </div>
        `;
        if (checkoutBtn) {
          checkoutBtn.classList.add('opacity-50', 'pointer-events-none');
        }
        return;
      }

      if (checkoutBtn) {
        checkoutBtn.classList.remove('opacity-50', 'pointer-events-none');
      }

      listContainer.innerHTML = cart.map((item, index) => {
        const optionsHtml = item.options && Object.keys(item.options).length > 0
          ? Object.entries(item.options).map(([k, v]) => `
              <span class="block text-[11px] text-tertiary font-label-mono-spec">
                <strong class="uppercase text-on-surface-variant">${k}:</strong> ${v}
              </span>
            `).join('')
          : '';

        return `
          <div class="p-3.5 rounded bg-surface-container border border-outline-variant/30 flex gap-3 items-start relative group">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded object-cover border border-outline-variant/40 shrink-0">
            <div class="flex-1 min-w-0 pr-6">
              <span class="font-headline-sm text-xs font-semibold text-on-surface block truncate">${item.name}</span>
              <div class="mt-1 space-y-0.5">${optionsHtml}</div>
              <div class="mt-2.5 flex items-center justify-between">
                <span class="font-headline-sm text-xs text-primary font-bold">${item.price.toFixed(3)} KWD</span>
                <div class="inline-flex items-center border border-outline-variant/40 rounded bg-surface-container-low">
                  <button class="cart-qty-btn px-2 py-0.5 text-xs text-on-surface-variant hover:text-primary transition-colors" data-action="dec" data-index="${index}">-</button>
                  <span class="px-2 text-xs font-label-mono-spec font-bold text-on-surface">${item.quantity || 1}</span>
                  <button class="cart-qty-btn px-2 py-0.5 text-xs text-on-surface-variant hover:text-primary transition-colors" data-action="inc" data-index="${index}">+</button>
                </div>
              </div>
            </div>
            <button class="cart-remove-btn absolute top-3 right-3 text-on-surface-variant/60 hover:text-error transition-colors" data-index="${index}" aria-label="Remove Item">
              <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        `;
      }).join('');

      // Bind quantity buttons
      listContainer.querySelectorAll('.cart-qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'));
          const action = btn.getAttribute('data-action');
          const currentQty = cart[idx].quantity || 1;
          const newQty = action === 'inc' ? currentQty + 1 : currentQty - 1;
          State.updateCartQuantity(idx, newQty);
        });
      });

      // Bind remove buttons
      listContainer.querySelectorAll('.cart-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'));
          State.removeFromCart(idx);
          this.showToast('Item removed from cart.', 'Cart Protocol', 'info');
        });
      });
    },

    // ==========================================
    // GLOBAL WISHLIST SLIDE-OVER DRAWER
    // ==========================================
    renderWishlistDrawer() {
      if (document.getElementById('global-wishlist-drawer')) return;

      const drawer = document.createElement('div');
      drawer.id = 'global-wishlist-drawer';
      drawer.className = 'drawer-backdrop fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-end';
      drawer.innerHTML = `
        <div class="drawer-panel w-full max-w-md bg-surface-container-lowest border-l border-outline-variant/40 h-full flex flex-col shadow-2xl">
          <!-- Drawer Header -->
          <div class="px-6 py-5 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low">
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-primary text-[22px]">favorite</span>
              <span class="font-headline-sm text-base uppercase tracking-wider text-on-surface font-semibold">Saved Insignias</span>
              <span id="drawer-wishlist-count-badge" class="px-2 py-0.5 rounded-full bg-primary/20 text-primary font-label-mono-spec text-[11px] font-bold">0</span>
            </div>
            <button id="close-wishlist-btn" class="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
              <span class="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          <!-- Wishlist Items Container -->
          <div id="drawer-wishlist-items-list" class="flex-1 overflow-y-auto p-6 space-y-4">
            <!-- Dynamic Wishlist Items -->
          </div>

          <div class="p-6 border-t border-outline-variant/30 bg-surface-container-low">
            <a href="shop.html" class="w-full py-3 bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/60 text-center font-label-action uppercase tracking-[0.14em] text-xs font-semibold rounded transition-all block">
              Continue Browsing Atelier
            </a>
          </div>
        </div>
      `;

      document.body.appendChild(drawer);

      const closeBtn = drawer.querySelector('#close-wishlist-btn');
      closeBtn.addEventListener('click', () => this.closeWishlist());
      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) this.closeWishlist();
      });
    },

    openWishlist() {
      const drawer = document.getElementById('global-wishlist-drawer');
      if (drawer) {
        this.updateWishlistDrawer();
        drawer.classList.add('active');
      }
    },

    closeWishlist() {
      const drawer = document.getElementById('global-wishlist-drawer');
      if (drawer) drawer.classList.remove('active');
    },

    updateWishlistDrawer() {
      const listContainer = document.getElementById('drawer-wishlist-items-list');
      const countBadge = document.getElementById('drawer-wishlist-count-badge');
      if (!listContainer) return;

      const wishlist = State.getWishlist();
      countBadge.textContent = wishlist.length;

      if (wishlist.length === 0) {
        listContainer.innerHTML = `
          <div class="py-16 flex flex-col items-center justify-center text-center">
            <span class="material-symbols-outlined text-outline-variant text-5xl mb-3">favorite_border</span>
            <span class="font-headline-sm text-sm uppercase text-on-surface font-semibold">No Saved Items</span>
            <p class="font-body-sm text-xs text-on-surface-variant mt-1 max-w-xs">
              Bookmark pieces to your sovereign dossier while exploring the atelier.
            </p>
          </div>
        `;
        return;
      }

      listContainer.innerHTML = wishlist.map(item => `
        <div class="p-3.5 rounded bg-surface-container border border-outline-variant/30 flex gap-3 items-center justify-between">
          <div class="flex items-center gap-3 min-w-0">
            <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded object-cover border border-outline-variant/40 shrink-0">
            <div class="min-w-0">
              <span class="font-headline-sm text-xs font-semibold text-on-surface block truncate">${item.name}</span>
              <span class="font-label-mono-spec text-[10px] text-tertiary uppercase">${item.price.toFixed(3)} KWD</span>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button class="wishlist-to-cart-btn p-2 bg-primary text-on-primary rounded hover:bg-primary-fixed transition-colors" data-id="${item.id}" title="Add to Cart">
              <span class="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            </button>
            <button class="wishlist-remove-btn p-2 text-on-surface-variant hover:text-error transition-colors" data-id="${item.id}" title="Remove">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      `).join('');

      listContainer.querySelectorAll('.wishlist-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          State.addToCart(id);
          this.showToast('Item added to Bespoke Cart!', 'Cart Protocol', 'shopping_bag');
          this.closeWishlist();
          this.openCart();
        });
      });

      listContainer.querySelectorAll('.wishlist-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          State.toggleWishlist(id);
          this.updateWishlistDrawer();
          this.updateHeaderBadges();
        });
      });
    },

    // ==========================================
    // MOBILE NAVIGATION DRAWER
    // ==========================================
    renderMobileMenu() {
      if (document.getElementById('mobile-nav-drawer')) return;

      // Inject hamburger button into header if not present
      const header = document.querySelector('header');
      if (header && !header.querySelector('#mobile-menu-btn')) {
        const headerInner = header.querySelector('div');
        const btn = document.createElement('button');
        btn.id = 'mobile-menu-btn';
        btn.className = 'lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors ml-1';
        btn.setAttribute('aria-label', 'Open Navigation Menu');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = `<span class="material-symbols-outlined text-[22px]" id="mobile-menu-icon">menu</span>`;
        if (headerInner) headerInner.appendChild(btn);
      }

      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const navLinks = [
        { href: 'index.html', label: 'Home', path: 'home', icon: 'home' },
        { href: 'shop.html', label: 'Shop', path: 'shop', icon: 'storefront' },
        { href: 'custom-order.html', label: 'Custom Order', path: 'custom-order', icon: 'design_services' },
        { href: 'corporate.html', label: 'Corporate', path: 'corporate', icon: 'corporate_fare' },
        { href: 'our-work.html', label: 'Our Work', path: 'our-work', icon: 'photo_library' },
        { href: 'about.html', label: 'About', path: 'about', icon: 'info' },
        { href: 'contact.html', label: 'Contact', path: 'contact', icon: 'contact_mail' }
      ];

      const isActive = (link) => {
        return link.href === currentPath ||
          (currentPath === '' && link.href === 'index.html') ||
          (link.path !== 'home' && currentPath.includes(link.path));
      };

      const drawer = document.createElement('div');
      drawer.id = 'mobile-nav-drawer';
      drawer.className = 'drawer-backdrop fixed inset-0 z-[60] bg-black/70 backdrop-blur-md flex justify-end lg:hidden';
      drawer.innerHTML = `
        <div class="drawer-panel w-full max-w-xs bg-surface-container-lowest border-l border-outline-variant/40 h-full flex flex-col shadow-2xl" id="mobile-drawer-panel">
          <!-- Drawer Header -->
          <div class="px-6 py-5 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low">
            <div class="flex items-center gap-3">
              <img src="https://lh3.googleusercontent.com/aida/AEtjO1WQuwLIdSGZ0krsGOhlWCpQj3_eEfPT6j2SmeVRt7W5OpQk0CStqANVQ_rfZsNUScsNGklGnqUi-N_-tZjfrbsYXs5Ydc6VOaTbCyIP47T6myPegKapAUxoPavmO8WmwDdp7hM6ez4oDJxm1-o12b-h0tdYOm0qemnVx-geYmPWN62wzpHXP0-9ZQMGb9_BCdnZ5KsZq96_-UAdIDarDaP7UR-_kakLArn9Cxwi1B8MvUXWJWKaWFLXZkA" alt="ID CRAFT Logo" class="h-7 w-auto object-contain">
              <div class="border-l border-outline-variant/40 pl-3">
                <span class="font-label-action text-xs font-bold uppercase tracking-widest text-on-surface block">ID CRAFT</span>
                <span class="font-label-mono-spec text-[9px] tracking-widest uppercase text-tertiary">Kuwait Atelier</span>
              </div>
            </div>
            <button id="close-mobile-nav-btn" class="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" aria-label="Close Menu">
              <span class="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          <!-- Nav Links -->
          <nav class="flex-1 overflow-y-auto py-4 px-4 space-y-1 mobile-nav">
            ${navLinks.map(link => `
              <a href="${link.href}" data-path="${link.path}" class="mobile-nav-link flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(link) ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}">
                <span class="material-symbols-outlined text-[20px]">${link.icon}</span>
                <span class="font-label-action text-sm uppercase tracking-wider">${link.label}</span>
                ${isActive(link) ? '<span class="material-symbols-outlined text-[16px] ml-auto">check_circle</span>' : ''}
              </a>
            `).join('')}
          </nav>

          <!-- Mobile CTAs -->
          <div class="px-4 py-5 border-t border-outline-variant/30 space-y-3">
            <a href="custom-order.html" class="w-full py-3 bg-primary text-on-primary text-center font-label-action uppercase tracking-[0.16em] text-xs font-bold rounded-lg shadow-md hover:bg-primary-fixed transition-all flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-[18px]">bolt</span>
              Commission Custom Order
            </a>
            <div class="flex items-center gap-3">
              <button onclick="window.IDCraftApp && window.IDCraftApp.openCart()" class="flex-1 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/40 rounded-lg text-xs font-label-action uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-[18px]">shopping_bag</span>
                Cart
              </button>
              <button onclick="window.IDCraftApp && window.IDCraftApp.openWishlist()" class="flex-1 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/40 rounded-lg text-xs font-label-action uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-[18px]">favorite</span>
                Saved
              </button>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-6 pb-6 text-center">
            <span class="font-label-mono-spec text-[10px] uppercase tracking-widest text-on-surface-variant">Shuwaikh Industrial • Kuwait • Est. 2026</span>
          </div>
        </div>
      `;

      document.body.appendChild(drawer);

      // Close button
      drawer.querySelector('#close-mobile-nav-btn').addEventListener('click', () => this.closeMobileMenu());
      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) this.closeMobileMenu();
      });

      // Close on nav link click
      drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => this.closeMobileMenu());
      });

      // Bind hamburger btn after render
      const menuBtn = document.getElementById('mobile-menu-btn');
      if (menuBtn) {
        menuBtn.addEventListener('click', () => this.openMobileMenu());
      }
    },

    openMobileMenu() {
      const drawer = document.getElementById('mobile-nav-drawer');
      const icon = document.getElementById('mobile-menu-icon');
      const btn = document.getElementById('mobile-menu-btn');
      if (drawer) {
        drawer.classList.add('active');
        if (icon) icon.textContent = 'close';
        if (btn) btn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    },

    closeMobileMenu() {
      const drawer = document.getElementById('mobile-nav-drawer');
      const icon = document.getElementById('mobile-menu-icon');
      const btn = document.getElementById('mobile-menu-btn');
      if (drawer) {
        drawer.classList.remove('active');
        if (icon) icon.textContent = 'menu';
        if (btn) btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    },

    // ==========================================
    // UNIFIED HEADER BINDINGS
    // ==========================================
    bindHeader() {
      // Current path detection for active link highlighting
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';

      document.querySelectorAll('header nav a, header .mobile-nav a').forEach(link => {
        const href = link.getAttribute('href') || '';
        const dataPath = link.getAttribute('data-path');

        if (
          href === currentPath || 
          (currentPath === '' && href === 'index.html') ||
          (dataPath === 'home' && (currentPath === 'index.html' || currentPath === '')) ||
          (dataPath === 'shop' && currentPath.includes('shop')) ||
          (dataPath === 'custom-order' && currentPath.includes('custom-order')) ||
          (dataPath === 'corporate' && currentPath.includes('corporate')) ||
          (dataPath === 'our-work' && currentPath.includes('our-work')) ||
          (dataPath === 'about' && currentPath.includes('about')) ||
          (dataPath === 'contact' && currentPath.includes('contact'))
        ) {
          link.classList.remove('text-on-surface-variant');
          link.classList.add('bg-primary-container', 'text-on-primary-container', 'font-label-action', 'font-semibold', 'rounded');
        }
      });

      // Bind Search Icon Click
      document.querySelectorAll('header button[aria-label*="Search"], header [data-action="search"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openSearch();
        });
      });

      // Bind Cart Icon Click
      document.querySelectorAll('header button[aria-label*="Cart"], header [data-action="cart"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openCart();
        });
      });

      // Bind Wishlist Icon Click
      document.querySelectorAll('header button[aria-label*="Wishlist"], header [data-action="wishlist"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openWishlist();
        });
      });

      // Bind Account / Profile Button
      document.querySelectorAll('header [data-action="account"], header a[href*="auth"], header a[href*="account"]').forEach(elem => {
        elem.addEventListener('click', (e) => {
          e.preventDefault();
          if (State.isAuthenticated()) {
            window.location.href = 'account.html';
          } else {
            window.location.href = 'auth.html';
          }
        });
      });

      // Bind Language Toggle (EN | العربية)
      document.querySelectorAll('header .lang-toggle, header [data-action="lang-switch"]').forEach(elem => {
        elem.addEventListener('click', () => {
          const current = State.getLanguage();
          const next = current === 'EN' ? 'AR' : 'EN';
          State.setLanguage(next);
          this.showToast(
            next === 'AR' ? 'تم تحويل الواجهة إلى اللغة العربية (الديوان الملكي)' : 'Language switched to English (Kuwait Atelier)',
            'Language / اللغة',
            'translate'
          );
        });
      });
    },

    updateHeaderBadges() {
      const cartCount = State.getCartCount();
      const wishlistCount = State.getWishlist().length;

      document.querySelectorAll('.header-cart-badge, header button[aria-label*="Cart"] span.absolute').forEach(badge => {
        badge.textContent = cartCount;
        badge.style.display = cartCount > 0 ? 'flex' : 'none';
      });

      document.querySelectorAll('.header-wishlist-badge, header button[aria-label*="Wishlist"] span.absolute').forEach(badge => {
        badge.textContent = wishlistCount;
        badge.style.display = wishlistCount > 0 ? 'flex' : 'none';
      });
    },

    bindGlobalKeyboardShortcuts() {
      document.addEventListener('keydown', (e) => {
        // Cmd/Ctrl + K opens search
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          this.openSearch();
        }
        // ESC closes active modals/drawers
        if (e.key === 'Escape') {
          this.closeSearch();
          this.closeCart();
          this.closeWishlist();
          this.closeMobileMenu();
        }
      });
    },

    bindGenericActionButtons() {
      // Global quick add to cart buttons
      document.querySelectorAll('[data-add-cart]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const productId = btn.getAttribute('data-add-cart');
          State.addToCart(productId);
          this.showToast('Added to Bespoke Cart', 'Cart Protocol', 'shopping_bag');
          this.openCart();
        });
      });

      // Global wishlist toggle buttons
      document.querySelectorAll('[data-toggle-wishlist]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const productId = btn.getAttribute('data-toggle-wishlist');
          const isAdded = State.toggleWishlist(productId);
          this.showToast(
            isAdded ? 'Added to Saved Insignias' : 'Removed from Saved Insignias',
            'Dossier Wishlist',
            isAdded ? 'favorite' : 'favorite_border'
          );
        });
      });
    },

    bindNewsletter() {
      document.querySelectorAll('footer form, .newsletter-form').forEach(form => {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const input = form.querySelector('input[type="email"]');
          if (input && input.value) {
            this.showToast(`Subscribed ${input.value} to Sovereign Atelier Dispatches.`, 'Subscription Protocol', 'mark_email_read');
            input.value = '';
          }
        });
      });
    },

    subscribeToState() {
      State.subscribe('cart_updated', () => {
        this.updateHeaderBadges();
        this.updateCartDrawer();
      });

      State.subscribe('wishlist_updated', () => {
        this.updateHeaderBadges();
        this.updateWishlistDrawer();
      });

      State.subscribe('auth_changed', ({ user, isAuthenticated }) => {
        if (isAuthenticated) {
          this.showToast(`Welcome back, ${user.fullName}`, 'Sovereign Client Authenticated', 'verified_user');
        }
      });
    }
  };

  // Drawer aliases for backward compatibility across all templates
  IDCraftApp.openCartDrawer = () => IDCraftApp.openCart();
  IDCraftApp.closeCartDrawer = () => IDCraftApp.closeCart();
  IDCraftApp.openWishlistDrawer = () => IDCraftApp.openWishlist();
  IDCraftApp.closeWishlistDrawer = () => IDCraftApp.closeWishlist();

  // Attach to window and auto-initialize on DOM ready
  window.IDCraftApp = IDCraftApp;
  window.IDApp = IDCraftApp;
  document.addEventListener('DOMContentLoaded', () => IDCraftApp.init());

})(window, document);
