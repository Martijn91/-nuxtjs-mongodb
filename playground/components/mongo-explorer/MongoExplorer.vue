import { Db } from 'mongodb';
<template>
  <div class="w-full">
    <div class="container mx-auto max-w-screen-xl">
      <div class="grid gap-6 grid-cols-3 mt-28">
        <transition class="w-full">
          <base-card
            title="Databases"
            :options="database.list"
            :selected-val="state.database"
            @on-selection="select.database"
          />
        </transition>
        <transition class="w-full">
          <base-card
            v-if="state.database"
            title="Collections"
            :selected-val="state.collection"
            :options="collection.list"
            @on-selection="select.collection"
          />
        </transition>
        <transition-group>
          <div v-if="state.database && !state.collection" class="w-full">
            <base-card
              title="DB Operations"
              :selected-val="state.dbOperation"
              :options="operation.db.list"
              @on-selection="select.dbOperation"
            />
          </div>
          <div v-else-if="state.collection" class="w-full">
            <base-card
              title="COLL Operations"
              :selected-val="state.collOperation"
              :options="operation.coll.list"
              @on-selection="select.collOperation"
            />
          </div>
        </transition-group>
      </div>
    </div>
    <query-builder :selection-state="state" @remove="(key) => reset[key]()" />
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
    reset.collection()
    reset.dbOperation()
    reset.collOperation()
    state.database = dbName
    database.selected = database.data[dbName]
    collection.data = database.selected
    operation.db.data = database.selected
  },
  collection: (collName) => {
    reset.dbOperation()
    reset.collOperation()
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

const reset = {
  database: () => {
    state.database = null
    database.selected = {}
    collection.data = {}
    operation.db.data = {}
  },
  collection: () => {
    state.collection = null
    collection.selected = {}
    operation.coll.data = {}
  },
  dbOperation: () => {
    state.dbOperation = null
  },
  collOperation: () => {
    state.collOperation = null
  }
}

</script>
