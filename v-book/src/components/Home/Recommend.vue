<template>
  <div class="recommend">
    <h3 class="r-title">
      {{title}}
    </h3>
    <div class="r-list">
      <ul class="r-list-item">
        <li class="r-book" v-for="item in booklist" :key="item.id">
          <router-link :to="{path:'/bookdetail/'+item.id}">
            <img :src="item.images" alt="">
            <p class="r-book-name">{{item.name}}</p>
            <p class="r-book-author">{{item.author}}</p>
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
.recommend{
  padding: 5px;
  margin-bottom: 15px;
  background-color: #fff;
}
.recommend .r-title{
  border-left: 2px solid red;
  margin: 10px 5px 15px;
  padding: 2px 12px;
  font-size: 22px;
  color: rgba(0, 0, 0, 0.7);
}
.r-list .r-list-item{
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  text-indent: 7px;
}
.r-list-item .r-book{
  display: inline-block;
  margin-right: 8px;
  width: 100px;
  font-size: 14px;
}
.r-list-item .r-book img{
  width: 100%;
  height: 125px;
}
.r-list-item .r-book p{
  margin: 3px 0;
}
.r-book-name{
  font-size: 16px;
}
.r-book-author{
  font-size: 14px;
  color: #ccc;
}
</style>

