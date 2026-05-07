import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBnjeJQ_PFW94Iu8ApFkgpQSu0qb4OhztA',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'projectcard-6a6dd.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'projectcard-6a6dd',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'projectcard-6a6dd.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '185997930117',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:185997930117:web:5b9dc4108ab857aefa03ec',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-9SW9B6RCZ5',
};

let auth: ReturnType<typeof getAuth>;
let firebaseReady = false;

try {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  firebaseReady = true;
} catch (e) {
  console.warn('Firebase initialization failed. Auth features will be unavailable.', e);
  auth = {} as ReturnType<typeof getAuth>;
}

export { auth, firebaseReady };

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  onAuthStateChanged,
};

export type { FirebaseUser };

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
