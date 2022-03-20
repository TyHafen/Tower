<template>
  <div class="about container-fluid">
    <div class="row p-2 m-2">
      <h3 class="text-light">My events</h3>
    </div>
    <div class="row">
      <!-- iteration of my events! -->
      <div class="col-md-2">
        <div class="card bg-success shadow" style="width: ">
          <img
            class="card-img-top"
            src="https://thiscatdoesnotexist.com/"
            alt="Card image cap"
          />
          <div class="card-body">
            <h6 class="card-text">
              <div class="row p-1">Event Title</div>
              <div class="row p-1">Location</div>
              <div class="row p-1">date</div>
              <div class="row p-1 justify-content-end">tickets left</div>
            </h6>
          </div>
        </div>
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
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
</style>
