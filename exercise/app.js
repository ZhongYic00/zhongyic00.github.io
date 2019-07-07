function ajaxGet(url,resolve){
	return new Promise(function(resolve){
		var rt=new XMLHttpRequest();
		rt.open("get",url,true);
		rt.send();
		rt.onreadystatechange=function(){
			if(rt.readyState==4)resolve(rt.responseText);
		}
	});
}
var exercises=new Array();
const newElement=(n)=>{return document.createElement(n);};
const classAttach=(o,n)=>{
	let tmp=document.getElementsByClassName(o);
	for(var i=0;i<tmp.length;i++)
		tmp[i].classList.add(n);
};
ajaxGet('data.json').then(function(jsonText){
	let tmp=JSON.parse(jsonText);
	for(var i in tmp.tests){
		exercises.push(tmp.tests[i]);
	}
}
);
var main,id=0,correctionTemplate=newElement('span'),reasonTemplate=newElement('span');
correctionTemplate.classList.add('correction'),reasonTemplate.classList.add('reason');
function scorePoint(p,t,c,r){
	var rt=newElement('span');
	rt.classList.add(t);
	rt.classList.add('hidden');
	rt.dataset.c=c,rt.dataset.r=r;
	console.log(rt);
	rt.appendChild(function(p,c){
		let tmp=newElement('span');
		tmp.textContent=p||c;
		return tmp;
	}(p,c));
	rt.appendChild(function(_th){
		let tmp=correctionTemplate.cloneNode(false);
		tmp.textContent=_th.dataset.c;
		return tmp;
	}(rt));
	rt.appendChild(function(_th){
		let tmp=reasonTemplate.cloneNode(false);
		tmp.textContent=_th.dataset.r;
		return tmp;
	}(rt));
	rt.addEventListener('click',function(){
//		console.log(this.classList);
		if(this.classList.contains('hidden')&&this.classList.contains('show'))this.classList.remove('hidden');
		else this.classList.add('hidden');
	});
	return rt;
}
function nextExercise(){
	if(id>=exercises.length){
		alert("今天只有这么多练习啦！");
		return ;
	}
	while(main.childNodes.length)main.removeChild(main.lastChild);
	console.log(exercises[id]);
	for(i in exercises[id].content){
		let nd=exercises[id].content[i];
		if(!nd.type){
			let tmp=newElement('span');
			tmp.textContent=nd.p;
			main.appendChild(tmp);
		}else{
			main.appendChild(scorePoint(nd.p,nd.type,nd.correction,nd.reason));
		}
	}
	id++;
}
function showAnswer(){
	classAttach('wa','show'),classAttach('surplus','show'),classAttach('lack','show');
}
function hideAnswer(){
	let tmp=document.getElementsByClassName('show');
	while(tmp.length)
		tmp[0].classList.add('hidden'),tmp[0].classList.remove('show');
}
window.onload=function(){
	main=newElement('p');
	document.getElementsByTagName('main')[0].appendChild(main);
	let show=document.getElementById('show'),hide=document.getElementById('hide'),next=document.getElementById('next');
	let st=document.getElementById('start');
	st.addEventListener('click',nextExercise);
	show.addEventListener('click',showAnswer);
	hide.addEventListener('click',hideAnswer);
	next.addEventListener('click',nextExercise);
}
