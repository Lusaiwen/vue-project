<template>
  <div class="box">
    <lib-card v-for="item in lists" :item="item" :key="item.id"></lib-card>
  </div>
</template>

<script>
import LibCard from '../views/libCard'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {}
  },
  computed: {
    ...mapState('BookStore', ['lists']),
  },
  components: {
    LibCard,
  },
}
</script>

<style>
.pageId20003 {
  cursor: pointer;
}
.el-main {
  /* overflow:inherit; */
  overflow: inherit;
}
.box {
  width: 85%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

@media only screen and (max-width: 992px) {
  .box {
    width: 100%;
  }
}
</style>
