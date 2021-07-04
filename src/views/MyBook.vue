<template>
  <div class="myBook-area">
    <book-list :isLend="true" :listsArr="lendArrs"></book-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bookList from '@/views/bookList';
export default {
  beforeRouteEnter(to, from ,next){
    console.log(to, from);
    next(vm => {
      console.log(vm);
    });
  },
  computed: {
    ...mapState('loginUser', ['data']),
    ...mapState('BookStore', ['lendArrs']),
  },  
  mounted(){
    this.$store.dispatch('BookStore/getLendBooks');
  },
  components: {
    bookList
  },
  
}
</script>

<style scoped>
.myBook-area {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

@media only screen and (max-width: 992px) {
  .myBook-area {
    width: 100%;
  }
}
</style>>

