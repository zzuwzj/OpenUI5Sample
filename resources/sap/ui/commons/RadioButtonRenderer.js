/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.RadioButtonRenderer");jQuery.sap.require("sap.ui.core.ValueStateSupport");sap.ui.commons.RadioButtonRenderer={};
sap.ui.commons.RadioButtonRenderer.render=function(r,R){if(!R.getVisible()){return}var i=R.getId();var t=R.getTooltip_AsString();r.addClass("sapUiRb");r.write("<span");r.writeControlData(R);r.writeAccessibilityState(R,{role:"radio",checked:R.getSelected()===true,invalid:R.getValueState()==sap.ui.core.ValueState.Error,disabled:!R.getEditable(),labelledby:i+"-label",describedby:t?i+"-Descr":undefined});var e=R.getEnabled()!=null&&R.getEnabled();var a=R.getEditable()!=null&&R.getEditable();var b=false;var c=false;if(R.getValueState()!=null){b=sap.ui.core.ValueState.Error==R.getValueState();c=sap.ui.core.ValueState.Warning==R.getValueState()}if(R.getSelected()){r.addClass("sapUiRbSel")}var m=0;var d=false;if(!e){m=-1;d=true;r.addClass("sapUiRbDis")}if(!a){d=true;r.addClass("sapUiRbRo")}if(b){r.addClass("sapUiRbErr")}else if(c){r.addClass("sapUiRbWarn")}if(e&&a&&!b&&!c){r.addClass("sapUiRbStd")}if(e&&a){r.addClass("sapUiRbInteractive")}r.writeClasses();if(R.getWidth()&&R.getWidth()!=''){r.writeAttribute("style","width:"+R.getWidth()+";")}r.writeAttribute("tabIndex",m);var f=sap.ui.core.ValueStateSupport.enrichTooltip(R,t?t:R.getText());if(f){r.writeAttributeEscaped("title",f)}r.write(">");r.write("<input type='radio' tabindex='-1' id='");r.write(i);r.write("-RB' name=\"");r.writeEscaped(R.getGroupName());r.write("\" ");if(R.getSelected()){r.write(" checked='checked'")}if(!e){r.write(" disabled='disabled'")}if(d){r.write(" readonly='readonly'");r.write(" disabled='disabled'")}if(R.getKey()){r.writeAttributeEscaped("value",R.getKey())}r.write(" />");r.write("<label id=\""+i+"-label\"");r.writeAttribute("for",i+"-RB");if(!R.getText()){r.write(" class=\"sapUiRbNoText\"")}r.write(">");if(R.getText()){this.renderText(r,R.getText(),R.getTextDirection())}r.write("</label>");if(t){r.write("<span id=\""+i+"-Descr\" style=\"visibility: hidden; display: none;\">");r.writeEscaped(t);r.write("</span>")}r.write("</span>")};
sap.ui.commons.RadioButtonRenderer.renderText=function(r,t,e){var a=r;if(!e||e==sap.ui.core.TextDirection.Inherit){a.writeEscaped(t)}else{a.write("<span style=\"direction:"+e.toLowerCase()+";\">");a.writeEscaped(t);a.write("</span>")}};
sap.ui.commons.RadioButtonRenderer.setSelected=function(r,s){r.$().toggleClass('sapUiRbSel',s).attr('aria-checked',s);var d=r.getDomRef("RB");if(s){d.checked=true;d.setAttribute('checked','checked')}else{d.checked=false;d.removeAttribute('checked')}};
