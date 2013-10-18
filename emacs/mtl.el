;; This buffer is for notes you don't want to save, and for Lisp evaluation.
;; If you want to create a file, visit that file with C-x C-f,
;; then enter the text in that file's own buffer.

(custom-set-faces
 '(default ((t (:inherit nil :height 113 :family "DejaVu Sans Mono"))))
 '(font-lock-builtin-face ((nil (:foreground "#7F0055" :weight bold))))
 '(font-lock-keyword-face ((nil (:foreground "#7F0055" :weight bold))))
 '(font-lock-comment-face ((nil (:foreground "#3F7F5F"))))
 '(font-lock-string-face ((nil (:foreground "#2A00FF"))))
  '(font-lock-type-face ((nil (:foreground "white")))) ;;;;;((t (:underline t :slant italic :foreground "#000000"))))
 '(font-lock-constant-face ((t (:foreground "#77EEFF"))))
 '(font-lock-variable-name-face ((t (:foreground "#AAAAAA"))))
 '(font-lock-function-name-face ((t (:weight bold)))))

;(custom-set-faces
; '(default ((t (:inherit nil :height 113 :family "DejaVu Sans Mono"))))
; '(font-lock-type-face ((t (:foreground "#999999")))))

; list-colors-display


;; (set-face-background 'mode-line "DarkOrange2")

;; (set-face-foreground 'mode-line "ivory")

;; (font-lock-add-keywords 'c-mode
;;      '(("\\<\\(FIXME\\):" 1 font-lock-warning-face prepend)
;;        ("\\<\\(and\\|or\\|not\\)\\>" . font-lock-keyword-face)))


(defvar mtl-font-lock-defaults nil "Value for font-lock-defaults.")

(setq mtl-font-lock-defaults
      '(("^+\\( .+?\\)$" . (1 font-lock-comment-face))
      	("^-\\( .+?\\)$" . (1 font-lock-function-name-face))
        ("^~\\( .+?\\)$" . (1 font-lock-string-face))
        ("^\\(#.+?\\)$" . (1 font-lock-constant-face))
        ("^\\(\\. .+?\\)$" . (1 font-lock-variable-name-face))
        ("^\\(\\.\\..+?\\)$" . (1 font-lock-type-face))
        ) )

(defun show-actual ()
  "turn line to +"
  (interactive)
  (hide-lines-not-matching "^[-\\+\\#]"))


(defun mtl-plus-line ()
  "turn line to +"
  (interactive)
  (setq pos (point))
  (goto-char (line-beginning-position))
  (delete-char 1)
  (insert "+")
  (goto-char pos))

(global-set-key (kbd "C-c C-t") 'mtl-plus-line) 


(defun mtl-next-todo ()
  "turn line to +"
  (interactive)
  (re-search-forward "^\\- "))

(defun mtl-next-done ()
  "turn line to +"
  (interactive)
  (re-search-forward "^\\+ "))

(global-set-key (kbd "C-c C-n") 'mtl-next-todo) 
(global-set-key (kbd "C-c C-m") 'mtl-next-done) 

;; idea as in org mode .. rotate item later -> todo - > done ...(maybe fwd bkd)

(define-derived-mode mtl-mode fundamental-mode
  (setq font-lock-defaults '(mtl-font-lock-defaults))
  (setq mode-name "MTL")
  )

(provide 'mtl)
