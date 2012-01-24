;; add this to your .emacs if you want to use it -- improve if you can!

(defun mtl-command (cmd filename) (start-process "mtl" "*mtl-output*" "mtl" cmd filename))

(defun mtl-ls () (interactive)(mtl-command "ls" ""))
(defun mtl-log () (interactive)(mtl-command "log" (buffer-name)))
(defun mtl-store () (interactive)(mtl-command "store" (buffer-name)))
(defun mtl-diff () (interactive)(mtl-command "diff" (buffer-name)))

(provide '*mtl-output*)

(buffer-name)

(mtl-ls)

(global-set-key "\C-xjl" 'mtl-ls)
(global-set-key "\C-xjg" 'mtl-log)
(global-set-key "\C-xjs" 'mtl-store)
(global-set-key "\C-xjd" 'mtl-diff)
