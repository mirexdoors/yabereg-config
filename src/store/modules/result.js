const Result = {
  state: {
    total: 0,
    isBalcony: false,
    checkedInputs: {},
  },
  mutations: {
    changeBalcony(state, payload) {
      state.isBalcony = payload;
    },
    changeTotal(state, payload) {
      const newTotal = Number(state.total) + Number(payload);
      state.total = newTotal;
    },
    changeChecked(state, payload) {
      if (!state.checkedInputs[payload.id]) state.checkedInputs[payload.id] = [];

      let checkedItems = state.checkedInputs[payload.id];

      const isExistType = checkedItems.some(item=> item.type === payload.type);

      if (!isExistType)
      checkedItems.push({ id: payload.checked, type: payload.type });
      else {
        checkedItems = checkedItems.map(item => {
          if (item.type === payload.type) item.id = payload.checked;
          return item;
        });
      }
      state.checkedInputs = { ...state.checkedInputs, [payload.id]: checkedItems};
    }
  },
  getters: {
    isBalcony: (state) => state.isBalcony,
    total: (state) => state.total,
    checkedInputs: (state) => state.checkedInputs,
  }
};

export default Result;
