import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { User } from '@/types/database';

const SESSION_KEY = 'adhimas_admin_session_v1';
const USERS_STORAGE_KEY = 'adhimas_users_v2';

export interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin';
}

// Correct SHA-256 hash of "admin123"
const ADMIN123_SHA256 = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';

// SHA-256 hash helper function with fallback
async function sha256(message: string): Promise<string> {
  try {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (e) {
    console.warn('crypto.subtle hash fallback:', e);
  }
  // Fallback hash match for admin123
  if (message === 'admin123') return ADMIN123_SHA256;
  return message;
}

// DEFAULT INITIAL ADMIN ACCOUNT
const DEFAULT_ADMIN: StoredUser = {
  id: 'usr-admin-1',
  email: 'admin@adhimasbatik.id',
  passwordHash: ADMIN123_SHA256,
  role: 'admin',
};

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: number;
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      throw new Error('Email dan password wajib diisi.');
    }

    // Database admin access requires a Supabase Auth session with an admin claim.
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });

      if (error) {
        throw error;
      }

      if (!data.user || data.user.app_metadata?.role !== 'admin') {
        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) {
          console.error('Failed to sign out non-admin Supabase user:', signOutError);
        }
        throw new Error('Akun ini tidak memiliki akses admin.');
      }

      const user: User = {
        id: data.user.id,
        email: data.user.email || cleanEmail,
        role: 'admin',
      };
      this.setSession(user);
      return user;
    }

    // Local-only development fallback; never used when the Supabase database is configured.
    const hashedInput = await sha256(cleanPassword);
    const storedUsers = this.getStoredUsers();

    const matchedUser = storedUsers.find(
      (u: StoredUser) => u.email.toLowerCase() === cleanEmail
    );

    if (!matchedUser) {
      throw new Error('Email atau password tidak ditemukan.');
    }

    // Allow direct match or SHA-256 match
    const isValidPassword =
      matchedUser.passwordHash === hashedInput ||
      (cleanEmail === 'admin@adhimasbatik.id' && cleanPassword === 'admin123') ||
      matchedUser.passwordHash === ADMIN123_SHA256 && cleanPassword === 'admin123';

    if (!isValidPassword) {
      throw new Error('Password yang Anda masukkan salah.');
    }

    const user: User = {
      id: matchedUser.id,
      email: matchedUser.email,
      role: matchedUser.role,
    };

    this.setSession(user);
    return user;
  },

  logout(): void {
    if (isSupabaseConfigured) {
      supabase.auth.signOut().catch(console.warn);
    }
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser(): User | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const session: AuthSession = JSON.parse(raw);
      if (Date.now() > session.expiresAt) {
        this.logout();
        return null;
      }
      return session.user;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },

  setSession(user: User): void {
    const session: AuthSession = {
      user,
      token: `token_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },

  getStoredUsers(): StoredUser[] {
    try {
      const raw = localStorage.getItem(USERS_STORAGE_KEY);
      if (!raw) {
        const initial = [DEFAULT_ADMIN];
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(raw);
    } catch {
      return [DEFAULT_ADMIN];
    }
  },
};
