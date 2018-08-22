<template>
  <div class="recommend" ref="recommend">
    <div class="recommend-content">
      <div v-if="items.length" class="slider-wrapper">
        <slider>
      <div v-for="item in items" v-bind:key="item.id">
        <a :href="item.linkUrl">
          <img :src="item.picUrl">
        </a>
      </div>
    </slider></div></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import { getRecommend,getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
export  default {
  data(){
    return {
      items: []
    }
  },
  created(){
    this._getRecommend();
    this._getDisc();
  },
  components:{ Slider},
  methods:{
    _getRecommend:function(){
      getRecommend().then(({code,data:{slider}})=>{
        if(code === ERR_OK){
          console.log(slider);
          this.items = slider;
        }
      })
    },
        _getDisc:function(){
      getDiscList().then((resp)=>{
        console.log(resp);
        // if(code === ERR_OK){
        //   console.log(slider);
        //   this.items = slider;
        // }
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
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
