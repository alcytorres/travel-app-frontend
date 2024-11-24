// NEW: vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // Ensure this is set correctly
    port: 5173,        // Ensure this matches your development port
    hmr: {
      protocol: 'ws',   // Ensure the protocol is 'ws' for WebSocket
      host: 'localhost',// Ensure the host is correct
      port: 5173,       // Ensure the port matches the server port
      clientPort: 5173, // NEW: Explicitly set the client port
    },
  },
});
