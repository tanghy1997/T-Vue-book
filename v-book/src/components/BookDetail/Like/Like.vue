<template>
  <div class="like">
    <router-link :to="{path:'/bookdetail/'+bookDetail.id}">
      <div class="like-img">
        <img :src="bookDetail.images" @error="loadImage($event)" alt="">
      </div>
      <p>{{bookDetail.name}}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return{
      bookDetail: {}
    }
  },
  props: {
    like: {
      type: String,
      required: true
    }
  },
  created() {
    this.getBookDetail(this.like)
  },
  methods: {
    getBookDetail(id) {
      this.$http.get(`http://39.108.14.248:3333/booklist?id=${id}`).then((res) => {
        this.bookDetail = res.data
      })
    },
    loadImage(e) {
        e.target.src = 'http://www.zwdu.com/files/article/image/20/20962/20962s.jpg'
      }
  }
}
</script>

<style scoped>
.like{
  height:140px;
}
.like-img{
  height: 150px;
}
img{
  width: 100%;
  height: 100%;
}
</style>

