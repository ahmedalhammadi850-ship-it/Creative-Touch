import {
  collection, doc, setDoc, updateDoc, getDoc,
  onSnapshot, query, orderBy, arrayUnion,
} from 'firebase/firestore';
import { db } from './firebase';
import type { AppRequest } from '../store/useRequestStore';
import type { User } from '../store/useAuthStore';

// ─── Requests ───────────────────────────────────────────────────────────────

export async function saveRequestToFirestore(request: AppRequest): Promise<void> {
  try {
    await setDoc(doc(db, 'requests', request.id), request);
  } catch (e1) {
    // Document may be too large (image base64) — retry without image
    try {
      const { imageBase64, ...rest } = request;
      await setDoc(doc(db, 'requests', request.id), { ...rest, hasImage: !!imageBase64 });
    } catch (e2) {
      console.warn('[Firestore] saveRequest failed:', e2);
    }
  }
}

export async function updateRequestInFirestore(
  id: string,
  updates: Partial<AppRequest>,
): Promise<void> {
  try {
    await updateDoc(doc(db, 'requests', id), updates as Record<string, unknown>);
  } catch (e) {
    console.warn('[Firestore] updateRequest failed:', e);
  }
}

/**
 * Subscribes to the requests collection in real-time.
 * onData  — called whenever data arrives (including empty array when collection is empty)
 * onError — called if Firestore is unavailable (e.g. rules block access); state stays null
 *           so the caller can fall back to localStorage.
 */
export function subscribeToRequests(
  onData: (requests: AppRequest[]) => void,
  onError?: () => void,
): () => void {
  const q = query(collection(db, 'requests'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((d) => d.data() as AppRequest)),
    (err) => {
      console.warn('[Firestore] subscribeToRequests error:', err.message);
      onError?.();
    },
  );
}

// ─── Users ───────────────────────────────────────────────────────────────────

export async function saveUserToFirestore(user: User): Promise<void> {
  try {
    await setDoc(doc(db, 'users', user.id), user, { merge: true });
  } catch (e) {
    console.warn('[Firestore] saveUser failed:', e);
  }
}

export async function updateUserInFirestore(
  userId: string,
  updates: Partial<User> & Record<string, unknown>,
): Promise<void> {
  try {
    await updateDoc(doc(db, 'users', userId), updates);
  } catch (e) {
    console.warn('[Firestore] updateUser failed:', e);
  }
}

export async function addActivatedTemplatesToFirestore(
  userId: string,
  templateKeys: string[],
): Promise<void> {
  try {
    await updateDoc(doc(db, 'users', userId), {
      activatedTemplates: arrayUnion(...templateKeys),
    });
  } catch (e) {
    console.warn('[Firestore] addActivatedTemplates failed:', e);
  }
}

export async function getUserFromFirestore(userId: string): Promise<User | null> {
  try {
    const snap = await getDoc(doc(db, 'users', userId));
    if (snap.exists()) return snap.data() as User;
    return null;
  } catch {
    return null;
  }
}

/**
 * Subscribes to the users collection in real-time.
 * onError — called if Firestore is unavailable; caller falls back to localStorage.
 */
export function subscribeToUsers(
  onData: (users: User[]) => void,
  onError?: () => void,
): () => void {
  const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((d) => d.data() as User)),
    (err) => {
      console.warn('[Firestore] subscribeToUsers error:', err.message);
      onError?.();
    },
  );
}
