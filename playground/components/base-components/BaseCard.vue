<template>
  <div class="base-card">
    <h1 v-if="title && options?.length > 0" class="title">
      {{ title }}
    </h1>
    <base-search-bar :name="title" @search-change="onSearchChange" />
    <transition-group
      name="list"
      tag="ul"
      enter-active-class="list-enter-active"
      leave-active-class="list-leave-active"
      enter-from-class="list-enter-from"
      leave-to-class="list-leave-to"
    >
      <li v-for="(option, index) in options" :key="index">
        <base-button :is-selected="option === selectedVal" @click="$emit('on-selection', option)">
          {{ option.name || option }}
        </base-button>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: null },
  options: { type: Array, default: () => [] },
  selectedVal: { type: String, default: null }
})

defineEmits(['on-selection'])

function onSearchChange (val) {
  console.log(val)
}
</script>

<style lang="postcss">
.base-card {
  @apply w-full p-6 border border-emerald-50 drop-shadow-sm bg-white rounded;
}

.title {
  @apply text-xl mb-4 text-green-500 block;
}

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
