<template>
  <div class="base-card">
    <!-- <h1 v-if="title && props.options?.length > 0" class="title">
      {{ title }}
    </h1> -->
    <base-search-bar :name="title" @search-change="(e) => searchVal = e || null" />
    <transition-group
      name="list"
      tag="ul"
      enter-active-class="list-enter-active"
      leave-active-class="list-leave-active"
      enter-from-class="list-enter-from"
      leave-to-class="list-leave-to"
    >
      <li v-for="(option, index) in filteredOptions" :key="index">
        <base-button :is-selected="option === selectedVal" @click="$emit('on-selection', option)">
          {{ option.name || option }}
        </base-button>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: null },
  options: { type: Array, default: () => [] },
  selectedVal: { type: String, default: null }
})
defineEmits(['on-selection'])

const searchVal = ref(null)

const filteredOptions = computed(() => {
  return searchVal.value?.length > 0
    ? props.options.filter(item => item?.toLowerCase().includes(searchVal.value?.toLowerCase()))
    : props.options
})

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
