<template>
  <div class="start_wrapper">
    <StartChoose @moveToCalc="moveToCalc" />
  </div>
</template>

<script>
import StartChoose from '@/components/StartChoose.vue';

export default {
  name: 'Home',
  components: {
    StartChoose,
  },
  methods: {
    moveToCalc() {
      this.$emit('moveToCalc');
    }
  }
};
</script>
<style scoped>
  .start_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 5% 0;
  }
  @media screen and (max-width:460px) {
    .start_wrapper {
      margin: 25% 0;
    }

  }
</style>
