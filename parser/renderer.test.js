var fs = require('fs');
var pp = require('./MTL_parser');
var jg = require('./jsGoo.9.js');
var rn = require('./renderer.js');

var sample = [{type:"#", cont:["this is title"]},{type:"-",cont:["this", " ", "is test", {t:"urgent",v:"3",r:"!!!"} ]}];
var sample2 = [
	       "asd",
   [
      [
         [
{
    "type": "-",
    "cont": [
                  "asdasd"
               ]
}
         ]
       ],
      "",
      [
       "asdsd",
         [
{
    "type": "-",
    "cont": [
	     " ",
                  "asdasd"
               ]
}
         ]
      ]
    ],
	       "title",
   [
      [
         [
{
    "type": "-",
    "cont": [
	     " ",
                  "asdasd"
               ]
}
	  ],
         "ST",
         [
{
    "type": "-",
    "cont": [
	     " ",
	     "asdasd",
	     " ",
                  "1"
               ]
},
{
    "type": "-",
    "cont": [
	     " ",
	     "asdas",
	     " ",
                  "32"
               ]
}
         ]
      ]
    ],
   "asd"
];

//console.log(rn.render(sample2));
console.log(rn.renderTpl(sample2));

