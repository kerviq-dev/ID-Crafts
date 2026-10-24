/**
 * ID CRAFTS LUXURY ATELIER — INTERACTIVE CUSTOMIZATION & STUDIO ENGINES
 * Handles live visual feedback for ID Cards, Drinkware Laser Etching, Custom Orders, and Bulk Quotes.
 */

(function(window, document) {
  'use strict';

  const State = window.IDCraftState;
  const App = window.IDCraftApp;

  const IDCraftCustomizer = {
    init() {
      this.initIDCardStudio();
      this.initDrinkwareStudio();
      this.initCustomOrderWizard();
      this.initCorporateQuoteStudio();
    },

    // ==========================================
    // 1. ID CARDS LIVE CONFIGURATOR STUDIO
    // ==========================================
    initIDCardStudio() {
      const studio = document.getElementById('id-card-studio-container');
      if (!studio) return;

      const nameInput = studio.querySelector('#card-input-name');
      const titleInput = studio.querySelector('#card-input-title');
      const deptInput = studio.querySelector('#card-input-dept');
      const chipRadios = studio.querySelectorAll('input[name="card-chip-type"]');
      const finishPills = studio.querySelectorAll('.card-finish-pill');
      const addBtn = studio.querySelector('#add-custom-card-btn');

      // Live Mockup Display Targets
      const previewName = studio.querySelector('#preview-card-name');
      const previewTitle = studio.querySelector('#preview-card-title');
      const previewDept = studio.querySelector('#preview-card-dept');
      const previewChip = studio.querySelector('#preview-card-chip');
      const previewFinish = studio.querySelector('#preview-card-finish-label');
      const previewCardSurface = studio.querySelector('#preview-card-surface');

      let currentFinish = 'Grade 5 Brushed Titanium';
      let currentChip = 'NTAG424 DNA Cryptographic';

      // Update name live
      if (nameInput && previewName) {
        nameInput.addEventListener('input', (e) => {
          previewName.textContent = e.target.value.trim() || 'SHEIKH FAHAD AL-AHMAD';
        });
      }

      // Update title live
      if (titleInput && previewTitle) {
        titleInput.addEventListener('input', (e) => {
          previewTitle.textContent = e.target.value.trim() || 'MANAGING DIRECTOR & FOUNDER';
        });
      }

      // Update department live
      if (deptInput && previewDept) {
        deptInput.addEventListener('input', (e) => {
          previewDept.textContent = e.target.value.trim() || 'SOVEREIGN EXECUTIVE BOARD';
        });
      }

      // Chip selector
      chipRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.checked) {
            currentChip = e.target.value;
            if (previewChip) previewChip.textContent = currentChip;
          }
        });
      });

      // Finish selector
      finishPills.forEach(pill => {
        pill.addEventListener('click', () => {
          finishPills.forEach(p => p.classList.remove('active', 'border-primary', 'bg-primary/10'));
          pill.classList.add('active', 'border-primary', 'bg-primary/10');
          currentFinish = pill.getAttribute('data-finish') || pill.innerText.trim();
          if (previewFinish) previewFinish.textContent = currentFinish;

          // Visual theme adjust on mockup
          if (previewCardSurface) {
            if (currentFinish.includes('Titanium')) {
              previewCardSurface.style.background = 'linear-gradient(135deg, #1c1d20 0%, #2a2b2f 50%, #17181a 100%)';
            } else if (currentFinish.includes('Obsidian')) {
              previewCardSurface.style.background = 'linear-gradient(135deg, #0d0e10 0%, #151619 100%)';
            } else if (currentFinish.includes('Gold') || currentFinish.includes('Champagne')) {
              previewCardSurface.style.background = 'linear-gradient(135deg, #2b2308 0%, #1a170a 100%)';
            }
          }
        });
      });

      // Add Configured Card to Cart
      if (addBtn) {
        addBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const cardName = (nameInput && nameInput.value.trim()) || 'SHEIKH FAHAD AL-AHMAD';
          const cardTitle = (titleInput && titleInput.value.trim()) || 'MANAGING DIRECTOR & FOUNDER';
          const cardDept = (deptInput && deptInput.value.trim()) || 'SOVEREIGN EXECUTIVE BOARD';

          const options = {
            'Cardholder': cardName,
            'Title': cardTitle,
            'Unit/Board': cardDept,
            'Finish Alloy': currentFinish,
            'Encryption Chip': currentChip
          };

          State.addToCart('card-grade5-titanium', options, 1);
          App.showToast(`Bespoke Card (${cardName}) configured & added to cart!`, 'Credential Studio', 'verified');
          App.openCart();
        });
      }
    },

    // ==========================================
    // 2. DRINKWARE 360° ROTARY LASER STUDIO
    // ==========================================
    initDrinkwareStudio() {
      const studio = document.getElementById('drinkware-studio-container');
      if (!studio) return;

      const textInput = studio.querySelector('#laser-input-text');
      const scriptSelect = studio.querySelector('#laser-script-select');
      const crestPills = studio.querySelectorAll('.crest-select-pill');
      const colorPills = studio.querySelectorAll('.drinkware-color-pill');
      const addBtn = studio.querySelector('#add-custom-drinkware-btn');

      // Live Mockup Targets
      const previewEngraving = studio.querySelector('#preview-laser-text');
      const previewCrest = studio.querySelector('#preview-laser-crest');
      const previewFinish = studio.querySelector('#preview-vessel-finish');

      let currentScript = 'Diwani Royal Script';
      let currentCrest = 'State Falcon Insignia';
      let currentColor = 'Matte Obsidian';

      if (textInput && previewEngraving) {
        textInput.addEventListener('input', (e) => {
          previewEngraving.textContent = e.target.value.trim() || 'ناصر الصباح — KUWAIT';
        });
      }

      if (scriptSelect && previewEngraving) {
        scriptSelect.addEventListener('change', (e) => {
          currentScript = e.target.value;
          previewEngraving.style.letterSpacing = currentScript.includes('Geometric') ? '0.2em' : '0.05em';
        });
      }

      crestPills.forEach(pill => {
        pill.addEventListener('click', () => {
          crestPills.forEach(p => p.classList.remove('border-primary', 'bg-primary/20'));
          pill.classList.add('border-primary', 'bg-primary/20');
          currentCrest = pill.getAttribute('data-crest') || pill.innerText.trim();
          if (previewCrest) previewCrest.textContent = currentCrest;
        });
      });

      colorPills.forEach(pill => {
        pill.addEventListener('click', () => {
          colorPills.forEach(p => p.classList.remove('ring-2', 'ring-primary'));
          pill.classList.add('ring-2', 'ring-primary');
          currentColor = pill.getAttribute('data-color') || 'Matte Obsidian';
          if (previewFinish) previewFinish.textContent = currentColor;
        });
      });

      if (addBtn) {
        addBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const customText = (textInput && textInput.value.trim()) || 'ناصر الصباح — KUWAIT';
          const options = {
            '360° Engraving': customText,
            'Calligraphy Script': currentScript,
            'Hallmark Crest': currentCrest,
            'Vessel Finish': currentColor
          };

          State.addToCart('tumbler-360-obsidian', options, 1);
          App.showToast(`Custom Laser Tumbler (${customText}) added to cart!`, 'Laser Studio', 'bolt');
          App.openCart();
        });
      }
    },

    // ==========================================
    // 3. CUSTOM ORDER 4-STEP WIZARD
    // ==========================================
    initCustomOrderWizard() {
      const form = document.getElementById('custom-order-wizard-form');
      if (!form) return;

      const dropzone = form.querySelector('#custom-logo-dropzone');
      const fileInput = form.querySelector('#custom-logo-file-input');
      const filePreview = form.querySelector('#custom-logo-preview-name');

      // Drag & Drop
      if (dropzone && fileInput) {
        dropzone.addEventListener('click', () => fileInput.click());

        dropzone.addEventListener('dragover', (e) => {
          e.preventDefault();
          dropzone.classList.add('border-primary', 'bg-primary/5');
        });

        dropzone.addEventListener('dragleave', () => {
          dropzone.classList.remove('border-primary', 'bg-primary/5');
        });

        dropzone.addEventListener('drop', (e) => {
          e.preventDefault();
          dropzone.classList.remove('border-primary', 'bg-primary/5');
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelect(e.dataTransfer.files[0]);
          }
        });

        fileInput.addEventListener('change', (e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
          }
        });
      }

      function handleFileSelect(file) {
        if (filePreview) {
          filePreview.textContent = `✓ Uploaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
          filePreview.classList.remove('hidden');
        }
        App.showToast(`Asset "${file.name}" staged for vector laser calibration.`, 'Artwork Calibration', 'upload_file');
      }

      // Submission
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const category = form.querySelector('#custom-req-category')?.value || 'Bespoke ID Cards & Hardware';
        const quantity = parseInt(form.querySelector('#custom-req-qty')?.value || '10');
        const finish = form.querySelector('#custom-req-finish')?.value || 'Grade-5 Titanium PVD Gold';
        const notes = form.querySelector('#custom-req-notes')?.value || 'Custom board member cards with Arabic family crest.';
        const clientName = form.querySelector('#custom-req-name')?.value || 'Valued Patron';
        const clientEmail = form.querySelector('#custom-req-email')?.value || 'patron@idcraft.kw';

        const newReq = State.addCustomRequest({
          category,
          quantity,
          finish,
          notes,
          clientName,
          clientEmail
        });

        // Show Confirmation Modal
        IDCraftCustomizer.showCustomRequestSuccessModal(newReq);
      });
    },

    showCustomRequestSuccessModal(req) {
      let modal = document.getElementById('custom-req-success-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'custom-req-success-modal';
        modal.className = 'modal-backdrop fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4';
        document.body.appendChild(modal);
      }

      modal.innerHTML = `
        <div class="modal-content w-full max-w-lg bg-surface-container-low border border-primary/40 rounded-xl p-8 text-center shadow-2xl relative">
          <div class="w-16 h-16 rounded-full bg-primary/20 text-primary border border-primary/50 flex items-center justify-center mx-auto mb-4">
            <span class="material-symbols-outlined text-3xl">verified_user</span>
          </div>
          <span class="font-label-eyebrow text-xs uppercase tracking-[0.24em] text-primary block">Commission Registered</span>
          <h3 class="font-headline-xl text-2xl uppercase tracking-tight text-on-surface mt-1">Request Dispatched</h3>
          <p class="font-body-md text-sm text-on-surface-variant mt-2 leading-relaxed">
            Your bespoke commission dossier has been assigned to our master metallurgy craftsman in Shuwaikh.
          </p>

          <div class="my-6 p-4 rounded bg-surface-container border border-outline-variant/40 flex items-center justify-between">
            <div class="text-left">
              <span class="font-label-mono-spec text-[10px] text-on-surface-variant uppercase block">Commission Ref Code</span>
              <span class="font-headline-sm text-base text-primary font-bold">${req.refCode}</span>
            </div>
            <span class="px-2.5 py-1 rounded bg-primary/10 text-primary text-xs font-label-mono-spec uppercase">Atelier Review</span>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <a href="account.html" class="flex-1 py-3 bg-primary hover:bg-primary-fixed text-on-primary font-label-action text-xs uppercase tracking-widest rounded font-bold transition-all">
              View in My Dossier
            </a>
            <button id="close-success-modal-btn" class="flex-1 py-3 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-action text-xs uppercase tracking-widest rounded transition-all">
              Done
            </button>
          </div>
        </div>
      `;

      modal.classList.add('active');
      modal.querySelector('#close-success-modal-btn').addEventListener('click', () => {
        modal.classList.remove('active');
      });
    },

    // ==========================================
    // 4. CORPORATE BULK FLEET QUOTE STUDIO
    // ==========================================
    initCorporateQuoteStudio() {
      const container = document.getElementById('corporate-quote-studio');
      if (!container) return;

      const volumeSlider = container.querySelector('#bulk-volume-slider');
      const volumeDisplay = container.querySelector('#bulk-volume-display');
      const unitRateDisplay = container.querySelector('#bulk-unit-rate');
      const totalEstDisplay = container.querySelector('#bulk-total-estimate');
      const rfqForm = container.querySelector('#corporate-rfq-form');

      function calculateBulkRate(qty) {
        let baseRate = 24.500;
        if (qty >= 500) baseRate = 16.500;
        else if (qty >= 250) baseRate = 18.000;
        else if (qty >= 100) baseRate = 20.000;
        else if (qty >= 50) baseRate = 22.000;

        const total = qty * baseRate;
        return { unitRate: baseRate, total };
      }

      if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
          const qty = parseInt(e.target.value);
          if (volumeDisplay) volumeDisplay.textContent = qty + ' Units';
          const calc = calculateBulkRate(qty);
          if (unitRateDisplay) unitRateDisplay.textContent = calc.unitRate.toFixed(3) + ' KWD';
          if (totalEstDisplay) totalEstDisplay.textContent = calc.total.toFixed(3) + ' KWD';
        });
      }

      if (rfqForm) {
        rfqForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const company = rfqForm.querySelector('#rfq-company')?.value || 'Corporate Enterprise';
          const contactPerson = rfqForm.querySelector('#rfq-person')?.value || 'Executive Lead';
          const email = rfqForm.querySelector('#rfq-email')?.value || 'rfq@enterprise.kw';
          const volume = parseInt(volumeSlider ? volumeSlider.value : '250');
          const calc = calculateBulkRate(volume);

          const quote = State.addCorporateQuote({
            company,
            contactPerson,
            email,
            volume,
            estimatedTotal: calc.total
          });

          App.showToast(`Corporate RFQ (${quote.quoteRef}) submitted for ${company}.`, 'Corporate Quotation Protocol', 'business');
          IDCraftCustomizer.showCorporateQuoteModal(quote);
        });
      }
    },

    showCorporateQuoteModal(quote) {
      let modal = document.getElementById('corporate-quote-success-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'corporate-quote-success-modal';
        modal.className = 'modal-backdrop fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4';
        document.body.appendChild(modal);
      }

      modal.innerHTML = `
        <div class="modal-content w-full max-w-lg bg-surface-container-low border border-primary/40 rounded-xl p-8 text-center shadow-2xl relative">
          <div class="w-16 h-16 rounded-full bg-primary/20 text-primary border border-primary/50 flex items-center justify-center mx-auto mb-4">
            <span class="material-symbols-outlined text-3xl">corporate_fare</span>
          </div>
          <span class="font-label-eyebrow text-xs uppercase tracking-[0.24em] text-primary block">Enterprise Protocol Dispatched</span>
          <h3 class="font-headline-xl text-2xl uppercase tracking-tight text-on-surface mt-1">Quotation In Process</h3>
          <p class="font-body-md text-sm text-on-surface-variant mt-2 leading-relaxed">
            A formal procurement dossier with volume tier discounts has been queued for <strong>${quote.company}</strong>.
          </p>

          <div class="my-6 p-4 rounded bg-surface-container border border-outline-variant/40 space-y-2 text-left">
            <div class="flex justify-between">
              <span class="font-label-mono-spec text-xs text-on-surface-variant uppercase">Quotation Reference</span>
              <span class="font-label-mono-spec text-xs text-primary font-bold">${quote.quoteRef}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-label-mono-spec text-xs text-on-surface-variant uppercase">Fleet Volume</span>
              <span class="font-label-mono-spec text-xs text-on-surface font-semibold">${quote.volume} Units</span>
            </div>
            <div class="flex justify-between border-t border-outline-variant/30 pt-2">
              <span class="font-label-mono-spec text-xs text-on-surface-variant uppercase">Estimated Budget</span>
              <span class="font-headline-sm text-sm text-primary font-bold">${quote.estimatedTotal.toFixed(3)} KWD</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <a href="account.html" class="flex-1 py-3 bg-primary hover:bg-primary-fixed text-on-primary font-label-action text-xs uppercase tracking-widest rounded font-bold transition-all">
              Track in Account
            </a>
            <button id="close-corp-modal-btn" class="flex-1 py-3 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-action text-xs uppercase tracking-widest rounded transition-all">
              Done
            </button>
          </div>
        </div>
      `;

      modal.classList.add('active');
      modal.querySelector('#close-corp-modal-btn').addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }
  };

  window.IDCraftCustomizer = IDCraftCustomizer;
  document.addEventListener('DOMContentLoaded', () => IDCraftCustomizer.init());

})(window, document);
