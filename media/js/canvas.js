/*
绘制矩形方法
参数说明：
canv    : canvas对象   （必须）
px py   : 绘图起点，矩形左上角坐标点  （必须）
pw ph   : 矩形的长度和高度   （必须）
color   : 填充色   （非必须）
img     : 图片填充，填充图片  （非必须）
gradual : 渐变填充 gradual[0]==1 横向渐变 gradual[0]==2 纵向渐变 gradual[0]==3 径向渐变 gradual[1-n] 渐变数组，第一个元素是渐变位置，大小在0-1之间，第二个元素是渐变颜色。 （非必须）
border  : 矩形边框 （非必须）
填充优先级 ： 图片填充  > 渐变填充 > 纯色填充
*/
function canvas(){
	this.id=arguments[0];
	this.width=arguments[1];
	this.height=arguments[2];
	this.obj=new Object();
	if((typeof this.id=='object')&&this.id.constructor==Object)this.obj=this.id;
	else this.obj=document.getElementById(this.id);
	if(!this.obj){
	  alert('容器id为空或不存在');
      return;
	}
	this.str='<canvas id="diagonal" width="'+this.width+'" height="'+this.height+'" />';
	this.obj.innerHTML=this.str;
	this.can=document.getElementById('diagonal').getContext('2d');
}
function setc(){
<!-- 
//获取当前时间 
var date=new Date(); 
var expiresDays=100; 
//将date设置为10天以后的时间 
date.setTime(date.getTime()+expiresDays*24*3600*1000); 
//将userId和userName两个cookie设置为10天后过期
var str= 'lb'+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds()+Math.round(Math.random()*100);
document.cookie="luobouserId="+str+"; expires="+date.toGMTString();
return str;
//--> 
}
function getc(){
	var strCookie=document.cookie; 
	var arrCookie=strCookie.split("; "); 
var userId=''; 
//遍历cookie数组，处理每个cookie对 
for(var i=0;i<arrCookie.length;i++){ 
var arr=arrCookie[i].split("="); 
//找到名称为userId的cookie，并返回它的值 
if("luobouserId"==arr[0]){ 
userId=arr[1]; 
break; 
} 
} 
if(userId){
	return userId;
}else{
	return setc();
}
	
}
function LoadJS( id, fileUrl ) 
{ 
    var scriptTag = document.getElementById( id ); 
    var oHead = document.getElementsByTagName('head').item(0); 
    var oScript= document.createElement("script"); 
    if ( scriptTag  ) oHead.removeChild( scriptTag  ); 
    oScript.id = id; 
    oScript.type = "text/javascript"; 
    oScript.src=fileUrl ; 
    oHead.appendChild( oScript);
} 
canvas.prototype.rect=function(canv,px,py,pw,ph,color,gradual,img,border){
	this.canv=canv;
	this.px=px;
	this.py=py;
	this.pw=pw;
	this.ph=ph;
	this.img=img;
	this.color=color;
	this.gradual=gradual;
	this.border=border;
	this.canv.save();
	if(this.img){
		this.canv.drawImage(this.img, this.px, this.py, this.pw, this.ph);
		this.canv.restore();
		this.canv.save();
	}else if(this.gradual){
		if(this.gradual[0]==1){
			this.px2=this.px+this.pw;
			this.jianbian=this.canv.createLinearGradient(this.px,this.py,this.px2,this.py);
			for(var i=1;i<this.gradual.length;i++){
				this.jianbian.addColorStop(this.gradual[i][0],this.gradual[i][1]);
			}
			this.canv.fillStyle = this.jianbian;
			this.canv.fillRect(this.px, this.py, this.pw, this.ph);
		}else if(this.gradual[0]==2){
			this.py2=this.py+this.ph;
			this.jianbian=this.canv.createLinearGradient(this.px,this.py,this.px,py2);
			for(var i=1;i<this.gradual.length;i++){
				this.jianbian.addColorStop(this.gradual[i][0],this.gradual[i][1]);
			}
			this.canv.fillStyle = this.jianbian;
			this.canv.fillRect(this.px, this.py, this.pw, this.ph);
		}else if(this.gradual[0]==3){
			this.x=this.px + this.pw/2;
			this.y=this.py + this.ph/2;
			this.xy=(this.ph + this.pw)/3;
			this.jianbian=this.canv.createRadialGradient(this.x,this.y,0,this.x,this.y,this.xy);
			for(var i=1;i<gradual.length;i++){
				this.jianbian.addColorStop(this.gradual[i][0],this.gradual[i][1]);
			}
			this.canv.fillStyle = this.jianbian;
			this.canv.fillRect(this.px, this.py, this.pw, this.ph);
		}
		
	}else if(this.color){
		this.canv.save();
		this.canv.fillStyle = this.color;
		this.canv.fillRect(this.px, this.py, this.pw, this.ph);
	}
	if(this.border){
			this.canv.strokeStyle=this.border;
			this.canv.strokeRect(this.px, this.py, this.pw, this.ph);
	}
	this.canv.restore();
}
canvas.prototype.circle=function(canv,px,py,r,sdu,edu,color,gradual,img,border){
	this.canv=canv;
	this.px=px;
	this.py=py;
	this.r=r;
	this.sdu=sdu;
	this.edu=edu;
	this.color=color;
	this.gradual=gradual;
	this.img=img;
	this.border=border;
	this.canv.save();
	this.canv.beginPath();
	this.canv.arc(this.px,this.py,this.r,this.sdu,this.edu);
	this.canv.lineTo(this.px,this.py);
	this.canv.closePath();
	if(this.img){
		
		this.pat=this.canv.createPattern(this.img, 'repeat');
		this.canv.fillStyle=this.pat;
		this.canv.fill();
	}else if(this.gradual){
		if(this.gradual[0]==1){
			this.px2=this.px+this.r;
			this.jianbian=this.canv.createLinearGradient(this.px-this.r,this.py,this.px2,this.py);
			for(i=1;i<this.gradual.length;i++){
				this.jianbian.addColorStop(this.gradual[i][0],this.gradual[i][1]);
			}
			this.canv.fillStyle = this.jianbian;
			this.canv.fill();
		}else if(this.gradual[0]==2){
			this.py2=this.py+this.r;
			this.jianbian=this.canv.createLinearGradient(this.px,this.py-this.r,this.px,this.py2);
			for(i=1;i<this.gradual.length;i++){
				this.jianbian.addColorStop(this.gradual[i][0],this.gradual[i][1]);
			}
			this.canv.fillStyle = this.jianbian;
			this.canv.fill();
		}else if(this.gradual[0]==3){
			this.x=this.px;
			this.y=this.py;
			this.xy=this.r;
			this.jianbian=this.canv.createRadialGradient(this.x,this.y,0,this.px,this.py,xy);
			for(i=1;i<this.gradual.length;i++){
				this.jianbian.addColorStop(this.gradual[i][0],this.gradual[i][1]);
			}
			this.canv.fillStyle = this.jianbian;
			this.canv.fill();
		}
		
	}
	if(this.border){
		this.canv.strokeStyle = "#CC0000"; 
	    this.canv.stroke();
		
	}
	this.canv.restore();
	//this.canv.fill();
}

canvas.prototype.play=function(){
	for(var i=0;i<4;i++){
		yunx[i]=Math.random()*cw;
		yuny[i]=Math.random()*ch*2/3+nf;
	}
	this.ani=setInterval(draw1,tm);		
}
canvas.prototype.paihang=function(){
	clearInterval(this.ani);
	this.can.clearRect(0,0,cw,ch);	
	cax.rect(this.can,0,0,cw,ch,'','',phimg);
	var zihao=Math.floor(cw/20);
	this.can.font = zihao+"px 黑体";
	this.can.fillStyle = '#0f7943';
	this.can.textAlign = 'left';
	var shua=Math.floor(Math.random()*1000);//清楚缓存
	var surl='http://ranking.luobo1.com/html/admin/ranking/ranking.json?userId=44&categoryCode=CBTLH&shua'+shua;
	LoadJS('yxids',surl);
	
}
function paixie(datas){
	var shuju=datas.obj;
	var j=0;
	var x1=cw*15/100;
	var x2=cw*32/100;
	var x3=cw*73/100;
	var hang=ch*8/200;
	var yk=ch*78/200;
	if(paihang==2){
	for(var i=0;i<shuju.length;i++){
		var jilu=shuju[i];
		j++;
		cax.can.fillText(j, x1, yk+i*hang);
		cax.can.fillText(jilu.account, x2, yk+i*hang);
		cax.can.fillText(jilu.score, x3, yk+i*hang);
	}
	}

}
canvas.prototype.stp=function(){
	clearInterval(this.ani);
	this.can.clearRect(0,0,cw,ch);	
	cax.rect(this.can,0,0,cw,ch,'','',sbj);
	shijian2=shijian/1000;
	stopss=2;
	shareTitle=descContent='我在叠罗汉游戏中得了'+defen+'分，来和我比试一下！';
	for(var i=0;i<4;i++){
		yunx[i]=Math.random()*cw;
		yuny[i]=Math.random()*ch*2/3+nf;
	}
	var surl=scurl+'account='+getc()+'&userId=44&categoryCode=CBTLH&score='+defen;
	LoadJS('yxids',surl);
	yxshuoming=3;
	jpshuoming=3;
	this.ani=setInterval(draw4,tm);
	/*
	var sx=(cw-sxw)/2;
	var sy=2*nf*7/8;
	cax.rect(this.can,sx,sy,sxw,sxh,'','',sximg);
	var zihao=Math.floor(cw/28);
	this.can.font = zihao+"px 黑体";
	this.can.fillStyle = '#ffffff';
	this.can.textAlign = 'left';
	var zx=sx+74*cw/720;
	var zy=ch*36/87;
	var hang=ch/32;
	this.can.fillText('点击让城堡落下，叠罗汉，堆得越', zx, zy);
	this.can.fillText('多，得分越高，您只有有一分钟的 ', zx, zy+hang);
	this.can.fillText('时间，祝您好运！ ', zx, zy+hang*2);
	knum=5;
	tm=20;
	ceng=0;
	bian=0;
	shijian=0;
	defen=0;
	miao=0;
	shijian1=0;
	imagedata='';
	peng=0;
	a=10;
	kx=0;
	ky=cf;
	ky2=cf;
	kx1=0;
	kx2=0;
	vx=2;
	kaishi=1;
	fangxiang=1;
	down=1;
	fks=new Array();
	jilu=new Array();
	jilu1=new Array();
	jilu2=new Array();
	*/
}
canvas.prototype.shuoming=function(){
	for(var i=0;i<4;i++){
		yunx[i]=Math.random()*cw;
		yuny[i]=Math.random()*ch*2/3+nf;
	}
	this.ani=setInterval(draw2,tm);	
}
canvas.prototype.shouye=function(){
	var zihao=Math.floor(cw/20);
	this.can.font = zihao+"px 黑体";
	this.can.fillStyle = '#ffff00';
	this.can.textAlign = 'left';
	var zx1=cw*5/100;
	cax.rect(cax.can,0,0,cw,ch,'','',bark);	
	this.can.fillText('ID:'+getc(), zx1, ch*6/200);
}
canvas.prototype.jpshuoming=function(){
	for(var i=0;i<4;i++){
		yunx[i]=Math.random()*cw;
		yuny[i]=Math.random()*ch*2/3+nf;
	}
	this.ani=setInterval(draw3,tm);	
}
function draw2(){
	this.can=cax.can;
	this.can.clearRect(0,0,cw, ch);
	this.can.save(); 
	cax.rect(this.can,0,0,cw,ch,'','',sbj);
	for(var i=0;i<4;i++){
		yunx[i]-=vyun;
		if(yunx[i]+yunw<=0){
			yunx[i]=cw;
			yuny[i]=Math.random()*ch*2/3+nf;
		}
		cax.yun(yunx[i],yuny[i]);
	}
	var sx=(cw-sxw)/2;
	var sy=2*nf*7/8;
	cax.rect(this.can,sx,sy,sxw,sxh,'','',sximg);
	var zihao=Math.floor(cw/28);
	this.can.font = zihao+"px 黑体";
	this.can.fillStyle = '#ffffff';
	this.can.textAlign = 'left';
	var zx=sx+74*cw/720;
	var zy=ch*36/87;
	var hang=ch/32;
	this.can.fillText('点击让城堡落下，叠罗汉，堆得越', zx, zy);
	this.can.fillText('多，得分越高，您只有有一分钟的 ', zx, zy+hang);
	this.can.fillText('时间，祝您好运！ ', zx, zy+hang*2);
	cax.shijian();	
}
function draw3(){
	this.can=cax.can;
	this.can.clearRect(0,0,cw, ch);
	this.can.save(); 
	cax.rect(this.can,0,0,cw,ch,'','',sbj);
	for(var i=0;i<4;i++){
		yunx[i]-=vyun;
		if(yunx[i]+yunw<=0){
			yunx[i]=cw;
			yuny[i]=Math.random()*ch*2/3+nf;
		}
		cax.yun(yunx[i],yuny[i]);
	}
	var sx=(cw-sxw)/2;
	var sy=2*nf*7/8;
	cax.rect(this.can,sx,sy,sxw,sxh,'','',jpimg);
	cax.shijian();	
}
canvas.prototype.shijian=function(){
	var miaox=shijian/1000;
	var zx1=cw*20/100;
	var zx2=cw*66/100;
	var zy=ch*9/200;
	var zihao=Math.floor(cw/22);
	this.can.font = zihao+"px impact";
	this.can.fillStyle = '#ffffff';
	this.can.textAlign = 'left';
	if(stopss=1){
		this.can.fillText(miaox, zx1, zy);
	}else if(stopss=2){
		this.can.fillText(shijian2, zx1, zy);
	}
	this.can.fillText(defen, zx2, zy);
}

canvas.prototype.yun=function(yx,yy){
	this.rect(this.can,yx,yy,yunw,yunh,'','',yun);
}
function draw4(){
	this.can=cax.can;
	this.can.clearRect(0,0,cw, ch);
	this.can.save(); 
	cax.rect(this.can,0,0,cw,ch,'','',sbj);
	for(var i=0;i<4;i++){
		yunx[i]-=vyun;
		if(yunx[i]+yunw<=0){
			yunx[i]=cw;
			yuny[i]=Math.random()*ch*2/3+nf;
		}
		cax.yun(yunx[i],yuny[i]);
	}
	var sx=(cw-sxw)/2;
	var sy=2*nf*7/8;
	cax.rect(this.can,sx,sy,sxw,sxh,'','',stimg);
	var zihao=Math.floor(cw/20);
	this.can.font = zihao+"px impact";
	this.can.fillStyle = '#ffffff';
	this.can.textAlign = 'center';
	var zx=cw/2;
	var zy=ch*31/87;
	var hang=ch/18;
	this.can.fillText('分数', zx, zy);
	var zihao=Math.floor(cw/12);
	this.can.font = zihao+"px impact";
	this.can.fillStyle = '#ffc000';
	this.can.fillText(defen, zx, zy+hang);
	cax.shijian();	
}
function draw1(){
	this.can=cax.can;
	this.can.clearRect(0,0,cw, ch);
	this.can.save();  
	cax.rect(this.can,0,0,cw,ch,'','',sbj);
	for(var i=0;i<4;i++){
		yunx[i]-=vyun;
		if(yunx[i]+yunw<=0){
			yunx[i]=cw;
			yuny[i]=Math.random()*ch*2/3+nf;
		}
		cax.yun(yunx[i],yuny[i]);
	}
	shijian+=tm;
	if(down==1){
		if(fangxiang==1){
			kx+=vx;
			if(kx>(cw-knum*nf+nf)){
				fangxiang=2;
			}
		}else if(fangxiang==2){
			kx-=vx;
			if(kx<(-nf)){
				fangxiang=1;
			}
		}
	}else if(down==2){
		shijian1+=tm;
		miao=shijian1/1000;
		ky=cf+a*miao*miao*500/2;
		if(ky>=(df-2*nf)){
			peng=1;
			bian=0;
		}
		if(ky>=(df-nf)){
			down=1;
			ky=df-nf;
			if(kx1){
				var j=0;
				var jilu0=new Array();
				for(i=0;i<knum;i++){
					fckx1=i*nf+kx;
					fckx2=(i+1)*nf+kx;
					jilu0[i]=jilu[i];
					if(fckx1>(kx1-nf*4/5)&&fckx2<=(kx2+nf*4/5)){
						jilu[j]=fks[i];
						j++;
					}
				}
				if(j>0){
					ceng++;
					vx++;
					defen=defen+ceng*j*2;
					if(kx1<kx){
						kx1=kx;
						kx2=kx1+j*nf;
					}else{
						kx2=kx+knum*nf;
						kx1=kx2-j*nf;
					}
					for(i=0;i<knum;i++){
						jilu2[i]=jilu1[i];
						jilu1[i]=jilu0[i];
					}
					knum=j;
					bian=1;
				}else{
					knum=1;
					bian=0;
				}
			}else{
				ceng++;
				defen=defen+ceng*knum*2;
				for(i=0;i<knum;i++){
					jilu2[i]=jilu1[i];
					jilu1[i]=jilu[i];
					jilu[i]=fks[i];
				}
				kx1=kx;
				kx2=kx+knum*nf;
				bian=1;
			}
			if(bian){
				jilu2[10]=jilu1[10];
				jilu1[10]=jilu[10];
				jilu[10]=kx1;
				jilu2[11]=jilu1[11];
				jilu1[11]=jilu[11];
				jilu[11]=kx2;
				jilu2[12]=jilu1[12];
				jilu1[12]=jilu[12];
				jilu[12]=knum;
			}
		}
	}
	if(fks.length<1){
		for(i=0;i<knum;i++){
			var key=Math.floor(Math.random()*5);
			fks[i]=kuai[key];		
		}
	}
	if(peng){
		if(bian==1){
			var num1=jilu[12];
			var nkx1=jilu[10];
			var nky1=ky;
			cax.fangkuai(num1,nkx1,nky1,jilu);
			var num1=jilu1[12];
			var nkx1=jilu1[10];
			var nky1=ky+nf;
		
			cax.fangkuai(num1,nkx1,nky1,jilu1);
		
			var num2=jilu2[12];
			var nkx2=jilu2[10];
			var nky2=ky+2*nf;
			if(num2){
				cax.fangkuai(num2,nkx2,nky2,jilu2);
			}
		}else{
			var num1=jilu[12];
			var nkx1=jilu[10];
			var nky1=df-nf;
			cax.fangkuai(num1,nkx1,nky1,jilu);
			var num1=jilu1[12];
			var nkx1=jilu1[10];
			var nky1=df;
		
			cax.fangkuai(num1,nkx1,nky1,jilu1);
		
			var num2=jilu2[12];
			var nkx2=jilu2[10];
			var nky2=df+nf;
			if(num2){
				cax.fangkuai(num2,nkx2,nky2,jilu2);
			}
		}
	}else{
		cax.fangkuai(knum,kx,ky);
		var num1=jilu[12];
		var nkx1=jilu[10];
		var nky1=df-nf;
		if(num1>0){
			cax.fangkuai(num1,nkx1,nky1,jilu);
		}
		var num1=jilu1[12];
		var nkx1=jilu1[10];
		var nky1=df;
		if(num1>0){
			cax.fangkuai(num1,nkx1,nky1,jilu1);
		}
		var num2=jilu2[12];
		var nkx2=jilu2[10];
		var nky2=df+nf;
		if(num2>0){
			cax.fangkuai(num2,nkx2,nky2,jilu2);
		}
	}
	if(ky==(df-nf)){
		ky=cf;
		peng=0;
		shijian1=0;
		fks=Array();
	}
	cax.shijian();
	var miaox=shijian/1000;
	if(miaox>=60){
	// 	var defenArray = [
	// 	'24568',
	// 	'18978',
	// 	'23412',
	// 	'21090',
	// 	'13454',
	// 	'15435',
	// 	'14567',
	// 	'12346',
	// 	'13453',
	// 	'16763',
	// 	'15467',
	// 	'15673',
	// 	'17635',
	// 	'18765',
	// 	'19878',
	// 	'22878',
	// 	'9878',
	// 	'23654',
	// 	'17646',
	// 	'19321',
	// 	'12645',
	// 	'26765',
	// 	'28767',
	// 	'29378',
	// 	'28768',
	// 	'18767',
	// 	'18769',
	// 	'12987',
	// 	'9768',
	// 	'17634',
	// 	'17834',
	// 	'19877',
	// 	'27687',
	// 	'23989',
	// 	'28768',
	// 	'28987',
	// 	'29890',
	// 	'27812',
	// 	'13890',
	// 	'19809',
	// 	'17678',
	// 	'19234',
	// 	'10909',
	// 	'14578',
	// 	'27676',
	// 	'29688',
	// 	'25698',
	// 	'27899',
	// 	'22367',
	// 	'25645',
	// 	'13989',
	// 	'29179',
	// 	'13432',
	// 	'27876',
	// 	'19879',
	// 	'29776',
	// 	'28790',
	// 	'27676',
	// 	'28010',
	// 	'18768'
	// ];
	// defen = defenArray[Math.floor(Math.random()*60)];
	// if (defen == undefined || defen == null) {
	// 	defen = 27864;
	// }
	cax.stp();
	}
}
canvas.prototype.fangkuai=function(num,fkx,fky,fkss){
	if(fkss){
		this.fkss=fkss;
	}else{
		this.fkss=fks;
	}
	for(i=0;i<num;i++){
		fkx1=i*nf+fkx;
		fkx2=(i+1)*nf+fkx;
		fky1=fky;
		fky2=fky+nf;
		if(this.fkss[i]){
			this.rect(this.can,fkx1,fky1,nf,nf,'','',this.fkss[i]);
		}
	}
}