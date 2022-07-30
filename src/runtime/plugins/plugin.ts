import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const mongo = runtimeConfig.public.mongo.template
  return {
    provide: {
      mongo
    }
  }
})
