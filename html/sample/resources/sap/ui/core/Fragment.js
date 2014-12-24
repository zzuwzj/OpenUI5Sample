/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/ManagedObject','./DeclarativeSupport','./XMLTemplateProcessor'],function(q,M,D,X){"use strict";var r={},t={};var F=M.extend("sap.ui.core.Fragment",{metadata:{properties:{type:"string"}},constructor:function(i,s){M.apply(this,arguments);if(this._aContent&&this._aContent.length==1){return this._aContent[0]}else{return this._aContent}}});F.registerType=function(T,f){if(!typeof(T)==="string"){q.sap.log.error("Ignoring non-string Fragment type: "+T);return}if(t[T]){q.sap.log.warning("sap.ui.core.Fragment.registerType(): Fragment type '"+T+"' is already defined. Overriding this type now!")}t[T]=f};F.prototype._initCompositeSupport=function(s){if(!s){throw new Error("Settings must be set")}if(!(s.fragmentName||s.fragmentContent)){throw new Error("Please provide a fragment name")}if(s.oController){this.oController=s.oController}this._sExplicitId=s.sId||s.id;this._sFragmentName=s.fragmentName;var f=t[s.type];if(f){f.init.apply(this,[s])}else{throw new Error("No type for the fragment has been specified: "+s.type)}};F.prototype.getController=function(){return this.oController};F.byId=function(f,i){if(!(typeof(f)==="string"&&typeof(i)==="string")){q.sap.log.error("sap.ui.core.Fragment.byId: two strings must be given as parameters, but are: "+f+" and "+i);return undefined}return sap.ui.getCore().byId(f+"--"+i)};F.createId=function(f,i){if(!(typeof(f)==="string"&&typeof(i)==="string")){q.sap.log.error("sap.ui.core.Fragment.createId: two strings must be given as parameters, but are: "+f+" and "+i);return undefined}return f+"--"+i};F.prototype.createId=function(i){var a=this._sExplicitId?this._sExplicitId+"--"+i:i;if(this._oContainingView&&this._oContainingView!=this){a=this._oContainingView.createId(a)}return a};F.prototype.isSubView=function(){return true};sap.ui.fragment=function(n,T,c){var s={};if(typeof(n)==="string"){s.fragmentName=n;s.oController=c;s.type=T}else if(typeof(n)==="object"){s=n;if(T){s.oController=T}}else{q.sap.log.error("sap.ui.fragment() must be called with Fragment name or config object as first parameter, but is: "+n)}return new F(s)};sap.ui.xmlfragment=function(i,f,c){if(typeof(i)==="string"){if(typeof(f)==="string"){return sap.ui.fragment({fragmentName:f,sId:i,type:"XML"},c)}else{return sap.ui.fragment(i,"XML",f)}}else{i.type="XML";return sap.ui.fragment(i,f)}};sap.ui.jsfragment=function(n,f){if(typeof(n)==="string"&&typeof(f)==="object"){if(f.createContent){r[n]=f;q.sap.declare({modName:n,type:"fragment"},false)}else{return sap.ui.fragment(n,"JS",f)}}else if(typeof(n)==="string"&&f===undefined){return sap.ui.fragment(n,"JS")}else{if(typeof(n)==="object"){n.type="JS";return sap.ui.fragment(n,f)}else if(arguments&&arguments.length>=3){return sap.ui.fragment({id:n,fragmentName:f,type:"JS"},arguments[2])}else{q.sap.log.error("sap.ui.jsfragment() was called with wrong parameter set: "+n+" + "+f)}}};sap.ui.htmlfragment=function(i,f,c){if(typeof(i)==="string"){if(typeof(f)==="string"){return sap.ui.fragment({fragmentName:f,sId:i,type:"HTML"},c)}else{return sap.ui.fragment(i,"HTML",f)}}else{i.type="HTML";return sap.ui.fragment(i,f)}};F.registerType("XML",{init:function(s){this._xContent=s.fragmentContent?((typeof(s.fragmentContent)==="string")?q.parseXML(s.fragmentContent).documentElement:s.fragmentContent):X.loadTemplate(s.fragmentName,"fragment");this._oContainingView=this._sExplicitId?this:(s.containingView||this);if((this._oContainingView===this)){this._oContainingView.oController=(s.containingView&&s.containingView.oController)||s.oController}var a=this;M.runWithPreprocessors(function(){var x=a._xContent;a._aContent=X.parseTemplate(a._xContent,a)})}});F.registerType("JS",{init:function(s){if(!r[s.fragmentName]){q.sap.require({modName:s.fragmentName,type:"fragment"})}q.extend(this,r[s.fragmentName]);this._oContainingView=s.containingView||this;var a=this;M.runWithPreprocessors(function(){var c=a.createContent(s.oController||a._oContainingView.oController);a._aContent=[];a._aContent=a._aContent.concat(c)})}});(function(){var _={};var a=function(T){var u=q.sap.getModulePath(T,".fragment.html");var h=_[u];var R;if(!h){R=q.sap.getResourceName(T,".fragment.html");h=q.sap.loadResource(R);_[u]=h}return h};F.registerType("HTML",{init:function(s){this._aContent=[];this.getContent=function(){return this._aContent};this.addContent=function(C){this._aContent.push(C)};this._oContainingView=s.containingView||this;var h=s.fragmentContent||a(s.fragmentName);this._oTemplate=document.createElement("div");var H=sap.ui.core.RenderManager.prepareHTML5(h);if(typeof H==="string"){this._oTemplate.innerHTML=H}else{var n=H;var f=document.createDocumentFragment();for(var i=0;i<n.length;i++){f.appendChild(n.item(i))}this._oTemplate.appendChild(f)}var m=this._oTemplate.getElementsByTagName("template")[0];var p=this.getMetadata().getAllProperties();if(m){var b=this;var c=D;q.each(m.attributes,function(I,A){var N=c.convertAttributeToSettingName(A.name,b.getId());var v=A.value;var P=p[N];if(!s[N]){if(P){s[N]=c.convertValueToType(c.getPropertyDataType(P),v)}else if(sap.ui.core.mvc.HTMLView._mAllowedSettings[N]){s[N]=v}}});this._oTemplate=m}if(this._oTemplate.content){var f=this._oTemplate.content;this._oTemplate=document.createElement("div");this._oTemplate.appendChild(f)}var b=this;M.runWithPreprocessors(function(){D.compile(b._oTemplate,b);var d=b.getContent();if(d&&d.length===1){b._aContent=[d[0]]}else{}})}})}());return F},true);
