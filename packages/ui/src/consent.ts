/**
 * Lightweight consent state shared between the consent banner and ad slots.
 *
 * Consent is stored in localStorage and broadcast via a window event so that
 * every <AdPlacement> on the page reacts the moment the user accepts or declines,
 * without a page reload. AdSense (a non-cookieless network) must not load until
 * consent is "granted".
 */
export type ConsentState = "granted" | "denied" | "unset";

const STORAGE_KEY = "peregrine-consent";
const EVENT = "peregrine-consent-change";

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return "unset";
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "granted" || v === "denied" ? v : "unset";
}

export function setConsent(value: Exclude<ConsentState, "unset">): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

/** Subscribe to consent changes (fires on same-tab set and cross-tab storage). */
export function subscribeConsent(cb: (state: ConsentState) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onEvent = () => cb(getConsent());
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb(getConsent());
  };
  window.addEventListener(EVENT, onEvent);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onEvent);
    window.removeEventListener("storage", onStorage);
  };
}
