import { defineConfig } from 'vite';

export default defineConfig({
  // This config is optional for basic setups
  server: {
    open: true,  // Automatically open the app in the browser on startup
  },
  base: 'https://github.com/yadavnan/todolist.git', // Replace with the name of your repository
});
