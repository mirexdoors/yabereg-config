<template>
  <div>
    <div class="result">
      <ul class="result__options">
        <li class="result__optionItem optionItem" v-for="option in options" :key="option.ID">
          <div class="result__option optionItem">
            <input type="checkbox" @change="changeCost($event)" :value="option.PRICE"
                   class="optionItem__checkbox"
                   name="check" :checked="isChecked('optionCheck' + option.ID)"
                   :id="'optionCheck' + option.ID ">
            <label class="optionItem__label optionLabel" :for="'optionCheck' + option.ID">
              <div class="optionLabel__field">
                <svg class="optionLabel__svg" width="12" height="9" viewBox="0 0 12 9" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.93457 4.42444L4.30957 7.79944L10.4971 1.61194" stroke="white"
                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="optionLabel__text">
                {{option.NAME}}
              </div>
            </label>
          </div>
          <div class="optionItem__price"> {{numberWithSpaces(option.PRICE)}} р.</div>
        </li>

      </ul>
      <div class="result__calcs">
        <div class="result__calcItem calcItem">
          {{Math.round(total)}} ₽
        </div>
        <div class="result__calcItem calcItem">
          {{Math.round(total/footage)}} ₽/м2
        </div>
        <div class="result__calcItem calcItem">
          60 рабочих дней
        </div>
      </div>
      <a data-target="#feedback_question_adv"
         data-toggle="modal"
         @click="processData"
         class="result__button btn"
         aria-haspopup="true"
         aria-expanded="false"
         href="javascript:;">
        <span class="text">Оставить заявку</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ResultScreen',
    data() {
      return {
        total: 0,
        footage: 1,
        options: []
      };
    },
    mounted() {
      window.calculator = {};
      this.options = this.$store.getters.additionalOptions;
      // расчёт
      let total = 0;
      const mainSections = this.$store.getters.allSettings;
      const wcData = this.$store.getters.wcData;

      const allSections = {};
      const state = this.$store.getters.state;
      const rooms = state.rooms;
      const wc = state.wc;
      const checked = state.checkedInputs;
      const footage = this.footage = state.footage;
      const wcType = state.wcType;

      const wcBowlsAmount = Number(wcData[wc].PROPERTY_TOILET_VALUE);
      const wcTilesAmount = Number(wcData[wc].PROPERTY_TOWEL_RAIL_VALUE);
      const wcWashesAmount = Number(wcData[wc].PROPERTY_WASHBASIN_VALUE);
      const wcBathsAmount = Number(wcData[wc].PROPERTY_BATHS_VALUE);
      const wcSockets = Number(wcData[wc].PROPERTY_SOCKETS_VALUE);
      const wcSpots = (wcType==1 && wc==1) ? 6: Number(wcData[wc].PROPERTY_SPOTS_VALUE);
      const wcSquare = (wcType==1 && wc==1) ? 8 :Number(wcData[wc].PROPERTY_SQUARE_VALUE);


      //сведём все секции в один объект
      for (const roomId in mainSections) {
        mainSections[roomId].sections
        .forEach(section => {
          allSections[section.ID] = { ...section };
        });
      }

      for (const sectionID in checked) {
        checked[sectionID].forEach(checkedItem => {
          if (checkedItem.id != 0) {

            const element = allSections[sectionID].elements.filter(element => element.ID ===
            checkedItem.id)[0];

            // получаем цены за единицу
            const priceWork = element.PRICE_WORK ? Number(element.PRICE_WORK) : 0;
            const priceMaterial = element.PRICE_MATERIAL ? Number(element.PRICE_MATERIAL) : 0;

            //получаем стоимость исходя из раздела
            if (allSections[sectionID].IBLOCK_SECTION_ID == 1031) {  //комната
              if (checkedItem.id != 12696) {
                checkedItem.price_work = priceWork * footage;
                checkedItem.price_material = priceMaterial * footage;
                checkedItem.price =  checkedItem.price_work +  checkedItem.price_material;
              } else {
                checkedItem.price_work = priceWork * wcSquare;
                checkedItem.price_material = 0;
                checkedItem.price =  checkedItem.price_work;
              }
              //стены/плинтус/полы
              if (sectionID == 1035 || sectionID == 1036 || sectionID == 1037) {
                checkedItem.price_work = priceWork  * (footage - wcSquare);
                checkedItem.price_material = priceMaterial * (footage - wcSquare);
                checkedItem.price =  checkedItem.price_work +  checkedItem.price_material;
              }

              //двери/розетки
              if (sectionID == 1038 || sectionID == 1040) {
                if (checkedItem.id != 13425) {
                  checkedItem.price_work  = priceWork * (rooms + wc);
                  checkedItem.price_material = priceMaterial * (rooms + wc);
                  checkedItem.price =  checkedItem.price_work +  checkedItem.price_material;
                } else {
                  checkedItem.price_material = (priceMaterial) * (4 * rooms + wcSockets);
                  checkedItem.price_work = (priceWork) * (4 * rooms + wcSockets);
                  checkedItem.price =  checkedItem.price_work +  checkedItem.price_material;
                } //розетки
              }
              //освещение
              if (sectionID == 1039) {
                if (checkedItem.id == 13038) {
                  checkedItem.price_work = (priceWork) * (6 * rooms + wcSpots);
                  checkedItem.price_material = (priceMaterial) * (6 * rooms + wcSpots);
                  checkedItem.price =  checkedItem.price_work +  checkedItem.price_material;
                } else {
                  checkedItem.price_work = (priceWork) * (rooms + wc);
                  checkedItem.price_material = (priceMaterial) * (rooms + wc);
                  checkedItem.price =  checkedItem.price_work +  checkedItem.price_material;
                }
              }

            } else if (allSections[sectionID].IBLOCK_SECTION_ID == 1032) { //балкон
              checkedItem.price = (priceWork + priceMaterial) * 4;
            } else if (allSections[sectionID].IBLOCK_SECTION_ID == 1033) {  //санузел
              checkedItem.price_work = (priceWork) * wcSquare;
              checkedItem.price_material = (priceMaterial) * wcSquare;
              checkedItem.price =  checkedItem.price_work +  checkedItem.price_material;
              //ванны
              if (sectionID == 1044 || sectionID == 1061) {
                checkedItem.price_work =  (priceWork) * wcBathsAmount;
                checkedItem.price_material =  (priceMaterial) * wcBathsAmount;
                checkedItem.price =  checkedItem.price_work +  checkedItem.price_material;
              }
              //полотенцесушитель
              if (sectionID == 1047) {
                checkedItem.price_work = (priceWork + priceMaterial) * wcTilesAmount;
                checkedItem.price_material = (priceWork + priceMaterial) * wcTilesAmount;
                checkedItem.price =  checkedItem.price_work +  checkedItem.price_material;
              }
              //унитаз
              if (sectionID == 1048) {
                checkedItem.price_work = (priceWork) * wcBowlsAmount;
                checkedItem.price_material = (priceMaterial) * wcBowlsAmount;
                checkedItem.price =  checkedItem.price_work +  checkedItem.price_material;
              }

              //раковина и проч
              if (sectionID == 1046 || sectionID == 1060 || sectionID == 1045) {
                checkedItem.price_work = (priceWork) * wcWashesAmount;
                checkedItem.price_material = (priceMaterial) * wcWashesAmount;
                checkedItem.price =  checkedItem.price_work +  checkedItem.price_material;
              }
            }
          }
        });
      }
      // расчёт общей стоимости
      for (const sectionID in checked) {
          checked[sectionID].forEach(item => {
            if (item.id != 0) {
              total += item.price
            }
          });
      }
      this.total = total;
    },
    computed: {
      state() {
        return this.$store.getters.state;
      },
    },
    methods: {
      processData() {
        window.calculator.total = this.total;
        window.calculator.state = this.$store.getters.state;
      },
      changeCost(event) {
        const input = event.target;
        const val = input.value;
        if (input.checked) {
          this.total += Number(val);
        } else {
          this.total += -1 * Number(val);
        }
        this.$store.commit('changeChecked', { id: 0, type: 'checkbox', checked: input.id });
      },
      numberWithSpaces(x) {
        return x.toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      },
      isChecked(id) {
        if (this.checkedInputs) {
          return this.checkedInputs.some((checkedInput) => {
            return checkedInput.id === id;
          });
        }
        return false;
      },
    }
  };
</script>

<style scoped>
  .result {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 20px 19px;
  }

  .result__options {
    display: flex;
    flex-direction: column;
    padding: 30px 25px 25px 8px;
    border: 1px solid #A2A5B5;
  }

  .result__optionItem {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 30px;
  }

  .optionItem__price {
    font-weight: bold;
    font-size: 0.875rem;
  }

  .result__calcs {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 45px 0 14px 0;
  }

  .calcItem {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(33% - 4px);
    height: 60px;
    font-size: 1.25rem;
    border: 0.5px solid #ECECEC;
    background-color: #FAFAFA;
  }

  .result__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 220px;
    margin: 0 auto;
  }

  @media screen and (max-width: 460px) {
    .result__option {
      width: 60%;
    }

    .result__calcs {
      flex-wrap: wrap;
    }

    .calcItem {
      width: 100%;
      margin-bottom: 10px;
    }
  }
</style>
