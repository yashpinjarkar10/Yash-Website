/**
 * Main bootstrap entry point for website modules.
 */
(() => {
  'use strict';

  const runtime = {
    navbar: null,
    portfolio: null,
    chatbot: null
  };

  window.openProjectModal = (projectIndex) => runtime.portfolio && runtime.portfolio.openProjectModal(projectIndex);
  window.closeProjectModal = () => runtime.portfolio && runtime.portfolio.closeProjectModal();
  window.sendMessage = () => runtime.chatbot && runtime.chatbot.sendMessage();
  window.scrollto = (el) => runtime.navbar && runtime.navbar.scrollto(el);

  const bootstrap = async () => {
    const [
      navbar,
      animations,
      portfolio,
      stats,
      chatbot,
      resume
    ] = await Promise.all([
      import('./modules/navbar.js'),
      import('./modules/animations.js'),
      import('./modules/portfolio.js'),
      import('./modules/stats.js'),
      import('./modules/chatbot.js'),
      import('./modules/resume.js')
    ]);

    runtime.navbar = navbar;
    runtime.portfolio = portfolio;
    runtime.chatbot = chatbot;

    const init = () => {
      navbar.initNavbar();
      navbar.initBackToTop();
      navbar.initMobileNav();
      navbar.initHashScroll();

      animations.initTyped();
      animations.initSkillsAnimation();
      animations.initPortfolioLightbox();
      animations.initPortfolioSlider();
      animations.initTestimonialsSlider();
      animations.initAOS();
      animations.initPureCounter();
      animations.initGlobalLightbox();

      portfolio.initPortfolio();
      portfolio.initCertificates();
      portfolio.initPortfolioFilter();
      portfolio.initProjectModal();

      stats.fetchGitHubRepos();
      stats.fetchLeetCodeSolved().catch((error) => {
        // eslint-disable-next-line no-console
        console.warn('LeetCode fetch crashed:', error);
      });

      chatbot.initChatbot();
      resume.initResume();

      const copyrightYear = document.getElementById('copyright-year');
      if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.textContent = `YashPinjarkar ${currentYear}`;
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
      init();
    }
  };

  bootstrap().catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to bootstrap JS modules:', error);
  });
})();
