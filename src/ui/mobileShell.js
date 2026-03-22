import './mobileShell.css';
import {
  MOBILE_MENU_LINKS,
  MOBILE_BOTTOM_NAV,
  MOBILE_SOCIALS,
  MOBILE_SHELL_DEFAULTS
} from './mobileShell.config.js';

const MOBILE_SHELL_INSTANCE_KEY = '__fourteenMobileShellInstance__';

function ensureTarget(target) {
  if (!target) return document.body;

  if (typeof target === 'string') {
    const element = document.querySelector(target);

    if (!element) {
      throw new Error(`createMobileShell: target "${target}" not found`);
    }

    return element;
  }

  if (target instanceof HTMLElement) {
    return target;
  }

  return document.body;
}

function createElement(tag, className, html = '') {
  const node = document.createElement(tag);

  if (className) {
    node.className = className;
  }

  if (html) {
    node.innerHTML = html;
  }

  return node;
}

function nlToBr(value = '') {
  return String(value).replace(/\n/g, '<br>');
}

function lockBodyScroll() {
  document.documentElement.classList.add('mobile-shell-lock');
  document.body.classList.add('mobile-shell-lock');
}

function unlockBodyScroll() {
  document.documentElement.classList.remove('mobile-shell-lock');
  document.body.classList.remove('mobile-shell-lock');
}

function normalizeUrl(input = '') {
  try {
    const url = new URL(input, window.location.origin);
    return `${url.origin}${url.pathname}`.replace(/\/+$/, '') || url.origin;
  } catch {
    return String(input).replace(/\/+$/, '');
  }
}

function getCurrentComparableUrl() {
  return normalizeUrl(window.location.href);
}

function isActiveHref(href = '') {
  const current = getCurrentComparableUrl();

  if (href.startsWith('tel:') || href.startsWith('mailto:')) {
    return false;
  }

  return normalizeUrl(href) === current;
}

function isExternalHttpLink(href = '') {
  return /^https?:\/\//i.test(href);
}

function shouldOpenInNewTab(href = '') {
  if (href.startsWith('tel:') || href.startsWith('mailto:')) {
    return false;
  }

  try {
    const url = new URL(href, window.location.origin);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function buildMenuLinks(items = []) {
  const nav = createElement('nav', 'ms-menu-nav');
  nav.setAttribute('aria-label', 'Mobile menu');

  items.forEach((item) => {
    const a = document.createElement('a');
    a.className = 'ms-menu-link';
    a.href = item.href || '#';
    a.textContent = item.label || 'link';
    a.dataset.id = item.id || '';

    if (isActiveHref(item.href || '')) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }

    if (shouldOpenInNewTab(item.href || '')) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    nav.appendChild(a);
  });

  return nav;
}

function buildSocialMenu(items = []) {
  const nav = createElement('nav', 'ms-social-menu-nav');
  nav.setAttribute('aria-label', 'Social links');

  items.forEach((item) => {
    const a = document.createElement('a');
    a.className = 'ms-social-menu-link';
    a.href = item.href || '#';
    a.dataset.id = item.id || '';
    a.setAttribute('aria-label', item.alt || item.shortName || item.id || 'social');

    if (isActiveHref(item.href || '')) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }

    if (isExternalHttpLink(item.href || '')) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    a.innerHTML = `
      <span class="ms-social-menu-link-icon-wrap">
        <img
          class="ms-social-menu-link-icon"
          src="${item.icon || ''}"
          alt="${item.alt || item.shortName || item.id || 'social'}"
        >
      </span>
      <span class="ms-social-menu-link-label">${item.shortName || item.alt || item.id || 'social'}</span>
    `;

    nav.appendChild(a);
  });

  return nav;
}

function buildBottomNav(items = []) {
  const wrap = createElement('div', 'ms-bottom-nav-list');

  items.forEach((item) => {
    const a = document.createElement('a');
    a.className = 'ms-bottom-link';
    a.href = item.href || '#';
    a.dataset.id = item.id || '';

    if (isActiveHref(item.href || '')) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }

    if (shouldOpenInNewTab(item.href || '')) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    a.innerHTML = `
      <span class="ms-bottom-link-icon-wrap">
        <img class="ms-bottom-link-icon" src="${item.icon || ''}" alt="${item.label || ''}">
      </span>
      <span class="ms-bottom-link-label">${nlToBr(item.label || '')}</span>
    `;

    wrap.appendChild(a);
  });

  return wrap;
}

function buildRotatingSocialButton() {
  const button = createElement('button', 'ms-social-toggle');
  button.type = 'button';
  button.setAttribute('aria-label', 'Open social links');

  const circle = createElement('span', 'ms-social-toggle-circle');
  const icon = document.createElement('img');
  icon.className = 'ms-social-toggle-icon';
  icon.alt = 'Social';

  circle.appendChild(icon);
  button.appendChild(circle);

  return { button, icon };
}

export function createMobileShell(options = {}) {
  const target = ensureTarget(options.target);

  if (target[MOBILE_SHELL_INSTANCE_KEY] && typeof target[MOBILE_SHELL_INSTANCE_KEY].destroy === 'function') {
    target[MOBILE_SHELL_INSTANCE_KEY].destroy();
  }

  const menuItems = options.menuItems || MOBILE_MENU_LINKS;
  const bottomNavItems = options.bottomNavItems || MOBILE_BOTTOM_NAV;
  const socials = options.socials || MOBILE_SOCIALS;
  const brandText = options.brandText || MOBILE_SHELL_DEFAULTS.brandText;
  const connectText = options.connectText || MOBILE_SHELL_DEFAULTS.connectText;
  const socialRotateMs =
    Number(options.socialRotateMs || MOBILE_SHELL_DEFAULTS.socialRotateMs) || 1500;

  const root = createElement('div', 'mobile-shell');
  root.innerHTML = `
    <div class="ms-overlay"></div>

    <header class="ms-topbar">
      <button class="ms-burger" type="button" aria-label="Open menu" aria-expanded="false">
        <span class="ms-burger-line"></span>
        <span class="ms-burger-line"></span>
        <span class="ms-burger-line"></span>
      </button>

      <div class="ms-brand">${brandText}</div>

      <div class="ms-top-actions"></div>
    </header>

    <aside class="ms-menu-panel" aria-hidden="true">
      <div class="ms-menu-inner">
        <div class="ms-menu-header">menu</div>
      </div>
    </aside>

    <aside class="ms-social-panel" aria-hidden="true">
      <div class="ms-social-panel-inner">
        <div class="ms-menu-header">socials</div>
      </div>
    </aside>

    <div class="ms-connect-fab-wrap">
      <button class="ms-connect-fab" type="button" aria-label="${connectText}">
        <span class="ms-connect-fab-core">
          <span class="ms-connect-fab-text">${connectText}</span>
        </span>
      </button>
    </div>

    <nav class="ms-bottombar" aria-label="Bottom navigation"></nav>
  `;

  const overlay = root.querySelector('.ms-overlay');
  const burger = root.querySelector('.ms-burger');
  const topActions = root.querySelector('.ms-top-actions');
  const menuPanel = root.querySelector('.ms-menu-panel');
  const socialPanel = root.querySelector('.ms-social-panel');
  const menuInner = root.querySelector('.ms-menu-inner');
  const socialPanelInner = root.querySelector('.ms-social-panel-inner');
  const connectFab = root.querySelector('.ms-connect-fab');
  const bottomBar = root.querySelector('.ms-bottombar');

  const menuLinks = buildMenuLinks(menuItems);
  const socialMenuLinks = buildSocialMenu(socials);
  const bottomNav = buildBottomNav(bottomNavItems);
  const rotatingSocialButton = buildRotatingSocialButton();

  menuInner.appendChild(menuLinks);
  socialPanelInner.appendChild(socialMenuLinks);
  bottomBar.appendChild(bottomNav);
  topActions.appendChild(rotatingSocialButton.button);

  const cleanups = [];
  let isDestroyed = false;
  let activePanel = null;
  let socialIndex = 0;
  let socialTimer = null;

  function registerCleanup(fn) {
    cleanups.push(fn);
  }

  function on(node, eventName, handler, optionsValue) {
    node.addEventListener(eventName, handler, optionsValue);
    registerCleanup(() => {
      node.removeEventListener(eventName, handler, optionsValue);
    });
  }

  function updateRotatingSocialIcon() {
    if (!socials.length) return;

    const current = socials[socialIndex % socials.length];
    rotatingSocialButton.icon.src = current.icon || '';
    rotatingSocialButton.icon.alt = current.alt || current.shortName || 'Social';
  }

  function stopSocialRotation() {
    if (socialTimer) {
      window.clearInterval(socialTimer);
      socialTimer = null;
    }
  }

  function startSocialRotation() {
    stopSocialRotation();

    if (!socials.length) return;

    updateRotatingSocialIcon();

    socialTimer = window.setInterval(() => {
      socialIndex = (socialIndex + 1) % socials.length;
      updateRotatingSocialIcon();
    }, socialRotateMs);
  }

  function setPanelState(panelName) {
    activePanel = panelName;

    const menuOpen = panelName === 'menu';
    const socialOpen = panelName === 'social';

    root.classList.toggle('is-open', Boolean(panelName));
    root.classList.toggle('is-menu-open', menuOpen);
    root.classList.toggle('is-social-open', socialOpen);

    burger.setAttribute('aria-expanded', menuOpen ? 'true' : 'false');
    menuPanel.setAttribute('aria-hidden', menuOpen ? 'false' : 'true');
    socialPanel.setAttribute('aria-hidden', socialOpen ? 'false' : 'true');

    if (panelName) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }
  }

  function openMenu() {
    setPanelState('menu');
  }

  function openSocialMenu() {
    setPanelState('social');
  }

  function closePanels() {
    setPanelState(null);
  }

  function toggleMenu() {
    if (activePanel === 'menu') {
      closePanels();
      return;
    }

    openMenu();
  }

  function toggleSocialMenu() {
    if (activePanel === 'social') {
      closePanels();
      return;
    }

    openSocialMenu();
  }

  function handleKeydown(event) {
    if (event.key === 'Escape' && activePanel) {
      closePanels();
    }
  }

  on(burger, 'click', toggleMenu);
  on(rotatingSocialButton.button, 'click', toggleSocialMenu);
  on(overlay, 'click', closePanels);
  on(document, 'keydown', handleKeydown);

  menuLinks.querySelectorAll('a').forEach((link) => {
    on(link, 'click', closePanels);
  });

  socialMenuLinks.querySelectorAll('a').forEach((link) => {
    on(link, 'click', closePanels);
  });

  if (typeof options.onConnectClick === 'function') {
    on(connectFab, 'click', options.onConnectClick);
  }

  target.innerHTML = '';
  target.appendChild(root);
  startSocialRotation();

  const instance = {
    root,
    openMenu,
    openSocialMenu,
    close: closePanels,
    destroy() {
      if (isDestroyed) return;
      isDestroyed = true;

      stopSocialRotation();
      closePanels();

      cleanups.forEach((cleanup) => {
        try {
          cleanup();
        } catch (_) {}
      });

      cleanups.length = 0;

      if (target[MOBILE_SHELL_INSTANCE_KEY] === instance) {
        target[MOBILE_SHELL_INSTANCE_KEY] = null;
      }

      if (root.parentNode) {
        root.parentNode.removeChild(root);
      }

      unlockBodyScroll();
    }
  };

  target[MOBILE_SHELL_INSTANCE_KEY] = instance;

  return instance;
}
