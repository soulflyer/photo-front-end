(ns photo-front-end-front.keys
  (:require [keybind.core :as key]
            [photo-front-end-front.picture-helper
             :refer [pic-down
                     pic-left
                     pic-right
                     pic-up
                     shift-pic-down
                     select-highlighted-pic]]))

(defn bind-keys []
  (key/bind! "up" ::pic-up pic-up)
  (key/bind! "down" ::pic-down pic-down)
  (key/bind! "left" ::pic-left pic-left)
  (key/bind! "right" ::pic-right pic-right)
  (key/bind! "shift-down" ::shift-pic-down shift-pic-down)
  (key/bind! "shift-up" ::shift-pic-down pic-up)
  (key/bind! "shift-left" ::shift-pic-down pic-left)
  (key/bind! "shift-right" ::shift-pic-down pic-right)
  (key/bind! "enter" ::select-pic select-highlighted-pic))
