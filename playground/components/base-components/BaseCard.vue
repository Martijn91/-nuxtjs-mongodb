<template>
  <div class="p-6 w-full">
    <h1 v-if="title" class="text-xl mb-4">
      {{ title }}
    </h1>
    <transition-group
      name="list"
      tag="ul"
      enter-active-class="list-enter-active"
      leave-active-class="list-leave-active"
      enter-from-class="list-enter-from"
      leave-to-class="list-leave-to"
    >
      <li v-for="(option, index) in options" :key="index">
        <button
          class="rounded-md shadow-md hover:shadow-sm p-2 duration-75 transition-shadow block"
          @click="$emit('select', option)"
        >
          {{ option.name || option }}
        </button>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: null },
  options: { type: Array, default: () => [] }
})
</script>

<style lang="postcss">
.list-enter-active {
  @apply transition-all ease-out duration-300;
}
.list-leave-active {
  @apply transition-all ease-in duration-300;
}
.list-enter-from {
  @apply opacity-0 translate-x-7 ease-out transition-all duration-300;
}
.list-leave-to {
  @apply opacity-0 translate-y-7 ease-in transition-all duration-300;
}
</style>
