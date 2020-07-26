<template>
  <div class="decorBlock__optionsBlock">
    <div class="decorBlock__optionItem optionItem" v-for="item in items" :key="item.ID">
      <input type="radio"
             class="optionItem__checkbox"
             :name="'name_' + item.PROPERTY_TYPE_ENUM_ID + '_' + item.IBLOCK_SECTION_ID"
             :id="item.ID"
             @change="checkInput(item.IBLOCK_SECTION_ID, $event)"
      >
      <label class="optionItem__label optionLabel" :for="item.ID">
        <div class="optionLabel__field">
          <svg class="optionLabel__svg" width="12" height="9" viewBox="0 0 12 9" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M0.93457 4.42444L4.30957 7.79944L10.4971 1.61194" stroke="white"
                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="optionLabel__text">
          {{item.NAME}}
        </div>
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      items: Array,
    },
    name: 'DecorOptions',
    methods: {
      checkInput(section, event) {
        const { target } = event;
        this.$store.commit('changeChecked', { id: section, type: 'option', checked: target.id });
      }
    }
  };
</script>

<style scoped>
  .decorBlock__optionsBlock {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0 20px 0;
  }

  .optionItem__label {
    display: flex;
    margin-right: 45px;
  }
  .decorBlock__optionItem {
    margin-bottom: 5px;
  }

  @media screen and (max-width: 767px){
    .decorBlock__optionItem {
      padding: 10px 0;
    }
    .optionItem__label {
      margin-right: 0;
    }
  }
</style>
