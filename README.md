#mtl

**!!!THIS IS HEAVILY WORK IN PROGRESS!!!**

Simple bash/*ix based backend for notes/todo tool for my work. Inspired partially by `how I imagine Git works`. 

On top of it a parser will be built based on ideas from http://www.qwikitodo.com and other prototypes I made.


##State

We are making the basic backend work. On a proof of concept level we prooved it can work OK, so we are making it 
usable so we can start using as soon as possible (and then develop further). 

##Few sample workflows

My daily todos:

      #check out what we did yesterday
      cd ~
      mtl cat done :yday
      mtl cat tood :yday

      #ectract not done stuff to todays todo
      mtl cat todo :yday to :today
      mtl link :today
      emacs 2012-01-27

Few todos for some project, shared w/ another person:

     #go to directory of the project
     cd Work/ProjectSome
     #check out which todos we have
     mtl ls
     mtl cat code
     mtl cat design | less

     #edit the desing todo then sync it with central repo (that designer uses too)
     emacs design
     sync design with repo@someserv.com:~/ProjectSome

File versioning, how to access past versions:

     #done
     mtl cat :today~1
     mtl cat :today~2 done
     mtl cat :today~2 to :tomorrow
     
     #todo
     mtl diff :today~~5
     mtl diff :today~3~5

     mtl get :today~2


##Current commands

Things will of course get streamlined and automated as much as it makes sense. This is heavily WIP!

	  # cd to the dir of your project and start
	  mtl init   	    	#creates the .mtl dir structure
	  mtl create work	#creates doc work in .mtl dir and index/src files
	  mtl link work 	#creates a local symlink to the doc so you can edit it like local file

	  # work on todo
	  emacs work		#edit the file
	  mtl store work	#store the changes again
	  mtl diff work		#compare the working file with last stored
	  mtl log work		#show the log of stores
	  mtl cat work		#cat the last stored version (TODO: same numbers logic as diff and get)

	  # previous stores
	  mtl diff work 0	#compare working to last stored
	  mtl diff work 0 1	#compare the last 2 stored
	  mtl get work	  	#set working version from the last stored version
	  mtl get work 1	#set working version from previously stored version

	  # more docs
	  mtl ls		#list the docs
	  mtl cat todo doc	#cat extraction of doc (extract is doc without done items)
	  mtl cat todo doc to doc2 	#extract todo items from yesterday to today
	  mtl cat notes doc	     	#see the notes in some doc
	  mtl cat done doc	     	#see the done things in some doc

	  # daily use
	  mtl create :today
	  mtl link :today
	  mtl cat :yesterday
	  mtl cat :tomorrow

	  #clone (from) and clone to repo (locally and remotely)
	  mtl clone from ../projectY				# clone whole repo (all docs)
	  mtl clone from projectx@work.com:~/repo		
	  mtl clone to projectx@work.com:~/newrepo
	  mtl clone doc to repo@someserv.com:~/myrepodoc	# clone specific document to some repo

	  #sync two repos (locally or remotely)
	  mtl sync ../projectx/work				#2way sync all docs with another repo
	  mtl sync projectx@work.com:~/work			#2way sync all docs with remote repo over ssh
	  mtl sync designtodo projectx@host.com:~/projectxcoop  #sync specific doc to the remote repo
	  

##Current plans

+ improve all commands, add minimal argchecking (done)
+ start using! (done)
+ make some basic emacs mode for mtl and notes/todos dialect (done)
- figure out how to merge and what to do on conflicts, the exact workflow and messaging
- work on sync, merge so co-op mode will become usable!!
- make a dialect parser for notes/todos (this will enable additional context related commands)
- think how to streamline/automate commands
- make tests!!

##Platforms

Runs on Linux and Cygwin (should work on macs too.. if you try please report).

##License

GNU GPL v2
