$(function(){
	//红包
	var bg=$('.bgredbag')[0];
	var red=$('.redbag')[0]
	var x=document.querySelector('.x');
	x.onclick=function(){
		bg.style.display='none';
		red.style.display='none';
	}
// 主会场
var hd=$('.header')[0];
var close=$('.close',hd)[0];
var hv=$('.headnav-li')[0];
var jh=$('.jiahao',hv)[0];
// console.log(jh);
jh.onclick=function(){
	hd.style.display='block';
	jh.style.display='none'
}
close.onclick=function(){
	hd.style.display='none';
	jh.style.display='block'
}
 
//下拉菜单（本身隐藏）
var lis=document.querySelectorAll('.xl');
var xialas=document.querySelectorAll('.headnav-li .xiala');
// console.log(xialas);
for (var i = 0; i < lis.length; i++) {
	lis[i].index=i;
	lis[i].onmouseover=function(){
		xialas[this.index].style.display='block'
	};
	lis[i].onmouseout=function(){
		xialas[this.index].style.display='none'
	}
};

//banner选项卡 封装（本身隐藏）
function xxk1(btn1,btn2){
	var bli=document.querySelectorAll(btn1);
	var bxx=document.querySelectorAll(btn2);
	for (var i = 0; i < bli.length; i++) {
		bli[i].index=i;
		bli[i].onmouseover=function(){
			bxx[this.index].style.display='block'
		};
		bli[i].onmouseout=function(){
			bxx[this.index].style.display='none'
		}
	};
}
xxk1('.banner-liL li','.banner-liL .bxx');
//二维码
xxk1('.app span','.erweima');
//banner右侧选项卡(本身存在)
function xxk2(btn1,btn2,btn3){
	var brli=document.querySelectorAll(btn1);
	var bshow=document.querySelectorAll(btn2);
	var bspan=document.querySelectorAll(btn3);
	for (var i = 0; i < brli.length; i++) {
		brli[i].index=i;
		brli[i].onmouseover=function(){
			for (var j = 0; j < brli.length; j++) {
			bshow[j].style.zIndex=0;	
			bspan[j].style.display='none';
					// btn[i].style.background="#211616"
				// show[j].style.opacity=0;
			};
			bshow[this.index].style.zIndex=2;
			bspan[this.index].style.display='block';
				// this.style.background="#e5004f";
			// show[this.index].style.opacity=1;
		}
	};
}
xxk2('.banner-liRbtn li','.showbox .show','.banner-liRbtn span');
xxk2('.fz li','.ffz','.fz span');
xxk2('.sj li','.ssj','.sj span');

//必抢清单选项卡(本身存在)（span设置不一样）
	var brli=document.querySelectorAll('.san-top li');
	var bshow=document.querySelectorAll('.san-bot ul');
	var bspan=document.querySelectorAll('.san-top span');
	for (var i = 0; i < brli.length; i++) {
		brli[i].index=i;
		brli[i].onmouseover=function(){
			for (var j = 0; j < brli.length; j++) {
			bshow[j].style.zIndex=0;	
			bspan[j].style.border=0;
					// btn[i].style.background="#211616"
				// show[j].style.opacity=0;
			};
			bshow[this.index].style.zIndex=2;
			bspan[this.index].style.borderBottom='2px solid #9a5d7f';
				// this.style.background="#e5004f";
			// show[this.index].style.opacity=1;
		}
	};
//图片移动(以右边定位)
function Rmove(btn1,btn2){
	var imgs=document.querySelectorAll(btn2);
	var as=document.querySelectorAll(btn1);
	// console.log(imgs);
	for (var i = 0; i < as.length; i++) {
		as[i].index=i;
		as[i].onmouseover=function(){
			animate(imgs[this.index],{marginRight:10},300)
		}
		as[i].onmouseout=function(){
			animate(imgs[this.index],{marginRight:0},300)
		}
	};
}
Rmove('.likeL .content','.content>img');
Rmove('.likeR .item','.item img');
Rmove('.brandL li','.brandL img');
//图片移动（受margin-left影响，且直接放图片上才可移动）
	var imgs=document.querySelectorAll('.san-bot img');
	// console.log(imgs);
	for (var i = 0; i < imgs.length; i++) {
		imgs[i].onmouseover=function(){
			animate(this,{marginLeft:5,marginRight:10},300)
		}
		imgs[i].onmouseout=function(){
			animate(this,{marginLeft:15,marginRight:0},300)
		}
	};
// banner轮播
function lb(box,img,point,pli,L,R){
	var lbbox=$(box)[0];
	var lunbos=$(img,lbbox);
	var pointbox=$(point,lbbox)[1];
	var point=$(pli,pointbox);
	var num=0,t;var flag=true;
	var LL=$(L,lbbox)[0];
	var RR=$(R,lbbox)[0];
	function move(){
		num++;
		if(num==lunbos.length){
			num=0
		}
		for (var i = 0; i < lunbos.length; i++) {
			animate(lunbos[i],{opacity:0},1000);
			point[i].style.background='#333'
		};
			animate(lunbos[num],{opacity:1},1000,function(){
			flag=true
		});
			point[num].style.background='#ff6000'
	}
	t=setInterval(move,2000);
	lbbox.onmouseover=function(){
		clearInterval(t);
	}
	lbbox.onmouseout=function(){
		t=setInterval(move,2000);
	}
	for (var i = 0; i < lunbos.length; i++) {
		point[i].index=i;
		point[i].onmouseover=function(){
			for (var i = 0; i < lunbos.length; i++) {
				animate(lunbos[i],{opacity:0},300);
				point[i].style.background='#333';
			};
			// alert(1);
			animate(lunbos[this.index],{opacity:1},300,function(){
			flag=true
		});
			point[this.index].style.background='#ff6000';
			num=this.index;
		}
	}	
	function down(){
		num--;
		if(num<0){
			num=lunbos.length-1
		}
		for (var i = 0; i < lunbos.length; i++) {
			animate(lunbos[i],{opacity:0},300);
			point[i].style.background='#333'
		};
		animate(lunbos[num],{opacity:1},300,function(){
			flag=true
		});
		point[num].style.background='#ff6000'
	}
	LL.onclick=function(){
		if(!flag){
			return
		}
		flag=false;
		down();
	}
	RR.onclick=function(){
		if(!flag){
			return
		}
		flag=false;
		move();
	}
}
lb('.banner-liM','.lunbo','.point','li','.LL','.RR')
//双下标轮播（所有图片放一个盒子里）如果分成三个盒子堆在一起则可用节点轮播









})