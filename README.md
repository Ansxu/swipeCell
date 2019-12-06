搞了一个滑动删除功能，把实现方法整理记录一下；demo地址
> 先放预览图

![](https://user-gold-cdn.xitu.io/2019/12/6/16ed9c0c252bd7ab?w=369&h=665&f=gif&s=1270806)
## 实现思路
#### 布局
1、最外层一个盒子，固定宽度，跟手机屏幕宽相同。设置超出隐藏`overflow:hidden;`

2、盒子包裹两个盒子，一个是最初看到的内容展示（内容框）宽度与屏幕宽度相同；一个是滑动出来的删除按钮（删除框）。
#### 逻辑
用到几个事件`touchstart`鼠标按下时，`touchmove`鼠标滑动时，`touchend`鼠标抬起时；为了做的看起来有弹性，做了一些判断。

1、`touchstart`当鼠标点击时记录点击的X坐标，并关闭其他已滑出的块；

2、`touchmove`鼠标滑动时，设置样式`transform:translate(滑动到的X坐标 - 按下时记录的X坐标)`，但是不能超过删除按钮的最大宽度，并记录滑动的距离；

3、`touchend`鼠标抬起时，如果滑动的距离大于删除按钮的一半，就显示，如果不大于，就恢复正常（隐藏删除按钮）

#### 实现代码
html
```
      <div class="item-prolists clearfix">
          <!-- 遍历item -->
          <div class="bb_item">
            <div class="bb_item_scroll clearfix">
                <!-- 内容框 -->
                <div class="proitem flex-start"> 
                  <div class="img"><img src="http://www.jshddq.net/UploadFiles/img_1_2078811226_3896325937_26.jpg"></div>
                  <div class="descbox">
                        <div class="flex-center mb5">
                            <p class="title text-line2">柴犬吃惊了</p>
                        </div>
                        <div class="pricebox flex-start">
                          <span>
                            <span class="price">￥999</span>
                          </span>
                          <span class="tag">赚￥123.3</span>
                        </div>
                  </div>
                </div>
                <!-- 滑动删除框 -->
                <div class="bb_btn_delete"><button>删除</button></div>
            </div>
          </div>
          
       </div>

```
js
```
$(function(){
  let pageXstart = 0;//按下的位置
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

```

