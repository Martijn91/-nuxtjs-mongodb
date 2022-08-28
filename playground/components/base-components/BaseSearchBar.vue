<template>
  <div :key="name" class="search-bar">
    <input
      ref="search-bar"
      type="text"
      :name="name"
      :placeholder="name"
      class="search-bar-input"
      @keyup.prevent="$emit('search-change', $event.target.value)"
      @keyup.enter="$event.target.blur()"
    >
  </div>
</template>

<script setup>
defineProps({
  name: { type: String, default: '', required: true }
})
defineEmits(['search-change'])
</script>

<style lang="postcss">
.search-bar {
  @apply mb-8
}

input.search-bar-input {
  @apply rounded-full placeholder-slate-300 bg-slate-50 shadow-sm border text-slate-500 border-slate-100 h-12 w-full px-4;
}

input.search-bar-input:focus-visible {
 @apply border-emerald-100 outline-0 placeholder-emerald-200 bg-emerald-50 shadow-md shadow-green-100 text-green-500;
}
</style>
