#MTL DIALECT


##Line types

  #title1
  ##subtitle

  - todo
  + done
  ~ todo in near future
  * temporary note (doesn't get passed fwd)
  = persistent remark (gets passed fwd)


##Inline specifics

  #name/subname

  - todo :idea -- tag
  - @jana will todo -- peer, person
  (- todo for $client -- client, target)
  - todo !!! -- urgent level 3
  - todo => result -- final remark, result
  - todo [+++--] -- progress meter
  - todo [W] -- currently working on (continue work on)
  - todo (1) -- priority  
  (- todo [at 10:20] start working at specific time
  - todo [before 20:00] finish untill specific time
  - todo [took 2:00] how much time did it took)



##IDEAS FOR PARSER LEVEL COMMANDS

###diplays specific things

(titles 

done 

todo

remarks

notes

peers

clients

urgent)

find abc

sub #abc -- shows subdata related to #title abc

stats -- shows percentage done / undone and more


###modifies working file

focus #title

unfocus

(mark done - abab

mark todo + abab)


(add ##abba

add ##abba - asdasdasdasd as das

move sub #abba to newdoc

move doc somedox to doc)