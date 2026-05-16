'use strict';

const ZURI = (() => {

  function init() {
    initNav();
    initScrollReveal();
    initActiveNav();
    initFilterTabs();
    initAccordions();
    initNavScroll();
  }

  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const update = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  }

  function initActiveNav() {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mobile-nav a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  function initScrollReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay) || 0;
          setTimeout(() => entry.target.classList.add('revealed'), delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => io.observe(el));
  }

  function initFilterTabs() {
    document.querySelectorAll('[data-filter-group]').forEach(group => {
      const key = group.dataset.filterGroup;
      const items = document.querySelectorAll(`[data-filter-target="${key}"]`);
      const buttons = group.querySelectorAll('.filter-btn');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.dataset.filter;
          items.forEach(item => {
            const cats = (item.dataset.category || '').split(' ');
            item.style.display = (filter === 'all' || cats.includes(filter)) ? '' : 'none';
          });
        });
      });
    });
  }

  function initAccordions() {
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const isOpen = item.classList.contains('open');
        // close all in same parent
        const parent = item.parentElement;
        parent.querySelectorAll('.accordion-item.open').forEach(el => el.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  function toast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    const icon = type === 'success'
      ? '<polyline points="20 6 9 17 4 12"></polyline>'
      : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>';
    el.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icon}</svg><span>${message}</span>`;
    container.appendChild(el);
    setTimeout(() => {
      el.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => el.remove(), 300);
    }, 4000);
  }

  function handleForm(formEl, successMsg) {
    if (!formEl) return;
    const scriptURL = formEl.dataset.scriptUrl;
    formEl.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = formEl.querySelector('[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
      try {
        if (scriptURL) await fetch(scriptURL, { method: 'POST', body: new FormData(formEl) });
        toast(successMsg || 'Submitted successfully!', 'success');
        formEl.reset();
        if (formEl.dataset.redirect) setTimeout(() => { location.href = formEl.dataset.redirect; }, 1500);
      } catch {
        toast('Something went wrong. Please try again.', 'error');
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });
  }

  return { init, toast, handleForm };
})();

document.addEventListener('DOMContentLoaded', ZURI.init);
