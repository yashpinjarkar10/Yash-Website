import { on, onscroll, select } from '../utils/dom.js';

/**
 * Smoothly scroll to target selector.
 * @param {string} el
 */
export const scrollto = (el) => {
  const target = select(el);
  if (!target) return;

  window.scrollTo({
    top: target.offsetTop,
    behavior: 'smooth'
  });
};

/**
 * Activate current navbar section link on scroll.
 */
export const initNavbar = () => {
  const navbarlinks = select('#navbar .scrollto', true);

  const navbarlinksActive = () => {
    const position = window.scrollY + 200;

    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      const section = select(navbarlink.hash);
      if (!section) return;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };

  if (document.readyState === 'complete') {
    navbarlinksActive();
  } else {
    window.addEventListener('load', navbarlinksActive);
  }
  onscroll(document, navbarlinksActive);
};

/**
 * Toggle back-to-top button state.
 */
export const initBackToTop = () => {
  const backtotop = select('.back-to-top');
  if (!backtotop) return;

  const toggleBacktotop = () => {
    if (window.scrollY > 100) {
      backtotop.classList.add('active');
    } else {
      backtotop.classList.remove('active');
    }
  };

  if (document.readyState === 'complete') {
    toggleBacktotop();
  } else {
    window.addEventListener('load', toggleBacktotop);
  }
  onscroll(document, toggleBacktotop);
};

/**
 * Register mobile navigation and scroll link behavior.
 */
export const initMobileNav = () => {
  on('click', '.mobile-nav-toggle', function mobileNavToggleHandler() {
    select('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  on('click', '.scrollto', function scrollToHandler(e) {
    if (!select(this.hash)) return;

    e.preventDefault();
    const body = select('body');

    if (body.classList.contains('mobile-nav-active')) {
      body.classList.remove('mobile-nav-active');
      const navbarToggle = select('.mobile-nav-toggle');
      navbarToggle.classList.toggle('bi-list');
      navbarToggle.classList.toggle('bi-x');
    }

    scrollto(this.hash);
  }, true);
};

/**
 * Scroll to hash target on page load.
 */
export const initHashScroll = () => {
  const onLoadScroll = () => {
    if (!window.location.hash) return;
    if (!select(window.location.hash)) return;
    scrollto(window.location.hash);
  };

  if (document.readyState === 'complete') {
    onLoadScroll();
  } else {
    window.addEventListener('load', onLoadScroll);
  }
};
