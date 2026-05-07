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
    case 'auth/expired-action-code':
      return 'انتهت صلاحية رابط التحقق. يرجى طلب رابط جديد';
    case 'auth/invalid-action-code':
      return 'رابط التحقق غير صالح';
    default:
      return 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى';
  }
}

import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
auth.languageCode = 'ar';

export const firebaseReady = !!(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID
);

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  onAuthStateChanged,
};

export type FirebaseUser = User;
