/**Routes that doesn require auth
 *
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/new-verification",
  "/api/posts",
  "/api/comments",
  "/api/colleges"
];



/**Routes that  require auth
 *
 * @type {string[]}
 */
export const authRoutes = ["/sign-in", "/sign-up", "/reset", "/new-password"];

export const apiAuthPrefix = "/api/auth";

/**route after logging in
 *
 * @type {string[]}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export const ADMIN_DEFAULT_LOGIN_REDIRECT = "/admin/dashboard";
