import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import postcssPxToViewport from 'postcss-px-to-viewport'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      // vant 按需引入
      Components({
        resolvers: [
          VantResolver()
        ],
      }),
    ],
    css: {
      postcss: {
        plugins: [
          postcssPxToViewport({
            unitToConvert: 'px', // 需要转换的单位，默认为"px"
            viewportWidth: 750, // 设计稿的视口宽度
            exclude: [/node_modules/], // 解决vant375,设计稿750问题。忽略某些文件夹下的文件或特定文件
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, //  是否直接更换属性值，而不添加备用属性
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: 'vw', // 横屏时使用的单位
            landscapeWidth: 1125
          })
        ]
      }
    },

    // 本地反向代理解决浏览器跨域限制
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: true, // 运行自动打开浏览器
      proxy: {
        '^/api': {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: path =>
            path.replace(new RegExp('^/api'), '')
        }
      }
    },

    resolve: {
      // Vite路径别名配置
      alias: {
        '@': path.resolve('./src')
      }
    }
  }
})
