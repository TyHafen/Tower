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
                  <div class="col-md-5 d-flex justify-content-center p-2 m-2">
                    <button
                      @click="createTicket()"
                      v-if="
                        activeEvent.capacity > 0 ||
                        activeEvent.isCanceled == true
                      "
                      class="btn btn-danger text-dark"
                    >
                      <b> get a ticket!</b> <i class="mdi mdi-ticket"></i>
                    </button>
                    <button v-else class="btn btn-danger text-dark mx-2">
                      <b> sold out :/</b>
                    </button>
                    <button
                      @click="cancelEvent()"
                      v-if="activeEvent.creatorId == account.id"
                      class="btn btn-primary mx-2"
                    >
                      <b>cancel event</b>
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

        <div class="col-md-8 card bg-dark p-2 m-2 shadow">
          <div class="row">
            <div v-for="t in tickets" :key="t.id" class="col-md-1">
              <TicketHolderPhoto :tickets="c" />
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-md-6 card bg-secondary p-1 m-2 shadow">
          <div class="input-group p-3 align-items-end">
            <input
              v-model="editable.body"
              type="text"
              placeholder=" what would you like to say? "
            />
          </div>
          <button
            @click="createComment()"
            class="btn btn-dark"
            style="width: 150px"
            type="button"
          >
            SEND
          </button>
          <!-- iteration of comments -->
          <div class="row justify-content-center mt-3 mb-3">
            <div v-for="c in comments" :key="c.id" class="col-md-10">
              <Comment :comment="c" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, onMounted, watchEffect, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { eventsService } from '../services/EventsService';
import { commentsService } from '../services/CommentsService';
import { ticketsService } from '../services/TicketsService';
export default {
  setup() {
    let editable = ref({})
    const route = useRoute();
    onMounted(async () => {
      if (route.params.id) {
        try {
          await eventsService.setActiveEvent(route.params.id)
          await commentsService.getComments(route.params.id)
          await ticketsService.getEventTickets(route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }

      }
    })
    return {
      editable,
      async cancelEvent() {
        try {
          if (await Pop.confirm("Are you sure you want to cancel this event?")) {
            await eventsService.cancelEvent(route.params.id)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async createComment() {
        try {
          editable.eventId = route.params.id
          await commentsService.createComment(editable.value)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }

      },
      async createTicket() {
        let newTicket = {
          accountId: AppState.account.id,
          eventId: route.params.id
        };
        await ticketsService.createTicket(newTicket)
      },
      activeEvent: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments.filter(c => c.eventId == route.params.id)),
      tickets: computed(() => AppState.tickets.filter(t => t.eventId == route.params.id))

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

.button-size {
  width: 150px;
}
.description {
  font-size: 20px;
}
</style>