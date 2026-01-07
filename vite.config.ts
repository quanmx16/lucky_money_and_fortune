import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    base: process.env.GITHUB_ACTIONS ? '/lucky_money_and_fortune/' : '/',
    plugins: [react()],
    define: {
      // This allows process.env.API_KEY to work in the frontend code
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})