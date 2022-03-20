<template>
  <div class="component">
    <form class="d-flex flex-column">
      <label for="">Event Name</label>
      <input v-model="editable.name" type="text" placeholder=" name..." />
      <label for="">Event Description</label>
      <input
        v-model="editable.description"
        type="text"
        placeholder="Event description..."
      />
      <label for="">Event Image</label>
      <input v-model="editable.coverImg" type="text" placeholder=" image url" />
      <label for="">Event Location</label>
      <input v-model="editable.location" type="text" placeholder=" location" />
      <label for="">Event Capacity</label>
      <input
        v-model="editable.capacity"
        type="number"
        placeholder=" how many"
      />
      <label for="">Event Date</label>
      <input v-model="editable.startDate" type="date" placeholder=" date" />
      <label for="">Event Type</label>
      <input
        v-model="editable.type"
        type="text"
        placeholder=" concert, convention, sport, digital"
      />

      <button class="btn btn-primary m-2" @click="createEvent()">Submit</button>
    </form>
  </div>
</template>


<script>
import { ref, watchEffect } from "@vue/runtime-core"
import { AppState } from "../AppState"
import { eventsService } from "../services/EventsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { router } from "../router"
export default {
  setup() {
    let editable = ref({})
    return {
      editable,
      async createEvent() {
        try {
          const newEvent = await eventsService.createEvent(editable.value)
          router.push({
            name: 'EventDetails',
            // figure out the id passing through. doesnt take you to make
            params: { id: newEvent.id }
          })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>