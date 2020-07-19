const Result = {
  state: {
    total: 0,
    checkedInputs: {},
  },
  mutations: {
    changeTotal(state, payload) {
      const newTotal = Number(state.total) + Number(payload);
      state.total = newTotal;
    },
    changeChecked(state, payload) {
      state.checkedInputs = { ...state.checkedInputs, [payload.id]: payload.checked };
    }
  },
  getters: {
    total: (state) => state.total,
    checkedInputs: (state) => state.checkedInputs,
  }
};

export default Result;
