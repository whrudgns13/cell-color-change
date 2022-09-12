sap.ui.define([], function () {
  "use strict";
  sap.ui.jsview("com.myorg.myUI5App.view.MainView", {

    getControllerName: function () {
      return "com.myorg.myUI5App.controller.MainView";
    },
    createContent: function (oController) {

      let oApp = new sap.m.SplitApp(this.createId("splitApp"));
      let oMasterPage = new sap.m.Page(this.createId("master"), {
        content: [
          new sap.m.Button({
            text: "1234",
            press: oController.onGoToMaster.bind(oController)
          })
        ]
      });

      let oMasterPage2 = new sap.m.Page(this.createId("master2"), {
        content: [
          new sap.m.Button({
            text: "This is MasterPage 2"
          })
        ]
      });

      let oDetailPage = new sap.m.Page({
        content: [
          new sap.m.Text({
            text: "This is Detail Page"
          })
        ]
      });

      let oDetailPage2 = new sap.m.Page(this.createId("detail"), {
        content: [
          new sap.m.Text({
            text: "This is Detail Page2"
          })
        ]
      });


      let oTable = new sap.ui.table.Table(this.createId("table"),{
        columns: [
          new sap.ui.table.Column({
            label: new sap.m.Label({
              text: "ProductName"
            }),
            template: new sap.m.Text({
              text: "{products>Name}"
            })
          }),
          new sap.ui.table.Column({
            label: new sap.m.Label({
              text: "Product ID"
            }),
            template: new sap.m.Text({
              text: "{products>ProductId}"
            })
          }),
          new sap.ui.table.Column({
            label: new sap.m.Label({
              text: "Status"
            }),
            template: new sap.m.Text({
              text: "{products>Status}"
            })
          }),
          new sap.ui.table.Column({
            label: new sap.m.Label({
              text: "Quantity"
            }),
            template: new sap.m.Text().bindProperty("text", "products>Quantity", function (text) {
              console.log(text);
              let oRow = this.getParent().getCells()[3];
              oRow.removeStyleClass("red")
              let oCell = document.querySelector("#" + this.getParent().getId() + "-col3");
              if (oCell) {
                oCell.classList.remove("red");
                this.removeStyleClass("font-white");
                if (text >= 10 && text <= 20) {
                  oCell.classList.add("red");
                  this.addStyleClass("font-white");
                }
              }
              return text;
            })
          })
        ]
      });

      oTable.bindRows("products>/ProductCollection");

      oDetailPage.addContent(oTable);
      oApp.addMasterPage(oMasterPage);
      oApp.addMasterPage(oMasterPage2);
      oApp.addDetailPage(oDetailPage);
      oApp.addDetailPage(oDetailPage2);
      return oApp;
    }
  });
});