import { Db } from 'mongodb';
<template>
  <div class="w-full">
    <div class="flex p-10 flex-row justify-evenly">
      <div class="flex-col w-full">
        <base-card
          title="Databases"
          :options="database.list"
          @select="select.database"
        />
      </div>
      <div class="flex-col w-full">
        <base-card
          title="Collections"
          :options="collection.list"
          @select="select.collection"
        />
      </div>
      <div class="flex-col w-full">
        <base-card
          title="DB Operations"
          :options="operation.db.list"
          @select="select.dbOperation"
        />
      </div>
      <div class="flex-col w-full">
        <base-card
          title="COLL Operations"
          :options="operation.coll.list"
          @select="select.collOperation"
        />
      </div>
    </div>
    <query-builder :selection-state="state" />
  </div>
</template>

<script setup>

const { $mongo } = useNuxtApp()

const state = reactive({
  database: null,
  collection: null,
  dbOperation: null,
  collOperation: null
})

const database = reactive({
  data: $mongo,
  list: computed(() => Object.keys(database.data) || []),
  selected: {}
})

const collection = reactive({
  data: {},
  list: computed(() => database?.selected?.collectionData?.map(item => item.name === 'collectionData' ? null : item.name) || []),
  selected: {}
})

const operation = reactive({
  db: {
    data: {},
    list: computed(() => Object.keys(operation.db.data))
  },
  coll: {
    data: {},
    list: computed(() => Object.keys(operation.coll.data))
  }
})

const select = {
  database: (dbName) => {
    state.database = dbName
    database.selected = database.data[dbName]
    collection.data = database.selected
    operation.db.data = database.selected
  },
  collection: (collName) => {
    state.collection = collName
    collection.selected = collection.data[collName]
    operation.coll.data = collection.selected
  },
  dbOperation: (opName) => {
    state.dbOperation = opName
  },
  collOperation: (opName) => {
    state.collOperation = opName
  }
}

// const reset = {
//   database: () => {
//     selectedDatabaseRef.value = {}
//     selectedDbName.value = null
//   },
//   collection: () => {
//     selectedCollectionRef.value = {}
//     selectedCollName.value = null
//   },
//   operation: () => {
//     selectedOperationRef.value = {}
//     selectedOperationName.value = null
//   }
// }

</script>
