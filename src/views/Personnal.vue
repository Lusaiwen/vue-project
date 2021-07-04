<template>
  <div class="personnal">
    <el-image
      style="width: 100px; height: 100px"
      :src="'http://47.103.197.26:8000' + data.imgUrl"
      :fit="fit"
      :preview-src-list="list"
    ></el-image>

    <el-button type="primary" @click="out">登出</el-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      imgUrl: '',
      list: [],
      fit: 'cover',
    };
  },
  computed: {
    ...mapState('loginUser', ['data']),
  },
  methods: {
    ...mapActions('loginUser', ['loginOut']),
    out() {
      console.log(this.data);
      this.loginOut();
      this.$router.replace('/');
    },
  }
};
</script>

<style scoped>
/* .personnal {
  border: 1px solid #000;
  width: 85%;
} */
</style>
