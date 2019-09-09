<template>
    <div>
        value : {{value}}
        <test :value1.sync="value"></test>
        value1: <input type="text" v-model="value">
    </div>
</template>

<script>
import test from './test-component.vue'
export default {
    data:function(){
        return {
            value: 1
        }
    },
    components:{
        test,
    },

}
</script>

<style scoped>

</style>