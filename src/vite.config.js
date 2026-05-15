import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        events: resolve(__dirname, "events.html"),
        replay: resolve(__dirname, "replay.html"),
        contact: resolve(__dirname, "contact.html"),
        inscription: resolve(__dirname, "inscription.html"),
        admin: resolve(__dirname, "admin.html"),
        organisateur: resolve(__dirname, "organisateur.html")
      }
    }
  }
});