<template>

  <div class="decorBlock__inputs">
    <div class="decorBlock__inputItem decorInput" v-for="item in items" :key="item.ID">
      <input class="decorInput__radio" type="radio"
             :name="'name_' + item.PROPERTY_TYPE_ENUM_ID + '_' + item.IBLOCK_SECTION_ID"
             :id="item.ID"
             :checked="isChecked(item.ID)"
             :value="item.PROPERTY_PRICE_VALUE"
             @change="checkInput(item.IBLOCK_SECTION_ID, $event)"
      >
      <label class="decorInput__label" :for="item.ID">{{item.NAME}}</label>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      items: Array,
      checkedInputs: Array
    },
    name: 'decorInputs',
    methods: {
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
        this.$store.commit('changeChecked', { id: section, type: 'type', checked: target.id });
      }
    }
  };
</script>

<style scoped>
  .decorBlock__inputs {
    display: flex;
    width: 100%;
    padding: 10px 0 3px 0;
  }

  .decorBlock__inputItem {
    width: 220px;
    height: 47px;
    position: relative;
    z-index: 0;
  }

  .decorInput__radio {
    position: absolute;
    opacity: 0;
    z-index: 10;
  }

  .decorInput__label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
    border: 0.5px solid #ECECEC;
    background-color: #FAFAFA;
    cursor: pointer;
  }

  .decorInput__radio:checked + .decorInput__label {
    color: #FFFFFF;
    font-weight: bold;
    background-color: #E1BD0C;
    cursor: pointer;
  }

  @media screen and (max-width: 1440px) {
    .decorBlock__inputs {
      flex-wrap: wrap;
    }

    .decorBlock__inputItem {
      margin-bottom: 8px;
      margin-right: 8px;
    }
  }
  @media screen and (max-width: 768px) {
    .decorBlock__inputItem {
      margin-right: 0;
    }
  }
</style>
