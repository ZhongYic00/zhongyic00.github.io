var imglistAjax=new XMLHttpRequest(),imgbinAjax=new XMLHttpRequest(),imgbox=document.getElementById('image-box'),imgdisplay=document.getElementById('image-main'),imglist=new Array(),prevbutton=document.getElementById('previous'),nextbutton=document.getElementById('next'),imgloading=document.getElementById('loading'),imageinfo=document.getElementById('description'),zoominbutton=document.getElementById('zoom-in'),zoomoutbutton=document.getElementById('zoom-out'),fullscreenbox=document.getElementById('fullscreen-box'),fullscreendisplay=document.getElementById('fullscreen-main');
var nowdisplayed=-1,fullscreenstate=0;
imglistAjax.open("get","/resources/json/gallery.json",true);
imglistAjax.send();
const mediumSize=(url)=>{
    return String(url).replace('jpg','md.jpg');
}
const ajaxLoadImage=(obj,url,callback)=>{
    imgbinAjax.open("post",url,true);
    imgbinAjax.setRequestHeader("Content-type","image/jpeg");
    imgbinAjax.responseType='blob';
    imgbinAjax.send();
    imgbinAjax.onreadystatechange=()=>{
        if(imgbinAjax.readyState==4&&imgbinAjax.status==200){
            obj.src=window.URL.createObjectURL(imgbinAjax.response);
            callback();
        }
        else{
            obj.src=url;
            if(callback)obj.onload=callback();
        }
    }
}
const imageLoad=(image,partly)=>{
    if(fullscreenstate) {
        ajaxLoadImage(fullscreendisplay,image.url);
    }
    if(partly)return;
    imgloading.style.opacity=1;
    imgdisplay.style.opacity=0;
    ajaxLoadImage(
        imgdisplay,mediumSize(imglist[nowdisplayed].url),()=>{
            setTimeout(()=>{imgloading.style.opacity=0,imgdisplay.style.opacity=1;},500);
        }
    );
    imageinfo.textContent=imglist[nowdisplayed].alt;
}
const displayChange=(direction)=>{
    //console.log(nowdisplayed+direction,imglist.length);
    if(nowdisplayed+direction<imglist.length&&nowdisplayed+direction>=0){
        nowdisplayed+=direction,setCookie('ZhYicImagedisplayed',nowdisplayed);
        if(nowdisplayed==imglist.length-1)
            nextbutton.style.cursor='not-allowed';
        else if(nowdisplayed==0)
            prevbutton.style.cursor='not-allowed';
        else nextbutton.style.cursor=prevbutton.style.cursor='pointer';
    }
    imageLoad(imglist[nowdisplayed]);
}
const fullscreenChange=()=>{
    fullscreenstate^=1;
    if(fullscreenstate)
        imageLoad(imglist[nowdisplayed],true),fullscreenbox.style.visibility='visible';
    else
        fullscreenbox.style.visibility='hidden';
}
imglistAjax.onreadystatechange=function()
{
    if(imglistAjax.readyState==4){
        var jsontmp=JSON.parse(imglistAjax.responseText);
        //console.log(jsontmp);
        for(var i=0;i<jsontmp.pictures.length;i++)
            imglist[i]=jsontmp.pictures[i];
        imageLoad(imglist[nowdisplayed=(parseInt(getCookie('ZhYicImagedisplayed')||0))]);
        if(nowdisplayed==0)prevbutton.style.cursor='not-allowed';
        else if(nowdisplayed==imglist.length-1)nextbutton.style.cursor="not-allowed";
        //console.log(getCookie('ZhYicImagedisplayed')||0);
    }
}
nextbutton.addEventListener('click',()=>{displayChange(1)});
prevbutton.addEventListener('click',()=>{displayChange(-1)});
zoominbutton.addEventListener('click',()=>{fullscreenChange();})
zoomoutbutton.addEventListener('click',()=>{fullscreenChange();})
document.addEventListener('keydown',(event)=>{
    switch(event.keyCode){
        case 27:fullscreenChange();break;
        case 37:;
        case 38:displayChange(-1);break;
        case 39:;
        case 40:displayChange(1);break;
    }
}
);