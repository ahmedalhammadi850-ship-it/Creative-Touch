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
  } catch {
    // If document is too large (e.g. large image base64), save without the image
    try {
      const { imageBase64, ...rest } = request;
      await setDoc(doc(db, 'requests', request.id), { ...rest, hasImage: !!imageBase64 });
    } catch {
      // Firestore unavailable — local store remains the fallback
    }
  }
}

export async function updateRequestInFirestore(
  id: string,
  updates: Partial<AppRequest>,
): Promise<void> {
  try {
    await updateDoc(doc(db, 'requests', id), updates as Record<string, unknown>);
  } catch {
    // ignore
  }
}

export function subscribeToRequests(
  callback: (requests: AppRequest[]) => void,
): () => void {
  const q = query(collection(db, 'requests'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => d.data() as AppRequest)),
    () => callback([]),
  );
}

// ─── Users ───────────────────────────────────────────────────────────────────

export async function saveUserToFirestore(user: User): Promise<void> {
  try {
    await setDoc(doc(db, 'users', user.id), user, { merge: true });
  } catch {
    // ignore
  }
}

export async function updateUserInFirestore(
  userId: string,
  updates: Partial<User> & Record<string, unknown>,
): Promise<void> {
  try {
    await updateDoc(doc(db, 'users', userId), updates);
  } catch {
    // ignore
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
  } catch {
    // ignore
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

export function subscribeToUsers(
  callback: (users: User[]) => void,
): () => void {
  const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => d.data() as User)),
    () => callback([]),
  );
}
