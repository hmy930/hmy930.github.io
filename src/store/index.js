import Vue from 'vue'
import Vuex from 'vuex'
import testModule from './modules/testModule.js'
import moduleB from './modules/moduleB.js'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        testModule,
        moduleB,
    },
    state: {
        count: 1,
    },
    getters: {
        getCount: state => state.count+'元',
    },
    mutations: {
        countAdd(state, n){
            state.count += n;
        }
    },
    actions: {
        countAdd(store, obj) { 
            console.log('actions ',arguments)
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    store.commit('countAdd', obj.content)
                    resolve('actions dispatch is success!')
                }, obj.time);
            })
        }
    }
})

export default store;

// const storeModule = new Vuex.Store({
//     modules: {
//         testModule,
//         moduleB,
//     }
// })
//export default storeModule;
