<template>
  <div class="catelog-panel">
    <div class="catelog">
      <div class="catelog-nav">
        <i class="fa fa-angle-left" slot="icon" @click="goBack" ><span id="mulu">目录</span></i>
      </div>
      <div class="catelog-content">
        <ul>
          <li v-for="(item,index) in chapterCatelog" :key="item.id" @click="jumpTo(index)">
            <!-- <mt-cell>{{index+1}}.{{item}}</mt-cell> -->
            <mt-cell-swipe :title="`${index+1}.${item}`"></mt-cell-swipe>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Cell } from "mint-ui";

export default {
  data() {
    return {
      chapterCatelog: []
    };
  },
  created() {
    this.getCatelog(this.$route.params.id);
  },
  methods: {
    jumpTo(index) {
      if (index >= 100) {
        index = 100;
      }
      this.$router.push({path:'/reader/'+this.$route.params.id})
      this.$store.dispatch("curChapter", index + 1);
      // this.$store.state.showNav = false;
      document.body.scrollTop = 0;
    },
    goBack() {
      this.$router.go(-1)
    },
    getCatelog(bookId) {
      this.$http
        .get(`http://39.108.14.248:3333/titles?id=${bookId}`)
        .then(res => {
          this.chapterCatelog = res.data.titles.split("-");
          console.log(res);
        });
    }
  }
};
</script>
<style>
.catelog-panel {
  width: 100%;
  /* height: 800px; */
}
.catelog-nav{
  font-size: 25px;
  /* margin-bottom: 5px; */
  padding: 5px 5px;
  background-color: gainsboro;
  color: black;
}
.catelog-content li{
  margin: 5px auto;
  padding-left: 5px;
  letter-spacing: 2px;
  background-color: #333;
}
#mulu{
  margin-left: 10px;
}
</style>

