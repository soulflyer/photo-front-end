(ns photo-front-end-front.keys
  (:require [keybind.core :as key]
            [photo-front-end-front.picture-helper
             :refer [pic-down
                     pic-left
                     pic-right
                     pic-up
                     shift-pic-down
                     shift-pic-up
                     shift-pic-right
                     shift-pic-left
                     toggle-highlighted-pic
                     select-all
                     clear-all]]))

(defn bind-keys []
  (key/bind! "up" ::pic-up pic-up)
  (key/bind! "down" ::pic-down pic-down)
  (key/bind! "left" ::pic-left pic-left)
  (key/bind! "right" ::pic-right pic-right)
  (key/bind! "shift-down" ::shift-pic-down shift-pic-down)
  (key/bind! "shift-up" ::shift-pic-up shift-pic-up)
  (key/bind! "shift-left" ::shift-pic-left shift-pic-left)
  (key/bind! "shift-right" ::shift-pic-right shift-pic-right)
  (key/bind! "enter" ::select-pic toggle-highlighted-pic)
  (key/bind! "ctrl-a" ::select-all select-all)
  (key/bind! "ctrl-d" ::clear-all clear-all))
