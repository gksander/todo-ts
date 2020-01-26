import axios from "axios";

/**
 * Create axios instance
 */
export const transporter = axios.create({
  baseURL: "api",
});
