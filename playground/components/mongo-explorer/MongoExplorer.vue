import { Db } from 'mongodb';
<template>
  <div class="container w-full">
    <div class="flex p-10 flex-row justify-evenly">
      <div class="flex-col w-full">
        <base-card
          title="Databases"
          :options="dbList"
          @select="onDatabaseSelect"
        >
          <template v-if="selectedDatabaseName" #foot>
            {{ selectedDatabaseName }}
          </template>
        </base-card>
      </div>
      <div class="flex-col w-full">
        <base-card
          title="Collections"
          :options="collectionList"
          @select="onCollectionSelect"
        >
          <template v-if="selectedCollectionName" #foot>
            {{ selectedCollectionName }}
          </template>
        </base-card>
      </div>
      <div class="flex-col w-full">
        <base-card
          title="Operations"
          :options="operationList"
          @select="onOperationSelect"
        >
          <template v-if="selectedCollectionName" #foot>
            {{ selectedOperationName }}
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
const selectedOperationName = ref(null)

const selectedDatabaseRef = ref({})
const selectedCollectionRef = ref({})
const selectedOperationRef = ref({})

const selectedTarget = reactive({ type: null, ref: {} })

const dbList = computed(() => Object.keys($mongo) || [])
const collectionList = computed(() => (selectedDatabaseRef.value?.collectionData?.map(coll => coll.name) || []))
const operationList = computed(() => Object.keys(selectedTarget.ref) || [])

const selectedOperation = ref(null)

function onDatabaseSelect (dbName) {
  select.database(dbName)
  reset.collection()
  reset.operation()
}

function onCollectionSelect (collName) {
  select.collection(collName)
  reset.operation()
}

function onOperationSelect (operation) {
  select.operation(operation)
}

const select = {
  database: (dbName) => {
    Object.assign(selectedDatabaseRef.value, $mongo[dbName])
    selectedDatabaseName.value = dbName
    selectedTarget.type = 'db'
    selectedTarget.ref = selectedDatabaseRef
  },
  collection: (collName) => {
    Object.assign(selectedCollectionRef.value, selectedDatabaseRef.value[collName])
    selectedCollectionName.value = collName
    selectedTarget.type = 'col'
    selectedTarget.ref = selectedCollectionRef
  },
  operation: (opName) => {
    Object.assign(selectedOperationRef.value, target)
    selectedOperationName.value = opName
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

function getTargetOperations (target) {
  return Object.keys(target).filter((operation) => {
    return operation !== 'collectionData'
  })
}

</script>
