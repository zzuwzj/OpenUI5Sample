/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.table.TreeTable");jQuery.sap.require("sap.ui.table.library");jQuery.sap.require("sap.ui.table.Table");sap.ui.table.Table.extend("sap.ui.table.TreeTable",{metadata:{publicMethods:["expand","collapse","isExpanded"],library:"sap.ui.table",properties:{"expandFirstLevel":{type:"boolean",group:"",defaultValue:false},"useGroupMode":{type:"boolean",group:"Appearance",defaultValue:false},"groupHeaderProperty":{type:"string",group:"Data",defaultValue:null}},events:{"toggleOpenState":{}}}});sap.ui.table.TreeTable.M_EVENTS={'toggleOpenState':'toggleOpenState'};
sap.ui.table.TreeTable.prototype.init=function(){sap.ui.table.Table.prototype.init.apply(this,arguments);this._iLastFixedColIndex=0;if(sap.ui.getCore().getConfiguration().getTheme()==="sap_bluecrystal"){jQuery.sap.require("sap.ui.core.IconPool");sap.ui.core.IconPool.insertFontFaceStyle()}};
sap.ui.table.TreeTable.prototype.setFixedRowCount=function(r){jQuery.sap.log.warning("TreeTable: the property \"fixedRowCount\" is not supported and will be ignored!");return this};
sap.ui.table.TreeTable.prototype.onAfterRendering=function(){sap.ui.table.Table.prototype.onAfterRendering.apply(this,arguments);this.$().find("[role=grid]").attr("role","treegrid")};
sap.ui.table.TreeTable.prototype.isTreeBinding=function(n){n=n||"rows";if(n==="rows"){return true}return sap.ui.core.Element.prototype.isTreeBinding.apply(this,n)};
sap.ui.table.TreeTable.prototype.getBinding=function(n){n=n||"rows";var b=sap.ui.core.Element.prototype.getBinding.call(this,n);if(b&&this.isTreeBinding(n)&&n==="rows"&&!b.getLength){var t=this;jQuery.extend(b,{_init:function(e){this._bExpandFirstLevel=e;this.mContextInfo={};this._initContexts();if(e&&!this._bFirstLevelExpanded){this._expandFirstLevel()}},_initContexts:function(s){this.aContexts=this.getRootContexts();for(var i=0,l=this.aContexts.length;i<l;i++){var o=this._getContextInfo(this.aContexts[i]);this._setContextInfo({oContext:this.aContexts[i],iLevel:0,bExpanded:o?o.bExpanded:false})}if(this._bExpandFirstLevel&&!this._bFirstLevelExpanded){this._expandFirstLevel(s)}},_expandFirstLevel:function(s){var t=this;if(this.aContexts&&this.aContexts.length>0){jQuery.each(this.aContexts.slice(),function(i,c){if(!s){t._loadChildContexts(c)}t._getContextInfo(c).bExpanded=true});this._bFirstLevelExpanded=true}},_fnFireFilter:b._fireFilter,_fireFilter:function(){this._fnFireFilter.apply(this,arguments);this._initContexts(true);this._restoreContexts(this.aContexts)},_fnFireChange:b._fireChange,_fireChange:function(){this._fnFireChange.apply(this,arguments);this._initContexts(true);this._restoreContexts(this.aContexts)},_restoreContexts:function(c){var t=this;var N=[];jQuery.each(c.slice(),function(i,C){var o=t._getContextInfo(C);if(o&&o.bExpanded){N.push.apply(N,t._loadChildContexts(C))}});if(N.length>0){this._restoreContexts(N)}},_loadChildContexts:function(c){var C=this._getContextInfo(c);var I=jQuery.inArray(c,this.aContexts);var N=this.getNodeContexts(c);for(var i=0,l=N.length;i<l;i++){this.aContexts.splice(I+i+1,0,N[i]);var o=this._getContextInfo(N[i]);this._setContextInfo({oParentContext:c,oContext:N[i],iLevel:C.iLevel+1,bExpanded:o?o.bExpanded:false})}return N},_getContextInfo:function(c){return c?this.mContextInfo[c.getPath()]:undefined},_setContextInfo:function(d){if(d&&d.oContext){this.mContextInfo[d.oContext.getPath()]=d}},getLength:function(){return this.aContexts?this.aContexts.length:0},getContexts:function(s,l){return this.aContexts.slice(s,s+l)},getLevel:function(c){var C=this._getContextInfo(c);return C?C.iLevel:-1},isExpanded:function(c){var C=this._getContextInfo(c);return C?C.bExpanded:false},expandContext:function(c){var C=this._getContextInfo(c);if(C&&!C.bExpanded){this.storeSelection();this._loadChildContexts(c);C.bExpanded=true;this._fireChange();this.restoreSelection()}},collapseContext:function(c){var C=this._getContextInfo(c);if(C&&C.bExpanded){this.storeSelection();for(var i=this.aContexts.length-1;i>0;i--){if(this._getContextInfo(this.aContexts[i]).oParentContext===c){this.aContexts.splice(i,1)}}C.bExpanded=false;this._fireChange();this.restoreSelection()}},toggleContext:function(c){var C=this._getContextInfo(c);if(C){if(C.bExpanded){this.collapseContext(c)}else{this.expandContext(c)}}},storeSelection:function(){var s=t.getSelectedIndices();var S=[];jQuery.each(s,function(i,v){S.push(t.getContextByIndex(v))});this._aSelectedContexts=S},restoreSelection:function(){t.clearSelection();var _=this._aSelectedContexts;jQuery.each(this.aContexts,function(i,c){if(jQuery.inArray(c,_)>=0){t.addSelectionInterval(i,i)}});this._aSelectedContexts=undefined},attachSort:function(){},detachSort:function(){}});b._init(this.getExpandFirstLevel())}return b};
sap.ui.table.TreeTable.prototype._updateTableContent=function(){sap.ui.table.Table.prototype._updateTableContent.apply(this,arguments);if(!this.getUseGroupMode()){return}var b=this.getBinding("rows"),f=this.getFirstVisibleRow(),c=this.getVisibleRowCount();for(var r=0;r<c;r++){var C=this.getContextByIndex(f+r),$=this.getRows()[r].$(),a=this.$().find("div[data-sap-ui-rowindex='"+$.attr("data-sap-ui-rowindex")+"']");if(b.hasChildren&&b.hasChildren(C)){$.addClass("sapUiTableGroupHeader sapUiTableRowHidden");var s=b.isExpanded(C)?"sapUiTableGroupIconOpen":"sapUiTableGroupIconClosed";a.html("<div class=\"sapUiTableGroupIcon "+s+"\" tabindex=\"-1\">"+this.getModel().getProperty(this.getGroupHeaderProperty(),C)+"</div>");a.addClass("sapUiTableGroupHeader").removeAttr("title")}else{$.removeClass("sapUiTableGroupHeader");if(C){$.removeClass("sapUiTableRowHidden")}a.html("");a.removeClass("sapUiTableGroupHeader")}}};
sap.ui.table.TreeTable.prototype._updateTableCell=function(c,C,t){var b=this.getBinding("rows");if(b){var l=b.getLevel?b.getLevel(C):0;var $;if(this.getFixedColumnCount()>0){$=c.getParent().$("fixed")}else{$=c.getParent().$()}var T=$.find(".sapUiTableTreeIcon");var s="sapUiTableTreeIconLeaf";if(!this.getUseGroupMode()){T.css("marginLeft",l*17)}if(b.hasChildren&&b.hasChildren(C)){s=b.isExpanded(C)?"sapUiTableTreeIconNodeOpen":"sapUiTableTreeIconNodeClosed";$.attr('aria-expanded',b.isExpanded(C));var n=b.isExpanded(C)?this._oResBundle.getText("TBL_COLLAPSE"):this._oResBundle.getText("TBL_EXPAND");T.attr('title',n)}else{$.attr('aria-expanded',false);T.attr('title',this._oResBundle.getText("TBL_LEAF"))}T.removeClass("sapUiTableTreeIconLeaf sapUiTableTreeIconNodeOpen sapUiTableTreeIconNodeClosed").addClass(s);$.attr("data-sap-ui-level",l);$.attr('aria-level',l+1)}};
sap.ui.table.TreeTable.prototype.onclick=function(e){if(jQuery(e.target).hasClass("sapUiTableGroupIcon")){this._onGroupSelect(e)}else if(jQuery(e.target).hasClass("sapUiTableTreeIcon")){this._onNodeSelect(e)}else{if(sap.ui.table.Table.prototype.onclick){sap.ui.table.Table.prototype.onclick.apply(this,arguments)}}};
sap.ui.table.TreeTable.prototype.onsapselect=function(e){if(jQuery(e.target).hasClass("sapUiTableTreeIcon")){this._onNodeSelect(e)}else{if(sap.ui.table.Table.prototype.onsapselect){sap.ui.table.Table.prototype.onsapselect.apply(this,arguments)}}};
sap.ui.table.TreeTable.prototype.onkeydown=function(e){sap.ui.table.Table.prototype.onkeydown.apply(this,arguments);var t=jQuery(e.target),T=t.closest('td');if(e.keyCode==jQuery.sap.KeyCodes.TAB&&this._bActionMode&&T.find('.sapUiTableTreeIcon').length>0){if(t.hasClass('sapUiTableTreeIcon')){if(!t.hasClass("sapUiTableTreeIconLeaf")){T.find(':sapFocusable:not(.sapUiTableTreeIcon)').first().focus()}}else{T.find('.sapUiTableTreeIcon:not(.sapUiTableTreeIconLeaf)').focus()}e.preventDefault()}};
sap.ui.table.TreeTable.prototype._onNodeSelect=function(e){var $=jQuery(e.target).parents("tr");if($.length>0){var r=this.getFirstVisibleRow()+parseInt($.attr("data-sap-ui-rowindex"),10);var c=this.getContextByIndex(r);this.fireToggleOpenState({rowIndex:r,rowContext:c,expanded:!this.getBinding().isExpanded(c)});this.getBinding("rows").toggleContext(c)}e.preventDefault();e.stopPropagation()};
sap.ui.table.TreeTable.prototype._onGroupSelect=function(e){var $=jQuery(e.target).parents("[data-sap-ui-rowindex]");if($.length>0){var r=this.getFirstVisibleRow()+parseInt($.attr("data-sap-ui-rowindex"),10);var c=this.getContextByIndex(r);if(this.getBinding().isExpanded(c)){jQuery(e.target).removeClass("sapUiTableGroupIconOpen").addClass("sapUiTableGroupIconClosed")}else{jQuery(e.target).removeClass("sapUiTableGroupIconClosed").addClass("sapUiTableGroupIconOpen")}this.fireToggleOpenState({rowIndex:r,rowContext:c,expanded:!this.getBinding().isExpanded(c)});this.getBinding("rows").toggleContext(c)}e.preventDefault();e.stopPropagation()};
sap.ui.table.TreeTable.prototype.expand=function(r){var b=this.getBinding("rows");if(b){var c=this.getContextByIndex(r);b.expandContext(c)}};
sap.ui.table.TreeTable.prototype.collapse=function(r){var b=this.getBinding("rows");if(b){var c=this.getContextByIndex(r);b.collapseContext(c)}};
sap.ui.table.TreeTable.prototype.isExpanded=function(r){var b=this.getBinding("rows");if(b){var c=this.getContextByIndex(r);return b.isExpanded(c)}return false};
sap.ui.table.TreeTable.prototype._enterActionMode=function(t){var $=t.eq(0);sap.ui.table.Table.prototype._enterActionMode.apply(this,arguments);if(t.length>0&&$.hasClass("sapUiTableTreeIcon")&&!$.hasClass("sapUiTableTreeIconLeaf")){$.attr("tabindex",0).focus();this._bActionMode=true}};
sap.ui.table.TreeTable.prototype._leaveActionMode=function(e){sap.ui.table.Table.prototype._leaveActionMode.apply(this,arguments);this.$().find(".sapUiTableTreeIcon").attr("tabindex",-1)};
