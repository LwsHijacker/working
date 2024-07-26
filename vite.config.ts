import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@redux ": path.resolve(__dirname, "src/redux"),
            "@images ": path.resolve(__dirname, "src/assets/images"),
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                // 全局变量
                modifyVars: {},
                javascriptEnabled: true,
                additionalData: `@import "src/assets/less/var.less";`,
            },
        },
    },
    server: {
        host: '0.0.0.0',
        port: 8229,
        proxy: {
            "/api": {
                // target: "http://192.168.110.107:8070",
                target: "http://localhost:8899",
                changeOrigin: true,
            },
        },
    },
})
