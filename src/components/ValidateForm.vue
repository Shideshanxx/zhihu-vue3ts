<template>
  <form class="validate-form-container">
    <slot></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang='ts'>
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
export const emitter = mitt()

type ValidateFunc = () => boolean

export default defineComponent({
  emits: ['form-submit'],
  setup (props, context) {
    let funcArr: ValidateFunc[] = []
    const submitForm = () => {
      // 用map遍历执行funcArr中的每一个func，用every遍历所有执行结果，当全部为true时返回true
      // 为什么不funcArr.every(func => func())，因为当every碰到了某一项为false会终止遍历，即余下的input不会执行validate，页面上部分验证信息看不到，所以要用map先保证运行每一个函数
      const result = funcArr.map(func => func()).every(result => result)
      // 将validate结果emit出去，在父组件中监听
      context.emit('form-submit', result)
    }
    const callback = (func?: ValidateFunc) => {
      if (func) {
        funcArr.push(func)
      }
    }
    // 监听子组件(validateInput，每初始化一个validateInput就会emit出一个该事件)emit出来的事件，将它们push到funcArr中
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    return {
      submitForm
    }
  }
})
</script>
