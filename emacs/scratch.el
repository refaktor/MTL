;; add this to your .emacs if you want to use it -- improve if you can!

(defun j4m-command (cmd filename) (start-process "j4m" "*j4m-output*" "j4m" cmd filename))

(defun j4m-ls () (interactive)(j4m-command "ls" ""))
(defun j4m-log () (interactive)(j4m-command "log" (buffer-name)))
(defun j4m-store () (interactive)(j4m-command "store" (buffer-name)))
(defun j4m-diff () (interactive)(j4m-command "diff" (buffer-name)))

(provide '*j4m-output*)

(buffer-name)

(j4m-ls)

(global-set-key "\C-xjl" 'j4m-ls)
(global-set-key "\C-xjg" 'j4m-log)
(global-set-key "\C-xjs" 'j4m-store)
(global-set-key "\C-xjd" 'j4m-diff)