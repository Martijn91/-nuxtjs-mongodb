<template>
  <div class="container">
    <div class="flex p-10 flex-col-reverse lg:flex-row gap-4 ">
      <div class="basis-full lg:basis-1/2">
        <form class="p-2 mb-1 border block">
          <label for="input p-2">Arguments: </label>
          <input v-model="inputValue" class="p-2 w-full border rounded" name="input" type="text" placeholder="{ foo: 'bar' }">
        </form>
        <div v-if="$mongo">
          <button
            v-for="(item, index) in operations"
            :key="index"
            class="btn w-1/4 btn-primary p-2 bg-green-600 border rounded text-white hover:bg-green-700 transition-colors drop-shadow-sm shadow-slate-400"
            @click="functionFactory(item, inputValue)"
          >
            {{ item }}
          </button>
        </div>
      </div>

      <div class="basis-full lg:basis-1/2">
        <div class="flex flex-col">
          <div class="basis-1/2">
            <h6>RES:</h6>
            <code v-if="res">
              {{ res }}
            </code>
          </div>
          <div class="basis-1/2" />
        </div>
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
const functionFactory = async (option, payload) => {
  res.value = await $mongo[option](payload, '')
}
</script>
