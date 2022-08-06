<template>
  <button class="rounded-md shadow-md hover:shadow-sm p-2 mb-2 duration-75 transition-shadow block" :class="{'selected': isSelected}" @click="$emit('click')">
    <code> <slot /> </code>
  </button>
</template>

<script setup>
defineProps({
  isSelected: { type: Boolean, default: false }
})
</script>

<style lang="postcss">
.selected {
  @apply bg-green-100  shadow-green-200
}
</style>
