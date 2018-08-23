<template>
<div ref="wrapper">
  <slot></slot>
</div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  props:{
    probeType:{
      type:Number,
      default:1
    },
    data:{
      type:Array,
      default:null
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    listenScroll: {
      type: Boolean,
      default:false,
    }
  },
  mounted(){
    setTimeout(()=>{
      this._initScroll();
    },20)
  },
  methods:{
    _initScroll(){
      if(!this.$refs.wrapper){
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
      })
      if(this.listenScroll){
        let me = this;
        this.scroll.on('scroll',function(pos){
          me.$emit('scroll',pos);
        })
      }
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollToElement(el,time){
      this.scroll && this.scroll.scrollToElement(el,time)
    }
  },
  watch:{
    data(){
      setTimeout(()=>{
        this.refresh();
      },this.refreshDelay);
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>


