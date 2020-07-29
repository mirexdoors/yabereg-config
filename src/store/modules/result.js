const Result = {
  state: {
    total: 0,
    isBalcony: false,
    checkedInputs: {},
    rooms: 1,
    wc: 1,
    footage: 0,
  },
  mutations: {
    setStartData(state, payload) {
      state.isBalcony = payload.isBalcony;
      state.rooms = payload.rooms === 0 ? 1 : payload.rooms;
      state.wc = payload.wc;
      state.footage = payload.footage;
    },
    changeChecked(state, payload) {
      if (!state.checkedInputs[payload.id]) state.checkedInputs[payload.id] = [];

      let checkedItems = state.checkedInputs[payload.id];

      const isExistType = checkedItems.some((item)=> item.type === payload.type);

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
    state: (state) => state,
    isBalcony: (state) => state.isBalcony,
    total: (state) => state.total,
    checkedInputs: (state) => state.checkedInputs,
  }
};

export default Result;
