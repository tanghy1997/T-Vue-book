<template>
<div class="person">
  <mt-header fixed title="个人中心">
    <router-link to="/" slot="left">
    <mt-button icon="back">返回</mt-button>
    </router-link>
  </mt-header>
  <img class="tx" src="../assets/images/tx.jpg" alt="">
  <div class="bt">收藏的书籍</div>
  <mt-cell v-for="item in books" :key="item.book_id" :title="item.book_author" style="height:100px;" @click.native="toBookDetail(item.book_id)">
  <span>{{item.book_name}}</span>
  <img slot="icon" :src="item.book_img" width="80" height="80" style="margin-top:10px;">
  </mt-cell>

</div>
</template>
<script>
import { Header,Cell } from 'mint-ui';
import { getBook } from '../services/new';
import Cookies from 'js-cookie'

export default {
  data(){
    return{
      books:[],
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

