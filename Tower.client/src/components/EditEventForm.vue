<template>
  <div class="component">
    <div class="row p-2">
      <label for="">Event Name</label>
      <input v-model="editable.name" type="text" placeholder=" name..." />
      <label for=""> Description</label>
      <input
        v-model="editable.description"
        type="text"
        placeholder="Event description..."
      />
    </div>
    <button @click="update()" class="btn btn-success">Make Changes</button>
  </div>
</template>


<script>
import { ref, watch, watchEffect } from "@vue/runtime-core"
import { AppState } from "../AppState"
import { eventsService } from "../services/EventsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { router } from "../router"
import { useRoute } from "vue-router";
export default {
  props: {
    myTowerEvent: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    let editable = ref({});
    const route = useRoute();
    watchEffect(() => {
      editable.value = props.myTowerEvent
    })
    return {
      editable,
      async update() {
        try {
          await eventsService.update(editable.value, props.myTowerEvent.id)
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>