/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.MessageBox");jQuery.sap.require("sap.ui.commons.Button");jQuery.sap.require("sap.ui.commons.Dialog");jQuery.sap.require("sap.ui.commons.Image");jQuery.sap.require("sap.ui.commons.layout.MatrixLayout");jQuery.sap.require("sap.ui.commons.TextView");sap.ui.commons.MessageBox={};sap.ui.commons.MessageBox.Action={OK:"OK",CANCEL:"CANCEL",YES:"YES",NO:"NO",ABORT:"ABORT",RETRY:"RETRY",IGNORE:"IGNORE",CLOSE:"CLOSE"};sap.ui.commons.MessageBox.Icon={NONE:"NONE",INFORMATION:"INFORMATION",WARNING:"WARNING",ERROR:"ERROR",CRITICAL:"CRITICAL",SUCCESS:"SUCCESS",QUESTION:"QUESTION"};(function(){var c=sap.ui.commons,A=c.MessageBox.Action,I=c.MessageBox.Icon,i={INFORMATION:"sapUiMboxInfo",CRITICAL:"sapUiMboxCritical",ERROR:"sapUiMboxError",WARNING:"sapUiMboxWarning",SUCCESS:"sapUiMboxSuccess",QUESTION:"sapUiMboxQuestion"};sap.ui.commons.MessageBox.show=function(m,o,t,a,C,d,D){var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons"),b,R,e,M,f;if(typeof a!=="undefined"&&!jQuery.isArray(a)){a=[a]}if(!a||a.length===0){a=[A.OK]}D=D||sap.ui.core.ElementMetadata.uid("mbox");function g(s){var T=r&&r.getText("MSGBOX_"+s),B=new c.Button({id:D+"--btn-"+s,text:T||s,press:function(){R=s;b.close()}});if(s===d){f=B}return B}function h(e){return new c.layout.MatrixLayoutCell({padding:c.layout.Padding.None,vAlign:c.layout.VAlign.Top,content:e})}function j(o){var l=new c.Image({id:D+"--icon",tooltip:r&&r.getText("MSGBOX_ICON_"+o),decorative:true});l.addStyleClass("sapUiMboxIcon");l.addStyleClass(i[o]);return l}function k(){if(typeof C==="function"){C(R||A.CLOSE)}b.detachClosed(k);b.destroy()}e=new c.layout.MatrixLayout({id:D+"--lyt",layoutFixed:false}).addStyleClass("sapUiMboxCont");if(typeof(m)==="string"){M=new c.TextView({id:D+"--msg"}).setText(m).addStyleClass("sapUiMboxText")}else if(m instanceof sap.ui.core.Control){M=m.addStyleClass("sapUiMboxText")}if(o!==I.NONE){e.createRow(h(j(o)),h(M))}else{e.createRow(h(M))}b=new c.Dialog({id:D,applyContentPadding:false,title:t,accessibleRole:sap.ui.core.AccessibleRole.AlertDialog,resizable:false,modal:true,buttons:jQuery.map(a,g),content:e,defaultButton:f,closed:k});b.open()};sap.ui.commons.MessageBox.alert=function(m,C,t,d){return c.MessageBox.show(m,I.NONE,t,A.OK,function(a){if(typeof C==="function"){C()}},A.OK,d||sap.ui.core.ElementMetadata.uid("alert"))};sap.ui.commons.MessageBox.confirm=function(m,C,t,d){return c.MessageBox.show(m,I.QUESTION,t,[A.OK,A.CANCEL],function(a){if(typeof C==="function"){C(a===A.OK)}},undefined,d||sap.ui.core.ElementMetadata.uid("confirm"))}}());
