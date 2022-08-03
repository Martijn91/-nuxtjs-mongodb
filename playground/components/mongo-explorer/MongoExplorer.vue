import { Db } from 'mongodb';
<template>
  <div class="container w-full">
    <div class="flex p-10 flex-row justify-evenly">
      <div class="flex-col w-full">
        <base-card
          title="Databases"
          :options="database.list"
          @select="select.database"
        >
          <template v-if="selectedDatabaseName" #foot>
            {{ selectedDatabaseName }}
          </template>
        </base-card>
      </div>
      <div class="flex-col w-full">
        <base-card
          title="Collections"
          :options="collection.list"
          @select="select.collection"
        >
          <template v-if="selectedCollectionName" #foot>
            {{ selectedCollectionName }}
          </template>
        </base-card>
      </div>
      <div class="flex-col w-full">
        <base-card
          title="DB Operations"
          :options="operation.db.list"
          @select="select.dbOperation"
        >
          <template v-if="selectedCollectionName" #foot>
            {{ selectedDbOperationName }}
          </template>
        </base-card>
      </div>
      <div class="flex-col w-full">
        <base-card
          title="COLL Operations"
          :options="operation.coll.list"
          @select="select.collOperation"
        >
          <template v-if="selectedCollectionName" #foot>
            {{ selectedCollOperationName }}
          </template>
        </base-card>
      </div>
    </div>
  </div>
</template>

<script setup>

const { $mongo } = useNuxtApp()

const selectedDatabaseName = ref(null)
const selectedCollectionName = ref(null)
const selectedDbOperationName = ref(null)
const selectedCollOperationName = ref(null)

const database = reactive({
  data: $mongo,
  list: computed(() => Object.keys(database.data) || []),
  selected: {}
})

const collection = reactive({
  data: [],
  list: computed(() => collection.data.map(coll => coll.name) || []),
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

// function onDatabaseSelect (dbName) {
//   select.database(dbName)
//   // reset.collection()
//   // reset.operation()
// }

// function onCollectionSelect (collName) {
//   select.collection(collName)
//   // reset.operation()
// }

// function onOperationSelect (operation) {
//   select.operation(operation)
// }

const select = {
  database: (dbName) => {
    selectedDatabaseName.value = dbName
    database.selected = database.data[dbName]
    collection.data = database.selected.collectionData
    operation.db.data = database.selected
  },
  collection: (collName) => {
    selectedCollectionName.value = collName
    collection.selected = collection.data[collName]
    operation.coll.data = collection.selected
  },
  dbOperation: (opName) => {
    selectedDbOperationName.value = opName
  },
  collOperation: (opName) => {
    selectedCollOperationName.value = opName
  }
}

const reset = {
  database: () => {
    selectedDatabaseRef.value = {}
    selectedDatabaseName.value = null
  },
  collection: () => {
    selectedCollectionRef.value = {}
    selectedCollectionName.value = null
  },
  operation: () => {
    selectedOperationRef.value = {}
    selectedOperationName.value = null
  }
}

</script>
