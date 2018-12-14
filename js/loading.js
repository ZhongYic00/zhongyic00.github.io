function setCookie(cname,cvalue)
{
  var d = new Date();
  //console.log(d.getTime()+(exdays*24*60*60*1000));
  var nxt=d.getTime()+24*3600000*30;
  d.setTime(nxt);
  var expires = "expires="+d.toUTCString();
  var str = cname + "=" + cvalue + "; " + expires + ";path=/;";
  document.cookie=str;
}
function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  console.log(document.cookie);
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}
function chk(cname){
    return getCookie(cname).length>0;
}
if(chk("ZhYicMathEngine"))
{
    if(getCookie("ZhYicMathEngine")=="Katex")
    {
        var newcss=document.createElement('link');
        newcss.rel="stylesheet",newcss.href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.10.0-rc.1/katex.min.css";
        document.head.appendChild(newcss);
        /*window.onload=function()
        {
            document.getElementsByTagName('body')[0].appendChild(newscript2)
        };*/
        document.addEventListener("DOMContentLoaded", function() {
            renderMathInElement(document.body, {
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false}
                ]
            }
            );
        });
    }
    else
    {
        var newscript=document.createElement('script');
        newscript.async=true;
        newscript.type="text/javascript";
        newscript.src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML";
        document.head.appendChild(newscript);
        newscript.async=false;
        newscript.text="MathJax.Hub.Config({\
            tex2jax: {inlineMath: [['$','$'],['\\(','\\)']]}\
          });"
        document.head.appendChild(newscript);
    }
}
else
{
    setCookie("ZhYicMathEngine","Katex");
}
function renderKatex(){
    var newscript2=document.createElement('script');
    newscript2.defer=true;
    newscript2.text="renderMathInElement(document.body,\
        {delimiters: [\
                       {left: \"$$\", right: \"$$\", display: true},\
                       {left: \"$\", right: \"$\", display: false}\
                   ]\
               }\
       );";
    document.getElementsByTagName('body')[0].appendChild(newscript2);
}
/*
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML">
</script>
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  tex2jax: {inlineMath: [['$','$'],['\\(','\\)']]}
});
</script>
*/