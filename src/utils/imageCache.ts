const CACHE_NAME = 'image-cache'

async function getCache(): Promise<Cache> {
  if (typeof caches === 'undefined') {
    throw new Error('Cache storage not supported')
  }
  return caches.open(CACHE_NAME)
}

let dbPromise: Promise<IDBDatabase> | undefined

async function getDb(): Promise<IDBDatabase> {
  if (typeof indexedDB === 'undefined') {
    throw new Error('IndexedDB not supported')
  }
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open('image-cache', 1)
      request.onupgradeneeded = () => {
        request.result.createObjectStore('images')
      }
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
  return dbPromise
}

async function getDbImage(key: string): Promise<Blob | undefined> {
  try {
    const db = await getDb()
    return await new Promise((resolve, reject) => {
      const tx = db.transaction('images', 'readonly')
      const store = tx.objectStore('images')
      const req = store.get(key)
      req.onsuccess = () => resolve(req.result as Blob | undefined)
      req.onerror = () => reject(req.error)
    })
  } catch {
    return undefined
  }
}

async function setDbImage(key: string, blob: Blob) {
  try {
    const db = await getDb()
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('images', 'readwrite')
      const store = tx.objectStore('images')
      const req = store.put(blob, key)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  } catch {
    // ignore
  }
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
  return getDbImage(key)
}

export async function setCachedImage(key: string, response: Response) {
  let stored = false
  try {
    const cache = await getCache()
    await cache.put(key, response.clone())
    stored = true
  } catch {
    // ignore
  }
  if (!stored) {
    try {
      const blob = await response.blob()
      await setDbImage(key, blob)
    } catch {
      // ignore
    }
  }
}
