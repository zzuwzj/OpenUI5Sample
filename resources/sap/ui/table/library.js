/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.table.library");jQuery.sap.require("sap.ui.core.Core");jQuery.sap.require("sap.ui.core.library");jQuery.sap.require("sap.ui.unified.library");sap.ui.getCore().initLibrary({name:"sap.ui.table",dependencies:["sap.ui.core","sap.ui.unified"],types:["sap.ui.table.NavigationMode","sap.ui.table.SelectionBehavior","sap.ui.table.SelectionMode","sap.ui.table.SortOrder","sap.ui.table.VisibleRowCountMode"],interfaces:[],controls:["sap.ui.table.AnalyticalColumnMenu","sap.ui.table.AnalyticalTable","sap.ui.table.ColumnMenu","sap.ui.table.DataTable","sap.ui.table.Table","sap.ui.table.TreeTable"],elements:["sap.ui.table.AnalyticalColumn","sap.ui.table.Column","sap.ui.table.Row"],version:"1.24.5"});jQuery.sap.declare("sap.ui.table.NavigationMode");sap.ui.table.NavigationMode={Scrollbar:"Scrollbar",Paginator:"Paginator"};jQuery.sap.declare("sap.ui.table.SelectionBehavior");sap.ui.table.SelectionBehavior={Row:"Row",RowSelector:"RowSelector",RowOnly:"RowOnly"};jQuery.sap.declare("sap.ui.table.SelectionMode");sap.ui.table.SelectionMode={MultiToggle:"MultiToggle",Multi:"Multi",Single:"Single",None:"None"};jQuery.sap.declare("sap.ui.table.SortOrder");sap.ui.table.SortOrder={Ascending:"Ascending",Descending:"Descending"};jQuery.sap.declare("sap.ui.table.VisibleRowCountMode");sap.ui.table.VisibleRowCountMode={Fixed:"Fixed",Interactive:"Interactive",Auto:"Auto"};sap.ui.table.ColumnHeader=sap.ui.table.Column;sap.ui.table.SelectionMode.All=sap.ui.table.SelectionMode.Multi;if(!sap.ui.table.TableHelper){sap.ui.table.TableHelper={createLabel:function(c){throw new Error("no Label control available!")},createTextView:function(c){throw new Error("no TextView control available!")},createTextField:function(c){throw new Error("no TextField control available!")},createImage:function(c){throw new Error("no Image control available!")},bFinal:false}}
