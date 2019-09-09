export default {
    namespaced: true,
    state: {
        moduleBvalue: 45,
    },
    mutations: {
        addModuleBvalue(state, obj) { 
            state.moduleBvalue += obj.value;
        }
    }
}