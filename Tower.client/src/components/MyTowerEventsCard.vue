<template>
  <div class="component">
    <div class="card bg-success shadow" style="width: ">
      <router-link
        :to="{ name: 'EventDetails', params: { id: myTowerEvent.id } }"
      >
        <img
          class="card-img-top selectable"
          :src="myTowerEvent.coverImg"
          alt="oops"
        />
      </router-link>
      <div class="card-body">
        <h6 class="card-text">
          <div class="row p-1">{{ myTowerEvent.name }}</div>
          <div class="row p-1">{{ myTowerEvent.description }}</div>
          <div class="row p-1">
            {{ new Date(myTowerEvent.startDate).toDateString() }}
          </div>
          <div class="row p-1">{{ myTowerEvent.location }}</div>
          <div class="row p-1 justify-content-end">
            <div class="col-md-6">{{ myTowerEvent.capacity }} tickets left</div>
            <div class="col-md-6">
              <button
                v-if="
                  account.id == myTowerEvent.creatorId &&
                  myTowerEvent.isCanceled == false
                "
                class="btn btn-primary shadow btn-border"
                data-bs-toggle="modal"
                data-bs-target="#edit-modal"
              >
                edit event
              </button>
            </div>
          </div>
        </h6>
      </div>
    </div>
  </div>
  <Modal id="edit-modal">
    <template #modal-title>
      <h4>edit the event</h4>
    </template>
    <template #modal-body
      ><EditEventForm :myTowerEvent="myTowerEvent"
    /></template>
  </Modal>
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