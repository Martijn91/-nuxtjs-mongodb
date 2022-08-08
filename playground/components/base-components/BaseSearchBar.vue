<template>
  <div :key="name" class="search-bar">
    <form>
      <input
        ref="search-bar"
        type="text"
        :name="name"
        :placeholder="`Search ${name}`"
        class="search-bar-input"
        @keyup="$emit('search-change', $event.target.value)"
      >
    </form>
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

.search-bar-input {
  @apply rounded-full bg-slate-50 shadow-sm outline text-slate-300 outline-slate-100 h-12 w-full px-4 focus-visible:outline-hidden focus-visible:bg-emerald-50 focus-visible:shadow-md focus-visible:shadow-green-100 focus-visible:text-green-700;
}
</style>
