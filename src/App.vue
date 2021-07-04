<template>
  <el-container id="app">
    <el-header height="200" style="padding: 0">
      <lib-header></lib-header>
    </el-header>
    <el-main style="overflow: hidden">
      <div class="container">
        <div class="con">
          <!-- <keep-alive> -->
            <router-view></router-view>
          <!-- </keep-alive> -->
        </div>
      </div>
    </el-main>
    <el-footer>
      <lib-footer></lib-footer>
    </el-footer>
  </el-container>
</template>

<script>
import LibHeader from '@/components/Header'
import LibFooter from '@/components/Footer'
import { mapState } from 'vuex'
export default {
  mounted() {
    this.$store.dispatch('loginUser/whoami');
    this.$store.dispatch('BookStore/getBooks');
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('loginUser', ['data'])
  },
  methods: {},
  components: {
    LibHeader,
    LibFooter,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* overflow-x: hidden; */
  /* overflow: ; */
  width: 100%;
  margin: 0 auto;
}

html,
body {
  background-color: #f4f4f4;
  width: 100%;
  overflow-x: hidden;
  /* overflow-y: hidden; */
}

.container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.con {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
