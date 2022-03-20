<template>
  <div class="component">
    <div class="container-fluid">
      <div class="row justify-content-center p-2 mt-4">
        <div class="col-md-8">
          <div class="card event-card bg-success">
            <div class="row">
              <div class="col-md-4">
                <img class="img-fluid" :src="activeEvent.coverImg" alt="" />
              </div>
              <div class="col-md-8 p-2">
                <div class="row justify-content-between">
                  <div class="col-md-6 p-2 m-1">
                    <h3>{{ activeEvent.name }}</h3>
                    <h4>{{ activeEvent.type }}</h4>
                  </div>
                  <div class="col-md-4 d-flex p-2 m-1">
                    <div
                      class="row justify-content-end text-right container-fluid"
                    >
                      <h2>{{ activeEvent.startDate }}</h2>
                      <h4></h4>
                    </div>
                  </div>
                </div>

                <div class="row p-2">
                  <p class="text-dark description">
                    {{ activeEvent.description }}
                  </p>
                </div>

                <div class="row justify-content-between">
                  <div class="col-md-5 d-flex align-items-end">
                    <h4>{{ activeEvent.capacity }} spots left!</h4>
                  </div>
                  <div class="col-md-5 d-flex justify-content-center p-2">
                    <button
                      v-if="
                        activeEvent.capacity > 0 ||
                        activeEvent.isCanceled == true
                      "
                      class="btn btn-danger text-dark"
                    >
                      <b> get a ticket!</b> <i class="mdi mdi-ticket"></i>
                    </button>
                    <button v-else class="btn btn-danger text-dark">
                      <b> sold out :/</b>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row text-light justify-content-center">
        <div class="row justify-content-center">
          <div class="col-md-8"><h5>People attending</h5></div>
        </div>
        <!-- for iteration of people attending -->
        <div class="col-md-8 card bg-dark p-2 m-2 shadow">
          <div class="row">
            <div class="col-md-1">
              <img
                class="profile-img"
                src="https://thiscatdoesnotexist.com/"
                alt=""
              />
            </div>
            <div class="col-md-1">
              <img
                class="profile-img"
                src="https://thiscatdoesnotexist.com/"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-md-6 card bg-secondary p-1 m-2 shadow">
          <div class="input-group p-3 align-items-end">
            <input
              type="text"
              class="form-control"
              placeholder="What have you to say?"
              aria-label="Recipient's username with two button addons"
            />
          </div>
          <button class="btn btn-dark" style="width: 150px" type="button">
            SEND
          </button>
          <!-- iteration of comments -->
          <div class="row justify-content-center mt-3 mb-3">
            <div class="col-md-10">
              <div class="row text-dark justify-content-start">
                <div class="col-md-3 d-flex justify-content-start p-2">
                  <img
                    class="comment-img img-fluid"
                    src="https://thiscatdoesnotexist.com/"
                    alt=""
                  />
                </div>
                <div class="col-md-9 card d-flex justify-content-start">
                  <div class="row">Commenters name</div>
                  <div class="row p-1 m-1">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Officiis, illo non vel numquam quos eaque nam ea soluta et
                      doloribus odit quasi est cum? Ab recusandae perferendis
                      quisquam incidunt itaque!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
import { eventsService } from '../services/EventsService';
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      if (route.params.id) {
        try {
          await eventsService.setActiveEvent(route.params.id)
          logger.log("getting this")
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }

      }
    })
    return {
      activeEvent: computed(() => AppState.activeEvent),
    }

  }
}
</script>


<style lang="scss" scoped>
.event-card {
  opacity: 80%;
}
.profile-img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.comment-img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
.button-size {
  width: 150px;
}
.description {
  font-size: 20px;
}
</style>