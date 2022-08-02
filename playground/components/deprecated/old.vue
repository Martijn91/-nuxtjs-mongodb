<template>
  <div class="container">
    <div class="flex p-10 flex-col-reverse lg:flex-row gap-4 ">
      <div class="basis-full lg:basis-1/2">
        <form class="p-2 mb-1 border block">
          <label for="payload">Payload </label>
          <fieldset name="payload flex">
            <code>
              <span v-text="'{'" /><input v-model="payloadKey" class="p-2 m-4 w-1/5 border-b" name="payloadKey" type="text" placeholder="Key"> :
              <input v-model="payloadValue" class="p-2 m-2 w-1/5 border-b" name="payloadValue" type="text" placeholder="Value">
              <span v-text="'}'" />
            </code>
          </fieldset>
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
console.log($mongo)
const res = ref('')
const payloadKey = ref('')
const payloadValue = ref('')
const runtimeConfig = useRuntimeConfig()
const operations = runtimeConfig.public.mongo.operations
const functionFactory = async (option) => {
  // res.value = await $mongo[option]({ [payloadKey.value]: payloadValue.value }, 'posts', 'sample_training')
}
</script>
