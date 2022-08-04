<template>
  <query-builder-bar>
    <template #one>
      <code>{{ selectionState.database }}</code>
    </template>
    <template #two>
      <code>{{ selectionState.collection }}</code>
    </template>
    <template #three>
      <code>{{ selectionState.dbOperation }}</code>
    </template>
    <template #four>
      <code>{{ selectionState.collOperation }}</code>
    </template>
  </query-builder-bar>
</template>

<script setup>
const props = defineProps({
  selectionState: { type: Object, default: () => {} }
})
</script>
