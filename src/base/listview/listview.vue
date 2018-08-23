<template>
    <scroll
        :data="data"  :probe-type="probeType"
       class="listview" ref="listView" :listen-scroll="listenScroll" @scroll="scroll">
        <ul>
            <li v-for="group in data" class="list-group" :key="group.title" ref="listGroup">
                <h2 class="list-group-title">{{ group.title}}</h2>
                <ul>
                    <li class="list-group-item" v-for="item in group.items" :key="item.name">
                        <img v-lazy="item.avatar" alt="歌手头像" class="avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut">
            <ul>
                <li class="item"
                  :class="{current: curIdx === index}"
                  v-for="(item,index) in shortcutList"
                  :key="item"
                  @touchstart="onShortcutTouchStart"
                  @touchmove.stop.prevent="onShortcutTouchMove"
                  :data-index="index">
                    {{item}}
                </li>
            </ul>
        </div>
    </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { getElemData } from 'common/js/dom'

const ANCHOR_HEIGHT = 18

export default {
    created(){
        this.touch = {}
        this.listenScroll =true;
        this.listHeight = [];
        this.probeType = 3;
    },
    data(){
      return {
        curIdx :0,
        scrollY:-1,
      }
    },
    props:{
        data:{
            type:Array,
            default:()=>[]
        }
    },
    components:{
        Scroll
    },
    computed:{
        shortcutList(){
            return this.data.map(v=>v.title.substring(0,1));
        }
    },
    methods:{
        onShortcutTouchStart:function(el){
            const indx = getElemData(el.target,'index');
            const firstTouch = el.touches[0].pageY;
            this.touch.y1 = firstTouch;
            this.touch.idx = indx;
            this._scrollToElement(indx);
        },
        onShortcutTouchMove:function(el){
            const moveTouch = el.touches[0].pageY;
            const {y1, idx} = this.touch;
            const delta = (moveTouch - y1)/ANCHOR_HEIGHT|0;
            const anotherIdx = parseInt(idx,10) + delta;
            this._scrollToElement(anotherIdx);
        },
        scroll:function(pos){
            this.scrollY = pos.y;
            // console.log(pos);
        },
        _scrollToElement(index){
            let indx = index;

            indx = Math.max(0,indx);
            indx = Math.min(this.listHeight.length,indx);

            this.scrollY = -this.listHeight[indx];
            const scroll = this.$refs.listView;
            scroll.scrollToElement(this.$refs.listGroup[indx],0)
        },
        _calculateHeight(){
         // this.listHeight = [];
          let listHeight = [];
          const list = this.$refs.listGroup;
          listHeight = list.map(v=>v.clientHeight).reduce((ret,value)=>{
            const res = ret[ret.length-1] + value;
            return [...ret,res];
          },[0]);
          console.log(listHeight);
          this.listHeight = listHeight;
        }
    },
    watch:{
      data(){
        setTimeout(() =>{
          this._calculateHeight()
        },20)
      },
      scrollY(y){
        const listHeight = this.listHeight;
        listHeight.push(Infinity);
        for(let i=0;i<listHeight.length;i++){
          if(listHeight[i]<=-y && listHeight[i+1]>-y){
            this.curIdx = i;
            return;
          }
        }
      }
    }
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
