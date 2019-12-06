
$(function(){
  let pageXstart = 0;//按下的位置
  let pageXend = 0;//抬起的位置
  let slidelangth = 0;//移动的距离
  $('.bb_item_scroll').on({
    // 屏幕按下的x坐标
    touchstart:function(e){
      const touch = e.originalEvent.targetTouches[0];
      pageXstart = touch.pageX;
      const index = $(this).parent().index()
      reloadX(index);

    },
    touchmove:function(e) {
      const touch = e.originalEvent.targetTouches[0];
      const x = touch.pageX;
      slidelangth= (x - pageXstart);
      //左滑，距离小于开始距离
      if(x<pageXstart){
        if(slidelangth<-80){ //不能超过80
          slidelangth=-80;
        }
        $(this).css('transform','translate('+slidelangth+'px)')
      }
      //右滑，距离大于于开始距离
      if(x>pageXstart){
        if(slidelangth>80){ //不能超过80
          slidelangth=80;
        }
        $(this).css('transform','translate('+(80-slidelangth)+'px)')
      }
    },
    touchend:function(e){
      const touch = e.originalEvent.changedTouches[0];
      pageXend = touch.pageX;
      // 左滑，距离超过40显示全部，不超过隐藏
      if(slidelangth<-40){
        $(this).css('transform','translate(-'+80+'px)')
      }else{
        $(this).css('transform','translate(0)')
      }
    }
  })
  removeItem();
})
//重置滑块
function reloadX(i){
  $('.bb_item_scroll').each(function(){
  const index = $(this).parent().index()
      if(index!==i){
        const style = $(this).css('transform');
        // 如果模块划出去了
        if(style!=='matrix(1, 0, 0, 1, 0, 0)'){
          $(this).css('transform','translate(0)')
        }
      }
  })
}
//点击删除，重置滑动
function removeItem(e){
  $('.bb_btn_delete').click(function(){
    $(this).parent('.bb_item_scroll').css('transform','translate(0)')
  })
}
