import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    port: 4000,
  },
  plugins: [commonjs({ include: 'html-to-image' }), vue(), vueJsx()],
  resolve: {
    alias: {
      'model-to-image': path.resolve(__dirname, '../../src'),
    },
  },
});
