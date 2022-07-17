<template>
  <div class="container content-center">
    <div class="w-1/2">
      <form class="p-2 mb-1 border block">
        <label for="input p-2">Arguments: </label>
        <input v-model="inputValue" class="p-2 w-full border rounded" name="input" type="text" placeholder="{ foo: 'bar' }">
      </form>
      <div v-if="$mongo">
        <button
          v-for="(item, index) in operations"
          :key="index"
          class="btn btn-primary p-2 bg-green-600 m-1 rounded text-white hover:bg-green-700 transition-colors"
          @click="functionFactory(item)"
        >
          {{ item }}
        </button>
      </div>
    </div>

    <div class="w-1/2">
      <h6>RES:</h6>
      <div v-if="res !== null">
        <code>
          {{ res }}
        </code>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $mongo } = useNuxtApp()
const res = ref('')
const inputValue = ref('')
const runtimeConfig = useRuntimeConfig()
const operations = runtimeConfig.public.mongo.operations
const { data } = await $mongo.find({ name: 'Riviera Caterer' }, 'restaurants')
res.value = data.value
const functionFactory = async (func) => {
  return await $mongo[func](this.inputValue.value)
}
</script>
