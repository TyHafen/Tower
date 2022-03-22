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

    <div class="row p-2 m-2">
      <div class="col-md-2"><h3 class="text-light">What Im attending</h3></div>
      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div v-for="e in attendingEvents" :key="e.id" class="col-md-2 mt-3">
        <AttendingEvents :attendingEvent="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from '../services/TicketsService'
import { logger } from "../utils/Logger";
import Pop from '../utils/Pop';

export default {
  name: 'Account',
  setup() {
    watchEffect(async () => {
      try {
        await ticketsService.getMyTickets()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      attendingEvents: computed(() => AppState.myTickets),
      myTowerEvents: computed(() => AppState.towerEvents.filter(t => t.creatorId == AppState.account.id)),

    }
  }
}
</script>

<style scoped>
</style>
