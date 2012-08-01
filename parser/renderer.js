module.exports = 
    (function(){
	
	var _ = require('./jsGoo.9.js'),
	head = "<html><head><link rel='stylesheet' type='text/css' href='m.css'><script type='text/javascript' src='m.js'></script></head><body>",
	foot = "</body></html>";
	
	var topWrap = {
	    "" : "p",
	    "-": "li class='todo'",
	    "+": "li class='done'",
	    "*": "li class='norm'",
	    "~": "li class='later'"
	};

	var topEnds = {
	    "" : "",
	    "-": " <a href=''>check</a>",
	    "+": " <span class='done'>done</span>",
	    "*": "",
	    "~": ""
	};

	

	var titles = function(d) {
	    return _._c.reduce(function(acc, x){return acc + (typeof x=="string"?_._.wrap(x,"h1"):
							_._.wrap(blocks(x),"div class='title'")); }, d, "");
	};

	var blocks = function(d) {
	    return _._c.reduce(function(acc, x){return acc + (typeof x=="string"?"":
							_._.wrap(subtitles(x),"div class='block'")); }, d, "");
	};

	var subtitles = function(d) {
	    return _._c.reduce(function(acc, x){return acc + (typeof x=="string"?_._.wrap(x,"h2"):
							_._.wrap(lines(x),"div class='subtitle'")); }, d, "");
	};

	var lines = function(d) {
	    return _._c.reduce(function(acc, x){return acc + _._.wrap(line(x.type, x.cont), topWrap[x.type]); }, d, "");
	};


	var line = function(type, cont) {
	    return _._c.reduce(function(acc, x){return acc + ((typeof x=="string")?x:inline(x.t,x.v,x.r)); }, cont, "")+topEnds[type];
	};

	var inline = function(t, v, r) {
	    return t=="br"?"<br/>":_._.wrap(r,"span class='"+t+"'");
	};
    
	this.render = titles;
    
	this.renderTpl = function(doc) { return head + this.render(doc) + foot; };

	return this;


    })();

