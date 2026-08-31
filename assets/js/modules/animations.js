import { select } from '../utils/dom.js';

/**
 * Initialize Typed.js hero animation.
 */
export const initTyped = () => {
  const typed = select('.typed');
  if (!typed || typeof window.Typed === 'undefined') return;

  let typedStrings = typed.getAttribute('data-typed-items') || '';
  typedStrings = typedStrings.split(',');

  // eslint-disable-next-line no-undef
  new Typed('.typed', {
    strings: typedStrings,
    loop: true,
    typeSpeed: 40,
    backSpeed: 30,
    backDelay: 800
  });
};

/**
 * Initialize skills progress-bar animation.
 */
export const initSkillsAnimation = () => {
  const skilsContent = select('.skills-content');
  if (!skilsContent || typeof window.Waypoint === 'undefined') return;

  // eslint-disable-next-line no-undef
  new Waypoint({
    element: skilsContent,
    offset: '80%',
    handler() {
      const progress = select('.progress .progress-bar', true);
      progress.forEach((el) => {
        el.style.width = `${el.getAttribute('aria-valuenow')}%`;
      });
    }
  });
};

/**
 * Initialize portfolio details slider.
 */
export const initPortfolioSlider = () => {
  if (typeof window.Swiper === 'undefined') return;

  // eslint-disable-next-line no-undef
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });
};

/**
 * Initialize testimonials slider.
 */
export const initTestimonialsSlider = () => {
  if (typeof window.Swiper === 'undefined') return;

  // eslint-disable-next-line no-undef
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });
};

/**
 * Initialize AOS animation library.
 */
export const initAOS = () => {
  if (typeof window.AOS === 'undefined') return;

  const initOnLoad = () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  };

  if (document.readyState === 'complete') {
    initOnLoad();
  } else {
    window.addEventListener('load', initOnLoad);
  }
};

/**
 * Initialize PureCounter.
 */
export const initPureCounter = () => {
  if (typeof window.PureCounter === 'undefined') return;

  // eslint-disable-next-line no-undef
  new PureCounter();
};

/**
 * Initialize template lightbox selector.
 */
export const initPortfolioLightbox = () => {
  if (typeof window.GLightbox === 'undefined') return;

  // eslint-disable-next-line no-undef
  GLightbox({ selector: '.portfolio-lightbox' });
};

/**
 * Initialize global lightbox selector.
 */
export const initGlobalLightbox = () => {
  if (typeof window.GLightbox === 'undefined') return;

  // eslint-disable-next-line no-undef
  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true
  });
};
