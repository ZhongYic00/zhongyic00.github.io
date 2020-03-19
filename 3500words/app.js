var vocabulary = new Array();
var wrong = new Array();
var progress = 0;
function Word(e, c) {
	this.eng = e.textContent.replace(/\[+.*\]/ig, '').replace(/[^a-z\s]/ig, '').replace(/\s*\s?$/g, ''), this.cn = c.textContent.replace(/\s*\s?$/g, '');
}
var checker = {
	show: null,
	ans: null,
	ok: null,
	std: null,
	save: null,
	clear: null,
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
		progress = window.localStorage['progress'] || 1;
		//console.log(window.localStorage['wrong'].split(','));
		wrong = window.localStorage['wrong'] ? (window.localStorage['wrong'].split(','))
			.map(function (numStr) {
				return parseInt(numStr);
			}) : new Array();
		this.show.textContent = vocabulary[progress].cn;
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
			checker.reset(); checker.show.textContent = vocabulary[++progress].cn;
		}
		else {
			checker.std.textContent = vocabulary[progress].eng;
			wrong.push(progress);
			setTimeout(() => { checker.reset(); checker.show.textContent = vocabulary[++progress].cn; }, 1000);
		}
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
					a.className = 'errItem', b.textContent = vocabulary[i].cn, b.className = 'errItem-c', c.textContent = vocabulary[i].eng, c.className = 'errItem-e';
					a.appendChild(b), a.appendChild(c);
					return a;
				}
				errhistory.show.appendChild(errItem(parseInt(i)));
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