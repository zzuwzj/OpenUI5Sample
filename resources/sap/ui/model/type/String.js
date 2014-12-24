/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/format/NumberFormat','sap/ui/model/SimpleType'],function(q,N,S){"use strict";var a=S.extend("sap.ui.model.type.String",{constructor:function(){S.apply(this,arguments);this.sName="String";if(this.oConstraints.search&&typeof this.oConstraints.search=="string"){this.oConstraints.search=new RegExp(this.oConstraints.search)}}});a.prototype.formatValue=function(v,i){if(v==undefined||v==null){return null}switch(i){case"string":return v;case"int":var r=parseInt(v,10);if(isNaN(r)){throw new sap.ui.model.FormatException(v+" is not a valid int value")}return r;case"float":var R=parseFloat(v);if(isNaN(R)){throw new sap.ui.model.FormatException(v+" is not a valid float value")}return R;case"boolean":if(v.toLowerCase()=="true"||v=="X"){return true}if(v.toLowerCase()=="false"||v==""){return false}throw new sap.ui.model.FormatException(v+" is not a valid boolean value");default:throw new sap.ui.model.FormatException("Don't know how to format String to "+i)}};a.prototype.parseValue=function(v,i){var r;switch(i){case"string":return v;case"boolean":case"int":case"float":return v.toString();default:throw new sap.ui.model.ParseException("Don't know how to parse String from "+i)}};a.prototype.validateValue=function(v){if(this.oConstraints){var V=[];q.each(this.oConstraints,function(n,c){switch(n){case"maxLength":if(v.length>c){V.push("maxLength")}break;case"minLength":if(v.length<c){V.push("minLength")}break;case"startsWith":if(!q.sap.startsWith(v,c)){V.push("startsWith")}break;case"startsWithIgnoreCase":if(!q.sap.startsWithIgnoreCase(v,c)){V.push("startsWithIgnoreCase")}break;case"endsWith":if(!q.sap.endsWith(v,c)){V.push("endsWith")}break;case"endsWithIgnoreCase":if(!q.sap.endsWithIgnoreCase(v,c)){V.push("endsWithIgnoreCase")}break;case"contains":if(v.indexOf(c)==-1){V.push("contains")}break;case"equals":if(v!=c){V.push("equals")}break;case"search":if(v.search(c)==-1){V.push("search")}break}});if(V.length>0){throw new sap.ui.model.ValidateException("Validation of type constraints failed",V)}}};return a},true);
