/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.ImageMap");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.commons.ImageMap",{metadata:{publicMethods:["createArea"],library:"sap.ui.commons",properties:{"name":{type:"string",group:"Misc",defaultValue:null}},aggregations:{"areas":{type:"sap.ui.commons.Area",multiple:true,singularName:"area"}},events:{"press":{}}}});sap.ui.commons.ImageMap.M_EVENTS={'press':'press'};jQuery.sap.require("sap.ui.core.delegate.ItemNavigation");
sap.ui.commons.ImageMap.prototype.createArea=function(){var a=new sap.ui.commons.Area();for(var i=0;i<arguments.length;i++){var c=arguments[i];var a;if(c instanceof sap.ui.commons.Area){a=c}else{a=new sap.ui.commons.Area(c)}this.addArea(a)}return this};
sap.ui.commons.ImageMap.prototype.onAfterRendering=function(){this.oDomRef=this.getDomRef();if(!this.oItemNavigation){this.oItemNavigation=new sap.ui.core.delegate.ItemNavigation()}if(!!sap.ui.Device.browser.internet_explorer){var t=this;var I=[];this.oItemNavigation.setTabIndex0();var $=jQuery("img[useMap=#"+this.getName()+"]");$.each(function(i,b){var c=b.getAttribute("id");var e=sap.ui.getCore().byId(c);e.addDelegate(t.oItemNavigation);t.oItemNavigation.setRootDomRef(b);I.push(e)});this.aImageControls=I}else{this.addDelegate(this.oItemNavigation);this.oItemNavigation.setRootDomRef(this.oDomRef)}var a=[];var A=this.getAreas();for(var i=0;i<A.length;i++){var d=A[i].getFocusDomRef();if(d){a.push(d)}}this.oItemNavigation.setItemDomRefs(a);this.oItemNavigation.setCycling(true);this.oItemNavigation.setSelectedIndex(-1);this.oItemNavigation.setFocusedIndex(-1)};
sap.ui.commons.ImageMap.prototype.exit=function(){if(this.oItemNavigation){if(!!sap.ui.Device.browser.internet_explorer){for(var i=0;i<this.aImageControls.length;i++){this.aImageControls[i].removeDelegate(this.oItemNavigation)}}else{this.removeDelegate(this.oItemNavigation)}this.oItemNavigation.destroy();delete this.oItemNavigation}};
