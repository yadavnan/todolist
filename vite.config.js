import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true,  // Automatically open the app in the browser on startup
  },
  base: '/todolist/', // Set this to the repository name, not the full URL
});
