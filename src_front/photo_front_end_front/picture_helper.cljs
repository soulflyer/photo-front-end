(ns photo-front-end-front.picture-helper
  (:require [photo-front-end-front.api :refer [picture-list
                                               project-message
                                               pic-columns
                                               highlighted-pic]]
            [enfocus.core :as ef])
  (:require-macros [cljs.core.async.macros :refer [go]]
                   [enfocus.macros :as em]))

(em/defaction focus [pic] (str ".pic" pic) (ef/focus))

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
  (get (vec (sort (keys @picture-list))) ind))

(defn select-pic
  [ind]
  (let [pic (get-pic ind)]
    (swap! picture-list assoc pic true)))

(defn toggle-pic [ind]
  (let [pic (get-pic ind)]
    (if (@picture-list pic)
      (swap! picture-list assoc pic false)
      (swap! picture-list assoc pic true))))

(defn select-highlighted-pic []
  (let [pic (get-pic @highlighted-pic)]
    (swap! picture-list assoc pic true)))

(defn toggle-highlighted-pic []
  (toggle-pic @highlighted-pic))

(defn pic-down
  "Highlights/focuses the pic below the current one"
  []
  (let [next (+ @highlighted-pic @pic-columns)
        max (dec (count @picture-list))
        new (min next max)]
    (reset! highlighted-pic new)
    (focus new)))

(defn pic-up
  "Highlights/focuses the pic above the current one"
  []
  (let [next (- @highlighted-pic @pic-columns)
        new (max 0 next)]
    (reset! highlighted-pic new)
    (focus new)))

(defn pic-left
  "Highlights/focuses pic to the left of the current one"
  []
  (let [next (dec @highlighted-pic)
        new (max 0 next)]
    (reset! highlighted-pic new)
    (focus new)))

(defn pic-right
  "Highlights/focuses pic to the right of the current one"
  []
  (let [next (inc @highlighted-pic)
        max (dec (count @picture-list))
        new (min next max)]
    (reset! highlighted-pic new)
    (focus new)))

(defn shift-pic-down []
  (let [new (+ @highlighted-pic @pic-columns)
        start @highlighted-pic
        mx (count @picture-list)
        end (min new mx)]
    (doall (for [pic (range start end)]
       (toggle-pic pic)))
    (reset! highlighted-pic end )))

(defn shift-pic-up []
  (let [new (- @highlighted-pic @pic-columns)
        end (- @highlighted-pic 0)
        start (max 0 new)]
    (doall (for [pic (range start end)]
             (toggle-pic pic)))
    (reset! highlighted-pic start)))

(defn shift-pic-right []
  (let [new (inc @highlighted-pic)
        mx  (dec (count @picture-list))
        end (min new mx)]
    (toggle-pic @highlighted-pic)
    (reset! highlighted-pic end)))

(defn shift-pic-left []
  (let [new (dec @highlighted-pic)
        end (max new 0)]
    (toggle-pic @highlighted-pic)
    (reset! highlighted-pic end)))
