<template>
  <div class="container">
    <global-header :user='currentUser'></global-header>
    <loader v-if="isLoading" text="拼命加载中..."></loader>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from '@/components/GlobalHeader.vue'
import Footer from '@/components/Footer.vue'
import Loader from '@/components/Loader.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Footer,
    Loader
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    onMounted(() => {
      if (!currentUser.value.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser')
      }
    })
    return {
      currentUser,
      isLoading
    }
  }
})
</script>
