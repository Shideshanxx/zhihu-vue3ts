<template>
  <div class="container">
    <global-header :user='currentUser'></global-header>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from '@/components/GlobalHeader.vue'
import Footer from '@/components/Footer.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Footer
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    return {
      currentUser
    }
  }
})
</script>
