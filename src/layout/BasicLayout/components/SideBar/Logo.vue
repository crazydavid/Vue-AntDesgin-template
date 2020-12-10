<template>
  <div class="sidebar-logo-container">
    <router-link class="sidebar-logo-link" to="/">
      <img class="sidebar-logo" src="@/assets/logo.svg" alt>
      <h1 class="sidebar-title">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    collapsed: {
      type: Boolean
    }
  },
  setup(props, ctx) {
    const title = ref('Vue Ant Pro')
    return { title }
  }
})
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px;
  line-height: 32px;
  cursor: pointer;
  & .sidebar-logo-link {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;
    & .sidebar-logo {
      display: inline-block;
      height: 32px;
      vertical-align: middle;
    }
    & .sidebar-title {
      display: inline-block;
      height: 32px;
      margin: 0 0 0 12px;
      color: #fff;
      font-weight: 600;
      font-size: 18px;
      line-height: 32px;
      vertical-align: middle;
    }
  }
}
</style>
