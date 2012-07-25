// WARNING: This is pre-alpha version, anything might change, just testing ideas
//param names: r=resource, m=method, p=params, c=callback, gp=get-params,

var jsGooC = {
    map: function (f, arr) {
        var r = []; // WART - don't know why I had clone here: this.clone(arr);
        for (i=0;i< arr.length;i++) { r[i] = f(arr[i]); }
        return r;
    },

    reduce: function (f, arr, s) {
        var r = s;
        for (var i = 0; i < arr.length; i++) { r = f( r, arr[i] ); }  
        return r;
    },

    reducei: function (f, arr, s) {
        var r = s;
        for (var i = 0; i < arr.length; i++) { r = f( r, arr[i], i ); }  
        return r;
    },

    reduceObj: function (f, obj, s) {
        var r = s;
        for (k in obj) { r = f( r, k, obj[k] ); }  
        return r;
    },
    
    doeach: function ( f, arr ) {
        for (var i = 0; i < arr.length; i++) { f( arr[i], i ); }
    },
    
    seek: function (f, arr) {
        for (var i = 0; i < arr.length; i++) { var t = f(arr[i], i); if (t) return t; }
        return false;
    },

    has: function (n, arr) {
        return this.seek(function(e, i){ return e == n; }, arr);
    },

    apply: function (d, c) { 
	var r = this.clone(d);
	for (n in r) if (c[n]) r[n] = c[n](r[n], n);
	return r;
    },
    
    applyL: function (d, c) { 
	var r = this.clone(d);
	for(var i=0;i<r.length;i++) {
	    for (n in r[i]) if (c[n]) r[i][n] = c[n](r[i][n], i, n);
	}
	return r;
    },
    
    inject: function (d, c) {
	var r = this.clone(d);
	for (k in c) r[k] = c[k](r);
	return r;
    },

    injectL: function (d, c) {
	var r = this.clone(d);
	for(var i=0;i<r.length;i++) {
	    for (k in c) r[i][k] = c[k](r[i], i);
	}
	return r;
    },
    
    clone: function(o) {
	var n = (o instanceof Array) ? [] : {};
	for (i in o) {
	    if (o[i] && typeof o[i] == "object") {
		n[i] = this.clone(o[i]);
	    } else n[i] = o[i];
	} return n;
    },
    strpad: function (s, fil, len) {
	return (s.length < len) ? this.strpad(fil+s, fil, len) : s;
    },
    fix2: function (n) {
	n = parseFloat(n);
	return n < 0.0001 ? (0).toFixed(2) : n.toFixed(2);
    },
    nzfix2: function (n) {
	n = parseFloat(n == null ? 0 : n);
	return n < 0.0001 ? (0).toFixed(2) : n.toFixed(2);
    },
    nfix2: function (n) {
	return Math.round(n * 100) / 100;
    },
    nz: function (n) { 
	return parseFloat(n == null ? 0 : n); 
    },
    
    
    //html related - here so that Minijax has just jsGoo Core as dependancy 
    isInputField: function ( e ) {
        return jsGooC.has(e.tagName.toLowerCase(), ['input', 'textarea', 'select']);
    }
};

var jsGooDR = 
    {

	setLoc: function (r, m, p, data) {
	    var d = jsGooDR_DATA;
	    if (d[r] == null) d[r] = { };        //undefined , but IE doesn't work
	    if (d[r][m] == null) d[r][m] = { }; //undefined , but IE doesn't work
	    d[r][m][p] = data;
	},
	
	getLoc: function (r, m, p, def) {  
	    var d = jsGooDR_DATA;
	    return d[r][m][p]!=null?d[r][m][p]:(def?def:null);
	},
	
	getDo: function (r, m, p, c) {  
	    var d = jsGooDR_DATA;
	    if (d[r][m][p] != null) { return c(d[r][m][p]); } else { this.getDoSrv(r,m,p,c); return null; }
	},
	
	getDoSrv: function (r, m, p, c) { 
	    Minijax.call("/_rdb/"+r+"/"+m+"?"+p, 
			 function (d){ var de=eval(d); this.setLoc(r,m,p,de); if(c){ c(de); } });
	},
	
	invalLoc: function (r, m, p) {  
	    var d = jsGooDR_DATA;
	    if (p) { d[r][m][p] = null; } else { if (m) { d[r][m] = null;} else { d[r] = null; } } 
	},
	
	sendSrv: function (r, m, p, c, gp) { 
	    Minijax.call("/_rdb/"+r+"/"+m+(gp?"?"+gp:''), 
			 function (d){ var de=eval(d); if(gp){this.setLoc(r,m,gp,de);} if (c){ c(de); } }, p);
	},
	
	
	selectById: function (data, id) {
	    return jsGooC.seek(function(x, i){ return x.id==id?x:false; }, data);
	},

	selectBy: function (data, func) {
	    return jsGooC.seek(function(x, i){ return func(x)?x:false; }, data);
	},

	deleteById: function (data, id) {
	    return jsGooC.seek(function(x, i){ if (x.id==id){ data.splice(i, 1); return true } else { return false } }, data);
	},
	
	updateById: function (data, unit) {
	    return jsGooC.seek(function(x, i){ if (x.id==unit.id){ data[i] = unit; return true } else { return false } }, data);
	},
	
	applyWhere: function (data, applyWith, where, seekWhile) {
	    return jsGooC.seek(
		function(x, i){ 
		    if (where(x, i)){ data[i] = jsGooC.apply(x, applyWith); }
		    return seekWhile == null ? false : ( seekWhile(x, i) ? false : true ) ;
		}, 
		data
	    );
	},

	deleteWhere: function (data, where, seekWhile) {
	    return jsGooC.seek(
		function(x, i){ 
		    if (where(x, i)){ data.splice(i, 1); }
		    return seekWhile == null ? false : ( seekWhile(x, i) ? false : true ) ;
		}, 
		data
	    );
	},
	skvEncodeArr: function (arr) {
	    return jsGooC.reduce(function(acc, o){return acc + (o ? o[0] + "::" + o[1] + ";;" : "")}, arr, "");
	}	
    };

//param names: l=label, h=href, c=callback, d=data, tpl=template, def=default, o=object
//             v=value, t=tag, s=string
var jsGoo = {
    
    a: function ( l, h, c, pass ) {
	return this.wrap( l, 'a '+this.propdef(h, "href", "#")+
			  this.propif(c+(pass?'':';return false;'), "onclick") );
    },

    closeLink: function(l, c) {
	return this.wrap( this.a(l?l:'close', '#', 'this.parentNode.parentNode.style.display = "none"; '+(c?c:'')), 'div style="float: right;"');
    },
    
    brclear: function () { return '<br style="clear: both;" />'; },
    
    tr: function ( d, inner ) { return this.lis(d, inner?inner:'td', 'tr'); },
    
    lis: function (d, inner, outer) { 
	var r = ''; 
	inner = inner?inner:'li'; outer = outer?outer:'ul';
	for(var i=0;i<d.length;i++){ r += this.wrap(d[i]?d[i]:'&nbsp;', inner); }
	return this.wrap(r, outer);
    },
    
    unit: function (du, tpl, def) {
	var t = tpl;
	for (var p in du){
	    t = t.replace(new RegExp("{"+p+"}", 'g'), du[p]!==null && du[p]!==""?du[p]:(def?def:'-'));
	}
	return t;
    },
    
    list: function (d, tpl, outer, def) {
	var r = '';
	for(var i=0;i<d.length;i++) {
	    r += this.unit(d[i], tpl, def); 
	}
	return outer?this.wrap(r, outer):r;
    },

    listEx: function (d, tpl, outer, def, exception) {
	var r = '';
	for(var i=0;i<d.length;i++) {
	    var ex = exception(d[i]);
	    if (ex) { r += ex; }
	    r += this.unit(d[i], tpl, def); 
	}
	return outer?this.wrap(r, outer):r;
    },

    into: function (el, d) { el.innerHTML = d; },
    $into: function (id, d) { $get(id).innerHTML = d; },

    getparam: function (n, def) {
	var match = window.location.search.match(new RegExp("[?|&]?"+n+"=([^&]*)"))
	return match?match[1]:def;
    },


    tag: function (t) {return t?'<'+t+'>':''; },
    etag: function (t) {return t?'</'+t+'>':''; },
    wrap: function (v, t) { return this.tag(t)+v+this.etag(this._firstword(t)); },
    wrapif: function (v, t) { return v?this.wrap(v, t):''; },
    prop: function (v, n) { return " "+n+"='"+v+"'"; },
    propif: function (v, n) { return v?this.prop(v,n):''; },
    propdef: function (v, n, def) { return this.prop(v?v:def,n); },
    
    _firstword: function (s) { var p=s.indexOf(' '); return p>=0?s.substring(0,p):s; },
    
    k: function (evt){ // kill event
	if (!evt) evt = window.event;
	if (evt['stopPropagation']){
	    evt.stopPropagation(); evt.preventDefault();
	}else if(typeof evt.cancelBubble != "undefined"){
	    evt.cancelBubble = true; evt.returnValue = false;
	}
	return false;
    },
    
    clearOpts: function (sel) {
	sel.options.length=0
    },
    addOpts: function (sel, d, fn) {
	jsGooC.doeach(function(o, i){
	    var opt = document.createElement('option'), v = fn(o);
	    opt.value = v[0];
	    opt.text = v[1];
	    try {
		sel.add(opt, null);
	    } catch(ex) {
		sel.add(opt); //IE only
	    }
	    
	}, d);
    }
    
};

//param names: l=line, f=field, i=input, os=options, o=option

var jsGooF = {
    
    render: function ( d, id, onsub, action ) {
	var _ = jsGoo;
	return _.wrap( this.renderHidden(d.hidden) + this._renderDescr(d) + 
		       this.renderFields(d.fields)+_.wrap('', 'div class="row"'), 
		       'form '+_.propdef(d.method, 'method', 'post')+
		       (action?_.prop(action, 'action'):_.propif(d.action, 'action'))+
		       (d.style?_.prop(d.style, 'style'):_.propif(d.style, 'style'))+
		       (d.multipart?'enctype="multipart/form-data"':"")+
		       (id?_.prop(id, 'id'):_.propif(d.id, 'id'))+
		       (onsub?_.prop(this._genOnSubmit(onsub), 'onsubmit'):_.propif(d.onsubmit, 'onsubmit'))
		     );
    },
    
    renderHidden: function ( f ) {
	var r = '';
	for (id in f) {
	    r +=  "<input type='hidden' "+_.prop(id, 'id')+
		_.propif(f[id].name, 'name')+_.propif(f[id].value, 'value')+" />";
	}
	return r+"\n";
    },
    
    renderFields: function ( f ) {
	var r = '';
	for (id in f) {
	    r += this.renderLine( id, f[id]);
	}
	return r;
    },
    
    renderLine: function ( id, l ) {
	var _ = jsGoo;
	return _.wrap(
	    _.wrap(l['label']?l.label:'&nbsp;', 'label for="'+id+'"')+
		_.wrap(
		    (l.inp.name?_.wrap('', 'span class="vnote" title="'+l.inp.name+'"'):'')+
			this.renderField(id, l), 'div class="field"'), 
	    'div class="row" '+(l['nodisplay']?'style="display: none"':''));
    },
    
    renderField: function ( id, l ) {
	var _ = jsGoo;
	return this.renderInput(id, l.inp)+_.wrapif(l.after, 'span')+_.wrapif(l.help, 'em')+"\n";
    },
    
    renderInput: function ( id, i ) {
	var _ = jsGoo;
	switch (i.type) {
	case 'text': case 'radio': case 'checkbox': case 'submit': 
	case 'reset': case 'password': case 'file':
	    return "<input "+_.propif(i.type, 'type')+this._inputBaseProps(id, i)+
		_.propif(i.value, 'value')+_.propif(i.cls, 'class')+ 
		_.propif(i.checked?'checked':null, 'checked')+" />";
	    break;
	case 'textarea':
	    return "<textarea "+this._inputBaseProps(id, i)+
		_.propif(i.cols, 'cols')+_.propif(i.rows, 'rows')+">"+
		(i.value?i.value:'')+"</textarea>";
	    break;
	case 'select':
	    var options = this._renderOptions(i.options);
	    return i.ifempty && options[0] == 0 ?
		i.ifempty :
		"<select "+this._inputBaseProps(id, i)+">"+options[1]+"</select>";
	    break;
	}
	return '';
    },

    _renderDescr: function ( d ) {
	return d['descr']&&d['descr']!=""?"<p>"+d.descr+"</p>":"";
    },

    _renderOptions: function ( os ) {
		var r = '', _ = jsGoo, cnt=0;
		if (os instanceof Array){
			for (o in os) {
				if (os[o] instanceof Array && (! (os[o] instanceof Function))){
					var isarr = os[o] instanceof Array;
					r += _.wrap(isarr?os[o][1]:os[o], "option"+(isarr?" value='"+os[o][0]+"'":'')); cnt += 1;
				}
			}
		} else {
			var ds = DATA[os.data], v = os.values, l = os.labels;  //BAD BAD BAD .. DATA hardcoded :/
		    if (os.addempty) { 	r += _.wrap("", "option"+(v?" value='"+0+"'":''));	cnt += 1; }
			for (d in ds) {
				if (ds[d][v] && (!(ds[d] instanceof Function))){
					r += _.wrap(ds[d][l], "option"+(v?" value='"+ds[d][v]+"'":''));	cnt += 1;
				}
			}			
		}
		return new Array( cnt, r );       
    },


    _renderOptions_old: function ( os ) {
	var r = '', _ = jsGoo, cnt=0;
	if (os instanceof Array){
	    for (o in os) {
		if (os[o] instanceof Array && (! (os[o] instanceof Function))){
		    var isarr = os[o] instanceof Array;
		    r += _.wrap(isarr?os[o][1]:os[o], "option"+(isarr?" value='"+os[o][0]+"'":'')); cnt += 1;
		}
	    }
	} else {
	    var ds = DATA[os.data], v = os.values, l = os.labels;  //BAD BAD BAD .. DATA hardcoded :/
	    for (d in ds) {
		if (ds[d][v] && (!(ds[d] instanceof Function))){
		    r += _.wrap(ds[d][l], "option"+(v?" value='"+ds[d][v]+"'":''));	cnt += 1;
		}
	    }			
	}
	return new Array( cnt, r );       
    },

    _inputBaseProps: function ( id, i ) {
	var _ = jsGoo;
	return _.propif(id, 'id')+_.propif(i.name, 'name')+_.propif(i.size, 'size')
	    +_.propif(i.onclick, 'onclick')+_.propif(i.onchange, 'onchange')+
	    _.propif(i.onkeydown, 'onkeydown');
    },

    setValues: function ( f, d ) {
        return jsGooC.doeach(function (e,i) {
            if (jsGooC.isInputField(e)) { 
                if (e.type!='submit' && e.type!='file' && e.type!='password') { 
		    var v = d[e['name']]!==null?d[e['name']]:'';
		    if (typeof v !== "undefined") {
			if (e.className == 'datep' && e.id) {
			    e.value = v;
			    //jsgDom.seekFwd(e, "input").value = HTMLDecode(v);
			} else if (e.className != 'datep') {
			    e.value = HTMLDecode(""+v);
			}
		    }
		} 
            }
	}, f.getElementsByTagName('*'));
    },
    
    setVNotes: function ( f, d, lang ) {
	return jsGooC.doeach(function (e,i) {
	    if (e.className=='vnote' && d[e.title]) {
		e.style['display'] = 'block';
		_.into(e, lang?(lang[d[e.title]]?lang[d[e.title]]:d[e.title]):d[e.title]);
	    }
	}, f.getElementsByTagName('span'));
    },

    setDRMethod: function ( f, m ) {
	var a = f.action;
	var s = a.indexOf("_m=")+3;
	var i2 = a.indexOf("&", s);
	f.action = a.substring(0, s) + m + ( i2 >= 0 ? a.substring(i2) : '' );
    },

    setOnSubmit: function ( f, onsub ) {
	f.onsubmit = onsub;
    },

    _genOnSubmit: function ( onsub ) { return "jsGoo.k(event); return "+onsub.toString()+"(this)" },

    switchLine: function (el, dir) {
	var l1 = jsgDom.seekOut(jsgDom.seekOut(el, 'div'), 'div');
	l1.style.display = 'none';
	var l2 = jsgDom.seek(dir, l1, 'div');
	if (l2) {
	    l2.style.display = 'block';
	}
    },

    hideLine: function (el, dir) {
	var l1 = jsgDom.seekOut(jsgDom.seekOut(el, 'div'), 'div');
	l1.style.display = 'none';
    },

    showLine: function (el, dir ) {
	var l = jsgDom.seek(dir, jsgDom.seekOut(jsgDom.seekOut(el, 'div'), 'div'), 'div');
	el.style.display = 'none';
	if (l) {
	    l.style.display = 'block';
	}
    }

    
};

var jsGooDbg = {
    pprint: function (o) {
	var r='', isarr=o instanceof Array, frs=true;
	if (isarr || o instanceof Object) { 
	    r+=(isarr?'[':'{');
	    for (i in o) { 
		r += (frs?' ':', ')+(!isarr?this.pprint(i)+': ':'')+this.pprint(o[i]);
		frs=false;
	    }
	    r+=(isarr?' ]':' }');
	} else { 
	    var q = typeof o == "string"?'"':''; 
	    r+=q+o+q; 
	}
	return r;
    },
    alert: function (o) {
        alert(this.pprint(o));
    }
};

var jsGooUT = {
    test: function ( tests ) { 
	return jsGooC.reduce(function( s, test ) {
	    var res = (test.f() == test.r)?'pass':'fail' ;
	    return s + jsGoo.wrap( test.n+' '+res+
				   (res=='fail'?' | expected: <b>' + jsGooDbg.pprint(test.r) + 
				    '</b> | got: <b>'+ jsGooDbg.pprint(test.f()) + '</b>': '' )
				   , 'div class="'+res+'"');
	}, tests, "")
    }
};

//param names: r=response, u=url, c=callback, gp=get-params, pp=post-params, e=error

var Minijax = {
    getRequestInst: function(){
	return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');  
    },
    
    get_old:  function(u, c, gp) { this.call(u,c,gp); },
    post_old: function(u, c, p) { this.call(u,c,null,p); },
    
    call: function(u, c, gp, pp) {
	var t = this, r = t.getRequestInst(), gd='', pd='';
	if (!r) { alert('No Ajax?'); return; }
	r.onreadystatechange = c ? function() { t.onChange(r, c); } : null;

	if (pp) { for (var n in pp) {pd += (pd?'&':'')+n+'='+encodeURIComponent(pp[n]); } }
	if (gp) { for (var m in gp) {gd += (gp?'&':'')+m+'='+encodeURIComponent(gp[m]); } }
	
	r.open(pp?'POST':'GET', u+(gd?"?"+gd:''), true);
	r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//r.setRequestHeader("Content-length", pd.length); chrome was warning with some unsafe header .. check other browsers
	//r.setRequestHeader("Connection", "close");
	r.send(pd);
    },

    onChange: function(r, c) {
	if (typeof LANG === 'undefined') {
	    LANG = {};
	}
	if (typeof LANG.err === 'undefined') {
	    LANG.err = {};
	    LANG.err.ajax_err = "error happened";
	    LANG.err.session_exp = "you were logged out because of inactivity, please login to continue";
	}
        if (r.readyState == 4) {
            if (r.responseText) {
                if ( r.responseText.indexOf('</html>') > 0 ) {
                    if ( r.responseText.indexOf('</form>') > 0 ) {
                        alert(LANG.err.session_exp);
                        window.location = window.location.href.replace(/#.*/g, "")+"";
                    } else {
                        alert(LANG.err.ajax_err);
                    }
                } else {
                    c(r.responseText);
                }
            } else { this.onError(); }
        }
    },

    onError: function (e) { alert(e?"ajax err:"+e:'Minijax error.'); },
    
    suckForm: function (f) {
	return jsGooC.reduce(function (s, e) {
	    var t = e.tagName.toLowerCase(), val = e.value;
	    if (jsGooC.isInputField(e) && e.name) 
		s[e.name] = (e.type=='checkbox'||e.type=='radio'?(e.checked?e.value:''):e.value);
	    return s;
	}, f.getElementsByTagName('*'), {});
    },
    
    postForm: function (f, c, d, ac) { //d - additional data, ac - action callback
        var fd = this.suckForm(f);
        if (d) for (k in d) { fd[k] = d[k] }
	this.post(ac?ac(f.action):f.action, c, fd); 
    },

    serPayload: function (p) { 
	return p ? _c.reduceObj(function(acc,k,v){ return acc + (acc?'&':'')+k+'='+encodeURIComponent(v) }, p, "") : "";
    },

    // *2 is the new transitional API (in the making)

    get:  function(u, c, gp) { this.call2(u,{success: c, get: gp}); },
    post: function(u, c, p) { this.call2(u,{ success: c, post: p }); },

    call2: function(url, P) {
	var th = this, rq = th.getRequestInst(), gd=this.serPayload(P['get']), pd=this.serPayload(P['post']);
	if (!rq) { alert('No Ajax?'); return; }
	rq.onreadystatechange = function() { th.onChange2(rq, P); };
	rq.open(pd?'POST':'GET', url+(gd?"?"+gd:''), true);
	rq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	rq.send(pd);
    },

    sessionExpired: function(rq) {
            return  (rq.responseText &&
                rq.responseText.indexOf('</html>') > 0 &&
                rq.responseText.indexOf('</form>') > 0 ) ?
	    true : false;
    },

    onChange2: function(rq, P) {
	this.assureLANG();
        if (rq.readyState == 4) {
            if (this.sessionExpired(rq)) {
		alert(LANG.err.session_exp);
                window.location = window.location.href.replace(/#.*/g, "")+"";
            } else if (rq.status == 200) {
                if (P['success']) P.success(eval(rq.responseText)); // TODO!!! change eval for crossbrows JSON....
            } else if (rq.status == 403) {
		if (P['validation']) P.validation(P.form, eval(rq.responseText));
            } else { 
		if (P['error']) P.error(rq.status, rq.responseText); 
	    }
        }
    },

    postForm2: function (fm, P) {
        var fd = this.suckForm(fm);
        if (P['post']) for (k in P['post']) { fd[k] = P['post'][k] }
	P['post'] = fd;
	P['form'] = fm;
	$d(P);
	this.call2(P['preaction']?P.preaction(fm.action):fm.action, P); 
    },

    assureLANG: function () { // THIS is not systematic, but needed for our case.. finx better way later
	if (typeof LANG === 'undefined') {
	    LANG = {};
	}
	if (typeof LANG.err === 'undefined') {
	    LANG.err = {};
	    LANG.err.ajax_err = "error happened";
	    LANG.err.session_exp = "you were logged out because of inactivity, please login to continue";
	}
    },

    handleValidation: function (fm, d) {
	jsGooF.setVNotes(fm, d[1], DATA.lang.vnotes)
    }

};

/*****
F*K IT ... we will do fancy nice ajax when we have time for it.. let's 

; todo -- change from eval to some JSON proxy that will work across brtowsers

var Mjax = {
    formResponder: {
	on200: function(r,f,x) {
	    if (this.onSuccess) { this.onSuccess(eval(r),f,x); }
	},
	on403: function(r,f,x) {
	    if (this.onValidation && x.status ==
	       },
	onValidation: function(r,f,x) {
    	    _f.setVNotes($('form1'), rd[1], DATA.lang.vnotes)
	},
	onError: function(r,f,x) {
	    alert('Unexpected error happened.');
	}
    }


    /*
      _a.postForm(form, { 
	onSuccess: function (r, form, ) {

	},
	onValidation: function (r, form, ) {
	    _f.setVNotes($('form1'), rd[1], DATA.lang.vnotes)
	}
	onDefault: function (r, form, x) {

	}
      });
      

      _a.postForm(form, { 
        get: { page: 1 }, 
	post: { text: "text" },
	on200: function (r, form, ) {

	},
	on403: function (r, form, ) {

	}
      });


     */

var jsgDom = {
    seekFwd: function (el, name, limit) {
	return jsgDom.seek('fwd', el, name, limit);
    },
    
    seekBack: function (el, name, limit) {
	return jsgDom.seek('back', el, name, limit);
    },
    
    seekOut: function (el, name, limit) {
	return jsgDom.seek('out', el, name, limit);
    },
    
    seekIn: function (el, name, limit) {
	return jsgDom.seek('in', el, name, limit);
    },

    seekFwdLower: function(el, name, limit) {
	var ch = el.firstChild;
	return ch.nodeName.toLowerCase() == name ? 
	    ch :
	    jsgDom.seekFwd(ch, name, limit);
    },
    
    seek: function (dir, el, name, limit) {
	limit = limit || 10; name = name.toLowerCase();
	var m = ''; switch ( dir ){ 
	case "back": m = 'previousSibling'; break;
	case "fwd": m = 'nextSibling'; break;
	case "out": m = 'parentNode'; break;
	case "in": m = 'firstChild'; break;
	}
	el = el[m]; //added lately .. it may cause some bugs , be warned?
	while(el && limit > 0) {
	    if (el.nodeName.toLowerCase() == name) return el;
	    limit -= 1;
	    el = el[m];
	} return null;
    },
    addCls: function (el, c) {
	var cn = el.className;
	var rx = new RegExp(c, "g");
	return el.className = c + (cn?" " +cn.replace(rx,''):"");
    },
    removeCls: function (el, c) {
	var rx = new RegExp(c, "g");
	return el.className = el.className.replace(rx, '');
    },
    modNodes: function (el, name, modf, limit) {
	limit = limit || 1000; name = name ? name.toLowerCase() : null;
	el = el.firstChild;
	var i = 0;
	while(el && limit > 0) {
	    if (el.nodeName.toLowerCase() == name || name === null) { modf(el, i) }
	    limit -= 1; i += 1;
	    el = el.nextSibling;
	} return null;
    }, 
    getSelectedVal: function (select) {
	return select.options[select.selectedIndex].value;
    },
    attachOnLoad: function(f) {
	if (window.attachEvent) {window.attachEvent('onload', f);}
	else if (window.addEventListener) {window.addEventListener('load', f, false);}
	else {document.addEventListener('load', f, false);}
    }

};

/*var jsgDom = {
  seekFwd: function (el, name, limit) {
  return this.seek('fwd', el, name, limit);
  },
  seekBack: function (el, name, limit) {
  return this.seek('back', el, name, limit);
  },	
  seek: function (dir, el, name, limit) {
  limit = limit || 10; name = name.toLowerCase();
  var m = ''; switch ( dir ){ 
  case "back": m = 'previousSibling'; break;
  case "fwd": m = 'nextSibling'; break;
  }
  while(el || limit > 0) {
  el = el[m];
  if (el.nodeName.toLowerCase() == name) return el;
  limit -= 1;
  } return null;
  }
  };*/

//fo - format , d - date , v - value 

var jsgDate = {
    format: function (d, fo) {
	var r = '';
	for(var i=0;i<fo.length;i++){
	    switch(fo.substr(i, 1)) {
	    case 'Y': case 'y': r += d.getFullYear(); break;
	    case 'd': r += this._padTo2(d.getDate()); break;
	    case 'm': r += this._padTo2(d.getMonth() + 1); break;
	    default: r += fo.substr(i, 1);
	    }
	}
	return r;
    },
    today: function (fo) {
	return this.format(new Date(), fo);
    },
    _padTo2: function (num) {
	var n = ""+num;
	if (n.length == 1) return "0"+n;
	else return n;
    },
    ensureFormat: function (d, fo) // leave much to improve
    {	
	if (typeof d == "string") {
	    var sepa = fo.substr(1,1), fa = fo.split(sepa), da = d.split(sepa), dr = new Array(0,0,0);
	    for (var ix=0; ix<3; ix++)
	    {
		if (fa[ix] == 'Y' || fa[ix] == 'y') dr[0] = da[ix];
		if (fa[ix] == 'm') dr[1] = da[ix];
		if (fa[ix] == 'd') dr[2] = da[ix];
	    }
	    //alert(dr[0]+'/'+dr[1]+'/'+dr[2]);
	    return dr[0]+'/'+dr[1]+'/'+dr[2];
	} else {
	    return d
	}
    },
    to: function (ds, fo)
    {
	var d = new Date();
	d.setTime(Date.parse(this.ensureFormat(ds, fo)));
	return d;
    },
    clearTime: function (d) {
	d.setHours(0); d.setMinutes(0); d.setSeconds(0); d.setMilliseconds(0);
	return d;
    },
    compare: function (d1, d2) { //fc- format char
	this.clearTime(d1); this.clearTime(d2);
	return (d1.getTime() - d2.getTime()) / (60*60*24*1000);
    },
    reformat: function ( d, ifo, ofo ) {
	return this.format(this.to(d, ifo), ofo);
    }
}

var jsgFormat = {
    __toMoney: function(n, c, d, t, cur) { //written by http://www.joninhas.ath.cx
	n = parseFloat(n);
	if (n || n == 0) {
	    n = n < 0.0001 ? 0 : n;
	    var m = (c == Math.abs(c) + 1 ? c : 2, d = d || ",", t = t || ".", cur = (cur == null ? '€' : ''),
		     /(\d+)(?:(\.\d+)|)/.exec(n + "")), x = m[1].length > 3 ? m[1].length % 3 : 0;
	    return (n<0?"-":"")+(x ? m[1].substr(0, x) + t : "") + m[1].substr(x).replace(/(\d{3})(?=\d)/g,
											  "$1" + t) + (c ? d + (+m[2] || 0).toFixed(c).substr(2) : "") + cur;	
	}
	return n;
    },
    toMoney: function(num, dec, ks, ds, bf, af) {
    	dec=dec==null?2:dec; ks=ks||".";ds=ds||",";bf=bf||"";af=af||"";
        if(!num || isNaN(num.toString())) num = 0;
        sign = num > -0.0049;
        num = Math.abs(num);
        num = Math.round(num*100);
        cents = (num%100).toString();
        nums = Math.floor(num/100).toString();
        if(cents<10) cents = "0" + cents;
        for (var i = 0; i < Math.floor((nums.length-(1+i))/3); i++)
            nums = nums.substring(0,nums.length-(4*i+3))+ks+ nums.substring(nums.length-(4*i+3));
        return ((sign?'':'-') + bf + nums + (dec?ds + cents:'') + af);
    },
    fixDecimal: function(s) {
    	var dot1 = s.indexOf("."), comm1 = s.indexOf(","); 
    	if (dot1 >= 0 && comm1 >= 0) {
    	    s = s.replace(new RegExp(dot1 < comm1 ?"\\.":",", 'g'), "");
    	}
    	if (comm1 >= 0) {
    	    s = s.replace(new RegExp(",", 'g'), ".");
    	}
    	//alert(s);
    	return s;
    }
}

function HTMLEncode(s) {
    s = s.replace(/&/g,"&amp;");
    s = s.replace(/\'/g,"&#39;");
    s = s.replace(/\//g,"&#47;");
    s = s.replace(/\"/g,"&quot;");
    s = s.replace(/</g,"&lt;");
    return s.replace(/>/g,"&gt;");
}

function HTMLDecode(s) {
    s = s.replace(/&#39;/g,"'");
    s = s.replace(/&#47;/g,"/");
    s = s.replace(/&quot;/g,'"');
    s = s.replace(/&amp;/g,"&");
    s = s.replace(/&lt;/g,"<");
    return s.replace(/&gt;/g,">");
}

//utils-shortcuts -- remove if you need to 
function $d(a){if (window['console'] && window['console']['debug']) console.debug(a) }
function $get(id) { return document.getElementById(id); }
var $out = jsgDom.seekOut;
var $fwd = jsgDom.seekFwd;
var $back = jsgDom.seekBack;
var $in = jsgDom.seekIn;
var $fwdlower = jsgDom.seekFwdLower;

// dialect [ 'in', 'div' 'skip' 2 ] [ 'out', 'skip', 1, 'div' ]
module.exports._c = jsGooC;
module.exports._ = jsGoo;
module.exports._f = jsGooF;
module.exports._a = Minijax;
module.exports._dr = jsGooDR;
module.exports._dbg = jsGooDbg;
module.exports._date = jsgDate;
module.exports._format = jsgFormat;
module.exports._dom = jsgDom;
