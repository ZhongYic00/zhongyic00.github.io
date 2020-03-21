var vocabulary = new Array();
var wrong = new Array();
var progress = 0;
function Word(e, c) {
	this.eng = e.textContent.replace(/\[+.*\]|\/+.*\//ig, '').replace(/[^a-z\s]/ig, '').replace(/\s*\s?$/g, '').replace(/\s*\s/g,' '),
	this.cn = c.textContent.replace(/\s*\s?$/g, ''),
	this.t = Boolean(e.textContent.search('=') != -1||e.textContent.replace(/\[+.*\]/ig, '').search('\\u0028')!=-1);
}
var checker = {
	show: null,
	ans: null,
	ok: null,
	std: null,
	save: null,
	clear: null,
	thesaurus: null,
	__save: () => {
		window.localStorage['progress'] = progress;
		window.localStorage['wrong'] = wrong.toString();
		//			console.log(window.localStorage['wrong']);
	},
	init() {
		this.show = document.getElementById('cn');
		this.ans = document.getElementById('ans');
		this.ok = document.getElementById('chk');
		this.std = document.getElementById('std');
		this.save = document.getElementById('sav');
		this.clear = document.getElementById('clr');
		this.thesaurus = document.getElementById('ths');
		progress = window.localStorage['progress'] || 1;
		//console.log(window.localStorage['wrong'].split(','));
		wrong = window.localStorage['wrong'] ? (window.localStorage['wrong'].split(','))
			.map(function (numStr) {
				return parseInt(numStr);
			}) : new Array();
		this.show.textContent = vocabulary[progress].cn;
		checker.thesaurus.style.visibility=vocabulary[progress].t?'visible':'hidden';
		this.ok.addEventListener('click', checker.chk);
		this.ans.addEventListener('keydown', (c) => {
			if (c.keyCode == 13) checker.chk();
		});
		this.save.addEventListener('click', this.__save);
		this.clear.addEventListener('click', () => {
			if (confirm('清除练习记录？')) {
				progress = 1;
				window.location.reload();
			}
		})
	},
	chk() {
		if (checker.ans.value == vocabulary[progress].eng) {
			checker.reset(); checker.nxt();
		}
		else {
			checker.std.textContent = vocabulary[progress].eng;
			wrong.push(progress);
			setTimeout(() => { checker.reset(); checker.nxt(); }, 1000);
		}
	},
	nxt() {
		checker.show.textContent=vocabulary[++progress].cn;
		checker.thesaurus.style.visibility=vocabulary[progress].t?'visible':'hidden';
	},
	reset() {
		checker.ans.value = '';
		checker.std.innerText = '\0';
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
		if (line.length > 5) vocabulary.push(new Word(line[1], line[5]));
	}
	checker.init();
	errhistory.init();
}
window.onunload = () => {
	wrong = Array.from(new Set(wrong));
	checker.__save();
};
window.onbeforeunload = function () {
	return 'aaaaaa';
}