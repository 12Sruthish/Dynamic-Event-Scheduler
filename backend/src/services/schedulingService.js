// Weighted interval scheduling (DP with binary search)
// Sessions must have numeric start and end (e.g., minutes since day start or timestamps).
function generateOptimalSchedule(sessions) {
  if (!Array.isArray(sessions)) return [];

  // copy and normalize
  const arr = sessions.map(s => ({
    id: s.id,
    title: s.title || '',
    start: Number(s.start),
    end: Number(s.end),
    score: s.score !== undefined ? Number(s.score) : 1
  })).filter(s => !Number.isNaN(s.start) && !Number.isNaN(s.end) && s.end > s.start);

  arr.sort((a,b) => a.end - b.end);

  const n = arr.length;
  if (n === 0) return [];

  // compute p[i] = index of last interval before i that doesn't overlap
  const p = new Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    let lo = 0, hi = i - 1, ans = -1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (arr[mid].end <= arr[i].start) { ans = mid; lo = mid + 1; }
      else hi = mid - 1;
    }
    p[i] = ans;
  }

  const dp = new Array(n).fill(0);
  const take = new Array(n).fill(false);

  dp[0] = arr[0].score;
  for (let i = 1; i < n; i++) {
    const incl = arr[i].score + (p[i] !== -1 ? dp[p[i]] : 0);
    const excl = dp[i-1];
    if (incl > excl) { dp[i] = incl; take[i] = true; }
    else { dp[i] = excl; }
  }

  // reconstruct chosen intervals
  const result = [];
  function recon(i) {
    if (i < 0) return;
    const incl = arr[i].score + (p[i] !== -1 ? dp[p[i]] : 0);
    if (incl > (i > 0 ? dp[i-1] : 0)) {
      recon(p[i]);
      result.push(arr[i]);
    } else recon(i-1);
  }
  recon(n-1);
  return result;
}

module.exports = { generateOptimalSchedule };
