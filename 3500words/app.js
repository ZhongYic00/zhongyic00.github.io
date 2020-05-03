var vocabulary = new Array();
var wrong = new Array();
var method = 'all';
var notsave = false;
function Word(e, c) {
	this.eng = e.textContent.replace(/\[+.*\]|\/+.*\//ig, '').replace(/[^a-z\s]/ig, '').replace(/\s*\s?$/g, '').replace(/\s*\s/g, ' '),
		this.cn = c.textContent.replace(/\s*\s?$/g, ''),
		this.t = Boolean(e.textContent.search('=') != -1 || e.textContent.replace(/\[+.*\]/ig, '').search('\\u0028') != -1);
}
function methodChange(t = all) {
	checker.__save();
	notsave = true; window.localStorage['method'] = t;
	window.location.reload();
}
var id = {
	cur: 0,
	init() {
		if (window.localStorage['method'] && window.localStorage['method'].search(/[a-z]/ig) != -1) method = window.localStorage['method'];
		if (method == 'all') this.cur = window.localStorage['progress'] || 0;
		else if (method == 'loop') {
			if (wrong.length == 0) {
				alert('既有错误已经练习完啦！');
				return methodChange('all');
			}
			this.cur = window.localStorage['loop'] || 0;
		}
		else this.cur = 0;
	},
	now() {
		return method == 'all' ? this.cur : wrong[this.cur];
	},
	nxt(jud) {
		if (method == 'all') {
			this.cur++;
			if (this.cur >= vocabulary.length) {
				alert('已经完成全部单词！\n从头再来一次');
				cur = 0;
			}
			return this.cur;
		}
		else {
			if (!jud) this.cur++;
			else {
				wrong.splice(this.cur, 1);
				if (wrong.length == 0) {
					alert('既有错误已经练习完啦！');
					return methodChange('all');
				}
			}
			this.cur %= wrong.length;
			return wrong[this.cur];
		}
	},
	bef() {
		this.cur--;
		if (this.cur < 0) this.cur = method == 'loop' ? wrong.length - 1 : vocabulary.length - 1;
		if (method == 'loop') alert('纠错练习模式下无法回顾已经正确解答的单词');
		return this.cur;
	},
	save() {
		window.localStorage['method'] = method;
		if (method == 'all') window.localStorage['progress'] = this.cur;
		else window.localStorage['loop'] = this.cur;
	}
}
var checker = {
	show: null,
	ans: null,
	ok: null,
	bak: null,
	std: null,
	save: null,
	clear: null,
	thesaurus: null,
	change: null,
	infobox: null,
	__save: () => {
		id.save();
		window.localStorage['wrong'] = wrong.toString();
	},
	init() {
		this.show = document.getElementById('cn');
		this.ans = document.getElementById('ans');
		this.ok = document.getElementById('chk');
		this.bak = document.getElementById('bak');
		this.std = document.getElementById('std');
		this.save = document.getElementById('sav');
		this.clear = document.getElementById('clr');
		this.thesaurus = document.getElementById('ths');
		this.change = document.getElementById('chg');
		this.infobox = document.getElementById('infobox');
		wrong = window.localStorage['wrong'] ? (window.localStorage['wrong'].split(','))
			.map(function (numStr) {
				return parseInt(numStr);
			}) : new Array();
		id.init();
		document.getElementById('mtd').title = '当前：' + (method == 'all' ? '全部词汇' : '纠错练习');
		this.info();
		this.show.textContent = vocabulary[id.now()].cn;
		checker.thesaurus.style.visibility = vocabulary[id.now()].t ? 'visible' : 'hidden';
		this.ok.addEventListener('click', checker.chk);
		this.bak.addEventListener('click', checker.bef);
		this.ans.addEventListener('keydown', (c) => {
			if (c.keyCode == 13) checker.chk();
		});
		this.save.addEventListener('click', this.__save);
		this.clear.addEventListener('click', () => {
			if (confirm('清除练习记录？')) {
				id.cur = 0;
				window.location.reload();
			}
		});
		this.change.addEventListener('click', () => {
			methodChange(method == 'all' ? 'loop' : 'all');
		})
		document.addEventListener('keydown',function (e) {
			e = e || window.event;
			if (e.keyCode == 32 && (checker.ans.value==''||checker.ans.value==vocabulary[id.now()].eng[0])) {
				checker.tips(checker.ans.value=='');
			}
		});
	},
	chk() {
		if (checker.ans.value == vocabulary[id.now()].eng) {
			checker.reset(); checker.nxt(true);
		}
		else {
			checker.std.textContent = vocabulary[id.now()].eng;
			if (method == 'all') wrong.push(id.now());
			setTimeout(() => { checker.reset(); checker.nxt(false); }, 1000);
		}
	},
	nxt(jud) {
		checker.show.textContent = vocabulary[id.nxt(jud)].cn;
		checker.thesaurus.style.visibility = vocabulary[id.now()].t ? 'visible' : 'hidden';
	},
	bef() {
		checker.show.textContent = vocabulary[id.bef()].cn;
		checker.thesaurus.style.visibility = vocabulary[id.now()].t ? 'visible' : 'hidden';
	},
	reset() {
		checker.ans.value = '';
		checker.std.innerText = '\0';
	},
	info() {
		if (method == 'all') checker.infobox.textContent = id.now() + '/' + vocabulary.length;
	},
	tips(b){
		//checker.ans.value=vocabulary[id.now()].eng[0];
		setTimeout(()=>{checker.ans.value=b?vocabulary[id.now()].eng[0]:vocabulary[id.now()].eng.slice(0,2)},1);
	}
};
var errhistory = {
	btn: HTMLElement,
	show: HTMLElement,
	init() {
		this.btn = document.getElementById('err');
		this.show = document.getElementById('errshow');
		this.btn.addEventListener('click', errhistory.display);
	},
	display() {
		if (errhistory.show.style.display == 'none') {
			errhistory.show.style.display = 'block';
			for (i in wrong) {
				const errItem = (id) => {
					let a = document.createElement('p'), b = document.createElement('span'), c = document.createElement('span');
					a.className = 'errItem', b.textContent = vocabulary[id].cn, b.className = 'errItem-c', c.textContent = vocabulary[id].eng, c.className = 'errItem-e';
					a.appendChild(b), a.appendChild(c);
					return a;
				}
				errhistory.show.appendChild(errItem(parseInt(wrong[i])));
			}
		}
		else {
			errhistory.show.style.display = 'none';
			errhistory.show.innerHTML = ''
		}
	}
}
window.onload = function () {
	var dataPage = document.getElementById('data-page').contentWindow.document;
	var tbody = dataPage.getElementsByTagName('tr');
	for (var i = 0; i < tbody.length; i++) {
		var line = tbody[i].childNodes;
		if (line.length > 5 && line[1].textContent.search(/[a-z]/ig) != -1) vocabulary.push(new Word(line[1], line[5]));
	}
	checker.init();
	errhistory.init();
}
window.onunload = () => {
	if (notsave) return;
	wrong = Array.from(new Set(wrong));
	checker.__save();
};