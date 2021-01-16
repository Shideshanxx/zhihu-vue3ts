<template>
  <div class="container">
    <global-header :user='currentUser'></global-header>
    <!-- <column-list :list="list"></column-list> -->
    <login></login>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import Login from '@/views/Login.vue'

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1专栏',
    avatar: 'http://cdn.zjutshideshan.cn/1dfbe8d0-b4ff-11ea-ab69-a32ef6ab4e41',
    description: '专栏描述专栏描述专栏描述专栏描述专栏描述专栏描述专栏描述专栏描述专栏专栏描述专栏描述专栏描述专述专栏描述专栏描述专栏'
  },
  {
    id: 2,
    title: '苏静恒',
    avatar: 'http://cdn.zjutshideshan.cn/1dfbe8d0-b4ff-11ea-ab69-a32ef6ab4e41',
    description: '专栏描述专栏描述专栏描述专栏描述专栏描述专栏描述专栏描述专栏描述专栏描述'
  },
  {
    id: 3,
    title: 'test1专栏',
    // avatar: 'http://cdn.zjutshideshan.cn/1dfbe8d0-b4ff-11ea-ab69-a32ef6ab4e41',
    description: '专栏描述专栏描述专栏描述专栏描述专栏描述专栏描述专栏描述专栏描述专栏描述'
  },
  {
    id: 4,
    title: '苏静恒',
    avatar: 'http://cdn.zjutshideshan.cn/1dfbe8d0-b4ff-11ea-ab69-a32ef6ab4e41',
    description: '专栏描述专栏描述专栏描述专栏描述专栏描述专栏描述专栏描述专栏描述专栏描述'
  }
]
const currentUser: UserProps = {
  isLogin: true,
  name: 'shideshan'
}
export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader,
    Login
  },
  setup () {
    return {
      list: testData,
      currentUser
    }
  }
})
</script>
