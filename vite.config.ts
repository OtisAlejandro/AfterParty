import { defineConfig } from "vite";
import { resolve } from 'path';

export default defineConfig({
  server: {
    proxy: {
      '/resend/emails': {
        secure: false,
        target: 'https://api.resend.com/emails',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/resend\/emails/, ''),
        headers: {
          'Authorization': 'Bearer re_Vqbc17HK_CsUU63Raa46BhNRziuYoS6F4'
        }
      }
    }
  },
})
