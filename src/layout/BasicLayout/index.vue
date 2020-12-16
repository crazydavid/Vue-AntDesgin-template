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
import { defineComponent } from 'vue'
import { Layout } from 'ant-design-vue'
import { Header, AppMain, Sidebar, Breadcrumb } from './components'

export default defineComponent({
  components: {
    Header,
    Layout,
    AppMain,
    Sidebar,
    Breadcrumb
  }
})
</script>
