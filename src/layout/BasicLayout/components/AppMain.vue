<template>
  <layout-content class="app-main">
    <router-view v-slot="{Component}">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" /></transition>
    </router-view>
  </layout-content>
  <!-- eslint-disable-next-line -->
  <layout-footer class="footer">
    <div class="copyright">
      Copyright &copy; 2020 vueAntCli
    </div>
  </layout-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
  margin:16px 24px;
  // padding: 24px;
  // background: #fff;
  min-height: 280px;
  position: relative;
  overflow: hidden;
}
.footer {
  text-align: center;
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
