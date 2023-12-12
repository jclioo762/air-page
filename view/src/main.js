import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from '@/router';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'


const app = createApp(App)
app.use(router)
app.mount('#app')