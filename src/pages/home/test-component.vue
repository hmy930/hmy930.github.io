<template>
    <div>
        value1: {{value1}}
        <div>
            value2: <input type="text" v-model="value2">
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                 value2: this.value1,
            }
        },
        created: function(){
            // this.$store.commit('countAdd', 10)
            // this.$store.dispatch('countAdd', {content: 'asdf', time: 1000}).then(res=>{
            //     console.log(res, `this.$store.state.count = ${this.$store.state.count}`)
            // })
            
            //modules的store，使用该方式分发：
            this.$store.commit('testModule/addMoney', {value: 20})
            console.log(this.$store.state.testModule.money)
            this.$store.commit('moduleB/addModuleBvalue', {value: 11})
            console.log(this.$store.state.moduleB.moduleBvalue)
        },
        watch:{
            value2: function(n,o){
                this.$emit('update:value1', n)
            },
            value1: function(n,o){
                this.value2 = this.value1;
            }
        },
        computed: {
            
        },
        props:{
            value1:{
                type: [String, Number],
                required: true,
                default: '',
            }
        }
    }
</script>

<style  scoped>

</style>