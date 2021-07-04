<template>
  <div class="header-area">
    <div class="nav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/book_lists">图书列表</el-menu-item>
        <el-menu-item index="/my_work" v-show="data && data.isAdmin"
        :route="{name: 'mywork'}"
          >我的工作台</el-menu-item
        >
        <el-menu-item index="/person" >个人中心</el-menu-item>

        <el-badge value="453" class="item">
          <el-button size="small" @click="$router.push('/person')"
            >我的借阅</el-button
          >
        </el-badge>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created(){
    // this.$store.dispatch('loginUser/whoami')
  },
  data() {
    return {
      activeIndex: '/'
    }
  },
  computed: {
    ...mapState('loginUser', ['data'])
  },
  methods: {
    handleSelect(index, indexPath) {
      this.activeIndex = index;
      this.$router.push(index)
    },
  },
  watch: {
    $route() {
      console.log('路由变化');
      if(this.$route.path.indexOf('person') !== -1){
        this.activeIndex = '/person'
      }else {
        this.activeIndex = this.$route.path
      }
    },
  },
}
</script>

<style scoped>
.header-area{
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav {
  width: 85%;
  background-color: #fff;
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}
/* .el-menu-demo {
  width: 100%;
} */


@media only screen and (max-width: 992px) {
  .header-area {
    width: 100%;
  }
}

</style>
