var cnt = 0, flag = false, hideflag = false, Topflag = false, Menuflag=false, nightshift = false;
var a, b, c, last, lineH, fontH, platform;
var Bodys=document.getElementsByTagName("body"),Mains=document.getElementsByTagName("main");
var Body=Bodys[0],Main=Mains[0];
var TopCanvas = document.getElementById("to-top-symbol"), TopDiv = document.getElementById("to-top"), TopButton = new Array(),MenuDiv=document.getElementById("menu-button"),MenuCanvas=document.getElementById("menu-symbol"),MenuButton=new Array(),Header=document.getElementById("header"),HeaderContext=document.getElementById("header-context"),ThemeDiv=document.getElementById("theme-button"),ThemeCanvas=document.getElementById("theme-symbol");
TopButton[0] = TopCanvas, TopButton[1] = TopDiv,MenuButton[0]=MenuCanvas,MenuButton[1]=MenuDiv;
var Menubox=document.createElement("div"),Menulist=document.createElement("ul"),Menucontext=new Array(),TPcxt,TMcxt;
Menubox.className="menu",Menulist.className="menu",Menucontext[0]="home",Menucontext[1]="archive",Menucontext[2]="Friends";
function Draw_moon(h,w,obj){
    obj.beginPath();
    obj.arc(w*0.3,h*0.5,h*0.4,0,2*Math.PI,false);
    //obj.arcTo(w*0.9,h*0.5,w*0.3,h*0.1,h*0.5);
    obj.closePath();
    obj.lineWidth=1;
    obj.strokeStyle= 'rgb(80,80,100)';
    obj.stroke();
    obj.fillStyle='rgb(100,100,150)';
    obj.fill();
    obj.beginPath();
    obj.arc(w*-0.2,h*0.5,h*0.6,0,2*Math.PI,false);
    obj.closePath();
    obj.fillStyle='rgb(255,255,255)';
    obj.fill();
}
function Draw_sun(h,w,obj){
    obj.beginPath();
    obj.arc(w*0.5,h*0.5,h*0.4,0,2*Math.PI,false);
    //obj.arcTo(w*0.9,h*0.5,w*0.3,h*0.1,h*0.5);
    obj.closePath();
    obj.lineWidth=1;
    obj.strokeStyle= 'rgb(255,255,0)';
    obj.stroke();
    obj.fillStyle='rgb(255,255,0)';
    obj.fill();
}
function set_theme(type) {
    console.log(Main.style.marginTop);
    if(type=="mobile"){
        Main.style.marginTop=0.12*b+"px";
        Main.style.boxShadow="",Main.style.borderRadius="";
        var mgW=Math.floor(0.02*c);
        Main.style.width=c-2*mgW+"px",Main.style.marginLeft=Main.style.marginRight=mgW+"px",Main.style.paddingLeft=Main.style.paddingRight=0;
        var pres=document.getElementsByTagName("pre");
        for(var i=0;i<pres.length;i++)
            pres[i].style.width=c-2*mgW-10+"px",pres[i].style.marginLeft=pres[i].style.marginRight=0;
        var codes=document.getElementsByTagName("code");
        for(var i=0;i<codes.length;i++)codes[i].classList.add("mobile");
        console.log(c-2*mgW,mgW,c);
    }
    else {
        //var now1=new Date();
        //console.log(now1.getTime());
        Main.style.marginTop=0.16*b+"px";
        Main.style.boxShadow="0 0 1px 1px rgba(0,0,0,0.2)";Main.style.borderRadius="3px";
        var mgW=Math.floor(0.2*c);
        Main.style.width=c-2*mgW-0.8*mgW+"px",Main.style.marginLeft=Main.style.marginRight=mgW+"px",Main.style.paddingLeft=Main.style.paddingRight=mgW*0.4+"px",Main.style.paddingTop=0.1*mgW+"px",Main.style.marginBottom=mgW*0.5+"px";
        var pres=document.getElementsByTagName("pre");
        for(var i=0;i<pres.length;i++)
            pres[i].style.width=c-3*mgW+"px",pres[i].style.marginLeft=pres[i].style.marginRight=mgW*0.2+"px";
        var codes=document.getElementsByTagName("code");
        for(var i=0;i<codes.length;i++)codes[i].classList.remove("mobile");
        //Velocity(Main,{backgroundColor:'#FFFFF0'},{duration:"fast"});
        //var now2=new Date();
        //console.log(now2.getTime());
    }
}
function init(f) {
    a = document.documentElement.scrollTop || document.body.scrollTop,
    b = (document.documentElement.clientHeight || document.body.clientHeight) / 2,
    c = (document.documentElement.clientWidth || document.body.clientWidth),
    lineH = b/16, fontH=b/18;
    if(HeaderContext==null)return;
    HeaderContext.style.marginRight=HeaderContext.style.marginLeft=b/8+"px",TopCanvas.height = TopCanvas.width = b / 10, ThemeCanvas.height = ThemeCanvas.width = MenuCanvas.height = MenuCanvas.width = b*0.12;
    var HeaderTitle;
    for(var i=0;i<HeaderContext.childNodes.length;i++){
        if(HeaderContext.childNodes[i].nodeName=="H1"){
            HeaderTitle=HeaderContext.childNodes[i];
            break;
        }
    }
    HeaderTitle.style.lineHeight=b*0.03+"px",HeaderTitle.style.fontSize=b*0.08+"px",Header.style.height=0.12*b+"px";
    TPcxt = TopCanvas.getContext("2d"), TMcxt = ThemeCanvas.getContext("2d");
    TPcxt.beginPath();
    TPcxt.moveTo(b / 10 * 0.5, b / 10 * 0.2);
    TPcxt.lineTo(b / 10 * 0.8, b / 10 * 0.5);
    TPcxt.lineTo(b / 10 * 0.6, b / 10 * 0.5);
    TPcxt.lineTo(b / 10 * 0.6, b / 10 * 0.8);
    TPcxt.lineTo(b / 10 * 0.4, b / 10 * 0.8);
    TPcxt.lineTo(b / 10 * 0.4, b / 10 * 0.5);
    TPcxt.lineTo(b / 10 * 0.2, b / 10 * 0.5);
    TPcxt.closePath();
    TPcxt.lineWidth = 1;
    TPcxt.strokeStyle = 'rgb(80,80,100)';
    TPcxt.stroke();
    TPcxt.fillStyle = 'rgb(200,200,230)';
    TPcxt.fill();
    if(!nightshift)Draw_sun(ThemeCanvas.height,ThemeCanvas.width,TMcxt);
    else Draw_moon(ThemeCanvas.height,ThemeCanvas.width,TMcxt);
    var cxt=MenuCanvas.getContext("2d");
    for(var i=1;i<=3;i++)
    {
        cxt.beginPath();
        cxt.moveTo(b/8*0.2,b/8*(i*0.25));
        cxt.lineTo(b/8*0.8,b/8*(i*0.25));
        //console.log(b/8*0.9,b/8*(i*0.25));
        cxt.closePath();
        cxt.strokeStyle="rgb(26,26,64)";
        cxt.lineWidth=2;
        cxt.stroke();
    }
    while(Menulist.hasChildNodes())Menulist.removeChild(Menulist.firstChild);
    Velocity(Menubox,{translateY:-b*0.12},{duration:0});
    for(var i=0;i<3;i++){
        var Menuli=document.createElement("li"),Menuop=document.createElement("a");
        Menuop.style.fontSize=fontH+"px",Menuop.style.lineHeight=lineH+"px";
        var tmp=document.createTextNode(Menucontext[i]);
        Menuop.href=Menucontext[i]+".html",Menuop.appendChild(tmp);
        Menuli.appendChild(Menuop),Menulist.appendChild(Menuli);
    }
    //console.log(lineH);
    Menubox.appendChild(Menulist);
    if(!nightshift)Velocity(Body,{backgroundColor:'#E8E8E8'},{duration:1200,easing:"ease-in-out"});
    else Velocity(Body,{backgroundColor:'#555555'},{duration:1200,easing:"ease-in-out"});
    if(b*2>c){
            platform="mobile";
            if(!nightshift)Main.style.backgroundColor='#E8E8E8',Velocity(Main,{opacity:1},{duration:"normal",delay:500,easing:"ease-out"});
            else Main.style.backgroundColor='#555555',Velocity(Main,{opacity:1},{duration:"normal",delay:200,easing:"ease-out"});
    }
    else {
            platform="PC";
            if(!nightshift)Velocity(Main,{backgroundColor:'#FFFFF0',opacity:1},{duration:"normal",delay:200,easing:"ease-out"});
            else Velocity(Main,{backgroundColor:'#666666',opacity:1},{duration:"normal",delay:200,easing:"ease-out"});
    }
    if(f){
        var codes=document.getElementsByTagName("pre");
        var CodeSymbol=document.createElement('div'),CodeSymbolPic=document.createElement('img'),CodeSymbolText=document.createTextNode('click to view code');
        CodeSymbolPic.src='picture/code-hidden-sym.svg',CodeSymbolPic.style.height=b/20+'px',CodeSymbol.classList.add('code-hidden'),CodeSymbol.appendChild(CodeSymbolPic),CodeSymbol.appendChild(CodeSymbolText);
        for(var i=0;i<codes.length;i++){
            if(codes[i].classList.contains('in-line'))continue;
            codes[i].style.display="none",codes[i].id='code'+i+'main';
            var now=CodeSymbol.cloneNode(1);
            now.id='code'+i+'sym',now.onclick=showCode;
            codes[i].parentNode.insertBefore(now,codes[i]);
        }
    }
    set_theme(platform);
}
function sleep(d){
    var cur=new Date().getTime(), now = cur;
    while(now - cur <= d)now=new Date().getTime();
    //console.log(cur);
}
function clear(obj,cxt){
    cxt.clearRect(0,0,obj.width,obj.height);
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
        Velocity(Header,{height:(0.12*b+3.5*lineH)+"px"},{duration:"fast",begin:function(){HeaderContext.appendChild(Menubox);Velocity(Menubox,{opacity:1,translateY:0},{duration:"fast",easing:"ease-out"});}});
    else Velocity(MenuButton,"reverse",{duration:"fast",easing:"ease-out"}),
        Velocity(Header,{height:0.12*b},{duration:"fast",begin:function(){Velocity(Menubox,{opacity:0,translateY:-b*0.12},{duration:"fast"});},complete:function(){HeaderContext.removeChild(Menubox);}});
    Menuflag=!Menuflag;
}
ThemeDiv.onclick = function change(){
    if(!nightshift){
        if(platform=="PC")clear(ThemeCanvas,TMcxt),Draw_moon(ThemeCanvas.height,ThemeCanvas.width,TMcxt),Velocity(Body,{ backgroundColor:'#555555'},{duration:"normal", easing:"ease-in-out"}),Velocity(Main,{backgroundColor:'#666666',color:"#FFFFFF"},{duration:"normal",easing:"ease-in-out"});
        else clear(ThemeCanvas,TMcxt),Draw_moon(ThemeCanvas.height,ThemeCanvas.width,TMcxt),Velocity(Body,{ backgroundColor:'#555555'},{duration:"normal", easing:"ease-in-out"}),Velocity(Main,{backgroundColor:'#555555',color:"#FFFFFF"},{duration:"normal",easing:"ease-in-out"});
    }
    else {
        if(platform=="PC")clear(ThemeCanvas,TMcxt),Draw_sun(ThemeCanvas.height,ThemeCanvas.width,TMcxt),Velocity(Body,{backgroundColor:'#E8E8E8'},{duration:"normal"}),Velocity(Main,{backgroundColor:"#FFFFF0",color:'#000000'},{duration:"normal",easing:"ease-in-out"});
        else clear(ThemeCanvas,TMcxt),Draw_sun(ThemeCanvas.height,ThemeCanvas.width,TMcxt),Velocity(Body,{backgroundColor:'#E8E8E8'},{duration:"normal"}),Velocity(Main,{backgroundColor:'#E8E8E8',color:'#000000'},{duration:"normal",easing:"ease-in-out"});
    }
    nightshift=!nightshift;
}
function showCode()
{
    var str=new String(this.id).replace(/sym/g,'main');
    console.log(str);
    document.getElementById(str).style.display='block',this.style.display='none';
}