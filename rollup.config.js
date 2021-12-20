import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import nativePlugin from 'rollup-plugin-natives';

export default {
  input: './src/index.ts',
  output: {
    format: 'es',
    dir: 'dist',
  },
  plugins: [
    typescript({ declaration: false, module: 'esnext' }),
    resolve(),
    commonjs(),
    terser(),
    filesize(),
    json(),
    nativePlugin({
      // Where we want to physically put the extracted .node files
      copyTo: 'dist/libs',

      // Path to the same folder, relative to the output bundle js
      destDir: './libs',

      // Use `dlopen` instead of `require`/`import`.
      // This must be set to true if using a different file extension that '.node'
      dlopen: false,
      // Modify the final filename for specific modules
      // A function that receives a full path to the original file, and returns a desired filename
      // map: (modulePath) => 'filename.node',

      // Or a function that returns a desired file name and a specific destination to copy to
      // map: (modulePath) => { name: 'filename.node', copyTo: 'C:\\Dist\\libs\\filename.node' },

      // Generate sourcemap
      sourcemap: true,
    }),
  ],
};
