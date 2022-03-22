<template>
  <div class="component">
    <div class="card bg-success shadow" style="width: ">
      <router-link :to="{ name: 'EventDetails', params: { id: myTicket.id } }">
        <img
          class="card-img-top selectable"
          :src="attendingEvent.coverImg"
          alt="Card image cap"
        />
      </router-link>
      <div class="card-body">
        <h6 class="card-text">
          <div class="row p-1">{{ myTicket.name }}</div>
          <div class="row p-1">{{ myTicket.location }}</div>
          <div class="row p-1">{{ myTicket.startDate }}</div>
          <div class="row p-1 justify-content-end">
            <div class="col-md-6">{{ myTicket.capacity }} tickets left</div>
            <div class="col-md-6"></div>
          </div>
        </h6>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    myTicket: {
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