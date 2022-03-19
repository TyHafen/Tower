<template>
  <div class="container-fluid">
    <div class="home p-5 bg-secondary rounded mt-4 mx-5 banner"></div>
    <div class="row p-3 m-2 justify-content-around">
      <!-- only use on of these for event car component -->
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
.home {
  height: 20vh;
  place-content: center;
  text-align: center;
}
.banner {
  background-image: url("https://th.bing.com/th/id/R.5262ab982c788842625ed1379a372be8?rik=RAGJzIyw1ElJrA&pid=ImgRaw&r=0");
}
</style>
