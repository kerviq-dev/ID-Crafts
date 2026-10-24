/**
 * ID CRAFTS LUXURY ATELIER — CENTRAL REACTIVE STATE ENGINE
 * Persistent state management via LocalStorage with event-driven synchronization.
 */

(function(window) {
  'use strict';

  const STORAGE_KEYS = {
    CART: 'idcraft_cart_v1',
    WISHLIST: 'idcraft_wishlist_v1',
    AUTH: 'idcraft_auth_v1',
    ORDERS: 'idcraft_orders_v1',
    CUSTOM_REQUESTS: 'idcraft_custom_requests_v1',
    CORPORATE_QUOTES: 'idcraft_corporate_quotes_v1',
    LANGUAGE: 'idcraft_lang_v1',
    COUPON: 'idcraft_active_coupon_v1',
    ADDRESSES: 'idcraft_addresses_v1',
    SAVED_DESIGNS: 'idcraft_saved_designs_v1',
    SETTINGS: 'idcraft_settings_v1'
  };

  // Pre-seeded luxury catalog matching the Stitch export
  // Pre-seeded luxury catalog matching the Stitch export
  const CATALOG = [
    // --- ID CARDS ---
    {
      id: 'card-grade5-titanium',
      name: 'Grade 5 Titanium NFC Smart Card',
      category: 'cards',
      categoryName: 'ID Cards',
      categoryLink: 'product-id-cards.html',
      price: 24.500,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT64Cq26Znz7eOsTNCatTH83mLIV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDT64Cq26Znz7eOsTNCatTH83mLIV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDbytHHDlobbI53Pvy7CU4AEIePo98ZwBt8tpLM90T5PsbdCSOBaiUszUMv7twrsdEOUGWjelEQxSgOjricgy2U9YYQ-lkMGw_W5PnKM40ganOuYjn3Aih-xtquZAgnL8pNEtdirfww41KFWxKPLQzQou-e4ofLERhA4DV-wIdlasFmN9e0m2T2EO0Ly3Wm2bLF7CfZYpCObvkC7OiI-Gd7VCTMdME3-QsJlwTm0yX23l-peAafx2EA',
        'https://lh3.googleusercontent.com/aida/AEtjO1Wx4bK1HH2s79TJ-InuwQSNQk7YEXGQHJX_jatb_GRD4S_HuMXzRTXbLXRqdFDUrqlksznjKx7YUo0tZVW8frMX-5Tf-W77IxfYMGabvbdCLQW1JAAF_aDkAjnq7g3ycqKYwd0CS_1NqKne6bnUalpb45MVCxFcpmTCtAJY30lIfVH-OHWmToqUV6tZIYmvwSbjf0Rq8YW3sCBox8Du7NcPzjc5N1kWpOQXg6pPh0UxnyceSOn3uuW__VA',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBxyBx78ApKocpZp8i7Huw1bxSuvzVsCnfJzKQzjpqE7YnQjC5TERrNR93rrOZLzhkoO65Lqn5mmqv7f7gW209ite6-0mwJrlK8YSuophQhSCCDLl16_EN1sSkaqupsTaHKj_b-YEdR9NAKUexywZjJ6bFLMQ_xU1AFb_6evuN5x7qJwMam4nPhaBrrTnG5vNHDAzFTw1FeckK8FMD6_0VmaVXpqh-8jRFSmkcL4S3_k9zGnkHiO2bE'
      ],
      link: 'product-id-cards.html',
      badge: 'Bestseller',
      desc: 'Sub-micron rotary laser-etched Grade 5 aerospace titanium with integrated NTAG424 DNA cryptographic chip and chamfered bevel rim.',
      finishes: [
        { name: 'Grade-5 Titanium', sub: 'Brushed PVD' },
        { name: 'Obsidian Matte', sub: 'DLC Coated' },
        { name: 'Champagne Gold 24K', sub: 'Electro-Gilt' }
      ],
      specs: {
        'Substrate': 'Grade 5 Titanium (Ti-6Al-4V)',
        'Laser Frequency': '1064nm Q-Switched Fiber (±0.02mm)',
        'Security Chip': 'NXP NTAG424 DNA (AES-128 Contactless)',
        'Origin': 'Shuwaikh Industrial Metrology Lab'
      }
    },
    {
      id: 'card-matte-obsidian',
      name: 'Matte Obsidian Polycarbonate Access Card',
      category: 'cards',
      categoryName: 'ID Cards',
      categoryLink: 'product-id-cards.html',
      price: 12.500,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbytHHDlobbI53Pvy7CU4AEIePo98ZwBt8tpLM90T5PsbdCSOBaiUszUMv7twrsdEOUGWjelEQxSgOjricgy2U9YYQ-lkMGw_W5PnKM40ganOuYjn3Aih-xtquZAgnL8pNEtdirfww41KFWxKPLQzQou-e4ofLERhA4DV-wIdlasFmN9e0m2T2EO0Ly3Wm2bLF7CfZYpCObvkC7OiI-Gd7VCTMdME3-QsJlwTm0yX23l-peAafx2EA',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDbytHHDlobbI53Pvy7CU4AEIePo98ZwBt8tpLM90T5PsbdCSOBaiUszUMv7twrsdEOUGWjelEQxSgOjricgy2U9YYQ-lkMGw_W5PnKM40ganOuYjn3Aih-xtquZAgnL8pNEtdirfww41KFWxKPLQzQou-e4ofLERhA4DV-wIdlasFmN9e0m2T2EO0Ly3Wm2bLF7CfZYpCObvkC7OiI-Gd7VCTMdME3-QsJlwTm0yX23l-peAafx2EA',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCTl_08lNjGSYSPlbtc7yyv8bt59-tP0YB_etldOZFnKNszc0YoF8mQ9q14ntuKMFaQkNB2bPKRTya3EfFSqaU1AcHEIt3TP68PY7erIotMUd6P6uDTvjhrRfREg-wFgnDPNeRlHQHBpJ7aB1iovAv57UE1x5W6FAo7LldkSoxgnWZDehzOAeeRpl_V00P_16kVeZv2hZRoDg1CiVwGBaQGcMXXEAlt1ZhtM5JfBIq1LUw5LXD5Qlvr',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCHFRpAEXhgu_kAkt34JCdTHddVcwxt-yn3KW9LcorkkqtgahA3bYzZIM_AS9zmeU4-ZzK5KzpAQI7k7xx6hmTF3EJwcdqSMg0heMgv__POAmuWVynSnGu99P-QJAMYup3QTU4XsEDcFUqqWQpPvn0d-1u03x1iO6dZXcSLUkucbhVOl76CrXZGXrIikGfrqSvFonrE4I3xzPxYYs922SlWaV4F4OemZvZRe5_RPqHJcw3F3uKdlAJv',
        'https://lh3.googleusercontent.com/aida/AEtjO1WpRjChRk0yTUhGpsGB7vDLHojgoKSqunMQjIGPJmNpsY7ZhTGWt4KFk1cr9ewdqDsOeXmAMgUFNwosIDXytX_txtichSRMAO4RYlXfzf_644B4ubECaxtTToua2pcqbfa475kFkx7s_icQFzemDUiI2bl_NS9vGUhMKzngUCRNGnO_JLwXwLgIH10lDQBTsEvun2C50ozSqXgjV5qTxvNKcekSt-JFJnHaZIXunHtxFXlXwB70a2zNfII'
      ],
      link: 'product-id-cards.html',
      badge: 'RFID Dual Band',
      desc: 'Dual-frequency 13.56MHz + 125kHz enterprise credential with chamfered gold foil edges and monochrome employee photography engraving.',
      finishes: [
        { name: 'Matte Obsidian', sub: 'Velvet Soft-Touch' },
        { name: 'Brushed Titanium', sub: 'PVD Coated' },
        { name: 'Champagne Gold', sub: 'Hot Foil Bevel' }
      ],
      specs: {
        'Substrate': 'Anodized Space Alloy & Multi-Polycarbonate',
        'Laser Precision': 'Sub-Micron UV Sintering (0.015mm)',
        'Security Chip': 'MIFARE DESFire EV3 + Dual Frequency',
        'Origin': 'Shuwaikh Industrial Metrology Lab'
      }
    },
    {
      id: 'card-frosted-acrylic',
      name: 'Frosted Crystal Acrylic Sovereign Pass',
      category: 'cards',
      categoryName: 'ID Cards',
      categoryLink: 'product-id-cards.html',
      price: 18.500,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl-byBQ2Cu0M8UJ81b43a5ARLxtyZvxXdrRZWsMXSSEAT4ZN3VgA84IJYJpy3RN-oJogX-lFUrzS2_479g5_FkSIetRwGf7nPJqi0WcRSmJhN-r7TsYcnNkjdQLPemetVrmyqzElGHce3TxRprVWcAmPGP67Ypo-a-fQtzRkDQ9XTlA9IJYGwReqRnG53guv6ovYaFqHdHuDFYNiLBrhhr-_yVnVMdOwxi7QaF0m3RemUX5vNOP7dL',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDl-byBQ2Cu0M8UJ81b43a5ARLxtyZvxXdrRZWsMXSSEAT4ZN3VgA84IJYJpy3RN-oJogX-lFUrzS2_479g5_FkSIetRwGf7nPJqi0WcRSmJhN-r7TsYcnNkjdQLPemetVrmyqzElGHce3TxRprVWcAmPGP67Ypo-a-fQtzRkDQ9XTlA9IJYGwReqRnG53guv6ovYaFqHdHuDFYNiLBrhhr-_yVnVMdOwxi7QaF0m3RemUX5vNOP7dL',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDxqZR4A_YfdJaP_RD7OWJHBUVqVPoIcKOwrSjnJkiKI-nr4QCTmDLCFDFpGtpz0fhNkMd61lEWKL2ko5NpvRqK2gxfdHrMm9IqP8q3L_vt4GUPXQmP2XUJVFbLx9VmAl8IgHfketMOQIy3wmZLnupKNcIuwDb9JcP-xncD13nyALWQAC7-0zpaOyB0E_GZ0a407q1qcbOU_nWoXWyiV0OyjVZYqGbkvo1CdUVZTYoSLf11oi5XF19T',
        'https://lh3.googleusercontent.com/aida/AEtjO1Wx4bK1HH2s79TJ-InuwQSNQk7YEXGQHJX_jatb_GRD4S_HuMXzRTXbLXRqdFDUrqlksznjKx7YUo0tZVW8frMX-5Tf-W77IxfYMGabvbdCLQW1JAAF_aDkAjnq7g3ycqKYwd0CS_1NqKne6bnUalpb45MVCxFcpmTCtAJY30lIfVH-OHWmToqUV6tZIYmvwSbjf0Rq8YW3sCBox8Du7NcPzjc5N1kWpOQXg6pPh0UxnyceSOn3uuW__VA',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDT64Cq26Znz7eOsTNCatTH83mLIV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW'
      ],
      link: 'product-id-cards.html',
      badge: 'VIP Atelier',
      desc: 'High-translucency architectural acrylic embedded with gold micro-wire antenna, campus unified chip, and biometric portrait engraving.',
      finishes: [
        { name: 'Frosted Crystal', sub: 'Anti-Glare Optical' },
        { name: 'Smoked Obsidian', sub: 'Semi-Translucent' },
        { name: '24K Gold Foil Accent', sub: 'Debossed Hologram' }
      ],
      specs: {
        'Substrate': 'Shielded Multi-layer Polycarbonate / Optical Acrylic',
        'Printing Technique': 'Edge-to-Edge Thermal & Spot UV Foil',
        'Security Chip': 'NFC NTAG 216 / MIFARE Classic (13.56MHz)',
        'Origin': 'Shuwaikh Industrial Metrology Lab'
      }
    },

    // --- LANYARDS ---
    {
      id: 'lanyard-silk-jacquard',
      name: 'Executive Silk Jacquard Lanyard',
      category: 'lanyards',
      categoryName: 'Lanyards',
      categoryLink: 'product-lanyards.html',
      price: 8.000,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi5Z26z_wZ9f0jO-8q1P6tV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDi5Z26z_wZ9f0jO-8q1P6tV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW',
        'https://lh3.googleusercontent.com/aida/AEtjO1WdShYf_PF57jXLLQhdefTHIwMi_cVhC9YduRDLAUX9_J_t6pF9U3QxxOk-MLBfyeUFqBcALAO6Q-G_lGM2Ybh6867kt48OwJfbJjCWw4XXPoLpFlvZWXcF1oKgpiwPXpkTIzbVll0W8rUPCsvSVhhQ0PQWR8JyiXgTEos7q_Qnhyc0OoY1miOV2dBmrkyQ_0uvQ8gampoaVklDm6BklFIqB9IMfrNDNR1Iay-1AiuXnvUrMxDaE9eDhvo',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDT64Cq26Znz7eOsTNCatTH83mLIV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDl-byBQ2Cu0M8UJ81b43a5ARLxtyZvxXdrRZWsMXSSEAT4ZN3VgA84IJYJpy3RN-oJogX-lFUrzS2_479g5_FkSIetRwGf7nPJqi0WcRSmJhN-r7TsYcnNkjdQLPemetVrmyqzElGHce3TxRprVWcAmPGP67Ypo-a-fQtzRkDQ9XTlA9IJYGwReqRnG53guv6ovYaFqHdHuDFYNiLBrhhr-_yVnVMdOwxi7QaF0m3RemUX5vNOP7dL'
      ],
      link: 'product-lanyards.html',
      badge: 'Signature',
      desc: 'High-density 1,200 TPI woven silk jacquard with knurled champagne gold brass hardware and quick-release safety clasp.',
      finishes: [
        { name: 'Obsidian & Gold', sub: 'Pure Mulberry Silk' },
        { name: 'Champagne Tan', sub: 'Desert Atelier Weave' },
        { name: 'Midnight Navy', sub: 'Diplomatic Spec' }
      ],
      specs: {
        'Substrate': '1,200 TPI Mulberry Silk Jacquard',
        'Hardware Metallurgy': 'CNC Knurled Brass with PVD Gold Finish',
        'Safety Release': 'Integrated Breakaway Magnetic Coupling',
        'Origin': 'Shuwaikh Textile Craft Atelier'
      }
    },
    {
      id: 'lanyard-chevron-tan',
      name: 'Signature Chevron Tan Lanyard',
      category: 'lanyards',
      categoryName: 'Lanyards',
      categoryLink: 'product-lanyards.html',
      price: 9.250,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi5Z26z_wZ9f0jO-8q1P6tV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDi5Z26z_wZ9f0jO-8q1P6tV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW',
        'https://lh3.googleusercontent.com/aida/AEtjO1WdShYf_PF57jXLLQhdefTHIwMi_cVhC9YduRDLAUX9_J_t6pF9U3QxxOk-MLBfyeUFqBcALAO6Q-G_lGM2Ybh6867kt48OwJfbJjCWw4XXPoLpFlvZWXcF1oKgpiwPXpkTIzbVll0W8rUPCsvSVhhQ0PQWR8JyiXgTEos7q_Qnhyc0OoY1miOV2dBmrkyQ_0uvQ8gampoaVklDm6BklFIqB9IMfrNDNR1Iay-1AiuXnvUrMxDaE9eDhvo',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDl-byBQ2Cu0M8UJ81b43a5ARLxtyZvxXdrRZWsMXSSEAT4ZN3VgA84IJYJpy3RN-oJogX-lFUrzS2_479g5_FkSIetRwGf7nPJqi0WcRSmJhN-r7TsYcnNkjdQLPemetVrmyqzElGHce3TxRprVWcAmPGP67Ypo-a-fQtzRkDQ9XTlA9IJYGwReqRnG53guv6ovYaFqHdHuDFYNiLBrhhr-_yVnVMdOwxi7QaF0m3RemUX5vNOP7dL',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDT64Cq26Znz7eOsTNCatTH83mLIV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW'
      ],
      link: 'product-lanyards.html',
      badge: 'Atelier Edition',
      desc: 'Intricate geometric chevron weave in desert tan and gold silk with brushed titanium clasp and leather reinforcement badge.',
      finishes: [
        { name: 'Desert Tan & Gold', sub: 'Signature Chevron' },
        { name: 'Obsidian Black', sub: 'Matte Monochrome' },
        { name: 'Royal Crimson', sub: 'Ceremonial Silk' }
      ],
      specs: {
        'Substrate': 'High-Tensile Woven Silk Jacquard',
        'Hardware Metallurgy': 'Grade-5 Titanium 360° Swivel Clasp',
        'Width': '22mm Wide Executive Profile',
        'Origin': 'Shuwaikh Textile Craft Atelier'
      }
    },
    {
      id: 'lanyard-tactical-kevlar',
      name: 'Titanium-Clasp Kevlar Executive Neckwear',
      category: 'lanyards',
      categoryName: 'Lanyards',
      categoryLink: 'product-lanyards.html',
      price: 14.000,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl-byBQ2Cu0M8UJ81b43a5ARLxtyZvxXdrRZWsMXSSEAT4ZN3VgA84IJYJpy3RN-oJogX-lFUrzS2_479g5_FkSIetRwGf7nPJqi0WcRSmJhN-r7TsYcnNkjdQLPemetVrmyqzElGHce3TxRprVWcAmPGP67Ypo-a-fQtzRkDQ9XTlA9IJYGwReqRnG53guv6ovYaFqHdHuDFYNiLBrhhr-_yVnVMdOwxi7QaF0m3RemUX5vNOP7dL',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDl-byBQ2Cu0M8UJ81b43a5ARLxtyZvxXdrRZWsMXSSEAT4ZN3VgA84IJYJpy3RN-oJogX-lFUrzS2_479g5_FkSIetRwGf7nPJqi0WcRSmJhN-r7TsYcnNkjdQLPemetVrmyqzElGHce3TxRprVWcAmPGP67Ypo-a-fQtzRkDQ9XTlA9IJYGwReqRnG53guv6ovYaFqHdHuDFYNiLBrhhr-_yVnVMdOwxi7QaF0m3RemUX5vNOP7dL',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDi5Z26z_wZ9f0jO-8q1P6tV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW',
        'https://lh3.googleusercontent.com/aida/AEtjO1WdShYf_PF57jXLLQhdefTHIwMi_cVhC9YduRDLAUX9_J_t6pF9U3QxxOk-MLBfyeUFqBcALAO6Q-G_lGM2Ybh6867kt48OwJfbJjCWw4XXPoLpFlvZWXcF1oKgpiwPXpkTIzbVll0W8rUPCsvSVhhQ0PQWR8JyiXgTEos7q_Qnhyc0OoY1miOV2dBmrkyQ_0uvQ8gampoaVklDm6BklFIqB9IMfrNDNR1Iay-1AiuXnvUrMxDaE9eDhvo',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDT64Cq26Znz7eOsTNCatTH83mLIV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW'
      ],
      link: 'product-lanyards.html',
      badge: 'Heavy Duty',
      desc: 'Braided ballistic fiber with CNC-machined titanium dual swivel clasp rated for 50kg tensile resistance.',
      finishes: [
        { name: 'Ballistic Matte Black', sub: 'Kevlar Reinforced' },
        { name: 'Stealth Charcoal', sub: 'DLC Coated Hardware' },
        { name: 'Tactical Olive', sub: 'Field Diplomatic Spec' }
      ],
      specs: {
        'Substrate': 'Braided Ballistic Kevlar Fiber',
        'Clasp Architecture': 'CNC 6061-T6 + Titanium Dual Swivel',
        'Tensile Certification': '50kg Continuous Pull Tested',
        'Origin': 'Shuwaikh Industrial Hardware Lab'
      }
    },

    // --- BADGE REELS ---
    {
      id: 'reel-radial-brass',
      name: 'Architectural Radial Recoil Badge Reel',
      category: 'reels',
      categoryName: 'Badge Reels',
      categoryLink: 'product-badge-reels.html',
      price: 6.500,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ1p4kBg2kOBIVhAnuBOsZdLK3yvy0NaF4Xi41viYGfhnKn0mY8SeNaHIKC3emk0qLRt4pPooj6eM850zMDRMarmz0MY4K7j-lzrnKDMgcVN_SSiij1jKEpQCCgcCbv2mtD782T-y9_b_VOFjnsQR7djozp308FF-TYF6lHjdUWvPFIFIoO1gEPFbipMrTT6AhOn1sW4upzejhneJXMt-YUyitngu1xHEPI4hCkJkSNTJ-2wDIVkQi',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ1p4kBg2kOBIVhAnuBOsZdLK3yvy0NaF4Xi41viYGfhnKn0mY8SeNaHIKC3emk0qLRt4pPooj6eM850zMDRMarmz0MY4K7j-lzrnKDMgcVN_SSiij1jKEpQCCgcCbv2mtD782T-y9_b_VOFjnsQR7djozp308FF-TYF6lHjdUWvPFIFIoO1gEPFbipMrTT6AhOn1sW4upzejhneJXMt-YUyitngu1xHEPI4hCkJkSNTJ-2wDIVkQi',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCKBZwNKe4qd_qipRhe-rXvUG_KNO-XCQrefNM4hEUYPB_CK0EL4oBAgFht4xqw9fjJWsKaDEiaZ1ySW6S8czHItpx-A1TkTU76T6Qh9qRny2gDj4vuLyeeNn9Wm-IHryiOm4ClMrPZVqWmWTzKgdTqTg8TnEbHVvY_R6nviqBu66d_FkcNAu6XYsPmLMCda6P5qdmAAmUU9zCYENOFYmUqgWSBRWiKUwrqhokImEJFNYnW-RDLC69s',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCAS2mJusNGtKuFsx5MAAVxLRkU6HVD2GLrCEkYTmfWi3qmeyrQOvTOYLMjDtiiRjkiZ9rrE9h1rPK7Umb_43uXej66lfY5c4x6WfxzuLjGm_-H4KdTKtTCJ5zrAyQ_JvJywfjTx03CVZTmiFJT3qc7Z5nGBm334enzSxELeUhqcORkh2UPWo4V5x1vy8PEuPt2oZQeGLh52sLo1lmf-hS3gHTYzSuTorOBNAr-vg9kxMTt_culqCju',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDT64Cq26Znz7eOsTNCatTH83mLIV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW'
      ],
      link: 'product-badge-reels.html',
      badge: 'Patented Spring',
      desc: 'CNC-machined matte black PVD aluminum housing with silent recoil dampening spring, braided Kevlar tether rated for 150,000 pulls, and 360° knurled brass swivel carabiner.',
      finishes: [
        { name: 'Matte Obsidian PVD', sub: 'Whisper Core' },
        { name: 'Champagne Gold Titanium', sub: 'Fluid-Dampened' },
        { name: 'Brushed Aerospace Ti', sub: 'Ceramic Race' }
      ],
      specs: {
        'Substrate': 'CNC 6061-T6 Aluminum / Grade-5 Titanium',
        'Tether Specification': '32\" Braided Kevlar (15kg Break Tension)',
        'Recoil Longevity': 'Stainless Twin-Coil (150,000 Cycles)',
        'Origin': 'Shuwaikh Industrial Hardware Lab'
      }
    },
    {
      id: 'reel-obsidian-carabiner',
      name: 'Obsidian Carabiner Recoil Reel',
      category: 'reels',
      categoryName: 'Badge Reels',
      categoryLink: 'product-badge-reels.html',
      price: 8.250,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKBZwNKe4qd_qipRhe-rXvUG_KNO-XCQrefNM4hEUYPB_CK0EL4oBAgFht4xqw9fjJWsKaDEiaZ1ySW6S8czHItpx-A1TkTU76T6Qh9qRny2gDj4vuLyeeNn9Wm-IHryiOm4ClMrPZVqWmWTzKgdTqTg8TnEbHVvY_R6nviqBu66d_FkcNAu6XYsPmLMCda6P5qdmAAmUU9zCYENOFYmUqgWSBRWiKUwrqhokImEJFNYnW-RDLC69s',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCKBZwNKe4qd_qipRhe-rXvUG_KNO-XCQrefNM4hEUYPB_CK0EL4oBAgFht4xqw9fjJWsKaDEiaZ1ySW6S8czHItpx-A1TkTU76T6Qh9qRny2gDj4vuLyeeNn9Wm-IHryiOm4ClMrPZVqWmWTzKgdTqTg8TnEbHVvY_R6nviqBu66d_FkcNAu6XYsPmLMCda6P5qdmAAmUU9zCYENOFYmUqgWSBRWiKUwrqhokImEJFNYnW-RDLC69s',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ1p4kBg2kOBIVhAnuBOsZdLK3yvy0NaF4Xi41viYGfhnKn0mY8SeNaHIKC3emk0qLRt4pPooj6eM850zMDRMarmz0MY4K7j-lzrnKDMgcVN_SSiij1jKEpQCCgcCbv2mtD782T-y9_b_VOFjnsQR7djozp308FF-TYF6lHjdUWvPFIFIoO1gEPFbipMrTT6AhOn1sW4upzejhneJXMt-YUyitngu1xHEPI4hCkJkSNTJ-2wDIVkQi',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCAS2mJusNGtKuFsx5MAAVxLRkU6HVD2GLrCEkYTmfWi3qmeyrQOvTOYLMjDtiiRjkiZ9rrE9h1rPK7Umb_43uXej66lfY5c4x6WfxzuLjGm_-H4KdTKtTCJ5zrAyQ_JvJywfjTx03CVZTmiFJT3qc7Z5nGBm334enzSxELeUhqcORkh2UPWo4V5x1vy8PEuPt2oZQeGLh52sLo1lmf-hS3gHTYzSuTorOBNAr-vg9kxMTt_culqCju',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDT64Cq26Znz7eOsTNCatTH83mLIV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW'
      ],
      link: 'product-badge-reels.html',
      badge: 'Machined Alloy',
      desc: 'Precision milled aerospace alloy housing with military-spec spring recoil system and sub-micron rotary crest engraving.',
      finishes: [
        { name: 'Satin Obsidian', sub: 'Matte Hard-Anodized' },
        { name: 'Champagne Gold', sub: 'PVD Polished Rim' },
        { name: 'Titanium Raw', sub: 'Micro-Bead Blasted' }
      ],
      specs: {
        'Substrate': 'Hard-Anodized Aerospace 6061 Alloy',
        'Tether Cord': '28\" Stainless Steel Polymer-Coated Wire',
        'Engraving Precision': '360° Rotary Fiber Laser (0.08mm Relief)',
        'Origin': 'Shuwaikh Industrial Hardware Lab'
      }
    },

    // --- CARD HOLDERS ---
    {
      id: 'holder-carbon-tactile',
      name: 'The Minimalist Billet Card Holder',
      category: 'holders',
      categoryName: 'Card Holders',
      categoryLink: 'product-card-holders.html',
      price: 7.500,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8nC8fcauJ2lSyRSSw68ni7TyIEGY7hKO2pRKPmLGQY7-CaiYn4rRgDC6bPnyZdPMGLEj_o5PoSUI-OgXV2sbamnA9_coWSr3324I3kNhlVxT2mJ0qXRz6_DUWbpQNoDcr77ERnMzy3ZbNeq5aVTNydfg4BZx_L7FrVUv0_Tlm9aCIN7Fo7A2Bq5Esr4dhJjQd53LFGLPxhwqkp_8Czbv5n2rVa1lHNX41IyPNhii71CESUGACc-06',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA8nC8fcauJ2lSyRSSw68ni7TyIEGY7hKO2pRKPmLGQY7-CaiYn4rRgDC6bPnyZdPMGLEj_o5PoSUI-OgXV2sbamnA9_coWSr3324I3kNhlVxT2mJ0qXRz6_DUWbpQNoDcr77ERnMzy3ZbNeq5aVTNydfg4BZx_L7FrVUv0_Tlm9aCIN7Fo7A2Bq5Esr4dhJjQd53LFGLPxhwqkp_8Czbv5n2rVa1lHNX41IyPNhii71CESUGACc-06',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD5-ZMCNaBeacQNqKLbuiC2blsAbaBNhQGUotnBojJqaZi-jK8v9CCOKJQJcusIUusDi0WRQ2Y765f_WM9b2GdQsa-RiC-V3LlUReKQNsu8fjKrYI4i5Focvxvg1LEyzRjA0jvKulTNcHDQjlLmngPu1hhRofoJefZEEUOW4ij33vrNnkSQcHvYXvzWp7o_L9Y0o9k2ItBxOI8QZptV996BPEvY1Qa6sEfEKFCe3ePHtCm_aCmvBcE5',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCF9QwNsa6sheKwoME3U4IHiX0svepM9gjj6cV5faf9RK9ALi4wiM1SVtz28dpPPY0hcI3wMzCgby9LegAjPdPXfE1G7ZxzaGqetcfTZtEX-mMQ-bko3JsQo5x0owyf9chtsoqESx5Lp-bVMYgTMAZ3x0tbhOXKHRW0gv1Vakxq9RxJpv28mGb7ywMOYyi66hQ6eTNcR4XeePMtUSxGUkXFBDP8pROIlV7MSCY65UPYXbLCxvbdUA6E',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBPfrEb4l8vXpD4o-YABTcDWGE83wdgB7Dya0n9SsykvAQAcM39CdIf1raFNfB0wVN9Xsz_4K45_gDF3nN_dhKz0nVKD5-MLj9mIu21uT9Ci6vmY7SOwGF-gNxLaXL9zOQR19frRuMq4Yqp1lBSFWVfsZILr3Joq6zJUV2mJE1McDYf2prn_x2iC-6LneXe3UwL8Sfb3OFX4omQRI7ZTnNXfQMQmLNW7-4UfcybGw9mxBE8Caq8rcjh'
      ],
      link: 'product-card-holders.html',
      badge: '32g Ultra-Light',
      desc: 'Slimline CNC 6061-T6 aluminum card frame with dual-spring tension retention and rear thumb slide aperture. Built for ultra-low profile pocket or lanyard wear.',
      finishes: [
        { name: 'Matte Black PVD', sub: 'Hard-Coat Anodized' },
        { name: 'Raw Milled Silver', sub: 'Brushed Finish' },
        { name: 'Champagne Gold', sub: 'PVD Electro-Gilt' }
      ],
      specs: {
        'Chassis': 'CNC 6061-T6 Aluminum Alloy (32g net)',
        'Display Window': 'Optical Scratch-Proof Polycarbonate',
        'Card Capacity': '1–2 Standard CR80 Credentials',
        'Origin': 'Shuwaikh Industrial Metrology Lab'
      }
    },
    {
      id: 'holder-armor-dual',
      name: 'Architectural Dual-Slot Credential Armor',
      category: 'holders',
      categoryName: 'Card Holders',
      categoryLink: 'product-card-holders.html',
      price: 13.000,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPfrEb4l8vXpD4o-YABTcDWGE83wdgB7Dya0n9SsykvAQAcM39CdIf1raFNfB0wVN9Xsz_4K45_gDF3nN_dhKz0nVKD5-MLj9mIu21uT9Ci6vmY7SOwGF-gNxLaXL9zOQR19frRuMq4Yqp1lBSFWVfsZILr3Joq6zJUV2mJE1McDYf2prn_x2iC-6LneXe3UwL8Sfb3OFX4omQRI7ZTnNXfQMQmLNW7-4UfcybGw9mxBE8Caq8rcjh',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBPfrEb4l8vXpD4o-YABTcDWGE83wdgB7Dya0n9SsykvAQAcM39CdIf1raFNfB0wVN9Xsz_4K45_gDF3nN_dhKz0nVKD5-MLj9mIu21uT9Ci6vmY7SOwGF-gNxLaXL9zOQR19frRuMq4Yqp1lBSFWVfsZILr3Joq6zJUV2mJE1McDYf2prn_x2iC-6LneXe3UwL8Sfb3OFX4omQRI7ZTnNXfQMQmLNW7-4UfcybGw9mxBE8Caq8rcjh',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD5-ZMCNaBeacQNqKLbuiC2blsAbaBNhQGUotnBojJqaZi-jK8v9CCOKJQJcusIUusDi0WRQ2Y765f_WM9b2GdQsa-RiC-V3LlUReKQNsu8fjKrYI4i5Focvxvg1LEyzRjA0jvKulTNcHDQjlLmngPu1hhRofoJefZEEUOW4ij33vrNnkSQcHvYXvzWp7o_L9Y0o9k2ItBxOI8QZptV996BPEvY1Qa6sEfEKFCe3ePHtCm_aCmvBcE5',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCF9QwNsa6sheKwoME3U4IHiX0svepM9gjj6cV5faf9RK9ALi4wiM1SVtz28dpPPY0hcI3wMzCgby9LegAjPdPXfE1G7ZxzaGqetcfTZtEX-mMQ-bko3JsQo5x0owyf9chtsoqESx5Lp-bVMYgTMAZ3x0tbhOXKHRW0gv1Vakxq9RxJpv28mGb7ywMOYyi66hQ6eTNcR4XeePMtUSxGUkXFBDP8pROIlV7MSCY65UPYXbLCxvbdUA6E',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDz_c9Jgqu072MOpUi6sipybrQ9WSok8sSdH3iUlW6JtUw0sEnmwQSQv4ryFPyI1BMt0jw5AiXrLcDUpva6lDF7ng6UMjg1DQZlGNS2vHu-_38eiPlAM5iUKouNNtMwkQ6C4CNpRIaimrC2eDGyFa3vAeOYNV8rm-azNYzKYIEgyz6oZC9_iJrH3LN4XZ7BJHxxVMWtM6PJmPmD_z9nQoi91n6IoCap6p0goRKbY4ipD2BW2ln-fILU'
      ],
      link: 'product-card-holders.html',
      badge: 'RFID Shielded',
      desc: 'Dual-sided display holder with independent RFID shielding partition allowing tap-to-access on one face while completely isolating classified NFC credentials on the reverse.',
      finishes: [
        { name: 'Matte Obsidian & Ti', sub: 'PVD Coated' },
        { name: 'Champagne Gold Bezel', sub: '24K Foil Accent' },
        { name: 'Titanium Exoskeleton', sub: 'Grade-5 Alloy' }
      ],
      specs: {
        'Chassis': 'Matte Obsidian PVD & Grade-5 Titanium',
        'Locking Mechanism': 'Dual Neodymium Mag-Lock Coupling',
        'Faraday Isolation': '13.56MHz RF Partitioned Shielding',
        'Origin': 'Shuwaikh Industrial Metrology Lab'
      }
    },
    {
      id: 'holder-leather-obsidian',
      name: 'The Vanguard Armor Tactical Card Exoskeleton',
      category: 'holders',
      categoryName: 'Card Holders',
      categoryLink: 'product-card-holders.html',
      price: 14.500,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz_c9Jgqu072MOpUi6sipybrQ9WSok8sSdH3iUlW6JtUw0sEnmwQSQv4ryFPyI1BMt0jw5AiXrLcDUpva6lDF7ng6UMjg1DQZlGNS2vHu-_38eiPlAM5iUKouNNtMwkQ6C4CNpRIaimrC2eDGyFa3vAeOYNV8rm-azNYzKYIEgyz6oZC9_iJrH3LN4XZ7BJHxxVMWtM6PJmPmD_z9nQoi91n6IoCap6p0goRKbY4ipD2BW2ln-fILU',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDz_c9Jgqu072MOpUi6sipybrQ9WSok8sSdH3iUlW6JtUw0sEnmwQSQv4ryFPyI1BMt0jw5AiXrLcDUpva6lDF7ng6UMjg1DQZlGNS2vHu-_38eiPlAM5iUKouNNtMwkQ6C4CNpRIaimrC2eDGyFa3vAeOYNV8rm-azNYzKYIEgyz6oZC9_iJrH3LN4XZ7BJHxxVMWtM6PJmPmD_z9nQoi91n6IoCap6p0goRKbY4ipD2BW2ln-fILU',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD5-ZMCNaBeacQNqKLbuiC2blsAbaBNhQGUotnBojJqaZi-jK8v9CCOKJQJcusIUusDi0WRQ2Y765f_WM9b2GdQsa-RiC-V3LlUReKQNsu8fjKrYI4i5Focvxvg1LEyzRjA0jvKulTNcHDQjlLmngPu1hhRofoJefZEEUOW4ij33vrNnkSQcHvYXvzWp7o_L9Y0o9k2ItBxOI8QZptV996BPEvY1Qa6sEfEKFCe3ePHtCm_aCmvBcE5',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA8nC8fcauJ2lSyRSSw68ni7TyIEGY7hKO2pRKPmLGQY7-CaiYn4rRgDC6bPnyZdPMGLEj_o5PoSUI-OgXV2sbamnA9_coWSr3324I3kNhlVxT2mJ0qXRz6_DUWbpQNoDcr77ERnMzy3ZbNeq5aVTNydfg4BZx_L7FrVUv0_Tlm9aCIN7Fo7A2Bq5Esr4dhJjQd53LFGLPxhwqkp_8Czbv5n2rVa1lHNX41IyPNhii71CESUGACc-06',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBPfrEb4l8vXpD4o-YABTcDWGE83wdgB7Dya0n9SsykvAQAcM39CdIf1raFNfB0wVN9Xsz_4K45_gDF3nN_dhKz0nVKD5-MLj9mIu21uT9Ci6vmY7SOwGF-gNxLaXL9zOQR19frRuMq4Yqp1lBSFWVfsZILr3Joq6zJUV2mJE1McDYf2prn_x2iC-6LneXe3UwL8Sfb3OFX4omQRI7ZTnNXfQMQmLNW7-4UfcybGw9mxBE8Caq8rcjh'
      ],
      link: 'product-card-holders.html',
      badge: 'MIL-STD-810H',
      desc: 'Extreme-durability exoskeleton designed for field diplomats, aerospace engineers, and security personnel. Featuring drop-proof rubberized bumper corners and knurled solid brass locks.',
      finishes: [
        { name: 'Titanium Armor Cage', sub: '3-Meter Drop Certified' },
        { name: 'Obsidian Black', sub: 'Matte Hard-Coat' },
        { name: 'Brass Knurled Retention', sub: 'Heavy Duty' }
      ],
      specs: {
        'Core Structure': 'Grade-5 Titanium Armor Cage with Bumper Corners',
        'Impact Certification': 'MIL-STD-810H 3-Meter Drop Rated',
        'Retention Fasteners': 'Knurled Solid Brass Hex Machine Screws',
        'Origin': 'Shuwaikh Industrial Hardware Lab'
      }
    },

    // --- TUMBLERS ---
    {
      id: 'tumbler-executive-matte',
      name: 'The Executive Matte Obsidian Tumbler (500ml)',
      category: 'tumblers',
      categoryName: 'Tumblers',
      categoryLink: 'product-tumblers.html',
      price: 13.500,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACZR0hRqUPtznJczB5o-YP8ZPBOV3dsnOWr5oZ2CT3dGISUeXqpohxL-kWj3tNBqGHt9md0ydyJc6dBqe5ZusLHAlnq4uJqWvE0d67BeiepPbMh6XRGlVREY4Qy7hO9xa6NIRC_D5SkLg4kSo6IWM4Zd4QAtOIsVJlpAEZPmfUX21lliA8E5k787SlFqQ7rAvhO3a6fHNeNjA3golCD4tfZMJixUcXKfpPmsgGybb9_xJ7eDidC0sv',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuACZR0hRqUPtznJczB5o-YP8ZPBOV3dsnOWr5oZ2CT3dGISUeXqpohxL-kWj3tNBqGHt9md0ydyJc6dBqe5ZusLHAlnq4uJqWvE0d67BeiepPbMh6XRGlVREY4Qy7hO9xa6NIRC_D5SkLg4kSo6IWM4Zd4QAtOIsVJlpAEZPmfUX21lliA8E5k787SlFqQ7rAvhO3a6fHNeNjA3golCD4tfZMJixUcXKfpPmsgGybb9_xJ7eDidC0sv',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDT64Cq26Znz7eOsTNCatTH83mLIV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC_A6H9J0ei2OUqfuFaCsHtej93xyCMi162o97eaJ2UDMO3bzLT4lqMePodjquUIl7X62nrnFtZkN3-DOAEMn7W0rN6s7sb6xpnItdQWtXwc2fHUKB-ywWCJZWRwsKRA6DbIHan-TlGmhvIVyAxNRsWdhs_uPLGg5XBAa7vuBxrH4WYRcWqL5Hxx66eiWjN7-d4Pr6nTJTxQzM2mACDnmxSVJS8nrnG2nkiXJfsgkdj-1JiHTpm6v78',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDxYM5FLkCW9TfEGIgI7aYp-HoZHm4CY5eSlShMHvDr7RO6OdsGBuRGyPZbd7qZCEJgo7z1eyCEg3mwRB60D3az8tRjDnrIS01A8iDEK7rFO_Ty6ZxrTjQlSAp-sIelSxyo1UYTsqt6EpPpP4D0edy1PP29I_bcX5jZVzdzN07KxScce8nMYXCvAp9_sKHX5oMAkYYQgn-zorUaWbVUSobBGJ_NVU3TWvOY3zIMCnTViqrJtL_v1D9n'
      ],
      link: 'product-tumblers.html',
      badge: '24h Cold / 12h Hot',
      desc: 'Culinary Grade 18/8 double-walled vacuum tumbler in velvet matte obsidian with continuous 360-degree laser-ablated Arabic calligraphy and magnetic splash-proof lid.',
      finishes: [
        { name: 'Matte Obsidian', sub: 'Velvet Tactile Finish' },
        { name: 'Champagne Titanium', sub: 'PVD Sintered' },
        { name: 'Brushed Steel', sub: 'Culinary Grade 18/8' }
      ],
      specs: {
        'Thermal Retention': '24 Hours Iced / 12 Hours Piping Hot',
        'Substrate Material': 'Culinary Grade 18/8 Stainless Steel',
        'Engraving Process': '360° Rotary Sub-Micron Fiber Laser',
        'Origin': 'Shuwaikh Thermal & Laser Lab'
      }
    },
    {
      id: 'tumbler-360-obsidian',
      name: 'Sculpted Champagne Gold Titanium Vessel (600ml)',
      category: 'tumblers',
      categoryName: 'Tumblers',
      categoryLink: 'product-tumblers.html',
      price: 15.000,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT64Cq26Znz7eOsTNCatTH83mLIV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDT64Cq26Znz7eOsTNCatTH83mLIV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuACZR0hRqUPtznJczB5o-YP8ZPBOV3dsnOWr5oZ2CT3dGISUeXqpohxL-kWj3tNBqGHt9md0ydyJc6dBqe5ZusLHAlnq4uJqWvE0d67BeiepPbMh6XRGlVREY4Qy7hO9xa6NIRC_D5SkLg4kSo6IWM4Zd4QAtOIsVJlpAEZPmfUX21lliA8E5k787SlFqQ7rAvhO3a6fHNeNjA3golCD4tfZMJixUcXKfpPmsgGybb9_xJ7eDidC0sv',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC_A6H9J0ei2OUqfuFaCsHtej93xyCMi162o97eaJ2UDMO3bzLT4lqMePodjquUIl7X62nrnFtZkN3-DOAEMn7W0rN6s7sb6xpnItdQWtXwc2fHUKB-ywWCJZWRwsKRA6DbIHan-TlGmhvIVyAxNRsWdhs_uPLGg5XBAa7vuBxrH4WYRcWqL5Hxx66eiWjN7-d4Pr6nTJTxQzM2mACDnmxSVJS8nrnG2nkiXJfsgkdj-1JiHTpm6v78',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDxYM5FLkCW9TfEGIgI7aYp-HoZHm4CY5eSlShMHvDr7RO6OdsGBuRGyPZbd7qZCEJgo7z1eyCEg3mwRB60D3az8tRjDnrIS01A8iDEK7rFO_Ty6ZxrTjQlSAp-sIelSxyo1UYTsqt6EpPpP4D0edy1PP29I_bcX5jZVzdzN07KxScce8nMYXCvAp9_sKHX5oMAkYYQgn-zorUaWbVUSobBGJ_NVU3TWvOY3zIMCnTViqrJtL_v1D9n'
      ],
      link: 'product-tumblers.html',
      badge: 'Bespoke Titanium',
      desc: 'Hand-brushed Grade-5 champagne titanium insulated vessel with sub-micron sovereign crest laser etching and knurled tactile grip.',
      finishes: [
        { name: 'Champagne Gold Titanium', sub: 'PVD Metallic' },
        { name: 'Matte Obsidian', sub: 'Zero-Fingerprint Coat' },
        { name: '24K Electro-Gilt Mirror', sub: 'Diplomatic Tier' }
      ],
      specs: {
        'Thermal Longevity': '24 Hours Cold / 18 Hours Warm',
        'Substrate Material': 'Grade-5 Titanium & 18/8 Double Vacuum',
        'Capacity Volume': '20 oz / 600 ml Extended Volume',
        'Origin': 'Shuwaikh Thermal & Laser Lab'
      }
    },

    // --- BOTTLES ---
    {
      id: 'bottle-monolith-500',
      name: 'Series B-X Titanium Thermal Bottle (750ml)',
      category: 'bottles',
      categoryName: 'Bottles',
      categoryLink: 'product-bottles.html',
      price: 14.500,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_A6H9J0ei2OUqfuFaCsHtej93xyCMi162o97eaJ2UDMO3bzLT4lqMePodjquUIl7X62nrnFtZkN3-DOAEMn7W0rN6s7sb6xpnItdQWtXwc2fHUKB-ywWCJZWRwsKRA6DbIHan-TlGmhvIVyAxNRsWdhs_uPLGg5XBAa7vuBxrH4WYRcWqL5Hxx66eiWjN7-d4Pr6nTJTxQzM2mACDnmxSVJS8nrnG2nkiXJfsgkdj-1JiHTpm6v78',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC_A6H9J0ei2OUqfuFaCsHtej93xyCMi162o97eaJ2UDMO3bzLT4lqMePodjquUIl7X62nrnFtZkN3-DOAEMn7W0rN6s7sb6xpnItdQWtXwc2fHUKB-ywWCJZWRwsKRA6DbIHan-TlGmhvIVyAxNRsWdhs_uPLGg5XBAa7vuBxrH4WYRcWqL5Hxx66eiWjN7-d4Pr6nTJTxQzM2mACDnmxSVJS8nrnG2nkiXJfsgkdj-1JiHTpm6v78',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDxYM5FLkCW9TfEGIgI7aYp-HoZHm4CY5eSlShMHvDr7RO6OdsGBuRGyPZbd7qZCEJgo7z1eyCEg3mwRB60D3az8tRjDnrIS01A8iDEK7rFO_Ty6ZxrTjQlSAp-sIelSxyo1UYTsqt6EpPpP4D0edy1PP29I_bcX5jZVzdzN07KxScce8nMYXCvAp9_sKHX5oMAkYYQgn-zorUaWbVUSobBGJ_NVU3TWvOY3zIMCnTViqrJtL_v1D9n',
        'https://lh3.googleusercontent.com/aida/AEtjO1XwU4KOVqmDwxkxGswLA9ltzY9xjrHq4xdYDwrJxH9lr31Osg99eW0kYwTKwCPWvCZzxZgyn6cXM5G8TLEG7fHiCNq5FTxG51es4Jn8sgx1jrAHeJKveO8bhl0xrgVTEV9qdnaxsBY7z5yRq-LkcHFiAG3s0s9m4o_0ohGIRjEMfsfLPY4Vo3jqFwjSuQuQmnlfC6Fy9n7_3sHVKnjPHbSFMNt9eOGJtJuKFwIXK9wEDJsBb2_e6ztK3Wk',
        'https://lh3.googleusercontent.com/aida/AEtjO1WYtWvVgPgowljI56mcZEYdWY1Pyf7pgLC4tr98hTMVN0zekEno4PCk5iujutqS4DrzuuuXKCgZ53ODMLxqBiN2Yn3UqkDp47qkF-wQha0LaqrP5ifC7SGcAGy--iPlWYVR7GbE1u75_fTcFvTQVCLZjlPkcKnq1Y2cNc2gpTY4OcQ2iw9HsjmEuiNR7p5vjAHI2QjWkHZU_hvfqSfUVKJRZnP1OcE6zvqwu0CAvSegzAenEy1X6h11T08'
      ],
      link: 'product-bottles.html',
      badge: '24h Cold / 18h Hot',
      desc: 'Matte obsidian CNC chassis with knurled champagne gold cap, personalized laser-ablated Arabic calligraphy monogram, and royal seal.',
      finishes: [
        { name: 'Matte Obsidian', sub: 'CNC Anodized Body' },
        { name: 'Champagne Titanium', sub: 'Hand-Brushed Gold' },
        { name: 'Brushed Titanium', sub: 'Culinary Grade 18/8' }
      ],
      specs: {
        'Thermal Insulation': '24 Hours Ice Cold / 18 Hours Piping Hot',
        'Substrate Material': 'Culinary Grade 18/8 Steel + Titanium Liner',
        'Laser Engraving': '360° Continuous Rotary Sub-Micron Etch',
        'Origin': 'Shuwaikh Thermal Metrology Lab'
      }
    },
    {
      id: 'bottle-series-bx',
      name: 'Diplomatic Corps Titanium Bottle (750ml)',
      category: 'bottles',
      categoryName: 'Bottles',
      categoryLink: 'product-bottles.html',
      price: 26.000,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1XwU4KOVqmDwxkxGswLA9ltzY9xjrHq4xdYDwrJxH9lr31Osg99eW0kYwTKwCPWvCZzxZgyn6cXM5G8TLEG7fHiCNq5FTxG51es4Jn8sgx1jrAHeJKveO8bhl0xrgVTEV9qdnaxsBY7z5yRq-LkcHFiAG3s0s9m4o_0ohGIRjEMfsfLPY4Vo3jqFwjSuQuQmnlfC6Fy9n7_3sHVKnjPHbSFMNt9eOGJtJuKFwIXK9wEDJsBb2_e6ztK3Wk',
      images: [
        'https://lh3.googleusercontent.com/aida/AEtjO1XwU4KOVqmDwxkxGswLA9ltzY9xjrHq4xdYDwrJxH9lr31Osg99eW0kYwTKwCPWvCZzxZgyn6cXM5G8TLEG7fHiCNq5FTxG51es4Jn8sgx1jrAHeJKveO8bhl0xrgVTEV9qdnaxsBY7z5yRq-LkcHFiAG3s0s9m4o_0ohGIRjEMfsfLPY4Vo3jqFwjSuQuQmnlfC6Fy9n7_3sHVKnjPHbSFMNt9eOGJtJuKFwIXK9wEDJsBb2_e6ztK3Wk',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC_A6H9J0ei2OUqfuFaCsHtej93xyCMi162o97eaJ2UDMO3bzLT4lqMePodjquUIl7X62nrnFtZkN3-DOAEMn7W0rN6s7sb6xpnItdQWtXwc2fHUKB-ywWCJZWRwsKRA6DbIHan-TlGmhvIVyAxNRsWdhs_uPLGg5XBAa7vuBxrH4WYRcWqL5Hxx66eiWjN7-d4Pr6nTJTxQzM2mACDnmxSVJS8nrnG2nkiXJfsgkdj-1JiHTpm6v78',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDxYM5FLkCW9TfEGIgI7aYp-HoZHm4CY5eSlShMHvDr7RO6OdsGBuRGyPZbd7qZCEJgo7z1eyCEg3mwRB60D3az8tRjDnrIS01A8iDEK7rFO_Ty6ZxrTjQlSAp-sIelSxyo1UYTsqt6EpPpP4D0edy1PP29I_bcX5jZVzdzN07KxScce8nMYXCvAp9_sKHX5oMAkYYQgn-zorUaWbVUSobBGJ_NVU3TWvOY3zIMCnTViqrJtL_v1D9n',
        'https://lh3.googleusercontent.com/aida/AEtjO1WYtWvVgPgowljI56mcZEYdWY1Pyf7pgLC4tr98hTMVN0zekEno4PCk5iujutqS4DrzuuuXKCgZ53ODMLxqBiN2Yn3UqkDp47qkF-wQha0LaqrP5ifC7SGcAGy--iPlWYVR7GbE1u75_fTcFvTQVCLZjlPkcKnq1Y2cNc2gpTY4OcQ2iw9HsjmEuiNR7p5vjAHI2QjWkHZU_hvfqSfUVKJRZnP1OcE6zvqwu0CAvSegzAenEy1X6h11T08'
      ],
      link: 'product-bottles.html',
      badge: 'Sovereign Spec',
      desc: 'Hand-brushed champagne titanium bottle with laser-ablated ministerial coat of arms, integrated silicone base, and vacuum barrier.',
      finishes: [
        { name: 'Champagne Gold Titanium', sub: 'Hand-Brushed Gold' },
        { name: 'Matte Obsidian PVD', sub: 'DLC Coated' },
        { name: 'Brushed Aerospace Ti', sub: 'Raw Sintered' }
      ],
      specs: {
        'Substrate Metallurgy': 'Solid Grade-5 Titanium Outer Chassis',
        'Thermal Insulation': 'Dual-Wall Vacuum with Copper Barrier',
        'Laser Relief Tolerance': '0.015mm Fine Diwanic Calligraphy',
        'Origin': 'Shuwaikh Industrial Metrology Lab'
      }
    },

    // --- CUSTOM FLEET & ENSEMBLES ---
    {
      id: 'set-signature-suite',
      name: 'The Executive Identity Ensemble (Presentation Box)',
      category: 'custom',
      categoryName: 'Custom Merchandise',
      categoryLink: 'custom-merchandise.html',
      price: 38.000,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_tG9iLAoEmnN3UZHpojTIHbYTx2sqwVFpBVlXajcPpnuSCya78SIoifCoABDTSPF-PyC6bOPEa4Yo5RjfiHWdoOWFFZc6J_F7tKU-8zbZxdg4kZnM26mxPWlcAOGAnMGRQLqnuk_kwbCstJjeMlwV8gDJp7OkhIUguN8aDWsjwOgsuTYOBPHmw2qEYslD5vFdL4XrMORJ9vPz31Wi2wFJGp-UDsmWMbSCXLHHbkBogY1pUx1e4sTw',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA_tG9iLAoEmnN3UZHpojTIHbYTx2sqwVFpBVlXajcPpnuSCya78SIoifCoABDTSPF-PyC6bOPEa4Yo5RjfiHWdoOWFFZc6J_F7tKU-8zbZxdg4kZnM26mxPWlcAOGAnMGRQLqnuk_kwbCstJjeMlwV8gDJp7OkhIUguN8aDWsjwOgsuTYOBPHmw2qEYslD5vFdL4XrMORJ9vPz31Wi2wFJGp-UDsmWMbSCXLHHbkBogY1pUx1e4sTw',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDfhhB_Rl9goO2R1cBJrLvHsWtKWSEt2MTXRaTQvTGCCCwpmVeyVGVQH0PHLCM0DUBq3MP7Acd0o2d4iYAZTFX8Qla47tl2z7Gxn36CWp6LuEHKzYQl1lSr4XEZ4M7xdhnmNLlBx-7LzDLf-JGHpUo1-buVwxK2TL4nFTlgYRALO9J3Ovh4qp3KznRwfIlCf6rEIxWMULaftcqbrjK6oorphk56sSNFLbHdUQDtvB1YLegk0956Vd5T',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB9mcgasSKyrzF91PfgQ5UuGMdmEQ1rKTz2zUgFC3gJWFx2Z-2VPgZ5Os-3_O6eWjtNSMHy3KqU-E8Z9b-fQP_6fh5qqVa7CfU-KV65kPUbBAKpldceAlw6x0ic3SXvha6eZ9HakevpjJi9gU8ZQ1S2tLfKjSdTTaQQxpuaLj1m3wTyqss024_u-14my8XcIysI-jXp_jA3oG3ODPlnVtr0ZOIUkwipEH56aVTeacL_toMLOQVSQrkd',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAgLxWdWzErwFwfx1AFywxWpjtcJH6CDaN8rXXRE85FojPPpTHuUiY6KFY1rniNgjRinHJx70j6ML-k-CgqaDQurYB7dsGcRvnnSpiZercjqeSkiYbvUxQHVcIhhHzoN8gSBKvYKlXrn6bj_fbERmoBA49huJI_BM_-zG6WaIexbdnQMGHCDEtAwwzzFl_8jmE-Jc_4516g5hXUO-8OB37pNDTzL6frp8F4GsR-CuHTpbXpD5YdEzJa'
      ],
      link: 'custom-merchandise.html',
      badge: 'Presentation Box',
      desc: 'The sovereign identity ensemble: CNC Titanium Card Holder paired with custom woven silk jacquard lanyard, laser-ablated titanium badge reel, and NFC smart card in velvet collector box.',
      finishes: [
        { name: 'Master Obsidian Suite', sub: 'Matte Velvet Casing' },
        { name: 'Champagne Gold Ensemble', sub: 'PVD Titanium Hardware' },
        { name: 'Royal Navy & Gold', sub: 'Sovereign Diplomatic' }
      ],
      specs: {
        'Ensemble Items': 'NFC Titanium Card + Dual-Slot Armor + Silk Lanyard + Reel',
        'Packaging Type': 'Shuwaikh Hot-Foil Stamp Rigid Velvet Box',
        'Cryptographic Module': 'NXP NTAG424 DNA Encrypted Contactless',
        'Origin': 'Shuwaikh Bespoke Atelier Direct'
      }
    },
    {
      id: 'fleet-executive-set',
      name: 'The Executive Identity Fleet (4-Piece Set)',
      category: 'custom',
      categoryName: 'Custom Merchandise',
      categoryLink: 'custom-merchandise.html',
      price: 68.000,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl-byBQ2Cu0M8UJ81b43a5ARLxtyZvxXdrRZWsMXSSEAT4ZN3VgA84IJYJpy3RN-oJogX-lFUrzS2_479g5_FkSIetRwGf7nPJqi0WcRSmJhN-r7TsYcnNkjdQLPemetVrmyqzElGHce3TxRprVWcAmPGP67Ypo-a-fQtzRkDQ9XTlA9IJYGwReqRnG53guv6ovYaFqHdHuDFYNiLBrhhr-_yVnVMdOwxi7QaF0m3RemUX5vNOP7dL',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDl-byBQ2Cu0M8UJ81b43a5ARLxtyZvxXdrRZWsMXSSEAT4ZN3VgA84IJYJpy3RN-oJogX-lFUrzS2_479g5_FkSIetRwGf7nPJqi0WcRSmJhN-r7TsYcnNkjdQLPemetVrmyqzElGHce3TxRprVWcAmPGP67Ypo-a-fQtzRkDQ9XTlA9IJYGwReqRnG53guv6ovYaFqHdHuDFYNiLBrhhr-_yVnVMdOwxi7QaF0m3RemUX5vNOP7dL',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA_tG9iLAoEmnN3UZHpojTIHbYTx2sqwVFpBVlXajcPpnuSCya78SIoifCoABDTSPF-PyC6bOPEa4Yo5RjfiHWdoOWFFZc6J_F7tKU-8zbZxdg4kZnM26mxPWlcAOGAnMGRQLqnuk_kwbCstJjeMlwV8gDJp7OkhIUguN8aDWsjwOgsuTYOBPHmw2qEYslD5vFdL4XrMORJ9vPz31Wi2wFJGp-UDsmWMbSCXLHHbkBogY1pUx1e4sTw',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDfhhB_Rl9goO2R1cBJrLvHsWtKWSEt2MTXRaTQvTGCCCwpmVeyVGVQH0PHLCM0DUBq3MP7Acd0o2d4iYAZTFX8Qla47tl2z7Gxn36CWp6LuEHKzYQl1lSr4XEZ4M7xdhnmNLlBx-7LzDLf-JGHpUo1-buVwxK2TL4nFTlgYRALO9J3Ovh4qp3KznRwfIlCf6rEIxWMULaftcqbrjK6oorphk56sSNFLbHdUQDtvB1YLegk0956Vd5T',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB9mcgasSKyrzF91PfgQ5UuGMdmEQ1rKTz2zUgFC3gJWFx2Z-2VPgZ5Os-3_O6eWjtNSMHy3KqU-E8Z9b-fQP_6fh5qqVa7CfU-KV65kPUbBAKpldceAlw6x0ic3SXvha6eZ9HakevpjJi9gU8ZQ1S2tLfKjSdTTaQQxpuaLj1m3wTyqss024_u-14my8XcIysI-jXp_jA3oG3ODPlnVtr0ZOIUkwipEH56aVTeacL_toMLOQVSQrkd'
      ],
      link: 'custom-merchandise.html',
      badge: 'Complete Set',
      desc: 'Complete boxed set: Grade-5 Titanium Smart Card + Dual-Slot Armor + Silk Jacquard Lanyard + Sculpted Thermal Tumbler in bespoke gift packaging.',
      finishes: [
        { name: 'Full Executive Suite', sub: 'Matte Obsidian + Gold' },
        { name: 'Titanium Raw Billet', sub: 'Industrial Aerospace' },
        { name: 'Sovereign Protocol', sub: 'Diplomatic Gilt' }
      ],
      specs: {
        'Set Contains': 'Card + Holder + Silk Lanyard + Tumbler (500ml)',
        'Delivery Time': '48h Kuwait VIP White-Glove Handover',
        'Serial Laser': '0.02mm Optical Calibration',
        'Origin': 'Shuwaikh Industrial Metrology Lab'
      }
    },
    {
      id: 'set-valet-pen',
      name: 'Titanium Desk Valet & Knurled Pen Suite',
      category: 'custom',
      categoryName: 'Custom Merchandise',
      categoryLink: 'custom-merchandise.html',
      price: 19.500,
      currency: 'KWD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9mcgasSKyrzF91PfgQ5UuGMdmEQ1rKTz2zUgFC3gJWFx2Z-2VPgZ5Os-3_O6eWjtNSMHy3KqU-E8Z9b-fQP_6fh5qqVa7CfU-KV65kPUbBAKpldceAlw6x0ic3SXvha6eZ9HakevpjJi9gU8ZQ1S2tLfKjSdTTaQQxpuaLj1m3wTyqss024_u-14my8XcIysI-jXp_jA3oG3ODPlnVtr0ZOIUkwipEH56aVTeacL_toMLOQVSQrkd',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB9mcgasSKyrzF91PfgQ5UuGMdmEQ1rKTz2zUgFC3gJWFx2Z-2VPgZ5Os-3_O6eWjtNSMHy3KqU-E8Z9b-fQP_6fh5qqVa7CfU-KV65kPUbBAKpldceAlw6x0ic3SXvha6eZ9HakevpjJi9gU8ZQ1S2tLfKjSdTTaQQxpuaLj1m3wTyqss024_u-14my8XcIysI-jXp_jA3oG3ODPlnVtr0ZOIUkwipEH56aVTeacL_toMLOQVSQrkd',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDfhhB_Rl9goO2R1cBJrLvHsWtKWSEt2MTXRaTQvTGCCCwpmVeyVGVQH0PHLCM0DUBq3MP7Acd0o2d4iYAZTFX8Qla47tl2z7Gxn36CWp6LuEHKzYQl1lSr4XEZ4M7xdhnmNLlBx-7LzDLf-JGHpUo1-buVwxK2TL4nFTlgYRALO9J3Ovh4qp3KznRwfIlCf6rEIxWMULaftcqbrjK6oorphk56sSNFLbHdUQDtvB1YLegk0956Vd5T',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAgLxWdWzErwFwfx1AFywxWpjtcJH6CDaN8rXXRE85FojPPpTHuUiY6KFY1rniNgjRinHJx70j6ML-k-CgqaDQurYB7dsGcRvnnSpiZercjqeSkiYbvUxQHVcIhhHzoN8gSBKvYKlXrn6bj_fbERmoBA49huJI_BM_-zG6WaIexbdnQMGHCDEtAwwzzFl_8jmE-Jc_4516g5hXUO-8OB37pNDTzL6frp8F4GsR-CuHTpbXpD5YdEzJa',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA_tG9iLAoEmnN3UZHpojTIHbYTx2sqwVFpBVlXajcPpnuSCya78SIoifCoABDTSPF-PyC6bOPEa4Yo5RjfiHWdoOWFFZc6J_F7tKU-8zbZxdg4kZnM26mxPWlcAOGAnMGRQLqnuk_kwbCstJjeMlwV8gDJp7OkhIUguN8aDWsjwOgsuTYOBPHmw2qEYslD5vFdL4XrMORJ9vPz31Wi2wFJGp-UDsmWMbSCXLHHbkBogY1pUx1e4sTw'
      ],
      link: 'custom-merchandise.html',
      badge: 'Desk Valet Set',
      desc: 'CNC-machined solid Grade-5 titanium valet tray with inset champagne gold plate and knurled brass architectural writing instrument.',
      finishes: [
        { name: 'Grade-5 Ti + Brass', sub: 'Matte Obsidian Plate' },
        { name: 'Champagne Gilt Desk', sub: 'Mirror 24K Polish' },
        { name: 'Diplomatic Monolith', sub: 'Raw Billet Satin' }
      ],
      specs: {
        'Substrate': 'Solid CNC Titanium (Ti-6Al-4V) + C360 Brass',
        'Laser Engraving': 'Diwanic Crest Sub-Micron Precision (±0.02mm)',
        'Cartridge Type': 'Schmidt German Rollerball Refillable',
        'Origin': 'Shuwaikh Industrial Metrology Lab'
      }
    }
  ];

  // Default authentic client profile
  const DEFAULT_USER = {
    id: 'usr_1024_kwt',
    fullName: 'Valued Client',
    email: 'client@example.com',
    phone: '+965 9000 0000',
    company: 'Kuwait Protocol Office',
    role: 'Managing Director',
    tier: 'Premium Client',
    avatarInitial: 'C',
    address: {
      fullName: 'Valued Client',
      phone: '+965 9000 0000',
      country: 'Kuwait',
      city: 'Kuwait City',
      area: 'Shuwaikh Industrial Area, Block 1',
      street: 'Street 42, Building 8',
      postalCode: '13001',
      isDefault: true
    }
  };

  // Seed sample initial realistic orders
  function getSeedOrders() {
    return [
      {
        orderId: 'IDC-1024',
        date: '2026-09-14T10:15:00Z',
        status: 'DESIGN APPROVED',
        statusKey: 'design_approved',
        statusLabel: 'Design Approved',
        stageIndex: 2, // 0: Order Received, 1: Design Review, 2: Design Approved, 3: Production, 4: Quality Check, 5: Ready, 6: Delivered
        subtotal: 325.000,
        shipping: 0.000,
        discount: 0.000,
        total: 325.000,
        currency: 'KWD',
        paymentMethod: 'KNET Gateway (Kuwait)',
        trackingCode: 'IDC-TRK-1024-KWT',
        estimatedDelivery: 'Sep 24, 2026',
        items: [
          {
            id: 'card-grade5-titanium',
            name: 'Custom ID Cards',
            subtitle: 'Grade 5 Titanium NFC Smart Card',
            price: 6.500,
            quantity: 50,
            options: {
              finish: 'Matte Obsidian & Gold Inlay',
              cardholderName: 'Vanguard Executive Staff',
              engravingText: 'VANGUARD KUWAIT'
            },
            image: CATALOG[0].image
          }
        ]
      },
      {
        orderId: 'IDC-1021',
        date: '2026-09-02T16:40:00Z',
        status: 'DELIVERED',
        statusKey: 'delivered',
        statusLabel: 'Delivered',
        stageIndex: 6,
        subtotal: 39.000,
        shipping: 0.000,
        discount: 0.000,
        total: 39.000,
        currency: 'KWD',
        paymentMethod: 'Credit Card (Visa / Mastercard)',
        trackingCode: 'IDC-TRK-1021-KWT',
        estimatedDelivery: 'Sep 06, 2026',
        items: [
          {
            id: 'tumbler-360-obsidian',
            name: 'Customized Tumbler',
            subtitle: 'Sculpted Obsidian 360° Rotary Tumbler (500ml)',
            price: 19.500,
            quantity: 2,
            options: {
              engraving: 'Executive Nameplate Laser Engraving',
              calligraphyStyle: 'Diwani Script'
            },
            image: CATALOG[9].image
          }
        ]
      },
      {
        orderId: 'IDC-1018',
        date: '2026-08-20T11:20:00Z',
        status: 'DELIVERED',
        statusKey: 'delivered',
        statusLabel: 'Delivered',
        stageIndex: 6,
        subtotal: 450.000,
        shipping: 0.000,
        discount: 0.000,
        total: 450.000,
        currency: 'KWD',
        paymentMethod: 'KNET Gateway (Kuwait)',
        trackingCode: 'IDC-TRK-1018-KWT',
        estimatedDelivery: 'Aug 26, 2026',
        items: [
          {
            id: 'lanyard-silk-jacquard',
            name: 'Executive Silk Jacquard Lanyard',
            subtitle: 'High-density woven silk with knurled brass hardware',
            price: 4.500,
            quantity: 100,
            options: {
              hardware: 'Champagne Brass Monogram Clasp',
              weave: 'Midnight Obsidian & Gold Thread'
            },
            image: CATALOG[3].image
          }
        ]
      },
      {
        orderId: 'IDC-1012',
        date: '2026-08-05T09:00:00Z',
        status: 'DELIVERED',
        statusKey: 'delivered',
        statusLabel: 'Delivered',
        stageIndex: 6,
        subtotal: 82.500,
        shipping: 0.000,
        discount: 0.000,
        total: 82.500,
        currency: 'KWD',
        paymentMethod: 'KNET Gateway (Kuwait)',
        trackingCode: 'IDC-TRK-1012-KWT',
        estimatedDelivery: 'Aug 10, 2026',
        items: [
          {
            id: 'holder-armor-dual',
            name: 'Architectural Dual-Slot Card Holders',
            subtitle: 'Unibody RFID-shielded aluminum enclosure',
            price: 16.500,
            quantity: 5,
            options: {
              finish: 'Anodized Space Grey'
            },
            image: CATALOG[7].image
          }
        ]
      }
    ];
  }

  // Seed sample custom requests
  function getSeedCustomRequests() {
    return [
      {
        refCode: 'CR-018',
        date: '2026-09-16T14:20:00Z',
        product: 'Corporate Lanyards',
        quantity: 100,
        status: 'DESIGN REVIEW',
        statusKey: 'design_review',
        reference: 'Vanguard_Lanyard_Spec_v2.pdf',
        details: 'Custom midnight obsidian lanyard with champagne gold metallic threading and laser-engraved monogram clip.',
        budget: '400 - 550 KWD'
      },
      {
        refCode: 'CR-015',
        date: '2026-09-08T09:45:00Z',
        product: 'Executive Titanium Desk Sets',
        quantity: 15,
        status: 'QUOTE PENDING',
        statusKey: 'quote_pending',
        reference: 'Executive_Gift_Set_Reference.png',
        details: 'Complete custom desk set comprising titanium card armor, thermal tumbler with Arabic calligraphy, and engraved leather pouch.',
        budget: '800 - 1,200 KWD'
      },
      {
        refCode: 'CR-011',
        date: '2026-08-15T16:00:00Z',
        product: 'Dual-Slot Card Holders',
        quantity: 50,
        status: 'COMPLETED',
        statusKey: 'completed',
        reference: 'Card_Armor_Cad_Drawing.dwg',
        details: 'RFID-blocking custom CNC milled card holders for executive board members.',
        budget: '750 KWD'
      }
    ];
  }

  // Seed sample saved designs
  function getSeedSavedDesigns() {
    return [
      {
        id: 'des-001',
        name: 'Corporate Crest & Monogram',
        product: 'Custom ID Cards',
        dateSaved: 'Aug 28, 2026',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT64Cq26Znz7eOsTNCatTH83mLIV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW',
        link: 'custom-order.html?design=des-001'
      },
      {
        id: 'des-002',
        name: 'Diwani Calligraphy Vector',
        product: 'Architectural Tumblers',
        dateSaved: 'Sep 04, 2026',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACZR0hRqUPtznJczB5o-YP8ZPBOV3dsnOWr5oZ2CT3dGISUeXqpohxL-kWj3tNBqGHt9md0ydyJc6dBqe5ZusLHAlnq4uJqWvE0d67BeiepPbMh6XRGlVREY4Qy7hO9xa6NIRC_D5SkLg4kSo6IWM4Zd4QAtOIsVJlpAEZPmfUX21lliA8E5k787SlFqQ7rAvhO3a6fHNeNjA3golCD4tfZMJixUcXKfpPmsgGybb9_xJ7eDidC0sv',
        link: 'product-tumblers.html?design=des-002'
      },
      {
        id: 'des-003',
        name: 'Heraldic Falcon Pattern',
        product: 'Silk Jacquard Lanyards',
        dateSaved: 'Jul 19, 2026',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi5Z26z_wZ9f0jO-8q1P6tV9v1dYLxELBiLVkCFMHgBREYcKsWn_9UBS3uNZH66RVWq4UV9K2Qn-tsn8CtoDj2MiwZ92ErHAJJWNaZgk45A6XxPnRtNvlKqY8byXjz1pP3hLrm-zg_kQsaGpEW4CYJrfRGiiZTWZhfxmYpWSwbhwQgOLxClVee3SZ8DfhIpyhRXawFZQbdZ_0EEFPHE6J9kSccdcHEGM5pOwTVPTGOAdNJ5VW',
        link: 'product-lanyards.html?design=des-003'
      }
    ];
  }

  // Seed sample addresses
  function getSeedAddresses() {
    return [
      {
        id: 'addr-1',
        title: 'Corporate Headquarters',
        fullName: 'Valued Client',
        phone: '+965 9000 0000',
        country: 'Kuwait',
        city: 'Kuwait City',
        area: 'Sharq Financial District',
        street: 'Al-Shuhada Street, Tower 18, Level 24',
        postalCode: '13001',
        isDefault: true
      },
      {
        id: 'addr-2',
        title: 'Shuwaikh Studio & Reception',
        fullName: 'Valued Client',
        phone: '+965 9000 0000',
        country: 'Kuwait',
        city: 'Kuwait City',
        area: 'Shuwaikh Industrial 1',
        street: 'Street 12, Workshop Complex 4',
        postalCode: '13002',
        isDefault: false
      }
    ];
  }

  // Reactive Event System
  const listeners = {};

  function trigger(event, data) {
    if (listeners[event]) {
      listeners[event].forEach(fn => {
        try { fn(data); } catch(err) { console.error('Listener error:', err); }
      });
    }
    // Also dispatch custom DOM event for external vanilla scripts
    window.dispatchEvent(new CustomEvent('idcraft_state_' + event, { detail: data }));
  }

  // Storage Helpers
  function getJSON(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch(e) {
      return fallback;
    }
  }

  function setJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch(e) {
      console.warn('LocalStorage error:', e);
    }
  }

  // Core State Manager API
  const IDCraftState = {
    catalog: CATALOG,
    getCatalog() {
      return CATALOG;
    },

    // ==========================================
    // CATALOG METHODS
    // ==========================================
    getProductById(id) {
      if (!id) return CATALOG[0];
      const direct = CATALOG.find(p => p.id === id);
      if (direct) return direct;

      // Alias dictionary
      const ALIASES = {
        'card-01': 'card-matte-obsidian',
        'card-02': 'card-grade5-titanium',
        'card-03': 'card-frosted-acrylic',
        'card-04': 'card-grade5-titanium',
        'card-05': 'card-matte-obsidian',
        'lanyard-01': 'lanyard-silk-jacquard',
        'lanyard-02': 'lanyard-chevron-tan',
        'lanyard-03': 'lanyard-tactical-kevlar',
        'lanyard-04': 'lanyard-silk-jacquard',
        'lanyard-05': 'lanyard-chevron-tan',
        'badge-reel-01': 'reel-radial-brass',
        'badge-reel-02': 'reel-obsidian-carabiner',
        'badge-reel-03': 'reel-radial-brass',
        'badge-reel-04': 'reel-obsidian-carabiner',
        'badge-reel-05': 'reel-obsidian-carabiner',
        'card-holder-01': 'holder-carbon-tactile',
        'card-holder-02': 'holder-carbon-tactile',
        'card-holder-03': 'holder-carbon-tactile',
        'card-holder-04': 'holder-armor-dual',
        'card-holder-05': 'holder-leather-obsidian',
        'tumbler-01': 'tumbler-executive-matte',
        'tumbler-02': 'tumbler-360-obsidian',
        'tumbler-03': 'tumbler-executive-matte',
        'tumbler-04': 'tumbler-360-obsidian',
        'tumbler-05': 'tumbler-executive-matte',
        'bottle-01': 'bottle-monolith-500',
        'bottle-02': 'bottle-monolith-500',
        'bottle-03': 'bottle-series-bx',
        'bottle-04': 'bottle-monolith-500',
        'bottle-05': 'bottle-series-bx',
        'identity-suite-01': 'set-signature-suite',
        'set-01': 'set-signature-suite',
        'custom-merch-01': 'set-signature-suite',
        'custom-merch-02': 'set-valet-pen',
        'custom-merch-03': 'holder-leather-obsidian',
        'custom-merch-04': 'card-matte-obsidian',
        'custom-merch-05': 'reel-radial-brass',
        'custom-merch-06': 'fleet-executive-set'
      };

      if (ALIASES[id]) {
        const match = CATALOG.find(p => p.id === ALIASES[id]);
        if (match) return match;
      }

      // Fuzzy category match if needed
      const cleanId = id.toLowerCase();
      if (cleanId.includes('tumbler')) return CATALOG.find(p => p.category === 'tumblers') || CATALOG[0];
      if (cleanId.includes('bottle')) return CATALOG.find(p => p.category === 'bottles') || CATALOG[0];
      if (cleanId.includes('lanyard')) return CATALOG.find(p => p.category === 'lanyards') || CATALOG[0];
      if (cleanId.includes('reel')) return CATALOG.find(p => p.category === 'reels') || CATALOG[0];
      if (cleanId.includes('holder')) return CATALOG.find(p => p.category === 'holders') || CATALOG[0];
      if (cleanId.includes('card')) return CATALOG.find(p => p.category === 'cards') || CATALOG[0];
      if (cleanId.includes('suite') || cleanId.includes('merch')) return CATALOG.find(p => p.category === 'custom') || CATALOG[0];

      return CATALOG[0];
    },

    getProductsByCategory(cat) {
      if (!cat || cat === 'all') return CATALOG;
      return CATALOG.filter(p => p.category === cat);
    },

    searchCatalog(query) {
      if (!query) return [];
      const q = query.toLowerCase().trim();
      return CATALOG.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        (p.badge && p.badge.toLowerCase().includes(q))
      );
    },

    // ==========================================
    // CART METHODS
    // ==========================================
    getCart() {
      return getJSON(STORAGE_KEYS.CART, []);
    },

    addToCart(productOrId, optionsOrQty = {}, qtyOrOptions = 1) {
      let product = null;
      let options = {};
      let quantity = 1;

      // Normalize parameters
      if (typeof optionsOrQty === 'number') {
        quantity = optionsOrQty;
        options = typeof qtyOrOptions === 'object' ? (qtyOrOptions || {}) : {};
      } else if (typeof optionsOrQty === 'object') {
        options = optionsOrQty || {};
        quantity = typeof qtyOrOptions === 'number' ? qtyOrOptions : 1;
      }

      if (typeof productOrId === 'string') {
        product = this.getProductById(productOrId);
        if (!product) {
          product = {
            id: productOrId,
            name: productOrId.replace(/[-_]/g, ' ').toUpperCase(),
            price: 15.000,
            currency: 'KWD',
            image: CATALOG[0].image,
            link: 'shop.html'
          };
        }
      } else if (typeof productOrId === 'object' && productOrId !== null) {
        product = {
          id: productOrId.id || ('custom-' + Date.now()),
          name: productOrId.name || productOrId.title || 'Bespoke Atelier Commission',
          price: parseFloat(productOrId.price) || 0,
          currency: productOrId.currency || 'KWD',
          image: productOrId.image || (CATALOG[0] && CATALOG[0].image),
          link: productOrId.link || 'shop.html',
          options: productOrId.options ? { ...productOrId.options, ...options } : options
        };
        if (productOrId.options) {
          options = product.options;
        }
      }

      if (!product) return false;

      const cart = this.getCart();
      const existingIdx = cart.findIndex(item => 
        item.id === product.id && JSON.stringify(item.options || {}) === JSON.stringify(options || {})
      );

      if (existingIdx > -1) {
        cart[existingIdx].quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          currency: product.currency || 'KWD',
          image: product.image,
          link: product.link || 'shop.html',
          options: options,
          quantity: quantity
        });
      }

      setJSON(STORAGE_KEYS.CART, cart);
      trigger('cart_updated', { cart, count: this.getCartCount(), subtotal: this.getCartSubtotal() });
      return true;
    },

    addItem(productOrId, optionsOrQty = {}, qtyOrOptions = 1) {
      return this.addToCart(productOrId, optionsOrQty, qtyOrOptions);
    },

    updateCartQuantity(index, quantity) {
      const cart = this.getCart();
      if (index >= 0 && index < cart.length) {
        if (quantity <= 0) {
          cart.splice(index, 1);
        } else {
          cart[index].quantity = quantity;
        }
        setJSON(STORAGE_KEYS.CART, cart);
        trigger('cart_updated', { cart, count: this.getCartCount(), subtotal: this.getCartSubtotal() });
      }
    },

    removeFromCart(index) {
      const cart = this.getCart();
      if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        setJSON(STORAGE_KEYS.CART, cart);
        trigger('cart_updated', { cart, count: this.getCartCount(), subtotal: this.getCartSubtotal() });
      }
    },

    clearCart() {
      setJSON(STORAGE_KEYS.CART, []);
      trigger('cart_updated', { cart: [], count: 0, subtotal: 0 });
    },

    getCartCount() {
      const cart = this.getCart();
      return cart.reduce((total, item) => total + (item.quantity || 1), 0);
    },

    getCartSubtotal() {
      const cart = this.getCart();
      return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    },

    // ==========================================
    // COUPON & PRICING
    // ==========================================
    applyCoupon(code) {
      if (!code) return { success: false, message: 'Please enter a promo code.' };
      const c = code.trim().toUpperCase();
      if (c === 'VIP10' || c === 'IDCRAFT10' || c === 'WELCOME10') {
        setJSON(STORAGE_KEYS.COUPON, { code: c, discountRate: 0.10, label: '10% Client Privilege' });
        trigger('coupon_applied', this.getActiveCoupon());
        return { success: true, message: '10% Client Privilege Applied!' };
      }
      if (c === 'KUWAIT15' || c === 'CORPORATE15') {
        setJSON(STORAGE_KEYS.COUPON, { code: c, discountRate: 0.15, label: '15% Volume Privilege' });
        trigger('coupon_applied', this.getActiveCoupon());
        return { success: true, message: '15% Volume Privilege Applied!' };
      }
      return { success: false, message: 'Invalid or expired code.' };
    },

    getActiveCoupon() {
      return getJSON(STORAGE_KEYS.COUPON, null);
    },

    removeCoupon() {
      localStorage.removeItem(STORAGE_KEYS.COUPON);
      trigger('coupon_applied', null);
    },

    getCalculatedTotals() {
      const subtotal = this.getCartSubtotal();
      const coupon = this.getActiveCoupon();
      const discount = coupon ? (subtotal * coupon.discountRate) : 0;
      // Free shipping in Kuwait over 30 KWD, otherwise 3 KWD
      const shipping = subtotal > 30 || subtotal === 0 ? 0.000 : 3.000;
      const total = Math.max(0, subtotal - discount + shipping);

      return {
        subtotal: subtotal.toFixed(3),
        discount: discount.toFixed(3),
        discountLabel: coupon ? coupon.label : null,
        couponCode: coupon ? coupon.code : null,
        shipping: shipping.toFixed(3),
        shippingLabel: shipping === 0 ? 'Complimentary Delivery' : 'Standard Courier (3.000 KWD)',
        total: total.toFixed(3)
      };
    },

    // ==========================================
    // WISHLIST METHODS
    // ==========================================
    getWishlist() {
      return getJSON(STORAGE_KEYS.WISHLIST, []);
    },

    toggleWishlist(productOrId) {
      let product = typeof productOrId === 'string' ? this.getProductById(productOrId) : productOrId;
      if (!product) return false;

      let wishlist = this.getWishlist();
      const idx = wishlist.findIndex(item => item.id === product.id);
      let isAdded = false;

      if (idx > -1) {
        wishlist.splice(idx, 1);
        isAdded = false;
      } else {
        wishlist.push(product);
        isAdded = true;
      }

      setJSON(STORAGE_KEYS.WISHLIST, wishlist);
      trigger('wishlist_updated', { wishlist, count: wishlist.length, isAdded, product });
      return isAdded;
    },

    isInWishlist(productId) {
      const wishlist = this.getWishlist();
      return wishlist.some(item => item.id === productId);
    },

    // ==========================================
    // AUTHENTICATION & USER PROFILE
    // ==========================================
    getCurrentUser() {
      const user = getJSON(STORAGE_KEYS.AUTH, null);
      if (!user) {
        // Default authenticated demo client
        setJSON(STORAGE_KEYS.AUTH, DEFAULT_USER);
        return DEFAULT_USER;
      }
      return user;
    },

    isAuthenticated() {
      return !!getJSON(STORAGE_KEYS.AUTH, null);
    },

    login(email, password) {
      const current = this.getCurrentUser() || DEFAULT_USER;
      const user = {
        ...current,
        email: email || current.email,
        loginTime: new Date().toISOString()
      };
      setJSON(STORAGE_KEYS.AUTH, user);
      trigger('auth_changed', { user, isAuthenticated: true });
      return { success: true, user };
    },

    register(data) {
      const name = data.fullName || 'Valued Client';
      const initial = name.trim().charAt(0).toUpperCase() || 'A';
      const user = {
        id: 'usr_' + Math.floor(1000 + Math.random() * 9000) + '_kwt',
        fullName: name,
        email: data.email || 'client@example.com',
        phone: data.phone || '+965 0000 0000',
        company: data.company || '',
        role: data.role || 'Client',
        tier: 'Registered Client',
        avatarInitial: initial,
        address: {
          fullName: name,
          phone: data.phone || '+965 0000 0000',
          country: 'Kuwait',
          city: data.city || 'Kuwait City',
          area: data.area || 'Capital',
          street: data.street || '',
          postalCode: data.postalCode || '13000',
          isDefault: true
        },
        registeredAt: new Date().toISOString()
      };
      setJSON(STORAGE_KEYS.AUTH, user);
      trigger('auth_changed', { user, isAuthenticated: true });
      return { success: true, user };
    },

    logout() {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
      trigger('auth_changed', { user: null, isAuthenticated: false });
    },

    updateUserProfile(updatedFields) {
      const current = this.getCurrentUser() || DEFAULT_USER;
      const merged = { ...current, ...updatedFields };
      if (merged.fullName) {
        merged.avatarInitial = merged.fullName.trim().charAt(0).toUpperCase() || 'A';
      }
      setJSON(STORAGE_KEYS.AUTH, merged);
      trigger('auth_changed', { user: merged, isAuthenticated: true });
      trigger('profile_updated', merged);
      return merged;
    },

    // ==========================================
    // ORDERS & TRACKING METHODS
    // ==========================================
    getOrders() {
      const orders = getJSON(STORAGE_KEYS.ORDERS, null);
      if (!orders) {
        const initial = getSeedOrders();
        setJSON(STORAGE_KEYS.ORDERS, initial);
        return initial;
      }
      return orders;
    },

    getOrderById(orderId) {
      if (!orderId) return null;
      const cleanId = orderId.trim().toUpperCase();
      const orders = this.getOrders();
      return orders.find(o => o.orderId.toUpperCase() === cleanId) || null;
    },

    createOrder(orderData) {
      const cart = this.getCart();
      if (cart.length === 0 && (!orderData.items || orderData.items.length === 0)) {
        return { success: false, message: 'Cart is empty.' };
      }

      const totals = this.getCalculatedTotals();
      const newOrderId = 'IDC-' + Math.floor(1000 + Math.random() * 9000);
      
      const newOrder = {
        orderId: newOrderId,
        date: new Date().toISOString(),
        status: 'ORDER RECEIVED',
        statusKey: 'order_received',
        statusLabel: 'Order Received',
        stageIndex: 0,
        items: orderData.items || [...cart],
        subtotal: parseFloat(totals.subtotal),
        discount: parseFloat(totals.discount),
        discountCode: totals.couponCode,
        shipping: parseFloat(totals.shipping),
        total: parseFloat(totals.total),
        currency: 'KWD',
        customer: orderData.customer || (this.getCurrentUser() ? {
          name: this.getCurrentUser().fullName,
          email: this.getCurrentUser().email,
          phone: this.getCurrentUser().phone,
          address: this.getCurrentUser().address
        } : {}),
        shippingAddress: orderData.shippingAddress || {},
        paymentMethod: orderData.paymentMethod || 'KNET Gateway (Kuwait)',
        trackingCode: 'IDC-TRK-' + Math.floor(1000 + Math.random() * 9000),
        estimatedDelivery: '3-5 Business Days'
      };

      const orders = this.getOrders();
      orders.unshift(newOrder);
      setJSON(STORAGE_KEYS.ORDERS, orders);

      // Clear cart & applied coupon after successful checkout
      this.clearCart();
      this.removeCoupon();

      trigger('order_created', newOrder);
      return { success: true, order: newOrder };
    },

    getRecentOrder() {
      const orders = this.getOrders();
      return orders.length > 0 ? orders[0] : null;
    },

    // ==========================================
    // CUSTOM ORDER REQUESTS
    // ==========================================
    getCustomRequests() {
      const reqs = getJSON(STORAGE_KEYS.CUSTOM_REQUESTS, null);
      if (!reqs) {
        const initial = getSeedCustomRequests();
        setJSON(STORAGE_KEYS.CUSTOM_REQUESTS, initial);
        return initial;
      }
      return reqs;
    },

    getCustomRequestById(refCode) {
      if (!refCode) return null;
      const cleanRef = refCode.trim().toUpperCase();
      const reqs = this.getCustomRequests();
      return reqs.find(r => r.refCode.toUpperCase() === cleanRef) || null;
    },

    addCustomRequest(data) {
      const refCode = 'CR-' + String(Math.floor(10 + Math.random() * 90)).padStart(3, '0');
      const requests = this.getCustomRequests();
      const newReq = {
        refCode: refCode,
        date: new Date().toISOString(),
        status: 'REQUEST RECEIVED',
        statusKey: 'request_received',
        ...data
      };
      requests.unshift(newReq);
      setJSON(STORAGE_KEYS.CUSTOM_REQUESTS, requests);
      trigger('custom_request_submitted', newReq);
      return newReq;
    },

    // ==========================================
    // SAVED DESIGNS
    // ==========================================
    getSavedDesigns() {
      const designs = getJSON(STORAGE_KEYS.SAVED_DESIGNS, null);
      if (!designs) {
        const initial = getSeedSavedDesigns();
        setJSON(STORAGE_KEYS.SAVED_DESIGNS, initial);
        return initial;
      }
      return designs;
    },

    deleteSavedDesign(id) {
      let list = this.getSavedDesigns();
      list = list.filter(d => d.id !== id);
      setJSON(STORAGE_KEYS.SAVED_DESIGNS, list);
      trigger('saved_designs_updated', list);
      return list;
    },

    addSavedDesign(design) {
      const list = this.getSavedDesigns();
      const newDesign = {
        id: 'des-' + Date.now().toString(36),
        dateSaved: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        ...design
      };
      list.unshift(newDesign);
      setJSON(STORAGE_KEYS.SAVED_DESIGNS, list);
      trigger('saved_designs_updated', list);
      return newDesign;
    },

    // ==========================================
    // ADDRESSES MANAGEMENT
    // ==========================================
    getAddresses() {
      const addrs = getJSON(STORAGE_KEYS.ADDRESSES, null);
      if (!addrs) {
        const initial = getSeedAddresses();
        setJSON(STORAGE_KEYS.ADDRESSES, initial);
        return initial;
      }
      return addrs;
    },

    addAddress(addressData) {
      const addresses = this.getAddresses();
      if (addressData.isDefault || addresses.length === 0) {
        addresses.forEach(a => a.isDefault = false);
        addressData.isDefault = true;
      }
      const newAddr = {
        id: 'addr-' + Date.now().toString(36),
        ...addressData
      };
      addresses.push(newAddr);
      setJSON(STORAGE_KEYS.ADDRESSES, addresses);
      trigger('addresses_updated', addresses);
      return newAddr;
    },

    updateAddress(id, addressData) {
      const addresses = this.getAddresses();
      const idx = addresses.findIndex(a => a.id === id);
      if (idx > -1) {
        if (addressData.isDefault) {
          addresses.forEach(a => a.isDefault = false);
        }
        addresses[idx] = { ...addresses[idx], ...addressData, id };
        setJSON(STORAGE_KEYS.ADDRESSES, addresses);
        trigger('addresses_updated', addresses);
        return addresses[idx];
      }
      return null;
    },

    deleteAddress(id) {
      let addresses = this.getAddresses();
      const toDelete = addresses.find(a => a.id === id);
      addresses = addresses.filter(a => a.id !== id);
      if (toDelete && toDelete.isDefault && addresses.length > 0) {
        addresses[0].isDefault = true;
      }
      setJSON(STORAGE_KEYS.ADDRESSES, addresses);
      trigger('addresses_updated', addresses);
      return addresses;
    },

    setDefaultAddress(id) {
      const addresses = this.getAddresses();
      addresses.forEach(a => a.isDefault = (a.id === id));
      setJSON(STORAGE_KEYS.ADDRESSES, addresses);
      trigger('addresses_updated', addresses);
      return addresses;
    },

    // ==========================================
    // SETTINGS
    // ==========================================
    getSettings() {
      return getJSON(STORAGE_KEYS.SETTINGS, {
        emailNotifications: true,
        orderUpdates: true,
        whatsappUpdates: true,
        language: 'EN'
      });
    },

    updateSettings(updated) {
      const current = this.getSettings();
      const merged = { ...current, ...updated };
      setJSON(STORAGE_KEYS.SETTINGS, merged);
      trigger('settings_updated', merged);
      return merged;
    },

    // ==========================================
    // LANGUAGE SETTINGS
    // ==========================================
    getLanguage() {
      return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'EN';
    },

    setLanguage(lang) {
      const l = lang === 'AR' ? 'AR' : 'EN';
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, l);
      trigger('language_changed', l);
      return l;
    },

    // ==========================================
    // EVENT SUBSCRIPTION
    // ==========================================
    subscribe(event, callback) {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(callback);
      return () => {
        listeners[event] = listeners[event].filter(fn => fn !== callback);
      };
    }
  };

  // Attach to global window with legacy & modern aliases
  window.IDCraftState = IDCraftState;
  window.IDState = IDCraftState;
  window.State = IDCraftState;

  // Helper namespaces for full backward compatibility across all templates
  IDCraftState.cart = {
    addItem: (item, qty, options) => IDCraftState.addToCart(item, options, qty),
    getItems: () => IDCraftState.getCart(),
    clear: () => IDCraftState.clearCart(),
    updateQuantity: (index, qty) => IDCraftState.updateCartQuantity(index, qty),
    remove: (index) => IDCraftState.removeFromCart(index),
    getCount: () => IDCraftState.getCartCount(),
    getSubtotal: () => IDCraftState.getCartSubtotal()
  };

  IDCraftState.orders = {
    create: (payload) => IDCraftState.createOrder(payload),
    getById: (id) => IDCraftState.getOrder(id),
    getAll: () => IDCraftState.getOrders()
  };

  IDCraftState.rfq = {
    submit: (payload) => {
      const quotes = getJSON(STORAGE_KEYS.CORPORATE_QUOTES, []);
      quotes.unshift({ id: 'RFQ-' + Date.now().toString(36).toUpperCase(), ...payload, date: new Date().toISOString() });
      setJSON(STORAGE_KEYS.CORPORATE_QUOTES, quotes);
      trigger('rfq_submitted', payload);
      return payload;
    }
  };

  IDCraftState.formatKWD = (amount) => (parseFloat(amount) || 0).toFixed(3) + ' KWD';

})(window);
