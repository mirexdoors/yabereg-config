<template>
  <div class="decorBlock" :class="error===Number(section.ID) ? 'error' : ''">
    <div class="decorBlock__titleBlock titleBlock">
      <div class="titleBlock__title"> {{section.NAME}}</div>
      <div class="titleBlock__line"></div>
    </div>
    <div class="slidedBlock  js-slide" ref="slidedBlock" v-if="section.elements">
      <DecorInputs
        v-if="(getFilteredElements(section.elements, 'Тип').length > 0)"
        :items="getFilteredElements(section.elements, 'Тип')"
        :checkedInputs="checkedItems"
      />
      <DecorImages
        :inactive="getConditions(section)"
        v-if="(getFilteredElements(section.elements, 'Цвет/Изображение').length > 0)"
        :items="getFilteredElements(section.elements, 'Цвет/Изображение')"
      />
      <DecorOptions
        v-if="getFilteredElements(section.elements, 'Опция').length > 0"
        :items="getFilteredElements(section.elements, 'Опция')"/>
    </div>
  </div>
</template>

<script>
  import DecorInputs from './DecorInputs.vue';
  import DecorImages from './DecorImages.vue';
  import DecorOptions from './DecorOptions.vue';

  export default {
    name: 'DecorBlock',
    props: {
      currentSetting: Number,
      section: Object,
      error: Number
    },
    methods: {
      getFilteredElements: (elements, type) => elements.filter((element) => element.PROPERTY_TYPE_VALUE === type),
      getConditions(section) {
        // найдём элементы (изорбражения)  с условиями
        const types = section.elements
        .filter(element => element.PROPERTY_TYPE_VALUE === 'Тип' && element.PROPERTY_CONDITION_SHOW_IMAGES_VALUE === 'Y');

        if (types.length > 0) {
          /* если в "Типах" есть элемент с активным условием, то не показываем блок по дефолту.
           ** показываем только если этот "тип" активен
          * */
          if (this.checkedItems) {
            const typeIdsForActivate = types.map((item) => {
              return item.ID;
            });

           const typeCheckedInputs = this.checkedItems.filter((input) => input.type === 'type');
           if (typeCheckedInputs[0])
            if (typeIdsForActivate.indexOf(typeCheckedInputs[0].id) !== -1) {
              return true;
            }
            return false;
          }
        } else {
          return true;
        }
      }
    },
    computed: {
      checkedItems() {
        return this.$store.state.Result.checkedInputs[this.section.ID];
      }

    },
    components: {
      DecorImages,
      DecorInputs,
      DecorOptions
    },
  };
</script>

<style scoped>
  .decorBlock {
    padding: 0 50px 10px 25px;
    margin: 20px 0 20px 20px;
    background: #FFFFFF;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    font-size: 0.875rem;
  }

  .decorBlock__titleBlock {
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 25px;
    padding-bottom: 10px;
    cursor: pointer;
  }

  .titleBlock .titleBlock__title {
    padding-right: 10px;
    font-size: 1rem;
    font-weight: bold;
    white-space: nowrap;
  }

  .titleBlock__line {
    width: 100%;
    height: 1px;
    background-color: #E1BD0C;
  }

  .slidedBlock {
    overflow: hidden;
    transition: max-height .7s ease-in-out;
    height: auto;
    max-height: 300px;
  }

  .decorBlock.error {
    border: 1px solid red;
  }

  @media screen and (max-width: 768px) {
    .decorBlock {
      margin-right: 20px;
      padding-top: 0;
    }

    .slidedBlock {
      max-height: 0;
    }

    .decorBlock .slidedBlock {
      max-height: 600px;
    }

    .decorBlock__titleBlock {
      padding-top: 25px;
    }

  }
</style>
