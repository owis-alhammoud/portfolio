const DB_NAME = 'image-cache'
const STORE_NAME = 'images'
const VERSION = 1

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not supported'))
      return
    }
    const request = indexedDB.open(DB_NAME, VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

let dbPromise: Promise<IDBDatabase> | null = null
function getDb() {
  if (!dbPromise) {
    dbPromise = openDb()
  }
  return dbPromise
}

export async function getCachedImage(key: string): Promise<string | undefined> {
  try {
    const db = await getDb()
    return new Promise(resolve => {
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)
      const req = store.get(key)
      req.onsuccess = () => resolve(req.result as string | undefined)
      req.onerror = () => resolve(undefined)
    })
  } catch {
    return undefined
  }
}

export async function setCachedImage(key: string, data: string) {
  try {
    const db = await getDb()
    return new Promise<void>(resolve => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      store.put(data, key)
      tx.oncomplete = () => resolve()
      tx.onerror = () => resolve()
    })
  } catch {
    // ignore errors
  }
}
