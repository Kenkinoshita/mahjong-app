/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    include: ['src/**/*.test.*'],
    unstubEnvs: true,
    coverage: {
      include: ['src/**'],
      exclude: [
        'src/{components,styles,templates}/**/*',
        'src/**/consts/**/*',
        'src/**/[A-Z]*.tsx',
        'src/*.tsx',
        ...coverageConfigDefaults.exclude,
      ],
      reportsDirectory: './docs/coverage',
      reporter: ['html', 'text'],
      reportOnFailure: true,
      // TODO: 後で修正する
      // thresholds: {
      //   statements: 85,
      //   branches: 80,
      //   functions: 85,
      //   lines: 80,
      // },
    },
  },
  resolve: {
    alias: [
      { find: '@/', replacement: '/src/' },
      { find: '@common/', replacement: '/common/src/' },
    ],
  },
});
