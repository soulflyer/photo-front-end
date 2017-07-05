// Compiled by ClojureScript 1.9.473 {:elide-asserts true}
goog.provide('photo_front_end_front.core');
goog.require('cljs.core');
goog.require('reagent.core');
if(typeof photo_front_end_front.core.state !== 'undefined'){
} else {
photo_front_end_front.core.state = reagent.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),"Hello Reagent world"], null));
}
photo_front_end_front.core.root_component = (function photo_front_end_front$core$root_component(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,photo_front_end_front.core.state)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"with figwheel!"], null)], null);
});
photo_front_end_front.core.mount_root = (function photo_front_end_front$core$mount_root(setting){
return reagent.core.render.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [photo_front_end_front.core.root_component], null),document.getElementById("app"));
});
photo_front_end_front.core.init_BANG_ = (function photo_front_end_front$core$init_BANG_(setting){
return photo_front_end_front.core.mount_root.call(null,setting);
});

//# sourceMappingURL=core.js.map