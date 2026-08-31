import { readCache, writeCache } from '../utils/cache.js';

/**
 * Fetch and display GitHub repository count.
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
    el.textContent = String(cached.count);
  }

  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const repos = await response.json();
    if (Array.isArray(repos) && repos.length > 0) {
      el.textContent = String(repos.length);
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
 * Fetch and display solved LeetCode problem count.
 * @returns {Promise<void>}
 */
export const fetchLeetCodeSolved = async () => {
  const username = 'Yashpinjarkar';
  const el = document.getElementById('leetcode-solved');
  if (!el) return;

  const CACHE_KEY = 'leetcode_solved_cache_v1';
  const HARDCODED_FALLBACK = '229';

  const cached = readCache(CACHE_KEY);
  if (cached && typeof cached.count === 'number' && cached.count > 0) {
    el.textContent = String(cached.count);
  } else {
    el.textContent = HARDCODED_FALLBACK;
  }

  const setCount = (count) => {
    if (typeof count !== 'number' || !Number.isFinite(count) || count <= 0) return false;
    el.textContent = String(count);
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
