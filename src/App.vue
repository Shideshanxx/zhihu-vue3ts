<template>
  <div class="container">
    <global-header :user='currentUser'></global-header>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import Footer from '@/components/Footer.vue'

const currentUser: UserProps = {
  isLogin: false,
  name: 'shideshan'
}
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Footer
  },
  setup () {
    return {
      currentUser
    }
  }
})
</script>
