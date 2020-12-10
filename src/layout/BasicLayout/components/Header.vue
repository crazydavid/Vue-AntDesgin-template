<template>
  <layout-header class="header">
    <menu-unfold-outlined
      v-if="headCollapsed"
      class="trigger"
      @click="toCollapsed"
    />
    <menu-fold-outlined v-else class="trigger" @click="toCollapsed" />
    <div>
      <div class="head-img">
        <img src="@/assets/images/head.png" alt="">
      </div>
    </div>
  </layout-header>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { Layout } from 'ant-design-vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    'layout-header': Layout.Header,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  setup(props, ctx) {
    const store = useStore()
    const headCollapsed = computed(() => store.getters.opened)
    const toCollapsed = () => {
      store.commit('app/TOGGLE_SIDEBAR', !headCollapsed.value)
    }
    return {
      headCollapsed,
      toCollapsed
    }
  }
})
</script>

<style lang="scss" scoped>
.header{
  background: #fff;
  padding: 0 24px 0 0;
  display:flex;
  justify-content: space-between;
  align-items:center;
  .trigger{
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .head-img{
    width: 36px;
    height: 36px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>
