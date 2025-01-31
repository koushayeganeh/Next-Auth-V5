/**
 * Public Routes, these routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * Auth Routes, these routes are used for authentication
 * These routes will redirect loggedin users to /settings
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes started with this prefix are used for API authentication purposes
 * @type {string[]}
 */

export const apiAuthPrefix = ["/api/auth", "/api/sendEmail"];

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
export const DEFAULT_LOGOUT_REDIRECT = "/auth/login";
