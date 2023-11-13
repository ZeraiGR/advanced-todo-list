import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

function resolve(dir: string) {
  return path.join(__dirname, "src", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": resolve("app"),
      "@pages": resolve("pages"),
      "@entities": resolve("entities"),
      "@features": resolve("features"),
      "@shared": resolve("shared"),
      "@widgets": resolve("widgets"),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3000, // you can replace this port with any port
  },
});
