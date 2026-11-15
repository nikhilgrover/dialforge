import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  onSnapshot,
  query,
  where,
  type Unsubscribe
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import type { BaseComponent, WatchBuild, ScanJob, PartCategory } from '../types/watch';
import { partsDb } from '../db/partsDatabase';

const COMPONENTS_COLLECTION = 'components';
const BUILDS_COLLECTION = 'shared_builds';
const SCAN_JOBS_COLLECTION = 'scan_jobs';

/**
 * Seed all components from partsDb into Cloud Firestore.
 */
export async function seedCatalogToFirestore(onProgress?: (count: number, total: number) => void): Promise<{ success: boolean; count: number }> {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase credentials are not configured. Check your .env file.');
  }

  const allParts = partsDb.getAllComponents();
  let uploaded = 0;

  for (const part of allParts) {
    const docRef = doc(db, COMPONENTS_COLLECTION, part.id);
    await setDoc(docRef, {
      ...part,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    
    uploaded++;
    if (onProgress) {
      onProgress(uploaded, allParts.length);
    }
  }

  return { success: true, count: uploaded };
}

/**
 * Fetch components for a given category from Firestore (with local DB fallback)
 */
export async function fetchComponentsFromFirestore(category?: PartCategory): Promise<BaseComponent[]> {
  if (!isFirebaseConfigured || !db) {
    return partsDb.getAllComponents().filter(c => !category || c.category === category);
  }

  try {
    const collRef = collection(db, COMPONENTS_COLLECTION);
    const q = category ? query(collRef, where('category', '==', category)) : collRef;
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // If Firestore is empty, return local seeded parts
      return partsDb.getAllComponents().filter(c => !category || c.category === category);
    }

    return snapshot.docs.map(d => d.data() as BaseComponent);
  } catch (error) {
    console.warn('Firestore read error, falling back to local database:', error);
    return partsDb.getAllComponents().filter(c => !category || c.category === category);
  }
}

/**
 * Real-time listener for components (updates live when scanner discovers price drops)
 */
export function subscribeToLiveComponents(
  onUpdate: (components: BaseComponent[]) => void
): Unsubscribe | null {
  if (!isFirebaseConfigured || !db) {
    return null;
  }

  try {
    const collRef = collection(db, COMPONENTS_COLLECTION);
    return onSnapshot(collRef, (snapshot) => {
      if (!snapshot.empty) {
        const parts = snapshot.docs.map(d => d.data() as BaseComponent);
        onUpdate(parts);
      }
    }, (error) => {
      console.warn('Real-time Firestore listener error:', error);
    });
  } catch {
    return null;
  }
}

/**
 * Save a watch build to Firestore and return a clean short code (e.g. dialforge.app/b/skx42-diver)
 */
export async function saveBuildToFirestore(build: WatchBuild, buildName?: string): Promise<string> {
  // Generate clean 7-character alphanumeric short ID
  const shortId = Math.random().toString(36).substring(2, 9);

  const payload = {
    id: shortId,
    name: buildName || 'Custom Watch Build',
    createdAt: new Date().toISOString(),
    movementId: build.movement?.id || null,
    caseId: build.case?.id || null,
    dialId: build.dial?.id || null,
    handsId: build.hands?.id || null,
    secondsAccentId: build.secondsAccent?.id || null,
    bezelInsertId: build.bezelInsert?.id || null,
    rotorId: build.rotor?.id || null,
    spacerId: build.spacer?.id || null,
    strapId: build.strap?.id || null,
    selectedVendors: build.selectedVendors || {}
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, BUILDS_COLLECTION, shortId);
      await setDoc(docRef, payload);
    } catch (e) {
      console.warn('Could not save build to Firestore, saving to local cache:', e);
    }
  }

  // Also cache locally
  try {
    localStorage.setItem(`build_${shortId}`, JSON.stringify(payload));
  } catch {}

  return shortId;
}

/**
 * Load a shared build by short ID
 */
export async function loadBuildFromFirestore(shortId: string): Promise<any | null> {
  // Check local cache first
  try {
    const local = localStorage.getItem(`build_${shortId}`);
    if (local) return JSON.parse(local);
  } catch {}

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, BUILDS_COLLECTION, shortId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return snap.data();
      }
    } catch (e) {
      console.warn('Firestore load error:', e);
    }
  }

  return null;
}

/**
 * Record a scan job report to Firestore
 */
export async function recordScanJobToFirestore(job: ScanJob): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, SCAN_JOBS_COLLECTION, job.id);
      await setDoc(docRef, job);
    } catch (e) {
      console.warn('Error recording scan job to Firestore:', e);
    }
  }
}
