<template>
  <div class="query-builder-bar">
    <div class="container mx-auto max-w-screen-xl h-full">
      <div class="flex flex-row justify-between h-full">
        <div>
          <transition-group
            mode="out-in"
            name="querycontainer"
            enter-active-class="querycontainer-enter-active"
            leave-active-class="querycontainer-leave-active"
            enter-from-class="querycontainer-enter-from"
            leave-to-class="querycontainer-leave-to"
            tag="div"
            class="query-selections"
          >
            <slot name="query-selections" />
          </transition-group>
        </div>
        <div class="max-h-full">
          <slot name="payload" />
        </div>
        <slot name="submitbtn" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.query-builder-bar {
  @apply w-full fixed bottom-0 z-50 h-16 bg-green-100 border-b border-emerald-200 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.1)]  px-4 block;
}

.query-selections {
  @apply flex flex-row h-full items-center space-x-2;
}

.querycontainer-enter-active {
  @apply transition-all ease-out duration-300;
}
.querycontainer-leave-active {
  @apply transition-all ease-in duration-300;
}
.querycontainer-enter-from {
  @apply opacity-0 -translate-y-7 ease-out transition-all duration-300;
}
.querycontainer-leave-to {
  @apply opacity-0 translate-y-7 ease-in transition-all duration-300;
}
</style>
