/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        css: true,
    },
    plugins: [react()],
});
