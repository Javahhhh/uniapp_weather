import App from './App'
import uView from "@/uni_modules/uview-ui"
import AMapLoader from '@amap/amap-jsapi-loader'

Vue.use(uView)

AMapLoader.load({
  "key": "ad9daa4dbd6f2d8beb2be84b94f990fd",
  "version": "2.0"
}).then(() => {
  new Vue({
    render: h => h(App)
  }).$mount('#app')
})
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif