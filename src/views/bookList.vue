<template>
    <div class="table">
        <el-table
            :data="
                listsArr &&
                    listsArr
                        .filter(
                            (data) =>
                                !search ||
                                data.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                data.author
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                        )
                        .splice((currentPage - 1) * pageSize, pageSize)
            "
            style="width: 100%"
        >
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form
                        label-position="left"
                        inline
                        class="demo-table-expand"
                    >
                        <el-form-item label="书名">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="作者">
                            <span>{{ props.row.author }}</span>
                        </el-form-item>
                        <el-form-item label="价格">
                            <span>{{ props.row.price }}</span>
                        </el-form-item>
                        <el-form-item label="出版社">
                            <span>{{ props.row.press }}</span>
                        </el-form-item>
                        <el-form-item label="分类">
                            <span>{{ props.row.category }}</span>
                        </el-form-item>
                        <el-form-item label="出版日期">
                            <span>{{ props.row.pubulic_date }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <el-table-column label="书名" prop="name"></el-table-column>
            <el-table-column label="作者" prop="author"> </el-table-column>
            <el-table-column label="分类" prop="category"> </el-table-column>
            <el-table-column
                label="可借数量"
                v-if="!isLend"
                prop="booknumber"
            ></el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                        v-model="search"
                        size="mini"
                        placeholder="搜索"
                        @blur="handleBlur(scope.$index)"
                        @input="handleInput"
                    />
                </template>
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleLend(scope.$index, scope.row)"
                        v-if="!isLend"
                        >借阅</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleCheck(scope.$index, scope.row)"
                        v-if="!isLend"
                        >查看</el-button
                    >
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleReturn(scope.$index, scope.row)"
                        v-if="isLend"
                        >还书</el-button
                    >
                </template>
                <!-- <template slot-scope="scope" v-if="isLend">
          <el-button size="mini" type="primary" @click="handleReturn(scope.$index, scope.row)" 
            >还书</el-button
          >
        </template> -->
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="length || listsArr.length"
                background
                hide-on-single-page
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { debounce } from '../units/unit.js';
export default {
    props: {
        isLend: {
            type: Boolean,
            default: false
        },
        listsArr: Array
    },
    mounted() {
        console.log(this.isLend);
    },
    data() {
        return {
            search: '',
            currentPage: 1,
            pageSize: 10,
            length: null,
            lendArr: []
        };
    },
    computed: {
        // ...mapState('BookStore', ['lists']),
    },
    methods: {
        ...mapActions('BookStore', [
            'getBooks',
            'lendBook',
            'returnBook',
            'getLendBooks'
        ]),
        handleClick(row, column, event) {
            console.log(row.column, event);
        },
        //借书
        async handleLend(index, row) {
            this.lendArr = [];
            console.log(index, row);
            this.lendArr.push(row.id);
            const resp = await this.lendBook(this.lendArr);
            console.log(resp);
            if (resp.data.ret == 0) {
                alert('借阅成功');
                this.getBooks();
            } else if (resp.data.ret == 404) {
                alert('图书数量不足');
            } else {
                alert('借阅失败');
            }
            console.log(this.searchData, this.currentPage, this.pageSize);
        },
        //还书
        async handleReturn(index, row) {
            const resp = await this.returnBook([row.id]);
            if (resp.data.ret == 0) {
                alert('还书成功');
                this.getLendBooks();
            }
        },
        async handleCheck(index, row) {
            console.log(index, row);
            this.$router.push({
                name: 'detail',
                params: {
                    bookId: row.id
                }
            });
        },
        handleBlur(index) {
            // console.log(index)
        },
        handleInput() {
            debounce(() => {
                this.length = this.listsArr.filter(
                    (data) =>
                        !this.search ||
                        data.name
                            .toLowerCase()
                            .includes(this.search.toLowerCase()) ||
                        data.author
                            .toLowerCase()
                            .includes(this.search.toLowerCase())
                ).length;
            });
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            console.log(this.currentPage);
        }
    }
};
</script>

<style>
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
</style>
