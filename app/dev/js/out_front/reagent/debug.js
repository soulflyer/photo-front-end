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
var G__9576__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",-436710552)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__9576 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__9577__i = 0, G__9577__a = new Array(arguments.length -  0);
while (G__9577__i < G__9577__a.length) {G__9577__a[G__9577__i] = arguments[G__9577__i + 0]; ++G__9577__i;}
  args = new cljs.core.IndexedSeq(G__9577__a,0);
} 
return G__9576__delegate.call(this,args);};
G__9576.cljs$lang$maxFixedArity = 0;
G__9576.cljs$lang$applyTo = (function (arglist__9578){
var args = cljs.core.seq(arglist__9578);
return G__9576__delegate(args);
});
G__9576.cljs$core$IFn$_invoke$arity$variadic = G__9576__delegate;
return G__9576;
})()
;})(o))
;

o.error = ((function (o){
return (function() { 
var G__9579__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",-978969032)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__9579 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__9580__i = 0, G__9580__a = new Array(arguments.length -  0);
while (G__9580__i < G__9580__a.length) {G__9580__a[G__9580__i] = arguments[G__9580__i + 0]; ++G__9580__i;}
  args = new cljs.core.IndexedSeq(G__9580__a,0);
} 
return G__9579__delegate.call(this,args);};
G__9579.cljs$lang$maxFixedArity = 0;
G__9579.cljs$lang$applyTo = (function (arglist__9581){
var args = cljs.core.seq(arglist__9581);
return G__9579__delegate(args);
});
G__9579.cljs$core$IFn$_invoke$arity$variadic = G__9579__delegate;
return G__9579;
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

//# sourceMappingURL=debug.js.map