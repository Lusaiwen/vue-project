<template>
  <div class="work-area" v-if="isPlay">
    <div class="table">
      <el-table
        :data="
          lists
            .filter(
              (data) =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase()) ||
                data.author.toLowerCase().includes(search.toLowerCase())
            )
            .splice((currentPage - 1) * pageSize, pageSize)
        "
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="书名" prop="name"></el-table-column>
        <el-table-column label="作者" prop="author"> </el-table-column>
        <el-table-column label="价格" prop="price"> </el-table-column>
        <el-table-column label="出版社" prop="press"> </el-table-column>
        <el-table-column label="分类" prop="category"> </el-table-column>
        <el-table-column label="出版日期" prop="pubulic_date">
        </el-table-column>
        <el-table-column
          header-align="left"
          align="left"
          prop="prop"
          label="label"
        >
          <template slot="header">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-circle-plus-outline"
              @click="handleAdd"
              >添加</el-button
            >
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              type=""
              placeholder="搜索"
              @blur="handleBlur(scope.$index)"
              @input="handleInput"
            />
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              icon="el-icon-delete"
            ></el-button>
          </template>
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
          :total="length || lists.length"
          background
          hide-on-single-page
        >
        </el-pagination>
      </div>
    </div>
    <div class="form-area">
      <el-dialog
        :title="isEdit ? '编辑书籍' : '添加书籍'"
        :visible.sync="dialogFormVisible"
        center
        width="40%"
      >
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label="上传图片"
            prop="img"
            :rules="[
              {
                required: true,
                message: '请传入至少一张图片',
                trigger: 'blur',
              },
            ]"
          >
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :on-change="handleChange"
              :file-list="fileList"
              :auto-upload="false"
              :http-request="onAddBook"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb,限量三张
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item
            label="书名"
            prop="name"
            :rules="[
              { required: true, message: '请输入书名', trigger: 'blur' },
            ]"
          >
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item
            label="作者"
            prop="author"
            :rules="[
              { required: true, message: '请输入作者', trigger: 'blur' },
            ]"
          >
            <el-input v-model="form.author"></el-input>
          </el-form-item>

          <el-form-item
            label="价格"
            prop="price"
            :rules="[
              {
                type: 'number',
                message: '请输入正确的价格',
                trigger: ['blur'],
              },
              { required: true, message: '请输入价格', trigger: 'blur' },
            ]"
          >
            <el-input v-model.number="form.price" type="number"></el-input>
          </el-form-item>

          <el-form-item
            label="出版社"
            prop="press"
            :rules="[
              { required: true, message: '请输入出版社', trigger: 'blur' },
            ]"
          >
            <el-input v-model="form.press"></el-input>
          </el-form-item>

          <el-form-item
            label="出版时间"
            prop="pubulic_date"
            :rules="[
              { required: true, message: '请选择出版时间', trigger: 'blur' },
            ]"
          >
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              v-model="form.pubulic_date"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            label="类型"
            prop="category"
            :rules="[
              { required: true, message: '请选择图书类别', trigger: 'blur' },
            ]"
          >
            <el-select v-model="form.category" placeholder="请选择分类">
              <el-option label="科学" value="科学"></el-option>
              <el-option label="小说" value="小说"></el-option>
              <el-option label="法律" value="法律"></el-option>
              <el-option label="历史" value="历史"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>

          <el-form-item
            v-if="isEdit"
            style="display: flex;justify-content: center;margin-left: 0"
          >
            <el-button type="primary" @click="onEdit">修改</el-button>
            <el-button type="warning" @click="changeCancel">取消</el-button>
          </el-form-item>

          <el-form-item
            v-else
            style="display: flex;justify-content: center;margin-left: -80px"
          >
            <el-button type="primary" @click="onAddBook">添加</el-button>
            <el-button type="warning" @click="addCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { debounce } from '../units/unit.js';
export default {
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         console.log('resolve执行');
  //         resolve(vm);
  //       }, 0);
  //     }).then((res) => {
  //       console.log('res的值', res);
  //       console.log('进入then');
  //       if (res.data) {
  //         console.log('进入个人中心');
  //         res.$router.push('/person/personnal');
  //       } else {
  //         console.log('未登录');
  //         res.$router.push('/login');
  //       }
  //     });
  //   });
  // },
  created() {
    if (!this.data || (!this.data && !this.data.isAdmin)) {
      this.$router.replace('/');
    }
    if (this.data && this.data.isAdmin) {
      this.isPlay = true;
    }
  },

  data() {
    return {
      fileList: [],
      isPlay: false,
      search: '',
      currentPage: 1,
      pageSize: 10,
      length: null,
      form: {
        name: '',
        author: '',
        price: null,
        press: '',
        category: '',
        pubulic_date: null,
        desc: ''
      },
      dialogFormVisible: false,
      isEdit: true,
      multipleSelection: [],
      deleteArr: [],
    };
  },
  computed: {
    ...mapState('BookStore', ['lists']),
    ...mapState('loginUser', ['data']),
  },
  methods: {
    ...mapActions('BookStore', [
      'addBook',
      'changeBook',
      'getBooks',
      'deleteBooks',
    ]),
    //图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleChange(file, fileList) {
      console.log(file);
      this.fileList.push(file);
      const isJPG =
        file.raw.type === 'image/jpeg' || 'image/jpg' || 'image/png';
      const isLt2M = file.raw.size / 1024 / 1024 < 2;
      // fileList.push(file);
      console.log(isJPG, isLt2M);
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpg/png/jpeg 格式!');
        this.fileList.splice(-1);
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        this.fileList.splice(-1);
      }

      this.fileList = this.fileList.splice(-3);
      console.log(fileList);
      console.log(this.fileList);
      // this.fileList = fileList;
    },
    //多选
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    //添加按钮a
    handleAdd() {
      this.dialogFormVisible = true;
      this.isEdit = false;
    },
    //编辑按钮
    handleEdit(index, row) {
      this.isEdit = true;
      this.dialogFormVisible = true;
      this.form = { ...row };
    },
    //删除按钮
    async handleDelete(index, row) {
      // this.multipleSelection.
      this.deleteArr = [];
      if (this.multipleSelection.length > 1) {
        if (confirm('确认全部删除吗')) {
          this.multipleSelection.forEach((e) => {
            this.deleteArr.push(e.id);
          });
          const resp = await this.deleteBooks(this.deleteArr);
          console.log('全部删除');
          if (resp.data.ret === 0) {
            alert('删除成功');
            this.getBooks();
            return;
          }
        }
      } else {
        if (confirm('确认删除吗')) {
          this.deleteArr.push(row.id);
          const resp = await this.deleteBooks(this.deleteArr);
          if (resp.data.ret === 0) {
            alert('删除成功');
            this.getBooks();
            return;
          }
        } else {
          console.log(result);
        }
      }

      alert('删除失败');
    },
    handleBlur(index) {
      // console.log(index)
    },
    handleInput() {
      //搜索框输入时改变data长度
      debounce(() => {
        this.length = this.lists.filter(
          (data) =>
            !this.search ||
            data.name.toLowerCase().includes(this.search.toLowerCase()) ||
            data.author.toLowerCase().includes(this.search.toLowerCase())
        ).length;
      });
    },
    handleSizeChange(pageSize) {
      //pageSize改变
      this.pageSize = pageSize;
    },
    handleCurrentChange(currentPage) {
      //当前页改变
      this.currentPage = currentPage;
      console.log(this.currentPage);
    },

    async onEdit() {
      //编辑表单提交
      // this.addBooks(this.form);
      this.isEdit = true;
      const resp = await this.changeBook(this.form);
      if (resp.data.ret === 0) {
        this.getBooks();
        this.dialogFormVisible = false;
        alert('修改成功');
        return;
      }
      alert('修改失败');
    },
    changeCancel() {
      this.dialogFormVisible = false;
      this.resetForm();
    },
    //添加图书
    async onAddBook() {
      //如果为空
      if (this.isEmpty(this.form)) {
        alert('还有信息未填写');
        return;
      }
      const result = confirm('确认添加图书');
      if (result) {
        console.log(this.fileList, this.form);
        const formData = new FormData();
        formData.append('data', JSON.stringify(this.form));
        this.fileList.forEach((e) => {
          console.log(e);
          formData.append('bookimgs', e.raw);
        });
        console.log(formData);
        const resp = await this.addBook(formData);
        console.log(resp);
        if (resp.data.ret == 0) {
          alert('添加成功');
          this.dialogFormVisible = false;
          this.resetForm();
          this.getBooks();
          return;
        } else {
          alert('添加失败');
        }
      }
    },
    //添加取消按钮
    addCancel() {
      this.resetForm(); //编辑表单取消时清空表单
      this.dialogFormVisible = false;
    },
    resetForm() {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = '';
        }
      }
    },
    isEmpty() {
      let flag = false;
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          if (!this.form[key]) {
            flag = true;
          }
        }
      }
      return flag;
    },
  },
};
</script>

<style>
.work-area {
  width: 85%;
  display: flex;
  justify-content: center;
}

.table {
  width: 100%;
}

.el-dialog.el-dialog--center {
  width: 60% !important;
}

@media only screen and (max-width: 992px) {
  .work-area {
    width: 100%;
  }
  .el-dialog.el-dialog--center {
    width: 95% !important;
  }
}
</style>
