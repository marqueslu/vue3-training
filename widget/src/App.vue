<template>
  <h1>Widget</h1>
  <widget />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Widget from './views/Widget/index.vue'

export default defineComponent({
  components: { Widget }
})
</script>
