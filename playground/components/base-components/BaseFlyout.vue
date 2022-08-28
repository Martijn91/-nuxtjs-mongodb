<template>
  <transition-group
    v-if="state.isOpen"
    name="flyout"
    enter-active-class="flyout-enter-active"
    leave-active-class="flyout-leave-active"
    enter-from-class="flyout-enter-from"
    leave-to-class="flyout-leave-to"
  >
    <div class="base-flyout">
      <slot />

      <base-button @click="state.close">
        close
      </base-button>
    </div>
  </transition-group>
</template>

<script setup>
const state = reactive({
  isOpen: true,
  open: () => {
    state.isOpen = true
  },
  close: () => {
    state.isOpen = false
  }
})

defineExpose(state)
</script>

<style lang="postcss">
.base-flyout {
  @apply h-screen bg-white shadow-xl fixed top-0 right-0 w-auto p-10;
}

.flyout-enter-active {
  @apply transition-all ease-out duration-300;
}

.flyout-leave-active {
  @apply transition-all ease-in duration-300;
}

.flyout-enter-from {
  @apply opacity-0 ease-out transition-all duration-300;
}

.flyout-leave-to {
  @apply opacity-0 ease-in transition-all duration-300;
}
</style>
