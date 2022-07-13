<template>
  <code>
    {{ image }}
  </code>
</template>

<script setup>

const { $mongo } = useNuxtApp()
const image = await $mongo.findOne('images', { name: 'image-asset.jpeg' })

</script>
