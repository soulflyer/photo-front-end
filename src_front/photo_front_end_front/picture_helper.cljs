(ns photo-front-end-front.picture-helper
  (:require [photo-front-end-front.api :refer [picture-list
                                               project-message
                                               pic-columns
                                               highlighted-pic]])
  (:require-macros [cljs.core.async.macros :refer [go]]))

(defn clear-all
  "de-selects all the photos"
  []
    (go (let [pl (sort (keys @picture-list))]
     (doall (for [pic pl]
              (swap! picture-list assoc pic false))
            (reset! project-message (str "Select all"))))))

(defn select-all
  "selects all the photos"
  []
  (go (let [pl (sort (keys @picture-list))]
     (doall (for [pic pl]
              (swap! picture-list assoc pic true))
            (reset! project-message (str "Select all"))))))

(defn highlight-pic
  "Highlights/focuses a given pic"
  [pic-number]
  (reset! highlighted-pic pic-number))

(defn get-pic
  "Returns a pic name given an index"
  [ind]
  (get (vec (keys @picture-list)) ind))

(defn select-pic
  [ind]
  (let [pic (get-pic ind)]
    (swap! picture-list assoc pic true)))

(defn select-highlighted-pic []
  (let [pic (get-pic @highlighted-pic)]
    (swap! picture-list assoc pic true)))

(defn pic-down
  "Highlights/focuses the pic below the current one"
  []
  (let [new (+ @highlighted-pic @pic-columns)
        max (dec (count @picture-list))]
    (reset! highlighted-pic (min new max))))

(defn pic-up
  "Highlights/focuses the pic above the current one"
  []
  (let [new (- @highlighted-pic @pic-columns)]
    (reset! highlighted-pic (max 0 new))))

(defn pic-left
  "Highlights/focuses pic to the left of the current one"
  []
  (let [new (dec @highlighted-pic)]
    (reset! highlighted-pic (max 0 new))))

(defn pic-right
  "Highlights/focuses pic to the right of the current one"
  []
  (let [new (inc @highlighted-pic)
        max (dec (count @picture-list))]
    (reset! highlighted-pic (min new max))))

(defn shift-pic-down
  []
  (let [new (+ @highlighted-pic @pic-columns)
        start @highlighted-pic
        mx (dec (count @picture-list))
        end (min new mx)]
    (doall (for [pic (range start end)]
       (select-pic pic)))
    (reset! highlighted-pic end)))
