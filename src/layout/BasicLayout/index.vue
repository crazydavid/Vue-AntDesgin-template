<template>
  <Layout id="layout-main" style="min-height: 100vh">
    <Sidebar />
    <Layout>
      <Header />
      <Breadcrumb />
      <AppMain />
    </Layout>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue'
import { Layout } from 'ant-design-vue'
import { Header, AppMain, Sidebar, Breadcrumb } from './components'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    Header,
    Layout,
    AppMain,
    Sidebar,
    Breadcrumb
  },
  setup() {
    const useroute = ref(useRoute().name)
    watchEffect(() => {
      console.log(useroute)
      // if(useroute)
    })
  }
})
</script>
