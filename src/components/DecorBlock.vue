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
        v-if="(getFilteredElements(section.elements, 'Цвет/Изображение').length > 0)"
        :items="getFilteredElements(section.elements, 'Цвет/Изображение')"
        :checkedInputs="checkedItems"
      />
      <DecorCheckboxes
        v-if="getFilteredElements(section.elements, 'Чекбокс').length > 0"
        :items="getFilteredElements(section.elements, 'Чекбокс')"
        :checkedInputs="checkedItems"
      />
      <DecorOptions
        v-if="getFilteredElements(section.elements, 'Опция').length > 0"
        :items="getFilteredElements(section.elements, 'Опция')"
        :checkedInputs="checkedItems"
      />
    </div>
  </div>
</template>

<script>
  import DecorInputs from './DecorInputs.vue';
  import DecorImages from './DecorImages.vue';
  import DecorOptions from './DecorOptions.vue';
  import DecorCheckboxes from './DecorCheckboxes.vue';

  export default {
    name: 'DecorBlock',
    props: {
      currentSetting: Number,
      section: Object,
      error: Number
    },
    data: () => ({
      checkedType: null,
    }),
    methods: {
      getFilteredElements: (elements, type) => elements.filter((element) => element.PROPERTY_TYPE_VALUE === type),
    },
    computed: {
      checkedItems() {
        return this.$store.state.Result.checkedInputs[this.section.ID];
      }

    },
    components: {
      DecorImages,
      DecorInputs,
      DecorOptions,
      DecorCheckboxes
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
