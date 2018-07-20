function background_load(colorstart,colorend)
{
    var color=new Array(),steps=50;//设置渐变步数
    for(var i=1;i<=steps;i++)
        color[i]=new Array();
    color[0]=colorstart,color[steps]=colorend;//初始颜色值
    for(var i=1;i<steps;i++)
    {
        for(var j=0;j<3;j++)
        color[i][j]=0|(color[steps][j]-color[0][j])/(steps)*i+color[0][j];//与0后自动转换为整数
    }
    var timecnt=0;
    var repeat=setInterval(
        function(){
            var colornow="#"+color[timecnt][0].toString(16)+color[timecnt][1].toString(16)+color[timecnt][2].toString(16);
            //alert(colornow);
            document.body.style.backgroundColor=colornow;
            timecnt++;
            if(timecnt>steps)clearInterval(repeat);
        },
        1000/steps|0//转为整数？
    );
}
function jump(wait,type,url)
{
    setTimeout(
        function(){
        //alert(url);
        if(type=="new")window.open=url;
        else if(type=="local")window.location.href=url;
        else window.location.href=url;
        },wait
    );
}
window.onscroll=function return_top_tag()
{
    var h=document.documentElement.scrollTop||document.body.scrollTop,windowh=screen.height;
    if(h>=windowh)document.getElementById("TOP").display="block";
    else document.getElementById("TOP").display="none";
}