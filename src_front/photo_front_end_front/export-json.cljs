(ns photo-front-end-front.export-json
  (:require [reagent.core :as reagent :refer [atom]]
            [re-com.core :as re]))

(defn dialog-markup
  [form-data process-ok process-cancel]
  [:div#modal
   [:h2 "Export Json"]
   [:label {:for "dive-centre"} "Dive centre"]
   [:input {:type "text"
            :value (:centre @form-data)
            :id "dive-centre"
            :on-change #(swap! form-data assoc :centre)}]
   [:label {:for "pf-password"} "File name"]
   [:input {:type "text"
            :value (:filename @form-data)
            :id "file-name"
            :on-change #(swap! form-data assoc :filename)}]
   [:div#buttons
    [:input {:type     "button"
             :value    "Export JSON"
             :id       "export-json-button"
             :class    "modal-button"
             :on-click process-ok}]
    [:input {:type     "button"
             :value    "Cancel"
             :id       "cancel-button"
             :class    "modal-button"
             :on-click process-cancel}]]])

(defn export-json
  "Create a button to test the modal component for modal dialogs"
  []
  (let [show?       (reagent/atom false)
        form-data      (reagent/atom {:centre      "Alpha"
                                      :filename    "testtttttt"})
        save-form-data (reagent/atom nil)
        process-ok     (fn [event]
                         (reset! show? false)
                         (println "Submitted form data: " @form-data)
                         ;; ***** PROCESS THE RETURNED DATA HERE
                         false) ;; Prevent default "GET" form submission (if used)
        process-cancel (fn [event]
                         (reset! form-data @save-form-data)
                         (reset! show? false)
                         (println "Cancelled form data: " @form-data)
                         false)]
    (fn []
      [:div
        [:input {:type "button"
                 :id "json-export"
                 :value "Export JSON"
                 :on-click #(do
                              (reset! save-form-data @form-data)
                              (reset! show? true))}]
       (when @show? [re/modal-panel
                     :backdrop-color   "grey"
                     :backdrop-opacity 0.6
                     :backdrop-on-click process-cancel
                     :child            [dialog-markup
                                        form-data
                                        process-ok
                                        process-cancel]])])))
