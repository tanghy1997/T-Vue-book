<template>
  <div class="booklist">
    <h3 class="title">
      {{title}}
      <!-- 计时插槽 -->
      <slot></slot>
  </h3>
      <div class="list">
        <ul class="list-item">
          <li v-for="book in booklist" class="book" :key="book.id">
            <router-link :to="{path:'/bookdetail/'+book.id}">
              <div class="book-img">
                <img :src="book.images" alt="">
              </div>
              <div class="book-detail">
                <h3>{{book.name}}</h3>
                <p>{{book.intro}}</p>
                <div class="desc-wrap">
                  <div class="book-autor">
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
export default {
  props: ['booklist','title']
}
</script>

<style scoped>
.booklist{
  padding: 5px;
  margin-bottom: 15px;
  background-color: #fff;
}
.booklist .title{
  border-left: 2px solid red;
  padding: 2px 12px;
  margin: 10px 5px 15px;
  font-size: 22px;
  color: rgba(0, 0, 0, 0.7);
}
.booklist .list{
  padding: 0 10px;
}
.booklist .list .list-item .book{
  display: flex;
  padding-bottom: 20px;
  margin: 30px 0;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.booklist .list .list-item .book:last-of-type{
  border-bottom: none;
}
.booklist .list .list-item .book .book-img{
  /* display: inline-block; */
  width: 80px;
}
.booklist .list .list-item .book .book-img img{
  width: 100%;
}
.booklist .list .list-item .book .book-detail{
  flex:1;
  padding: 0;
  margin-left: 20px;
  top: 5px;
  left: 100px;
  position: absolute;
}
.booklist .list .list-item .book .book-detail h3{
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
}
.booklist .list .list-item .book .book-detail p{
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
  font-size: 12px;
}
.book-author .iconfont{
  vertical-align: -1px;
}
.book-desc{
  display: inline-block;
  position: absolute;
  bottom: 0px;
  right: 0;
}
.book-desc span{
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 0 2px;
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

