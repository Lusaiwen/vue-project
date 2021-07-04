<template>
  <div class="detail-area">
    这是详情页{{ bookId }}
    
  </div>
</template>

<script>
export default {
  created(){
    this.bookId = this.$route.params.bookId;
  },
  data(){
    return {
      bookId: null
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
@media only screen and (max-width: 992px) {
  .detail-area {
    width: 100%;
  }
}
</style>