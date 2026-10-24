/**
 * ID CRAFTS LUXURY ATELIER — SHARED TAILWIND CONFIGURATION
 * Sourced from a single file to ensure design consistency across all pages.
 * Include BEFORE any page-level Tailwind config script.
 */
(function() {
  'use strict';

  const IDCRAFT_THEME = {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          "on-tertiary-fixed-variant": "#5d4201",
          "surface-bright": "#38393b",
          "on-secondary-fixed": "#1d1c16",
          "on-tertiary": "#412d00",
          "surface-container-lowest": "#0d0e10",
          "inverse-on-surface": "#303033",
          "outline": "#99907c",
          "surface-container-high": "#292a2c",
          "on-primary-container": "#554300",
          "on-error-container": "#ffdad6",
          "primary-fixed-dim": "#e9c349",
          "on-surface-variant": "#d0c5af",
          "secondary-fixed-dim": "#cac6bd",
          "tertiary": "#f1c97d",
          "primary": "#f2ca50",
          "surface-container-low": "#1b1c1e",
          "on-secondary-fixed-variant": "#494740",
          "surface-container": "#1f2022",
          "on-secondary": "#32302a",
          "on-primary": "#3c2f00",
          "on-primary-fixed-variant": "#574500",
          "surface-tint": "#e9c349",
          "error-container": "#93000a",
          "outline-variant": "#4d4635",
          "on-error": "#690005",
          "surface-container-highest": "#343537",
          "on-secondary-container": "#b9b5ac",
          "secondary": "#cac6bd",
          "surface-variant": "#343537",
          "inverse-primary": "#735c00",
          "on-surface": "#e3e2e5",
          "background": "#121315",
          "on-background": "#e3e2e5",
          "surface": "#121315",
          "on-tertiary-fixed": "#261900",
          "surface-dim": "#121315",
          "secondary-container": "#494740",
          "inverse-surface": "#e3e2e5",
          "on-tertiary-container": "#5b4000",
          "primary-fixed": "#ffe088",
          "on-primary-fixed": "#241a00",
          "secondary-fixed": "#e7e2d9",
          "tertiary-fixed": "#ffdea5",
          "tertiary-container": "#d3ad65",
          "tertiary-fixed-dim": "#e9c176",
          "primary-container": "#d4af37",
          "error": "#ffb4ab"
        },
        borderRadius: {
          DEFAULT: "0.125rem",
          lg: "0.25rem",
          xl: "0.5rem",
          full: "0.75rem"
        },
        spacing: {
          "space-xl": "4rem",
          "margin": "1.25rem",
          "space-xs": "0.375rem",
          "space-sm": "0.75rem",
          "space-lg": "2.25rem",
          "margin-tablet": "2.5rem",
          "gutter-desktop": "3rem",
          "margin-desktop": "5rem",
          "gutter": "1.5rem",
          "gutter-tablet": "2rem",
          "space-md": "1.25rem"
        },
        fontFamily: {
          "headline-md": ["Syne"],
          "label-mono-spec": ["Plus Jakarta Sans"],
          "label-action": ["Syne"],
          "headline-sm": ["Syne"],
          "body-md": ["Plus Jakarta Sans"],
          "display-hero-mobile": ["Syne"],
          "body-lg": ["Plus Jakarta Sans"],
          "label-eyebrow": ["Syne"],
          "headline-xl": ["Syne"],
          "display-hero": ["Syne"],
          "headline-lg": ["Syne"],
          "body-sm": ["Plus Jakarta Sans"],
          "body-xl": ["Plus Jakarta Sans"],
          "headline-xl-mobile": ["Syne"]
        },
        fontSize: {
          "headline-md": ["1.5rem", { lineHeight: "1.3", letterSpacing: "0em", fontWeight: "500" }],
          "label-mono-spec": ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.08em", fontWeight: "500" }],
          "label-action": ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.14em", fontWeight: "600" }],
          "headline-sm": ["1.125rem", { lineHeight: "1.4", letterSpacing: "0.02em", fontWeight: "600" }],
          "body-md": ["0.875rem", { lineHeight: "1.6", letterSpacing: "0.01em", fontWeight: "400" }],
          "display-hero-mobile": ["2.5rem", { lineHeight: "1.12", letterSpacing: "-0.02em", fontWeight: "700" }],
          "body-lg": ["1rem", { lineHeight: "1.65", letterSpacing: "0em", fontWeight: "400" }],
          "label-eyebrow": ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.22em", fontWeight: "700" }],
          "headline-xl": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
          "display-hero": ["4.5rem", { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "700" }],
          "headline-lg": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" }],
          "body-sm": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.02em", fontWeight: "400" }],
          "body-xl": ["1.25rem", { lineHeight: "1.6", letterSpacing: "-0.01em", fontWeight: "300" }],
          "headline-xl-mobile": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }]
        }
      }
    }
  };

  // Apply config when Tailwind is ready
  if (typeof tailwind !== 'undefined') {
    tailwind.config = IDCRAFT_THEME;
  } else {
    // Tailwind CDN not yet loaded — set a global that the config script can pick up
    window.__IDCRAFT_TW_CONFIG__ = IDCRAFT_THEME;
  }
})();
