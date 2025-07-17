const CACHE_NAME = 'image-cache'

async function getCache(): Promise<Cache> {
  if (typeof caches === 'undefined') {
    throw new Error('Cache storage not supported')
  }
  return caches.open(CACHE_NAME)
}

export async function getCachedImage(key: string): Promise<string | undefined> {
  try {
    const cache = await getCache()
    const res = await cache.match(key)
    if (res) {
      return await res.text()
    }
  } catch {
    // ignore
  }
  return undefined
}

export async function setCachedImage(key: string, data: string) {
  try {
    const cache = await getCache()
    await cache.put(key, new Response(data))
  } catch {
    // ignore
  }
}
