<template>
  <div class="component">
    <div
      class="event-card selectable card bg-success col-md-4 rounded shadow"
      style="width: 28rem"
    >
      <img
        src="https://thiscatdoesnotexist.com/"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <div class="row align-items-center justify-content-center p-1 m-0">
          <div class="col-8 d-flex">
            <h3 class="card-title"><b> Event name</b></h3>
          </div>
          <div class="col-4 d-flex">
            <p class="ticket-font">tickets left</p>
          </div>
          <div class="row">
            <div class="col-12 d-flex p-0">
              <h4>Location | date</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.ticket-font {
  font-size: 20px;
}
</style>