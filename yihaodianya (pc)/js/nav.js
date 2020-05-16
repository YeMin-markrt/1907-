// 首页头部上下轮播
var time = null;
autoplay1();
function autoplay1() {
  clearInterval(time)
  var time = setInterval(function () {
    if ($(".hd_topbar_home_ul").css("top") <= -$(".hd_topbar_home_ul").height()) {
      $(".hd_topbar_home_ul").finish().css({ top: 0 });
    } else {
      $(".hd_topbar_home_ul").animate({ top: -$(".hd_topbar_home_ul").height() }, 7000)
    }
  }, 500)
}


$(".hd_topbar_home_li").hover(function(){
  $(".hd_topbar_home_ul").stop(false,false)
  //  clearInterval(time);
},function(){
  autoplay1();
})



//首页二级菜单箭头的切换
$(".category-list-root1").hover(function () {
  $(".category-list-root1").html(`
        <i class="iconfont icon-caidan"></i>
              <span>全部类目</span>
              <i class="iconfont icon-iconzhongxinzhengli-1"></i>
`).find($(".category-list").css("display", "block"))
}, function () {
  $(".category-list-root1").html(`
        <i class="iconfont icon-caidan"></i>
              <span>全部类目</span>
              <i class="iconfont icon-iconzhongxinzhengli-"></i>
`).find($(".category-list").css("display", "none"))
});

$(".category-list").mouseenter(function () {
  $(".category-list").css("display", "block")
})
$(".category-list").mouseleave(function () {
  $(".category-list").css("display", "none")
})


//首页轮播图
var timer1 = null;
var index = 0;
autoplay2();
function autoplay2() {
  clearInterval(timer1)
  timer1 = setInterval(function () {
    index++;
    if (index >= $(".lunbo_ul li").length) {
      index = 0;
    }
    $(".lunbo_ul li").eq(index).addClass("active1").siblings().removeClass("active1");
    $(".lb_tab_ol li").eq(index).addClass("active2").siblings().removeClass("active2");
  },4000)
}

$(".lunbo_ul").hover(function () {
  clearInterval(timer1);
}, function () {
  autoplay2()
})

$(".lb_tab_ol li").hover(function () {
  clearInterval(timer1);
  index = $(this).index();
  $(".lunbo_ul li").eq(index).addClass("active1").siblings().removeClass("active1");
  $(".lb_tab_ol li").eq(index).addClass("active2").siblings().removeClass("active2");
}, function () {
  autoplay2()
})


//超级单品部分

$(".superSingle ul li").eq(0).siblings().css("background", "#FBFBFB")

var timer2 = null;
//var startDate=new Date($(".count_time").attr("data-startdate"));
var startDate = new Date();
var endDate = new Date($(".count_time").attr("data-enddate"));
var times = endDate - startDate;
var second = times / 1000;    //秒
function showData() {
  var days = parseInt(second / 60 / 60 / 24);
  var hours = parseInt(second / 60 / 60 % 24);
  var mins = parseInt(second / 60 % 60);
  var sec = parseInt(second % 60);
  hours = hours <= 9 ? `0${hours}` : hours;
  mins = mins <= 9 ? `0${mins}` : mins;
  sec = sec <= 9 ? `0${sec}` : sec;
  $(".time_hour").html(hours);
  $(".time_minit").html(mins);
  $(".time_second").html(sec);

}


timer2 = setInterval(function () {
  clearInterval(timer1);
  // second--;
  showData();
}, 1000);


//品质生活左右控制移动部分
$(".qua_top_left_btn").css("disabled", false);
$(".qua_top_right_btn").css("disabled", false);

huadong("qua_top_slideCon_ul1", "gundong1", 0);
// huadong("qua_top_slideCon_ul2", "gundong2", 0);
// huadong("qua_top_slideCon_ul3", "gundong3", 0);
// huadong("qua_top_slideCon_ul4", "gundong4", 0);

function huadong(ele1, ele2, index2) {
  var index1 = $(`.${ele1}`).length
  if (index2 <= 0) {
    $(`.${ele2} .qua_top_left_btn`).css("disabled", true);
  }
  if (index2 >= index1 - 1) {
    $(`.${ele2} .qua_top_right_btn`).css("disabled", true);
  }

  //左滑
  $(`.${ele2} .qua_top_left_btn`).click(function () {
    if (index2 <= 0) {
      $(`.${ele2} .qua_top_left_btn`).css("disabled", true);
      return;
    }
    index2--;
    if (index2 < 0) {
      $(`.${ele2} .qua_top_left_btn`).css("disabled", true);
    }
    pan(ele1, index2);
  })

  //右滑
  $(`.${ele2} .qua_top_right_btn`).click(function () {
    if (index2 >= index1 - 1) {
      $(`.${ele2} .qua_top_right_btn`).css("disabled", true);
      return;
    }
    index2++;
    if (index2 > index1 - 1) {
      $(`.${ele2} .qua_top_right_btn`).css("disabled", true);
    }
    pan(ele1, index2);
    console.log(index2);
  })
}

function pan(ele1, index2) {
  if (index2 == 0) {
    $(`.${ele1}`).animate({ left: "0px" }, 1500)
  } else if (index2 == 1) {
    $(`.${ele1}`).animate({ left: "-210px" }, 1500)
  } else if (index2 == 2) {
    $(`.${ele1}`).animate({ left: "-420px" }, 1500)
  }
}


//首页的商品详情




// 商品列表页样式待修改




//注册
$(".help_wrap").hover(function(){
  $(".hd_menu_list").css("display","block")
},function(){
  $(".hd_menu_list").css("display","none")
})



//首页js
$(".hd_header_wrap").css({
  borderWidth: "0px",
})

var cookie = document.cookie;
if (cookie) {
  var log_user = getCookie("log_user");
  if (log_user) {
    var html = `
<span class="hd_hi" style="color: #ff4040;">Hi,${log_user}</span>
  <a href="" class="hd_exit_link" style="color: #aaa;">&nbsp;退出登录</a>
`
    $(".ttt .hd_unlogin").html(html)
  }
}

$(".ttt .hd_exit_link").click(function () {
  setCookie("log_user", "", -7);
  setCookie("log_pwd", "", -7);
  setCookie("log_id", "", -7);
})


// 注册





//商品列表js




  //商品详情
  


  // 购物车页面



  // 登录页面
  
 