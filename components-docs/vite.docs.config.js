import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const rootDir = import.meta.dirname;
const packages = path.resolve(rootDir, '../packages');

export default defineConfig({
  root: rootDir,
  base: './',
  plugins: [
    {
      name: 'force-jsx-for-js',
      enforce: 'pre',
      async transform(code, id) {
        if (id.includes('/packages/') && id.endsWith('.js')) {
          const { transformSync } = await import('esbuild');
          const result = transformSync(code, {
            loader: 'jsx',
            jsx: 'automatic',
            jsxImportSource: 'react',
          });
          return { code: result.code, map: result.map || null };
        }
      },
    },
    react({
      include: [/\.(jsx|tsx)$/],
    }),
  ],
  server: {
    port: 5188,
    open: '/docs.html',
  },
  build: {
    rollupOptions: {
      input: path.resolve(rootDir, 'docs.html'),
    },
  },
  resolve: {
    alias: {
      '@ui/components': path.resolve(packages, 'mui-material/src'),
      '@mui/material': path.resolve(packages, 'mui-material/src'),
      '@mui/system': path.resolve(packages, 'mui-system/src'),
      '@mui/utils': path.resolve(packages, 'mui-utils/src'),
      '@mui/styled-engine': path.resolve(packages, 'mui-styled-engine/src'),
      '@mui/private-theming': path.resolve(packages, 'mui-private-theming/src'),
      '@mui/types': path.resolve(packages, 'mui-types'),
      'prop-types': path.resolve(rootDir, 'node_modules/prop-types/index.js'),
      clsx: path.resolve(rootDir, 'node_modules/clsx/dist/clsx.js'),
      '@emotion/react': path.resolve(rootDir, 'node_modules/@emotion/react/dist/emotion-react.esm.js'),
      '@emotion/styled': path.resolve(rootDir, 'node_modules/@emotion/styled/dist/emotion-styled.esm.js'),
      '@emotion/serialize': path.resolve(rootDir, 'node_modules/@emotion/serialize/dist/emotion-serialize.esm.js'),
      '@emotion/utils': path.resolve(rootDir, 'node_modules/@emotion/utils/dist/emotion-utils.esm.js'),
      '@emotion/use-insertion-effect-with-fallbacks': path.resolve(
        rootDir,
        'node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.esm.js',
      ),
      '@emotion/cache': path.resolve(rootDir, 'node_modules/@emotion/cache/dist/emotion-cache.esm.js'),
      '@emotion/sheet': path.resolve(rootDir, 'node_modules/@emotion/sheet/dist/emotion-sheet.esm.js'),
      '@emotion/unitless': path.resolve(rootDir, 'node_modules/@emotion/unitless/dist/emotion-unitless.esm.js'),
      '@emotion/weak-memoize': path.resolve(rootDir, 'node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js'),
      '@emotion/memoize': path.resolve(rootDir, 'node_modules/@emotion/memoize/dist/emotion-memoize.esm.js'),
      '@emotion/hash': path.resolve(rootDir, 'node_modules/@emotion/hash/dist/emotion-hash.esm.js'),
      '@emotion/is-prop-valid': path.resolve(rootDir, 'node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js'),
      'react-is': path.resolve(rootDir, 'node_modules/react-is/index.js'),
      'react-transition-group': path.resolve(rootDir, 'node_modules/react-transition-group/esm/index.js'),
      '@popperjs/core': path.resolve(rootDir, 'node_modules/@popperjs/core/lib/index.js'),
      'react/jsx-dev-runtime': path.resolve(rootDir, 'node_modules/react/jsx-dev-runtime.js'),
      'react/jsx-runtime': path.resolve(rootDir, 'node_modules/react/jsx-runtime.js'),
      react: path.resolve(rootDir, 'node_modules/react'),
      'react-dom/client': path.resolve(rootDir, 'node_modules/react-dom/client.js'),
      'react-dom': path.resolve(rootDir, 'node_modules/react-dom'),
      'echarts-for-react': path.resolve(rootDir, 'node_modules/echarts-for-react/esm/index.js'),
      'echarts/core': path.resolve(rootDir, 'node_modules/echarts/core.js'),
      'echarts': path.resolve(rootDir, 'node_modules/echarts/index.js'),
      'dayjs': path.resolve(rootDir, 'node_modules/dayjs'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('development'),
  },
  optimizeDeps: {
    include: ['react-router-dom', 'react-router', 'prism-react-renderer'],
  },
});
