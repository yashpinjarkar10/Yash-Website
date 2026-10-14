/**
 * Shared site-wide navigation and layout interactions
 */
export const initSiteLayout = () => {
  // Mobile drawer toggle
  const mobileToggle = document.querySelector('.site-nav-mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'bi bi-x-lg' : 'bi bi-list';
      }
    });

    // Close when clicking mobile links
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'bi bi-list';
      });
    });
  }

  // Active navigation link highlighting based on current pathname
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav-link, .mobile-nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.split('/').pop() || 'index.html';

    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html') || (currentPath === 'project.html' && linkPath === 'projects.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Smooth iOS-style dynamic sliding indicator line
  initNavbarIndicator(currentPath);

  // Copyright year
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = `Yash Pinjarkar ${new Date().getFullYear()}`;
  }
};

/**
 * Smooth iOS-style dynamic sliding indicator line for navbar
 * Animates smoothly across links on click, hover, and between page navigations.
 */
export const initNavbarIndicator = (currentPath = '') => {
  const navContainer = document.querySelector('.site-nav-links');
  if (!navContainer) return;

  const links = Array.from(navContainer.querySelectorAll('.site-nav-link'));
  if (!links.length) return;

  // Create or reuse indicator element
  let indicator = navContainer.querySelector('.nav-indicator-line');
  if (!indicator) {
    indicator = document.createElement('span');
    indicator.className = 'nav-indicator-line';
    navContainer.appendChild(indicator);
  }

  const getActiveLink = () => {
    return navContainer.querySelector('.site-nav-link.active') || links[0];
  };

  const getLinkCoords = (link) => {
    if (!link) return null;
    const navRect = navContainer.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    return {
      left: Math.round(linkRect.left - navRect.left),
      width: Math.round(linkRect.width)
    };
  };

  let isHovered = false;

  const applyIndicator = (coords, animate = true, opacity = 1) => {
    if (!coords || coords.width === 0) return;
    if (!animate) {
      indicator.style.transition = 'none';
      indicator.style.transform = `translate3d(${coords.left}px, 0, 0)`;
      indicator.style.width = `${coords.width}px`;
      indicator.style.opacity = String(opacity);
      void indicator.offsetWidth; // Force synchronous reflow
      indicator.style.transition = '';
    } else {
      indicator.style.transform = `translate3d(${coords.left}px, 0, 0)`;
      indicator.style.width = `${coords.width}px`;
      indicator.style.opacity = String(opacity);
    }
  };

  // 1. Check for cross-page transition data stored before navigation
  const savedTransition = sessionStorage.getItem('nav_line_transition');
  let transitionData = null;
  if (savedTransition) {
    try {
      const parsed = JSON.parse(savedTransition);
      if (Date.now() - parsed.time < 3500) {
        transitionData = parsed;
      }
    } catch (e) {}
    sessionStorage.removeItem('nav_line_transition');
  }

  // Switch to dynamic indicator mode (hides static CSS ::after)
  navContainer.classList.add('indicator-initialized');

  const activeLink = getActiveLink();
  if (activeLink) {
    const targetCoords = getLinkCoords(activeLink);

    // If navigated from another page, determine starting coordinates
    let startCoords = null;
    if (transitionData && transitionData.fromHref) {
      const fromLink = links.find((l) => {
        const h = l.getAttribute('href');
        return h && h.split('/').pop() === transitionData.fromHref.split('/').pop();
      });
      if (fromLink && fromLink !== activeLink) {
        startCoords = getLinkCoords(fromLink);
      } else if (transitionData.fromLeft !== undefined && Math.abs(transitionData.fromLeft - targetCoords.left) > 4) {
        startCoords = { left: transitionData.fromLeft, width: transitionData.fromWidth };
      }
    }

    if (startCoords && Math.abs(startCoords.left - targetCoords.left) > 4) {
      // Position indicator at departed page's coordinates first without transition
      applyIndicator(startCoords, false, 1);

      // Trigger smooth iOS-style glide to active link in next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          applyIndicator(targetCoords, true, 1);
        });
      });
    } else {
      // First visit or direct link: smoothly fade in under active link
      applyIndicator(targetCoords, false, 0);
      requestAnimationFrame(() => {
        indicator.style.opacity = '1';
      });
    }
  }

  // 2. Hover interactions: fluidly follow cursor across all options
  links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      isHovered = true;
      const coords = getLinkCoords(link);
      applyIndicator(coords, true, 1);
    });

    // 3. Click interaction: save origin link & animate immediately
    link.addEventListener('click', (e) => {
      if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
          const coords = getLinkCoords(link);
          try {
            sessionStorage.setItem('nav_line_transition', JSON.stringify({
              fromHref: currentPath || window.location.pathname.split('/').pop() || 'index.html',
              fromLeft: coords.left,
              fromWidth: coords.width,
              time: Date.now()
            }));
          } catch (err) {}
          applyIndicator(coords, true, 1);
        }
      }
    });
  });

  // When mouse leaves navbar, smoothly return to current active link
  navContainer.addEventListener('mouseleave', () => {
    isHovered = false;
    const currentActive = getActiveLink();
    if (currentActive) {
      const coords = getLinkCoords(currentActive);
      applyIndicator(coords, true, 1);
    }
  });

  // 4. Reposition without delay on window resize
  window.addEventListener('resize', () => {
    if (!isHovered) {
      const currentActive = getActiveLink();
      if (currentActive) {
        const coords = getLinkCoords(currentActive);
        applyIndicator(coords, false, 1);
      }
    }
  });

  // 5. Ensure exact alignment once fonts are ready
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (!isHovered) {
        const currentActive = getActiveLink();
        if (currentActive) {
          const coords = getLinkCoords(currentActive);
          applyIndicator(coords, false, 1);
        }
      }
    });
  }
};
