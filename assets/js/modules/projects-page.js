import { projectsData, getProjectById } from '../data/projects.js';

/**
 * Initialize Projects Catalog Page (projects.html)
 */
export const initProjectsCatalog = () => {
  const grid = document.getElementById('projects-catalog-grid');
  if (!grid) return;

  let currentCategory = 'all';
  let searchQuery = '';

  const render = () => {
    const filtered = projectsData.filter((item) => {
      const matchCat = currentCategory === 'all' || item.category === currentCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.technologies.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <i class="bi bi-search" style="font-size: 2.5rem; display: block; margin-bottom: 12px;"></i>
          <h4 style="color: var(--text-secondary); margin-bottom: 8px;">No projects match your filter</h4>
          <p>Try clearing your search query or selecting a different category.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered
      .map(
        (p) => `
      <article class="project-card" data-category="${p.category}">
        <div class="project-card-image-wrap">
          <img src="${p.image}" alt="${p.title}" class="project-card-image" loading="lazy">
          <span class="project-card-category-badge">${p.categoryLabel}</span>
        </div>
        <div class="project-card-body">
          <h3 class="project-card-title">${p.title}</h3>
          <p class="project-card-tagline">${p.tagline}</p>
          <div class="project-card-tags">
            ${p.technologies.slice(0, 5).map((t) => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <div class="project-card-footer">
            <a href="project.html?id=${p.id}" class="btn-case-study">
              Case Study <i class="bi bi-arrow-right"></i>
            </a>
            <div class="project-card-actions">
              ${
                p.github
                  ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="action-icon-link" aria-label="GitHub"><i class="bx bxl-github"></i></a>`
                  : ''
              }
              ${
                p.live
                  ? `<a href="${p.live}" target="_blank" rel="noopener noreferrer" class="action-icon-link" aria-label="Live Demo"><i class="bx bx-link-external"></i></a>`
                  : ''
              }
            </div>
          </div>
        </div>
      </article>
    `
      )
      .join('');
  };

  // Wire Category Filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      render();
    });
  });

  // Wire Search Box
  const searchInput = document.getElementById('project-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      render();
    });
  }

  render();
};

/**
 * Initialize Dynamic Project Subpage (project.html?id=slug)
 */
export const initProjectDetail = () => {
  const container = document.getElementById('project-detail-container');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const requestedId = urlParams.get('id');

  const currentIndex = projectsData.findIndex((p) => p.id === requestedId);
  const project = currentIndex !== -1 ? projectsData[currentIndex] : projectsData[0];

  if (!project) return;

  // Update Page Title
  document.title = `${project.title} — Yash Pinjarkar`;

  const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
  const nextIndex = (currentIndex + 1) % projectsData.length;
  const prevProject = projectsData[prevIndex];
  const nextProject = projectsData[nextIndex];

  container.innerHTML = `
    <header class="project-subpage-header">
      <nav class="breadcrumb-nav" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        <span>/</span>
        <a href="projects.html">Projects</a>
        <span>/</span>
        <span style="color: var(--text-primary); font-weight: 600;">${project.title}</span>
      </nav>

      <div class="page-badge">
        <span class="pulse-dot"></span>
        <span>${project.categoryLabel}</span>
      </div>

      <h1 class="page-title">${project.title}</h1>
      <p class="page-description">${project.tagline}</p>
    </header>

    <div class="project-hero-media">
      <img src="${project.image}" alt="${project.title} Architecture & Interface" class="project-hero-image">
    </div>

    <div class="project-detail-layout">
      <!-- Main Content -->
      <div class="project-detail-main">
        <section class="detail-section">
          <h2 class="detail-section-title">
            <i class="bi bi-info-circle"></i> Executive Overview
          </h2>
          <p class="detail-prose">${project.overview}</p>
        </section>

        <section class="detail-section">
          <h2 class="detail-section-title">
            <i class="bi bi-diagram-3"></i> System Architecture & Pipeline
          </h2>
          <p class="detail-prose">${project.architecture}</p>
        </section>

        <section class="detail-section">
          <h2 class="detail-section-title">
            <i class="bi bi-stars"></i> Core Engineering Features
          </h2>
          <ul class="detail-features-list">
            ${project.keyFeatures
              .map(
                (feat) => `
              <li>
                <i class="bi bi-check2-circle"></i>
                <span>${feat}</span>
              </li>
            `
              )
              .join('')}
          </ul>
        </section>

        ${
          project.challengesSolved && project.challengesSolved.length > 0
            ? `
        <section class="detail-section">
          <h2 class="detail-section-title">
            <i class="bi bi-lightning-charge"></i> Technical Challenges Overcome
          </h2>
          <ul class="detail-features-list">
            ${project.challengesSolved
              .map(
                (ch) => `
              <li>
                <i class="bi bi-shield-check"></i>
                <span>${ch}</span>
              </li>
            `
              )
              .join('')}
          </ul>
        </section>
        `
            : ''
        }
      </div>

      <!-- Specs Sidebar -->
      <aside class="project-detail-sidebar">
        <div class="sidebar-card">
          <h3 class="sidebar-title">Project Metadata</h3>
          
          <div class="spec-item">
            <span class="spec-label">Category</span>
            <span class="spec-value">${project.categoryLabel}</span>
          </div>

          <div class="spec-item">
            <span class="spec-label">Timeline</span>
            <span class="spec-value">${project.date}</span>
          </div>

          <div class="spec-item">
            <span class="spec-label">Engineering Role</span>
            <span class="spec-value">${project.role}</span>
          </div>

          <div class="spec-item">
            <span class="spec-label">Architecture Highlights</span>
            <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 4px;">
              ${(project.metrics || [])
                .map(
                  (m) => `
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; padding: 4px 0; border-bottom: 1px dashed var(--border-subtle);">
                  <span style="color: var(--text-muted);">${m.label}:</span>
                  <span style="color: var(--accent-blue); font-weight: 600;">${m.value}</span>
                </div>
              `
                )
                .join('')}
            </div>
          </div>

          <div class="spec-item" style="margin-top: 20px;">
            <span class="spec-label">Tech Stack</span>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
              ${project.technologies.map((t) => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
          </div>

          <div class="sidebar-buttons">
            ${
              project.live
                ? `
              <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn-primary-action">
                <i class="bx bx-link-external"></i> Launch Live System
              </a>
            `
                : ''
            }
            ${
              project.github
                ? `
              <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn-secondary-action">
                <i class="bx bxl-github"></i> View GitHub Repo
              </a>
            `
                : ''
            }
          </div>
        </div>
      </aside>
    </div>

    <!-- Pager Prev / Next -->
    <nav class="project-pager" aria-label="Project Navigation">
      <a href="project.html?id=${prevProject.id}" class="pager-btn">
        <span class="pager-label">&larr; Previous Case Study</span>
        <span class="pager-title">${prevProject.title}</span>
      </a>

      <a href="projects.html" class="btn-secondary-action" style="padding: 10px 18px; font-size: 0.85rem;">
        <i class="bi bi-grid"></i> All Projects
      </a>

      <a href="project.html?id=${nextProject.id}" class="pager-btn" style="text-align: right;">
        <span class="pager-label">Next Case Study &rarr;</span>
        <span class="pager-title">${nextProject.title}</span>
      </a>
    </nav>
  `;
};
