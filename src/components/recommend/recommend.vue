<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" :data="discList">
      <div>
      <div v-if="items.length" class="slider-wrapper">
        <slider>
          <div v-for="item in items" v-bind:key="item.id">
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li class="item" v-for="item in discList" :key="item.imgurl">
            <div class="icon">
              <img width="60" v-lazy="item.imgurl" alt="专辑图片">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc"  v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
      <div class="loading-container" :show="!discList.length">
        <loading/>
      </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'
import { getRecommend,getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
export  default {
  data(){
    return {
      items: [],
      discList:[]
    }
  },
  created(){
    this._getRecommend();
    this._getDisc();
  },
  components:{ Slider, Scroll, Loading},
  methods:{
    _getRecommend:function(){
      getRecommend().then(({code,data:{slider}})=>{
        if(code === ERR_OK){
          // console.log(slider);
            this.items = slider;
        }
      })
    },
        _getDisc:function(){
      getDiscList().then(({code,data:{list}})=>{
        // console.log(resp);
        if(code === ERR_OK){
          // console.log(slider);
          this.discList = list;
        }
      })
    }
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
