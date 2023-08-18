import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
        port: 3000,
        host: true,
        strictPort: true,
        watch: {
            usePolling: true
        }
    }
})
