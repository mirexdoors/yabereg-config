<template>
  <div class="mainWrapper" v-if="settingSteps">
    <div class="mainWrapper__col mainWrapper__col--image">
      <LeftImage :img="images" :currentSetting="settingSteps[currentSetting]"
                 class="mainImage"/>
    </div>

    <div class="mainWrapper__col mainData">
      <Navigation @setStepById="setStepById" ref="nav" :settings="settings"
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
        const allSettings = this.$store.getters.allSettings;
        if (!this.$store.getters.isBalcony) delete allSettings['1032'];
        return allSettings;
      },
      settingSteps() {
        const result = {};
        let i = 0;
        const allSettings = this.$store.getters.allSettings;
        if (allSettings) {
          if (!this.$store.getters.isBalcony) delete allSettings['1032'];
          for (const setting in allSettings) {
            result[i] = setting;
            i++;
          }
          return result;
        }
      },
      images() {
        const images = {};
        const allSettings = this.$store.getters.allSettings;
        if (allSettings) {
          if (!this.$store.getters.isBalcony) delete allSettings['1032'];
          for (const index in this.$store.getters.allSettings) {
            images[allSettings[index].ID] = allSettings[index].PICTURE;
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
        const notChecked = sections.filter((section) => section.ID != 1040 &&
        !checkedInputs.hasOwnProperty(section.ID));

        //проверка на заполнение плинтус/без плинтуса
        if (this.settingSteps[this.currentSetting] == 1031) {
          if (checkedInputs[1034]) {
            const ceilingOption = checkedInputs[1034].filter(item => item.type == 'option');
            if (ceilingOption.length < 1) {
              notChecked.unshift({ ID: 1034 });
            }
          }
        }

        if (Object.keys(checkedInputs).length != 0) {
          let isColorSelected = false;
          const elementsWithColors = [];
          //првоеряем, есть ли привязанные цвета для выбранных инпутов
          sections.forEach(section => {
            elementsWithColors.push(section.elements.filter(element => {
              return element.PROPERTY_TYPE_LINK_VALUE != null;
            }));
          });

          if (elementsWithColors.length > 0) {
            elementsWithColors.forEach(elements => {
              if (elements.length > 0) {
                elements.forEach(element => {
                  if (checkedInputs.hasOwnProperty(element.IBLOCK_SECTION_ID)) {
                    isColorSelected = checkedInputs[element.IBLOCK_SECTION_ID]
                    .some(item => (item.type == 'type' && element.PROPERTY_TYPE_LINK_VALUE !=
                    item.id) || item.type == 'image');
                    console.log(isColorSelected)
                    if (!isColorSelected && notChecked[0].ID != element.IBLOCK_SECTION_ID) {

                      notChecked.unshift({ ID: element.IBLOCK_SECTION_ID });
                    }
                  }
                });
              }
            });
          }
        }

        if (notChecked.length > 0) {
          const firstId = notChecked[0].ID;
          this.error = Number(firstId);
          const component = this.$refs[firstId][0].$el;
          const yOffset = -100;
          const y = component.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        } else {
          let isColorSelected = false;
          const elementsWithColors = [];
          //првоеряем, есть ли привязанные цвета для выбранных инпутов
          sections.forEach(section => {
            elementsWithColors.push(section.elements.filter(element => {
              return element.PROPERTY_TYPE_LINK_VALUE != null;
            }));
          });

          if (elementsWithColors.length > 0) {
            elementsWithColors.forEach(elements => {
              if (elements.length > 0) {
                elements.forEach(element => {
                  isColorSelected = checkedInputs[element.IBLOCK_SECTION_ID]
                  .some(item => (item.type == 'type' && element.PROPERTY_TYPE_LINK_VALUE != item.id)
                  || (item.type == 'image'));
                  if (!isColorSelected) {
                    const firstId = element.IBLOCK_SECTION_ID;
                    this.error = Number(firstId);
                    const component = this.$refs[firstId][0].$el;
                    const yOffset = -100;
                    const y = component.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({
                      top: y,
                      behavior: 'smooth'
                    });
                  }
                });
              }
            });
          } else {
            isColorSelected = true;
          }

          if (isColorSelected) {
            if (val === 'result') {
              this.isResult = true;
            } else {
              this.isResult = false;
              for (const index in this.settingSteps) {
                if (val === this.settingSteps[index]) {
                  this.currentSetting = index;
                }
              }
            }

            const component = this.$refs.nav.$el;
            const yOffset = -100;
            const y = component.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({
              top: y,
              behavior: 'smooth'
            });
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
          return section.ID != 1040 && !checkedInputs.hasOwnProperty(section.ID);
        });

        //проверка на заполнение плинтус/без плинтуса
        if (this.settingSteps[this.currentSetting] == 1031) {
          if (checkedInputs[1034]) {
            const ceilingOption = checkedInputs[1034].filter(item => item.type == 'option');
            if (ceilingOption.length < 1 && notChecked[0].ID !=1034) {
              notChecked.unshift({ ID: 1034 });
            }
          }
        }

        if (Object.keys(checkedInputs).length != 0) {
          let isColorSelected = false;
          const elementsWithColors = [];
          //првоеряем, есть ли привязанные цвета для выбранных инпутов
          sections.forEach(section => {
            elementsWithColors.push(section.elements.filter(element => {
              return element.PROPERTY_TYPE_LINK_VALUE != null;
            }));
          });

          if (elementsWithColors.length > 0) {
            elementsWithColors.forEach(elements => {
              if (elements.length > 0) {
                elements.forEach(element => {
                  if (checkedInputs.hasOwnProperty(element.IBLOCK_SECTION_ID)) {
                    isColorSelected = checkedInputs[element.IBLOCK_SECTION_ID]
                    .some(item => (item.type == 'type' && element.PROPERTY_TYPE_LINK_VALUE !=
                    item.id) || item.type == 'image');
console.log(isColorSelected)
                    if (!isColorSelected && notChecked[0].ID != element.IBLOCK_SECTION_ID) {

                      notChecked.unshift({ ID: element.IBLOCK_SECTION_ID });
                    }
                  }
                });
              }
            });
          }
        }

        if (notChecked.length > 0) {

          //ставим error и переходим к элементу
          const firstId = notChecked[0].ID;
          this.error = Number(firstId);
          const component = this.$refs[firstId][0].$el;
          const yOffset = -100;
          const y = component.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        } else {
          this.error = 0;
          //сравниваем, если нет, то возвращаем к блоку
          const nextIndex = Number(this.currentSetting) + 1;

          if (Object.prototype.hasOwnProperty.call(this.settingSteps, nextIndex)) {
            this.currentSetting++;
          } else if ((!this.$store.getters.isBalcony && nextIndex === 2)
          || (this.$store.getters.isBalcony && nextIndex === 3)) {
            this.isResult = true;
          } else {
            this.isResult = true;
          }

          const component = this.$refs.nav.$el;
          const yOffset = -100;
          const y = component.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
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
