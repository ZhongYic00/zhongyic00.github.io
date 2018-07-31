var cnt = 0, flag = false, hideflag = false, Topflag = false, Menuflag=false;
var a, b;
var TopCanvas = document.getElementById("to-top-symbol"), TopDiv = document.getElementById("to-top"), TopButton = new Array(),MenuDiv=document.getElementById("menu-button"),MenuCanvas=document.getElementById("menu-symbol"),MenuButton=new Array(),Header=document.getElementById("header"),HeaderContext=document.getElementById("header-context");
TopButton[0] = TopCanvas, TopButton[1] = TopDiv,MenuButton[0]=MenuCanvas,MenuButton[1]=MenuDiv;
function Draw_button() {
    a = document.documentElement.scrollTop || document.body.scrollTop,
    b = (document.documentElement.clientHeight || document.body.clientHeight) / 2;
    HeaderContext.style.paddingRight=HeaderContext.style.paddingLeft=b/8+"px",TopCanvas.height = TopCanvas.width = b / 10,MenuCanvas.height=MenuCanvas.width=b/8;
    var TPcxt = TopCanvas.getContext("2d");
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
}
window.onload = Draw_button(), window.onresize = Draw_button();
//  TopButton.addEventListener("onclick",return_to_top);
if (a > 100) {
    flag = true, Velocity(Header, { opacity: 0.8 }, { duration: "fast" });
    Velocity(TopButton, { opacity: 1 }, { display: "block" }, { duration: "fast" });
}
else Velocity(TopButton, { opacity: 0 }, { display: "none" }, { duration: "fast" });
if (a > b) {
    hideflag = true, Velocity(Header, { opacity: 0 }, { display: "none" }, { duration: "slow" });
}
var Menubox=document.createElement("div"),Menulist=document.createElement("ul"),Menucontext=new Array();
Menubox.className="menu",Menulist.className="menu",Menucontext[0]="home",Menucontext[1]="archive",Menucontext[2]="friends";
for(var i=0;i<3;i++){
    var Menuli=document.createElement("li"),Menuop=document.createElement("a");
    var tmp=document.createTextNode(Menucontext[i]);
    Menuop.href=Menucontext[i]+".html",Menuop.appendChild(tmp);
    Menuli.appendChild(Menuop),Menulist.appendChild(Menuli);
}
Menubox.appendChild(Menulist);
window.onscroll = function navibar() {
    var a = document.documentElement.scrollTop || document.body.scrollTop,
        b = (document.documentElement.clientHeight || document.body.clientHeight) / 2;
    //console.log(cnt++, a, b, flag, hideflag);
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
    if (a > b && hideflag == false) {
        hideflag = true, Velocity(Header, { opacity: 0 }, { display: "none" }, { duration: "slow" });
    }
    if (a < b && hideflag == true) {
        hideflag = false, Velocity(Header, { opacity: 0.8 }, { display: "block" }, { duration: "slow" });
    }
    setTimeout(function () {}, 100);
}
TopDiv.onclick = function return_to_top() {
    Velocity(document.body, "scroll", { duration: "slow", easing: "ease-in-out" });
    //Velocity(TopButton,{display:"none"},{opacity:0},{duration:"fast"});
    //Topflag=true;
}
MenuDiv.onclick = function show_menu() {
    if(!Menuflag)Velocity(MenuButton,{rotateZ:"45deg"},{duration:"normal",easing:"ease-out"}),
        Velocity(Menulist,{opacity:1},{duration:"fast",begin:function(){Velocity(Header,{height:"20%"},{duration:"fast"});HeaderContext.appendChild(Menubox);}});
    else Velocity(MenuButton,{rotateZ:"0deg"},{duration:"fast",easing:"ease-out"}),
        Velocity(Menulist,"reverse",{begin:function(){Velocity(Header,"reverse");},complete:function(){HeaderContext.removeChild(Menubox);}});
    Menuflag=!Menuflag;
}