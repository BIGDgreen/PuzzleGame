//秒表计时
var minute=0,second=0;
var time=0;
var set_timer;
var begin=true;
var paused=false;

function timing(){
	time+=1;
    var minute=parseInt(time/60);
    var second=time%60;
    document.getElementById("timer").innerHTML=minute+"分"+second+"秒";	
}

//开始\暂停按钮
function start(){
	if(begin){
		begin=false;
		//按钮交替
		document.getElementById("start").value="暂停";
		//开始计时
	    set_timer=setInterval(timing,1000);
	}
	else{
		begin=true;		
		document.getElementById("start").value="开始";
		//暂停
		clearInterval(set_timer);
	}
}

function restart(){
	window.location.assign("./拼图.html");
}

//控制音频
function toggle(){
    var x=document.getElementById("press");
	var y=document.getElementById("sound");
	
	if(paused){
		paused=false;
	    y.style.backgroundImage="url(images/音效.png)";
		x.play();
	}
	else{
		paused=true;
	    y.style.backgroundImage="url(images/无音效.png)";
		y.style.backgroundSize="100%";
		x.pause();
	}
}