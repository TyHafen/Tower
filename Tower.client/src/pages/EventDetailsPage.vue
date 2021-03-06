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
                  <div class="col-md-6 p-2 m-3">
                    <h3>{{ activeEvent.name }}</h3>
                    <h4>{{ activeEvent.type }}</h4>
                  </div>
                  <div class="col-md-4 d-flex p-2 m-1">
                    <div class="row container-fluid">
                      <h2>
                        {{ new Date(activeEvent.startDate).toDateString() }}
                      </h2>
                    </div>
                  </div>
                </div>

                <div class="row p-2">
                  <p class="text-dark description m-2">
                    {{ activeEvent.description }}
                  </p>
                </div>

                <div class="row justify-content-between">
                  <div class="col-md-5 d-flex align-items-end m-2">
                    <h4 v-if="!activeEvent.isCanceled">
                      {{ activeEvent.capacity }} spots left!
                    </h4>
                    <h4 v-else>CANCELED</h4>
                  </div>

                  <div class="col-md-5 d-flex justify-content-center p-2 m-2">
                    <button
                      @click="createTicket()"
                      v-if="
                        !hasTicket &&
                        !activeEvent.isCanceled &&
                        activeEvent.capacity > 0
                      "
                      class="btn btn-danger text-dark"
                    >
                      <b> get a ticket!</b> <i class="mdi mdi-ticket"></i>
                    </button>

                    <button
                      v-else-if="activeEvent.capacity == 0"
                      class="btn btn-danger text-dark mx-2"
                    >
                      <b> sold out :/</b>
                    </button>
                    <h3 v-else-if="hasTicket">Congrats you're going!</h3>

                    <button
                      @click="cancelEvent()"
                      v-if="
                        activeEvent.creatorId == account.id &&
                        activeEvent.isCanceled == false
                      "
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
              <TicketHolderPhoto :ticket="t" />
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-3 m-2">
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
          <div class="row justify-content-center m-2">
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
    watchEffect(async () => {
      if (route.params.id) {
        try {
          eventsService.setActiveEvent(route.params.id)
          commentsService.getComments(route.params.id)
          ticketsService.getEventTickets(route.params.id)
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
          let comment = {
            creatorId: AppState.account.id,
            eventId: route.params.id,
            body: editable.value.body
          }
          await commentsService.createComment(comment)
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
      tickets: computed(() => AppState.tickets.filter(t => t.eventId == route.params.id)),
      hasTicket: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id && t.eventId == route.params.id))

    }

  }
}
</script>


<style lang="scss" scoped>
.event-card {
  opacity: 80%;
}

.button-size {
  width: 150px;
}
.description {
  font-size: 20px;
}
</style>