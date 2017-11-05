<template>
  <div class="home">
    <div class="nav-bar">
      <div class="title">
        <i slot="icon" class="fa fa-book" style="font-size:30px;"></i>
        <span>MK-T-Book</span>
      </div>
      <div class="nav" v-if="me==false">
        <img src="../assets/images/default.jpg" alt="" @click="toLogin">
      </div>
      <div class="nav" v-show="me">
        <el-dropdown >
        <span class="el-dropdown-link">
          <img src="../assets/images/tx.jpg" alt="" >
        </span>
        <el-dropdown-menu slot="dropdown" v-show="me">
        <el-dropdown-item @click.native="toPerson" v-show="me">个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="del" v-show="me">退出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>

      </div>
    </div>
    <div class="swipe">
      <mt-swipe :auto="5000" :showIndicators="false">
        <mt-swipe-item><img src="../assets/images/1.jpg" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../assets/images/2.jpg" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../assets/images/3.jpg" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../assets/images/4.jpg" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../assets/images/5.jpg" alt=""></mt-swipe-item>
      </mt-swipe>
    </div>

  <nav class="category">
    <router-link class="category-item"
      v-for="(item,index) in types"
      :key="item.tid"
      :to="{path:'category',query: {type: item.tid}}"
      @click="bookCategory(item.tid)"
    >
    <i :class="item.icon" class="iconfont"></i>
    <h4>{{item.name }}</h4>
    </router-link>
  </nav>

  <div class="Booklist">
    <recommend :booklist="booklist | hot" title="排行榜"></recommend>
    <book-list :booklist="booklist | free" title="限时免费">
      <span class="time"><span>01:</span>{{ time }}</span>
    </book-list>
    <book-list :booklist="booklist | endbook" title="人气完本"></book-list>
    <recommend :booklist="booklist | newbook" title="新书速递"></recommend>
    <recommend :booklist="booklist | top" title="喜好推荐"></recommend>
    <footer>Copyright © 2017 THY-Mark</footer>
  </div>

  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
import {mapState} from 'vuex';
import BookList from './Home/BookList';
import Recommend from './Home/Recommend';
import { delCookie } from '../utils/tools';
import Cookies from 'js-cookie'

export default {
  components: {Recommend, BookList},
  data () {
    return {
      booklist: [],
      time: '',
      me:false,
      types: [
        {
          tid: 1,
          name: '玄幻',
          icon: 'icon-xuanhuan'
        },
        {
          tid: 2,
          name: '武侠',
          icon: 'icon-wuxia'
        },
        {
          tid: 3,
          name: '都市',
          icon: 'icon-dianying-'
        },
        {
          tid: 4,
          name: '历史',
          icon: 'icon-lishi'
        },
        {
          tid: 5,
          name: '网游',
          icon: 'icon-youxi'
        }
      ],
    }
  },
  created() {
    this.getBookList();
    this.getTime();
    setInterval(this.getTime,1000);
    console.log(Cookies.get('name'))
    if(Cookies.get('name')===undefined){
      this.me = false
    }
    else{
      this.me = true
    }
  },
  methods: {
    getBookList() {
      this.$http.get('http://39.108.14.248:3333/booklist')
        .then((res) => {
          this.$store.dispatch('toggleLoading')
          this.booklist = res.data
        })
    },
    toLogin(){
      this.$router.push({path:'login'})
    },
    toPerson(){
      this.$router.push({path:'person'})
    },
    del(){
      Cookies.remove('name')
      this.me = false
    },
    getTime() {
      let date = new Date()
      let h = date.getHours()
      let m = date.getMinutes()
      let s = date.getSeconds()
      let hours = 23 - h
      if(hours < 0) hours = 0
      let minutes = 60 - m
      let seconds = 60 -s
      hours = this.checkTime(hours)
      minutes = this.checkTime(minutes)
      seconds = this.checkTime(seconds)
      let time = `${hours}:${minutes}:${seconds}`
      return this.time = time
    },
    checkTime(i) {
      if(i < 10) {
        i = "0" +i
      }
      return i
    }
  },
  computed: {
    ...mapState([
      'loading'
    ])
  },
  filters: {
    hot(value) {
        if(!value) return ''
        const arr = []
        value.forEach((item,index) => {
          if(index < 20){
            if(index % 2 == 1 ){
              arr.push(item)
            }
          }
        })
        return arr
    },
    top(value) {
      if(!value) { return '' }
      const arr = []
      value.forEach((item,index) => {
        if(index < 20){
          if(index % 2 == 0){
            arr.push(item)
          }
        }
      })
      return arr
    },
    free(value) {
        if (!value) return ''
        const arr = []
        value.forEach((item, index) => {
          if (index % 3 == 1) {
            arr.push(item)
          }
        })
        return arr.splice(0, 3)
      },
    newbook(value){
      if(!value) return ''
      const arr = []
      value.forEach((item,index)=>{
        if(index < 20){
          if(index % 3 == 2){
            arr.push(item)
          }
        }
      })
      return arr
    },
    endbook(value) {
      if (!value) return ''
        var arr = []
        value.forEach((item, index) => {
          if (item.serialize === '完本') {
            arr.push(item)
          }
        })
        return arr
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  background-color: #f5f5f5;
}
.nav-bar{
  height: 50px;
  font-weight: bold;
  background: #fff;
  line-height: 50px;
  color: #4fc08d;
}
.title{
  display: inline-block;
  font-size: 20px;
  text-indent: 1em;
}
.title>span{
  margin-left: -6px;
}
.nav{
  display: inline-block;
  margin-right: 20px;
  line-height: 50px;
  float:right;
}
.nav img{
  width: 35px;
  vertical-align: middle;
  border-radius: 50%;
}
.swipe{
  margin: 20px auto 0px;
  width: 95%;
  height: 300px;
}
.swipe img{
  width: 100%;
}
.category{
  display: flex;
  text-align: center;
  padding: 10px 0;
  margin-bottom: 15px;
  background-color: #fff;
}
.category-item{
  display: inline-block;
  flex: 1;
}
.iconfont{
  text-align: center;
  display: inline-block;
  font-size: 24px;
  margin-bottom: 5px;
}
.Booklist .time{
display: inline-block;
font-size: 16px;
margin-left: 5px;
}
.Booklist .time span {
  color:#f00;
}
footer{
  text-align: center;
  padding-top: 10px;
  background-color: #fff;
}
</style>
