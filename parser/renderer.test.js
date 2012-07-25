var fs = require('fs');
var pp = require('./MTL_parser');
var jg = require('./jsGoo.9.js');
var rn = require('./renderer.js');

var sample = [{type:"#", cont:["this is title"]},{type:"-",cont:["this", " ", "is test", {t:"urgent",v:"3",r:"!!!"} ]}];
var sample2 = [
	       {
		   "type": "#",
		   "cont": [
         "TITLE"
      ]
	       },
	       {
		   "type": "sepa",
		   "cont": ""
	       },
	       {
		   "type": "##",
		   "cont": [
         "project"
      ]
	       },
	       {
		   "type": "-",
		   "cont": [
			    " ",
			    "twitter",
			    " ",
			    "tatt",
			    " ",
{
    "t": "urgent",
    "v": 3,
    "r": "!!!"
},
			    " ",
{
    "t": "work",
    "r": "W"
}
      ]
	       },
	       {
		   "type": "+",
		   "cont": [
			    " ",
			    "done",
			    " ",
         "done"
      ]
	       },
	       {
		   "type": "~",
		   "cont": [
			    " ",
			    "asdasdas",
			    "  ",
			    "asdasd",
{
    "t": "br"
},
			    "asdasd",
			    " ",
			    "asd",
			    " ",
         "asdasasd"
      ]
	       }
];

console.log(rn.render(sample2));

