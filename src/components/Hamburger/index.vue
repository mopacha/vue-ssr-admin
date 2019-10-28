<template>
  <div style="padding: 0 15px;"
       @click="toggleClick">
    <svg xmlns="http://www.w3.org/2000/svg"
         :class="{'is-active':isActive}"
         class="hamburger"
         width="24px"
         height="20px"
         viewBox="0 0 24 20">
      <path d="M1.09071698,2 L22.909283,2 C23.5116656,2 24,1.55228125 24,1 C24,0.44771875 23.5116656,8.8817842e-15 22.909283,8.8817842e-15 L1.09071698,8.8817842e-15 C0.488334441,8.8817842e-15 3.01980663e-14,0.44771875 3.01980663e-14,1 C3.01980663e-14,1.55228125 0.488334441,2 1.09071698,2 Z M22.8811384,9 L9.11886156,9 C8.5009353,9 8,9.44771875 8,10 C8,10.5522813 8.5009353,11 9.11886156,11 L22.8811384,11 C23.4990647,11 24,10.5522813 24,10 C24,9.44771875 23.4990647,9 22.8811384,9 L22.8811384,9 Z M22.909283,18 L1.09071698,18 C0.488334441,18 3.01980663e-14,18.4477188 3.01980663e-14,19 C3.01980663e-14,19.5522813 0.488334441,20 1.09071698,20 L22.909283,20 C23.5116656,20 24,19.5522813 24,19 C24,18.4477188 23.5116656,18 22.909283,18 L22.909283,18 Z M5.00095184,5 L0.00095184136,10 L5.00095184,15 L5.00095184,5 Z" fill="#C4CDDA" />
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
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
