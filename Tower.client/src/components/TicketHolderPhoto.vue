<template>
  <div class="component">
    <!-- <img class="profile-img" :src="ticket.account.picture" alt="" /> -->
  </div>
</template>


<script>
export default {
  props: {
    ticket: {
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