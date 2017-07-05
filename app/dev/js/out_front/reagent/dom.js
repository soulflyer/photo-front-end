// Compiled by ClojureScript 1.9.473 {:elide-asserts true}
goog.provide('reagent.dom');
goog.require('cljs.core');
goog.require('cljsjs.react.dom');
goog.require('reagent.impl.util');
goog.require('reagent.impl.template');
goog.require('reagent.impl.batching');
goog.require('reagent.ratom');
goog.require('reagent.debug');
goog.require('reagent.interop');
if(typeof reagent.dom.imported !== 'undefined'){
} else {
reagent.dom.imported = null;
}
reagent.dom.module = (function reagent$dom$module(){
if(!((reagent.dom.imported == null))){
return reagent.dom.imported;
} else {
if(typeof ReactDOM !== 'undefined'){
return reagent.dom.imported = ReactDOM;
} else {
if(typeof require !== 'undefined'){
var or__6814__auto__ = reagent.dom.imported = require("react-dom");
if(cljs.core.truth_(or__6814__auto__)){
return or__6814__auto__;
} else {
throw (new Error("require('react-dom') failed"));
}
} else {
throw (new Error("js/ReactDOM is missing"));

}
}
}
});
if(typeof reagent.dom.roots !== 'undefined'){
} else {
reagent.dom.roots = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
reagent.dom.unmount_comp = (function reagent$dom$unmount_comp(container){
cljs.core.swap_BANG_.call(null,reagent.dom.roots,cljs.core.dissoc,container);

return (reagent.dom.module.call(null)["unmountComponentAtNode"])(container);
});
reagent.dom.render_comp = (function reagent$dom$render_comp(comp,container,callback){
var _STAR_always_update_STAR_10019 = reagent.impl.util._STAR_always_update_STAR_;
reagent.impl.util._STAR_always_update_STAR_ = true;

try{return (reagent.dom.module.call(null)["render"])(comp.call(null),container,((function (_STAR_always_update_STAR_10019){
return (function (){
var _STAR_always_update_STAR_10020 = reagent.impl.util._STAR_always_update_STAR_;
reagent.impl.util._STAR_always_update_STAR_ = false;

try{cljs.core.swap_BANG_.call(null,reagent.dom.roots,cljs.core.assoc,container,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [comp,container], null));

reagent.impl.batching.flush_after_render.call(null);

if(!((callback == null))){
return callback.call(null);
} else {
return null;
}
}finally {reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR_10020;
}});})(_STAR_always_update_STAR_10019))
);
}finally {reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR_10019;
}});
reagent.dom.re_render_component = (function reagent$dom$re_render_component(comp,container){
return reagent.dom.render_comp.call(null,comp,container,null);
});
/**
 * Render a Reagent component into the DOM. The first argument may be
 *   either a vector (using Reagent's Hiccup syntax), or a React element. The second argument should be a DOM node.
 * 
 *   Optionally takes a callback that is called when the component is in place.
 * 
 *   Returns the mounted component instance.
 */
reagent.dom.render = (function reagent$dom$render(var_args){
var args10021 = [];
var len__7923__auto___10024 = arguments.length;
var i__7924__auto___10025 = (0);
while(true){
if((i__7924__auto___10025 < len__7923__auto___10024)){
args10021.push((arguments[i__7924__auto___10025]));

var G__10026 = (i__7924__auto___10025 + (1));
i__7924__auto___10025 = G__10026;
continue;
} else {
}
break;
}

var G__10023 = args10021.length;
switch (G__10023) {
case 2:
return reagent.dom.render.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return reagent.dom.render.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args10021.length)].join('')));

}
});

reagent.dom.render.cljs$core$IFn$_invoke$arity$2 = (function (comp,container){
return reagent.dom.render.call(null,comp,container,null);
});

reagent.dom.render.cljs$core$IFn$_invoke$arity$3 = (function (comp,container,callback){
reagent.ratom.flush_BANG_.call(null);

var f = (function (){
return reagent.impl.template.as_element.call(null,((cljs.core.fn_QMARK_.call(null,comp))?comp.call(null):comp));
});
return reagent.dom.render_comp.call(null,f,container,callback);
});

reagent.dom.render.cljs$lang$maxFixedArity = 3;

reagent.dom.unmount_component_at_node = (function reagent$dom$unmount_component_at_node(container){
return reagent.dom.unmount_comp.call(null,container);
});
/**
 * Returns the root DOM node of a mounted component.
 */
reagent.dom.dom_node = (function reagent$dom$dom_node(this$){
return (reagent.dom.module.call(null)["findDOMNode"])(this$);
});
/**
 * Force re-rendering of all mounted Reagent components. This is
 *   probably only useful in a development environment, when you want to
 *   update components in response to some dynamic changes to code.
 * 
 *   Note that force-update-all may not update root components. This
 *   happens if a component 'foo' is mounted with `(render [foo])` (since
 *   functions are passed by value, and not by reference, in
 *   ClojureScript). To get around this you'll have to introduce a layer
 *   of indirection, for example by using `(render [#'foo])` instead.
 */
reagent.dom.force_update_all = (function reagent$dom$force_update_all(){
reagent.ratom.flush_BANG_.call(null);

var seq__10032_10036 = cljs.core.seq.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,reagent.dom.roots)));
var chunk__10033_10037 = null;
var count__10034_10038 = (0);
var i__10035_10039 = (0);
while(true){
if((i__10035_10039 < count__10034_10038)){
var v_10040 = cljs.core._nth.call(null,chunk__10033_10037,i__10035_10039);
cljs.core.apply.call(null,reagent.dom.re_render_component,v_10040);

var G__10041 = seq__10032_10036;
var G__10042 = chunk__10033_10037;
var G__10043 = count__10034_10038;
var G__10044 = (i__10035_10039 + (1));
seq__10032_10036 = G__10041;
chunk__10033_10037 = G__10042;
count__10034_10038 = G__10043;
i__10035_10039 = G__10044;
continue;
} else {
var temp__4657__auto___10045 = cljs.core.seq.call(null,seq__10032_10036);
if(temp__4657__auto___10045){
var seq__10032_10046__$1 = temp__4657__auto___10045;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10032_10046__$1)){
var c__7633__auto___10047 = cljs.core.chunk_first.call(null,seq__10032_10046__$1);
var G__10048 = cljs.core.chunk_rest.call(null,seq__10032_10046__$1);
var G__10049 = c__7633__auto___10047;
var G__10050 = cljs.core.count.call(null,c__7633__auto___10047);
var G__10051 = (0);
seq__10032_10036 = G__10048;
chunk__10033_10037 = G__10049;
count__10034_10038 = G__10050;
i__10035_10039 = G__10051;
continue;
} else {
var v_10052 = cljs.core.first.call(null,seq__10032_10046__$1);
cljs.core.apply.call(null,reagent.dom.re_render_component,v_10052);

var G__10053 = cljs.core.next.call(null,seq__10032_10046__$1);
var G__10054 = null;
var G__10055 = (0);
var G__10056 = (0);
seq__10032_10036 = G__10053;
chunk__10033_10037 = G__10054;
count__10034_10038 = G__10055;
i__10035_10039 = G__10056;
continue;
}
} else {
}
}
break;
}

return "Updated";
});

//# sourceMappingURL=dom.js.map