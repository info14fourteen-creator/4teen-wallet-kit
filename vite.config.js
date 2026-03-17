import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: false,
    target: 'es2020',
    lib: {
      entry: 'src/index.js',
      name: 'FourteenConnect',
      fileName: (format) => `fourteen-connect.${format}.js`,
      formats: ['es', 'umd']
    },
    rolldownOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.names && assetInfo.names.some((name) => name.endsWith('.css'))) {
            return '4teen-wallet-kit.css';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
