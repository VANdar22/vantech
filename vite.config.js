import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Only load the environment variables we need
  const env = loadEnv(mode, process.cwd(), ['VITE_']);
  
  // Explicitly define which environment variables should be exposed to the client
  const envWithProcessPrefix = {
    'process.env': {
      VITE_SUPABASE_URL: JSON.stringify(env.VITE_SUPABASE_URL),
      VITE_SUPABASE_ANON_KEY: JSON.stringify(env.VITE_SUPABASE_ANON_KEY)
    }
  };
  
  return {
    define: envWithProcessPrefix,
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    // Optional: Add server configuration for better development experience
    server: {
      port: 3000,
      open: true
    }
  };
});
