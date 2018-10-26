const BLACK='#000',LYELLOW1='#666666',LYELLOW2='#555555',LGREY='#E8E8E8';
var cnt = 0, flag = false, hideflag = false, Topflag = false, Menuflag=false, nightshift = false;
var a, b, c, last, lineH, fontH, platform;
var Bodys=document.getElementsByTagName("body"),Mains=document.getElementsByTagName("main");
var Body=Bodys[0],Main=Mains[0];
var TopSvg = document.getElementById("to-top-symbol"), TopDiv = document.getElementById("to-top"), TopButton = new Array(),MenuDiv=document.getElementById("menu-button"),MenuSvg=document.getElementById("menu-symbol"),MenuButton=new Array(),ThemeDiv=document.getElementById("theme-button"),ThemeSvg=document.getElementById("theme-symbol"),MenuContainer=document.getElementById('menu-container'),Header=[document.getElementById("header-container"),MenuContainer];
TopButton[0] = TopSvg, TopButton[1] = TopDiv,MenuButton[0]=MenuSvg,MenuButton[1]=MenuDiv;
var Menubox=document.createElement("div"),Menulist=document.createElement("ul"),Menucontext=['home','archive','Friends'],ThemeSvg;
Menubox.className="menu",Menulist.className="menu";
function Draw(obj,picName,ext=''){
    if(obj)obj.src='picture/'+picName+'.'+(ext.length>0?ext:'svg');
}
const Draw_moon=()=>{Draw(ThemeSvg,'theme_dark_sym');};
const Draw_sun=()=>{Draw(ThemeSvg,'theme_light_sym');};
function set_theme(type) {
    if(type=='mobile'){if(Main.classList.contains('pc'))Main.classList.remove('pc');}
    else if(!Main.classList.contains('pc'))Main.classList.add('pc');
}
function CodeHideProcess(){{
    var codes=document.getElementsByTagName("pre");
    var CodeSymbol=document.createElement('span'),CodeSymbolPic=document.createElement('img'),CodeSymbolText=document.createTextNode('click to view code');
    var codes=document.getElementsByTagName("pre");var CodeSymbol=document.createElement('span'),CodeSymbolPic=document.createElement('img'),CodeSymbolText=document.createTextNode('click to view code');CodeSymbolPic.src='picture/code-hidden-sym.svg',CodeSymbol.classList.add('code-hidden'),CodeSymbol.appendChild(CodeSymbolPic),CodeSymbol.appendChild(CodeSymbolText);
    for(var i=0;i<codes.length;i++){
        if(codes[i].classList.contains('in-line'))continue;
        codes[i].style.display="none",codes[i].id='code'+i+'main';
        var now=CodeSymbol.cloneNode(1);
        now.id='code'+i+'sym',now.onclick=showCode;
        codes[i].parentNode.insertBefore(now,codes[i]);
    }
}}
function init(f) {
    a = document.documentElement.scrollTop || document.body.scrollTop,
    b = (document.documentElement.clientHeight || document.body.clientHeight) / 2,
    c = (document.documentElement.clientWidth || document.body.clientWidth),
    lineH = b/16, fontH=b/18;
    Draw(TopSvg,'top_sym');
    Draw(MenuSvg,'menu_sym');
    if(!nightshift)Draw_sun();
    else Draw_moon();
    while(Menulist.hasChildNodes())Menulist.removeChild(Menulist.firstChild);
    for(var i=0;i<3;i++){
        var Menuli=document.createElement("li"),Menuop=document.createElement("a");
        Menuop.style.fontSize=fontH+"px",Menuop.style.lineHeight=lineH+"px";
        var tmp=document.createTextNode(Menucontext[i]);
        Menuop.href=Menucontext[i]+".html",Menuop.appendChild(tmp);
        Menuli.appendChild(Menuop),Menulist.appendChild(Menuli);
    }
    //console.log(lineH);
    Menubox.appendChild(Menulist);MenuContainer.appendChild(Menubox);
    if(!nightshift)Velocity(Body,{backgroundColor:LGREY},{duration:1200,easing:"ease-in-out"});
    else Velocity(Body,{backgroundColor:LYELLOW2},{duration:1200,easing:"ease-in-out"});
    if(b*2>c){
            platform="mobile";
            if(Main.classList.contains('pc'))Main.classList.remove('pc');
            if(!nightshift)Main.style.backgroundColor=LGREY,Velocity(Main,{opacity:1},{duration:"normal",delay:500,easing:"ease-out"});
            else Main.style.backgroundColor=LYELLOW2,Velocity(Main,{opacity:1},{duration:"normal",delay:200,easing:"ease-out"});
    }
    else {
            platform="PC";
            Main.classList.add('pc');
            if(!nightshift)Velocity(Main,{backgroundColor:'#FFFFF0',opacity:1},{duration:"normal",delay:200,easing:"ease-out"});
            else Velocity(Main,{backgroundColor:LYELLOW1,opacity:1},{duration:"normal",delay:200,easing:"ease-out"});
    }
    if(f)CodeHideProcess();
    set_theme(platform);
}
function sleep(d){
    var cur=new Date().getTime(), now = cur;
    while(now - cur <= d)now=new Date().getTime();
    //console.log(cur);
}
function clear(obj,cxt){
    //cxt.clearRect(0,0,obj.width,obj.height);
}
window.onload = init(1);
window.onresize = function(){
    init(0);
    //console.log("+1");
};
//  TopButton.addEventListener("onclick",return_to_top);
if (a > 100) {
    flag = true, Velocity(Header, { opacity: 0.8 }, { duration: "fast" });
    Velocity(TopButton, { opacity: 1 }, { display: "block" }, { duration: "fast" });
}
else Velocity(TopButton, { opacity: 0 }, { display: "none" }, { duration: "fast" });
if (a > b) {
    hideflag = true, Velocity(Header, { opacity: 0 }, { display: "none" }, { duration: "slow" });
}
window.onscroll = function navibar() {
    last=a,
    a = document.documentElement.scrollTop || document.body.scrollTop,
    b = (document.documentElement.clientHeight || document.body.clientHeight) / 2;
    //console.log(cnt++, a, b, last, flag, hideflag);
    if (a > 100 && flag == false) {
        flag = true, Velocity(Header, { opacity: 0.8 }, { duration: "fast" });
        Velocity(TopButton, { opacity: 1 }, { display: "block" }, { duration: "fast", easing: "ease-in" });
        //console.log("showbutton");
    }
    if (a <= 100 && flag == true) {
        flag = false, Velocity(Header, { opacity: 1 }, { duration: "fast" });
        Velocity(TopButton, { opacity: 0 }, { display: "none" }, { duration: "fast", easing: "ease-in" });
        //console.log("hidebutton");
    }
    if (a > b && last < a && hideflag == false && !Menuflag) {
        hideflag = true, Velocity(Header, { opacity: 0 }, { display: "none" }, { duration: "slow" });
    }
    if ((a < b || last-a>b*0.4) && hideflag == true) {
        hideflag = false, Velocity(Header, { opacity: 0.8 }, { display: "block" }, { duration: "slow" });
    }
}
TopDiv.onclick = function return_to_top() {
    Velocity(Body, "scroll", { duration: "slow", easing: "ease-out" });
    //Velocity(TopButton,{display:"none"},{opacity:0},{duration:"fast"});
    //Topflag=true;
}
MenuDiv.onclick = function show_menu() {
    if(!Menuflag)Velocity(MenuButton,{rotateZ:"45deg"},{duration:"fast",easing:"ease-out"}),
        Velocity(MenuContainer,{height:'+10%'},{duration:"fast"});
    else Velocity(MenuButton,"reverse",{duration:"fast",easing:"ease-out"}),
        Velocity(MenuContainer,{height:'-10%'},{duration:"fast"});
    Menuflag=!Menuflag;
}
ThemeDiv.onclick = function change(){
    if(!nightshift){
        if(platform=="PC")clear(ThemeSvg,ThemeSvg),Draw_moon(ThemeSvg.height,ThemeSvg.width,ThemeSvg),Velocity(Body,{ backgroundColor:LYELLOW2},{duration:"normal", easing:"ease-in-out"}),Velocity(Main,{backgroundColor:LYELLOW1,color:"#FFFFFF"},{duration:"normal",easing:"ease-in-out"});
        else clear(ThemeSvg,ThemeSvg),Draw_moon(ThemeSvg.height,ThemeSvg.width,ThemeSvg),Velocity(Body,{ backgroundColor:LYELLOW2},{duration:"normal", easing:"ease-in-out"}),Velocity(Main,{backgroundColor:LYELLOW2,color:"#FFFFFF"},{duration:"normal",easing:"ease-in-out"});
    }
    else {
        if(platform=="PC")clear(ThemeSvg,ThemeSvg),Draw_sun(ThemeSvg.height,ThemeSvg.width,ThemeSvg),Velocity(Body,{backgroundColor:LGREY},{duration:"normal"}),Velocity(Main,{backgroundColor:"#FFFFF0",color:BLACK},{duration:"normal",easing:"ease-in-out"});
        else clear(ThemeSvg,ThemeSvg),Draw_sun(ThemeSvg.height,ThemeSvg.width,ThemeSvg),Velocity(Body,{backgroundColor:LGREY},{duration:"normal"}),Velocity(Main,{backgroundColor:LGREY,color:BLACK},{duration:"normal",easing:"ease-in-out"});
    }
    nightshift=!nightshift;
}
function showCode()
{
    var str=new String(this.id).replace(/sym/g,'main');
    document.getElementById(str).style.display='block',this.style.display='none';
}