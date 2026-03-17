import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    lib: {
      entry: 'src/index.js',
      name: 'FourteenConnect',
      fileName: (format) => `fourteen-connect.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [
        '@reown/appkit',
        '@reown/appkit-adapter-tron',
        'tronweb'
      ],
      output: {
        globals: {
          '@reown/appkit': 'AppKit',
          'tronweb': 'TronWeb'
        }
      }
    }
  }
});
