(ns photo-front-end-front.api
  (:require [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]
            [cljs.reader :as reader]
            [reagent.core :as reagent :refer [atom]])
  (:require-macros [cljs.core.async.macros :refer [go]]))

(def project-list (reagent/atom {}))
(def picture-list (reagent/atom {}))
(def project-message (reagent/atom "-"))
(def api-root "http://localhost:31000/api")

(defn load-picture-list [yr mo pr]
  (go
    (let [response (<! (http/get (str api-root "/project/" yr "/" mo "/" pr)))]
      (reset! picture-list (reader/read-string (:body response))))))

(defn load-project-list []
  (go
    (let [project-response (<! (http/get (str api-root "/projects")))]
      (reset! project-list (reader/read-string (:body project-response))))))

(defn open-project [yr mo pr]
  (go
    (let [response (<! (http/get (str api-root "/open/project/" yr "/" mo "/" pr)))]
      (reset! project-message (:body response)))))
