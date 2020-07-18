<template>
  <div class="decorBlock">
    <div class="decorBlock__titleBlock titleBlock" @click="slideBlock">
      <div class="titleBlock__title"> {{section.NAME}}</div>
      <div class="titleBlock__line"></div>
    </div>
    <div class="slidedBlock  js-slide" ref="slidedBlock" v-if="section.elements">
      <DecorInputs v-if="(getFilteredElements(section.elements, 'Тип').length > 0)"
                   :items="getFilteredElements(section.elements, 'Тип')"/>
      <DecorImages v-if="(getFilteredElements(section.elements, 'Цвет/Изображение').length > 0)"
                   :items="getFilteredElements(section.elements, 'Цвет/Изображение')"/>
      <DecorOptions v-if="getFilteredElements(section.elements, 'Опция').length > 0"
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
    },
    methods: {
      slideBlock() {
        if (this.$refs.slidedBlock) {
          this.$refs.slidedBlock.classList.toggle('hidden');
        }
      },
      getFilteredElements: (elements, type) => elements.filter((element) =>
        element.PROPERTY_TYPE_VALUE === type)
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
    padding: 0 50px 0 25px;
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
    padding-bottom: 20px;
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

  .slidedBlock.hidden {
    max-height: 0;
  }

  @media screen and (max-width: 768px) {
    .decorBlock {
      margin-right: 20px;
      padding-top: 0;
    }

    .slidedBlock {
      max-height: 0;
    }

    .slidedBlock.hidden {
      max-height: 600px;
    }

    .decorBlock__titleBlock {
      padding-top: 25px;
    }

  }
</style>
