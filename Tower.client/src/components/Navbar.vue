<template>
  <nav
    class="
      navbar navbar-expand-lg navbar-dark
      bg-secondary
      px-3
      d-flex
      justify-content-between
    "
  >
    <div class="col-md-3">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      </router-link>
      <div class="div">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
      </div>

      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto">
          <li>
            <router-link
              :to="{ name: 'Home' }"
              class="text-dark lighten-30 selectable text-uppercase"
            >
              <h2 class="text-dark">Home</h2>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-6 d-flex justify-content-center">
      <h1 class="title-text">Tower Events</h1>
    </div>
    <div class="col-md-3 d-flex justify-content-end justify-content-between">
      <!-- make sure someone is logged in to see event button -->
      <button
        class="btn btn-primary shadow"
        data-bs-toggle="modal"
        data-bs-target="#create-modal"
      >
        Create Event
      </button>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
  <Modal id="create-modal">
    <template #modal-title>
      <h4>Create an event</h4>
    </template>
    <template #modal-body><CreateEventForm /></template>
  </Modal>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.title-text {
  font-size: 5em;
  text-shadow: 0px 0px 4px white;
}
</style>
