<template>
  <div class="container">
    <global-header :user='currentUser'></global-header>
    <!-- <column-list :list="list"></column-list> -->
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules" v-model='emailVal' placeholder="请输入邮箱地址"></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <button type="submit" class="btn btn-primary">提交</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import validateInput, { RulesProp } from '@/components/ValidateInput.vue'
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
    validateInput
  },
  setup () {
    const emailVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    return {
      list: testData,
      currentUser,
      emailVal,
      emailRules
    }
  }
})
</script>
