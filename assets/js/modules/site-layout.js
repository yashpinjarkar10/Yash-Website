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

  // Copyright year
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = `Yash Pinjarkar ${new Date().getFullYear()}`;
  }
};
