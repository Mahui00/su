/*	1
兼容  getElementsByClassName （放在function里）
 思路 ：1 判断当前浏览器是否支持该方法 
	      true 直接用；（返回集合 现代浏览器）
	      false  其他方法来模拟（返回数组  ie低版本）
	             获取所有元素
	             筛选  有className属性的标签名
	             (在ie中 alls[i].className==classname存在问题，当一个类名比较多时获取不到所以写一个checkClass函数)
	    classname  是一个类名  字符串
	    obj  是一个对象（document是一个对象）
	此函数功能：获取obj对象里面的有指定类名的集合或数组
*/	

	function getClass(classname,obj){
		obj=obj||document;
		// obj=obj?obj:document;
		// obj=obj==undefined?document:obj;
		//if(隐式循环)
		if(document.getElementsByClassName){
			return obj.getElementsByClassName(classname);
		}else{
			var alls=obj.getElementsByTagName('*');
			var arr=[];
			for (var i = 0; i < alls.length; i++) {
				if(checkClass(alls[i].className,classname)){
					arr.push(alls[i])
				}
			};
			return arr;
		}
	}
	/*
	判断某一个元素的类名是否包含指定的类名
	str是否有str1
	思路 :拆分 
			 把一个带空格的字符串转换成数组
		  遍历   return把返回值跳出函数
	*/
	function checkClass(str,str1){
		var arr=str.split(' ');
		for (var i = 0; i < arr.length; i++) {
			if(arr[i]==str1){
				return true;
			}else{
				return false;
			}
		};
	}




	/*2 设置或获取元素文本（重载函数）   setText(obj,text)  获取 setText(obj)
	    1  判断参数个数
	    2  判断浏览器
	      obj.innerText   obj.textContent
	    3   if分支语句分别执行设置  
	    obj.innerText=text   obj.textContent=text
	*/
	function setText(obj,text){
		if(arguments.length==1){
			if(obj.innerText){
				return obj.innerText
			}else{
				return obj.textContent
			}
		}else if(arguments.length==2){
			if(obj.innerText){
				obj.innerText=text
			}else{
				obj.textContent=text
			}
		}
	}


	/*两种兼容方式：1 模拟  2 各用各的
	 3 获取元素的某种属性的样式getStyle(obj,attr)
	 getComputedStyle ff的方法
	 currentStyle    ie的方法   （事件里学的）
	*/
	function getStyle(obj,attr){
		if(window.getComputedStyle){
			return getComputedStyle(obj,null)[attr]
		}else{
			return obj.currentStyle[attr]
		}
	}

	/*
	4 获取元素（把三种方法集合在一个函数里方便调用 .  # xx  ）
	$()    若参数('<>')，则创建一个该元素标签 <xx>
	除了字符串还可以传函数，(回调函数)
	注意：传参数不能写空格
	功能介绍：传字符串表示通过名字获取对象或通过<>标签创建元素；传函数表示文档加载完成之后运行该函数
	*/
	function $(selector,obj){
		if(typeof(selector)=='string'){
			var obj=obj||document;
			var first=selector.charAt(0);
			if(first=='.'){
				return getClass(selector.substring(1),obj)
			}else if(first=='#'){
				return obj.getElementById(selector.slice(1))
			}else if(/^[a-zA-Z][a-zA-Z1-6]{0,7}$/.test(selector)){
				return	obj.getElementsByTagName(selector)
			}else if(/^<[a-zA-Z][a-zA-Z1-6]{0,7}>$/.test(selector)){
				return	document.createElement(selector.slice(1,-1))
			}
		}else if(typeof(selector)=='function'){
			// window.onload=function(){
			// 	selector()
			// }
			addEvent(window,'load',selector)
		}
	}


	/*5 兼容children属性 获取所有子元素节点（ie没有）,true 获取所有元素节点;false 获取元素节点和有意义的文本节点 
	getChild 思路：
	          ie8有这个属性,但和ff不一样
	          ie8以下没有这个属性
	*/
	function getChild(obj,type){
		 type=type===undefined?true:type;
		var childs=obj.childNodes;
		var newarr=[];
		if(type){
			for (var i = 0; i < childs.length; i++) {
				if(childs[i].nodeType==1){
					newarr.push(childs[i])
				}  
			};
			return newarr
		}else{
			//在获取到的所有子节点当中把元素节点和文本节点选出来，放到新数组中,trim用来判断文本是否有意义
			for (var i = 0; i < childs.length; i++) {
				if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.trim().length>0)){
					newarr.push(childs[i])
				} 
			};
			return newarr;
		}
	}
//6  firstChild 获取第一个元素子节点或文本子节点
	function firstChild(obj,type){
		var type=type===undefined?true:type;
		return getChild(obj,type)[0]
	}
	function lastChild(obj,type){
		var type=type||true;
		var childs=getChild(obj,type);
		return childs[childs.length-1]
	}
	function randomChild(obj,num,type){
		var type=type?type:true;
		var childs=getChild(obj,type);
		if(num<0||num>childs.length-1){
			return
		}
		return childs[num];
	}
	/*7 insertAfter  在指定子元素的后面插入一个子元素节点
	obj：位置 ele：即将要插入的元素
	next:在obj的下一个兄弟元素next的前面添加，parent.insertBefore(ele,next)
			insertBefore是节点的标准属性
	false:插入到父元素的最后
	*/
	function insertAfter(obj,ele){
		var parent=obj.parentNode;
		var next=getNext(obj);
		if(next){
			parent.insertBefore(ele,next)
		}else {
			parent.appendChild(ele)
		}
	}
	//8 获取下一个元素节点 null  空值   有返回，没有返回false
	function getNext(obj){
		var next=obj.nextSibling;
		if(next===null){
			return false;
		}while(next.nodeType!=1){
			next.nextSibling;
			if(next===null){
				return false
			}
		}
		return next;
	}
	/*9兼容
	addEvent(obj,type,fn)
	obj:指定的对象
	type:事件类型
	fn:事件处理程序

	*/
	function addEvent(obj,type,fn){
		//判断浏览器是否有此方法
		if(obj.addEventListener){
			//ff和ie高版本
			obj.addEventListener(type,fn,false)
		}else{
			//ie低版本（高版本没有）
			obj.attachEvent('on'+type,fn)
		}
	}
	function removeEvent(obj,type,fn){
		if(obj.addEventListener){
			obj.removeEventListener(type,fn,false)
		}else{
			obj.detachEvent('on'+type,fn)
		}
	}

	/*10 兼容滚轮事件

	*/
	function mouseWheel(obj,upfn,downfn){
		if(document.addEventListener){
			//w3c  谷歌   火狐
			obj.addEventListener('mousewheel',scrollFn,false);
			obj.addEventListener('DOMMouseWheel',scrollFn,false)
		}else if(document.attachEvent){
			//ie
			obj.attachEvent('onmousewheel',scrollFn)
		}
	}
	function scrollFn(e){
		var ev=e||window.event;  //兼容获取事件对象
		if (ev.preventDefault ){
			ev.preventDefault();//阻止默认浏览器动作(W3C)
		}else{
			  ev.returnValue = false;//IE中阻止函数器默认动作的方式
		}
		var dir=ev.wheelDelta||ev.detail;
		if(dir==120||dir==-3){
			upfn()
		}else if(dir==-120||dir==3){
			downfn()
		}
			
	}
	/*
  滚轮事件
 */

function mouseWheel(obj,upFn,downFn){
  if(document.addEventListener){
     //W3C
     obj.addEventListener('mousewheel',scrollFn,false);
     obj.addEventListener('DOMMouseScroll',scrollFn,false);
  }else if(document.attachEvent){
     obj.attachEvent('onmousewheel',scrollFn);
  }
 
  function scrollFn(e) {
    var ev=e||window.event;
    if (ev.preventDefault ){
       ev.preventDefault(); 
    }else{
       ev.returnValue = false;
    }
     var dir = e.wheelDelta||e.detail
      if(dir==-120||dir==3){
         downFn.call(obj);
      }else if(dir==120||dir==-3){
         upFn.apply(obj);
      }
  }
}


	//11 获取页面中任意元素相对于浏览器的位置（所有具有定位属性的父辈元素的offsetleft+父辈元素左边框的宽度+本身的相对位置）
	function offset(obj){
	  var ot=obj.offsetTop;
	  var ol=obj.offsetLeft;
	  // console.log(ot);
	  var parent=obj.parentNode;
	  var result={left:0,top:0};
	  while(parent.nodeName!="BODY"){
	  	// console.log(parent);
	    var pos=getStyle(parent,"position");
	    var blwidth=parseInt(getStyle(parent,"borderLeftWidth"))?parseInt(getStyle(parent,"borderLeftWidth")):0;
	  	// console.log(blwidth);
	    var btheight=parseInt(getStyle(parent,"borderTopWidth"))?parseInt(getStyle(parent,"borderTopWidth")):0;
	    if(pos=="absolute"||pos=="relative"){
	    	// console.log(parent)
	      ot+=parent.offsetTop+btheight;
	      ol+=parent.offsetLeft+blwidth;
	      // console.log(parent.offsetTop);
	      // console.log(parent.offsetLeft);
	    }
	    parent=parent.parentNode;
	  }
	  result.left=ol;result.top=ot;
	  return result;
}

// 12 判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }		 
			
