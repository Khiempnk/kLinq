/**
 * **************LINQ JAVASCRIPT HELPER*

 * CREATE BY : KHIEMPNK
 * CREATE DATE : 03/02/2019
 * DESCRIPTION: 
 *              THIS IS SOME FUNCTION HELPER CONVERT BY LINQ TO SUPPORT FOR MY PROJECT
 * 
 * 
 * AUTHOR               DATE                DESCRIPTION
 * KHIEMPNK             03/02/2019          Create some function helper
 * 
 */




 
 /**---------------------------------- Helper Function ------------------------------------ */
 var hlper = (function(){
    
    var _getKeyFromParams = function _getKeyFromParams(params){
        let keys = [];
        params = params.toString();
        let c = params.substring( params.indexOf('{') + 1 , params.indexOf('}'))
        let key = c.substring(0, c.indexOf('.') + 1);
        let b = c.replaceAll(key,'').split(',');
        b.forEach(function(k){
            keys.push(k.trim());
        })
        return keys;
    }
    
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    return {
        getKeyFromParams : function getKeyFromParams (params){
          return _getKeyFromParams(params);  
        } 
    };
    
 })();
/** -------------------------------/ Helper Function ------------------------------------- */



// Filter Array
Array.prototype.where = function where(co) {
    let result = [];
    let keys = Object.keys(co);
    this.some(function(item) {
        let isResult = false;
        keys.some(function(key) {
            if (item[key] != undefined && item[key] === co[key]) {
                isResult = true;
            } else {
                isResult = false;
                return true;
            }
        });
        if (isResult) {
            result.push(item);
            //return true;	    
        }
    });
    return result;
}
// Distinct Array
Array.prototype.distinct = function distinct() {
        let result = [];
        let listResultKey = [];
        let keys = Object.keys(this[0]);
        // Distinct by list have not object
        if(typeof this[0] === "string" || typeof this[0] === "number" || typeof this[0] === "boolean"){
            this.some(function(item){
                if(result.indexOf(item) < 0){
                    result.push(item);
                }
            });
        }else{
            this.some(function(item){
                let resultKey = "";
                keys.some(function(key) {
                        resultKey += item[key].toString();
                });
                if(listResultKey.indexOf(resultKey) < 0){
                listResultKey.push(resultKey);
                result.push(item);
                }
            });
        }
    return result;
}
/** Grouping Operators */
Array.prototype.groupBy = function groupBy(keys) {
    let result = {};
    this.some(function(item){
        let resultKey = [];
        keys.some(function(key) {
                resultKey.push(item[key]);
        });
        let keyJoin = resultKey.join().toString();
        if(result[keyJoin] === undefined){
            result[keyJoin] = [];
        }
        result[keyJoin].push(item);
    });
    return result;
}

Array.prototype.toLookup = function toLookup(keys){
    let result = {};
    this.some(function(item){
        let resultKey = [];
        keys.some(function(key) {
                resultKey.push(item[key]);
        });
        let keyJoin = resultKey.join().length;
        if(result[keyJoin] === undefined){
            result[keyJoin] = [];
        }
        result[keyJoin].push(item);
    });
    return result;
}

/**Aggregation */
Array.prototype.sumBy = function sumBy(keys){
    let result = 0;
    this.some(function(item){
        keys.some(function(key) {
            result += item[key];
        });
    });
    return result;
}

Array.prototype.maxBy = function maxBy(keys){
    let result = 0;
    this.some(function(item){
        let max = 0;
        keys.some(function(key) {
            max += item[key];
        });
        if(max > result)
            result = max;
    });

    return result;
}

/**Element Operators */
Array.prototype.firstOrDefault = function firstOrDefault(co) {
    if(co === undefined){
        if(this.length === 0)
            return undefined;
        return this[0];
    }

    let result = [];
    let keys = Object.keys(co);
    this.some(function(item) {
        let isResult = false;
        keys.some(function(key) {
            if (item[key] != undefined && item[key] === co[key]) {
                isResult = true;
            } else {
                isResult = false;
                return true;
            }
        });
        if (isResult) {
            result.push(item);
            return true;	    
        }
    });
    return result;
}
/**Projection Operators */
Array.prototype.select = function select(params) {
    let result = [];
    let keys = hlper.getKeyFromParams(params);
    if(keys.length === 0){
        return this;
    }
    if(keys.length === 1){
        this.some(function(item) {
            result.push(item[keys[0]]);
        });
    }else {
        this.some(function(item) {
            let sItem = {};
            keys.some(function(key) {
                sItem[key] = item[key];
               
            });
            result.push(sItem);
        });
    }
    return result;
}



let listStudents = [
{"Name":"Pham Ngoc Khiem", "Age": 24},
{"Name":"Pham Ngoc Khoa", "Age": 21},
{"Name":"Pham Ngoc Phuong ", "Age": 20},
{"Name":"Pham Ngoc Anh", "Age": 26},
{"Name":"Pham Ngoc Khai", "Age": 27},
{"Name":"Pham Ngoc Long", "Age": 24},
{"Name":"Pham Ngoc Khiem", "Age": 24}]



console.log("Ori:" ,listStudents);
console.log("Where:" ,listStudents.where({"Name":"Pham Ngoc Khiem", "Age": 24}));
console.log("Distinct:" ,listStudents.distinct());
console.log("GroupBy:" ,listStudents.groupBy(["Name"]));
console.log("ToLookup:" ,listStudents.toLookup(["Name"]));
console.log("SumBy:" ,listStudents.sumBy(["Age"]));
console.log("MaxBy:" ,listStudents.maxBy(["Age"]));
console.log("Select:" ,listStudents.select(s => { s.Name }));
console.log("Select Distinct:" ,listStudents.select(s => { s.Name }).distinct());
console.log("Select Any:" ,listStudents.select(s => { s.Name, s.Age }));
console.log("Select Any Distinct:" ,listStudents.select(s => { s.Name, s.Age }).distinct());


 