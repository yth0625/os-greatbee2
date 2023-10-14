import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin', 'babel-plugin-macros'],
      },
    }),
  ],
  define: {
    'process.env': process.env,
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        // target: 'https://eprocurement.greatbee.kr',
        target: 'https://test2.greatbee.co.kr',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
