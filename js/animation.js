const BLACK='#000',LYELLOW1='#3c3c3c',LYELLOW2='#2c2c2c',LGREY='#E8E8E8';
var cnt = 0, flag = false, hideflag = false, Topflag = false, Menuflag=false, nightshift = false;
var a, currentHeight, currentWidth, last, lineH, fontH,codeHidden=false,lastH,lastW,firstInit=true;
var Bodys=document.getElementsByTagName("body"),Mains=document.getElementsByTagName("main");
var Body=Bodys[0],Main=Mains[0];
var TopSvg = document.getElementById("to-top-symbol"), TopDiv = document.getElementById("to-top"), TopButton = new Array(),MenuDiv=document.getElementById("menu-button"),MenuSvg=document.getElementById("menu-symbol"),MenuButton=new Array(),ThemeDiv=document.getElementById("theme-button"),ThemeSvg=document.getElementById("theme-symbol"),MenuContainer=document.getElementById('menu-container'),SettingDiv=document.getElementById('setting-button'),settingIframe=document.getElementById('setting-iframe'),Header=[document.getElementById("header-container"),MenuContainer];
TopButton[0] = TopSvg, TopButton[1] = TopDiv,MenuButton[0]=MenuSvg,MenuButton[1]=MenuDiv;
var Menubox=document.createElement("div"),Menulist=document.createElement("ul"),Menucontext=['home','archive','Friends'],ThemeSvg;
Menubox.className="menu",Menulist.className="menu";
function Draw(obj,picName,ext){
    ext=ext||'';
    if(obj)obj.src='picture/'+picName+'.'+(ext.length>0?ext:'svg');
}
const Draw_moon=()=>{Draw(ThemeSvg,'theme_dark_sym');};
const Draw_sun=()=>{Draw(ThemeSvg,'theme_light_sym');};
const getPlatform=()=>{return getCookie('ZhYicPlatform');}
const SetPlatform=(PlatformName)=>{setCookie('ZhYicPlatform',PlatformName);}
function set_theme(type) {
    if(getPlatform()=='mobile'){if(Main.classList.contains('pc'))Main.classList.remove('pc');}
    else if(!Main.classList.contains('pc'))Main.classList.add('pc');
}
const ClassAttach=(ori,nw,type)=>{
    for(var a=document.getElementsByClassName(ori),i=0;i<a.length;i++)
        if(type==-1)a[i].classList.remove(nw);
        else a[i].classList.add(nw);
}
function CodeHideProcess(){
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
}
function DfnHideProcess(){
	
}
function sleep(d){
    var cur=new Date().getTime(), now = cur;
    while(now - cur <= d)now=new Date().getTime();
    //console.log(cur);
}
function clear(obj,cxt){
    //cxt.clearRect(0,0,obj.width,obj.height);
}
//  TopButton.addEventListener("onclick",return_to_top);
if (a > 100) {
    flag = true, Velocity(Header, { opacity: 0.8 }, { duration: "fast" });
    Velocity(TopButton, { opacity: 1 }, { display: "block" }, { duration: "fast" });
}
else Velocity(TopButton, { opacity: 0 }, { display: "none" }, { duration: "fast" });
if (a > currentHeight) {
    hideflag = true, Velocity(Header, { opacity: 0 }, { display: "none" }, { duration: "slow" });
}
window.onscroll = function navibar() {
    last=a,
    a = document.documentElement.scrollTop || document.body.scrollTop,
    currentHeight = (document.documentElement.clientHeight || document.body.clientHeight) / 2;
    //console.log(cnt++, a, currentHeight, last, flag, hideflag);
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
    if (a > currentHeight && last < a && hideflag == false && !Menuflag) {
        hideflag = true, Velocity(Header, { opacity: 0 }, { display: "none" }, { duration: "slow" });
    }
    if ((a < currentHeight || last-a>currentHeight*0.4) && hideflag == true) {
        hideflag = false, Velocity(Header, { opacity: 0.8 }, { display: "block" }, { duration: "slow" });
    }
}
TopDiv.onclick = function return_to_top() {
    Velocity(Body, "scroll", { duration: "slow", easing: "ease-out" });
    //Velocity(TopButton,{display:"none"},{opacity:0},{duration:"fast"});
    //Topflag=true;
}
!MenuDiv?0:MenuDiv.onclick = function show_menu() {
    if(!Menuflag)Velocity(MenuButton,{rotateZ:"45deg"},{duration:"fast",easing:"ease-out"}),
        Velocity(MenuContainer,{height:'6rem'},{duration:"fast"});
    else Velocity(MenuButton,"reverse",{duration:"fast",easing:"ease-out"}),
        Velocity(MenuContainer,{height:'0rem'},{duration:"fast"});
    Menuflag=!Menuflag;
}
var changeToLighttheme=()=>{
    Draw_sun();
    if(getPlatform()=="PC")Velocity(Body,{backgroundColor:LGREY},{duration:"normal"}),Velocity(Main,{backgroundColor:"#FFFFF0",color:BLACK},{duration:"normal",easing:"ease-in-out"});
    else Velocity(Body,{backgroundColor:LGREY},{duration:"normal"}),Velocity(Main,{backgroundColor:LGREY,color:BLACK},{duration:"normal",easing:"ease-in-out"});
    ClassAttach('code-hidden','code-hidden-dark',-1);
    ClassAttach('hljs','code-dark',-1);
    for(var a=document.getElementsByTagName('a'),i=0;i<a.length;i++)a[i].classList.remove('a-lighter');
}
var changeToDarktheme=()=>{
    Draw_moon();
    if(getPlatform()=="PC")Velocity(Body,{ backgroundColor:LYELLOW2},{duration:"normal", easing:"ease-in-out"}),Velocity(Main,{backgroundColor:LYELLOW1,color:"#FFFFFF"},{duration:"normal",easing:"ease-in-out"});
    else Velocity(Body,{ backgroundColor:LYELLOW2},{duration:"normal", easing:"ease-in-out"}),Velocity(Main,{backgroundColor:LYELLOW2,color:"#FFFFFF"},{duration:"normal",easing:"ease-in-out"});
    ClassAttach('code-hidden','code-hidden-dark',1);
    ClassAttach('hljs','code-dark',1);
    for(var a=document.getElementsByTagName('a'),i=0;i<a.length;i++)a[i].classList.add('a-lighter');
}
const setDarktheme=()=>{
    //ClassAttach('body','darkInit',1);
    //ClassAttach('main','darkInit',1);
    Body.style.background=LYELLOW2;
    Main.style.background=LYELLOW1,Main.style.color='#FFFFFF';
    Velocity(Body,{ backgroundColor:LYELLOW2},{duration:"normal", easing:"ease-in-out"}),Velocity(Main,{backgroundColor:LYELLOW1,color:'#FFFFFF'},{duration:"normal",easing:"ease-in-out"});
    ClassAttach('code-hidden','code-hidden-dark',1);
    ClassAttach('hljs','code-dark',1);
    for(var a=document.getElementsByTagName('a'),i=0;i<a.length;i++)a[i].classList.add('a-lighter');
    Draw_moon();
    //ClassAttach('body','darkInit',-1);
    //ClassAttach('main','darkInit',-1);
}
function init() {
    //alert('init start');
    currentHeight = (document.documentElement.clientHeight || document.body.clientHeight) / 2,
    currentWidth = (document.documentElement.clientWidth || document.body.clientWidth);
    lineH = currentHeight/16, fontH=currentHeight/18;
    Draw(TopSvg,'top_sym');
    if(MenuDiv&&firstInit) {
        firstInit=false;
        Draw(MenuSvg,'menu_sym');
        while(Menulist.hasChildNodes())Menulist.removeChild(Menulist.firstChild);
        for(var i=0;i<3;i++){
            var Menuli=document.createElement("li"),Menuop=document.createElement("a");
            //Menuop.style.fontSize=fontH+"px",Menuop.style.lineHeight=lineH+"px";
            var tmp=document.createTextNode(Menucontext[i]);
            Menuop.href=Menucontext[i]+".html",Menuop.appendChild(tmp);
            Menuli.appendChild(Menuop),Menulist.appendChild(Menuli);
        }
        //console.log(lineH);
        Menubox.appendChild(Menulist);MenuContainer.appendChild(Menubox);
    }
    //if(!nightshift)Velocity(Body,{backgroundColor:LGREY},{duration:1200,easing:"ease-in-out"});
    //else Velocity(Body,{backgroundColor:LYELLOW2},{duration:1200,easing:"ease-in-out"});
    if(currentHeight*2>currentWidth) {
            SetPlatform('mobile');
            if(Main.classList.contains('pc'))Main.classList.remove('pc');
            if(!nightshift)Main.style.backgroundColor=LGREY,Velocity(Main,{opacity:1},{duration:"normal",delay:500,easing:"ease-out"});
            else Main.style.backgroundColor=LYELLOW1,Velocity(Main,{opacity:1},{duration:"normal",delay:200,easing:"ease-out"});
    }
    else {
            SetPlatform('PC');
            Main.classList.add('pc');
    }
    console.log(getPlatform());
    if(!codeHidden)CodeHideProcess(),DfnHideProcess(),codeHidden=true;
    set_theme(getPlatform());
    if(getPlatform()=='mobile'&&document.getElementById('article-index'))
        Velocity(document.getElementById('article-index'),{opacity:0},{display:'none'});
    else Velocity(document.getElementById('article-index'),{opacity:1},{display:'block'});
    //alert('init complete');
}
!ThemeDiv?0:ThemeDiv.onclick = function change(){
    if(!nightshift)changeToDarktheme();
    else changeToLighttheme();
    nightshift=!nightshift;
    setCookie('ZhYicTheme',nightshift?'night':'day',0.1);
}
!SettingDiv?0:SettingDiv.onclick = function jumpToSetting(){
    console.log('clicked');
    if(!settingIframe)return;
    if(settingIframe.style.display!='block')settingIframe.style.display='block';
    else settingIframe.style.display='none';
}
function showCode()
{
    var str=new String(this.id).replace(/sym/g,'main');
    document.getElementById(str).style.display='block',this.style.display='none';
}
function main(){
    //cookie operation need loading.js
    currentHeight = (document.documentElement.clientHeight || document.body.clientHeight) / 2,
    currentWidth = (document.documentElement.clientWidth || document.body.clientWidth);
    if(currentHeight!=lastH||currentWidth!=lastW)
    {
        lastH=currentHeight,lastW=currentWidth;
    }
    else return ;
    //alert('start rendering');
    getCookie('ZhYicTheme');
    if(getCookie('ZhYicTheme')=='night')nightshift=true;
    else if(!getCookie('ZhYicTheme').length){
        var now=new Date();
        if(now.getHours()>17||now.getHours()<5)nightshift=true;
        else nightshift=false;
        setCookie('ZhYicTheme',nightshift?'night':'day',0.1);
        //alert('cookie set');
    }
    init();
    if(nightshift)setDarktheme();
    else changeToLighttheme();
}
window.onload=main();
window.onresize = function(){
    init();
    //console.log("+1");
};