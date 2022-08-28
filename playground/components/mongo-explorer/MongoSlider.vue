<template>
  <div>
    <slot
      v-for="(slot, index) of $slots"
      :key="index"
      :class="`slide-${index}`"
    />
  </div>
</template>

<script>
export default {}
</script>

<style></style>
