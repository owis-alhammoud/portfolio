const CACHE_NAME = 'image-cache'

async function getCache(): Promise<Cache> {
  if (typeof caches === 'undefined') {
    throw new Error('Cache storage not supported')
  }
  return caches.open(CACHE_NAME)
}

export async function getCachedImage(key: string): Promise<Blob | undefined> {
  try {
    const cache = await getCache()
    const res = await cache.match(key)
    if (res) {
      return await res.blob()
    }
  } catch {
    // ignore
  }
  return undefined
}

export async function setCachedImage(key: string, response: Response) {
  try {
    const cache = await getCache()
    await cache.put(key, response)
  } catch {
    // ignore
  }
}
