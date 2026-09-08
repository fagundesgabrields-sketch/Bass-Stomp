/**
 * BASS STOMP — INTERACTIVE STORE SCRIPTS
 * Visual Identity: bass-stomp-design-tokens.md
 * Complete, Production-Ready Implementation
 */

/* ==========================================================================
   GLOBAL STATE & STORAGE
   ========================================================================== */
const state = {
  selectedPedal: 'all',
  selectedBrand: 'all',
  searchQuery: '',
  sortBy: 'default', // 'default', 'price-asc', 'price-desc', 'name-asc'
  alphaMidFreq: 800, // 250 or 800 Hz
  cart: JSON.parse(localStorage.getItem('bassStompCart') || '[]'),
  currentModalProduct: null,
  isAudioPlaying: false,
  isBypassMode: false,
  audioCtx: null,
  audioOsc: null,
  audioGain: null,
  audioFilter: null
};

function getStoreData() {
  if (typeof window !== 'undefined' && window.BASS_STOMP_DATA) return window.BASS_STOMP_DATA;
  if (typeof BASS_STOMP_DATA !== 'undefined') return BASS_STOMP_DATA;
  return null;
}

function normalizeStr(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initPedaleirasGrid();
  renderProducts();
  initSearchAndFilters();
  initSortControl();
  initToneTester();
  initCart();
  initVideosGrid();
  initVideoModals();
  initMobileMenu();
  initFaqAccordion();
  initSmoothScrollNav();
  initHeaderScroll();
  initContactForm();
  updateCartUI();
});

/* ==========================================================================
   0. HEADER & NAVIGATION UTILITIES
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initSmoothScrollNav() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });

        // Close mobile drawer if active
        document.getElementById('mobile-drawer-nav')?.classList.remove('active');
        const menuBtn = document.getElementById('menu-toggle-btn');
        if (menuBtn) {
          menuBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        }
      }
    });
  });
}

/* ==========================================================================
   1. PEDALEIRAS SELECTOR & BRAND CORRELATION
   ========================================================================== */
function pedalMatchesProduct(pedalName, prod) {
  if (!pedalName || pedalName === 'all') return true;
  const normPed = normalizeStr(pedalName);
  const normCat = normalizeStr(prod.category_tag);
  const normName = normalizeStr(prod.name);

  // Captura NAM distinction
  if (normPed.includes('nam')) {
    return normCat.includes('nam') || normName.includes('nam');
  }
  if (normCat.includes('nam') && !normPed.includes('nam')) {
    return false;
  }

  // POD Express
  if (normPed.includes('podexpress')) {
    return normCat.includes('podexpress') || normName.includes('podexpress');
  }

  // HX Stomp family (includes packs named with HX or HX Stomp)
  if (normPed.includes('hx') && (normCat.includes('hx') || normName.includes('hx'))) return true;

  // Valeton GP200 family compatibility (GP200, GP200 JR, GP 200 LT share presets)
  if (normPed.includes('gp200') && (normCat.includes('gp200') || normName.includes('gp200'))) return true;

  // Zoom B3 vs B3n distinction
  if ((normPed === 'zoomb3' || normPed === 'b3') && (normCat.includes('b3n') || normName.includes('b3n'))) return false;
  if ((normPed.includes('b3n')) && !normCat.includes('b3n') && !normName.includes('b3n')) return false;

  // Zoom B1on vs B1 Four distinction
  if (normPed.includes('b1four') && (normCat.includes('b1on') || normName.includes('b1on'))) return false;
  if (normPed.includes('b1on') && (normCat.includes('b1four') || normName.includes('b1four'))) return false;

  // Ampero Mini vs Ampero II vs Ampero One distinction
  if (normPed.includes('amperomini') && !normCat.includes('amperomini') && !normName.includes('amperomini')) return false;
  if ((normPed.includes('ampero2') || normPed.includes('amperoii')) && !normCat.includes('ampero2') && !normCat.includes('amperoii') && !normName.includes('ampero2') && !normName.includes('amperoii')) return false;
  if (normPed.includes('amperoone') && !normCat.includes('amperoone') && !normName.includes('amperoone')) return false;

  return normCat.includes(normPed) || normPed.includes(normCat) || normName.includes(normPed) || normPed.includes(normName);
}

function pedalMatchesBrand(pedalName, brand) {
  if (!brand || brand === 'all') return true;
  const normPed = normalizeStr(pedalName);
  if (brand === 'nam') return normPed.includes('nam');
  if (brand === 'line6') return normPed.includes('hx') || normPed.includes('pod');
  if (brand === 'ampero') return normPed.includes('ampero');
  if (brand === 'boss') return normPed.includes('boss') || normPed.includes('gt') || normPed.includes('gx');
  if (brand === 'valeton') return normPed.includes('valeton') || normPed.includes('gp');
  if (brand === 'zoom') return normPed.includes('zoom') || normPed.includes('b3') || normPed.includes('b1');
  return true;
}

function initPedaleirasGrid() {
  const container = document.getElementById('pedaleiras-grid');
  const store = getStoreData();
  if (!container || !store) return;

  const pedaleiras = store.pedaleiras;

  // Compute exact product count per pedal using normalized matching
  const counts = {};
  pedaleiras.forEach(ped => {
    let count = 0;
    store.products.forEach(p => {
      if (pedalMatchesProduct(ped.pageName, p)) count++;
    });
    counts[ped.pageName] = count;
  });

  // Filter pedaleiras based on selectedBrand
  const visiblePedaleiras = pedaleiras.filter(ped => pedalMatchesBrand(ped.pageName, state.selectedBrand));

  container.innerHTML = visiblePedaleiras.map(ped => {
    const count = counts[ped.pageName] || 0;
    const isSelected = state.selectedPedal === ped.pageName;
    const label = count === 1 ? '1 pack' : (count > 1 ? `${count} packs` : 'Em breve');
    return `
      <div class="pedal-card ${isSelected ? 'active' : ''}" data-pedal="${ped.pageName}">
        <div class="screw tl"></div><div class="screw tr"></div>
        <div class="pedal-thumb-wrap">
          <img src="assets/images/pedaleiras/${ped.fileName}" alt="${ped.pageName}" loading="lazy" />
        </div>
        <div class="pedal-name">${ped.pageName}</div>
        <div class="pedal-count">${label}</div>
      </div>
    `;
  }).join('');

  // Click handler on pedal cards
  container.querySelectorAll('.pedal-card').forEach(card => {
    card.addEventListener('click', () => {
      const pedalName = card.getAttribute('data-pedal');
      if (state.selectedPedal === pedalName) {
        state.selectedPedal = 'all';
      } else {
        state.selectedPedal = pedalName;
      }

      container.querySelectorAll('.pedal-card').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-pedal') === state.selectedPedal);
      });

      renderProducts();

      // Smooth scroll to catalog
      const catalogEl = document.getElementById('vitrine-produtos');
      if (catalogEl) {
        const offset = 80;
        const pos = catalogEl.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   2. PRODUCTS GRID, FILTERING & SORTING
   ========================================================================== */
function renderProducts() {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('catalog-count');
  const store = getStoreData();
  if (!grid || !store) return;

  let items = [...store.products];

  // 1. Filter by pedalboard
  if (state.selectedPedal !== 'all') {
    items = items.filter(p => pedalMatchesProduct(state.selectedPedal, p));
  }

  // 2. Filter by brand tab
  if (state.selectedBrand !== 'all') {
    const brand = state.selectedBrand;
    items = items.filter(p => {
      const normName = normalizeStr(p.name);
      const normCat = normalizeStr(p.category_tag);
      if (brand === 'nam') return normName.includes('nam') || normCat.includes('nam');
      if (brand === 'line6') return normName.includes('hx') || normName.includes('pod') || normCat.includes('hx') || normCat.includes('pod');
      if (brand === 'ampero') return normName.includes('ampero') || normCat.includes('ampero');
      if (brand === 'boss') return normName.includes('boss') || normName.includes('gt') || normName.includes('gx') || normCat.includes('boss') || normCat.includes('gt') || normCat.includes('gx');
      if (brand === 'valeton') return normName.includes('valeton') || normName.includes('gp') || normCat.includes('valeton') || normCat.includes('gp');
      if (brand === 'zoom') return normName.includes('zoom') || normName.includes('b3') || normName.includes('b1') || normCat.includes('zoom') || normCat.includes('b3') || normCat.includes('b1');
      return true;
    });
  }

  // 3. Filter by search query
  if (state.searchQuery.trim() !== '') {
    const q = normalizeStr(state.searchQuery);
    items = items.filter(p =>
      normalizeStr(p.name).includes(q) ||
      normalizeStr(p.category_tag).includes(q)
    );
  }

  // 4. Sort items
  if (state.sortBy === 'price-asc') {
    items.sort((a, b) => {
      const priceA = (a.comparePrice && a.comparePrice > 0 && a.comparePrice < a.price) ? a.comparePrice : a.price;
      const priceB = (b.comparePrice && b.comparePrice > 0 && b.comparePrice < b.price) ? b.comparePrice : b.price;
      return priceA - priceB;
    });
  } else if (state.sortBy === 'price-desc') {
    items.sort((a, b) => {
      const priceA = (a.comparePrice && a.comparePrice > 0 && a.comparePrice < a.price) ? a.comparePrice : a.price;
      const priceB = (b.comparePrice && b.comparePrice > 0 && b.comparePrice < b.price) ? b.comparePrice : b.price;
      return priceB - priceA;
    });
  } else if (state.sortBy === 'name-asc') {
    items.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Update counter
  if (countEl) {
    countEl.textContent = `${items.length} ${items.length === 1 ? 'pack encontrado' : 'packs disponíveis'}`;
  }

  // Render empty state if no packs match
  if (items.length === 0) {
    const pedalName = state.selectedPedal !== 'all' ? state.selectedPedal : 'sua busca';
    const whatsappMsg = encodeURIComponent(`Olá Sergio! Tenho uma pedaleira ${pedalName} e queria saber quando você vai lançar presets para ela.`);
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 24px; background: var(--ink-soft); border-radius: var(--radius-md); border: 1px dashed var(--line-dark);">
        <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(255,90,34,0.15); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
          <span class="led orange" style="width: 10px; height: 10px;"></span>
        </div>
        <p style="font-family: var(--font-display); font-size: 26px; line-height: 1.1; margin-bottom: 8px;">
          PRESETS EM CALIBRAÇÃO PARA ESTE MODELO
        </p>
        <p style="font-size: 14.5px; color: rgba(242,238,228,0.7); max-width: 520px; margin: 0 auto 24px; line-height: 1.5;">
          O Sergio Rodrigues está afinando os blocos de amplificador e IRs na bancada. Você pode encomendar um preset sob medida direto com ele agora mesmo!
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <a href="https://wa.me/5511999999999?text=${whatsappMsg}" target="_blank" class="btn-primary" style="font-size: 13px;">
            Pedir Preset sob Medida no WhatsApp
          </a>
          <button class="btn-secondary" onclick="resetFilters()" style="font-size: 13px;">
            Ver Todos os Packs da Loja
          </button>
        </div>
      </div>
    `;
    return;
  }

  // Render product cards
  grid.innerHTML = items.map(prod => {
    const imgUrl = prod.localImage || 'assets/images/hx-stomp-board.png';
    const isPromo = prod.comparePrice && prod.comparePrice > 0 && prod.comparePrice < prod.price;
    const ribbonText = prod.ribbon || (isPromo ? 'Promoção' : '');
    const isBestSeller = (ribbonText && ribbonText.toLowerCase().includes('mais vendido')) || prod.name.includes('HX STOMP');
    const isNew = ribbonText && (ribbonText.toLowerCase().includes('novidade') || ribbonText.toLowerCase().includes('novo'));

    const displayPrice = isPromo ? prod.comparePrice : prod.price;
    const oldPrice = isPromo ? prod.price : null;
    const pedalTag = prod.category_tag || extractPedalName(prod.name);

    const formatPrice = (v) => {
      if (typeof v !== 'number' || isNaN(v)) return 'Consulte';
      return 'R$ ' + v.toFixed(2).replace('.', ',');
    };

    const prodUrl = `produto.html?id=${prod.urlPart || prod.id}`;
    return `
      <div class="product-card plate" data-id="${prod.id}" onclick="if(!event.target.closest('.btn-buy-pill')) window.location.href='${prodUrl}'">
        <div class="screw tl"></div><div class="screw tr"></div>
        <div class="product-media">
          ${ribbonText ? `
            <div class="product-ribbon ${isBestSeller ? 'bestseller' : (isNew ? 'new' : '')}">
              <span class="led ${isBestSeller ? '' : 'orange'}"></span>
              ${ribbonText}
            </div>
          ` : ''}
          <a href="${prodUrl}" class="product-media-link" aria-label="${prod.name}">
            <img src="${imgUrl}" alt="${prod.name}" loading="lazy" onerror="this.src='assets/images/logo.png'" />
          </a>
        </div>
        <div class="product-body">
          <div class="product-pedal-spec">
            <span>${pedalTag}</span>
            <span class="dot">·</span>
            <span>PRESET PACK</span>
          </div>
          <h3 class="product-title">
            <a href="${prodUrl}">${prod.name}</a>
          </h3>
          <div class="product-tech-params">
            <span class="tech-tag">IR INCLUSO</span>
            <span class="tech-tag">LINE LEVEL</span>
            <span class="tech-tag">DOWNLOAD</span>
          </div>
          <div class="product-footer">
            <div class="price-container">
              ${oldPrice ? `<span class="price-old">${formatPrice(oldPrice)}</span>` : ''}
              <span class="price-current">${formatPrice(displayPrice)}</span>
            </div>
            <button class="btn-buy-pill" onclick="event.stopPropagation(); addToCart('${prod.id}')" title="Adicionar ao carrinho">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              Comprar
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function extractPedalName(name) {
  const upper = (name || '').toUpperCase();
  if (upper.includes('CAPTURA NAM') || upper.includes('NAM')) return 'CAPTURA NAM';
  if (upper.includes('HX STOMP')) return 'HX STOMP';
  if (upper.includes('AMPERO 2') || upper.includes('AMPERO II')) return 'AMPERO II';
  if (upper.includes('AMPERO MINI')) return 'AMPERO MINI';
  if (upper.includes('AMPERO ONE')) return 'AMPERO ONE';
  if (upper.includes('BOSS GX-1B') || upper.includes('GX1B')) return 'BOSS GX-1B';
  if (upper.includes('BOSS GT-1B') || upper.includes('GT1B')) return 'BOSS GT-1B';
  if (upper.includes('VALETON GP200')) return 'VALETON GP200';
  if (upper.includes('VALETON GP100')) return 'VALETON GP100';
  if (upper.includes('ZOOM B3N') || upper.includes('B3N')) return 'ZOOM B3N';
  if (upper.includes('POD GO')) return 'POD GO';
  if (upper.includes('POD EXPRESS')) return 'POD EXPRESS';
  if (upper.includes('MATRIBOX')) return 'MATRIBOX';
  if (upper.includes('B1 FOUR')) return 'ZOOM B1 FOUR';
  if (upper.includes('B1ON')) return 'ZOOM B1ON';
  if (upper.includes('ZOOM B3')) return 'ZOOM B3';
  return 'BASS PRESET';
}

/* ==========================================================================
   3. SEARCH, BRAND TABS & SORT CONTROLS
   ========================================================================== */
function initSearchAndFilters() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.searchQuery = e.target.value;
        renderProducts();
      }, 200);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        state.searchQuery = '';
        renderProducts();
        searchInput.blur();
      }
    });
  }

  const brandButtons = document.querySelectorAll('.brand-filters .filter-btn');
  brandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      brandButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedBrand = btn.getAttribute('data-brand') || 'all';
      state.selectedPedal = 'all'; // Reset pedal selection to match new brand scope
      initPedaleirasGrid(); // Re-render pedal cards for this brand
      renderProducts();
    });
  });
}

function initSortControl() {
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }
}

function resetFilters() {
  state.selectedPedal = 'all';
  state.selectedBrand = 'all';
  state.searchQuery = '';
  state.sortBy = 'default';

  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.value = 'default';

  document.querySelectorAll('.brand-filters .filter-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-brand') === 'all');
  });

  initPedaleirasGrid();
  renderProducts();
}

/* ==========================================================================
   4. QUICK VIEW MODAL (FICHA TÉCNICA)
   ========================================================================== */
function openQuickView(idOrSlug) {
  const store = getStoreData();
  if (!store) return;
  const prod = store.products.find(p => p.id === idOrSlug || p.urlPart === idOrSlug);
  if (!prod) return;

  state.currentModalProduct = prod;
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;

  const isPromo = prod.comparePrice && prod.comparePrice > 0 && prod.comparePrice < prod.price;
  const displayPrice = isPromo ? prod.comparePrice : prod.price;
  const oldPrice = isPromo ? prod.price : null;
  const pedalTag = prod.category_tag || extractPedalName(prod.name);

  const formatPrice = (v) => {
    if (typeof v !== 'number' || isNaN(v)) return 'Consulte';
    return 'R$ ' + v.toFixed(2).replace('.', ',');
  };

  const modalImg = document.getElementById('modal-img');
  if (modalImg) {
    modalImg.src = prod.localImage || 'assets/images/hx-stomp-board.png';
    modalImg.alt = prod.name;
  }

  const modalPedal = document.getElementById('modal-pedal');
  if (modalPedal) modalPedal.textContent = pedalTag;

  const modalTitle = document.getElementById('modal-title');
  if (modalTitle) modalTitle.textContent = prod.name;

  const modalPriceCur = document.getElementById('modal-price-current');
  if (modalPriceCur) modalPriceCur.textContent = formatPrice(displayPrice);

  const modalPriceOld = document.getElementById('modal-price-old');
  if (modalPriceOld) {
    modalPriceOld.textContent = oldPrice ? formatPrice(oldPrice) : '';
    modalPriceOld.style.display = oldPrice ? 'inline' : 'none';
  }

  const modalLink = document.getElementById('modal-full-link');
  if (modalLink) modalLink.href = `produto.html?id=${prod.urlPart || prod.id}`;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  const escHandler = (e) => {
    if (e.key === 'Escape') closeQuickView();
    document.removeEventListener('keydown', escHandler);
  };
  document.addEventListener('keydown', escHandler);

  modal.onclick = (e) => {
    if (e.target === modal) closeQuickView();
  };
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   5. A/B TONE TESTER — DEMO DO CIRCUITO ANALÓGICO ALPHA (ÁUDIO REAL A/B)
   ========================================================================== */

// Barulho de clique em botões desativado
function playSwitchClick() {}

function initToneTester() {
  const playBtn = document.getElementById('btn-play-tone');
  const btnAbDi = document.getElementById('btn-ab-di');
  const btnAbAlpha = document.getElementById('btn-ab-alpha');
  const waveWrap = document.getElementById('waveform-wrap');
  const playerMasterLed = document.getElementById('player-master-led');
  const playBtnText = document.getElementById('play-btn-text');

  const audioDi = document.getElementById('audio-di');
  const audioAlpha = document.getElementById('audio-alpha');

  const specSat = document.getElementById('spec-val-sat');
  const specHead = document.getElementById('spec-val-head');

  if (!playBtn) return;

  let currentMode = 'alpha'; // Default: Alpha Preamp ativo
  let isPlaying = false;

  const specsData = {
    alpha: {
      sat: 'Circuito Classe A · Saturação Valvulada Alpha (Valv)',
      head: 'Alimentação +18V DC Interno · Alta Dinâmica'
    },
    di: {
      sat: 'Sinal Cru (Bypass) · Zero Harmônicos (Valv OFF)',
      head: 'Linha Padrão Passthru'
    }
  };

  function updatePlayUI(playing) {
    isPlaying = playing;
    if (playing) {
      if (playBtnText) playBtnText.textContent = 'Pausar Demonstração';
      const iconEl = playBtn.querySelector('svg');
      if (iconEl) {
        iconEl.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
      }
      waveWrap?.classList.add('playing');
      playerMasterLed?.classList.add('active');
    } else {
      if (playBtnText) playBtnText.textContent = 'Ouvir Demonstração';
      const iconEl = playBtn.querySelector('svg');
      if (iconEl) {
        iconEl.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
      }
      waveWrap?.classList.remove('playing');
      playerMasterLed?.classList.remove('active');
    }
  }

  function getCurrentAudio() {
    return currentMode === 'alpha' ? audioAlpha : audioDi;
  }

  function switchMode(newMode) {
    if (newMode === currentMode) return;
    currentMode = newMode;

    // Atualiza botões
    btnAbDi?.classList.toggle('active', currentMode === 'di');
    btnAbDi?.querySelector('.pilot-dot')?.classList.toggle('active', currentMode === 'di');

    btnAbAlpha?.classList.toggle('active', currentMode === 'alpha');
    btnAbAlpha?.querySelector('.pilot-dot')?.classList.toggle('active', currentMode === 'alpha');

    // Atualiza tabela de specs técnicas
    if (specSat) specSat.textContent = specsData[currentMode].sat;
    if (specHead) specHead.textContent = specsData[currentMode].head;

    // Se estiver tocando, comuta instantaneamente mantendo o tempo da gravação sincronizado
    if (isPlaying) {
      const oldAudio = currentMode === 'alpha' ? audioDi : audioAlpha;
      const targetAudio = currentMode === 'alpha' ? audioAlpha : audioDi;

      if (oldAudio && targetAudio) {
        const t = oldAudio.currentTime || 0;
        oldAudio.pause();
        targetAudio.currentTime = t;
        targetAudio.play().catch(() => {});
      }
    }

    showToast(currentMode === 'alpha'
      ? 'Modo Alpha Preamp: Sinal processado pelo circuito analógico'
      : 'Modo Sinal Direto: Linha direta crua (DI comum)');
  }

  btnAbDi?.addEventListener('click', () => switchMode('di'));
  btnAbAlpha?.addEventListener('click', () => switchMode('alpha'));

  playBtn.addEventListener('click', () => {
    const audio = getCurrentAudio();
    if (!audio) return;

    if (!isPlaying) {
      // Inicia reprodução
      audio.play().then(() => {
        updatePlayUI(true);
        showToast(currentMode === 'alpha'
          ? 'Reproduzindo: Áudio Real com circuito Alpha Preamp'
          : 'Reproduzindo: Áudio Real de Sinal Direto (DI)');
      }).catch(err => {
        console.warn('Audio play error:', err);
        showToast('Clique novamente para autorizar o áudio no navegador.');
      });
    } else {
      audioDi?.pause();
      audioAlpha?.pause();
      updatePlayUI(false);
    }
  });

  // Se o áudio terminar (se não estiver em loop)
  audioDi?.addEventListener('ended', () => updatePlayUI(false));
  audioAlpha?.addEventListener('ended', () => updatePlayUI(false));
}


/* ==========================================================================
   6. CART SYSTEM & LOCALSTORAGE PERSISTENCE
   ========================================================================== */
function persistCart() {
  try {
    localStorage.setItem('bassStompCart', JSON.stringify(state.cart));
  } catch (_) {}
}

function initCart() {
  const cartTrigger = document.getElementById('cart-trigger');
  const cartClose = document.getElementById('cart-close');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  const checkoutBtn = document.getElementById('btn-checkout');

  cartTrigger?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', (e) => {
    if (e.target === cartOverlay) closeCart();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
  });

  checkoutBtn?.addEventListener('click', () => {
    if (state.cart.length === 0) {
      showToast('Seu carrinho está vazio!');
      return;
    }
    const total = document.getElementById('cart-total-val')?.textContent || '';
    const itemsList = state.cart.map(i => `• ${i.name}`).join('\n');
    const msg = encodeURIComponent(
      `Olá Sergio Rodrigues! Quero finalizar minha compra na Bass Stomp:\n\n${itemsList}\n\nTotal: ${total}\n\nPor favor, me envie a chave Pix para liberação imediata do download!`
    );
    showToast('Abrindo atendimento WhatsApp...');
    setTimeout(() => {
      window.open(`https://wa.me/5511999999999?text=${msg}`, '_blank');
    }, 600);
  });

  updateCartUI();
}

function addToCart(idOrSlug) {
  const store = getStoreData();
  if (!store) return;
  const prod = store.products.find(p => p.id === idOrSlug || p.urlPart === idOrSlug);
  if (!prod) return;

  const exists = state.cart.find(item => item.id === prod.id);
  if (!exists) {
    state.cart.push(prod);
    showToast(`"${prod.name}" adicionado ao carrinho!`);
  } else {
    showToast('O preset já está no carrinho.');
  }

  persistCart();
  updateCartUI();
  closeQuickView();
  openCart();
}

function removeFromCart(idOrSlug) {
  state.cart = state.cart.filter(item => item.id !== idOrSlug && item.urlPart !== idOrSlug);
  persistCart();
  updateCartUI();
  showToast('Item removido do carrinho.');
}

function updateCartUI() {
  const countBadge = document.getElementById('cart-badge');
  const listContainer = document.getElementById('cart-items-container');
  const totalVal = document.getElementById('cart-total-val');

  if (countBadge) {
    countBadge.textContent = state.cart.length;
    countBadge.style.display = state.cart.length > 0 ? 'flex' : 'none';
  }

  if (listContainer) {
    if (state.cart.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 48px 16px; color: rgba(242,238,228,0.5);">
          <div style="font-size: 32px; margin-bottom: 10px;">🎸</div>
          <p style="font-family: var(--font-display); font-size: 22px; color: var(--bone); margin-bottom: 6px;">Seu carrinho está vazio</p>
          <p style="font-size: 13.5px; line-height: 1.4;">Escolha um preset pra ouvir a diferença no seu som de palco.</p>
        </div>
      `;
      if (totalVal) totalVal.textContent = 'R$ 0,00';
      return;
    }

    let sum = 0;
    listContainer.innerHTML = state.cart.map(item => {
      const price = (item.comparePrice && item.comparePrice > 0 && item.comparePrice < item.price) ? item.comparePrice : item.price;
      sum += (typeof price === 'number' ? price : 0);
      const formatPrice = (v) => typeof v === 'number' ? 'R$ ' + v.toFixed(2).replace('.', ',') : 'Consulte';
      return `
        <div class="cart-item-row">
          <div class="cart-item-thumb">
            <img src="${item.localImage || 'assets/images/logo.png'}" alt="${item.name}" onerror="this.src='assets/images/logo.png'" />
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-pedal">${item.category_tag || 'BASS RIG'}</div>
            <div class="cart-item-price">${formatPrice(price)}</div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">Remover</button>
          </div>
        </div>
      `;
    }).join('');

    if (totalVal) {
      totalVal.textContent = `R$ ${sum.toFixed(2).replace('.', ',')}`;
    }
  }
}

function openCart() {
  const drawer = document.getElementById('cart-drawer-overlay');
  if (drawer) {
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const drawer = document.getElementById('cart-drawer-overlay');
  if (drawer) {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="led orange"></span> ${message}`;
  toast.classList.remove('show');
  void toast.offsetWidth; // Trigger reflow for animation restart
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ==========================================================================
   7. YOUTUBE VIDEO GRID & MODAL
   ========================================================================== */
function filterPedalCards(val) {
  const q = (val || '').toLowerCase().trim();
  document.querySelectorAll('.pedal-rack-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(q) ? '' : 'none';
  });
}

function initVideosGrid() {
  const container = document.getElementById('videos-grid');
  const store = getStoreData();
  if (!container || !store || !store.videos) return;

  container.innerHTML = store.videos.map(v => `
    <div class="video-card plate" data-youtube-id="${v.id}">
      <div class="screw tl"></div><div class="screw tr"></div>
      <div class="video-thumb-wrap">
        <img src="assets/images/youtube/${v.id}.jpg" alt="${v.title}" loading="lazy" onerror="this.src='assets/images/logo.png'" />
        <div class="btn-play-video" aria-label="Assistir Vídeo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </div>
      </div>
      <div class="video-body">
        <div class="video-title">${v.title}</div>
        <div class="video-channel">Sergio Rodrigues · YouTube</div>
      </div>
    </div>
  `).join('');
}

function initVideoModals() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-modal-iframe');
  const closeBtn = document.getElementById('video-modal-close');

  if (!modal || !iframe) return;

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.video-card[data-youtube-id]');
    if (card) {
      const yid = card.getAttribute('data-youtube-id');
      if (yid) {
        iframe.src = `https://www.youtube.com/embed/${yid}?autoplay=1`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  });

  const closeVideoModal = () => {
    iframe.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeVideoModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideoModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeVideoModal();
    }
  });
}

/* ==========================================================================
   8. MOBILE MENU & FAQ ACCORDION
   ========================================================================== */
function initMobileMenu() {
  const btn = document.getElementById('menu-toggle-btn');
  const nav = document.getElementById('mobile-drawer-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isActive = nav.classList.toggle('active');
    btn.setAttribute('aria-expanded', isActive);
    if (isActive) {
      btn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    } else {
      btn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    }
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      btn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
  });
}

function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const q = item.querySelector('.faq-question');
    q?.addEventListener('click', () => {
      const isAlreadyOpen = item.classList.contains('open');
      
      items.forEach(i => {
        i.classList.remove('open');
        const code = i.querySelector('.faq-status-code');
        if (code) code.textContent = '[ STANDBY ]';
      });

      if (!isAlreadyOpen) {
        item.classList.add('open');
        const code = item.querySelector('.faq-status-code');
        if (code) code.textContent = '[ ATIVO ]';
      }
      q.blur();
    });
  });
}

/* ==========================================================================
   9. CONTACT & TECHNICAL SUPPORT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-support-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value || 'Músico';
    const email = form.querySelector('[name="email"]')?.value || '';
    const pedal = form.querySelector('[name="pedal"]')?.value || 'Geral';
    const message = form.querySelector('[name="message"]')?.value || '';

    showToast(`Mensagem registrada! Abrindo suporte para ${name}...`);

    setTimeout(() => {
      const waUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(
        `Olá Sergio! Enviei uma mensagem pelo site da Bass Stomp:\n\n• Nome: ${name}\n• E-mail: ${email}\n• Pedaleira: ${pedal}\n• Dúvida: ${message}`
      )}`;
      window.open(waUrl, '_blank');
      form.reset();
    }, 600);
  });
}

