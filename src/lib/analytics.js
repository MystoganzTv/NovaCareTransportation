const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim();
const SEARCH_CONSOLE_TOKEN = (
  import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || ''
).trim();

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function injectSearchConsoleMeta() {
  if (!isBrowser() || !SEARCH_CONSOLE_TOKEN) {
    return;
  }

  const existing = document.querySelector(
    'meta[name="google-site-verification"]'
  );
  if (existing) {
    return;
  }

  const meta = document.createElement('meta');
  meta.name = 'google-site-verification';
  meta.content = SEARCH_CONSOLE_TOKEN;
  document.head.appendChild(meta);
}

function ensureGtagScript() {
  if (!isBrowser() || !GA_MEASUREMENT_ID) {
    return false;
  }

  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  if (!window.gtag) {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }

  if (window.__NOVACARE_GA_SCRIPT__) {
    return true;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  window.__NOVACARE_GA_SCRIPT__ = true;
  return true;
}

export function initAnalytics() {
  if (!isBrowser()) {
    return;
  }

  injectSearchConsoleMeta();

  if (!ensureGtagScript() || window.__NOVACARE_GA_INIT__) {
    return;
  }

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });
  window.__NOVACARE_GA_INIT__ = true;
}

export function trackPageView(path) {
  if (!isBrowser() || !GA_MEASUREMENT_ID || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href,
  });
}

export function trackLeadFormSubmission(formType, requestId) {
  if (!isBrowser() || !GA_MEASUREMENT_ID || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'generate_lead', {
    form_type: formType,
    request_id: requestId,
  });
}

