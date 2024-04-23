sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
	'sap/ui/model/json/JSONModel',
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("com.ltim.earlywarn.controller.Dashboardview", {
            onInit: function () {
                var that=this;
                that.readOrderDetails();
            },
            readOrderDetails:function(){
                var that=this;
                var sUrl = this.getOwnerComponent().getModel().sServiceUrl;    
                jQuery.ajax({
                    url: sUrl + "OrderDetails",
                    type: "GET",
                    async: false,
                    contentType: "application/json",
                    success: function (oData) {
                        debugger;
                        console.log(oData);
                        var oOrderModel = new sap.ui.model.json.JSONModel();
                        // oOrderModel.setModel(oData);
                    },
                    error: function (e) {
                        debugger;
                    }
                });
            },
            submit:function(oEvent){
                debugger;
                var oAddress= "Dubai,DE";
                var oYear= "2024";
                var surl = this.getOwnerComponent().getModel().sServiceUrl;              
                  jQuery.ajax({
                    url: surl + "getDetails(StartPointAddress='"+ oAddress+"', DeliveryDate='" + oYear + "')",
                    type: "GET",
                    async: false,
                    contentType: "application/json",
                    success: function (oData) {
                        debugger;
                        console.log(oData);
                    },
                    error: function (e) {
                        debugger;
                    }
                });
            }
        })
    })
