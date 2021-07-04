<template>
  <div class="table-area">
    <div class="table">
      <book-list :isLend="false" :listsArr="lists"></book-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { debounce } from '../units/unit.js';
import bookList from '@/views/bookList';
export default {
  // data() {
  //   return {
  //     search: '',
  //     currentPage: 1,
  //     pageSize: 10,
  //     length: null,
  //     lendArr: []
  //   };
  // },
  created(){
    this.$store.dispatch('BookStore/getBooks');
  },
  components: {
    bookList,
  },
  computed: {
    ...mapState('BookStore', ['lists']),
  },
  // methods: {
  //   ...mapActions('BookStore', ['getBooks', 'lendBook', 'returnBook']),
  //   handleClick(row, column, event) {
  //     console.log(row.column, event);
  //   },
  //   //借书
  //   async handleLend(index, row) {
  //     this.lendArr = [];
  //     console.log(index, row);
  //     this.lendArr.push(row.id);
  //     const resp = await this.lendBook(this.lendArr);
  //     console.log(resp);
  //     if(resp.data.ret == 0) {
  //       alert('借阅成功');
  //     }else {
  //       alert('借阅失败');
  //     }
  //     console.log(this.searchData, this.currentPage, this.pageSize);
  //   },
  //   //还书
  //   async handleCheck(index, row) {
  //     console.log(index, row);
  //     this.$router.push({
  //       name: 'detail',
  //       params: {
  //         bookId: row.id,
  //       },
  //     });
  //   },
  //   handleBlur(index) {
  //     // console.log(index)
  //   },
  //   handleInput() {
  //     debounce(() => {
  //       this.length = this.lists.filter(
  //         (data) =>
  //           !this.search ||
  //           data.name.toLowerCase().includes(this.search.toLowerCase()) ||
  //           data.author.toLowerCase().includes(this.search.toLowerCase())
  //       ).length;
  //     });
  //   },
  //   handleSizeChange(pageSize) {
  //     this.pageSize = pageSize;
  //   },
  //   handleCurrentChange(currentPage) {
  //     this.currentPage = currentPage;
  //     console.log(this.currentPage);
  //   },
  // },
};
</script>

<style>
.table-area {
  width: 85%;
  display: flex;
  justify-content: center;
}
/* 
.table {
  width: 100%;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #000;
  font-weight: 600;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

@media only screen and (max-width: 992px) {
  .table-area {
    width: 100%;
  }
} */
</style>
