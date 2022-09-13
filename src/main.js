import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'

// 全局样式
import "./styles/index.scss"

const app = createApp(App)
app.use(router).use(createPinia())
app.mount('#app')