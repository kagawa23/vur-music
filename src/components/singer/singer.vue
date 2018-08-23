<template>
  <div class="singer" ref="singer">
    this is singer
  </div>
</template>

<script>
import { getSingers } from 'api/singer';
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  data(){
    return {
      singers:[]
    }
  },
  mounted(){
    this._getSingers();
  },
  methods:{
    _getSingers:function(){
      getSingers().then(({code,data:{list}})=>{
        console.log(list)
        if(code ==ERR_OK){
          this.singers = this._normalizeSinger(list);
        }
      })
    },
    _normalizeSinger:function(list){
      const hot = []
      const singersMap = list.reduce((result,{Fsinger_name:name,Fsinger_mid:id,Findex}, idx)=>{
        const singer = new Singer(name,id);
        if(idx<HOT_SINGER_LEN){
          hot.push(singer)
        }
        result[Findex] = result[Findex]?[...result[Findex],singer]:[singer];
        return result;
      }, {})
      // console.log(singers);
      // singers.map()
      let singers = Object.keys(singersMap).sort().reduce((ret,v)=>{
        const obj = {title:v,items:singersMap[v]};
        return [...ret, obj];
      },[]);
      // console.log(singers);
      singers = [{[HOT_NAME]:hot},...singers];
      //console.log(singers);
      this.singers = singers;
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
