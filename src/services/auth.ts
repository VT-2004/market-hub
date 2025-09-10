export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: number;
}

const USERS_KEY = 'app_users_v1';
const SESSION_KEY = 'app_session_v1';

function getUsers(): UserRecord[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function setUsers(users: UserRecord[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function hash(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return `h${Math.abs(h)}`;
}

export function register(email: string, password: string): { ok: boolean; error?: string } {
  const users = getUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) return { ok: false, error: 'Email already registered' };
  const user: UserRecord = {
    id: crypto.randomUUID(),
    email,
    passwordHash: hash(password),
    createdAt: Date.now(),
  };
  users.push(user);
  setUsers(users);
  localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, email: user.email }));
  return { ok: true };
}

export function login(email: string, password: string): { ok: boolean; error?: string } {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { ok: false, error: 'Invalid credentials' };
  if (user.passwordHash !== hash(password)) return { ok: false, error: 'Invalid credentials' };
  localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, email: user.email }));
  return { ok: true };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): { userId: string; email: string } | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

export function exportUsersJson(): string {
  return JSON.stringify(getUsers(), null, 2);
}


