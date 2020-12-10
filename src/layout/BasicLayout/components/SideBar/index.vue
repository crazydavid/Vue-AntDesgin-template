<template>
  <layout-slider class="ant-pro-sider ant-pro-sider-fixed" :collapsed="headCollapsed" :trigger="null" collapsible>
    <Logo :collapsed="headCollapsed" />
    <div style="flex: 1 1 0%; overflow: hidden auto;">
      <layout-menu
        theme="dark"
        :default-selected-keys="['1']"
        :default-open-keys="[]"
        mode="inline"
      >
        <layout-subMenu key="sub1">
          <template #title>
            <span>subnav 1</span>
          </template>
          <layout-menu-item key="1">nav 1</layout-menu-item>
          <layout-menu-item key="2">nav 2</layout-menu-item>
          <layout-menu-item key="3">nav 3</layout-menu-item>
          <layout-menu-item key="4">nav 4</layout-menu-item>
        </layout-subMenu>
        <layout-menu-item key="5">
          <span>nav 5</span>
        </layout-menu-item>
        <layout-menu-item key="6">
          <span>nav 6</span>
        </layout-menu-item>
        <layout-menu-item key="7">
          <span>nav 5</span>
        </layout-menu-item>
        <layout-menu-item key="8">
          <span>nav 6</span>
        </layout-menu-item>
        <layout-menu-item key="9">
          <span>nav 5</span>
        </layout-menu-item>
        <layout-menu-item key="10">
          <span>nav 6</span>
        </layout-menu-item>
        <layout-menu-item key="11">
          <span>nav 5</span>
        </layout-menu-item>
        <layout-menu-item key="12">
          <span>nav 6</span>
        </layout-menu-item>
      </layout-menu>
    </div>
  </layout-slider>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Layout, Menu } from 'ant-design-vue'
import { useStore } from 'vuex'
import Logo from './Logo.vue'

export default defineComponent({
  components: {
    Logo,
    'layout-menu': Menu,
    'layout-menu-item': Menu.Item,
    'layout-subMenu': Menu.SubMenu,
    'layout-slider': Layout.Sider
  },
  setup() {
    const store = useStore()
    const headCollapsed = computed(() => store.getters.opened)
    return {
      headCollapsed
    }
  }
})
</script>

