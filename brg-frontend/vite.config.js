import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    port: 5173,  // Force this specific port
    strictPort: true  // Fail if port is already in use
  }
});
