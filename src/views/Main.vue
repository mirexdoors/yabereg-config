<template>
  <div class="mainWrapper" v-if="settingSteps">
    <div class="mainWrapper__col mainWrapper__col--image">
      <LeftImage :img="images" :currentSetting="settingSteps[currentSetting]"
                 class="mainImage"/>
    </div>

    <div class="mainWrapper__col mainData">
      <Navigation @setStepById="setStepById" :settings="settings"
                  :isResult="isResult"
                  :currentSetting="settingSteps[currentSetting]"/>
      <div v-if="!isResult">
        <DecorBlock v-for="section in settings[settingSteps[currentSetting]].sections"
                    :key="section.ID" :error="error" :section="section" :ref="section.ID"/>

        <NextSubmit @nextStep="setNextStep"/>
      </div>
      <ResultScreen v-if="isResult"/>

    </div>
  </div>
</template>
<script>
  import LeftImage from '../components/LeftImage.vue';
  import Navigation from '../components/Navigation.vue';
  import DecorBlock from '../components/DecorBlock.vue';
  import NextSubmit from '../components/NextSubmit.vue';
  import ResultScreen from '../components/ResultScreen.vue';

  export default {
    data: () => ({
      currentSetting: 0,
      isResult: false,
      error: 0,
    }),
    mounted() {
      this.$store.dispatch('getSettings');
    },
    computed: {
      settings() {
        return this.$store.getters.allSettings;
      },
      settingSteps() {
        const result = {};
        let i = 0;
        if (this.$store.getters.allSettings) {
          for (const setting in this.$store.getters.allSettings) {
            result[i] = setting;
            i++;
          }
          return result;
        }
      },
      images() {
        const images = {};
        if (this.$store.getters.allSettings) {
          for (const index in this.$store.getters.allSettings) {
            images[this.$store.getters.allSettings[index].ID] = this.$store.getters.allSettings[index].PICTURE;
          }
        }
        return images;
      },
    },
    methods: {
      setStepById(val) {
        // проверяем, заполнены ли все блоки
        //1. получаем заполненные блоки
        const checkedInputs = this.$store.state.Result.checkedInputs;
        //2. получаем все блоки
        const sections = this.settings[this.settingSteps[this.currentSetting]].sections;
        const notChecked = sections.filter(section => {
          return !checkedInputs.hasOwnProperty(section.ID);
        });
        if (notChecked.length > 0) {
          //ставим error и переходим к элементу
          const firstId = notChecked[0].ID;
          this.error = Number(firstId);
          const component = this.$refs[firstId][0].$el;
          console.log(component);
          component.scrollIntoView({ behavior: 'smooth' });
        } else {

          if (val === 'result') {
            this.isResult = true;
          } else {
            this.isResult = false;
            for (const index in this.settingSteps) {
              if (val == this.settingSteps[index]) {
                this.currentSetting = index;
              }
            }
          }
        }
      },
      setNextStep() {
        // проверяем, заполнены ли все блоки
        //1. получаем заполненные блоки
        const checkedInputs = this.$store.state.Result.checkedInputs;
        //2. получаем все блоки
        const sections = this.settings[this.settingSteps[this.currentSetting]].sections;
        const notChecked = sections.filter(section => {
          return !checkedInputs.hasOwnProperty(section.ID);
        });
        if (notChecked.length > 0) {
          //ставим error и переходим к элементу
          const firstId = notChecked[0].ID;
          this.error = Number(firstId);
          const component = this.$refs[firstId][0].$el;
          console.log(component);
          component.scrollIntoView({ behavior: 'smooth' });
        } else {
          this.error = 0;
          //сравниваем, если нет, то возвращаем к блоку
          const nextIndex = Number(this.currentSetting) + 1;
          if (Object.prototype.hasOwnProperty.call(this.settingSteps, nextIndex)) {
            this.currentSetting++;
          } else if (nextIndex == 3) {
            this.isResult = true;
          }
        }
      }
    },
    components: {
      LeftImage,
      Navigation,
      DecorBlock,
      NextSubmit,
      ResultScreen
    },
  };

</script>
<style scoped>

  .mainWrapper * {
    font-family: 'Gotham Pro', sans-serif;
  }

  .mainWrapper {
    display: flex;
    width: 100%;
  }

  .mainWrapper__col {
    width: 50%;
    height: 100%;
    min-height: 100vh;
    background-color: #fff;
  }

  .mainData {
    padding-top: 74px;
    font-size: 1rem;
    color: #414551;
    background-color: #E0E0E0;
  }

  .mainImage {
    position: fixed;
    top: 0;
    left: 0;
    width: 50%;
  }

  @media screen and (min-width: 1542px) {
    .mainData {
      padding-top: 98px;
    }
  }

  @media screen and (max-width: 1024px) {
    .mainImage {
      display: none;
    }

    .mainWrapper {
      padding-bottom: 30%;
    }

    .mainWrapper__col {
      width: 100%;
    }

    .mainData {
      padding-top: 80px;
    }

    .mainWrapper__col.mainWrapper__col--image {
      display: none;
    }
  }
</style>
