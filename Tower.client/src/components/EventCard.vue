<template>
  <div class="component">
    <div
      style="width: 25rem"
      class="event-card selectable card bg-success rounded shadow"
    >
      <img
        :src="towerEvent.coverImg"
        class="card-img-top photo-tint"
        alt="..."
      />
      <div class="card-body">
        <div class="row align-items-center justify-content-center p-1 m-1">
          <div class="col-md-7 d-flex">
            <h4 class="card-title">
              <b>{{ towerEvent.name }}</b>
            </h4>
          </div>
          <div class="col-md-5 d-flex">
            <div v-if="towerEvent.isCanceled == false">
              <p v-if="towerEvent.capacity > 0" class="ticket-font">
                {{ towerEvent.capacity }} tickets left
              </p>
              <h3 v-if="towerEvent.capacity == 0" class="t">SOLD OUT</h3>
              <p class="ticket-font">
                {{ new Date(towerEvent.startDate).toDateString() }}
              </p>
            </div>
            <div v-if="towerEvent.isCanceled == true"><h2>Canceled</h2></div>
          </div>
          <div class="row">
            <div class="col-12 d-flex p-0">
              <h5>{{ towerEvent.location }} | {{ towerEvent.type }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    towerEvent: {
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
.ticket-font {
  font-size: 18px;
}
.photo-tint {
  content: "";
  display: block;

  background: rgba(0, 255, 255, 0.5);
}
</style>