export function getFirebaseErrorMessage(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'البريد الإلكتروني مستخدم مسبقاً';
    case 'auth/invalid-email':
      return 'البريد الإلكتروني غير صحيح';
    case 'auth/weak-password':
      return 'كلمة المرور ضعيفة جداً، يجب أن تكون 6 أحرف على الأقل';
    case 'auth/user-not-found':
      return 'لا يوجد حساب بهذا البريد الإلكتروني';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
    case 'auth/too-many-requests':
      return 'تم تجاوز عدد المحاولات المسموحة. يرجى المحاولة لاحقاً';
    case 'auth/network-request-failed':
      return 'خطأ في الاتصال بالإنترنت';
    case 'auth/user-disabled':
      return 'تم تعطيل هذا الحساب';
    case 'auth/invalid-api-key':
      return 'إعدادات التطبيق غير مكتملة. يرجى التواصل مع الدعم';
    default:
      return 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى';
  }
}

interface LocalUser {
  uid: string;
  email: string;
  displayName: string | null;
  emailVerified: boolean;
}

let _currentUser: LocalUser | null = null;

const USERS_KEY = 'local_auth_users';
const SESSION_KEY = 'local_auth_session';

interface StoredUser {
  uid: string;
  email: string;
  displayName: string | null;
  passwordHash: string;
}

function getStoredUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36) + password.length.toString(36);
}

function generateUid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function loadSession() {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      _currentUser = JSON.parse(stored);
    }
  } catch {
    _currentUser = null;
  }
}

loadSession();

export const auth = {
  get currentUser() {
    return _currentUser;
  },
};

export const firebaseReady = true;

export async function createUserWithEmailAndPassword(
  _auth: typeof auth,
  email: string,
  password: string
): Promise<{ user: LocalUser & { reload: () => Promise<void> } }> {
  const users = getStoredUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    const err = new Error('Email already in use') as Error & { code: string };
    err.code = 'auth/email-already-in-use';
    throw err;
  }
  const uid = generateUid();
  const newUser: StoredUser = {
    uid,
    email: email.toLowerCase(),
    displayName: null,
    passwordHash: hashPassword(password),
  };
  users.push(newUser);
  saveStoredUsers(users);
  const localUser: LocalUser = { uid, email: email.toLowerCase(), displayName: null, emailVerified: true };
  _currentUser = localUser;
  localStorage.setItem(SESSION_KEY, JSON.stringify(localUser));
  return {
    user: {
      ...localUser,
      reload: async () => {},
    },
  };
}

export async function signInWithEmailAndPassword(
  _auth: typeof auth,
  email: string,
  password: string
): Promise<{ user: LocalUser & { reload: () => Promise<void> } }> {
  const users = getStoredUsers();
  const stored = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!stored) {
    const err = new Error('User not found') as Error & { code: string };
    err.code = 'auth/user-not-found';
    throw err;
  }
  if (stored.passwordHash !== hashPassword(password)) {
    const err = new Error('Wrong password') as Error & { code: string };
    err.code = 'auth/invalid-credential';
    throw err;
  }
  const localUser: LocalUser = {
    uid: stored.uid,
    email: stored.email,
    displayName: stored.displayName,
    emailVerified: true,
  };
  _currentUser = localUser;
  localStorage.setItem(SESSION_KEY, JSON.stringify(localUser));
  return {
    user: {
      ...localUser,
      reload: async () => {},
    },
  };
}

export async function sendEmailVerification(_user: LocalUser): Promise<void> {
}

export async function sendPasswordResetEmail(_auth: typeof auth, _email: string): Promise<void> {
}

export async function resetLocalPassword(email: string, newPassword: string): Promise<void> {
  const users = getStoredUsers();
  const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (idx === -1) {
    const err = new Error('User not found') as Error & { code: string };
    err.code = 'auth/user-not-found';
    throw err;
  }
  users[idx].passwordHash = hashPassword(newPassword);
  saveStoredUsers(users);
}

export async function updateProfile(
  _user: LocalUser,
  profile: { displayName?: string }
): Promise<void> {
  if (_currentUser && profile.displayName !== undefined) {
    _currentUser = { ..._currentUser, displayName: profile.displayName };
    localStorage.setItem(SESSION_KEY, JSON.stringify(_currentUser));
    const users = getStoredUsers();
    const idx = users.findIndex(u => u.uid === _currentUser!.uid);
    if (idx !== -1) {
      users[idx].displayName = profile.displayName ?? null;
      saveStoredUsers(users);
    }
  }
}

export async function signOut(_auth: typeof auth): Promise<void> {
  _currentUser = null;
  localStorage.removeItem(SESSION_KEY);
}

export function onAuthStateChanged(
  _auth: typeof auth,
  callback: (user: LocalUser | null) => void
): () => void {
  callback(_currentUser);
  return () => {};
}

export type { LocalUser as FirebaseUser };
