import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

const port = (Number(process.env.PORT) as number) || 3000;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: port,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
});
