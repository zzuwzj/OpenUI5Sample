/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Select");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Select",{metadata:{publicMethods:["isOpen","close","getItemByKey","getFirstItem","getLastItem","getItemAt","getEnabledItems"],library:"sap.m",properties:{"name":{type:"string",group:"Misc",defaultValue:null},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'auto'},"maxWidth":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},"selectedKey":{type:"string",group:"Data",defaultValue:null},"selectedItemId":{type:"string",group:"Misc",defaultValue:null},"icon":{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},"type":{type:"sap.m.SelectType",group:"Appearance",defaultValue:sap.m.SelectType.Default},"autoAdjustWidth":{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"items",aggregations:{"items":{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable"},"picker":{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{"selectedItem":{type:"sap.ui.core.Item",multiple:false}},events:{"change":{}}}});sap.m.Select.M_EVENTS={'change':'change'};jQuery.sap.require("sap.ui.core.EnabledPropagator");jQuery.sap.require("sap.m.SelectRenderer");jQuery.sap.require("sap.m.InputBase");jQuery.sap.require("sap.m.Bar");jQuery.sap.require("sap.m.List");jQuery.sap.require("sap.m.Popover");jQuery.sap.require("sap.m.Dialog");jQuery.sap.require("sap.ui.core.IconPool");sap.ui.core.IconPool.insertFontFaceStyle();sap.ui.core.EnabledPropagator.apply(sap.m.Select.prototype,[true]);
sap.m.Select.prototype.findFirstEnabledItem=function(I){I=I||this.getItems();for(var i=0;i<I.length;i++){if(I[i].getEnabled()){return I[i]}}return null};
sap.m.Select.prototype.findLastEnabledItem=function(i){i=i||this.getItems();return this.findFirstEnabledItem(i.reverse())};
sap.m.Select.prototype.setSelectedIndex=function(i,_){var I;_=_||this.getItems();i=(i>_.length-1)?_.length-1:Math.max(0,i);I=_[i];if(I){this.setSelection(I,{suppressInvalidate:true})}};
sap.m.Select.prototype._getSelectedListItem=function(){var i=this.getSelectedItem();return(i&&i.data(sap.m.SelectRenderer.CSS_CLASS+"ListItem"))||null};
sap.m.Select.prototype.scrollToItem=function(l){var p=this.getPicker(),P=p.getDomRef("cont"),L=l&&l.getDomRef();if(!p||!P||!L){return}var i=P.scrollTop,a=L.offsetTop,b=jQuery(P).height(),c=jQuery(L).height();if(i>a){P.scrollTop=a}else if((a+c)>(i+b)){P.scrollTop=Math.ceil(a+c-b)}};
sap.m.Select.prototype.setValue=function(v){var l=this.$().children("."+sap.m.SelectRenderer.CSS_CLASS+"Label");if(l&&l.length){l.text(v)}};
sap.m.Select.prototype._mapItemToListItem=function(i){if(!i){return null}var C=sap.m.SelectRenderer.CSS_CLASS,l=C+"Item",L=i.getEnabled()?"Enabled":"Disabled",s=(i===this.getSelectedItem())?l+"Selected":"";var o=new sap.m.StandardListItem().addStyleClass(l+" "+l+L+" "+s);o.setTitle(i.getText());o.setType(i.getEnabled()?sap.m.ListType.Active:sap.m.ListType.Inactive);o.setTooltip(i.getTooltip());i.data(C+"ListItem",o);return o};
sap.m.Select.prototype._findMappedItem=function(l,I){for(var i=0,I=I||this.getItems(),a=I.length;i<a;i++){if(I[i].data(sap.m.SelectRenderer.CSS_CLASS+"ListItem")===l){return I[i]}}return null};
sap.m.Select.prototype._fillList=function(I){var s=this.getSelectedItem();for(var i=0,l,o;i<I.length;i++){o=I[i];l=this._mapItemToListItem(o);this.getList().addAggregation("items",l,true);if(o===s){this.getList().setSelectedItem(l,true)}}};
sap.m.Select.prototype._clearList=function(){if(this.getList()){this.getList().destroyAggregation("items",true)}};
sap.m.Select.prototype._isRequiredSelectElement=function(){if(this.getAutoAdjustWidth()){return false}else if(this.getWidth()==="auto"){return true}};
sap.m.Select.prototype._findItemByFirstCharacter=function(c){for(var i=0,I=this.getItems();i<I.length;i++){if(I[i].getText().charAt(0).toUpperCase()===c.toUpperCase()){return I[i]}}};
sap.m.Select.prototype.updateItems=function(r){this._bDataAvailable=false;this.updateAggregation("items");this._bDataAvailable=true};
sap.m.Select.prototype.refreshItems=function(){this.refreshAggregation("items")};
sap.m.Select.prototype.getList=function(){return this._oList};
sap.m.Select.prototype.onBeforeOpen=function(){var p=this["_onBeforeOpen"+this.getPickerType()];this.addStyleClass(sap.m.SelectRenderer.CSS_CLASS+"Pressed");this.addContent();p&&p.call(this)};
sap.m.Select.prototype.onAfterOpen=function(){};
sap.m.Select.prototype.onBeforeClose=function(){this.removeStyleClass(sap.m.SelectRenderer.CSS_CLASS+"Pressed")};
sap.m.Select.prototype.onAfterClose=function(){};
sap.m.Select.prototype.getPicker=function(){if(this.bIsDestroyed){return null}return this.createPicker(this.getPickerType())};
sap.m.Select.prototype.setPickerType=function(p){this._sPickerType=p};
sap.m.Select.prototype.getPickerType=function(){return this._sPickerType};
sap.m.Select.prototype._createPopover=function(){var p=new sap.m.Popover({showHeader:false,placement:sap.m.PlacementType.Vertical,offsetX:0,offsetY:0,initialFocus:this,bounce:false});this._decoratePopover(p);return p};
sap.m.Select.prototype._decoratePopover=function(p){var s=this;p._removeArrow=function(){this._marginTop=0;this._marginLeft=0;this._marginRight=0;this._marginBottom=0;this._arrowOffset=0;this._offsets=["0 0","0 0","0 0","0 0"]};p._setPosition=function(){this._myPositions=["begin bottom","begin center","begin top","end center"];this._atPositions=["begin top","end center","begin bottom","begin center"]};p._setArrowPosition=function(){};p._setMinWidth=function(w){this.getDomRef().style.minWidth=w};p._setWidth=function(w){var a=s.getAutoAdjustWidth(),i=s.getType()==="IconOnly",P;if(sap.ui.Device.system.desktop||sap.ui.Device.system.tablet){P=this.getContent()[0];if(a){P.setWidth("auto");P.getDomRef().style.minWidth=w}else{P.setWidth(w)}}if(!i){this.getDomRef().style.minWidth=w}};p.open=function(){return this.openBy(s)}};
sap.m.Select.prototype._onAfterRenderingPopover=function(){var p=this.getPicker(),w=(this.$().outerWidth()/parseFloat(sap.m.BaseFontSize))+"rem";p._removeArrow();p._setPosition();if(sap.ui.Device.system.phone){p._setMinWidth("100%")}else{p._setWidth(w)}};
sap.m.Select.prototype._createDialog=function(){var C=sap.m.SelectRenderer.CSS_CLASS;var d=new sap.m.Dialog({stretchOnPhone:true,customHeader:new sap.m.Bar({contentLeft:new sap.m.InputBase({width:"100%",editable:false}).addStyleClass(C+"Input")}).addStyleClass(C+"Bar")});d.getAggregation("customHeader").attachBrowserEvent("tap",function(){d.close()},this);return d};
sap.m.Select.prototype._onBeforeOpenDialog=function(){var h=this.getPicker().getCustomHeader();h.getContentLeft()[0].setValue(this.getSelectedItem().getText())};
sap.m.Select.prototype.init=function(){this.createList()};
sap.m.Select.prototype.onBeforeRendering=function(){var i=this.getItems();this.synchronizeSelection();this._clearList();this._fillList(i)};
sap.m.Select.prototype.onAfterRendering=function(){var h=!!this.$().closest(".sapMBar-CTX").length;this.setPickerType(sap.ui.Device.system.phone&&!h?"Dialog":"Popover")};
sap.m.Select.prototype.exit=function(){if(this.getList()){this.getList().destroy();this._oList=null}};
sap.m.Select.prototype.ontouchstart=function(e){e.setMarked();if(this.getEnabled()&&this.isOpenArea(e.target)){this.addStyleClass(sap.m.SelectRenderer.CSS_CLASS+"Pressed")}};
sap.m.Select.prototype.ontouchend=function(e){e.setMarked();if(this.getEnabled()&&(!this.isOpen()||!this.hasContent())&&this.isOpenArea(e.target)){this.removeStyleClass(sap.m.SelectRenderer.CSS_CLASS+"Pressed")}};
sap.m.Select.prototype.ontap=function(e){var C=sap.m.SelectRenderer.CSS_CLASS;e.setMarked();if(!this.getEnabled()){return}if(this.isOpenArea(e.target)){if(this.isOpen()){this.close();this.removeStyleClass(C+"Pressed");return}if(this.hasContent()){this.open()}}if(this.isOpen()){this.addStyleClass(C+"Pressed")}};
sap.m.Select.prototype.onSelectionChange=function(c){var l=c.getParameter("listItem"),n=this._findMappedItem(l);if((l.getType()==="Inactive")||!this.getEnabled()){return}this.close();if(n){this.setSelection(n,{suppressInvalidate:true,listItemUpdated:true});this.fireChange({selectedItem:this.getSelectedItem()});n=this.getSelectedItem();this.setValue(n?n.getText():((n=this.getDefaultSelectedItem())?n.getText():""))}};
sap.m.Select.prototype.onkeypress=function(e){e.setMarked();if(!this.getEnabled()){return}var i=this._findItemByFirstCharacter(String.fromCharCode(e.which));if(i){this.setSelection(i,{suppressInvalidate:true});this.fireChange({selectedItem:this.getSelectedItem()});this.setValue(i.getText())}this.scrollToItem(this.getList().getSelectedItem())};
sap.m.Select.prototype.onsapshow=function(e){e.setMarked();if(e.keyCode===jQuery.sap.KeyCodes.F4){e.preventDefault()}if(this.isOpen()){this.close();return}if(this.hasContent()){this.open()}};
sap.m.Select.prototype.onsaphide=sap.m.Select.prototype.onsapshow;
sap.m.Select.prototype.onsapescape=function(e){if(this.isOpen()){e.setMarked();this.close()}};
sap.m.Select.prototype.onsapenter=function(e){e.setMarked();this.close()};
sap.m.Select.prototype.onsapdown=function(e){e.setMarked();e.preventDefault();var n,s=this.getSelectableItems();n=s[s.indexOf(this.getSelectedItem())+1];if(n){this.setSelection(n,{suppressInvalidate:true});this.fireChange({selectedItem:this.getSelectedItem()});this.setValue(n.getText())}this.scrollToItem(this.getList().getSelectedItem())};
sap.m.Select.prototype.onsapup=function(e){e.setMarked();e.preventDefault();var p,s=this.getSelectableItems();p=s[s.indexOf(this.getSelectedItem())-1];if(p){this.setSelection(p,{suppressInvalidate:true});this.fireChange({selectedItem:this.getSelectedItem()});this.setValue(p.getText())}this.scrollToItem(this.getList().getSelectedItem())};
sap.m.Select.prototype.onsaphome=function(e){e.setMarked();e.preventDefault();var f=this.getSelectableItems()[0];if(f&&(f!==this.getSelectedItem())){this.setSelection(f,{suppressInvalidate:true});this.fireChange({selectedItem:this.getSelectedItem()});this.setValue(f.getText())}this.scrollToItem(this.getList().getSelectedItem())};
sap.m.Select.prototype.onsapend=function(e){e.setMarked();e.preventDefault();var l=this.findLastEnabledItem(this.getSelectableItems());if(l&&(l!==this.getSelectedItem())){this.setSelection(l,{suppressInvalidate:true});this.fireChange({selectedItem:this.getSelectedItem()});this.setValue(l.getText())}this.scrollToItem(this.getList().getSelectedItem())};
sap.m.Select.prototype.onsappagedown=function(e){e.setMarked();e.preventDefault();var s=this.getSelectableItems(),S=this.getSelectedItem();this.setSelectedIndex(s.indexOf(S)+20,s);if(S!==this.getSelectedItem()){this.fireChange({selectedItem:this.getSelectedItem()})}S=this.getSelectedItem();if(S){this.setValue(S.getText())}this.scrollToItem(this.getList().getSelectedItem())};
sap.m.Select.prototype.onsappageup=function(e){e.setMarked();e.preventDefault();var s=this.getSelectableItems(),S=this.getSelectedItem();this.setSelectedIndex(s.indexOf(S)-20,s);if(S!==this.getSelectedItem()){this.fireChange({selectedItem:this.getSelectedItem()})}S=this.getSelectedItem();if(S){this.setValue(S.getText())}this.scrollToItem(this.getList().getSelectedItem())};
sap.m.Select.prototype.onsapfocusleave=function(e){var p=this.getAggregation("picker");if(!e.relatedControlId||!p){return}var c=sap.ui.getCore().byId(e.relatedControlId),f=c&&c.getFocusDomRef();if(jQuery.sap.containsOrEquals(p.getFocusDomRef(),f)){this.focus()}};
sap.m.Select.prototype.setSelection=function(i,o){var l;o=o||{};this.setAssociation("selectedItem",i||null,o.suppressInvalidate);this.setProperty("selectedItemId",i?i.getId():"",o.suppressInvalidate);this.setProperty("selectedKey",i?i.getKey():"",o.suppressInvalidate);if(!o.listItemUpdated){l=this._getSelectedListItem();if(l){this.getList().setSelectedItem(l,true)}else if(this.getList()){if(this.getDefaultSelectedItem()){this.getList().setSelectedItem(this.getDefaultSelectedItem().data(sap.m.SelectRenderer.CSS_CLASS+"ListItem"),true)}else if(this.getList().getSelectedItem()){this.getList().setSelectedItem(this.getList().getSelectedItem(),false)}}}};
sap.m.Select.prototype.isSelectionSynchronized=function(){var i=this.getSelectedItem();return this.getSelectedKey()===(i&&i.getKey())};
sap.m.Select.prototype.synchronizeSelection=function(){var i,k;if(!this.isSelectionSynchronized()){i=this.getSelectedItem();k=this.getSelectedKey();i=this.getItemByKey(""+k);if(i&&(k!=="")){this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",i.getId(),true)}else if(!this.isBound("items")||this._bDataAvailable){i=this.getDefaultSelectedItem();this.setSelection(i,{suppressInvalidate:true})}}};
sap.m.Select.prototype.addContent=function(p){};
sap.m.Select.prototype.createPicker=function(p){var P=this.getAggregation("picker");if(P){return P}P=this["_create"+p]();this.setAggregation("picker",P,true);P.setHorizontalScrolling(false).addStyleClass(sap.m.SelectRenderer.CSS_CLASS+"Picker").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this).addContent(this.getList());return P};
sap.m.Select.prototype.createList=function(){this._oList=new sap.m.List({width:"100%",mode:sap.m.ListMode.SingleSelectMaster,rememberSelections:false}).addStyleClass(sap.m.SelectRenderer.CSS_CLASS+"List").addEventDelegate({ontap:function(e){this.close()}},this).attachSelectionChange(this.onSelectionChange,this)};
sap.m.Select.prototype.hasContent=function(){return!!this.getItems().length};
sap.m.Select.prototype.onBeforeRenderingPicker=function(){var o=this["_onBeforeRendering"+this.getPickerType()];o&&o.call(this)};
sap.m.Select.prototype.onAfterRenderingPicker=function(){var o=this["_onAfterRendering"+this.getPickerType()];o&&o.call(this)};
sap.m.Select.prototype.open=function(){var p=this.getPicker();if(p){p.open()}return this};
sap.m.Select.prototype.getVisibleItems=sap.m.Select.prototype.getItems;
sap.m.Select.prototype.isItemSelected=function(i){return i&&(i.getId()===this.getAssociation("selectedItem"))};
sap.m.Select.prototype.getDefaultSelectedItem=function(i){return this.findFirstEnabledItem()};
sap.m.Select.prototype.getSelectableItems=function(){return this.getEnabledItems(this.getVisibleItems())};
sap.m.Select.prototype.getOpenArea=function(){return this.getDomRef()};
sap.m.Select.prototype.isOpenArea=function(d){var o=this.getOpenArea();return o&&o.contains(d)};
sap.m.Select.prototype.findItem=function(p,v){for(var i=0,I=this.getItems();i<I.length;i++){if(I[i]["get"+p]()===v){return I[i]}}return null};
sap.m.Select.prototype.clearSelection=function(){this.setSelection(null)};
sap.m.Select.prototype.addItem=function(i){this.addAggregation("items",i);if(this.getList()){this.getList().addItem(this._mapItemToListItem(i))}return this};
sap.m.Select.prototype.insertItem=function(i,I){this.insertAggregation("items",i,I);if(this.getList()){this.getList().insertItem(this._mapItemToListItem(i),I)}return this};
sap.m.Select.prototype.setSelectedItem=function(i){if(typeof i==="string"){i=sap.ui.getCore().byId(i)}if(!(i instanceof sap.ui.core.Item)&&i!==null){jQuery.sap.log.warning('Warning: setSelectedItem() "vItem" has to be an instance of sap.ui.core.Item, a valid sap.ui.core.Item id, or null on',this);return this}if(!i){i=this.getDefaultSelectedItem()}this.setSelection(i,{suppressInvalidate:true});this.setValue(i?i.getText():((i=this.getDefaultSelectedItem())?i.getText():""));return this};
sap.m.Select.prototype.setSelectedItemId=function(i){i=this.validateProperty("selectedItemId",i);var I=sap.ui.getCore().byId(i);if(!(I instanceof sap.ui.core.Item)&&i!==""){jQuery.sap.log.warning('Warning: setSelectedItemId() "sItem" has to be a string id of an sap.ui.core.Item instance, an empty string or undefined on',this);return this}if(!I){I=this.getDefaultSelectedItem()}this.setSelection(I,{suppressInvalidate:true});this.setValue(I?I.getText():((I=this.getDefaultSelectedItem())?I.getText():""));return this};
sap.m.Select.prototype.setSelectedKey=function(k){k=this.validateProperty("selectedKey",k);var i=this.getItemByKey(k);if(i||(k==="")){if(!i&&k===""){i=this.getDefaultSelectedItem()}this.setSelection(i,{suppressInvalidate:true});this.setValue(i?i.getText():((i=this.getDefaultSelectedItem())?i.getText():""));return this}return this.setProperty("selectedKey",k)};
sap.m.Select.prototype.getItemAt=function(i){return this.getItems()[+i]||null};
sap.m.Select.prototype.getSelectedItem=function(){var s=this.getAssociation("selectedItem");return(s===null)?null:sap.ui.getCore().byId(s)||null};
sap.m.Select.prototype.getFirstItem=function(){return this.getItems()[0]||null};
sap.m.Select.prototype.getLastItem=function(){var i=this.getItems();return i[i.length-1]||null};
sap.m.Select.prototype.getEnabledItems=function(i){i=i||this.getItems();return i.filter(function(I){return I.getEnabled()})};
sap.m.Select.prototype.getItemByKey=function(k){return this.findItem("Key",k)};
sap.m.Select.prototype.removeItem=function(i){var C=sap.m.SelectRenderer.CSS_CLASS,I;i=this.removeAggregation("items",i);if(this.getList()){this.getList().removeItem(i&&i.data(C+"ListItem"))}if(this.getItems().length===0){this.clearSelection()}else if(this.isItemSelected(i)){I=this.findFirstEnabledItem();if(I){this.setSelection(I);this.setValue(I?I.getText():((I=this.getDefaultSelectedItem())?I.getText():""))}}return i};
sap.m.Select.prototype.removeAllItems=function(){var i=this.removeAllAggregation("items");this.clearSelection();if(this.getList()){this.getList().removeAllItems()}return i};
sap.m.Select.prototype.destroyItems=function(){this.destroyAggregation("items");if(this.getList()){this.getList().destroyItems()}return this};
sap.m.Select.prototype.isOpen=function(){var p=this.getAggregation("picker");return!!(p&&p.isOpen())};
sap.m.Select.prototype.close=function(){var p=this.getAggregation("picker");if(p){p.close()}return this};
