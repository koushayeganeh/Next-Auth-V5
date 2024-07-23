/**
 * Public Routes, these routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/"];

/**
 * Auth Routes, these routes are used for authentication
 * These routes will redirect loggedin users to /settings
 * @type {string[]}
 */

export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * The prefix for API authentication routes
 * Routes started with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
