/**Routes that doesn require auth
 *
 * @type {string[]}
 */
export const publicRoutes = ["/", "/new-verification"];

/**Routes that  require auth
 *
 * @type {string[]}
 */
export const authRoutes = ["/sign-in", "/sign-up"];

export const apiAuthPrefix = "/api/auth";

/**route after logging in
 *
 * @type {string[]}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
