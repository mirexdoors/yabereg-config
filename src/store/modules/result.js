const Result = {
  state: {
    total: 0,
    isBalcony: false,
    checkedInputs: {},
    rooms: 1,
    wc: 1,
    wcType: null,
    footage: 0,
  },
  mutations: {
    setStartData(state, payload) {
      console.log(payload)
      state.isBalcony = payload.isBalcony;
      state.rooms = payload.rooms === 0 ? 1 : payload.rooms;
      state.wc = payload.wc;
      state.wcType = payload.wcType;
      state.footage = payload.footage;
    },
    changeChecked(state, payload) {
      if (!state.checkedInputs[payload.id]) state.checkedInputs[payload.id] = [];

      let checkedItems = state.checkedInputs[payload.id];

      const isExistType = checkedItems.some((item)=> item.type === payload.type && item.type!=='checkbox');

      const isExistCheckboxValue = checkedItems.some((item)=> item.type === 'checkbox' && item.id === payload.checked);

      if (!isExistCheckboxValue) {
        if (!isExistType)
          checkedItems.push({
            id: payload.checked,
            type: payload.type
          });
        else {
          checkedItems = checkedItems.map(item => {
            if (item.type === payload.type) item.id = payload.checked;
            return item;
          });
        }
      } else  {

        checkedItems.forEach((item, index) => {
          if (item.id === payload.checked) {
            delete checkedItems[index]
          }
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
    options: (state) => state.options,
    wcType: (state) =>state.wcType,
  }
};

export default Result;
