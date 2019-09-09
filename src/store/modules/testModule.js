const state = {
    money:　99,
}

const mutations = {
    addMoney(state, obj) {
        state.money += obj.value;
    }
}


export default {
    namespaced: true,
    state,
    mutations,
}