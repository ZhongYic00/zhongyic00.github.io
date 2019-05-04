var IndexNodeTemplate=document.createElement('div');
IndexNodeTemplate.classList.add('article-index-node');
function getDocumentStructure()
{
    const Header=document.getElementById('header-container');
    var Contents=new Array();
    for(var i=1;i<=6;i++)
    {
        var tmp=document.getElementsByTagName('h'+i.toString());
        for(var j=0;j<tmp.length;j++)
            if(tmp[j].compareDocumentPosition(Header)==2)Contents.push(tmp[j]);
    }
    Contents.sort((a,b)=>{return a.compareDocumentPosition(b)==2?1:-1;});
    return Contents;
}
function newTitleNode(ori)
{
    var rt=document.createElement(ori.nodeName);
    rt.textContent=ori.textContent;
    rt.classList.add('article-index-text');
    rt.onclick=function(){
        Velocity(ori,"scroll",{duration:'fast'});
    }
    return rt;
}
function generateIndex(titles,st,ed)
{
    ed=ed||titles.length;
    var Nodenow=IndexNodeTemplate.cloneNode(0),i;
    for(i=st;i<titles.length&&i<ed;i++)
    {
        if(titles[i].nodeName==titles[st].nodeName||(i>0&&titles[i].nodeName<titles[i-1].nodeName))
        {
            Nodenow.appendChild(newTitleNode(titles[i]));
        }
        else
        {
            var now=i;
            while(i<titles.length&&titles[i].nodeName>=titles[now].nodeName)i++;
            Nodenow.appendChild(generateIndex(titles,now,i));//rubbish O(n^2)!!!
            i--;
        }
    }
    return Nodenow;
}
export function articleIndex(){
    return generateIndex(getDocumentStructure(),0);
}