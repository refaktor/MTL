#MTL

*!THIS IS WORK IN PROGRESS!*

Simple bash based backend for notes/todo tool for my work. Imagine it as very dumb git :).

##Core goals / ideas

- Your todos/notes should be where your work is (in the directory of your project) or if it's todo for You (generally) in your home directory
- Your todos should give you not just direction for the future, but overview of your past
- Your todos should work well in in-zone state of mind (for me that means no clicking around, nowysiwyg, writing them in the same environment as I code my code)
- I *TRY* to use functional prog. principles (like immutability) and old Unix soul to gain simplicity of mechanics, implementation and workflow ;)

##State

I am using it for my daily todo-s for 2 years now. I linked it to a dropbox folder so I have it synced on all my 
computers, so the syncing code will be removed. For todo, a propper parser should be finished, then we could add 
propper TODO/List specific MTL commands.

##Few example workflows

###My daily routine for TODO-s

In the morning before work:

      cd ~
      mtl daily fwd #extracts undone stuff from yesterday to todays todo, unlinks the yesterdays todo
      emacs 20<tab> #opens todays file for example 2013-08-23
	
At the end of day (could store state in the meantime):
	
      mtl store :today


###One-off documents with tracking of changes, etc

We create the document and start writing:

      cd ~
      mtl create my-book
      mtl link my-book
      emacs my-book
	
After some writing:

      mtl store my-book "Wrote the first chapter"

After few days of writing:

      mtl log my-book
      mtl diff my-book 1 #compare working doc to previously stored version
      emacs my-book
      ...
      


###.
###.
###.
###.
###.
###Older docs
###.
###.
###.
###.
###.

###Personal daily todos

We have one personal todo per day in our home folder. Each day we create new one from what was left undone
from the day before (and from planned things for immediate future "~").

A new day, you go to your home dir and check out what you have done yesterday, and what was left undone:

      cd ~
      mtl cat done :yesterday
      mtl cat todonow :yesterday

Then you extract undone things, store the new file, link it and (because we added unlink at the end) unlink the todo of previous day:

      mtl extract :yesterday to :today unlink

During the day you edit the daily todo, and store modifications when you wish (there are shortucts to do it inside emacs or vim):
      
      emacs 2012-02-14
      mtl store :today

###Multiple todos/docs for a project

We have multiple continious (not daily) todos for our project ABC. Let's go into it's directory and look at what todos are there.

     cd Work/ABC
     mtl ls			#shows 'code' and 'design' docs
     mtl cat code
     mtl cat design | less

Is there anything urgent in the design todo? Where are we with code todo?

     mtl cat design urgent	#is there anything urgent in design todo?	
     mtl log code   		#see the history of code todo
     mtl cat code todo		#see what's there to do in code

Start working on code, store between changes (usually done from within emacs / 
      
      emacs code
      mtl store code


###Cooperating on a todo

From previous example. We cooperate with a designer. So let's check if he has made any changes to his todo.

     mtl sync design from janko@projabc.net:~/mojcas-repo

The design todo merged with his changes, let's check the changes and if we like it we can store it.

     mtl diff design
     mtl store design


We add new task to his todo, and mirror changes to our online mirror so he will be able to get it.

       emacs design        #add another task
       mtl mirror design to janko@projabc.net:~/my-repo


##Commands dictionary

###Doc naming conventions

:today - gets changed with date of today (2012-02-12 - usefull for daily todos/notes)

:yesterday , :yday - get exchanged with date of yesterday

:tomorrow - the same

doc~w - working version

doc, doc~, doc~0 - last stored version

doc~1 , doc~N - previous, version N stores back 

###log

     mtl log doc

###cat

cat whole doc

     mtl cat doc
     mtl cat today
     mtl cat today~w
     mtl cat today~5 

cat with filters

     mtl cat doc done
     mtl cat doc todo
     mtl cat doc todonow
     mtl cat doc urgent

cat to another doc
     
     mtl cat doc todo to doc2
     mtl cat :yday todo to :today

###...more to come...

##Platforms

Runs on Linux and Cygwin (should work on macs too.. if you try please report).

##License

GNU GPL v2

###.
###.
###.
###.
###.
###Yer older docs
###.
###.
###.
###.
###.

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

	  #copy (from) and copy to repo (locally and remotely)
	  mtl copy from ../projectY				# copy whole repo (all docs)
	  mtl copy from projectx@work.com:~/repo		
	  mtl copy to projectx@work.com:~/newrepo
	  mtl copy doc to repo@someserv.com:~/myrepodoc	# copy specific document to some repo

	  #sync two repos (locally or remotely)
	  mtl sync ../projectx/work				#2way sync all docs with another repo
	  mtl sync projectx@work.com:~/work			#2way sync all docs with remote repo over ssh
	  mtl sync designtodo projectx@host.com:~/projectxcoop  #sync specific doc to the remote repo
	  
