/**
 * Initialize resume PDF first-page preview.
 */
export const initResume = () => {
  const canvas = document.getElementById('resume-preview-canvas');
  const fallback = document.getElementById('resume-preview-fallback');
  const pdfUrl = 'Resume-Y1.pdf';

  if (!canvas || !fallback) return;
  if (typeof window.pdfjsLib === 'undefined') return;

  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  const renderFirstPage = async () => {
    try {
      const loadingTask = window.pdfjsLib.getDocument({ url: pdfUrl });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const container = canvas.parentElement;
      const containerWidth = (container && container.clientWidth) ? container.clientWidth : 500;

      const unscaledViewport = page.getViewport({ scale: 1 });
      const scale = containerWidth / unscaledViewport.width;
      const viewport = page.getViewport({ scale });

      const outputScale = window.devicePixelRatio || 1;
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) throw new Error('2D context not available');

      ctx.setTransform(outputScale, 0, 0, outputScale, 0, 0);
      await page.render({ canvasContext: ctx, viewport }).promise;
      fallback.style.display = 'none';
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Resume preview render failed:', err);
      fallback.style.display = 'flex';
    }
  };

  requestAnimationFrame(() => {
    renderFirstPage();
  });
};
