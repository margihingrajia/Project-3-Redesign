import { writable } from "svelte/store";

export const route = writable({ page: "list", id: null });

function parseHash() {
  const hash = location.hash.slice(1);

  if (!hash) {
    route.set({ page: "list", id: null });
    return;
  }

  const parts = hash.split("/");

  if (parts[0] === "apartment" && parts[1]) {
    route.set({ page: "detail", id: parts[1] });
  } else {
    route.set({ page: "list", id: null });
  }
}

window.addEventListener("hashchange", parseHash);
parseHash(); // initialize
