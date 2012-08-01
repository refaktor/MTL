var fs = require('fs');
var pp = require('./MTL_parser');
var jg = require('./jsGoo.9.js');
var rn = require('./renderer.js');

var sample = [{type:"#", cont:["this is title"]},{type:"-",cont:["this", " ", "is test", {t:"urgent",v:"3",r:"!!!"} ]}];
var sample2 = [
	       "My Todo",
   [
      [
         [
{
    "type": "",
    "cont": [
	     "My",
	     " ",
	     "point",
	     " ",
	     "today",
	     " ",
	     "is",
	     " ",
	     "this",
	     " ",
	     "and",
	     " ",
	     "that",
                  "."
               ]
}
         ]
       ],
      "",
      [
       "project A",
         [
{
    "type": "-",
    "cont": [
	     " ",
	     "you",
	     " ",
	     "should",
	     " ",
	     "do",
	     " ",
	     "this",
	     " ",
	     "today",
	     " ",
{
    "t": "urgent",
    "v": 3,
    "r": "!!!"
}
               ]
},
{
    "type": "-",
    "cont": [
	     " ",
	     "what",
	     " ",
	     "are",
	     " ",
	     "the",
	     " ",
	     "best",
	     " ",
	     "moments",
	     ", ",
	     "if",
	     " ",
	     "listeners",
	     " ",
	     "send",
	     " ",
                  "in"
               ]
},
{
    "type": "+",
    "cont": [
	     " ",
	     "this",
	     " ",
	     "sounds",
	     " ",
	     "crazy",
	     ", ",
	     "true",
	     " ",
	     "respect",
	     " ",
	     "to",
	     " ",
	     "the",
	     " ",
                  "ladies"
               ]
},
{
    "type": "+",
    "cont": [
	     " ",
	     "I",
	     " ",
	     "dont",
	     " ",
	     "know",
                  " "
               ]
},
{
    "type": "~",
    "cont": [
	     " ",
	     "Quantum",
	     " ",
	     "mechanics",
	     " ",
	     "and",
	     " ",
	     "quantum",
	     " ",
                  "computation"
               ]
}
         ]
      ]
   ]
];

//console.log(rn.render(sample2));
console.log(rn.renderTpl(sample2));

