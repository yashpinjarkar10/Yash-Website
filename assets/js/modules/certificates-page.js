import { certificatesData } from '../data/certificates.js';

/**
 * Initialize Certificates Page
 */
export const initCertificatesPage = () => {
  const container = document.getElementById('certificates-catalog-grid');
  if (!container) return;

  container.innerHTML = certificatesData
    .map(
      (cert) => `
    <article class="project-card">
      <div class="project-card-image-wrap" style="height: 200px; background: #080d1a;">
        <img src="${cert.image}" alt="${cert.title}" class="project-card-image" style="object-fit: contain; padding: 12px;" loading="lazy">
        <span class="project-card-category-badge">${cert.category}</span>
      </div>
      <div class="project-card-body">
        <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-blue); margin-bottom: 6px;">
          ${cert.issuer} &bull; ${cert.date}
        </div>
        <h3 class="project-card-title" style="font-size: 1.2rem;">${cert.title}</h3>
        <p class="project-card-tagline" style="font-size: 0.9rem;">${cert.description}</p>
        <div class="project-card-footer" style="margin-top: auto;">
          <a href="${cert.link}" target="_blank" rel="noopener noreferrer" class="btn-primary-action" style="padding: 8px 16px; font-size: 0.82rem; width: 100%;">
            <i class="bx bx-award"></i> View Certificate
          </a>
        </div>
      </div>
    </article>
  `
    )
    .join('');
};
