const K1=0.75;
var Last,DocPos,ScreenHeight,SidebarHidden=true;
const navibar=()=>{
    let Sidebar=document.getElementById('sidebar');
    let currentHeight = (document.documentElement.clientHeight || document.body.clientHeight),
        currentWidth = (document.documentElement.clientWidth || document.body.clientWidth);
    if(currentHeight>currentWidth)return;
    Last=DocPos,
    DocPos = document.documentElement.scrollTop || document.body.scrollTop,
    ScreenHeight = (document.documentElement.clientHeight || document.body.clientHeight);
    if(DocPos>ScreenHeight*K1)
        Sidebar.style.visibility='visible';
    if(DocPos<ScreenHeight*K1)
        Sidebar.style.visibility='hidden';
};
const scrollByTag=(tagName)=>{Velocity(document.getElementsByTagName(tagName)[0],"scroll",{duration:"slow",easing:"ease-out"});}
    var pageLinks=document.getElementsByTagName('main')[0].getElementsByTagName('div');
const f=(url)=>{window.location.assign(url);};
    for(var i=0;i<pageLinks.length;i++){
        pageLinks[i].addEventListener('click',function(){
            f(this.dataset.url);
        });
    };
const ff=()=>{
    let currentHeight = (document.documentElement.clientHeight || document.body.clientHeight),
        currentWidth = (document.documentElement.clientWidth || document.body.clientWidth);
    if(currentHeight<currentWidth)document.getElementsByTagName('nav')[0].classList.add('pc'),document.getElementById('sidebar').style.visibility='visible';
    else document.getElementsByTagName('nav')[0].classList.remove('pc'),document.getElementById('sidebar').style.visibility='hidden';
    navibar();
}
ff();
window.addEventListener('resize',ff);
window.addEventListener('scroll',navibar);