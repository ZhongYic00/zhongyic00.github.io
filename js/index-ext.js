var mainY;
const siderbar=()=>{
    if((document.documentElement.clientHeight||document.body.clientHeight)>(document.documentElement.clientWidth||document.body.clientWidth))return;
    var Sidebar=document.getElementById('sidebar'),
        scrollY=Math.max(window.pageYOffset,document.documentElement.scrollTop,document.body.scrollTop);
    if(scrollY>mainY)Sidebar.classList.add('fix');
    else Sidebar.classList.remove('fix');
};
const scrollByTag=(tagName)=>{Velocity(document.getElementsByTagName(tagName)[0],"scroll",{duration:"slow",easing:"ease-out"});}
    var pageLinks=document.getElementsByTagName('main')[0].getElementsByTagName('div');
const f=(url)=>{window.location.assign(url);};
    for(var i=0;i<pageLinks.length;i++){
        pageLinks[i].addEventListener('click',function(){
            f('posts/'+this.dataset.url);
        });
    };
const ff=()=>{
    let currentHeight = (document.documentElement.clientHeight || document.body.clientHeight),
        currentWidth = (document.documentElement.clientWidth || document.body.clientWidth);
    if(currentHeight<currentWidth)document.getElementsByTagName('nav')[0].classList.add('pc'),document.getElementById('sidebar').style.visibility='visible';
    else document.getElementsByTagName('nav')[0].classList.remove('pc'),document.getElementById('sidebar').style.visibility='hidden';
    siderbar();
}
ff();
window.addEventListener('resize',ff);
var sider=window.addEventListener('scroll',siderbar);
{
    var cur=document.getElementsByTagName('main')[0];
    mainY=0;
    while(cur!==null){
        mainY+=cur.offsetTop,cur=cur.offsetParent;
    }
}