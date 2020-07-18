<template>
  <div>
    <div class="result">
      <ul class="result__options">
        <li class="result__optionItem optionItem" v-for="option in options" :key="option.ID">
          <div class="result__option optionItem">
            <input type="checkbox" @change="changeCost" :value="option.PRICE" class="optionItem__checkbox"
                   name="check"
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
          {{total}} ₽
        </div>
        <div class="result__calcItem calcItem">
          0 ₽/м2
        </div>
        <div class="result__calcItem calcItem">
          0 рабочих дней
        </div>
      </div>
      <a data-target="feedback-call" class="result__button btn" aria-haspopup="true"
         aria-expanded="false" href="#feedback-call">
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
        options: []
      };
    },
    mounted() {
      this.options = this.$store.getters.options;
    },
    computed: {
      total() {
        return this.$store.getters.total;
      }
    },
    methods: {
      changeCost(event) {
       const input = event.target;
       const val = input.value;
       if (input.checked) {
         this.$store.commit('changeTotal', val);
       } else {
         this.$store.commit('changeTotal', -1 * val);
       }
      },
      numberWithSpaces(x) {
        return x.toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      }
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
