(ns photo-front-end-front.api
  (:require [cemerick.url :refer [url-encode]]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]
            [cljs.reader :as reader]
            [cognitect.transit :as json]
            [photo-front-end-front.helpers :refer [selected
                                                   image-path
                                                   csv
                                                   un-csv
                                                   image-id]]
            [reagent.core :as reagent])
  (:require-macros [cljs.core.async.macros :refer [go]]))

(def project-list (reagent/atom {}))
(def picture-list (reagent/atom {}))
(def picture-details (reagent/atom {}))
(def project-message (reagent/atom "-"))
;;(def thumbnail-directory (reagent/atom ""))
(def medium-directory (reagent/atom ""))
(def highlighted-pic (reagent/atom 0))
(def pic-columns (reagent/atom 4))
(def current-project (reagent/atom ""))
(def selected-tab (reagent/atom :projects))

;;Production API
(def api-root "http://localhost:31000/api")
;;Development API
;;(def api-root "http://localhost:31000/api")

(def keyword-buttons (reagent/atom ["empty"]))
(def r (json/reader :json))

(defn load-preference [store pref]
  (go
    (let [response (<! (http/get (str api-root "/preferences/" pref)))]
      (reset! store (:body response)))))

(defn set-preference [pref val]
  (go
    (let [response (<!
                     (http/get
                       (str api-root "/preferences/set/" pref "/" (url-encode val))))]
      (:body response))))

(defn load-button-list []
  (load-preference keyword-buttons "keyword-button-list"))

(defn load-picture-list [pr]
  (go
    (let [response (<! (http/get (str api-root "/project/" pr)))
          pics (json/read r (:body response)) ]
      (reset! picture-details pics)
      (set-preference "current-project" pr)
      (reset! current-project pr)
      (reset! picture-list (zipmap (for [pic pics] (image-path pic)) (repeat nil))))))

(defn load-project-list []
  (go
    (let [project-response (<! (http/get (str api-root "/projects")))]
      (reset! project-list (reader/read-string (:body project-response))))))

(defn open-project [yr mo pr]
  (go
    (let [response (<! (http/get (str api-root "/open/project/" yr "/" mo "/" pr)))]
      (reset! project-message (:body response)))))

(defn massage-picture-list
  "turns a list of pictures into a single string for inclusion in a url"
  [pic-list]
  (url-encode (reduce str (interpose " " pic-list))))

(defn export-json
  "sends the list of selected pictures to the api for export as json"
  [divecentre filename]
  (go
    (let [response (<! (http/get
                         (str api-root "/build/json/" divecentre "/" filename "/"
                              (massage-picture-list (selected @picture-list)))))]
      (reset! project-message (:body response)))))

(defn open-external
  "opens the selected pictures in an external viewer"
  []
  (go
    (let [response (<! (http/get
                         (str api-root "/open/medium/"
                              (massage-picture-list (selected @picture-list)))))
          resp (:body response)]
      (reset! project-message resp))))

(defn add-keyword [kw]
  (go
    (let [response (<! (http/get
                         (str api-root "/photos/add/keyword/" kw "/"
                              (massage-picture-list
                                (map image-id (selected @picture-list))))))
          resp (:body response)]
      (reset! project-message (str "**** " resp)))))
