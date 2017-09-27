(ns photo-front-end-front.api
  (:require [cemerick.url :refer [url-encode]]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]
            [cljs.reader :as reader]
            [photo-front-end-front.helpers :refer [selected]]
            [reagent.core :as reagent])
  (:require-macros [cljs.core.async.macros :refer [go]]))

(def project-list (reagent/atom {}))
(def picture-list (reagent/atom {}))
(def project-message (reagent/atom "-"))
(def thumbnail-directory (reagent/atom ""))
(def highlighted-pic (reagent/atom 0))
(def pic-columns (reagent/atom 7))

(def api-root "http://localhost:3000/api")

(defn load-picture-list [yr mo pr]
  (reset! picture-list {})
  (go
    (let [response (<! (http/get (str api-root "/project/" yr "/" mo "/" pr)))
          keys (reader/read-string (:body response))]
      (reset! picture-list (zipmap
                             keys
;;                             (reader/read-string (:body response))
                             (repeat nil))))))

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
