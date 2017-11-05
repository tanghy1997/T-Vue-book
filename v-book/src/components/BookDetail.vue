<template>
  <div>
    <back-nav style="background:#f7f7f7;font-size: 20px">
      <span>{{bookDetail.name}}</span>
    </back-nav>
    <div class="book-detail">
      <div class="book-cover">
        <img :src="bookDetail.images" @error="loadImage($event)" alt="">
      </div>
      <div class="book-desc">
        <h3>{{bookDetail.name}}</h3>
        <p>{{bookDetail.author}}</p>
        <p>{{bookDetail.type}}</p>
        <p>{{bookDetail.wordcount}}万字 | {{bookDetail.serialize}}</p>
        <p>读者评分：{{bookDetail.ratings}}</p>
      </div>
    </div>
    <div class="btn">
      <button @click="readBook">免费试读</button>
      <button @click="readList">章节目录</button>
      <button @click="putBookStore(bookDetail.name,bookDetail.images,bookDetail.author)">加入书架</button>
    </div>
    <p class="book-intro">{{bookDetail.intro}}</p>

    <h3 class="b-like">猜你喜欢</h3>
    <ul class="b-like-list">
      <li v-for="(like,index) in likes">
        <like :like="like" :key="index"></like>
      </li>
    </ul>
  </div>
</template>

<script>
import BackNav from './Common/BackNav';
import Like from './BookDetail/Like/Like';
import {mapState} from 'vuex';
import { update } from '../services/new';
import Cookies from 'js-cookie'

var bookId
export default {
  components: {
    BackNav,Like
  },
  data() {
    return {
      bookDetail: {},
      likes: []
    }
  },
  created() {
    this.getBookDetail(this.$route.params.id)
  },
  updated() {
     this.loading = false
  },
  methods: {
    getBookDetail(id) {
      this.$store.state.loading = true
        this.$http.get(`http://39.108.14.248:3333/booklist?id=${id}`).then(res => {
          this.bookDetail = res.data
          this.likes = res.data.like.split("-")
//          console.log(this.like)
          this.$store.dispatch('toggleLoading')
    })
  },
  readBook() {
        this.$router.push({path: "/reader/"+this.bookDetail.id})
      },
  readList() {
    const bookId = this.$route.params.id
    // console.log(bookId)
    this.$router.push({path: "/booklist/"+bookId})

  },
  putBookStore(name,img,author){
    console.log(this.$route.params.id)
    bookId = this.$route.params.id
    update(Cookies.get('name'),{
      book_id:bookId,
      book_name:name,
      book_img:img,
      book_author:author
    })
      .then(res => {
        if(res.data.status === 'y') {
                this.$message({
                  message: res.data.msg,
                  type:'success'
                });
              }else{
                this.$message({
                  message: res.data.msg,
                  type:'error'
                });
              }
      })
  },
  loadImage(e) {
        e.target.src = 'http://www.zwdu.com/files/article/image/20/20962/20962s.jpg'
      }
},
  computed: {
    ...mapState([
        'loading'
    ])
  },
  watch: {
    '$route'(to,from) {
      this.getBookDetail(this.$route.params.id)
    }
  }
}
</script>

<style scoped>
.book-detail{
  display: flex;
}
.book-cover{
  width: 130px;
  margin: 10px;
  padding: 10px;
}
img{
  width: 100%;
}
.book-desc{
  color: #666;
  margin: 10px;
  padding: 20px 0;
}
.book-desc h3{
  font-size: 25px;
  color: #222;
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 5px;
}
.book-desc p{
  margin: 15px 8px;
}
.btn{
  display: flex;
  margin: 10px 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}
button{
  flex: 1;
  width: 100px;
  height: 32px;
  line-height: 32px;
  margin: 10px 20px;
  padding-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 2px;
  background-color: #fff;
}
button:first-child{
  background-color: #f00;
  color:#fff;
}
.book-intro{
  margin: 20px;
  line-height: 30px;
  letter-spacing: 2px;
  text-indent: 2em;
}
.b-like{
  margin: 20px;
  font-size: 20px;
  font-weight: bolder;
  border-bottom: 1px solid #ddd;
  padding-bottom: 2px;
}
.b-like-list{
  display: flex;
}
li{
  flex: 1;
  margin: 10px 20px;
}
</style>
