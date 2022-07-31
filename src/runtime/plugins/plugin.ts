import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const templateString = runtimeConfig.public.mongo.template
  const template = JSON.parse(templateString)
  return {
    provide: {
      mongo: template
    }
  }
})
