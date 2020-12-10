<template>
  <div class="loading-spin">
    <Spin size="large" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Spin } from 'ant-design-vue'

export default defineComponent({
  components: {
    Spin
  }
})
</script>

<style lang="scss" scoped>
.loading-spin{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
