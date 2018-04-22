let newCreator = require("./creator.js")
let creator = newCreator();
module.export = function(){
  return function(param1, param3 , param4, param5){
    switch(param1){
      case "newAccount":
        var newObj = new creator.newAccount(param3, param4, param5);
        return newObj;
        break;
      case "newItem":
        var newObj = new creator.newItem(param3, param4, param5);
        return newObj;
        break;
      default:
        return console.log("Not Authorized");
        break;
    };
  };
};
