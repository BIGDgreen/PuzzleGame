var dataURL;

//上传并显示图片
function uploadImg(file, imgNum) {

	var widthImg = 798; //显示图片的width
	var heightImg = 498; //显示图片的height
	var div = document.getElementById(imgNum);

	if (file.files && file.files[0]) {

		div.innerHTML = '<img id="upImg">'; //生成图片

		var img = document.getElementById('upImg'); //获得用户上传的图片节点

		img.onload = function () {

			img.width = widthImg;
			img.height = heightImg;

		};

		var reader = new FileReader(); 
		reader.readAsDataURL(file.files[0]);

		reader.onload = function (evt) {           //判断图片是否加载完毕

			if (reader.readyState === 2) {
				//加载完毕后赋值  
				img.src = evt.target.result;
				
				//上传图片后隐藏按钮
				var upbtn = document.getElementById('upbtn');
				upbtn.style.opacity = 0;
				var up = document.getElementById("up");
				up.setAttribute('disabled',true);
				
				
				//启动确定按钮
				var yes = document.getElementById("yes");
			
				if(yes.disabled === true ){
						yes.removeAttribute('disabled');
					}	
			}
			
			var windowURL = window.URL || window.webkitURL; 
			//createObjectURL创建一个指向该参数对象(图片)的URL 
			dataURL = windowURL.createObjectURL(file.files[0]);
		
		};
		
		reader.onerror = function(){
			alert("无法读取该文件！");
		};


	}
}

var clicked = false;
//确定键
function ok(){
	//启动开始按钮，并将其转换成暂停
	var Start = document.getElementById("start");
	Start.removeAttribute("disabled");
	
	//计时开始
	time=0;
	if(begin){
		start();
	}
	
	//改变图片透明度，将其作为参考图
	document.getElementById("picture").style.opacity = 0.1;
	
	//显示emptyTable，作为参考线
	insertTable();
	
	//生成图片碎片,并随机分布在旁侧
	//确定按钮被点击过（已经生成碎片），则再次点击时，清除原碎片，生成新碎片
	if(!clicked){
		makeFragments();
		clicked = true;
	}
	
	else{
		//清除原mn个小div
		var sp = document.getElementById('storagePlace'); 
        var children = sp.childNodes; 
        for(var i = children .length - 1; i >= 0; i--){
          sp.removeChild(children[i]);
        }
		
		makeFragments();
	}	
}

//建立一个m*n的空表格的网格线
function insertTable() {
    var m = document.getElementById("m").value;
    var n = document.getElementById("n").value;
	var table = "<table id = 'demoTable'>";

	for (var i = 0; i < m; i++) {
		table += "<tr>";
		for (var j = 0; j < n; j++) {
			//第m行（最后一行,除了最后一个）
			if (i === m - 1 && j !== n - 1) {
				table += "<td class='cell mcell' id='cell"+i+j+"'>&nbsp;</td>";
			}

			//第n列（最后一列，除了最后一个）
			else if (j === n - 1 && i !== m - 1) {
				table += "<td class='cell ncell' id='cell"+i+j+"'>&nbsp;</td>";
			}

			//第m行第n列（最后一个）
			else if (j === n - 1 && i === m - 1) {
				table += "<td class='cell mncell' id='cell"+i+j+"'>&nbsp;</td>";
			}

			//其他的
			else {
				table += "<td class='cell' id='cell"+i+j+"'>&nbsp;</td>";
			}
	  }
		
		table += "</tr>";
	}

	table += "</table>";

	document.getElementById("mnTable").innerHTML = table;
	
	unifyCell();
}

//统一所有单元格大小
function unifyCell(){
	var m = document.getElementById("m").value;
	var n = document.getElementById("n").value;
	var cell = document.getElementsByClassName("cell");
	for(var i = 0; i < m*n; i++)
		{
		    cell[i].style.width = (798/n)+"px";
	        cell[i].style.height = (498/m)+"px";
		}

}

//切割图片
function makeFragments(){
	 //生成m*n个div元素
		var m = document.getElementById("m").value;
	    var n = document.getElementById("n").value;
	    var frags = "<table id = 'fragTable' border='0'>";
	    
	    for(var i = 0; i < m; i++){
            frags += "<tr>";
	    	for(var j = 0; j < n; j++){
	    		frags += "<td><div id='div"+i+j+"'></div></td>";
	    	}
			frags += "</tr>";
	    }
	
	frags += "</table>";
	
	document.getElementById("fragments").innerHTML = frags;
	
	//为每个div添加背景图片
	addImage();
	
	//将每个碎片随机散布在storagePlace中
	spreadFrag();
}

//为每个div添加背景图片
function addImage(){
	 var m = document.getElementById("m").value;
	 var n = document.getElementById("n").value;
	    
	 for(var i = 0; i < m; i++){
		 for(var j = 0; j < n; j++){
			 var curdiv=document.getElementById("div"+i+j);
			 var wid = 798;
			 var hgt = 498;
			 
			 //将input中上传的图片传进来
			 curdiv.style.background="url("+dataURL+") no-repeat scroll";
			
		     curdiv.style.backgroundSize="798px 498px";
			 
			 curdiv.style.width=(wid/n)+"px";
			 curdiv.style.height=(hgt/m)+"px";
			 
			 curdiv.style.backgroundPosition=getInverse(j*(wid/n))+
				 "px"+' '+getInverse(i*(hgt/m))+"px";
			 
		 }
	 }
}

       //取相反数
       function getInverse(num){
       	return (0-num);
       }

//将每个碎片随机散布在storagePlace中，并随机旋转0°，90°，180°，270°
function spreadFrag(){
	var m = document.getElementById("m").value;
    var n = document.getElementById("n").value;
	var storagePlace = document.getElementById("storagePlace");
	
	for(var i = 0; i < m; i++){
		 for(var j = 0; j < n; j++){
			 var curdiv=document.getElementById("div"+i+j);
			 storagePlace.appendChild(curdiv);
			 
			 curdiv.style.position = "absolute";
			 
			 curdiv.style.left = 920 + (350-(798/n))*Math.random()+"px";
			 curdiv.style.top = (500-(498/m))*Math.random()+"px";
			 
			 //旋转
			 var angle = 90*Math.floor(4*Math.random());
			 
			 curdiv.style.webkitTransform = 'rotate('+angle+'deg)';
             curdiv.style.mozTransform = 'rotate('+angle+'deg)';
             curdiv.style.msTransform = 'rotate('+angle+'deg)';
             curdiv.style.oTransform = 'rotate('+angle+'deg)';
             curdiv.style.transform = 'rotate('+angle+'deg)';
			 
			 //为curdiv添加rotateTimes属性，保存初始旋转次数
			 curdiv.setAttribute("rotateTimes",angle/90);
			
		 }
    }
}

//鼠标拖拽碎片进行拼图
function drag(){
	//游戏开始
	var start = document.getElementById("start");
	var m = document.getElementById("m").value;
	var n = document.getElementById("n").value;
	if(start.value==="暂停"){
		//获取鼠标点击的元素
        var curId = getId();
		var curDiv = document.getElementById(curId);
		//将当前div的index设为1，其余div的index设为0
		for(var i = 0; i < m; i++){
			for(var j = 0; j < n; j++){
				document.getElementById("div"+i+j).style.zIndex = 0;
			}
		}
		curDiv.style.zIndex = 1;

        var x, y; //存储curDiv的坐标
		var isDrag = false; //判断碎片的可移动状态
        
			curDiv.onmousedown = function(e) {
              e = e || window.event; //获取鼠标的位置
              x = e.clientX - curDiv.offsetLeft;
              y = e.clientY - curDiv.offsetTop;
              isDrag = true;
			  
              //选中div时添加边缘
              curDiv.style.border = "1px solid black";
              curDiv.style.borderRadius = "4px";
          };
		
          document.onmousemove = function(e) {
              //可移动状态（点击后）              　　　　　　　　　　　 　　　　　　　
            if(isDrag) {
                e = e || window.event;                    　　
                var moveX = e.clientX - x; //得到距离左边距离                 　　
                var moveY = e.clientY - y; //得到距离上边距离
                 
                var maxX = document.documentElement.clientWidth -  curDiv.offsetWidth;
                var maxY = document.documentElement.clientHeight -  curDiv.offsetHeight;

                //范围限定  当移动的距离最小时取最大  移动的距离最大时取最小
                if(moveX < 0) {
                    moveX = 0;
                 } 
			     else if(moveX > maxX) {
                   moveX = maxX;
                 }

                if(moveY < 0) {
                   moveY = 0;
                 } 
				 else if(moveY > maxY) {
                         moveY = maxY;
                 }

		       moveX=Math.min(maxX, Math.max(0,moveX));
                    
               moveY=Math.min(maxY, Math.max(0,moveY));
               curDiv.style.left = moveX + "px";
               curDiv.style.top = moveY + "px";
             } 
			  
			else {
		       return;
             }
          };

          document.onmouseup = function() {
              isDrag = false; //设置为false不可移动
				
		      //鼠标放下后，div边缘消失
		      curDiv.style.border = "none";
		      curDiv.style.borderRadius = 0;
          };
		
		//正确放置后，将碎片黏附在准确的正确位置
		if(parseInt(curDiv.getAttribute("rotateTimes"))%4 === 0 && positionOk()){
		
			var curCell = document.getElementById("cell"+curId.substring(3,5));
			
			var CellX = offset(curCell,'left');
			curDiv.style.left = CellX + "px";
			
			var CellY = offset(curCell,'top');
			curDiv.style.top = CellY + "px";
		}
		
		//所有碎片都放置正确后，弹出success
		var m = document.getElementById("m").value;
	    var n = document.getElementById("n").value;
		var num = 0;
		for(var i = 0; i < m; i++ )
			{
				for(var j = 0; j < n; j++)
					{
						var curdiv = document.getElementById("div"+i+j);
						var curcell = document.getElementById("cell"+i+j);
						if(offset(curdiv,'top')===offset(curcell,'top')&&
						  offset(curdiv,'left')===offset(curcell,'left')){
							num++;
						}
					}
			}
		
		if(num === m*n){
			alert("恭喜您成功完成拼图！");
			//暂停 
			clearInterval(set_timer);
		}
}
	
	//暂停状态下，拖拽无法进行
	if(start.value==="开始" && start.disabled === false){
		alert("游戏已暂停！请按下“开始”按钮继续游戏。");
	}
}


//双击旋转
function rotate(){
	var curId = getId();
	var curDiv = document.getElementById(curId);
	var count = parseInt(curDiv.getAttribute("rotateTimes"))+1;
	curDiv.setAttribute("rotateTimes",count);
	
	curDiv.style.webkitTransform = 'rotate('+90*count+'deg)';
    curDiv.style.mozTransform = 'rotate('+90*count+'deg)';
    curDiv.style.msTransform = 'rotate('+90*count+'deg)';
    curDiv.style.oTransform = 'rotate('+90*count+'deg)';			
    curDiv.style.transform = 'rotate('+90*count+'deg)';
	
	count ++;
	
}

//判断当前碎片是否放置正确
function positionOk(){
	var curId = getId();
	var curDiv = document.getElementById(curId);
	
	var curCell = document.getElementById("cell"+curId.substring(3,5));
	var DivX = offset(curDiv,'left');
	var DivY = offset(curDiv,'top');
	var CellX = offset(curCell,'left');
	var CellY = offset(curCell,'top');	
	
	//拖拽图与参考图之间的距离不超过图片大小的10%
    if(Math.abs(DivX-CellX) <= 0.2*parseFloat(curDiv.style.width) && Math.abs(DivY-CellY) <= 0.2*parseFloat(curDiv.style.height)){
	   return true;
	 }
	   
	else{
	   return false;
    }
}

//获取鼠标点击的div的id
function getId(evt){
	evt = evt || window.event;
	var obj = evt.target ||evt.srcElement;
	
	//防止锁定到其他div
	if(obj.id.substring(0,3)==="div"){
		return obj.id;
	}
	
	else{
		return;
	}
}

//获取某元素相对于浏览器窗口的偏移量
function offset(obj,direction){
    //将top,left首字母大写,并拼接成offsetTop,offsetLeft
    var offsetDir = 'offset'+ direction[0].toUpperCase()+direction.substring(1);
		
    var realNum = obj[offsetDir];
    var positionParent = obj.offsetParent;  //获取上一级定位元素对象
		
    while(positionParent != null){
	      realNum += positionParent[offsetDir];
	      positionParent = positionParent.offsetParent;
    }
    return realNum;
}
