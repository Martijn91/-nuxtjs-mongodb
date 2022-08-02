import { Db } from 'mongodb';
<template>
  <div class="container">
    <div class="flex p-10 flex-row gap-6">
      <div class="flex-col">
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
      <div class="flex-col">
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
      <div class="flex-col">
        <base-card
          title="Operations"
          :options="operationList"
          @select="onOperationSelect"
        >
          <template v-if="selectedCollectionName" #foot>
            {{ selectedOperation }}
          </template>
        </base-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref, ComputedRef } from 'vue'
import type { Collection, Db } from 'mongodb'

type DatabaseName = string
type CollectionName = string
type OperationName = string

type CollectionKey = keyof Collection

interface CollectionData {
  [x: CollectionName]: CollectionKey
}

interface Database extends Db {
  collectionData: keyof Collection[]
}

interface DatabaseOptions {
  [collectionData:string]: keyof Collection[]
  [x: string]: keyof Database;
}

type DatabaseOption = keyof Database

interface CollectionKeyIndex {
  [x: CollectionName]: CollectionKey[]
}

const { $mongo }: {$mongo: Record<DatabaseName, DatabaseOption[]>} = useNuxtApp()

const selectedDatabaseName: Ref<DatabaseName | null> = ref(null)
const selectedCollectionName: Ref<CollectionName | null> = ref(null)
const selectedOperationName: Ref<OperationName | null> = ref(null)

const selectedDatabaseRef: DatabaseKeyIndex | null = computed(() => selectedDatabaseName.value ? $mongo[selectedDatabaseName.value] : null)
const selectedCollectionRef: Collection | {} = reactive({})
const selectedOperationRef = reactive({})

const dbList: ComputedRef<DatabaseName[]> = computed(() => Object.keys($mongo) || [])
const collectionList: ComputedRef<CollectionName[]> = computed(() => (Object.keys(selectedDatabaseRef.collectionData) || []))
const operationList: ComputedRef<OperationName[]> = computed(() => (Object.keys(selectedCollectionRef) || []))
const target = computed(() => selectedCollectionName.value || selectedDatabaseName?.value || null)

const selectedOperation = ref(null)

const selectedTarget = reactive({})

function onDatabaseSelect (db) {
  selectedDatabaseName.value = db
  Object.assign(selectedDatabaseRef, $mongo[db])
  selectedCollectionName.value = null
  Object.assign(selectedCollectionRef, {})
  Object.assign(selectedTarget, selectedDatabaseRef)
}

function onCollectionSelect (coll) {
  selectedCollectionName.value = coll.name
  const parent = $mongo[selectedDatabaseName.value]
  const target = parent[coll.name]
  console.log(target)
  Object.assign(selectedTarget, target)
  console.log(selectedTarget)
}

function onOperationSelect (operation) {
  selectedOperation.value = operation
}

function select () {
  return {
    database: (dbName: DatabaseName) => {
      Object.assign(selectedDatabaseRef, $mongo[dbName])
      selectedDatabaseName.value = dbName
    },
    collection: (collName: CollectionName) => {
      Object.assign(selectedCollectionRef, selectedDatabaseRef[collName])
      selectedCollectionName.value = collName
    },
    operation: (opName: OperationName) => {
      Object.assign(selectedOperationRef, selectedCollectionRef[opName])
      selectedOperationName.value = opName
    }
  }
}

function reset () {
  return {
    database: () => {
      Object.assign(selectedDatabaseRef, {})
      selectedDatabaseName.value = null
    },
    collection: () => {
      Object.assign(selectedCollectionRef, {})
      selectedCollectionName.value = null
    },
    operation: () => {
      Object.assign(selectedOperationRef, {})
      selectedOperationName.value = null
    }
  }
}

function getTargetOperations (target) {
  return Object.keys(target).filter((operation) => {
    return operation !== 'collectionData'
  })
}

</script>
