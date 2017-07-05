// Compiled by ClojureScript 1.9.473 {:elide-asserts true}
goog.provide('reagent.debug');
goog.require('cljs.core');
reagent.debug.has_console = typeof console !== 'undefined';
reagent.debug.tracking = false;
if(typeof reagent.debug.warnings !== 'undefined'){
} else {
reagent.debug.warnings = cljs.core.atom.call(null,null);
}
if(typeof reagent.debug.track_console !== 'undefined'){
} else {
reagent.debug.track_console = (function (){var o = ({});
o.warn = ((function (o){
return (function() { 
var G__12380__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",-436710552)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__12380 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__12381__i = 0, G__12381__a = new Array(arguments.length -  0);
while (G__12381__i < G__12381__a.length) {G__12381__a[G__12381__i] = arguments[G__12381__i + 0]; ++G__12381__i;}
  args = new cljs.core.IndexedSeq(G__12381__a,0);
} 
return G__12380__delegate.call(this,args);};
G__12380.cljs$lang$maxFixedArity = 0;
G__12380.cljs$lang$applyTo = (function (arglist__12382){
var args = cljs.core.seq(arglist__12382);
return G__12380__delegate(args);
});
G__12380.cljs$core$IFn$_invoke$arity$variadic = G__12380__delegate;
return G__12380;
})()
;})(o))
;

o.error = ((function (o){
return (function() { 
var G__12383__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",-978969032)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__12383 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__12384__i = 0, G__12384__a = new Array(arguments.length -  0);
while (G__12384__i < G__12384__a.length) {G__12384__a[G__12384__i] = arguments[G__12384__i + 0]; ++G__12384__i;}
  args = new cljs.core.IndexedSeq(G__12384__a,0);
} 
return G__12383__delegate.call(this,args);};
G__12383.cljs$lang$maxFixedArity = 0;
G__12383.cljs$lang$applyTo = (function (arglist__12385){
var args = cljs.core.seq(arglist__12385);
return G__12383__delegate(args);
});
G__12383.cljs$core$IFn$_invoke$arity$variadic = G__12383__delegate;
return G__12383;
})()
;})(o))
;

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
reagent.debug.tracking = true;

cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

f.call(null);

var warns = cljs.core.deref.call(null,reagent.debug.warnings);
cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

reagent.debug.tracking = false;

return warns;
});
