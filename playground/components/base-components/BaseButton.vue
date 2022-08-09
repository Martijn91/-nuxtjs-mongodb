<template>
  <button class="base-button " :class="{'selected': isSelected}" @click="$emit('click')">
    <code class="btn-label"> <slot /> </code>
  </button>
</template>

<script setup>
defineProps({
  isSelected: { type: Boolean, default: false }
})
</script>

<style lang="postcss">

.base-button {
  @apply rounded-md shadow-sm border border-emerald-100 bg-white hover:shadow-md p-2 mb-2 block;
}

.btn-label {
  @apply text-slate-500;
}

.selected {
  @apply bg-green-100  hover:shadow-green-200 border-hidden;
}

.selected .btn-label {
  @apply text-green-500;
}
</style>
