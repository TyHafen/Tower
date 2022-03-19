<template>
  <div class="container-fluid">
    <div class="home p-5 bg-secondary rounded mt-4 mx-5 banner"></div>
    <div class="row justify-content-center p-3">
      <div class="card bg-primary">
        <!-- Links to filter events by type -->
        <div class="row justify-content-around align-items-center">
          <div class="col-md-2 d-flex justify-content-center"><h4>All</h4></div>
          <div class="col-md-2 d-flex justify-content-center">
            <h4>Concert</h4>
          </div>
          <div class="col-md-2 d-flex justify-content-center">
            <h4>Convention</h4>
          </div>
          <div class="col-md-2 d-flex justify-content-center">
            <h4>Sport</h4>
          </div>
          <div class="col-md-2 d-flex justify-content-center">
            <h4>Digital</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="row p-3 m-2 justify-content-around">
      <!-- only use on of these for event card component -->
      <EventCard />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.card {
  width: 90vw;
}
.home {
  height: 20vh;
  place-content: center;
  text-align: center;
}
.banner {
  background-image: url("https://th.bing.com/th/id/R.5262ab982c788842625ed1379a372be8?rik=RAGJzIyw1ElJrA&pid=ImgRaw&r=0");
}
</style>
