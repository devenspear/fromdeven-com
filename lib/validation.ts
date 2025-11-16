import { CARD_CONTENT } from "@/config/cardContent";

/**
 * Validates an invite code against the configured code
 * @param code - The code to validate (will be normalized)
 * @returns true if code matches, false otherwise
 */
export function validateInviteCode(code: string): boolean {
  const normalizedInput = code.trim().toUpperCase();
  const normalizedValid = CARD_CONTENT.inviteCode.trim().toUpperCase();

  return normalizedInput === normalizedValid;
}

/**
 * Storage key for access validation
 */
const ACCESS_STORAGE_KEY = "fromdeven_validated";

/**
 * Marks the user as validated in session storage
 */
export function setValidated(): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(ACCESS_STORAGE_KEY, "true");
  }
}

/**
 * Checks if the user has been validated
 * @returns true if validated, false otherwise
 */
export function isValidated(): boolean {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(ACCESS_STORAGE_KEY) === "true";
  }
  return false;
}

/**
 * Clears the validation state
 */
export function clearValidation(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ACCESS_STORAGE_KEY);
  }
}
