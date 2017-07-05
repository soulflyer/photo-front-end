// Compiled by ClojureScript 1.9.473 {:elide-asserts true, :target :nodejs}
goog.provide('photo_front_end.core');
goog.require('cljs.core');
goog.require('cljs.nodejs');
photo_front_end.core.path = cljs.nodejs.require.call(null,"path");
photo_front_end.core.Electron = cljs.nodejs.require.call(null,"electron");
photo_front_end.core.BrowserWindow = photo_front_end.core.Electron.BrowserWindow;
photo_front_end.core.crash_reporter = photo_front_end.core.Electron.crashReporter;
photo_front_end.core.Os = cljs.nodejs.require.call(null,"os");
photo_front_end.core._STAR_win_STAR_ = cljs.core.atom.call(null,null);
photo_front_end.core.app = photo_front_end.core.Electron.app;
photo_front_end.core._main = (function photo_front_end$core$_main(){
photo_front_end.core.crash_reporter.start(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"companyName","companyName",2030952346),"Soulflyer",new cljs.core.Keyword(null,"submitURL","submitURL",-169159433),"http://soulflyer.co.uk/"], null)));

cljs.nodejs.process.on("error",(function (err){
return console.log(err);
}));

photo_front_end.core.app.on("window-all-closed",(function (){
if(cljs.core.not_EQ_.call(null,cljs.nodejs.process.platform,"darwin")){
return photo_front_end.core.app.quit();
} else {
return null;
}
}));

return photo_front_end.core.app.on("ready",(function (){
cljs.core.reset_BANG_.call(null,photo_front_end.core._STAR_win_STAR_,(new photo_front_end.core.BrowserWindow(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),(800),new cljs.core.Keyword(null,"height","height",1025178622),(600)], null)))));

cljs.core.deref.call(null,photo_front_end.core._STAR_win_STAR_).loadURL([cljs.core.str.cljs$core$IFn$_invoke$arity$1("file://"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(photo_front_end.core.path.resolve(__dirname,"../index.html"))].join(''));

return cljs.core.deref.call(null,photo_front_end.core._STAR_win_STAR_).on("closed",(function (){
return cljs.core.reset_BANG_.call(null,photo_front_end.core._STAR_win_STAR_,null);
}));
}));
});
cljs.nodejs.enable_util_print_BANG_.call(null);
console.log([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Start descjop application on "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(photo_front_end.core.Os.type()),cljs.core.str.cljs$core$IFn$_invoke$arity$1(".")].join(''));
cljs.core._STAR_main_cli_fn_STAR_ = photo_front_end.core._main;
