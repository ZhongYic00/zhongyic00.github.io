import { Slider } from "./modules/touch.mjs";

const toMediumSize=(url)=>{
	return String(url).replace('jpg','md.jpg');
};
function ajaxGet(url){
	return new Promise(function(resolve){
		var rt=new XMLHttpRequest();
		rt.open("get",url,true);
		rt.send();
		rt.onreadystatechange=function(){
			if(rt.readyState==4)resolve(rt.responseText);
		}
	});
}
function loadImage(img,url,callback){
    img.src=url;
    var timer=setInterval(
        function(){
            if(img.complete){
                if(callback)callback();
                clearInterval(timer);
            }
        },
        100
    );
}
async function getImages(){
	console.log('async function()');
	return undefined;
}
{
let screenDirection=()=>{return window.innerHeight<window.innerWidth*0.75;}
window.onload=async function(){
	var jsonText=await ajaxGet('/resources/json/gallery.json');
	images=new Array();
	var tmp=JSON.parse(jsonText);
	for(var i in tmp.pictures){
		images.push(tmp.pictures[i]);
	}
	idnow=-1;
	changeButtons[0].addEventListener('click',function(){changePicture(-1)}),changeButtons[1].addEventListener('click',function(){changePicture(1)});
	changePicture(1);
	zoomButtons[0].addEventListener('click',function(){zoomIn()}),zoomButtons[1].addEventListener('click',function(){zoomOut()});
	if(!screenDirection())zoomButtons[0].classList.add('show'),zoomButtons[1].classList.add('show');
	zoomed=false;
};
var images,zoomed=false,idnow=0,
	container=document.getElementById('image-container'),
	fullcontainer=document.getElementById('fullscreen-box'),
	imageSmall=document.getElementById('image-main'),
	imageBig=document.getElementById('image-full'),
	cover=[document.getElementById('loading'),document.getElementById('loading-full')],
	info=document.getElementById('description'),
	changeButtons=[document.getElementById('previous'),document.getElementById('next')],
	zoomButtons=[document.getElementById('zoom-in'),document.getElementById('zoom-out')];
var zoomIn=()=>{
		if(zoomed)return ;
		zoomed=true,
		loadImage(imageBig,screenDirection()?images[idnow].url:toMediumSize(images[idnow].url),function(){cover[1].style.visibility='hidden'}),fullcontainer.style.visibility='visible';
	},
	zoomOut=()=>{
		if(!zoomed)return ;
		zoomed=false,
		fullcontainer.style.visibility='hidden';
	},
	changePicture=(d)=>{
//		console.log('changePicture(',d,')');
        if(!imageSmall.complete||!imageBig.complete&&zoomed)return ;
		if(idnow==images.length-1&&d>0)return alert("This is the last picture!");
        if(idnow==0&&d<0)return alert("This is the first picture!");
        cover[0].style.visibility='visible';
        if(zoomed)cover[1].style.visibility='visible';
		loadImage(imageSmall,toMediumSize(images[idnow+=d].url),function(){cover[0].style.visibility='hidden'});
        if(zoomed)loadImage(imageBig,screenDirection()?images[idnow].url:toMediumSize(images[idnow].url),function(){cover[1].style.visibility='hidden'});
        info.innerText=images[idnow].alt;
		if(idnow==images.length-1)changeButtons[1].classList.add('ban');
		else changeButtons[1].classList.remove('ban');
		if(idnow==0)changeButtons[0].classList.add('ban');
        else changeButtons[0].classList.remove('ban');
	}
}
document.addEventListener('keydown',(event)=>{
	switch(event.keyCode){
        case 27:zoomOut();break;
        case 35:idnow=images.length,changePicture(-1);break;
        case 36:idnow=-1,changePicture(1);break;
		case 37:;
		case 38:changePicture(-1);break;
		case 39:;
		case 40:changePicture(1);break;
	}
}
);
var sliderSmall=new Slider(document.getElementById('image-main'));
var sliderBig=new Slider(document.getElementById('image-full'));
sliderSmall.horizonalEndCallback=(d)=>{
	if(d.x<-window.innerWidth*0.15)changePicture(1);
	else if(d.x>window.innerWidth*0.15)changePicture(-1);
}
sliderSmall.init();
sliderBig.horizonalEndCallback=(d)=>{
	if(d.x<-window.innerWidth*0.2)changePicture(1);
	else if(d.x>window.innerWidth*0.2)changePicture(-1);
}
sliderBig.init();