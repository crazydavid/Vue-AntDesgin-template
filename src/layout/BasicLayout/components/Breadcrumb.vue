<template>
  <layout-breadcrumb style="margin: 16px 24px 0">
    <layout-breadcrumb-item>Home</layout-breadcrumb-item>
    <layout-breadcrumb-item>List</layout-breadcrumb-item>
    <layout-breadcrumb-item>App</layout-breadcrumb-item>
  </layout-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Breadcrumb } from 'ant-design-vue'

export default defineComponent({
  components: {
    'layout-breadcrumb': Breadcrumb,
    'layout-breadcrumb-item': Breadcrumb.Item
  }
})
</script>
