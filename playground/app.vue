<template>
  <div>
    <h6>RES:</h6>
    <code v-if="res">
      {{ res }}
    </code>
    <form>
      <label for="input">Arguments: </label>
      <input v-model="input" name="input" type="text" placeholder="">
    </form>
    <div v-if="$mongo">
      <button
        v-for="(item, index) in operations"
        :key="index"
        class="btn btn-primary"
        @click="functionFactory($mongo[item])"
      >
        {{ item }}
      </button>
    </div>

    {{ $mongo }}
  </div>
</template>

<script setup>
const { $mongo } = useNuxtApp()
const runtimeConfig = useRuntimeConfig()
const operations = runtimeConfig.public.mongo.operations
const res = await $mongo.findOne({ name: 'Riviera Caterer' }, 'restaurants')
const functionFactory = async (func) => {
  return await $mongo[func](this.input)
}
</script>
