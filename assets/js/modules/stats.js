import { readCache, writeCache } from '../utils/cache.js';

/**
 * Smooth Apple-style rolling number animation using easeOutExpo
 */
export const animateCount = (el, target, duration = 1200, suffix = '') => {
  if (!el || typeof target !== 'number' || isNaN(target)) return;

  const rawCurrent = el.textContent.replace(/[^0-9]/g, '');
  const start = rawCurrent ? parseInt(rawCurrent, 10) : 0;
  if (start === target && el.textContent.includes(String(target))) {
    el.textContent = `${target}${suffix}`;
    return;
  }

  const startTime = performance.now();

  const update = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Apple easeOutExpo: 1 - 2^(-10 * progress)
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.floor(start + (target - start) * ease);

    el.textContent = `${current}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = `${target}${suffix}`;
    }
  };

  requestAnimationFrame(update);
};

const triggerWhenVisible = (el, callback) => {
  if (!el) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15 }
  );
  observer.observe(el);
};

/**
 * Fetch and display GitHub repository count with smooth count-up.
 * @returns {Promise<void>}
 */
export const fetchGitHubRepos = async () => {
  const githubUsername = 'yashpinjarkar10';
  const el = document.getElementById('github-repos');
  if (!el) return;

  const CACHE_KEY = 'github_repos_cache_v1';
  const cached = readCache(CACHE_KEY);

  let cachedCount = null;
  if (cached && typeof cached.count === 'number' && cached.count > 0) {
    cachedCount = cached.count;
    triggerWhenVisible(el, () => animateCount(el, cached.count, 1100));
  }

  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const repos = await response.json();
    if (Array.isArray(repos) && repos.length > 0) {
      triggerWhenVisible(el, () => animateCount(el, repos.length, 1200));
      writeCache(CACHE_KEY, { count: repos.length, at: Date.now() });
      return;
    }

    throw new Error('Empty repos response');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('GitHub API failed, keeping last-known value:', error);
    if (cachedCount === null) {
      el.textContent = '—';
    }
  }
};

/**
 * Fetch and display solved LeetCode problem count with smooth count-up.
 * @returns {Promise<void>}
 */
export const fetchLeetCodeSolved = async () => {
  const username = 'Yashpinjarkar';
  const el = document.getElementById('leetcode-solved');
  if (!el) return;

  const CACHE_KEY = 'leetcode_solved_cache_v1';
  const HARDCODED_FALLBACK = 400;

  const cached = readCache(CACHE_KEY);
  if (cached && typeof cached.count === 'number' && cached.count > 0) {
    triggerWhenVisible(el, () => animateCount(el, cached.count, 1300));
  } else {
    triggerWhenVisible(el, () => animateCount(el, HARDCODED_FALLBACK, 1300, '+'));
  }

  const setCount = (count) => {
    if (typeof count !== 'number' || !Number.isFinite(count) || count <= 0) return false;
    triggerWhenVisible(el, () => animateCount(el, count, 1400));
    writeCache(CACHE_KEY, { count, at: Date.now() });
    return true;
  };

  const sources = [
    {
      url: `https://alfa-leetcode-api.onrender.com/${username}/solved`,
      pick: (j) => (j && (j.solvedProblem ?? j.totalSolved)) || null
    },
    {
      url: `https://leetcode-stats-api.cyclic.app/${username}`,
      pick: (j) => (j && j.totalSolved) || null
    },
    {
      url: `https://leetcode-api-faisalshohag.vercel.app/${username}`,
      pick: (j) => (j && j.totalSolved) || null
    }
  ];

  for (const src of sources) {
    try {
      const res = await fetch(src.url, { headers: { Accept: 'application/json' } });
      if (!res.ok) continue;

      const data = await res.json();
      const count = src.pick(data);
      if (typeof count === 'number' && setCount(count)) return;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('LeetCode source failed:', src.url, error);
    }
  }

  // eslint-disable-next-line no-console
  console.warn('LeetCode: all sources failed, keeping last-known value.');
};

/**
 * Animate static metric numbers on index.html (like Products Built)
 */
export const initStaticMetrics = () => {
  const productsBuiltEl = document.getElementById('products-built');
  if (productsBuiltEl) {
    const target = parseInt(productsBuiltEl.getAttribute('data-target') || '2', 10);
    triggerWhenVisible(productsBuiltEl, () => animateCount(productsBuiltEl, target, 1000));
  }
};
