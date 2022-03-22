<template>
  <div class="component">
    <img
      :title="ticket.name"
      class="profile-img"
      :src="ticket.picture"
      alt=""
    />
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
.profile-img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
</style>