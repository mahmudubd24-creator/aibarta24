/**
 * AI Barta 24 - Secure Private Admin Authentication & Cryptography Service
 * Provides:
 * - PBKDF2-SHA-256 salted password hashing (100,000 iterations)
 * - Cryptographically random salt & session generation via Web Crypto API
 * - Zero hardcoded credentials & zero plain-text storage
 * - Rate limiting / brute-force lockout protection (5 attempts -> 5 min cooldown)
 * - First-time Admin Setup lifecycle & permanent lockout
 * - Password change with current-password cryptographic verification
 */

const STORAGE_KEYS = {
  ADMIN_ACCOUNT: 'aibarta24_admin_account_v1',
  ADMIN_SESSION: 'aibarta24_admin_session_v1',
  LOGIN_ATTEMPTS: 'aibarta24_admin_attempts_v1',
};

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes in milliseconds
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export interface AdminAccountRecord {
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
  updatedAt: string;
  setupCompleted: boolean;
}

export interface AdminSession {
  token: string;
  email: string;
  expiresAt: number;
}

interface AttemptTracker {
  count: number;
  lockedUntil: number | null;
}

/**
 * Generate cryptographically secure random salt (hex string)
 */
export function generateSalt(length = 16): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Generate cryptographically secure session token
 */
export function generateSessionToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Hash password with PBKDF2 + SHA-256 and 100,000 iterations
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: enc.encode(salt),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );

  const hashArray = Array.from(new Uint8Array(derivedBits));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Constant-time comparison to prevent timing attacks
 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Check if the first admin setup has already been completed
 */
export function isAdminSetupCompleted(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_ACCOUNT);
    if (!raw) return false;
    const data: AdminAccountRecord = JSON.parse(raw);
    return Boolean(data && data.setupCompleted && data.email && data.passwordHash);
  } catch {
    return false;
  }
}

/**
 * Retrieve admin account metadata (never exposes password)
 */
export function getAdminAccount(): AdminAccountRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_ACCOUNT);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Create the first admin account (can ONLY be run once)
 */
export async function createFirstAdmin(
  email: string,
  plainPassword: string
): Promise<{ success: boolean; message: string }> {
  if (isAdminSetupCompleted()) {
    return {
      success: false,
      message: 'Admin setup has already been completed and locked for security.',
    };
  }

  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, message: 'Please provide a valid Gmail / Email address.' };
  }

  if (!plainPassword || plainPassword.length < 8) {
    return {
      success: false,
      message: 'Password must be at least 8 characters long.',
    };
  }

  const salt = generateSalt(16);
  const passwordHash = await hashPassword(plainPassword, salt);
  const now = new Date().toISOString();

  const record: AdminAccountRecord = {
    email: cleanEmail,
    passwordHash,
    salt,
    createdAt: now,
    updatedAt: now,
    setupCompleted: true,
  };

  localStorage.setItem(STORAGE_KEYS.ADMIN_ACCOUNT, JSON.stringify(record));

  // Automatically start an authenticated session
  const sessionToken = generateSessionToken();
  const session: AdminSession = {
    token: sessionToken,
    email: cleanEmail,
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };
  localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(session));
  resetLoginAttempts();

  return { success: true, message: 'Admin account created securely!' };
}

/**
 * Manage brute-force login attempts & temporary lockout
 */
function getAttemptTracker(): AttemptTracker {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
    if (!raw) return { count: 0, lockedUntil: null };
    return JSON.parse(raw);
  } catch {
    return { count: 0, lockedUntil: null };
  }
}

export function isAccountLocked(): { locked: boolean; remainingSeconds: number } {
  const tracker = getAttemptTracker();
  if (tracker.lockedUntil && tracker.lockedUntil > Date.now()) {
    const remainingSeconds = Math.ceil((tracker.lockedUntil - Date.now()) / 1000);
    return { locked: true, remainingSeconds };
  }
  return { locked: false, remainingSeconds: 0 };
}

function recordFailedAttempt(): number {
  const tracker = getAttemptTracker();
  tracker.count += 1;
  if (tracker.count >= MAX_FAILED_ATTEMPTS) {
    tracker.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
  }
  localStorage.setItem(STORAGE_KEYS.LOGIN_ATTEMPTS, JSON.stringify(tracker));
  return tracker.count;
}

export function resetLoginAttempts(): void {
  localStorage.removeItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
}

/**
 * Authenticate Admin with email + password
 */
export async function authenticateAdmin(
  email: string,
  plainPassword: string
): Promise<{ success: boolean; message: string; session?: AdminSession }> {
  // Check lockout status
  const lock = isAccountLocked();
  if (lock.locked) {
    return {
      success: false,
      message: `Too many failed login attempts. Protected lock active. Please wait ${lock.remainingSeconds} seconds.`,
    };
  }

  const account = getAdminAccount();
  if (!account || !account.setupCompleted) {
    return {
      success: false,
      message: 'No Admin account has been configured yet. Please complete first-time setup.',
    };
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanInputPass = plainPassword || '';

  // Verify email matches
  if (cleanEmail !== account.email.toLowerCase()) {
    const attempts = recordFailedAttempt();
    const remaining = MAX_FAILED_ATTEMPTS - attempts;
    return {
      success: false,
      message: remaining > 0
        ? `Invalid credentials. (${remaining} attempt${remaining === 1 ? '' : 's'} remaining)`
        : 'Account temporarily locked due to repeated failed attempts.',
    };
  }

  // Hash input password with stored salt
  const computedHash = await hashPassword(cleanInputPass, account.salt);

  if (!constantTimeEqual(computedHash, account.passwordHash)) {
    const attempts = recordFailedAttempt();
    const remaining = MAX_FAILED_ATTEMPTS - attempts;
    return {
      success: false,
      message: remaining > 0
        ? `Invalid credentials. (${remaining} attempt${remaining === 1 ? '' : 's'} remaining)`
        : 'Account temporarily locked due to repeated failed attempts.',
    };
  }

  // Success: Clear attempts & generate fresh session token
  resetLoginAttempts();
  const sessionToken = generateSessionToken();
  const session: AdminSession = {
    token: sessionToken,
    email: account.email,
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };
  localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(session));

  return { success: true, message: 'Authentication successful', session };
}

/**
 * Check if the current session is valid and active
 */
export function getActiveAdminSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
    if (!raw) return null;
    const session: AdminSession = JSON.parse(raw);
    if (!session || !session.token || !session.expiresAt) return null;

    if (Date.now() > session.expiresAt) {
      // Session expired
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Terminate admin session (Logout)
 */
export function logoutAdminSession(): void {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
}

/**
 * Change Admin Password with verification of current password
 */
export async function changeAdminPassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  const account = getAdminAccount();
  if (!account) {
    return { success: false, message: 'Admin account not found.' };
  }

  if (!newPassword || newPassword.length < 8) {
    return { success: false, message: 'New password must be at least 8 characters long.' };
  }

  // Verify current password
  const currentComputed = await hashPassword(currentPassword, account.salt);
  if (!constantTimeEqual(currentComputed, account.passwordHash)) {
    return { success: false, message: 'Current password is incorrect.' };
  }

  // Generate new salt and hash for new password
  const newSalt = generateSalt(16);
  const newHash = await hashPassword(newPassword, newSalt);

  account.passwordHash = newHash;
  account.salt = newSalt;
  account.updatedAt = new Date().toISOString();

  localStorage.setItem(STORAGE_KEYS.ADMIN_ACCOUNT, JSON.stringify(account));

  // Refresh session
  const newSessionToken = generateSessionToken();
  const newSession: AdminSession = {
    token: newSessionToken,
    email: account.email,
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };
  localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(newSession));

  return { success: true, message: 'Password changed successfully!' };
}
