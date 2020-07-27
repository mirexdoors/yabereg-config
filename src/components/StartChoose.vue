<template>
  <div class="start">
    <div class="start__block chooseBlock">
      <div class="chooseBlock__text">Выберите количество комнат</div>
      <div class="chooseBlock__inputs">
        <div class="chooseBlock__item"
             v-for="(amount, index) in
               roomVariants"
             :key="amount.value"
        >
          <input
            v-model="roomAmout"
            type="radio"
            class="chooseBlock__inputRadio"
            :id="`rooms${index}`"
            :value="amount.value"
            name="rooms">
          <label :class="setSmallFontSize(amount.isSmall)"
                 class="chooseBlock__btn chooseBlock__label"
                 :for="`rooms${index}`">
            {{amount.text}}
          </label>
        </div>
      </div>
    </div>
    <div class="start__block  chooseBlock">
      <div class="chooseBlock__text">Выберите количество санузлов</div>
      <div class="chooseBlock__inputs ">
        <div class="chooseBlock__item"
             v-for="(amount, index) in
               wcVariants"
             :key="amount.value"
        >
          <input
            v-model="wcAmount"
            type="radio"
            :value="amount.value"
            class="chooseBlock__inputRadio"
            :id="`wc${index}`"
            name="wc">
          <label :class="setSmallFontSize(amount.isSmall)"
                 class="chooseBlock__btn chooseBlock__label"
                 :for="`wc${index}`">
            {{amount.value}}
          </label>
        </div>
      </div>
    </div>
    <div class="start__block chooseBlock chooseBlock--wide" :class="isErrorFootage ?
    'chooseBlock--error' : ''">
      <div class="chooseBlock__text">Введите метраж квартиры</div>
      <div class="chooseBlock__inputs">
        <input class="chooseBlock__btn chooseBlock__btn--input chooseBlock__item" type="number"
               min="0" v-model="footage" @input="isErrorFootage = false">
      </div>
    </div>
    <div class="start__block chooseBlock chooseBlock--wide" :class="isErrorBalcony ?
    'chooseBlock--error' : ''">
      <div class="chooseBlock__text">Выберите балкон</div>
      <div class="chooseBlock__inputs">
        <div class="chooseBlock__item"
             v-for="(amount, index) in
               balconyVariants"
             :key="amount.value"
        >
          <input
            v-model="balcony"
            type="radio"
            :value="amount.value"
            class="chooseBlock__inputRadio"
            :id="`balcony${index}`"
            @change="changeBalcony"
            name="balcony">
          <label
            class="chooseBlock__btn chooseBlock__btn--wide chooseBlock__btn--smallText chooseBlock__label"
            :for="`balcony${index}`">
            {{amount.text}}
          </label>
        </div>
      </div>
    </div>
    <button class="submitBtn btn" @click="moveToCalc"><span class="text">Продолжить</span></button>
  </div>
</template>

<script>
  export default {
    name: 'StartChoose',
    data: () => ({
      isErrorFootage: null,
      isErrorBalcony: null,
      roomAmout: 1,
      footage: null,
      wcAmount: 1,
      balcony: undefined,
      balconyVariants: [
        {
          text: 'Балкон/лоджия',
          value: true,
        },
        {
          text: 'Тёплая лоджия',
          value: false,
        },
      ],
      roomVariants: [
        {
          value: 0,
          isSmall: true,
          text: 'Студия'
        },
        { value: 1, text: 1},
        { value: 2, text: 2},
        { value: 3, text: 3},
        { value: 4, text: 4},
      ],
      wcVariants: [
        { value: 1, },
        { value: 2, },
        { value: 3, },
      ],
    }),
    methods: {
      changeBalcony() {
        this.isErrorBalcony = false;
        this.$store.commit('changeBalcony', this.balcony);
      },
      moveToCalc() {
        if (this.footage > 0 && this.balcony !== undefined) {
          this.$emit('moveToCalc');
        }
        if (this.footage < 1) this.isErrorFootage = true;

        if (this.balcony === undefined) this.isErrorBalcony = true;

      },
      setSmallFontSize(bool) {
        return bool ? 'chooseBlock__btn--smallText' : '';
      }
    },
  };
</script>

<style scoped>
  .start {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    max-width: 500px;
    margin: 0 auto;
    padding: 70px;
    border: 1px solid #A2A5B5;
  }

  .chooseBlock {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;

  }
  .chooseBlock.chooseBlock--wide {
    padding: 15px;
  }
  .chooseBlock.chooseBlock--error {
    border: 1px solid red;
  }
  .chooseBlock__text {
    font-size: 1.5rem;
    color: #414551;
    padding-bottom: 15px;
  }

  .chooseBlock__inputs {
    display: flex;
    justify-content: space-around;
  }

  .chooseBlock__item {
    position: relative;
    margin: 0 8px;
    z-index: 0;
  }

  .chooseBlock__label {
    cursor: pointer;
  }

  .chooseBlock__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 57px;
    height: 35px;
    font-size: 1.5rem;
    color: #414551;
    border: 1px solid #A2A5B5;
  }

  .chooseBlock__btn.chooseBlock__btn--wide {
    width: 100px;
  }

  .chooseBlock__inputRadio {
    position: absolute;
    top: 0;
    opacity: 0;
    z-index: 10;
  }

  .chooseBlock__btn.chooseBlock__btn--smallText {
    font-size: 0.56rem;
  }

  .chooseBlock__inputRadio:checked + .chooseBlock__label {
    background-color: #E1BD0C;
  }

  .chooseBlock__btn:not(.chooseBlock__btn--input):focus {
    outline: none;
  }

  .submitBtn {
    width: 290px;
    text-decoration-line: none;
  }

  @media all and (max-width: 1440px) {
    .start {
      padding: 50px;
    }
  }

  @media all and (max-width: 1024px) {
    .start {
      padding: 40px 70px;
    }
  }

  @media all and (max-width: 768px) {
    .chooseBlock__text, .chooseBlock__btn {
      font-size: 1rem;
    }
  }

  @media all and (max-width: 460px) {
    .start {
      width: 380px;
      padding: 40px;
    }

    .chooseBlock__inputs {
      flex-wrap: wrap;
    }

    .chooseBlock__item {
      margin-bottom: 10px;
    }
  }

  @media all and (max-width: 460px) {
    .chooseBlock {
      margin-bottom: 15px;
    }

    .chooseBlock__text {
      padding-bottom: 10px;
    }
  }

  @media all and (max-width: 380px) {
    .start {
      width: 320px;
    }

    .submitBtn {
      width: 250px;
    }
  }
</style>
