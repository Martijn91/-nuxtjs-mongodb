<template>
  <div v-show="state.isOpen" class="base-flyout">
    <code>flyout data</code>

    <slot />

    <base-button @click="state.close">
      close
    </base-button>
  </div>
</template>

<script setup>

const state = reactive(
  {
    isOpen: true,
    open: () => { state.isOpen = true },
    close: () => { state.isOpen = false }
  }
)

defineExpose(state)
</script>

<style lang="postcss">
.base-flyout {
  @apply h-screen bg-white shadow-xl fixed top-0 right-0 w-auto p-10
}
</style>
