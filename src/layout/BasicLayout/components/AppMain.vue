<template>
  <layout-content class="app-main">
    <router-view v-slot="{Component}">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" /></transition>
    </router-view>
  </layout-content>
  <layout-footer>footer</layout-footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Layout } from 'ant-design-vue'
export default defineComponent({
  components: {
    'layout-content': Layout.Content,
    'layout-footer': Layout.Footer
  }
})
</script>

<style lang="scss" scoped>
.app-main {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
  position: relative;
  overflow: hidden;
}
</style>
