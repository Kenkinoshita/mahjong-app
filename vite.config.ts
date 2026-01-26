import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const modeEnv = loadEnv(mode, process.cwd(), '');
  const BASE_PATH = modeEnv?.BASE_PATH ?? './';

  return {
    // for sub directory
    base: BASE_PATH,
    plugins: [react()],
    server: {
      port: 8080,
      allowedHosts: true,
    },
    resolve: {
      alias: [{ find: '@/', replacement: '/src/' }],
    },
    build: {
      // rollupOptions: {
      //   output: {
      //     // ビルド時の出力ファイル名にハッシュ値を含めないようにする
      //     // @see https://funbrew.tech/2023/03/25/4011/
      //     entryFileNames: `assets/[name].js`,
      //     chunkFileNames: `assets/[name].js`,
      //     assetFileNames: `assets/[name].[ext]`,
      //   },
      // },
    },
  };
});
