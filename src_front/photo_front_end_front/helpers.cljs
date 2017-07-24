(ns photo-front-end-front.helpers)

(defn project-vector [project-string]
  [(subs project-string 0 4)
   (subs project-string 4 6)
   (subs project-string 6)])

(defn version-name
  "Cuts the extension off the end of a string and anything before the last /"
  [filename]
  (let [index-dot (if (= -1 (.lastIndexOf filename "."))
                    (count filename)
                    (.lastIndexOf filename "."))
        index-slash (max 0 (+ 1 (.lastIndexOf filename "/")))]
    (if (< 0 index-dot)
      (subs filename index-slash index-dot)
      filename)))

(defn project-name
  "cuts the last part of the pathname off to leave yyyy/mm/project-name"
  [filename]
  (let [index-slash (.lastIndexOf filename "/")]
    (if (< 0 index-slash)
      (subs filename 0 index-slash)
      filename)))

(defn image-id
  "removes slashes and file extension from an image pathname"
  [filepath]
  (let [path (project-name filepath)
        pathid (reduce str (.split path "/"))
        img  (version-name filepath)]
    (str pathid img)))
