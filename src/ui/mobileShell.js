// src/ui/mobileShell.js

import './mobileShell.css';
import {
  MOBILE_MENU_LINKS,
  MOBILE_BOTTOM_NAV,
  MOBILE_SOCIALS,
  MOBILE_SHELL_DEFAULTS
} from './mobileShell.config.js';

function ensureTarget(target) {
  if (target instanceof HTMLElement) return target;
  return document.body;
}

function createElement(tag, className, html = '') {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html) node.innerHTML = html;
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

function isExternalLink(href = '') {
  return /^https?:\/\//i.test(href);
}

function buildMenuLinks(items = []) {
  const nav = createElement('nav', 'ms-menu-nav');
  nav.setAttribute('aria-label', 'Mobile menu');

  items.forEach((item) => {
    const a = document.createElement('a');
    a.className = 'ms-menu-link';
    a.href = item.href || '#';
    a.textContent = item.label || 'link';

    if (isExternalLink(item.href)) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

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

    if (isExternalLink(item.href)) {
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

function buildSocials(items = []) {
  const wrap = createElement('div', 'ms-socials');
  const track = createElement('div', 'ms-socials-track');
  wrap.appendChild(track);

  items.forEach((item, index) => {
    const a = document.createElement('a');
    a.className = 'ms-social-link';
    a.href = item.href || '#';
    a.setAttribute('aria-label', item.alt || item.id || `social-${index}`);
    a.dataset.index = String(index);

    if (isExternalLink(item.href)) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    a.innerHTML = `
      <span class="ms-social-circle">
        <img class="ms-social-icon" src="${item.icon || ''}" alt="${item.alt || item.id || 'social'}">
      </span>
    `;

    track.appendChild(a);
  });

  return { wrap, track };
}

export function createMobileShell(options = {}) {
  const target = ensureTarget(options.target);
  const menuItems = options.menuItems || MOBILE_MENU_LINKS;
  const bottomNavItems = options.bottomNavItems || MOBILE_BOTTOM_NAV;
  const socials = options.socials || MOBILE_SOCIALS;
  const brandText = options.brandText || MOBILE_SHELL_DEFAULTS.brandText;
  const connectText = options.connectText || MOBILE_SHELL_DEFAULTS.connectText;
  const socialRotateMs =
    Number(options.socialRotateMs || MOBILE_SHELL_DEFAULTS.socialRotateMs) || 1500;

  const root = createElement('div', 'mobile-shell');
  root.innerHTML = `
    <div class="ms-overlay" data-open="false"></div>

    <header class="ms-topbar">
      <button class="ms-burger" type="button" aria-label="Open menu" aria-expanded="false">
        <span class="ms-burger-line"></span>
        <span class="ms-burger-line"></span>
        <span class="ms-burger-line"></span>
      </button>

      <div class="ms-brand">${brandText}</div>

      <button class="ms-top-action" type="button" aria-label="${connectText}">
        ${connectText}
      </button>
    </header>

    <aside class="ms-menu-panel" aria-hidden="true">
      <div class="ms-menu-inner">
        <div class="ms-menu-header">menu</div>
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
  const menuPanel = root.querySelector('.ms-menu-panel');
  const menuInner = root.querySelector('.ms-menu-inner');
  const topAction = root.querySelector('.ms-top-action');
  const connectFab = root.querySelector('.ms-connect-fab');
  const bottomBar = root.querySelector('.ms-bottombar');

  const menuLinks = buildMenuLinks(menuItems);
  const bottomNav = buildBottomNav(bottomNavItems);
  const { wrap: socialsWrap, track: socialsTrack } = buildSocials(socials);

  menuInner.appendChild(menuLinks);
  menuInner.appendChild(socialsWrap);
  bottomBar.appendChild(bottomNav);

  let isOpen = false;
  let socialIndex = 0;
  let socialTimer = null;

  const socialNodes = Array.from(socialsTrack.querySelectorAll('.ms-social-link'));

  function renderSocialRotation() {
    socialNodes.forEach((node, index) => {
      node.classList.toggle('is-active', index === socialIndex);
    });
  }

  function startSocialRotation() {
    stopSocialRotation();

    if (!socialNodes.length) return;

    renderSocialRotation();

    socialTimer = window.setInterval(() => {
      socialIndex = (socialIndex + 1) % socialNodes.length;
      renderSocialRotation();
    }, socialRotateMs);
  }

  function stopSocialRotation() {
    if (socialTimer) {
      window.clearInterval(socialTimer);
      socialTimer = null;
    }
  }

  function openMenu() {
    isOpen = true;
    root.classList.add('is-open');
    overlay.dataset.open = 'true';
    burger.setAttribute('aria-expanded', 'true');
    menuPanel.setAttribute('aria-hidden', 'false');
    lockBodyScroll();
  }

  function closeMenu() {
    isOpen = false;
    root.classList.remove('is-open');
    overlay.dataset.open = 'false';
    burger.setAttribute('aria-expanded', 'false');
    menuPanel.setAttribute('aria-hidden', 'true');
    unlockBodyScroll();
  }

  function toggleMenu() {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  burger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  menuLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });

  if (typeof options.onConnectClick === 'function') {
    topAction.addEventListener('click', options.onConnectClick);
    connectFab.addEventListener('click', options.onConnectClick);
  }

  if (typeof options.onMenuOpen === 'function') {
    burger.addEventListener('click', () => {
      if (!isOpen) return;
      options.onMenuOpen();
    });
  }

  if (typeof options.onMenuClose === 'function') {
    overlay.addEventListener('click', options.onMenuClose);
  }

  target.appendChild(root);
  startSocialRotation();

  return {
    root,
    open: openMenu,
    close: closeMenu,
    toggle: toggleMenu,
    destroy() {
      stopSocialRotation();
      unlockBodyScroll();
      root.remove();
    }
  };
}
