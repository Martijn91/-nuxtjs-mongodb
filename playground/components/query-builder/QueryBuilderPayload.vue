<template>
  <div class="query-builder-payload" :class="{ invalid: !isValid }">
    <div class="json-container">
      <!-- <label class="label" :for="id || name">Payload:</label> -->
      <span class="label">{</span>
      <input v-model="jsonKey" class="json-input key" type="text" placeholder="key" @keyup="updatePayload">
      <span class="label"> : </span>
      <input
        v-model="jsonValue"
        class="json-input value"
        type="text"
        placeholder="value"
        @keyup="updatePayload"
      ><span class="label">}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: { type: String, default: 'input' },
  id: { type: String, default: null },
  cols: { type: Number, default: 30 },
  rows: { type: Number, default: 4 }
})

const emit = defineEmits(['update:payload'])

const input = ref(null)
const isValid = ref(true)
const jsonKey = ref('')
const jsonValue = ref('')

function updatePayload () {
  console.log('key', jsonKey.value)
  emit('update:payload', { [jsonKey.value]: jsonValue.value })
}
</script>

<style lang="postcss">
.label {
  @apply text-green-300;
}

.query-builder-payload {
  @apply flex flex-row justify-center items-center gap-3 h-full relative;
}

.label {
  @apply mr-2;
}

.json-input {
  @apply m-1 p-2 relative text-center border-b bg-green-100 border-green-300 placeholder-green-300 text-green-500;
}

.json-input.key {
  /* @apply rounded-r-none mr-0; */
}

.json-input.key::before {
  content: "\U+007B";
  @apply absolute block left-0 top-0 h-full;
}

.json-input:focus-visible {
  @apply outline-0 text-green-700 border-green-500;
}

.json-input.value {
  /* @apply rounded-l-none ml-0; */
}
</style>
