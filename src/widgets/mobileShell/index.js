// src/widgets/mobileShell/index.js

import '../../ui/mobileShell.css';
import {
  MOBILE_MENU_LINKS,
  MOBILE_BOTTOM_NAV,
  MOBILE_SOCIALS,
  MOBILE_SHELL_DEFAULTS
} from '../../ui/mobileShell.config.js';

function resolveTarget(target) {
  if (!target) return document.body;

  if (typeof target === 'string') {
    const el = document.querySelector(target);
    if (!el) {
      throw new Error(`mountMobileShell: target "${target}" not found`);
    }
    return el;
  }

  if (target instanceof HTMLElement) return target;

  return document.body;
}

function createEl(tag, className, html = '') {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (html) el.innerHTML = html;
  return el;
}

function nlToBr(str = '') {
  return String(str).replace(/\n/g, '<br>');
}

function lockScroll() {
  document.documentElement.classList.add('mobile-shell-lock');
  document.body.classList.add('mobile-shell-lock');
}

function unlockScroll() {
  document.documentElement.classList.remove('mobile-shell-lock');
  document.body.classList.remove('mobile-shell-lock');
}

function normalizeUrl(url = '') {
  try {
    const u = new URL(url, window.location.origin);
    return `${u.origin}${u.pathname}`.replace(/\/+$/, '');
  } catch {
    return url;
  }
}

function isActive(href) {
  if (!href || href.startsWith('tel:') || href.startsWith('mailto:')) return false;
  return normalizeUrl(href) === normalizeUrl(window.location.href);
}

function shouldBlank(href) {
  if (!href) return false;
  if (href.startsWith('tel:') || href.startsWith('mailto:')) return false;

  try {
    const u = new URL(href, window.location.origin);
    return u.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function buildMenu(items, close) {
  const nav = createEl('div', 'ms-menu-nav');

  items.forEach(item => {
    const a = createEl('a', 'ms-menu-link');
    a.href = item.href || '#';
    a.textContent = item.label || '';

    if (isActive(item.href)) {
      a.classList.add('is-active');
    }

    if (shouldBlank(item.href)) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    a.addEventListener('click', close);

    nav.appendChild(a);
  });

  return nav;
}

function buildSocialMenu(items, close) {
  const nav = createEl('div', 'ms-social-menu-nav');

  items.forEach(item => {
    const a = createEl('a', 'ms-social-menu-link');
    a.href = item.href || '#';

    if (shouldBlank(item.href)) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    a.innerHTML = `
      <span class="ms-social-menu-link-icon-wrap">
        <img src="${item.icon}" class="ms-social-menu-link-icon">
      </span>
      <span class="ms-social-menu-link-label">
        ${item.shortName || item.alt || item.id}
      </span>
    `;

    a.addEventListener('click', close);

    nav.appendChild(a);
  });

  return nav;
}

function buildBottom(items) {
  const wrap = createEl('div', 'ms-bottom-nav-list');

  items.forEach(item => {
    const a = createEl('a', 'ms-bottom-link');
    a.href = item.href || '#';

    if (isActive(item.href)) {
      a.classList.add('is-active');
    }

    if (shouldBlank(item.href)) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    a.innerHTML = `
      <span class="ms-bottom-link-icon-wrap">
        <img src="${item.icon}" class="ms-bottom-link-icon">
      </span>
      <span class="ms-bottom-link-label">${nlToBr(item.label)}</span>
    `;

    wrap.appendChild(a);
  });

  return wrap;
}

export function mountMobileShell(options = {}) {
  const target = resolveTarget(options.target);

  const menuItems = options.menuItems || MOBILE_MENU_LINKS;
  const bottomItems = options.bottomNavItems || MOBILE_BOTTOM_NAV;
  const socials = options.socials || MOBILE_SOCIALS;
  const brand = options.brandText || MOBILE_SHELL_DEFAULTS.brandText;
  const connectText = options.connectText || MOBILE_SHELL_DEFAULTS.connectText;
  const rotateMs = options.socialRotateMs || 1500;

  target.innerHTML = '';

  const root = createEl('div', 'mobile-shell');

  root.innerHTML = `
    <div class="ms-overlay"></div>

    <div class="ms-topbar">
      <button class="ms-burger">
        <span class="ms-burger-line"></span>
        <span class="ms-burger-line"></span>
        <span class="ms-burger-line"></span>
      </button>

      <div class="ms-brand">${brand}</div>

      <button class="ms-social-toggle">
        <span class="ms-social-toggle-circle">
          <img class="ms-social-toggle-icon">
        </span>
      </button>
    </div>

    <div class="ms-menu-panel">
      <div class="ms-menu-inner">
        <div class="ms-menu-header">menu</div>
      </div>
    </div>

    <div class="ms-social-panel">
      <div class="ms-social-panel-inner">
        <div class="ms-menu-header">socials</div>
      </div>
    </div>

    <div class="ms-connect-fab-wrap">
      <button class="ms-connect-fab">
        <span class="ms-connect-fab-core">
          <span class="ms-connect-fab-text">${connectText}</span>
        </span>
      </button>
    </div>

    <div class="ms-bottombar"></div>
  `;

  const overlay = root.querySelector('.ms-overlay');
  const burger = root.querySelector('.ms-burger');
  const socialBtn = root.querySelector('.ms-social-toggle');
  const socialIcon = root.querySelector('.ms-social-toggle-icon');
  const menuPanel = root.querySelector('.ms-menu-panel');
  const socialPanel = root.querySelector('.ms-social-panel');
  const menuInner = root.querySelector('.ms-menu-inner');
  const socialInner = root.querySelector('.ms-social-panel-inner');
  const bottomBar = root.querySelector('.ms-bottombar');

  let active = null;
  let i = 0;
  let timer = null;

  function setPanel(type) {
    active = type;

    root.classList.toggle('is-open', !!type);
    root.classList.toggle('is-menu-open', type === 'menu');
    root.classList.toggle('is-social-open', type === 'social');

    if (type) lockScroll();
    else unlockScroll();
  }

  function close() {
    setPanel(null);
  }

  function toggleMenu() {
    setPanel(active === 'menu' ? null : 'menu');
  }

  function toggleSocial() {
    setPanel(active === 'social' ? null : 'social');
  }

  burger.onclick = toggleMenu;
  socialBtn.onclick = toggleSocial;
  overlay.onclick = close;

  menuInner.appendChild(buildMenu(menuItems, close));
  socialInner.appendChild(buildSocialMenu(socials, close));
  bottomBar.appendChild(buildBottom(bottomItems));

  function rotate() {
    if (!socials.length) return;
    const s = socials[i % socials.length];
    socialIcon.src = s.icon;
    i++;
  }

  rotate();
  timer = setInterval(rotate, rotateMs);

  target.appendChild(root);

  return {
    destroy() {
      clearInterval(timer);
      root.remove();
      unlockScroll();
    }
  };
}
