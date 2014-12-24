/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.DialogRenderer");sap.ui.commons.DialogRenderer={};
sap.ui.commons.DialogRenderer.render=function(r,c){var h=sap.ui.commons.Dialog._isSizeSet(c.getHeight());var w=sap.ui.commons.Dialog._isSizeSet(c.getWidth());var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");c.getScrollTop();c.getScrollLeft();var b=c.getButtons();var B=b.length;r.write("<div");r.writeControlData(c);r.addClass("sapUiDlg");if(c.getModal()){r.addClass("sapUiDlgModal")}r.addClass("sapUiDlgContentBorderDesign"+c.getContentBorderDesign());r.addStyle("width",c.getWidth());r.addStyle("height",c.getHeight());r.addStyle("min-width",c.getMinWidth());r.addStyle("min-height",c.getMinHeight());r.addStyle("max-width",c.getMaxWidth());r.addStyle("max-height",c.getMaxHeight());r.addStyle("display","none");if(!h){r.addClass("sapUiDlgFlexHeight")}if(!w){r.addClass("sapUiDlgFlexWidth")}if(B==0){r.addClass("sapUiDlgNoButtons")}if(!c.getApplyContentPadding()){r.addClass("sapUiDlgNoPad")}r.writeClasses();r.writeStyles();r.writeAttribute("aria-labelledby",c.getId()+"-lbl "+c.getId()+"-acc");r.writeAttribute("role",c.getAccessibleRole().toLowerCase());r.writeAttribute("tabindex","-1");r.write("><span style='display:none;' id='",c.getId(),"-acc'>",a.getText("DIALOG_CLOSE_HELP"),"</span>");r.write("<span id='"+c.getId()+"-fhfe' tabIndex='0'></span><div id='"+c.getId()+"-hdr' class='sapUiDlgHdr'>");r.write("<span class='sapUiDlgHdrLeft' id='"+c.getId()+"-hdrL'>");var t=c.getTitle();r.write("<span id='"+c.getId()+"-lbl' class='sapUiDlgLabel'");r.writeAttribute("role","heading");r.writeAttribute("aria-level","1");if(t){r.writeAttributeEscaped("title",t)}r.write(">");if(!t){r.write("&nbsp;")}else{r.writeEscaped(t)}r.write("</span></span>");r.write("<span id='",c.getId(),"-hdrR' class='sapUiDlgHdrBtns'>");if(c.getShowCloseButton()){r.write("<a id='",c.getId(),"-close' class='sapUiDlgCloseBtn' href='javascript:void(0)'");r.write(" tabIndex='-1'");r.writeAttribute("role","button");r.writeAttributeEscaped("aria-label",a.getText("DIALOG_CLOSE_HELP"));r.writeAttributeEscaped("title",a.getText("DIALOG_CLOSE_TEXT"));r.write(">X</a>")}r.write("</span></div>");r.write('<div class="sapUiDlgHdrSep"></div>');r.write("<div class='sapUiDlgCont' id='",c.getId(),"-cont' tabindex=\"-1\">");var C=c.getContent();for(var i=0;i<C.length;i++){r.renderControl(C[i])}r.write("</div>");if(B>0){r.write('<div class="sapUiDlgFooterSep"></div>')}r.write("<div id='");r.write(c.getId());r.write("-footer' class='sapUiDlgFooter'>");r.write("<div class='sapUiDlgBtns'>");for(var i=0;i<B;i++){r.renderControl(b[i])}r.write("</div><div class='sapUiDlgWave'></div></div>");if(c.getResizable()){r.write("<span id='");r.write(c.getId());r.write("-grip' class='sapUiDlgGrip'>&#916;</span>")}r.write("<span id='"+c.getId()+"-fhee' tabIndex='0'></span></div>")};
