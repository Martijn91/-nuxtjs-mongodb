<template>
  <query-builder-bar>
    <template #one>
      <base-button v-if="selectionState.database" @click="onItemClick('database')">
        {{ selectionState.database }}
      </base-button>
    </template>
    <template #two>
      <base-button v-if="selectionState.collection" @click="onItemClick('collection')">
        {{ selectionState.collection }}
      </base-button>
    </template>
    <template #three>
      <base-button v-if="selectionState.dbOperation" @click="onItemClick('dbOperation')">
        {{ selectionState.dbOperation }}
      </base-button>
    </template>
    <template #four>
      <base-button v-if="selectionState.collOperation" @click="onItemClick('collOperation')">
        {{ selectionState.collOperation }}
      </base-button>
    </template>
  </query-builder-bar>
</template>

<script setup>
const props = defineProps({
  selectionState: { type: Object, default: () => {} }
})

const emit = defineEmits(['remove'])

function onItemClick (keyVal) {
  emit('remove', keyVal)
}
</script>
