<!-- TODO -->

<template>

    <b-alert
      v-if="this.$store.getters.getNotify"
      class="alert-box"
      :show="dismissCountDown"
      dismissible
      fade
      variant="warning"
    >
      {{ this.$store.getters.getNotify }}
    </b-alert>
</template>

<script>

export default {
  name: 'Notify',
  data() {
      return {    
          dismissCountDown: this.$store.getters.getNotifyTime,
      }
  },
  
  methods: {
  },

}
</script>

<style lang="scss" scoped>
  .alert-box{
    position: fixed;
    bottom: 0;
    width: 40vw;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
