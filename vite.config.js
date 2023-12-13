import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolve from 'unplugin-icons/resolver'
import { BootstrapVueNextResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        BootstrapVueNextResolver(),
        IconsResolve()
      ],
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@api': path.resolve(__dirname, 'src/api'),
    }
  },
  optimizeDeps: {
    force: true // 强制进行依赖预构建
  },
  css: {
    preprocessorOptions: {
        less: {
            modifyVars: {
                hack: `true; @import (reference) "${path.resolve("src/assets/css/base.less")}";`,
            },
            javascriptEnabled: true,
        },
    },
  },
  base: './',
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://127.0.0.1:8080',
  //       changeOrigin: true,
  //       ws: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   
  // }
  build: {
    outDir: 'page', // 打包文件的输出目录
    assetsDir: 'static', // 静态资源的存放目录
    assetsInlineLimit: 4096,
  }
})
