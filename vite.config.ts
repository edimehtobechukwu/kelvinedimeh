import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                work: resolve(__dirname, 'work.html'),
                contact: resolve(__dirname, 'contact.html'),
                rentboss: resolve(__dirname, 'rentboss.html'),
                lumenone: resolve(__dirname, 'lumenone.html'),
                swittea: resolve(__dirname, 'swittea.html'),
                kml: resolve(__dirname, 'kml.html'),
            },
        },
    },
});
