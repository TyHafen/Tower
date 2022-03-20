<template>
  <div class="container-fluid">
    <div class="home p-5 bg-secondary rounded mt-4 mx-5 banner"></div>
    <div class="row justify-content-center p-3">
      <div class="card bg-primary">
        <!-- Links to filter events by type -->
        <div class="row justify-content-around align-items-center selectable">
          <div class="col-md-2 d-flex justify-content-center selectable">
            <h4 aria-label="name" aria-title="name" @click="getEvents()">
              All
            </h4>
          </div>
          <div class="col-md-2 d-flex justify-content-center selectable">
            <h4 @click="filterEvents('concert')">Concert</h4>
          </div>
          <div class="col-md-2 d-flex justify-content-center selectable">
            <h4 @click="filterEvents('convention')">Convention</h4>
          </div>
          <div class="col-md-2 d-flex justify-content-center selectable">
            <h4 @click="filterEvents('sport')">Sport</h4>
          </div>
          <div class="col-md-2 d-flex justify-content-center selectable">
            <h4 @click="filterEvents('digital')">Digital</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="row p-3 m-2 justify-content-around align-items-center">
      <div v-for="e in towerEvents" :key="e.id" class="col-md-4 d-flex p-3 m-0">
        <!-- only use one of these for event card component -->
        <router-link :to="{ name: 'EventDetails', params: { id: e.id } }">
          <EventCard :towerEvent="e" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { onMounted, watchEffect } from "@vue/runtime-core";
import { computed } from "@vue/reactivity";
import { eventsService } from "../services/EventsService"
export default {
  name: 'Home',
  setup() {
    watchEffect(async () => {
      try {
        await eventsService.getEvents()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      towerEvents: computed(() => AppState.towerEvents),
      async filterEvents(type) {
        try {
          await eventsService.filterEvents(type)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  width: 90vw;
}
.home {
  height: 20vh;
  place-content: center;
  text-align: center;
}
.banner {
  background-image: url("https://th.bing.com/th/id/R.5262ab982c788842625ed1379a372be8?rik=RAGJzIyw1ElJrA&pid=ImgRaw&r=0");
}
</style>
