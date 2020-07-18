<template>
  <div class="decorBlock__imageBlock decorImage">
    <div class="decorImage__title">Цвет</div>
    <div class="decorImage__wrapper">
      <div class="decorBlock__image" v-for="(item , index) in items" :key="item.ID">
        <input class="decorImage__radio" type="radio"
               :name="'name_' + item.PROPERTY_TYPE_ENUM_ID + '_' + item.IBLOCK_SECTION_ID"
               :id="item.ID"
               :checked="index
         == 0 ? 'checked' : ''">
        <label class="decorImage__label" :for="item.ID">
          <div class="decorImage__color" v-if="item.PROPERTY_COLOR_VALUE"
               :style="'background-color:' + item.PROPERTY_COLOR_VALUE"></div>
          <img v-else-if="item.PROPERTY_IMAGE_VALUE" :src="item.PROPERTY_IMAGE_VALUE"
               :alt="item.NAME"
               class="decorImage__img"></label>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      items: Array,
    },
    name: 'DecorImages'
  };
</script>

<style scoped>
  .decorBlock__imageBlock {
    padding: 10px 0 20px 0;
  }

  .decorImage__title {
    padding-bottom: 8px;
    font-size: 0.8125rem;
    font-weight: bold;
  }

  .decorImage__wrapper {
    display: flex;
  }

  .decorBlock__image {
    position: relative;
    margin-right: 8px;
    z-index: 0;
  }

  .decorImage__radio {
    position: absolute;
    opacity: 0;
    z-index: 10;
  }

  .decorImage__label {
    display: block;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }

  .decorImage__radio:checked + .decorImage__label {
    border: 2px solid #E1BD0C;
  }

  .decorImage__img {
    width: 100%;
  }

  .decorImage__color {
    width: 46px;
    height: 46px;
  }
</style>
