<template>
  <query-builder-bar>
    <template #query-selections>
      <base-button v-if="selectionState.database" type="secondary" @click="onItemClick('database')">
        {{ selectionState.database }}
      </base-button>
      <base-button v-if="selectionState.collection" type="secondary" @click="onItemClick('collection')">
        {{ selectionState.collection }}
      </base-button>
      <base-button v-if="selectionState.dbOperation" type="secondary" @click="onItemClick('dbOperation')">
        {{ selectionState.dbOperation }}
      </base-button>
      <base-button v-if="selectionState.collOperation" type="secondary" @click="onItemClick('collOperation')">
        {{ selectionState.collOperation }}
      </base-button>
    </template>
    <template #payload>
      <query-builder-payload @update:payload="(e) => $emit('update:payload', e)" />
    </template>
    <template #submitbtn>
      <base-button type="secondary" @click="$emit('query')">
        Query
      </base-button>
    </template>
  </query-builder-bar>
</template>

<script setup>
const props = defineProps({
  selectionState: { type: Object, default: () => {} }
})

const emit = defineEmits(['remove', 'update:payload'])

function onItemClick (keyVal) {
  emit('remove', keyVal)
}
</script>
