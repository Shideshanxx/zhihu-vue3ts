import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'
import App from './App.vue'

// axios拦截器
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  return config
})
axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)
  return config
}, e => {
  store.commit('setLoading', false)
  return Promise.reject(e.response.data)
})

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
