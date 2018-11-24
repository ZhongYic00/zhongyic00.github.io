var FrontPage=document.getElementById('front-page'),Sidebar=document.getElementById('sidebar'),HugeTitle=document.getElementsByTagName('h1')[0];
const K1=0.85;
var Last,DocPos,ScreenHeight,SidebarHidden=true;
Sidebar.style.visibility="hidden";
window.onscroll = function navibar() {
    Last=DocPos,
    DocPos = document.documentElement.scrollTop || document.body.scrollTop,
    ScreenHeight = (document.documentElement.clientHeight || document.body.clientHeight);
    //console.log(cnt++, a, b, last, flag, hideflag);
    if(DocPos>ScreenHeight*K1&&SidebarHidden) {
    console.log(DocPos,ScreenHeight,SidebarHidden);
        Velocity(Sidebar,{opacity:1},{visibility:'visible'}),SidebarHidden=false;
    }
    if(DocPos<ScreenHeight*K1&&!SidebarHidden) {
        console.log(DocPos,ScreenHeight,SidebarHidden,"hide");
        SidebarHidden=true,Velocity(Sidebar,{opacity:0},{duration:'fast',visibility:'hidden'});
    }
}
function scrollByTag(tagName)
{
	Velocity(document.getElementsByTagName(tagName)[0],"scroll",{duration:"slow",easing:"ease-out"});
}
