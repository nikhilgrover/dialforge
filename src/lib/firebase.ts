import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  getFirestore,
  type Firestore
} from 'firebase/firestore';

function getEnv(key: string): string | undefined {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && key in import.meta.env) {
      return (import.meta.env as Record<string, string | undefined>)[key];
    }
  } catch {
    // import.meta.env not available
  }
  const proc = typeof globalThis !== 'undefined'
    ? (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process
    : undefined;
  if (proc?.env && key in proc.env) {
    return proc.env[key];
  }
  return undefined;
}

// Environment configuration supporting both Vite and Node.js CLI
export const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY'),
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('VITE_FIREBASE_APP_ID')
};

// Check if valid Firebase credentials have been configured
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'YOUR_API_KEY'
);

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

    // In browser: enable multi-tab persistent local cache (IndexedDB) for near-zero reads
    // In Node.js / CLI: use standard Firestore instance
    if (typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined') {
      db = initializeFirestore(app, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager()
        })
      });
    } else {
      db = getFirestore(app);
    }
  } catch (error) {
    console.warn('Firebase initialization error:', error);
  }
}

export { app, db };
