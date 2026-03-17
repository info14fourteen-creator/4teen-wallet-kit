import './noticeCenter.css';

let layer = null;
let noticeEl = null;
let messageEl = null;
let progressEl = null;
let closeEl = null;

let hideTimer = null;
let rafId = null;
let activeNoticeId = 0;

const RADIUS = 15;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ensureLayer() {
  if (typeof document === 'undefined') return null;
  if (layer) return layer;

  layer = document.createElement('div');
  layer.className = 'fw-notice-layer';

  noticeEl = document.createElement('div');
  noticeEl.className = 'fw-notice fw-notice--neutral';
  noticeEl.innerHTML = `
    <button type="button" class="fw-notice__close" aria-label="Close notification">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 7L17 17" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M17 7L7 17" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
      </svg>
    </button>

    <div class="fw-notice__content">
      <svg class="fw-notice__ring" viewBox="0 0 34 34" aria-hidden="true">
        <circle class="fw-notice__ring-track" cx="17" cy="17" r="${RADIUS}"></circle>
        <circle class="fw-notice__ring-progress" cx="17" cy="17" r="${RADIUS}"></circle>
      </svg>

      <div class="fw-notice__message"></div>
    </div>
  `;

  messageEl = noticeEl.querySelector('.fw-notice__message');
  progressEl = noticeEl.querySelector('.fw-notice__ring-progress');
  closeEl = noticeEl.querySelector('.fw-notice__close');

  progressEl.style.strokeDasharray = `${CIRCUMFERENCE}`;
  progressEl.style.strokeDashoffset = '0';

  closeEl.addEventListener('click', () => {
    hideNotice();
  });

  layer.appendChild(noticeEl);
  document.body.appendChild(layer);

  return layer;
}

function clearTimers() {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }

  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function setType(type) {
  noticeEl.classList.remove(
    'fw-notice--success',
    'fw-notice--error',
    'fw-notice--neutral'
  );

  if (type === 'success') {
    noticeEl.classList.add('fw-notice--success');
    return;
  }

  if (type === 'error') {
    noticeEl.classList.add('fw-notice--error');
    return;
  }

  noticeEl.classList.add('fw-notice--neutral');
}

function animateRing(duration, noticeId) {
  const start = performance.now();

  function frame(now) {
    if (noticeId !== activeNoticeId) return;

    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const offset = CIRCUMFERENCE * progress;

    if (progressEl) {
      progressEl.style.strokeDashoffset = String(offset);
    }

    if (progress < 1) {
      rafId = requestAnimationFrame(frame);
    }
  }

  if (progressEl) {
    progressEl.style.strokeDashoffset = '0';
  }

  rafId = requestAnimationFrame(frame);
}

export function hideNotice() {
  clearTimers();

  if (!noticeEl) return;

  noticeEl.classList.remove('fw-notice--visible');
}

export function showNotice(options = {}) {
  if (typeof document === 'undefined') return;

  ensureLayer();
  clearTimers();

  activeNoticeId += 1;
  const noticeId = activeNoticeId;

  const type = options.type || 'neutral';
  const message = options.message || '';
  const duration = Number(options.duration) > 0 ? Number(options.duration) : 5000;

  setType(type);
  messageEl.textContent = message;
  noticeEl.classList.add('fw-notice--visible');

  animateRing(duration, noticeId);

  hideTimer = setTimeout(() => {
    if (noticeId !== activeNoticeId) return;
    hideNotice();
  }, duration);
}

export function showSuccessNotice(message, duration = 5000) {
  showNotice({
    type: 'success',
    message,
    duration
  });
}

export function showErrorNotice(message, duration = 5000) {
  showNotice({
    type: 'error',
    message,
    duration
  });
}

export function showNeutralNotice(message, duration = 5000) {
  showNotice({
    type: 'neutral',
    message,
    duration
  });
}
