;; This buffer is for notes you don't want to save, and for Lisp evaluation.
;; If you want to create a file, visit that file with C-x C-f,
;; then enter the text in that file's own buffer.

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