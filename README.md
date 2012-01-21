#J4M

**!!!THIS IS HEAVILY WORK IN PROGRESS!!!**

Simple bash/*ix based backend for notes/todo tool for my work. Inspired partially by `how I imagine Git works`. 

On top of it a parser will be built based on ideas from http://www.qwikitodo.com and other prototypes I made.


##State

We are making the basic backend work. On a proof of concept level we prooved it can work OK, so we are making it 
usable so we can start using as soon as possible (and then develop further). 


##Current commands

Things will of course get streamlined and automated as much as it makes sense. This is heavily WIP!

	  # cd to the dir of your project and start
	  j4m init   	    	#creates the .j4m dir structure
	  j4m create work	#creates doc work in .j4m dir and index/src files
	  j4m link work 	#creates a local symlink to the doc so you can edit it like local file

	  # work on todo
	  emacs work		#edit the file
	  j4m store work	#store the changes again
	  j4m diff work		#compare the working file with last stored
	  j4m log work		#show the log of stores
	  j4m cat work		#cat the last stored version (TODO: same numbers logic as diff and get)

	  # previous stores
	  j4m diff work 0	#compare working to last stored
	  j4m diff work 0 1	#compare the last 2 stored
	  j4m get work	  	#set working version from the last stored version
	  j4m get work 1	#set working version from previously stored version

	  # more docs
	  j4m ls		#list the docs
	  j4m extract doc	#cat extraction of doc (extract is doc without done items)
	  j4m extract doc to doc2 	  

	  # daily use
	  j4m create :today
	  j4m link :today
	  j4m cat :yesterday
	  j4m cat :tomorrow

	  #clone (from) and clone to repo (locally and remotely)
	  j4m clone ../projectY
	  j4m clone projectx@work.com:~/repo
	  j4m clone to projectx@work.com:~/newrepo

	  #sync two repos (locally or remotely)
	  j4m sync ../projectx/work	  	#2way sync all docs with another repo
	  j4m sync projectx@work.com:~/work	#2way sync all docs with remote repo over ssh


##Current plans

+ improve all commands, add minimal argchecking (done)
+ start using! (done)
+ make some basic emacs mode for j4m and notes/todos dialect (done)
- figure out how to merge and what to do on conflicts, the exact workflow and messaging
- work on sync, merge so co-op mode will become usable!!
- make a dialect parser for notes/todos (this will enable additional context related commands)
- think how to streamline/automate commands
- make tests!!

##Platforms

Runs on Linux and Cygwin (should work on macs too.. if you try please report).

##License

GNU GPL v2