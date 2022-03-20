<template>
  <div class="about container-fluid">
    <div class="row p-2 m-2">
      <div class="col-md-2"><h3 class="text-light">My events</h3></div>
      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div v-for="e in myTowerEvents" :key="e.id" class="col-md-2 mt-3">
        <MyTowerEventsCard :myTowerEvent="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account),
      // filter by account Id. FIGURE IT OUT
      myTowerEvents: computed(() => AppState.towerEvents.filter(e => e.creatorId =))
    }
  }
}
</script>

<style scoped>
</style>
