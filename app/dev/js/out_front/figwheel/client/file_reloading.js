// Compiled by ClojureScript 1.9.473 {:elide-asserts true}
goog.provide('figwheel.client.file_reloading');
goog.require('cljs.core');
goog.require('figwheel.client.utils');
goog.require('goog.Uri');
goog.require('goog.string');
goog.require('goog.object');
goog.require('goog.net.jsloader');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.core.async');
goog.require('goog.async.Deferred');
if(typeof figwheel.client.file_reloading.figwheel_meta_pragmas !== 'undefined'){
} else {
figwheel.client.file_reloading.figwheel_meta_pragmas = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
figwheel.client.file_reloading.on_jsload_custom_event = (function figwheel$client$file_reloading$on_jsload_custom_event(url){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.js-reload",url);
});
figwheel.client.file_reloading.before_jsload_custom_event = (function figwheel$client$file_reloading$before_jsload_custom_event(files){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.before-js-reload",files);
});
figwheel.client.file_reloading.on_cssload_custom_event = (function figwheel$client$file_reloading$on_cssload_custom_event(files){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.css-reload",files);
});
figwheel.client.file_reloading.namespace_file_map_QMARK_ = (function figwheel$client$file_reloading$namespace_file_map_QMARK_(m){
var or__6814__auto__ = (cljs.core.map_QMARK_.call(null,m)) && (typeof new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(m) === 'string') && (((new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) == null)) || (typeof new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) === 'string')) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"namespace","namespace",-377510372)));
if(or__6814__auto__){
return or__6814__auto__;
} else {
cljs.core.println.call(null,"Error not namespace-file-map",cljs.core.pr_str.call(null,m));

return false;
}
});
figwheel.client.file_reloading.add_cache_buster = (function figwheel$client$file_reloading$add_cache_buster(url){

return goog.Uri.parse(url).makeUnique();
});
figwheel.client.file_reloading.name__GT_path = (function figwheel$client$file_reloading$name__GT_path(ns){

return (goog.dependencies_.nameToPath[ns]);
});
figwheel.client.file_reloading.provided_QMARK_ = (function figwheel$client$file_reloading$provided_QMARK_(ns){
return (goog.dependencies_.written[figwheel.client.file_reloading.name__GT_path.call(null,ns)]);
});
figwheel.client.file_reloading.immutable_ns_QMARK_ = (function figwheel$client$file_reloading$immutable_ns_QMARK_(name){
var or__6814__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 9, ["svgpan.SvgPan",null,"far.out",null,"testDep.bar",null,"someprotopackage.TestPackageTypes",null,"goog",null,"an.existing.path",null,"cljs.core",null,"ns",null,"dup.base",null], null), null).call(null,name);
if(cljs.core.truth_(or__6814__auto__)){
return or__6814__auto__;
} else {
return cljs.core.some.call(null,cljs.core.partial.call(null,goog.string.startsWith,name),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["goog.","cljs.","clojure.","fake.","proto2."], null));
}
});
figwheel.client.file_reloading.get_requires = (function figwheel$client$file_reloading$get_requires(ns){
return cljs.core.set.call(null,cljs.core.filter.call(null,(function (p1__16117_SHARP_){
return cljs.core.not.call(null,figwheel.client.file_reloading.immutable_ns_QMARK_.call(null,p1__16117_SHARP_));
}),goog.object.getKeys((goog.dependencies_.requires[figwheel.client.file_reloading.name__GT_path.call(null,ns)]))));
});
if(typeof figwheel.client.file_reloading.dependency_data !== 'undefined'){
} else {
figwheel.client.file_reloading.dependency_data = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"dependents","dependents",136812837),cljs.core.PersistentArrayMap.EMPTY], null));
}
figwheel.client.file_reloading.path_to_name_BANG_ = (function figwheel$client$file_reloading$path_to_name_BANG_(path,name){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.createAsIfByAssoc([name], true));
});
/**
 * Setup a path to name dependencies map.
 * That goes from path -> #{ ns-names }
 */
figwheel.client.file_reloading.setup_path__GT_name_BANG_ = (function figwheel$client$file_reloading$setup_path__GT_name_BANG_(){
var nameToPath = goog.object.filter(goog.dependencies_.nameToPath,(function (v,k,o){
return goog.string.startsWith(v,"../");
}));
return goog.object.forEach(nameToPath,((function (nameToPath){
return (function (v,k,o){
return figwheel.client.file_reloading.path_to_name_BANG_.call(null,v,k);
});})(nameToPath))
);
});
/**
 * returns a set of namespaces defined by a path
 */
figwheel.client.file_reloading.path__GT_name = (function figwheel$client$file_reloading$path__GT_name(path){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null));
});
figwheel.client.file_reloading.name_to_parent_BANG_ = (function figwheel$client$file_reloading$name_to_parent_BANG_(ns,parent_ns){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.createAsIfByAssoc([parent_ns], true));
});
/**
 * This reverses the goog.dependencies_.requires for looking up ns-dependents.
 */
figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_ = (function figwheel$client$file_reloading$setup_ns__GT_dependents_BANG_(){
var requires = goog.object.filter(goog.dependencies_.requires,(function (v,k,o){
return goog.string.startsWith(k,"../");
}));
return goog.object.forEach(requires,((function (requires){
return (function (v,k,_){
return goog.object.forEach(v,((function (requires){
return (function (v_SINGLEQUOTE_,k_SINGLEQUOTE_,___$1){
var seq__16122 = cljs.core.seq.call(null,figwheel.client.file_reloading.path__GT_name.call(null,k));
var chunk__16123 = null;
var count__16124 = (0);
var i__16125 = (0);
while(true){
if((i__16125 < count__16124)){
var n = cljs.core._nth.call(null,chunk__16123,i__16125);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__16126 = seq__16122;
var G__16127 = chunk__16123;
var G__16128 = count__16124;
var G__16129 = (i__16125 + (1));
seq__16122 = G__16126;
chunk__16123 = G__16127;
count__16124 = G__16128;
i__16125 = G__16129;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__16122);
if(temp__4657__auto__){
var seq__16122__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16122__$1)){
var c__7633__auto__ = cljs.core.chunk_first.call(null,seq__16122__$1);
var G__16130 = cljs.core.chunk_rest.call(null,seq__16122__$1);
var G__16131 = c__7633__auto__;
var G__16132 = cljs.core.count.call(null,c__7633__auto__);
var G__16133 = (0);
seq__16122 = G__16130;
chunk__16123 = G__16131;
count__16124 = G__16132;
i__16125 = G__16133;
continue;
} else {
var n = cljs.core.first.call(null,seq__16122__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__16134 = cljs.core.next.call(null,seq__16122__$1);
var G__16135 = null;
var G__16136 = (0);
var G__16137 = (0);
seq__16122 = G__16134;
chunk__16123 = G__16135;
count__16124 = G__16136;
i__16125 = G__16137;
continue;
}
} else {
return null;
}
}
break;
}
});})(requires))
);
});})(requires))
);
});
figwheel.client.file_reloading.ns__GT_dependents = (function figwheel$client$file_reloading$ns__GT_dependents(ns){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null));
});
figwheel.client.file_reloading.build_topo_sort = (function figwheel$client$file_reloading$build_topo_sort(get_deps){
var get_deps__$1 = cljs.core.memoize.call(null,get_deps);
var topo_sort_helper_STAR_ = ((function (get_deps__$1){
return (function figwheel$client$file_reloading$build_topo_sort_$_topo_sort_helper_STAR_(x,depth,state){
var deps = get_deps__$1.call(null,x);
if(cljs.core.empty_QMARK_.call(null,deps)){
return null;
} else {
return topo_sort_STAR_.call(null,deps,depth,state);
}
});})(get_deps__$1))
;
var topo_sort_STAR_ = ((function (get_deps__$1){
return (function() {
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = null;
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1 = (function (deps){
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.call(null,deps,(0),cljs.core.atom.call(null,cljs.core.sorted_map.call(null)));
});
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3 = (function (deps,depth,state){
cljs.core.swap_BANG_.call(null,state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [depth], null),cljs.core.fnil.call(null,cljs.core.into,cljs.core.PersistentHashSet.EMPTY),deps);

var seq__16188_16199 = cljs.core.seq.call(null,deps);
var chunk__16189_16200 = null;
var count__16190_16201 = (0);
var i__16191_16202 = (0);
while(true){
if((i__16191_16202 < count__16190_16201)){
var dep_16203 = cljs.core._nth.call(null,chunk__16189_16200,i__16191_16202);
topo_sort_helper_STAR_.call(null,dep_16203,(depth + (1)),state);

var G__16204 = seq__16188_16199;
var G__16205 = chunk__16189_16200;
var G__16206 = count__16190_16201;
var G__16207 = (i__16191_16202 + (1));
seq__16188_16199 = G__16204;
chunk__16189_16200 = G__16205;
count__16190_16201 = G__16206;
i__16191_16202 = G__16207;
continue;
} else {
var temp__4657__auto___16208 = cljs.core.seq.call(null,seq__16188_16199);
if(temp__4657__auto___16208){
var seq__16188_16209__$1 = temp__4657__auto___16208;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16188_16209__$1)){
var c__7633__auto___16210 = cljs.core.chunk_first.call(null,seq__16188_16209__$1);
var G__16211 = cljs.core.chunk_rest.call(null,seq__16188_16209__$1);
var G__16212 = c__7633__auto___16210;
var G__16213 = cljs.core.count.call(null,c__7633__auto___16210);
var G__16214 = (0);
seq__16188_16199 = G__16211;
chunk__16189_16200 = G__16212;
count__16190_16201 = G__16213;
i__16191_16202 = G__16214;
continue;
} else {
var dep_16215 = cljs.core.first.call(null,seq__16188_16209__$1);
topo_sort_helper_STAR_.call(null,dep_16215,(depth + (1)),state);

var G__16216 = cljs.core.next.call(null,seq__16188_16209__$1);
var G__16217 = null;
var G__16218 = (0);
var G__16219 = (0);
seq__16188_16199 = G__16216;
chunk__16189_16200 = G__16217;
count__16190_16201 = G__16218;
i__16191_16202 = G__16219;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,depth,(0))){
return elim_dups_STAR_.call(null,cljs.core.reverse.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,state))));
} else {
return null;
}
});
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = function(deps,depth,state){
switch(arguments.length){
case 1:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1.call(this,deps);
case 3:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3.call(this,deps,depth,state);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1;
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$3 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3;
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_;
})()
;})(get_deps__$1))
;
var elim_dups_STAR_ = ((function (get_deps__$1){
return (function figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_(p__16192){
var vec__16196 = p__16192;
var seq__16197 = cljs.core.seq.call(null,vec__16196);
var first__16198 = cljs.core.first.call(null,seq__16197);
var seq__16197__$1 = cljs.core.next.call(null,seq__16197);
var x = first__16198;
var xs = seq__16197__$1;
if((x == null)){
return cljs.core.List.EMPTY;
} else {
return cljs.core.cons.call(null,x,figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_.call(null,cljs.core.map.call(null,((function (vec__16196,seq__16197,first__16198,seq__16197__$1,x,xs,get_deps__$1){
return (function (p1__16138_SHARP_){
return clojure.set.difference.call(null,p1__16138_SHARP_,x);
});})(vec__16196,seq__16197,first__16198,seq__16197__$1,x,xs,get_deps__$1))
,xs)));
}
});})(get_deps__$1))
;
return topo_sort_STAR_;
});
figwheel.client.file_reloading.get_all_dependencies = (function figwheel$client$file_reloading$get_all_dependencies(ns){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.get_requires);
return cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns], null))));
});
figwheel.client.file_reloading.get_all_dependents = (function figwheel$client$file_reloading$get_all_dependents(nss){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.ns__GT_dependents);
return cljs.core.reverse.call(null,cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,nss))));
});
figwheel.client.file_reloading.unprovide_BANG_ = (function figwheel$client$file_reloading$unprovide_BANG_(ns){
var path = figwheel.client.file_reloading.name__GT_path.call(null,ns);
goog.object.remove(goog.dependencies_.visited,path);

goog.object.remove(goog.dependencies_.written,path);

return goog.object.remove(goog.dependencies_.written,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.basePath),cljs.core.str.cljs$core$IFn$_invoke$arity$1(path)].join(''));
});
figwheel.client.file_reloading.resolve_ns = (function figwheel$client$file_reloading$resolve_ns(ns){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.basePath),cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.file_reloading.name__GT_path.call(null,ns))].join('');
});
figwheel.client.file_reloading.addDependency = (function figwheel$client$file_reloading$addDependency(path,provides,requires){
var seq__16232 = cljs.core.seq.call(null,provides);
var chunk__16233 = null;
var count__16234 = (0);
var i__16235 = (0);
while(true){
if((i__16235 < count__16234)){
var prov = cljs.core._nth.call(null,chunk__16233,i__16235);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__16236_16244 = cljs.core.seq.call(null,requires);
var chunk__16237_16245 = null;
var count__16238_16246 = (0);
var i__16239_16247 = (0);
while(true){
if((i__16239_16247 < count__16238_16246)){
var req_16248 = cljs.core._nth.call(null,chunk__16237_16245,i__16239_16247);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_16248,prov);

var G__16249 = seq__16236_16244;
var G__16250 = chunk__16237_16245;
var G__16251 = count__16238_16246;
var G__16252 = (i__16239_16247 + (1));
seq__16236_16244 = G__16249;
chunk__16237_16245 = G__16250;
count__16238_16246 = G__16251;
i__16239_16247 = G__16252;
continue;
} else {
var temp__4657__auto___16253 = cljs.core.seq.call(null,seq__16236_16244);
if(temp__4657__auto___16253){
var seq__16236_16254__$1 = temp__4657__auto___16253;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16236_16254__$1)){
var c__7633__auto___16255 = cljs.core.chunk_first.call(null,seq__16236_16254__$1);
var G__16256 = cljs.core.chunk_rest.call(null,seq__16236_16254__$1);
var G__16257 = c__7633__auto___16255;
var G__16258 = cljs.core.count.call(null,c__7633__auto___16255);
var G__16259 = (0);
seq__16236_16244 = G__16256;
chunk__16237_16245 = G__16257;
count__16238_16246 = G__16258;
i__16239_16247 = G__16259;
continue;
} else {
var req_16260 = cljs.core.first.call(null,seq__16236_16254__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_16260,prov);

var G__16261 = cljs.core.next.call(null,seq__16236_16254__$1);
var G__16262 = null;
var G__16263 = (0);
var G__16264 = (0);
seq__16236_16244 = G__16261;
chunk__16237_16245 = G__16262;
count__16238_16246 = G__16263;
i__16239_16247 = G__16264;
continue;
}
} else {
}
}
break;
}

var G__16265 = seq__16232;
var G__16266 = chunk__16233;
var G__16267 = count__16234;
var G__16268 = (i__16235 + (1));
seq__16232 = G__16265;
chunk__16233 = G__16266;
count__16234 = G__16267;
i__16235 = G__16268;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__16232);
if(temp__4657__auto__){
var seq__16232__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16232__$1)){
var c__7633__auto__ = cljs.core.chunk_first.call(null,seq__16232__$1);
var G__16269 = cljs.core.chunk_rest.call(null,seq__16232__$1);
var G__16270 = c__7633__auto__;
var G__16271 = cljs.core.count.call(null,c__7633__auto__);
var G__16272 = (0);
seq__16232 = G__16269;
chunk__16233 = G__16270;
count__16234 = G__16271;
i__16235 = G__16272;
continue;
} else {
var prov = cljs.core.first.call(null,seq__16232__$1);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__16240_16273 = cljs.core.seq.call(null,requires);
var chunk__16241_16274 = null;
var count__16242_16275 = (0);
var i__16243_16276 = (0);
while(true){
if((i__16243_16276 < count__16242_16275)){
var req_16277 = cljs.core._nth.call(null,chunk__16241_16274,i__16243_16276);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_16277,prov);

var G__16278 = seq__16240_16273;
var G__16279 = chunk__16241_16274;
var G__16280 = count__16242_16275;
var G__16281 = (i__16243_16276 + (1));
seq__16240_16273 = G__16278;
chunk__16241_16274 = G__16279;
count__16242_16275 = G__16280;
i__16243_16276 = G__16281;
continue;
} else {
var temp__4657__auto___16282__$1 = cljs.core.seq.call(null,seq__16240_16273);
if(temp__4657__auto___16282__$1){
var seq__16240_16283__$1 = temp__4657__auto___16282__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16240_16283__$1)){
var c__7633__auto___16284 = cljs.core.chunk_first.call(null,seq__16240_16283__$1);
var G__16285 = cljs.core.chunk_rest.call(null,seq__16240_16283__$1);
var G__16286 = c__7633__auto___16284;
var G__16287 = cljs.core.count.call(null,c__7633__auto___16284);
var G__16288 = (0);
seq__16240_16273 = G__16285;
chunk__16241_16274 = G__16286;
count__16242_16275 = G__16287;
i__16243_16276 = G__16288;
continue;
} else {
var req_16289 = cljs.core.first.call(null,seq__16240_16283__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_16289,prov);

var G__16290 = cljs.core.next.call(null,seq__16240_16283__$1);
var G__16291 = null;
var G__16292 = (0);
var G__16293 = (0);
seq__16240_16273 = G__16290;
chunk__16241_16274 = G__16291;
count__16242_16275 = G__16292;
i__16243_16276 = G__16293;
continue;
}
} else {
}
}
break;
}

var G__16294 = cljs.core.next.call(null,seq__16232__$1);
var G__16295 = null;
var G__16296 = (0);
var G__16297 = (0);
seq__16232 = G__16294;
chunk__16233 = G__16295;
count__16234 = G__16296;
i__16235 = G__16297;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.file_reloading.figwheel_require = (function figwheel$client$file_reloading$figwheel_require(src,reload){
goog.require = figwheel.client.file_reloading.figwheel_require;

if(cljs.core._EQ_.call(null,reload,"reload-all")){
var seq__16302_16306 = cljs.core.seq.call(null,figwheel.client.file_reloading.get_all_dependencies.call(null,src));
var chunk__16303_16307 = null;
var count__16304_16308 = (0);
var i__16305_16309 = (0);
while(true){
if((i__16305_16309 < count__16304_16308)){
var ns_16310 = cljs.core._nth.call(null,chunk__16303_16307,i__16305_16309);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_16310);

var G__16311 = seq__16302_16306;
var G__16312 = chunk__16303_16307;
var G__16313 = count__16304_16308;
var G__16314 = (i__16305_16309 + (1));
seq__16302_16306 = G__16311;
chunk__16303_16307 = G__16312;
count__16304_16308 = G__16313;
i__16305_16309 = G__16314;
continue;
} else {
var temp__4657__auto___16315 = cljs.core.seq.call(null,seq__16302_16306);
if(temp__4657__auto___16315){
var seq__16302_16316__$1 = temp__4657__auto___16315;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16302_16316__$1)){
var c__7633__auto___16317 = cljs.core.chunk_first.call(null,seq__16302_16316__$1);
var G__16318 = cljs.core.chunk_rest.call(null,seq__16302_16316__$1);
var G__16319 = c__7633__auto___16317;
var G__16320 = cljs.core.count.call(null,c__7633__auto___16317);
var G__16321 = (0);
seq__16302_16306 = G__16318;
chunk__16303_16307 = G__16319;
count__16304_16308 = G__16320;
i__16305_16309 = G__16321;
continue;
} else {
var ns_16322 = cljs.core.first.call(null,seq__16302_16316__$1);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_16322);

var G__16323 = cljs.core.next.call(null,seq__16302_16316__$1);
var G__16324 = null;
var G__16325 = (0);
var G__16326 = (0);
seq__16302_16306 = G__16323;
chunk__16303_16307 = G__16324;
count__16304_16308 = G__16325;
i__16305_16309 = G__16326;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(reload)){
figwheel.client.file_reloading.unprovide_BANG_.call(null,src);
} else {
}

return goog.require_figwheel_backup_(src);
});
/**
 * Reusable browser REPL bootstrapping. Patches the essential functions
 *   in goog.base to support re-loading of namespaces after page load.
 */
figwheel.client.file_reloading.bootstrap_goog_base = (function figwheel$client$file_reloading$bootstrap_goog_base(){
if(cljs.core.truth_(COMPILED)){
return null;
} else {
goog.require_figwheel_backup_ = (function (){var or__6814__auto__ = goog.require__;
if(cljs.core.truth_(or__6814__auto__)){
return or__6814__auto__;
} else {
return goog.require;
}
})();

goog.isProvided_ = (function (name){
return false;
});

figwheel.client.file_reloading.setup_path__GT_name_BANG_.call(null);

figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_.call(null);

goog.addDependency_figwheel_backup_ = goog.addDependency;

goog.addDependency = (function() { 
var G__16327__delegate = function (args){
cljs.core.apply.call(null,figwheel.client.file_reloading.addDependency,args);

return cljs.core.apply.call(null,goog.addDependency_figwheel_backup_,args);
};
var G__16327 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__16328__i = 0, G__16328__a = new Array(arguments.length -  0);
while (G__16328__i < G__16328__a.length) {G__16328__a[G__16328__i] = arguments[G__16328__i + 0]; ++G__16328__i;}
  args = new cljs.core.IndexedSeq(G__16328__a,0);
} 
return G__16327__delegate.call(this,args);};
G__16327.cljs$lang$maxFixedArity = 0;
G__16327.cljs$lang$applyTo = (function (arglist__16329){
var args = cljs.core.seq(arglist__16329);
return G__16327__delegate(args);
});
G__16327.cljs$core$IFn$_invoke$arity$variadic = G__16327__delegate;
return G__16327;
})()
;

goog.constructNamespace_("cljs.user");

goog.global.CLOSURE_IMPORT_SCRIPT = figwheel.client.file_reloading.queued_file_reload;

return goog.require = figwheel.client.file_reloading.figwheel_require;
}
});
figwheel.client.file_reloading.patch_goog_base = (function figwheel$client$file_reloading$patch_goog_base(){
if(typeof figwheel.client.file_reloading.bootstrapped_cljs !== 'undefined'){
return null;
} else {
return (
figwheel.client.file_reloading.bootstrapped_cljs = (function (){
figwheel.client.file_reloading.bootstrap_goog_base.call(null);

return true;
})()
)
;
}
});
figwheel.client.file_reloading.reload_file_STAR_ = (function (){var pred__16330 = cljs.core._EQ_;
var expr__16331 = figwheel.client.utils.host_env_QMARK_.call(null);
if(cljs.core.truth_(pred__16330.call(null,new cljs.core.Keyword(null,"node","node",581201198),expr__16331))){
var node_path_lib = require("path");
var util_pattern = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(node_path_lib.sep),cljs.core.str.cljs$core$IFn$_invoke$arity$1(node_path_lib.join("goog","bootstrap","nodejs.js"))].join('');
var util_path = goog.object.findKey(require.cache,((function (node_path_lib,util_pattern,pred__16330,expr__16331){
return (function (v,k,o){
return goog.string.endsWith(k,util_pattern);
});})(node_path_lib,util_pattern,pred__16330,expr__16331))
);
var parts = cljs.core.pop.call(null,cljs.core.pop.call(null,clojure.string.split.call(null,util_path,/[\/\\]/)));
var root_path = clojure.string.join.call(null,node_path_lib.sep,parts);
return ((function (node_path_lib,util_pattern,util_path,parts,root_path,pred__16330,expr__16331){
return (function (request_url,callback){

var cache_path = node_path_lib.resolve(root_path,request_url);
goog.object.remove(require.cache,cache_path);

return callback.call(null,(function (){try{return require(cache_path);
}catch (e16333){if((e16333 instanceof Error)){
var e = e16333;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Figwheel: Error loading file "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cache_path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e16333;

}
}})());
});
;})(node_path_lib,util_pattern,util_path,parts,root_path,pred__16330,expr__16331))
} else {
if(cljs.core.truth_(pred__16330.call(null,new cljs.core.Keyword(null,"html","html",-998796897),expr__16331))){
return ((function (pred__16330,expr__16331){
return (function (request_url,callback){

var deferred = goog.net.jsloader.load(figwheel.client.file_reloading.add_cache_buster.call(null,request_url),({"cleanupWhenDone": true}));
deferred.addCallback(((function (deferred,pred__16330,expr__16331){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
});})(deferred,pred__16330,expr__16331))
);

return deferred.addErrback(((function (deferred,pred__16330,expr__16331){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
});})(deferred,pred__16330,expr__16331))
);
});
;})(pred__16330,expr__16331))
} else {
if(cljs.core.truth_(pred__16330.call(null,new cljs.core.Keyword(null,"worker","worker",938239996),expr__16331))){
return ((function (pred__16330,expr__16331){
return (function (request_url,callback){

return callback.call(null,(function (){try{self.importScripts(figwheel.client.file_reloading.add_cache_buster.call(null,request_url));

return true;
}catch (e16334){if((e16334 instanceof Error)){
var e = e16334;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Figwheel: Error loading file "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e16334;

}
}})());
});
;})(pred__16330,expr__16331))
} else {
return ((function (pred__16330,expr__16331){
return (function (a,b){
throw "Reload not defined for this platform";
});
;})(pred__16330,expr__16331))
}
}
}
})();
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__16335,callback){
var map__16338 = p__16335;
var map__16338__$1 = ((((!((map__16338 == null)))?((((map__16338.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16338.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16338):map__16338);
var file_msg = map__16338__$1;
var request_url = cljs.core.get.call(null,map__16338__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

figwheel.client.utils.debug_prn.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("FigWheel: Attempting to load "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return figwheel.client.file_reloading.reload_file_STAR_.call(null,request_url,((function (map__16338,map__16338__$1,file_msg,request_url){
return (function (success_QMARK_){
if(cljs.core.truth_(success_QMARK_)){
figwheel.client.utils.debug_prn.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("FigWheel: Successfully loaded "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
} else {
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Figwheel: Error loading file "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});})(map__16338,map__16338__$1,file_msg,request_url))
);
});
if(typeof figwheel.client.file_reloading.reload_chan !== 'undefined'){
} else {
figwheel.client.file_reloading.reload_chan = cljs.core.async.chan.call(null);
}
if(typeof figwheel.client.file_reloading.on_load_callbacks !== 'undefined'){
} else {
figwheel.client.file_reloading.on_load_callbacks = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
if(typeof figwheel.client.file_reloading.dependencies_loaded !== 'undefined'){
} else {
figwheel.client.file_reloading.dependencies_loaded = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
}
figwheel.client.file_reloading.blocking_load = (function figwheel$client$file_reloading$blocking_load(url){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.reload_file.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"request-url","request-url",2100346596),url], null),((function (out){
return (function (file_msg){
cljs.core.async.put_BANG_.call(null,out,file_msg);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);

return out;
});
if(typeof figwheel.client.file_reloading.reloader_loop !== 'undefined'){
} else {
figwheel.client.file_reloading.reloader_loop = (function (){var c__11475__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__11475__auto__){
return (function (){
var f__11476__auto__ = (function (){var switch__11363__auto__ = ((function (c__11475__auto__){
return (function (state_16362){
var state_val_16363 = (state_16362[(1)]);
if((state_val_16363 === (7))){
var inst_16358 = (state_16362[(2)]);
var state_16362__$1 = state_16362;
var statearr_16364_16384 = state_16362__$1;
(statearr_16364_16384[(2)] = inst_16358);

(statearr_16364_16384[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16363 === (1))){
var state_16362__$1 = state_16362;
var statearr_16365_16385 = state_16362__$1;
(statearr_16365_16385[(2)] = null);

(statearr_16365_16385[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16363 === (4))){
var inst_16342 = (state_16362[(7)]);
var inst_16342__$1 = (state_16362[(2)]);
var state_16362__$1 = (function (){var statearr_16366 = state_16362;
(statearr_16366[(7)] = inst_16342__$1);

return statearr_16366;
})();
if(cljs.core.truth_(inst_16342__$1)){
var statearr_16367_16386 = state_16362__$1;
(statearr_16367_16386[(1)] = (5));

} else {
var statearr_16368_16387 = state_16362__$1;
(statearr_16368_16387[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16363 === (6))){
var state_16362__$1 = state_16362;
var statearr_16369_16388 = state_16362__$1;
(statearr_16369_16388[(2)] = null);

(statearr_16369_16388[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16363 === (3))){
var inst_16360 = (state_16362[(2)]);
var state_16362__$1 = state_16362;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16362__$1,inst_16360);
} else {
if((state_val_16363 === (2))){
var state_16362__$1 = state_16362;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16362__$1,(4),figwheel.client.file_reloading.reload_chan);
} else {
if((state_val_16363 === (11))){
var inst_16354 = (state_16362[(2)]);
var state_16362__$1 = (function (){var statearr_16370 = state_16362;
(statearr_16370[(8)] = inst_16354);

return statearr_16370;
})();
var statearr_16371_16389 = state_16362__$1;
(statearr_16371_16389[(2)] = null);

(statearr_16371_16389[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16363 === (9))){
var inst_16348 = (state_16362[(9)]);
var inst_16346 = (state_16362[(10)]);
var inst_16350 = inst_16348.call(null,inst_16346);
var state_16362__$1 = state_16362;
var statearr_16372_16390 = state_16362__$1;
(statearr_16372_16390[(2)] = inst_16350);

(statearr_16372_16390[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16363 === (5))){
var inst_16342 = (state_16362[(7)]);
var inst_16344 = figwheel.client.file_reloading.blocking_load.call(null,inst_16342);
var state_16362__$1 = state_16362;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16362__$1,(8),inst_16344);
} else {
if((state_val_16363 === (10))){
var inst_16346 = (state_16362[(10)]);
var inst_16352 = cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,cljs.core.conj,inst_16346);
var state_16362__$1 = state_16362;
var statearr_16373_16391 = state_16362__$1;
(statearr_16373_16391[(2)] = inst_16352);

(statearr_16373_16391[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16363 === (8))){
var inst_16342 = (state_16362[(7)]);
var inst_16348 = (state_16362[(9)]);
var inst_16346 = (state_16362[(2)]);
var inst_16347 = cljs.core.deref.call(null,figwheel.client.file_reloading.on_load_callbacks);
var inst_16348__$1 = cljs.core.get.call(null,inst_16347,inst_16342);
var state_16362__$1 = (function (){var statearr_16374 = state_16362;
(statearr_16374[(9)] = inst_16348__$1);

(statearr_16374[(10)] = inst_16346);

return statearr_16374;
})();
if(cljs.core.truth_(inst_16348__$1)){
var statearr_16375_16392 = state_16362__$1;
(statearr_16375_16392[(1)] = (9));

} else {
var statearr_16376_16393 = state_16362__$1;
(statearr_16376_16393[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__11475__auto__))
;
return ((function (switch__11363__auto__,c__11475__auto__){
return (function() {
var figwheel$client$file_reloading$state_machine__11364__auto__ = null;
var figwheel$client$file_reloading$state_machine__11364__auto____0 = (function (){
var statearr_16380 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_16380[(0)] = figwheel$client$file_reloading$state_machine__11364__auto__);

(statearr_16380[(1)] = (1));

return statearr_16380;
});
var figwheel$client$file_reloading$state_machine__11364__auto____1 = (function (state_16362){
while(true){
var ret_value__11365__auto__ = (function (){try{while(true){
var result__11366__auto__ = switch__11363__auto__.call(null,state_16362);
if(cljs.core.keyword_identical_QMARK_.call(null,result__11366__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__11366__auto__;
}
break;
}
}catch (e16381){if((e16381 instanceof Object)){
var ex__11367__auto__ = e16381;
var statearr_16382_16394 = state_16362;
(statearr_16382_16394[(5)] = ex__11367__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16362);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e16381;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__11365__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16395 = state_16362;
state_16362 = G__16395;
continue;
} else {
return ret_value__11365__auto__;
}
break;
}
});
figwheel$client$file_reloading$state_machine__11364__auto__ = function(state_16362){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$state_machine__11364__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$state_machine__11364__auto____1.call(this,state_16362);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$state_machine__11364__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$state_machine__11364__auto____0;
figwheel$client$file_reloading$state_machine__11364__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$state_machine__11364__auto____1;
return figwheel$client$file_reloading$state_machine__11364__auto__;
})()
;})(switch__11363__auto__,c__11475__auto__))
})();
var state__11477__auto__ = (function (){var statearr_16383 = f__11476__auto__.call(null);
(statearr_16383[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__11475__auto__);

return statearr_16383;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__11477__auto__);
});})(c__11475__auto__))
);

return c__11475__auto__;
})();
}
figwheel.client.file_reloading.queued_file_reload = (function figwheel$client$file_reloading$queued_file_reload(url){
return cljs.core.async.put_BANG_.call(null,figwheel.client.file_reloading.reload_chan,url);
});
figwheel.client.file_reloading.require_with_callback = (function figwheel$client$file_reloading$require_with_callback(p__16396,callback){
var map__16399 = p__16396;
var map__16399__$1 = ((((!((map__16399 == null)))?((((map__16399.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16399.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16399):map__16399);
var file_msg = map__16399__$1;
var namespace = cljs.core.get.call(null,map__16399__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var request_url = figwheel.client.file_reloading.resolve_ns.call(null,namespace);
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.assoc,request_url,((function (request_url,map__16399,map__16399__$1,file_msg,namespace){
return (function (file_msg_SINGLEQUOTE_){
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.dissoc,request_url);

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.call(null,file_msg,cljs.core.select_keys.call(null,file_msg_SINGLEQUOTE_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375)], null)))], null));
});})(request_url,map__16399,map__16399__$1,file_msg,namespace))
);

return figwheel.client.file_reloading.figwheel_require.call(null,cljs.core.name.call(null,namespace),true);
});
figwheel.client.file_reloading.figwheel_no_load_QMARK_ = (function figwheel$client$file_reloading$figwheel_no_load_QMARK_(p__16401){
var map__16404 = p__16401;
var map__16404__$1 = ((((!((map__16404 == null)))?((((map__16404.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16404.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16404):map__16404);
var file_msg = map__16404__$1;
var namespace = cljs.core.get.call(null,map__16404__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_pragmas = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__16406){
var map__16409 = p__16406;
var map__16409__$1 = ((((!((map__16409 == null)))?((((map__16409.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16409.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16409):map__16409);
var file_msg = map__16409__$1;
var namespace = cljs.core.get.call(null,map__16409__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

var meta_pragmas = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
var and__6802__auto__ = cljs.core.not.call(null,figwheel.client.file_reloading.figwheel_no_load_QMARK_.call(null,file_msg));
if(and__6802__auto__){
var or__6814__auto__ = new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__6814__auto__)){
return or__6814__auto__;
} else {
var or__6814__auto____$1 = new cljs.core.Keyword(null,"figwheel-load","figwheel-load",1316089175).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__6814__auto____$1)){
return or__6814__auto____$1;
} else {
return figwheel.client.file_reloading.provided_QMARK_.call(null,cljs.core.name.call(null,namespace));
}
}
} else {
return and__6802__auto__;
}
});
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__16411,callback){
var map__16414 = p__16411;
var map__16414__$1 = ((((!((map__16414 == null)))?((((map__16414.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16414.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16414):map__16414);
var file_msg = map__16414__$1;
var request_url = cljs.core.get.call(null,map__16414__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var namespace = cljs.core.get.call(null,map__16414__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

if(cljs.core.truth_(figwheel.client.file_reloading.reload_file_QMARK_.call(null,file_msg))){
return figwheel.client.file_reloading.require_with_callback.call(null,file_msg,callback);
} else {
figwheel.client.utils.debug_prn.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Figwheel: Not trying to load file "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});
figwheel.client.file_reloading.reload_js_file = (function figwheel$client$file_reloading$reload_js_file(file_msg){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.js_reload.call(null,file_msg,((function (out){
return (function (url){
cljs.core.async.put_BANG_.call(null,out,url);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);

return out;
});
/**
 * Returns a chanel with one collection of loaded filenames on it.
 */
figwheel.client.file_reloading.load_all_js_files = (function figwheel$client$file_reloading$load_all_js_files(files){
var out = cljs.core.async.chan.call(null);
var c__11475__auto___16518 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__11475__auto___16518,out){
return (function (){
var f__11476__auto__ = (function (){var switch__11363__auto__ = ((function (c__11475__auto___16518,out){
return (function (state_16500){
var state_val_16501 = (state_16500[(1)]);
if((state_val_16501 === (1))){
var inst_16474 = cljs.core.seq.call(null,files);
var inst_16475 = cljs.core.first.call(null,inst_16474);
var inst_16476 = cljs.core.next.call(null,inst_16474);
var inst_16477 = files;
var state_16500__$1 = (function (){var statearr_16502 = state_16500;
(statearr_16502[(7)] = inst_16476);

(statearr_16502[(8)] = inst_16475);

(statearr_16502[(9)] = inst_16477);

return statearr_16502;
})();
var statearr_16503_16519 = state_16500__$1;
(statearr_16503_16519[(2)] = null);

(statearr_16503_16519[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16501 === (2))){
var inst_16477 = (state_16500[(9)]);
var inst_16483 = (state_16500[(10)]);
var inst_16482 = cljs.core.seq.call(null,inst_16477);
var inst_16483__$1 = cljs.core.first.call(null,inst_16482);
var inst_16484 = cljs.core.next.call(null,inst_16482);
var inst_16485 = (inst_16483__$1 == null);
var inst_16486 = cljs.core.not.call(null,inst_16485);
var state_16500__$1 = (function (){var statearr_16504 = state_16500;
(statearr_16504[(10)] = inst_16483__$1);

(statearr_16504[(11)] = inst_16484);

return statearr_16504;
})();
if(inst_16486){
var statearr_16505_16520 = state_16500__$1;
(statearr_16505_16520[(1)] = (4));

} else {
var statearr_16506_16521 = state_16500__$1;
(statearr_16506_16521[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16501 === (3))){
var inst_16498 = (state_16500[(2)]);
var state_16500__$1 = state_16500;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16500__$1,inst_16498);
} else {
if((state_val_16501 === (4))){
var inst_16483 = (state_16500[(10)]);
var inst_16488 = figwheel.client.file_reloading.reload_js_file.call(null,inst_16483);
var state_16500__$1 = state_16500;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16500__$1,(7),inst_16488);
} else {
if((state_val_16501 === (5))){
var inst_16494 = cljs.core.async.close_BANG_.call(null,out);
var state_16500__$1 = state_16500;
var statearr_16507_16522 = state_16500__$1;
(statearr_16507_16522[(2)] = inst_16494);

(statearr_16507_16522[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16501 === (6))){
var inst_16496 = (state_16500[(2)]);
var state_16500__$1 = state_16500;
var statearr_16508_16523 = state_16500__$1;
(statearr_16508_16523[(2)] = inst_16496);

(statearr_16508_16523[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16501 === (7))){
var inst_16484 = (state_16500[(11)]);
var inst_16490 = (state_16500[(2)]);
var inst_16491 = cljs.core.async.put_BANG_.call(null,out,inst_16490);
var inst_16477 = inst_16484;
var state_16500__$1 = (function (){var statearr_16509 = state_16500;
(statearr_16509[(12)] = inst_16491);

(statearr_16509[(9)] = inst_16477);

return statearr_16509;
})();
var statearr_16510_16524 = state_16500__$1;
(statearr_16510_16524[(2)] = null);

(statearr_16510_16524[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(c__11475__auto___16518,out))
;
return ((function (switch__11363__auto__,c__11475__auto___16518,out){
return (function() {
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__11364__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__11364__auto____0 = (function (){
var statearr_16514 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_16514[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__11364__auto__);

(statearr_16514[(1)] = (1));

return statearr_16514;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__11364__auto____1 = (function (state_16500){
while(true){
var ret_value__11365__auto__ = (function (){try{while(true){
var result__11366__auto__ = switch__11363__auto__.call(null,state_16500);
if(cljs.core.keyword_identical_QMARK_.call(null,result__11366__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__11366__auto__;
}
break;
}
}catch (e16515){if((e16515 instanceof Object)){
var ex__11367__auto__ = e16515;
var statearr_16516_16525 = state_16500;
(statearr_16516_16525[(5)] = ex__11367__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16500);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e16515;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__11365__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16526 = state_16500;
state_16500 = G__16526;
continue;
} else {
return ret_value__11365__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__11364__auto__ = function(state_16500){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__11364__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__11364__auto____1.call(this,state_16500);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__11364__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__11364__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__11364__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__11364__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__11364__auto__;
})()
;})(switch__11363__auto__,c__11475__auto___16518,out))
})();
var state__11477__auto__ = (function (){var statearr_16517 = f__11476__auto__.call(null);
(statearr_16517[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__11475__auto___16518);

return statearr_16517;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__11477__auto__);
});})(c__11475__auto___16518,out))
);


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__16527,opts){
var map__16531 = p__16527;
var map__16531__$1 = ((((!((map__16531 == null)))?((((map__16531.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16531.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16531):map__16531);
var eval_body = cljs.core.get.call(null,map__16531__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
var file = cljs.core.get.call(null,map__16531__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_((function (){var and__6802__auto__ = eval_body;
if(cljs.core.truth_(and__6802__auto__)){
return typeof eval_body === 'string';
} else {
return and__6802__auto__;
}
})())){
var code = eval_body;
try{figwheel.client.utils.debug_prn.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Evaling file "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''));

return figwheel.client.utils.eval_helper.call(null,code,opts);
}catch (e16533){var e = e16533;
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Unable to evaluate "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''));
}} else {
return null;
}
});
figwheel.client.file_reloading.expand_files = (function figwheel$client$file_reloading$expand_files(files){
var deps = figwheel.client.file_reloading.get_all_dependents.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.not,cljs.core.partial.call(null,cljs.core.re_matches,/figwheel\.connect.*/),new cljs.core.Keyword(null,"namespace","namespace",-377510372)),cljs.core.map.call(null,((function (deps){
return (function (n){
var temp__4655__auto__ = cljs.core.first.call(null,cljs.core.filter.call(null,((function (deps){
return (function (p1__16534_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__16534_SHARP_),n);
});})(deps))
,files));
if(cljs.core.truth_(temp__4655__auto__)){
var file_msg = temp__4655__auto__;
return file_msg;
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372),new cljs.core.Keyword(null,"namespace","namespace",-377510372),n], null);
}
});})(deps))
,deps));
});
figwheel.client.file_reloading.sort_files = (function figwheel$client$file_reloading$sort_files(files){
if((cljs.core.count.call(null,files) <= (1))){
return files;
} else {
var keep_files = cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,keep_files,new cljs.core.Keyword(null,"namespace","namespace",-377510372)),figwheel.client.file_reloading.expand_files.call(null,files));
}
});
figwheel.client.file_reloading.get_figwheel_always = (function figwheel$client$file_reloading$get_figwheel_always(){
return cljs.core.map.call(null,(function (p__16543){
var vec__16544 = p__16543;
var k = cljs.core.nth.call(null,vec__16544,(0),null);
var v = cljs.core.nth.call(null,vec__16544,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),k,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372)], null);
}),cljs.core.filter.call(null,(function (p__16547){
var vec__16548 = p__16547;
var k = cljs.core.nth.call(null,vec__16548,(0),null);
var v = cljs.core.nth.call(null,vec__16548,(1),null);
return new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(v);
}),cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas)));
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__16554,p__16555){
var map__16803 = p__16554;
var map__16803__$1 = ((((!((map__16803 == null)))?((((map__16803.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16803.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16803):map__16803);
var opts = map__16803__$1;
var before_jsload = cljs.core.get.call(null,map__16803__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var on_jsload = cljs.core.get.call(null,map__16803__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var reload_dependents = cljs.core.get.call(null,map__16803__$1,new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430));
var map__16804 = p__16555;
var map__16804__$1 = ((((!((map__16804 == null)))?((((map__16804.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16804.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16804):map__16804);
var msg = map__16804__$1;
var files = cljs.core.get.call(null,map__16804__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var figwheel_meta = cljs.core.get.call(null,map__16804__$1,new cljs.core.Keyword(null,"figwheel-meta","figwheel-meta",-225970237));
var recompile_dependents = cljs.core.get.call(null,map__16804__$1,new cljs.core.Keyword(null,"recompile-dependents","recompile-dependents",523804171));
if(cljs.core.empty_QMARK_.call(null,figwheel_meta)){
} else {
cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas,figwheel_meta);
}

var c__11475__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
var f__11476__auto__ = (function (){var switch__11363__auto__ = ((function (c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (state_16958){
var state_val_16959 = (state_16958[(1)]);
if((state_val_16959 === (7))){
var inst_16821 = (state_16958[(7)]);
var inst_16818 = (state_16958[(8)]);
var inst_16819 = (state_16958[(9)]);
var inst_16820 = (state_16958[(10)]);
var inst_16826 = cljs.core._nth.call(null,inst_16819,inst_16821);
var inst_16827 = figwheel.client.file_reloading.eval_body.call(null,inst_16826,opts);
var inst_16828 = (inst_16821 + (1));
var tmp16960 = inst_16818;
var tmp16961 = inst_16819;
var tmp16962 = inst_16820;
var inst_16818__$1 = tmp16960;
var inst_16819__$1 = tmp16961;
var inst_16820__$1 = tmp16962;
var inst_16821__$1 = inst_16828;
var state_16958__$1 = (function (){var statearr_16963 = state_16958;
(statearr_16963[(7)] = inst_16821__$1);

(statearr_16963[(8)] = inst_16818__$1);

(statearr_16963[(9)] = inst_16819__$1);

(statearr_16963[(11)] = inst_16827);

(statearr_16963[(10)] = inst_16820__$1);

return statearr_16963;
})();
var statearr_16964_17050 = state_16958__$1;
(statearr_16964_17050[(2)] = null);

(statearr_16964_17050[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (20))){
var inst_16861 = (state_16958[(12)]);
var inst_16869 = figwheel.client.file_reloading.sort_files.call(null,inst_16861);
var state_16958__$1 = state_16958;
var statearr_16965_17051 = state_16958__$1;
(statearr_16965_17051[(2)] = inst_16869);

(statearr_16965_17051[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (27))){
var state_16958__$1 = state_16958;
var statearr_16966_17052 = state_16958__$1;
(statearr_16966_17052[(2)] = null);

(statearr_16966_17052[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (1))){
var inst_16810 = (state_16958[(13)]);
var inst_16807 = before_jsload.call(null,files);
var inst_16808 = figwheel.client.file_reloading.before_jsload_custom_event.call(null,files);
var inst_16809 = (function (){return ((function (inst_16810,inst_16807,inst_16808,state_val_16959,c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__16551_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__16551_SHARP_);
});
;})(inst_16810,inst_16807,inst_16808,state_val_16959,c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_16810__$1 = cljs.core.filter.call(null,inst_16809,files);
var inst_16811 = cljs.core.not_empty.call(null,inst_16810__$1);
var state_16958__$1 = (function (){var statearr_16967 = state_16958;
(statearr_16967[(14)] = inst_16807);

(statearr_16967[(15)] = inst_16808);

(statearr_16967[(13)] = inst_16810__$1);

return statearr_16967;
})();
if(cljs.core.truth_(inst_16811)){
var statearr_16968_17053 = state_16958__$1;
(statearr_16968_17053[(1)] = (2));

} else {
var statearr_16969_17054 = state_16958__$1;
(statearr_16969_17054[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (24))){
var state_16958__$1 = state_16958;
var statearr_16970_17055 = state_16958__$1;
(statearr_16970_17055[(2)] = null);

(statearr_16970_17055[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (39))){
var inst_16911 = (state_16958[(16)]);
var state_16958__$1 = state_16958;
var statearr_16971_17056 = state_16958__$1;
(statearr_16971_17056[(2)] = inst_16911);

(statearr_16971_17056[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (46))){
var inst_16953 = (state_16958[(2)]);
var state_16958__$1 = state_16958;
var statearr_16972_17057 = state_16958__$1;
(statearr_16972_17057[(2)] = inst_16953);

(statearr_16972_17057[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (4))){
var inst_16855 = (state_16958[(2)]);
var inst_16856 = cljs.core.List.EMPTY;
var inst_16857 = cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,inst_16856);
var inst_16858 = (function (){return ((function (inst_16855,inst_16856,inst_16857,state_val_16959,c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__16552_SHARP_){
var and__6802__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__16552_SHARP_);
if(cljs.core.truth_(and__6802__auto__)){
return (cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__16552_SHARP_))) && (cljs.core.not.call(null,figwheel.client.file_reloading.figwheel_no_load_QMARK_.call(null,p1__16552_SHARP_)));
} else {
return and__6802__auto__;
}
});
;})(inst_16855,inst_16856,inst_16857,state_val_16959,c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_16859 = cljs.core.filter.call(null,inst_16858,files);
var inst_16860 = figwheel.client.file_reloading.get_figwheel_always.call(null);
var inst_16861 = cljs.core.concat.call(null,inst_16859,inst_16860);
var state_16958__$1 = (function (){var statearr_16973 = state_16958;
(statearr_16973[(17)] = inst_16855);

(statearr_16973[(12)] = inst_16861);

(statearr_16973[(18)] = inst_16857);

return statearr_16973;
})();
if(cljs.core.truth_(reload_dependents)){
var statearr_16974_17058 = state_16958__$1;
(statearr_16974_17058[(1)] = (16));

} else {
var statearr_16975_17059 = state_16958__$1;
(statearr_16975_17059[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (15))){
var inst_16845 = (state_16958[(2)]);
var state_16958__$1 = state_16958;
var statearr_16976_17060 = state_16958__$1;
(statearr_16976_17060[(2)] = inst_16845);

(statearr_16976_17060[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (21))){
var inst_16871 = (state_16958[(19)]);
var inst_16871__$1 = (state_16958[(2)]);
var inst_16872 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_16871__$1);
var state_16958__$1 = (function (){var statearr_16977 = state_16958;
(statearr_16977[(19)] = inst_16871__$1);

return statearr_16977;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16958__$1,(22),inst_16872);
} else {
if((state_val_16959 === (31))){
var inst_16956 = (state_16958[(2)]);
var state_16958__$1 = state_16958;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16958__$1,inst_16956);
} else {
if((state_val_16959 === (32))){
var inst_16911 = (state_16958[(16)]);
var inst_16916 = inst_16911.cljs$lang$protocol_mask$partition0$;
var inst_16917 = (inst_16916 & (64));
var inst_16918 = inst_16911.cljs$core$ISeq$;
var inst_16919 = (cljs.core.PROTOCOL_SENTINEL === inst_16918);
var inst_16920 = (inst_16917) || (inst_16919);
var state_16958__$1 = state_16958;
if(cljs.core.truth_(inst_16920)){
var statearr_16978_17061 = state_16958__$1;
(statearr_16978_17061[(1)] = (35));

} else {
var statearr_16979_17062 = state_16958__$1;
(statearr_16979_17062[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (40))){
var inst_16933 = (state_16958[(20)]);
var inst_16932 = (state_16958[(2)]);
var inst_16933__$1 = cljs.core.get.call(null,inst_16932,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_16934 = cljs.core.get.call(null,inst_16932,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_16935 = cljs.core.not_empty.call(null,inst_16933__$1);
var state_16958__$1 = (function (){var statearr_16980 = state_16958;
(statearr_16980[(20)] = inst_16933__$1);

(statearr_16980[(21)] = inst_16934);

return statearr_16980;
})();
if(cljs.core.truth_(inst_16935)){
var statearr_16981_17063 = state_16958__$1;
(statearr_16981_17063[(1)] = (41));

} else {
var statearr_16982_17064 = state_16958__$1;
(statearr_16982_17064[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (33))){
var state_16958__$1 = state_16958;
var statearr_16983_17065 = state_16958__$1;
(statearr_16983_17065[(2)] = false);

(statearr_16983_17065[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (13))){
var inst_16831 = (state_16958[(22)]);
var inst_16835 = cljs.core.chunk_first.call(null,inst_16831);
var inst_16836 = cljs.core.chunk_rest.call(null,inst_16831);
var inst_16837 = cljs.core.count.call(null,inst_16835);
var inst_16818 = inst_16836;
var inst_16819 = inst_16835;
var inst_16820 = inst_16837;
var inst_16821 = (0);
var state_16958__$1 = (function (){var statearr_16984 = state_16958;
(statearr_16984[(7)] = inst_16821);

(statearr_16984[(8)] = inst_16818);

(statearr_16984[(9)] = inst_16819);

(statearr_16984[(10)] = inst_16820);

return statearr_16984;
})();
var statearr_16985_17066 = state_16958__$1;
(statearr_16985_17066[(2)] = null);

(statearr_16985_17066[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (22))){
var inst_16879 = (state_16958[(23)]);
var inst_16871 = (state_16958[(19)]);
var inst_16875 = (state_16958[(24)]);
var inst_16874 = (state_16958[(25)]);
var inst_16874__$1 = (state_16958[(2)]);
var inst_16875__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_16874__$1);
var inst_16876 = (function (){var all_files = inst_16871;
var res_SINGLEQUOTE_ = inst_16874__$1;
var res = inst_16875__$1;
return ((function (all_files,res_SINGLEQUOTE_,res,inst_16879,inst_16871,inst_16875,inst_16874,inst_16874__$1,inst_16875__$1,state_val_16959,c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__16553_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__16553_SHARP_));
});
;})(all_files,res_SINGLEQUOTE_,res,inst_16879,inst_16871,inst_16875,inst_16874,inst_16874__$1,inst_16875__$1,state_val_16959,c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_16877 = cljs.core.filter.call(null,inst_16876,inst_16874__$1);
var inst_16878 = cljs.core.deref.call(null,figwheel.client.file_reloading.dependencies_loaded);
var inst_16879__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_16878);
var inst_16880 = cljs.core.not_empty.call(null,inst_16879__$1);
var state_16958__$1 = (function (){var statearr_16986 = state_16958;
(statearr_16986[(23)] = inst_16879__$1);

(statearr_16986[(26)] = inst_16877);

(statearr_16986[(24)] = inst_16875__$1);

(statearr_16986[(25)] = inst_16874__$1);

return statearr_16986;
})();
if(cljs.core.truth_(inst_16880)){
var statearr_16987_17067 = state_16958__$1;
(statearr_16987_17067[(1)] = (23));

} else {
var statearr_16988_17068 = state_16958__$1;
(statearr_16988_17068[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (36))){
var state_16958__$1 = state_16958;
var statearr_16989_17069 = state_16958__$1;
(statearr_16989_17069[(2)] = false);

(statearr_16989_17069[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (41))){
var inst_16933 = (state_16958[(20)]);
var inst_16937 = cljs.core.comp.call(null,figwheel.client.file_reloading.name__GT_path,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var inst_16938 = cljs.core.map.call(null,inst_16937,inst_16933);
var inst_16939 = cljs.core.pr_str.call(null,inst_16938);
var inst_16940 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1("figwheel-no-load meta-data: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_16939)].join('');
var inst_16941 = figwheel.client.utils.log.call(null,inst_16940);
var state_16958__$1 = state_16958;
var statearr_16990_17070 = state_16958__$1;
(statearr_16990_17070[(2)] = inst_16941);

(statearr_16990_17070[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (43))){
var inst_16934 = (state_16958[(21)]);
var inst_16944 = (state_16958[(2)]);
var inst_16945 = cljs.core.not_empty.call(null,inst_16934);
var state_16958__$1 = (function (){var statearr_16991 = state_16958;
(statearr_16991[(27)] = inst_16944);

return statearr_16991;
})();
if(cljs.core.truth_(inst_16945)){
var statearr_16992_17071 = state_16958__$1;
(statearr_16992_17071[(1)] = (44));

} else {
var statearr_16993_17072 = state_16958__$1;
(statearr_16993_17072[(1)] = (45));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (29))){
var inst_16879 = (state_16958[(23)]);
var inst_16871 = (state_16958[(19)]);
var inst_16877 = (state_16958[(26)]);
var inst_16875 = (state_16958[(24)]);
var inst_16911 = (state_16958[(16)]);
var inst_16874 = (state_16958[(25)]);
var inst_16907 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_16910 = (function (){var all_files = inst_16871;
var res_SINGLEQUOTE_ = inst_16874;
var res = inst_16875;
var files_not_loaded = inst_16877;
var dependencies_that_loaded = inst_16879;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_16879,inst_16871,inst_16877,inst_16875,inst_16911,inst_16874,inst_16907,state_val_16959,c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__16909){
var map__16994 = p__16909;
var map__16994__$1 = ((((!((map__16994 == null)))?((((map__16994.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16994.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16994):map__16994);
var namespace = cljs.core.get.call(null,map__16994__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_data = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
if((meta_data == null)){
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);
} else {
if(cljs.core.truth_(meta_data.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179)))){
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179);
} else {
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);

}
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_16879,inst_16871,inst_16877,inst_16875,inst_16911,inst_16874,inst_16907,state_val_16959,c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_16911__$1 = cljs.core.group_by.call(null,inst_16910,inst_16877);
var inst_16913 = (inst_16911__$1 == null);
var inst_16914 = cljs.core.not.call(null,inst_16913);
var state_16958__$1 = (function (){var statearr_16996 = state_16958;
(statearr_16996[(28)] = inst_16907);

(statearr_16996[(16)] = inst_16911__$1);

return statearr_16996;
})();
if(inst_16914){
var statearr_16997_17073 = state_16958__$1;
(statearr_16997_17073[(1)] = (32));

} else {
var statearr_16998_17074 = state_16958__$1;
(statearr_16998_17074[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (44))){
var inst_16934 = (state_16958[(21)]);
var inst_16947 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_16934);
var inst_16948 = cljs.core.pr_str.call(null,inst_16947);
var inst_16949 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1("not required: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_16948)].join('');
var inst_16950 = figwheel.client.utils.log.call(null,inst_16949);
var state_16958__$1 = state_16958;
var statearr_16999_17075 = state_16958__$1;
(statearr_16999_17075[(2)] = inst_16950);

(statearr_16999_17075[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (6))){
var inst_16852 = (state_16958[(2)]);
var state_16958__$1 = state_16958;
var statearr_17000_17076 = state_16958__$1;
(statearr_17000_17076[(2)] = inst_16852);

(statearr_17000_17076[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (28))){
var inst_16877 = (state_16958[(26)]);
var inst_16904 = (state_16958[(2)]);
var inst_16905 = cljs.core.not_empty.call(null,inst_16877);
var state_16958__$1 = (function (){var statearr_17001 = state_16958;
(statearr_17001[(29)] = inst_16904);

return statearr_17001;
})();
if(cljs.core.truth_(inst_16905)){
var statearr_17002_17077 = state_16958__$1;
(statearr_17002_17077[(1)] = (29));

} else {
var statearr_17003_17078 = state_16958__$1;
(statearr_17003_17078[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (25))){
var inst_16875 = (state_16958[(24)]);
var inst_16891 = (state_16958[(2)]);
var inst_16892 = cljs.core.not_empty.call(null,inst_16875);
var state_16958__$1 = (function (){var statearr_17004 = state_16958;
(statearr_17004[(30)] = inst_16891);

return statearr_17004;
})();
if(cljs.core.truth_(inst_16892)){
var statearr_17005_17079 = state_16958__$1;
(statearr_17005_17079[(1)] = (26));

} else {
var statearr_17006_17080 = state_16958__$1;
(statearr_17006_17080[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (34))){
var inst_16927 = (state_16958[(2)]);
var state_16958__$1 = state_16958;
if(cljs.core.truth_(inst_16927)){
var statearr_17007_17081 = state_16958__$1;
(statearr_17007_17081[(1)] = (38));

} else {
var statearr_17008_17082 = state_16958__$1;
(statearr_17008_17082[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (17))){
var state_16958__$1 = state_16958;
var statearr_17009_17083 = state_16958__$1;
(statearr_17009_17083[(2)] = recompile_dependents);

(statearr_17009_17083[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (3))){
var state_16958__$1 = state_16958;
var statearr_17010_17084 = state_16958__$1;
(statearr_17010_17084[(2)] = null);

(statearr_17010_17084[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (12))){
var inst_16848 = (state_16958[(2)]);
var state_16958__$1 = state_16958;
var statearr_17011_17085 = state_16958__$1;
(statearr_17011_17085[(2)] = inst_16848);

(statearr_17011_17085[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (2))){
var inst_16810 = (state_16958[(13)]);
var inst_16817 = cljs.core.seq.call(null,inst_16810);
var inst_16818 = inst_16817;
var inst_16819 = null;
var inst_16820 = (0);
var inst_16821 = (0);
var state_16958__$1 = (function (){var statearr_17012 = state_16958;
(statearr_17012[(7)] = inst_16821);

(statearr_17012[(8)] = inst_16818);

(statearr_17012[(9)] = inst_16819);

(statearr_17012[(10)] = inst_16820);

return statearr_17012;
})();
var statearr_17013_17086 = state_16958__$1;
(statearr_17013_17086[(2)] = null);

(statearr_17013_17086[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (23))){
var inst_16879 = (state_16958[(23)]);
var inst_16871 = (state_16958[(19)]);
var inst_16877 = (state_16958[(26)]);
var inst_16875 = (state_16958[(24)]);
var inst_16874 = (state_16958[(25)]);
var inst_16882 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these dependencies");
var inst_16884 = (function (){var all_files = inst_16871;
var res_SINGLEQUOTE_ = inst_16874;
var res = inst_16875;
var files_not_loaded = inst_16877;
var dependencies_that_loaded = inst_16879;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_16879,inst_16871,inst_16877,inst_16875,inst_16874,inst_16882,state_val_16959,c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__16883){
var map__17014 = p__16883;
var map__17014__$1 = ((((!((map__17014 == null)))?((((map__17014.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17014.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17014):map__17014);
var request_url = cljs.core.get.call(null,map__17014__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
return clojure.string.replace.call(null,request_url,goog.basePath,"");
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_16879,inst_16871,inst_16877,inst_16875,inst_16874,inst_16882,state_val_16959,c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_16885 = cljs.core.reverse.call(null,inst_16879);
var inst_16886 = cljs.core.map.call(null,inst_16884,inst_16885);
var inst_16887 = cljs.core.pr_str.call(null,inst_16886);
var inst_16888 = figwheel.client.utils.log.call(null,inst_16887);
var state_16958__$1 = (function (){var statearr_17016 = state_16958;
(statearr_17016[(31)] = inst_16882);

return statearr_17016;
})();
var statearr_17017_17087 = state_16958__$1;
(statearr_17017_17087[(2)] = inst_16888);

(statearr_17017_17087[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (35))){
var state_16958__$1 = state_16958;
var statearr_17018_17088 = state_16958__$1;
(statearr_17018_17088[(2)] = true);

(statearr_17018_17088[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (19))){
var inst_16861 = (state_16958[(12)]);
var inst_16867 = figwheel.client.file_reloading.expand_files.call(null,inst_16861);
var state_16958__$1 = state_16958;
var statearr_17019_17089 = state_16958__$1;
(statearr_17019_17089[(2)] = inst_16867);

(statearr_17019_17089[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (11))){
var state_16958__$1 = state_16958;
var statearr_17020_17090 = state_16958__$1;
(statearr_17020_17090[(2)] = null);

(statearr_17020_17090[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (9))){
var inst_16850 = (state_16958[(2)]);
var state_16958__$1 = state_16958;
var statearr_17021_17091 = state_16958__$1;
(statearr_17021_17091[(2)] = inst_16850);

(statearr_17021_17091[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (5))){
var inst_16821 = (state_16958[(7)]);
var inst_16820 = (state_16958[(10)]);
var inst_16823 = (inst_16821 < inst_16820);
var inst_16824 = inst_16823;
var state_16958__$1 = state_16958;
if(cljs.core.truth_(inst_16824)){
var statearr_17022_17092 = state_16958__$1;
(statearr_17022_17092[(1)] = (7));

} else {
var statearr_17023_17093 = state_16958__$1;
(statearr_17023_17093[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (14))){
var inst_16831 = (state_16958[(22)]);
var inst_16840 = cljs.core.first.call(null,inst_16831);
var inst_16841 = figwheel.client.file_reloading.eval_body.call(null,inst_16840,opts);
var inst_16842 = cljs.core.next.call(null,inst_16831);
var inst_16818 = inst_16842;
var inst_16819 = null;
var inst_16820 = (0);
var inst_16821 = (0);
var state_16958__$1 = (function (){var statearr_17024 = state_16958;
(statearr_17024[(32)] = inst_16841);

(statearr_17024[(7)] = inst_16821);

(statearr_17024[(8)] = inst_16818);

(statearr_17024[(9)] = inst_16819);

(statearr_17024[(10)] = inst_16820);

return statearr_17024;
})();
var statearr_17025_17094 = state_16958__$1;
(statearr_17025_17094[(2)] = null);

(statearr_17025_17094[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (45))){
var state_16958__$1 = state_16958;
var statearr_17026_17095 = state_16958__$1;
(statearr_17026_17095[(2)] = null);

(statearr_17026_17095[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (26))){
var inst_16879 = (state_16958[(23)]);
var inst_16871 = (state_16958[(19)]);
var inst_16877 = (state_16958[(26)]);
var inst_16875 = (state_16958[(24)]);
var inst_16874 = (state_16958[(25)]);
var inst_16894 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_16896 = (function (){var all_files = inst_16871;
var res_SINGLEQUOTE_ = inst_16874;
var res = inst_16875;
var files_not_loaded = inst_16877;
var dependencies_that_loaded = inst_16879;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_16879,inst_16871,inst_16877,inst_16875,inst_16874,inst_16894,state_val_16959,c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__16895){
var map__17027 = p__16895;
var map__17027__$1 = ((((!((map__17027 == null)))?((((map__17027.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17027.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17027):map__17027);
var namespace = cljs.core.get.call(null,map__17027__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var file = cljs.core.get.call(null,map__17027__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.name__GT_path.call(null,cljs.core.name.call(null,namespace));
} else {
return file;
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_16879,inst_16871,inst_16877,inst_16875,inst_16874,inst_16894,state_val_16959,c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_16897 = cljs.core.map.call(null,inst_16896,inst_16875);
var inst_16898 = cljs.core.pr_str.call(null,inst_16897);
var inst_16899 = figwheel.client.utils.log.call(null,inst_16898);
var inst_16900 = (function (){var all_files = inst_16871;
var res_SINGLEQUOTE_ = inst_16874;
var res = inst_16875;
var files_not_loaded = inst_16877;
var dependencies_that_loaded = inst_16879;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_16879,inst_16871,inst_16877,inst_16875,inst_16874,inst_16894,inst_16896,inst_16897,inst_16898,inst_16899,state_val_16959,c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
figwheel.client.file_reloading.on_jsload_custom_event.call(null,res);

return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_16879,inst_16871,inst_16877,inst_16875,inst_16874,inst_16894,inst_16896,inst_16897,inst_16898,inst_16899,state_val_16959,c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_16901 = setTimeout(inst_16900,(10));
var state_16958__$1 = (function (){var statearr_17029 = state_16958;
(statearr_17029[(33)] = inst_16894);

(statearr_17029[(34)] = inst_16899);

return statearr_17029;
})();
var statearr_17030_17096 = state_16958__$1;
(statearr_17030_17096[(2)] = inst_16901);

(statearr_17030_17096[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (16))){
var state_16958__$1 = state_16958;
var statearr_17031_17097 = state_16958__$1;
(statearr_17031_17097[(2)] = reload_dependents);

(statearr_17031_17097[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (38))){
var inst_16911 = (state_16958[(16)]);
var inst_16929 = cljs.core.apply.call(null,cljs.core.hash_map,inst_16911);
var state_16958__$1 = state_16958;
var statearr_17032_17098 = state_16958__$1;
(statearr_17032_17098[(2)] = inst_16929);

(statearr_17032_17098[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (30))){
var state_16958__$1 = state_16958;
var statearr_17033_17099 = state_16958__$1;
(statearr_17033_17099[(2)] = null);

(statearr_17033_17099[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (10))){
var inst_16831 = (state_16958[(22)]);
var inst_16833 = cljs.core.chunked_seq_QMARK_.call(null,inst_16831);
var state_16958__$1 = state_16958;
if(inst_16833){
var statearr_17034_17100 = state_16958__$1;
(statearr_17034_17100[(1)] = (13));

} else {
var statearr_17035_17101 = state_16958__$1;
(statearr_17035_17101[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (18))){
var inst_16865 = (state_16958[(2)]);
var state_16958__$1 = state_16958;
if(cljs.core.truth_(inst_16865)){
var statearr_17036_17102 = state_16958__$1;
(statearr_17036_17102[(1)] = (19));

} else {
var statearr_17037_17103 = state_16958__$1;
(statearr_17037_17103[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (42))){
var state_16958__$1 = state_16958;
var statearr_17038_17104 = state_16958__$1;
(statearr_17038_17104[(2)] = null);

(statearr_17038_17104[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (37))){
var inst_16924 = (state_16958[(2)]);
var state_16958__$1 = state_16958;
var statearr_17039_17105 = state_16958__$1;
(statearr_17039_17105[(2)] = inst_16924);

(statearr_17039_17105[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16959 === (8))){
var inst_16818 = (state_16958[(8)]);
var inst_16831 = (state_16958[(22)]);
var inst_16831__$1 = cljs.core.seq.call(null,inst_16818);
var state_16958__$1 = (function (){var statearr_17040 = state_16958;
(statearr_17040[(22)] = inst_16831__$1);

return statearr_17040;
})();
if(inst_16831__$1){
var statearr_17041_17106 = state_16958__$1;
(statearr_17041_17106[(1)] = (10));

} else {
var statearr_17042_17107 = state_16958__$1;
(statearr_17042_17107[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents))
;
return ((function (switch__11363__auto__,c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents){
return (function() {
var figwheel$client$file_reloading$reload_js_files_$_state_machine__11364__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__11364__auto____0 = (function (){
var statearr_17046 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17046[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__11364__auto__);

(statearr_17046[(1)] = (1));

return statearr_17046;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__11364__auto____1 = (function (state_16958){
while(true){
var ret_value__11365__auto__ = (function (){try{while(true){
var result__11366__auto__ = switch__11363__auto__.call(null,state_16958);
if(cljs.core.keyword_identical_QMARK_.call(null,result__11366__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__11366__auto__;
}
break;
}
}catch (e17047){if((e17047 instanceof Object)){
var ex__11367__auto__ = e17047;
var statearr_17048_17108 = state_16958;
(statearr_17048_17108[(5)] = ex__11367__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16958);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e17047;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__11365__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17109 = state_16958;
state_16958 = G__17109;
continue;
} else {
return ret_value__11365__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__11364__auto__ = function(state_16958){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__11364__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__11364__auto____1.call(this,state_16958);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__11364__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__11364__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__11364__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__11364__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__11364__auto__;
})()
;})(switch__11363__auto__,c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var state__11477__auto__ = (function (){var statearr_17049 = f__11476__auto__.call(null);
(statearr_17049[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__11475__auto__);

return statearr_17049;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__11477__auto__);
});})(c__11475__auto__,map__16803,map__16803__$1,opts,before_jsload,on_jsload,reload_dependents,map__16804,map__16804__$1,msg,files,figwheel_meta,recompile_dependents))
);

return c__11475__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(location.protocol),cljs.core.str.cljs$core$IFn$_invoke$arity$1("//")].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__17112,link){
var map__17115 = p__17112;
var map__17115__$1 = ((((!((map__17115 == null)))?((((map__17115.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17115.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17115):map__17115);
var file = cljs.core.get.call(null,map__17115__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4657__auto__ = link.href;
if(cljs.core.truth_(temp__4657__auto__)){
var link_href = temp__4657__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,((function (link_href,temp__4657__auto__,map__17115,map__17115__$1,file){
return (function (p1__17110_SHARP_,p2__17111_SHARP_){
if(cljs.core._EQ_.call(null,p1__17110_SHARP_,p2__17111_SHARP_)){
return p1__17110_SHARP_;
} else {
return false;
}
});})(link_href,temp__4657__auto__,map__17115,map__17115__$1,file))
,cljs.core.reverse.call(null,clojure.string.split.call(null,file,"/")),cljs.core.reverse.call(null,clojure.string.split.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href),"/")))));
var match_length = cljs.core.count.call(null,match);
var file_name_length = cljs.core.count.call(null,cljs.core.last.call(null,clojure.string.split.call(null,file,"/")));
if((match_length >= file_name_length)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"link","link",-1769163468),link,new cljs.core.Keyword(null,"link-href","link-href",-250644450),link_href,new cljs.core.Keyword(null,"match-length","match-length",1101537310),match_length,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083),cljs.core.count.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href))], null);
} else {
return null;
}
} else {
return null;
}
});
figwheel.client.file_reloading.get_correct_link = (function figwheel$client$file_reloading$get_correct_link(f_data){
var temp__4657__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__17121){
var map__17122 = p__17121;
var map__17122__$1 = ((((!((map__17122 == null)))?((((map__17122.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17122.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17122):map__17122);
var match_length = cljs.core.get.call(null,map__17122__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
var current_url_length = cljs.core.get.call(null,map__17122__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__17117_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__17117_SHARP_);
}),figwheel.client.file_reloading.current_links.call(null))));
if(cljs.core.truth_(temp__4657__auto__)){
var res = temp__4657__auto__;
return new cljs.core.Keyword(null,"link","link",-1769163468).cljs$core$IFn$_invoke$arity$1(res);
} else {
return null;
}
});
figwheel.client.file_reloading.clone_link = (function figwheel$client$file_reloading$clone_link(link,url){
var clone = document.createElement("link");
clone.rel = "stylesheet";

clone.media = link.media;

clone.disabled = link.disabled;

clone.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return clone;
});
figwheel.client.file_reloading.create_link = (function figwheel$client$file_reloading$create_link(url){
var link = document.createElement("link");
link.rel = "stylesheet";

link.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return link;
});
figwheel.client.file_reloading.distinctify = (function figwheel$client$file_reloading$distinctify(key,seqq){
return cljs.core.vals.call(null,cljs.core.reduce.call(null,(function (p1__17124_SHARP_,p2__17125_SHARP_){
return cljs.core.assoc.call(null,p1__17124_SHARP_,cljs.core.get.call(null,p2__17125_SHARP_,key),p2__17125_SHARP_);
}),cljs.core.PersistentArrayMap.EMPTY,seqq));
});
figwheel.client.file_reloading.add_link_to_document = (function figwheel$client$file_reloading$add_link_to_document(orig_link,klone,finished_fn){
var parent = orig_link.parentNode;
if(cljs.core._EQ_.call(null,orig_link,parent.lastChild)){
parent.appendChild(klone);
} else {
parent.insertBefore(klone,orig_link.nextSibling);
}

return setTimeout(((function (parent){
return (function (){
parent.removeChild(orig_link);

return finished_fn.call(null);
});})(parent))
,(300));
});
if(typeof figwheel.client.file_reloading.reload_css_deferred_chain !== 'undefined'){
} else {
figwheel.client.file_reloading.reload_css_deferred_chain = cljs.core.atom.call(null,goog.async.Deferred.succeed());
}
figwheel.client.file_reloading.reload_css_file = (function figwheel$client$file_reloading$reload_css_file(f_data,fin){
var temp__4655__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);
if(cljs.core.truth_(temp__4655__auto__)){
var link = temp__4655__auto__;
return figwheel.client.file_reloading.add_link_to_document.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,link.href),((function (link,temp__4655__auto__){
return (function (){
return fin.call(null,cljs.core.assoc.call(null,f_data,new cljs.core.Keyword(null,"loaded","loaded",-1246482293),true));
});})(link,temp__4655__auto__))
);
} else {
return fin.call(null,f_data);
}
});
figwheel.client.file_reloading.reload_css_files_STAR_ = (function figwheel$client$file_reloading$reload_css_files_STAR_(deferred,f_datas,on_cssload){
return figwheel.client.utils.liftContD.call(null,figwheel.client.utils.mapConcatD.call(null,deferred,figwheel.client.file_reloading.reload_css_file,f_datas),(function (f_datas_SINGLEQUOTE_,fin){
var loaded_f_datas_17126 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded","loaded",-1246482293),f_datas_SINGLEQUOTE_);
figwheel.client.file_reloading.on_cssload_custom_event.call(null,loaded_f_datas_17126);

if(cljs.core.fn_QMARK_.call(null,on_cssload)){
on_cssload.call(null,loaded_f_datas_17126);
} else {
}

return fin.call(null);
}));
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__17127,p__17128){
var map__17133 = p__17127;
var map__17133__$1 = ((((!((map__17133 == null)))?((((map__17133.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17133.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17133):map__17133);
var on_cssload = cljs.core.get.call(null,map__17133__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
var map__17134 = p__17128;
var map__17134__$1 = ((((!((map__17134 == null)))?((((map__17134.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__17134.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17134):map__17134);
var files_msg = map__17134__$1;
var files = cljs.core.get.call(null,map__17134__$1,new cljs.core.Keyword(null,"files","files",-472457450));
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
var temp__4657__auto__ = cljs.core.not_empty.call(null,figwheel.client.file_reloading.distinctify.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files));
if(cljs.core.truth_(temp__4657__auto__)){
var f_datas = temp__4657__auto__;
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.reload_css_deferred_chain,figwheel.client.file_reloading.reload_css_files_STAR_,f_datas,on_cssload);
} else {
return null;
}
} else {
return null;
}
});

//# sourceMappingURL=file_reloading.js.map