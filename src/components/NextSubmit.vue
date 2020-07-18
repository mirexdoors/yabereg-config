<template>
  <button class="nextSubmit" @click="setNextStep">
    <div class="nextSubmit__text btn"><span class="text">Продолжить</span></div>
  </button>
</template>

<script>
  export default {
    name: 'NextSubmit',
    methods: {
      setNextStep() {
        this.$emit("nextStep");
      }
    },
  };
</script>

<style scoped>
.nextSubmit {
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  padding-left: 42px;
  background-color:  #E3BC41;
  outline: none;
}
  .nextSubmit__text.btn {
    margin-right: 10px;
    box-shadow: none;
    background-color: transparent;
  }
</style>
