function safeRead(localStorageKey) {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(localStorageKey);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeWrite(localStorageKey, values) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(localStorageKey, JSON.stringify(values));
  } catch {
    // Ignore quota/private mode failures.
  }
}

function getRecentEntries(storageKey, windowMs) {
  const now = Date.now();
  const entries = safeRead(storageKey).filter(
    timestamp => typeof timestamp === 'number' && now - timestamp <= windowMs
  );
  safeWrite(storageKey, entries);
  return entries;
}

export function createFormSpamGuard({
  storageKey,
  minFillMs = 3500,
  windowMs = 15 * 60 * 1000,
  maxSubmissionsPerWindow = 4,
}) {
  return {
    validate({ honeypotValue, formStartedAt }) {
      if (honeypotValue && honeypotValue.trim()) {
        return { ok: false, reason: 'honeypot' };
      }

      if (!formStartedAt || Date.now() - formStartedAt < minFillMs) {
        return { ok: false, reason: 'too_fast' };
      }

      const recent = getRecentEntries(storageKey, windowMs);
      if (recent.length >= maxSubmissionsPerWindow) {
        return { ok: false, reason: 'rate_limited' };
      }

      return { ok: true };
    },

    markSubmitted() {
      const recent = getRecentEntries(storageKey, windowMs);
      recent.push(Date.now());
      safeWrite(storageKey, recent);
    },
  };
}

