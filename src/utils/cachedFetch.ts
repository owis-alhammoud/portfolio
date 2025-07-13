export async function cachedFetch<T>(url: string, ttlSeconds = 86400): Promise<T> {
  const key = `cache:${url}`;

  if (typeof localStorage !== 'undefined') {
    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < ttlSeconds * 1000) {
          return data as T;
        }
      }
    } catch {
      // ignore malformed cache
    }
  }

  const res = await fetch(url);
  const data = await res.json();

  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
    } catch {
      // ignore quota errors
    }
  }

  return data as T;
}
