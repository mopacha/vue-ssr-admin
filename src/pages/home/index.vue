<template>
  <div class="home-container">
    <div v-for="i in 1">
      <div class="home-text">name: {{ name }} {{i}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.home {
   &-container {
		 padding: 20px;
		 background-color: #fff;
  }

  &-text {
    font-size: 30px;
    color: blue;
  }
}
</style>
