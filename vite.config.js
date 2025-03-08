import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Correct import

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // Use the imported plugin
});