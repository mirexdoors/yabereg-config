<template>
  <ul class="navigation">
    <li @click="setStep(setting.ID)" class="navigation__item" :class="!isResult && currentSetting
     ==
    setting.ID ?
    'active' :
     ''"
        v-for="setting
     in
    settings"
        :key="setting.ID">
      {{setting.NAME}}
    </li>
    <li @click="setStep('result')" class="navigation__item" :class="isResult ? 'active' : 'false'"
    >
      Дополнительно
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'Navigation',
    props: {
      currentSetting: String,
      settings: Object,
      isResult: Boolean
    },
    methods: {
      setStep(id) {
        this.$emit('setStepById', id);
      }
    },
  };
</script>

<style scoped>
  .navigation {
    display: flex;
    width: 100%;
    height: 45px;
    padding-top: 11px;
    padding-left: 19px;
    background-color: #E1BD0C;
  }

  .navigation__item {
    padding: 11px 25px;
    font-size: 0.875rem;
    font-weight: bold;
    color: #FFFFFF;
    cursor: pointer;
  }

  .navigation__item.active {
    color: #414155;
    border-radius: 5px 5px 0px 0px;
    background-color: #E0E0E0;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 640px) {
    .navigation {
      flex-direction: column;
      align-items: center;
      height: auto;
      padding-left: 0;
    }

    .navigation__item {
      display: flex;
      width: 280px;
      justify-content: center;
    }
  }
</style>
