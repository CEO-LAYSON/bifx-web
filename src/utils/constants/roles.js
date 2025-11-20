export const ROLES = {
  USER: 'ROLE_USER',
  ADMIN: 'ROLE_ADMIN',
  INSTRUCTOR: 'ROLE_INSTRUCTOR'
}

export const hasRole = (userRoles, requiredRole) => {
  return userRoles?.includes(requiredRole)
}

export const hasAnyRole = (userRoles, requiredRoles) => {
  return requiredRoles.some(role => userRoles?.includes(role))
}