<template>
  <div class="component">
    <div class="row text-dark justify-content-start">
      <div class="col-md-3 d-flex justify-content-start p-2">
        <img
          class="comment-img img-fluid"
          :src="comment.creator.picture"
          alt=""
        />
      </div>
      <div class="col-md-9 card d-flex justify-content-start">
        <div class="row">
          <div class="col-md-8">
            {{ comment.creator.name }}
          </div>
          <div class="col-md-4 d-flex justify-content-end">
            <i
              @click="deleteComment(comment.id)"
              v-if="account.id == comment.creatorId"
              class="mdi mdi-delete"
            >
            </i>
          </div>
        </div>
        <div class="row p-1 m-1">
          <p>
            {{ comment.body }}
          </p>
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
import { commentsService } from '../services/CommentsService';
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async deleteComment(commentId) {
        try {
          if (await Pop.confirm("Are you sure you want to delete?")) {
            await commentsService.deleteComment(commentId)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }

    }
  }
}
</script>


<style lang="scss" scoped>
.comment-img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
</style>