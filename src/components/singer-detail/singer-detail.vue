<template>
  <transition name="slide">
    <div class="music-list">Singer detail
      {{JSON.stringify(singer)}}
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { getSingerDetail, getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import { getSongUrl } from 'api/song'
import { createSong } from 'common/js/song'

export default {
  data(){
    return {
      songs:[]
    }
  },
  methods:{
    _getSinger(){
      if(!this.singer.id){
        this.$router.push('/singer');
      }
      getSingerDetail(this.singer.id).then(async ({code,data:{list}}) =>{
        if(code == ERR_OK ){
          console.log(list)
          this.songs = await this._normalizeSongs(list)
          console.log(this.songs);
        }
      });
    },
   async _normalizeSongs(list){
    const {mids,types} = list.reduce((ret,{musicData})=>{
      const { mids , types } = ret;
      return {mids:[...mids,musicData.songmid],types:[...types,musicData.songtype]}
    },{mids:[],types:[]})
    const urlData = await getSongUrl(mids,types);
   // console.log(urlData.url_mid);
    return list.reduce((ret,item,idx)=>{
      const { musicData
      } = item;
      const {purl} = urlData.url_mid.data.midurlinfo[idx]
      // console.log(purl);
      if(musicData.songid && musicData.albumid){
        return [...ret, createSong(musicData,purl)]
      }
    },[])
   }
  },
  created(){
    this._getSinger();
  },
  computed:{
      ...mapGetters([
        'singer'
      ]),
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable';

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
