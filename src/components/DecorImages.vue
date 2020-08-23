<template>
  <div class="decorBlock__imageBlock decorImage">
    <div class="decorImage__title">{{blockName}}</div>
    <div class="decorImage__wrapper">
      <div class="decorBlock__image" v-for="item in items" :key="item.ID">
        <input class="decorImage__radio" type="radio"
               :name="'name_' + item.PROPERTY_TYPE_ENUM_ID + '_' + item.IBLOCK_SECTION_ID"
               :id="item.ID"
               :disabled="checkActive(item.PROPERTY_TYPE_LINK_VALUE, item)"
               :checked="isChecked(item.ID)"
               @change="checkInput(item.IBLOCK_SECTION_ID, $event)"
        >
        <label class="decorImage__label" :for="item.ID">
          <div class="decorImage__color" v-if="item.COLOR"
               :style="'background-color:' + item.COLOR"></div>
          <img v-else-if="item.IMAGE" :src="item.IMAGE"
               :alt="item.NAME"
               class="decorImage__img"></label>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DecorImages',
    props: {
      items: Array,
      checkedInputs: Array,
    },
    data: () => ({
      uniqueItems: [],
      blockName: 'Цвет'
    }),
    mounted() {
      //выберем и скроем дубли
      this.uniqueItems = this.items.filter((item, index, self) => self.findIndex(t =>
      t.PROPERTY_IMAGE_COLOR_VALUE === item.PROPERTY_IMAGE_COLOR_VALUE) === index);

      //кастомизация названия блока
      const sectionId = this.items[0].IBLOCK_SECTION_ID;
      if (sectionId == 1039 || sectionId == 1047 || sectionId == 1045 || sectionId == 1048  ||
      sectionId == 1060 || sectionId == 1061) {
        this.blockName = '';
      }
    },
    methods: {
      checkActive(typeLink, element) {
        if (this.checkedInputs) {

         if (element.IBLOCK_SECTION_ID != 1042 && element.IBLOCK_SECTION_ID != 1044) {
           if (this.checkedInputs.some(item => item.type === 'type')) {
             return !this.checkedInputs.some(item => item.type === 'type' && item.id == typeLink)
           } else {
             return  false;
           }
         } else if (element.IBLOCK_SECTION_ID == 1044) {

           if (this.checkedInputs.some(item => item.type === 'type')) {
             return !this.checkedInputs.some(item => item.type === 'type' && item.id == typeLink)
           } else {
             return  true;
           }
         } else {
           if (this.checkedInputs.some(item => item.type === 'option')) {
             return !this.checkedInputs.some(item =>(item.type ===
             'option' &&  item.id == typeLink))
           } else {
             return  true;
           }
         }
        } else {
          if (element.PROPERTY_TYPE_LINK_VALUE) return true;
          else return false
        }
      },
      isChecked(id) {
        if (this.checkedInputs) {
          return this.checkedInputs.some((checkedInput) => {
            return checkedInput.id === id;
          });
        }
        return false;
      },
      checkInput(section, event) {
        const { target } = event;
        this.$store.commit('changeChecked', {
          id: section,
          type: 'image',
          checked: target.id
        });
      }
    }
  };
</script>

<style scoped>
  .decorBlock__imageBlock {
    padding: 10px 0 5px 0;
  }

  .decorImage__title {
    padding-bottom: 8px;
    font-size: 0.8125rem;
    font-weight: bold;
  }

  .decorImage__wrapper {
    display: flex;
    flex-wrap: wrap;
    padding-left: 2px;
  }

  .decorBlock__image {
    position: relative;
    margin-right: 8px;
    margin-bottom: 5px;
    z-index: 0;
  }

  .decorImage__radio {
    position: absolute;
    opacity: 0;
    z-index: 10;
  }

  .decorImage__label {
    display: block;
    max-width: 50px;
    max-height: 50px;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }

  /**/
  .inactiveTitle {
    font-style: italic;
    color: rgba(255, 13, 15, 0.55);
  }

  .decorImage__radio:disabled + .decorImage__label {
    opacity: 0.25;
    cursor: not-allowed;
  }

  .decorImage__radio:checked + .decorImage__label {
    box-shadow: 0 0 0 2px #E1BD0C;
  }

  .decorImage__img {
    width: 100%;
    height: 50px;
  }

  .decorImage__color {
    width: 100%;
    height: 100%;
  }
</style>
