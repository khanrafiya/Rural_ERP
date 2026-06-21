// Guarded PWA service worker registration.
// Never registers in dev / iframe / ?sw=off.

const SW_PATH = "/sw.js";

async function unregisterMatching() {
  if (!("serviceWorker" in navigator)) return;
  try {
    const regs = await navigator.serviceWorker.getRegistrations();
    await Promise.all(
      regs
        .filter((r) => {
          const url = r.active?.scriptURL || r.installing?.scriptURL || r.waiting?.scriptURL || "";
          return url.endsWith(SW_PATH);
        })
        .map((r) => r.unregister()),
    );
  } catch {
    /* ignore */
  }
}

export function registerPWA() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;

  const inIframe = window.self !== window.top;
  const url = new URL(window.location.href);
  const killSwitch = url.searchParams.get("sw") === "off";
  const isProd = import.meta.env.PROD;

  if (!isProd || inIframe || killSwitch) {
    void unregisterMatching();
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register(SW_PATH).catch(() => {
      /* ignore registration errors */
    });
  });
}
