// src/utils/auth.js
export const ROLES = {
  ADMIN: "ADMIN",
  ENGINEER: "ENGINEER",
  TECHNICIAN: "TECHNICIAN",
  VIEWER: "VIEWER",
};

export function hasRole(userRole, requiredRole) {
  return userRole === requiredRole;
}

export function hasAnyRole(userRole, allowedRoles = []) {
  return allowedRoles.includes(userRole);
}

/**
 * Contoh: hanya Admin & Engineer yang boleh ubah harga kabel
 */
export function canEditPricing(userRole) {
  return hasAnyRole(userRole, [ROLES.ADMIN, ROLES.ENGINEER]);
}

/**
 * Contoh: hanya Admin & Engineer yang boleh gambar jalur
 */
export function canPlanRoute(userRole) {
  return hasAnyRole(userRole, [ROLES.ADMIN, ROLES.ENGINEER]);
}

/**
 * Contoh: Technician boleh tambah ODP, tapi tidak ubah harga
 */
export function canAddOdp(userRole) {
  return hasAnyRole(userRole, [ROLES.ADMIN, ROLES.ENGINEER, ROLES.TECHNICIAN]);
}
