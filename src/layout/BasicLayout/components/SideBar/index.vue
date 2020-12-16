<template>
  <layout-slider :collapsed="headCollapsed" :trigger="null" collapsible />
  <!-- eslint-disable-next-line -->
  <layout-slider class="ant-pro-sider ant-pro-sider-fixed" :collapsed="headCollapsed" :trigger="null" collapsible>
    <Logo :collapsed="headCollapsed" />
    <div style="flex: 1 1 0%; overflow: hidden auto;">
      <layout-menu
        theme="dark"
        :default-selected-keys="selectedMenu"
        :default-open-keys="selectedSubMenu"
        mode="inline"
      >
        <template v-for="menuitem in menuList">
          <layout-subMenu v-if="menuitem.children&&!menuitem.meta.hidden" :key="menuitem.name">
            <template #title>
              <span>
                {{ menuitem.meta.title }}
              </span>
            </template>
            <layout-menu-item v-for="subMenuitem in menuitem.children" :key="subMenuitem.name">
              <router-link :to="(menuitem.path!=='/'?menuitem.path:'')+'/'+subMenuitem.path">
                {{ subMenuitem.meta.title }}
              </router-link>
            </layout-menu-item>
          </layout-subMenu>
          <layout-menu-item v-if="!menuitem.children&&!menuitem.meta.hidden" :key="menuitem.name">
            <router-link :to="menuitem.path">
              {{ menuitem.meta.title }}
            </router-link>
          </layout-menu-item>
        </template>
      </layout-menu>
    </div>
  </layout-slider>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, watchEffect } from 'vue'
import { Layout, Menu } from 'ant-design-vue'
import { useStore } from 'vuex'
import { routes } from '@/router'
import { useRoute } from 'vue-router'
import Logo from './Logo.vue'

interface MenuItem {
  url:string
  meta:any
  name:string
  children?:any
}

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
    const useroute = useRoute()
    const headCollapsed = computed(() => store.getters.opened)
    /**
     * 获取菜单
     * @param routes:路由
     */
    const getMenuList = (routes:any) => {
      const arr:Array<MenuItem> = []
      routes.forEach((item:any) => {
        const temp = { ...item }
        if (temp.component) delete temp.component
        if (temp.children) {
          temp.children = getMenuList(item.children)
        }
        arr.push(temp)
      })
      return arr
    }

    const menuList = getMenuList(routes)
    const selectedSubMenu = reactive([useroute.matched[0].name])
    const selectedMenu = reactive([useroute.name])
    return {
      headCollapsed,
      menuList,
      selectedSubMenu,
      selectedMenu
    }
  }
})
</script>

