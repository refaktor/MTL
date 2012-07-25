var _ = require('./jsGoo.9.js');

module.exports = (function(){
    
	var topWrap = {
	    "#": "h1", "##": "h2", "###": "h3", 
	    "-": "div class='todo'",
	    "+": "div class='done'",
	    "*": "div class='norm'",
	    "~": "div class='later'",
	    "sepa": "hr"
	};

	var line = function(type, cont) {
	    return _._c.reduce(function(acc, x){return acc + ((typeof x=="string")?x:special(x.t,x.v,x.r)); }, cont, "");
	}

	this.render = function(doc) {
	    return _._c.reduce(function(acc, x){return acc+_._.wrap(line(x.type, x.cont), topWrap[x.type])}, doc, "");
	}
    
	var special = function(t, v, r) {
	    return t=="br"?"<br/>":_._.wrap(r,"span class='"+t+"'");
	}
    
	return this;
    })();

