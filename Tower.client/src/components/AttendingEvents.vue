<template>
  <div class="component">
    <div class="card bg-success shadow" style="width: ">
      <router-link
        :to="{ name: 'EventDetails', params: { id: attendingEvent.id } }"
      >
        <img
          class="card-img-top selectable"
          :src="attendingEvent.coverImg"
          alt="oops"
        />
      </router-link>
      <div class="card-body">
        <h6 class="card-text">
          <div class="row p-1">{{ attendingEvent.name }}</div>
          <div class="row p-1">{{ attendingEvent.location }}</div>
          <div class="row p-1">
            {{ new Date(attendingEvent.startDate).toDateString() }}
          </div>
          <div class="row p-1 justify-content-end">
            <div class="col-md-6">
              {{ attendingEvent.capacity }} tickets left
            </div>
            <div class="col-md-6">
              <button
                @click="deleteTicket(attendingEvent.id)"
                class="btn btn-info"
              >
                Give up ticket
              </button>
            </div>
          </div>
        </h6>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    attendingEvent: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>