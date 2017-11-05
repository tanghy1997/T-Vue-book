<template>
<div class="person">
  <mt-header fixed title="个人中心">
    <router-link to="/" slot="left">
    <mt-button icon="back">返回</mt-button>
    </router-link>
  </mt-header>
  <img class="tx" src="../assets/images/tx.jpg" alt="">
  <div class="bt">收藏的书籍</div>
  <el-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
  <mt-cell v-for="item in books" :key="item.book_id" :title="item.book_author" style="height:100px;">
  <span  @click="toBookDetail(item.book_id)">{{item.book_name}}>></span>
  <i v-show="value" @click="del(item.book_id)">删除</i>
  <img slot="icon" :src="item.book_img" width="80" height="80" style="margin-top:10px;">
  </mt-cell>

</div>
</template>
<script>
import { Header,Cell } from 'mint-ui';
import { getBook ,delBook} from '../services/new';
import Cookies from 'js-cookie'

export default {
  data(){
    return{
      books:[],
      value:false
    }
  },
  created() {
    this.getBookL()
  },
  methods:{
    getBookL(){
      getBook(Cookies.get('name'))
      .then(res => {
        console.log(res.data.data.book_store)
        this.books = res.data.data.book_store
      })
    },
    toBookDetail(id){
      console.log(122)
      this.$router.push({
        path:'/bookdetail/'+ id
      })
    },
    del(id){
       delBook({
         book_id:id,
         name:Cookies.get('name')
       }).then(res=>{
         this.$message({
            message: res.data.msg,
            type:'success'
          });
          this.$router.push({
            name:'Person',
            query:{ r: Math.random()}
          })
       })
    }
  },
  watch: {
    // 监听路由信息的改变,重新加载数据
    //  主要解决删除记录后无法刷新的问题
    //  在执行删除之后,传递一个随机数作为参数,
    //    从而引起路由信息的改变
    '$route':function(){
      // console.log('111111')
      this.getBookL()
    }
  }
}
</script>
<style scoped>
.tx{
  display: block;
  widows: 150px;
  height: 150px;
  margin: 50px auto;
  border-radius: 50%;
}
.bt{
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 30px;
  text-align: center;
}
</style>

