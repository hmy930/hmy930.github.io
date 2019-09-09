<template>
    <el-col :span="24" class="app-left-menu">
        <el-menu
          router
          default-active="1-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
            <template v-for="(item, index) in $router.options.routes">
                <template v-if="!item.hidden">
                    <el-submenu :index="index+1+''" :key="index" v-if="(item.children && item.children.length>1)">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <el-menu-item-group>
                            <!-- <template slot="title">分组一</template> -->
                            <template v-for="(child, index2) in item.children">
                                <el-menu-item :index="child.path" :key="index2">{{child.name}}</el-menu-item>
                            </template>
                        </el-menu-item-group>
                        <!-- 
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                        -->
                    </el-submenu>
                    <el-menu-item :index="item.children[0].path" :key="index" v-else-if="!!item.children && item.children.length==1">
                        <i class="el-icon-location"></i>
                        <span slot="title">{{item.children[0].name}}</span>
                    </el-menu-item>
                    <el-menu-item :index="item.path" :key="index" v-else>
                        <i class="el-icon-location"></i>
                        <span slot="title">{{item.name}}</span>
                    </el-menu-item>
                    <!-- 
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    -->
                </template>
            </template>
        </el-menu>
    </el-col>
</template>

<script>
export default {
    data: function() {	
        return {
          
        }
    },
    mounted: function(){
      console.log(this.$router.options.routes)
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
    }
}
</script>

<style scoped>
.router-link-class{display: block;height: 100%;}
.el-menu-item.is-active{background-color: #434A50!important;}

</style>
<style>
    .app-left-menu .el-menu-item-group .el-menu-item{padding-left: 65px !important;}
</style>