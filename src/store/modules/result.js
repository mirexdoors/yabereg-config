const Result = {
  state: {
    total: 0,
  },
  mutations: {
    changeTotal(state, payload) {
      const newTotal = Number(state.total) + Number(payload);
      state.total = newTotal;
    },
  },
  getters: {
    total: (state) => state.total,
  }
};

export default Result;
