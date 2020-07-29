const Settings = {
  state: {
    settingsData: {},
  },
  mutations: {
    saveSetting(state, payload) {
      state.settingsData = payload;
    },
  },
  actions: {
    async getSettings({commit}) {
      const url = 'https://www.yasnybereg.ru/decor_configuration/';
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        commit('saveSetting', json);
      }
    }
  },
  getters: {
    wcData: state =>  state.settingsData.wc_data,
    allSettings: state =>  state.settingsData.main_sections,
    options: state =>  state.settingsData.options,
},
};

export default Settings;
