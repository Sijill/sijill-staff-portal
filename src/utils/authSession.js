const AUTH_ROLE_KEY = 'userRole';

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  HEALTHCARE_PROVIDER: 'HEALTHCARE_PROVIDER',
  LAB: 'LAB',
  IMAGING_CENTER: 'IMAGING_CENTER',
};

const ROLE_HOME_PATHS = {
  [USER_ROLES.ADMIN]: '/',
  [USER_ROLES.HEALTHCARE_PROVIDER]: '/provider-session',
  [USER_ROLES.LAB]: '/lab-session',
  [USER_ROLES.IMAGING_CENTER]: '/imaging-session',
};

export function saveAuthenticatedRole(role) {
  if (typeof role === 'string' && role) {
    localStorage.setItem(AUTH_ROLE_KEY, role);
  }
}

export function getAuthenticatedRole() {
  return localStorage.getItem(AUTH_ROLE_KEY) || '';
}

export function clearAuthenticatedRole() {
  localStorage.removeItem(AUTH_ROLE_KEY);
}

export function isAuthenticatedUser() {
  return Boolean(localStorage.getItem('accessToken') && getAuthenticatedRole());
}

export function getRoleHomePath(role) {
  return ROLE_HOME_PATHS[role] || '/';
}
