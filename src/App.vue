<template>
  <div id="app">
    <el-container>
      <el-header>Header</el-header>

      <el-container class="app-main">

        <el-aside width="240px" class="app-aside">
          <compMenu @changeComponent="changeComponent"></compMenu>
        </el-aside>

        <el-container>
          <el-main>
            <transition name="el-fade-in">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </transition>
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>

      </el-container>
    </el-container>
  </div>
</template>

<script>
import compMenu from './pages/pagemenu'
export default {
  data() {
    return {
      
    }
  },
  components:{
    compMenu,
  },
  mounted: function(){
    this.startHacking()
  },
  methods: {
    startHacking () {
      // this.$notify({
      //   title: 'It works!',
      //   type: 'success',
      //   message: '首页',
      //   duration: 5000
      // })
    },
    changeComponent(val){

    }
  }
}
</script>

<style>
html,body{height: 100%;width: 100%;}
a{text-decoration: none;color: inherit;}
#app{height: 100%;}
#app>.el-container{height: 100%;}
.app-aside{ background: #545C64;}
.el-header{background: rgb(84, 92, 100);}
.app-main{height: calc(100% - 60px);}
</style>
