/**
 * Application Mode.
 * @enum {string}
 * @readonly
 * @property {string} DEVELOPMENT - Development mode.
 * @property {string} PRODUCTION - Production mode.
 */

/** @type {AppMode} */
export const MODE = "DEVELOPMENT"; // DEVELOPMENT

/**
 * API Base URL.
 * @type {string}
 */
export const API_BASE_URL: string =
  MODE === "DEVELOPMENT"
    ? "http://localhost:8501/api"
    : "https://excel-to-json-backend.onrender.com/api";
