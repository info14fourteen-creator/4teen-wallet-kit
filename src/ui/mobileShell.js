// src/ui/mobileShell.js

import './mobileShell.css';
import { mountWalletButton } from './walletButton.js';
import {
  MOBILE_MENU_LINKS,
  MOBILE_MENU_MATRIX,
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

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
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
    const pathname = url.pathname.replace(/\/+$/, '') || '/';
    return `${url.origin}${pathname}${url.hash || ''}`;
  } catch {
    return String(input).replace(/\/+$/, '');
  }
}

function normalizeUrlWithoutHash(input = '') {
  try {
    const url = new URL(input, window.location.origin);
    const pathname = url.pathname.replace(/\/+$/, '') || '/';
    return `${url.origin}${pathname}`;
  } catch {
    return String(input).replace(/\/+$/, '');
  }
}

function getCurrentComparableUrl() {
  return normalizeUrl(window.location.href);
}

function getCurrentComparableUrlWithoutHash() {
  return normalizeUrlWithoutHash(window.location.href);
}

function isExternalHttpLink(href = '') {
  return /^https?:\/\//i.test(href);
}

function shouldOpenInNewTab(href = '') {
  if (!href) return false;
  if (href.startsWith('tel:') || href.startsWith('mailto:')) return false;

  try {
    const url = new URL(href, window.location.origin);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function isActiveHref(href = '') {
  if (!href) return false;
  if (href.startsWith('tel:') || href.startsWith('mailto:')) return false;

  const currentFull = getCurrentComparableUrl();
  const currentBase = getCurrentComparableUrlWithoutHash();
  const linkFull = normalizeUrl(href);
  const linkBase = normalizeUrlWithoutHash(href);

  return linkFull === currentFull || linkBase === currentBase;
}

function isExactActiveHref(href = '') {
  if (!href) return false;
  if (href.startsWith('tel:') || href.startsWith('mailto:')) return false;

  return normalizeUrl(href) === getCurrentComparableUrl();
}

function splitMenuItems(items = []) {
  const navigation = [];
  const contacts = [];

  items.forEach((item) => {
    const href = String(item?.href || '');

    if (href.startsWith('tel:') || href.startsWith('mailto:')) {
      contacts.push(item);
      return;
    }

    navigation.push(item);
  });

  return { navigation, contacts };
}

function createMenuLookup(items = []) {
  return items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
}

function buildSocialMenu(items = []) {
  const nav = createElement('nav', 'ms-social-menu-nav');
  nav.setAttribute('aria-label', 'social links');

  items.forEach((item) => {
    const a = document.createElement('a');
    a.className = 'ms-social-menu-link';
    a.href = item.href || '#';
    a.dataset.id = item.id || '';
    a.setAttribute('aria-label', item.alt || item.shortName || item.id || 'social');

    if (isExternalHttpLink(item.href || '')) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    a.innerHTML = `
      <img
        class="ms-social-menu-link-icon"
        src="${item.icon || ''}"
        alt="${item.alt || item.shortName || item.id || 'social'}"
      >
      <span class="ms-social-menu-link-label">${item.shortName || item.alt || item.id || 'social'}</span>
    `;

    nav.appendChild(a);
  });

  return nav;
}

function buildRotatingSocialButton() {
  const button = createElement('button', 'ms-social-toggle');
  button.type = 'button';
  button.setAttribute('aria-label', 'open social links');

  const icon = document.createElement('img');
  icon.className = 'ms-social-toggle-icon';
  icon.alt = 'social';

  button.appendChild(icon);

  return { button, icon };
}

function buildWalletHost(className = '') {
  return createElement('div', className ? `ms-wallet-host ${className}` : 'ms-wallet-host');
}

function buildBottomLink(item = {}) {
  const a = document.createElement('a');
  a.className = 'ms-bottom-link';
  a.href = item.href || '#';
  a.dataset.id = item.id || '';
  a.setAttribute('aria-label', item.label || item.id || 'navigation item');

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
      <img
        class="ms-bottom-link-icon"
        src="${item.icon || ''}"
        alt="${item.label || item.id || ''}"
      >
    </span>
    <span class="ms-bottom-link-label">${nlToBr(item.label || '')}</span>
  `;

  return a;
}

function buildBottomGroups(items = []) {
  const leftWrap = createElement('div', 'ms-bottom-links-group ms-bottom-links-group-left');
  const rightWrap = createElement('div', 'ms-bottom-links-group ms-bottom-links-group-right');

  const safeItems = Array.isArray(items) ? items.slice(0, 4) : [];
  const leftItems = safeItems.slice(0, 2);
  const rightItems = safeItems.slice(2, 4);

  leftItems.forEach((item) => {
    leftWrap.appendChild(buildBottomLink(item));
  });

  rightItems.forEach((item) => {
    rightWrap.appendChild(buildBottomLink(item));
  });

  return { leftWrap, rightWrap };
}

function createRouteAnchor(item = {}) {
  const a = document.createElement('a');
  a.className = 'ms-route-card';
  a.href = item.href || '#';
  a.dataset.id = item.id || '';
  a.setAttribute('aria-label', item.label || item.id || 'menu item');

  if (isActiveHref(item.href || '')) {
    a.classList.add('is-active');
    a.setAttribute('aria-current', 'page');
  }

  if (shouldOpenInNewTab(item.href || '')) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }

  a.innerHTML = `
    <span class="ms-route-card__code">${escapeHtml(item.shortLabel || '')}</span>
    <span class="ms-route-card__label">${escapeHtml(item.label || '')}</span>
  `;

  return a;
}

function createGroupCard(item = {}) {
  const wrap = createElement('section', 'ms-route-group');
  wrap.dataset.id = item.id || '';

  const children = Array.isArray(item.children) ? item.children : [];
  const parentActive = isActiveHref(item.href || '');
  const childActive = children.some((child) => isExactActiveHref(child.href || ''));

  if (childActive) {
    wrap.classList.add('has-active-child');
  }

  if (parentActive && !childActive) {
    wrap.classList.add('is-active');
  }

  const rail = createElement('a', 'ms-route-group__rail');
  rail.href = item.href || '#';
  rail.dataset.id = item.id || '';
  rail.setAttribute('aria-label', item.label || item.id || 'menu group');

  if (parentActive && !childActive) {
    rail.classList.add('is-active');
    rail.setAttribute('aria-current', 'page');
  }

  if (shouldOpenInNewTab(item.href || '')) {
    rail.target = '_blank';
    rail.rel = 'noopener noreferrer';
  }

  rail.innerHTML = `
    <span class="ms-route-group__rail-code">${escapeHtml(item.shortLabel || '')}</span>
  `;

  wrap.appendChild(rail);

  const main = createElement('a', 'ms-route-group__main');
  main.href = item.href || '#';
  main.dataset.id = item.id || '';
  main.setAttribute('aria-label', item.label || item.id || 'group main row');

  if (parentActive && !childActive) {
    main.classList.add('is-active');
    main.setAttribute('aria-current', 'page');
  }

  if (shouldOpenInNewTab(item.href || '')) {
    main.target = '_blank';
    main.rel = 'noopener noreferrer';
  }

  main.innerHTML = `
    <span class="ms-route-group__label">${escapeHtml(item.label || '')}</span>
  `;

  wrap.appendChild(main);

  const childList = createElement(
    'div',
    `ms-route-group__children ms-route-group__children--${children.length === 1 ? 'single' : 'stack'}`
  );

  children.forEach((child) => {
    const childLink = document.createElement('a');
    childLink.className = 'ms-route-subcard';
    childLink.href = child.href || '#';
    childLink.dataset.id = child.id || '';
    childLink.setAttribute('aria-label', child.label || child.id || 'submenu item');

    if (isExactActiveHref(child.href || '')) {
      childLink.classList.add('is-active');
      childLink.setAttribute('aria-current', 'page');
    }

    if (shouldOpenInNewTab(child.href || '')) {
      childLink.target = '_blank';
      childLink.rel = 'noopener noreferrer';
    }

    childLink.innerHTML = `
      <span class="ms-route-subcard__code">${escapeHtml(child.shortLabel || '')}</span>
      <span class="ms-route-subcard__label">${escapeHtml(child.label || '')}</span>
    `;

    childList.appendChild(childLink);
  });

  wrap.appendChild(childList);

  return wrap;
}

function buildMatrixContacts(items = []) {
  if (!items.length) return null;

  const wrap = createElement('div', 'ms-menu-contacts-row');

  items.forEach((item) => {
    const a = document.createElement('a');
    a.className = 'ms-menu-contact-card';
    a.href = item.href || '#';
    a.dataset.id = item.id || '';

    if (shouldOpenInNewTab(item.href || '')) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    a.innerHTML = `
      <span class="ms-menu-contact-card__text">${escapeHtml(item.label || '')}</span>
    `;

    wrap.appendChild(a);
  });

  return wrap;
}

function buildMatrixMenu({ items = [], contacts = [], matrix = [] } = {}) {
  const lookup = createMenuLookup(items);
  const wrap = createElement('div', 'ms-menu-map');
  wrap.setAttribute('aria-label', 'mobile route map');

  const body = createElement('div', 'ms-menu-map__body');

  matrix.forEach((entry) => {
    const item = lookup[entry.id];
    if (!item) return;

    if (entry.type === 'group') {
      body.appendChild(createGroupCard(item));
      return;
    }

    body.appendChild(createRouteAnchor(item));
  });

  wrap.appendChild(body);

  const contactsRow = buildMatrixContacts(contacts);

  if (contactsRow) {
    wrap.appendChild(contactsRow);
  }

  return wrap;
}

export function createMobileShell(options = {}) {
  const target = ensureTarget(options.target);

  if (
    target[MOBILE_SHELL_INSTANCE_KEY] &&
    typeof target[MOBILE_SHELL_INSTANCE_KEY].destroy === 'function'
  ) {
    target[MOBILE_SHELL_INSTANCE_KEY].destroy();
  }

  const menuItems = options.menuItems || MOBILE_MENU_LINKS;
  const menuMatrix = options.menuMatrix || MOBILE_MENU_MATRIX;
  const bottomNavItems = options.bottomNavItems || MOBILE_BOTTOM_NAV;
  const socials = options.socials || MOBILE_SOCIALS;
  const socialRotateMs =
    Number(options.socialRotateMs || MOBILE_SHELL_DEFAULTS.socialRotateMs) || 1500;

  const walletButtonOptions = {
    onConnectClick: options.onConnectClick,
    onDisconnect: options.onDisconnect,
    onRefresh: options.onRefresh
  };

  const { navigation: mainMenuItems, contacts: contactMenuItems } = splitMenuItems(menuItems);

  const root = createElement('div', 'mobile-shell');
  root.innerHTML = `
    <div class="ms-overlay"></div>

    <header class="ms-topbar">
      <button class="ms-burger" type="button" aria-label="open menu" aria-expanded="false">
        <span class="ms-burger-line"></span>
        <span class="ms-burger-line"></span>
        <span class="ms-burger-line"></span>
      </button>

      <div class="ms-top-spacer"></div>

      <div class="ms-top-actions"></div>
    </header>

    <aside class="ms-menu-panel" aria-hidden="true">
      <div class="ms-menu-inner">
        <div class="ms-menu-shell"></div>
      </div>
    </aside>

    <aside class="ms-social-panel" aria-hidden="true">
      <div class="ms-social-panel-inner">
        <div class="ms-social-shell"></div>
      </div>
    </aside>

    <nav class="ms-bottombar" aria-label="bottom mobile bar">
      <div class="ms-bottom-left"></div>
      <div class="ms-bottom-center"></div>
      <div class="ms-bottom-right"></div>
    </nav>
  `;

  const overlay = root.querySelector('.ms-overlay');
  const burger = root.querySelector('.ms-burger');
  const topActions = root.querySelector('.ms-top-actions');
  const menuPanel = root.querySelector('.ms-menu-panel');
  const socialPanel = root.querySelector('.ms-social-panel');
  const menuShell = root.querySelector('.ms-menu-shell');
  const socialShell = root.querySelector('.ms-social-shell');
  const bottomLeft = root.querySelector('.ms-bottom-left');
  const bottomCenter = root.querySelector('.ms-bottom-center');
  const bottomRight = root.querySelector('.ms-bottom-right');

  const matrixMenu = buildMatrixMenu({
    items: mainMenuItems,
    contacts: contactMenuItems,
    matrix: menuMatrix
  });

  const socialMenuLinks = buildSocialMenu(socials);
  const rotatingSocialButton = buildRotatingSocialButton();
  const topWalletHost = buildWalletHost('ms-wallet-host-top');
  const bottomWalletHost = buildWalletHost('ms-wallet-host-bottom');
  const bottomGroups = buildBottomGroups(bottomNavItems);

  menuShell.appendChild(matrixMenu);
  socialShell.appendChild(socialMenuLinks);

  topActions.appendChild(rotatingSocialButton.button);
  topActions.appendChild(topWalletHost);

  bottomLeft.appendChild(bottomGroups.leftWrap);
  bottomCenter.appendChild(bottomWalletHost);
  bottomRight.appendChild(bottomGroups.rightWrap);

  const cleanups = [];
  let isDestroyed = false;
  let activePanel = null;
  let socialIndex = 0;
  let socialTimer = null;
  let topWalletInstance = null;
  let bottomWalletInstance = null;

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
    rotatingSocialButton.icon.alt = current.alt || current.shortName || 'social';
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

  matrixMenu.querySelectorAll('a').forEach((link) => {
    on(link, 'click', closePanels);
  });

  socialMenuLinks.querySelectorAll('a').forEach((link) => {
    on(link, 'click', closePanels);
  });

  bottomLeft.querySelectorAll('a').forEach((link) => {
    on(link, 'click', closePanels);
  });

  bottomRight.querySelectorAll('a').forEach((link) => {
    on(link, 'click', closePanels);
  });

  target.innerHTML = '';
  target.appendChild(root);

  topWalletInstance = mountWalletButton(topWalletHost, {
    ...walletButtonOptions,
    variant: 'compact'
  });

  bottomWalletInstance = mountWalletButton(bottomWalletHost, {
    ...walletButtonOptions,
    variant: 'mobile'
  });

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

      try {
        if (typeof topWalletInstance?.destroy === 'function') {
          topWalletInstance.destroy();
        } else if (typeof topWalletInstance === 'function') {
          topWalletInstance();
        }
      } catch (_) {}

      try {
        if (typeof bottomWalletInstance?.destroy === 'function') {
          bottomWalletInstance.destroy();
        } else if (typeof bottomWalletInstance === 'function') {
          bottomWalletInstance();
        }
      } catch (_) {}

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
