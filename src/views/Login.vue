<template>
  <div>
    <validate-form @form-submit='onFormSubmit'>
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input type="text" :rules="emailRules" v-model='emailVal' placeholder="请输入邮箱地址"></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input type="password" v-model="passwordVal" :rules="passwordRules" placeholder="请输入密码" />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'

export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const emailVal = ref('')
    const passwordVal = ref('')
    const store = useStore()
    const router = useRouter()
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        // 请求登录接口，将登陆状态存到localstorage
        store.commit('login', payload)
        console.log(store.state.user)
        router.push('/')
      }
    }
    return {
      emailVal,
      passwordVal,
      emailRules,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>

<style scoped>
</style>
