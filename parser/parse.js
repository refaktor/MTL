var fs = require('fs');
var pp = require('./MTL_parser');

fs.readFile('example.mtl', function(err,data){
	if(err) {
	    console.error("Could not open file: %s", err);
	    process.exit(1);
	}
	
	var aa = pp.parse(data.toString('utf-8'));
	for(var i=0;i<aa.length;i+=1){
	    console.log(aa[i].type + aa[i].cont);
	}
    });