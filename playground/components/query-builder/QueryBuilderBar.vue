<template>
  <div class="w-full fixed bottom-0 shadow-inner h-12 bg-white border-gray-200 px-4">
    <div class="flex flex-row h-full items-center">
      <div class="basis-1/4">
        <slot name="one" />
      </div>
      <div class="basis-1/4">
        <slot name="two" />
      </div>
      <div class="basis-1/4">
        <slot name="three" />
      </div>
      <div class="basis-1/4">
        <slot name="four" />
      </div>
    </div>
  </div>
</template>
