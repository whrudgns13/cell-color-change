sap.ui.define(["com/myorg/myUI5App/controller/BaseController"], function (Controller) {
    "use strict";

    return Controller.extend("com.myorg.myUI5App.controller.MainView", {
        onInit : function(){
            this.oSplitApp = this.getView().byId("splitApp");            
        
            let o = [
                { 
                    city : "a",
                    coutry : "US",
                },
                { 
                    city : "a",
                    coutry : "MX",
                },
                { 
                    city : "a",
                    coutry : "MX",
                },
                { 
                    city : "a",
                    coutry : "US",
                },
                { 
                    city : "a",
                    coutry : "CN",
                },
                { 
                    city : "a",
                    coutry : "CN",
                },
            ];

            let a = o.reduce((prev,cur)=>{
                console.log(prev);
                if(prev.length===0){
                    prev.push(cur.coutry);
                }

                if(!prev.includes(cur.coutry)){
                    prev.push(cur.coutry);
                }                
                return prev;                                
            },[]);
            console.log(a);

            let oView = this.getView();
            let oModel = new sap.ui.model.json.JSONModel()
            oModel.loadData("model/products.json");
            oView.setModel(oModel,"products");
        },
        onGoToMaster : function(){
            console.log(this);
            console.log(this.oSplitApp);
            this.oSplitApp.to(this.createId("detail"));
            
        },
        onAfterRendering : function(){
            let oView = this.getView();
            let oTable = oView.byId("table");
            let aRows = oTable.getRows()
            aRows.forEach(row=>{
                let oCell = row.getCells()[3];
                let iText = parseInt(oCell.getText());
                if (iText >= 10 && iText <= 20) {
                    document.querySelector("#"+row.getId()+"-col3").classList.add("red");
                    oCell.addStyleClass("font-white");
                }
            })
        }
    });
});
