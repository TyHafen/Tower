<template>
  <div class="component">
    <div class="card bg-success shadow" style="width: ">
      <router-link
        :to="{ name: 'EventDetails', params: { id: myTowerEvent.id } }"
      >
        <img
          class="card-img-top selectable"
          :src="myTowerEvent.coverImg"
          alt="Card image cap"
        />
      </router-link>
      <div class="card-body">
        <h6 class="card-text">
          <div class="row p-1">{{ myTowerEvent.name }}</div>
          <div class="row p-1">{{ myTowerEvent.location }}</div>
          <div class="row p-1">{{ myTowerEvent.startDate }}</div>
          <div class="row p-1 justify-content-end">
            <div class="col-md-6">{{ myTowerEvent.capacity }} tickets left</div>
            <div class="col-md-6">
              <button
                v-if="account.id == myTowerEvent.creatorId"
                class="btn btn-primary shadow btn-border"
              >
                edit event
              </button>
            </div>
          </div>
        </h6>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {

  props: {
    myTowerEvent: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
    }

  }
}
</script>


<style lang="scss" scoped>
</style>