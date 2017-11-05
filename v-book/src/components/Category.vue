<template>
<div class="category">
  <back-nav class="tab">
    <h2>{{ getTitle }}</h2>
  </back-nav>

  <div class="list">
    <ul class="list-item">
      <li v-for="book in categoryList" :key="book.id" class="book">
        <router-link :to="{path:'/bookdetail/'+ book.id}">
          <div class="book-img">
            <img :src="book.images" alt="">
          </div>

          <div class="book-detail">
            <h3>{{book.name}}</h3>
            <p>{{book.intro}}</p>
            <div class="desc-wrap">
              <div class="book-author">
                <i class="iconfont icon-zuozhezhongxin"></i>
                <span>{{book.author}}</span>
              </div>

              <div class="book-desc">
                <span>{{book.type}}</span>
                <span>{{book.serialize}}</span>
                <span>{{book.wordcount}}万</span>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
import BackNav from './Common/BackNav'
import {mapState} from 'vuex'

export default {
  components: {BackNav},
  data() {
    return{
      categoryList: [],
    }
  },
  created() {
    this.getCategroy(this.$route.query.type)
  },
  methods: {
    getCategroy(type) {
      this.$store.state.loading = true
      this.$http.get(`http://39.108.14.248:3333/type?type=${type}`).then(res => {
        this.$store.dispatch('toggleLoading')
        this.loading = false
        this.categoryList = res.data
      })
    }
  },
  computed: {
    // ...mapState([
    //   'loading'
    // ]),
    getTitle() {
      switch (this.$route.query.type) {
          case 1:
            return '玄幻'
            break
          case 2:
            return '修真'
            break
          case 3:
            return '都市'
            break
          case 4:
            return '历史'
            break
          case 5:
            return '网游'
            break
          default:
            return '分类'
      }
    }
  }
}
</script>
<style scoped>
.category .tab{
  line-height: 44px;
  margin-top: 10px;
  box-sizing: border-box;
}
.tab h2{
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
}
.list{
  border-top: 20px solid #f6f7f9;
  padding: 0 20px;
}
.list-item .book{
  /* display: flex; */
  padding-bottom: 20px;
  margin: 30px 0;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.book:last-of-type{
  border-bottom: none;
}
.book-img{
  width: 80px;
}
img{
  width: 100%;
}
.book-detail{
  flex: 1;
  padding: 0;
  margin-left: 20px;
  position: absolute;
  top: 0;
  left: 80px;
}
.book-detail h3{
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
}
.book-detail p {
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp:2;
  font-size: 16px;
  line-height: 24px;
  color: #969ba3;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.desc-wrap{
  position: absolute;
  left: 0;
  bottom: -30px;
  width: 100%;
}
.book-author{
  display: inline-block;
  position: absolute;
  left: 0;
  bottom: 2px;
  font-size: 12px;
}
.book-desc{
  display: inline-block;
  position: absolute;
  right: 0;
  bottom: 2px;
  font-size: 12px;
}
.book-desc span{
  border-radius: 1px;
  padding: 0 2px;
  border: 1px solid #ccc;
}
.book-desc span:nth-child(1){
  color: #ffa100;
}
.book-desc span:nth-child(2){
  color: #ed424b;
}
.book-desc span:nth-child(3){
  color: #4284ed;
}
</style>
