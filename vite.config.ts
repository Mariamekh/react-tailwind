import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const cfClearance = env.CF_CLEARANCE?.trim();

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api2': {
          target: 'https://api2.myauto.ge',
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/api2/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader(
                'User-Agent',
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
              );
              proxyReq.setHeader('Accept', 'application/json, text/plain, */*');
              proxyReq.setHeader('Accept-Language', 'ka-GE,ka;q=0.9,en;q=0.8');
              proxyReq.setHeader('Origin', 'https://www.myauto.ge');
              proxyReq.setHeader('Referer', 'https://www.myauto.ge/');
              if (cfClearance) {
                proxyReq.setHeader('Cookie', `cf_clearance=${cfClearance}`);
              }
            });
          },
        },
        '/static-my': {
          target: 'https://static.my.ge',
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/static-my/, ''),
        },
      },
    },
  };
});
