import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Lade die .env-Datei
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: process.env.VITE_HOST || '0.0.0.0', // Verwende den Wert aus .env oder einen Fallback
    port: parseInt(process.env.VITE_PORT || '45920', 10), // Verwende den Wert aus .env oder einen Fallback
  },
});