(ns photo-front-end-front.api
  (:require [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]
            [cljs.reader :as reader]
            [reagent.core :as reagent :refer [atom]]
            [cemerick.url :refer [url-encode]]
            [photo-front-end-front.helpers :refer [selected]])
  (:require-macros [cljs.core.async.macros :refer [go]]))

(def project-list (reagent/atom {}))
(def picture-list (reagent/atom {}))
(def project-message (reagent/atom "-"))
(def thumbnail-directory (reagent/atom ""))

(def api-root "http://localhost:31000/api")

(defn load-picture-list [yr mo pr]
  (reset! picture-list {})
  (go
    (let [response (<! (http/get (str api-root "/project/" yr "/" mo "/" pr)))]
      (reset! picture-list (zipmap (reader/read-string (:body response)) (repeat nil))))))

(defn load-project-list []
  (go
    (let [project-response (<! (http/get (str api-root "/projects")))]
      (reset! project-list (reader/read-string (:body project-response))))))

(defn load-preferences []
  (go
    (let [response (<! (http/get (str api-root "/preferences/thumbnail-directory")))]
      (reset! thumbnail-directory (:body response)))))

(defn open-project [yr mo pr]
  (go
    (let [response (<! (http/get (str api-root "/open/project/" yr "/" mo "/" pr)))]
      (reset! project-message (:body response)))))

(defn massage-picture-list
  "turns a list of pictures into a single string for inclusion in a url"
  [pic-list]
  (url-encode (str "\"" (reduce str (interpose " " pic-list)) "\"")))

(defn export-json
  "sends the list of selected pictures to the api for export as json"
  [divecentre filename]
  (go
    (let [response (<!
                     (http/get
                       (str api-root "/build/json/" divecentre "/" filename "/"
                            (massage-picture-list (selected @picture-list)))))]
      (reset! project-message (:body response)))))

(defn open-external
  "opens the selected pictures in an external viewer"
  []
  (reset! project-message "open external"))

(defn clear-all
  "de-selects all the photos"
  []
  (reset! project-message "clear all"))

(defn select-all
  "selects all the photos"
  []
  (go (let [pl (sort (keys @picture-list))]
     (doall (for [pic pl]
              (swap! picture-list assoc pic true))
            (reset! project-message (str "Select all"))))))
