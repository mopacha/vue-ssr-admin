<template>
  <div style="padding: 0 15px;"
       @click="toggleClick">
    <svg :class="{'is-active':isActive}"
         class="hamburger"
         width="24px"
         height="24px"
         viewBox="0 0 24 24"
         version="1.1"
         xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink">
      <g stroke="none"
         stroke-width="1"
         fill="none"
         fill-rule="evenodd">
        <rect fill="#EDF1FF"
              x="0"
              y="0"
              width="24"
              height="24"
              rx="2"></rect>
        <path d="M6,6 L18,6 C18.5522847,6 19,6.44771525 19,7 C19,7.55228475 18.5522847,8 18,8 L6,8 C5.44771525,8 5,7.55228475 5,7 C5,6.44771525 5.44771525,6 6,6 Z M6,16 L18,16 C18.5522847,16 19,16.4477153 19,17 C19,17.5522847 18.5522847,18 18,18 L6,18 C5.44771525,18 5,17.5522847 5,17 C5,16.4477153 5.44771525,16 6,16 Z M10,11 L18,11 C18.5522847,11 19,11.4477153 19,12 C19,12.5522847 18.5522847,13 18,13 L10,13 C9.44771525,13 9,12.5522847 9,12 C9,11.4477153 9.44771525,11 10,11 Z M5,12 L8,10 L8,14 L5,12 Z"
              fill="#396AFF"></path>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
