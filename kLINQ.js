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
        var keys = [];
        params = params.toString();
        var c = params.substring( params.indexOf('{') + 1 , params.indexOf('}'))
        var key = c.substring(0, c.indexOf('.') + 1);
        var b = c.replaceAll(key,'').split(',');
        b.forEach(function(k){
            keys.push(k.trim());
        })
        return keys;
    }

    function _compareOrderValues(key, order) {
        return function(a, b) {
          if(!a.hasOwnProperty(key) || 
             !b.hasOwnProperty(key)) {
              return 0; 
          }
          
          var varA = (typeof a[key] === 'string') ? 
            a[key].toUpperCase() : a[key];
          var varB = (typeof b[key] === 'string') ? 
            b[key].toUpperCase() : b[key];
            
          var comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order == 'desc') ? 
            (comparison * -1) : comparison
          );
        };
    }

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    return {
        getKeyFromParams : function getKeyFromParams (params){
          return _getKeyFromParams(params);  
        },
        compareOrderValues : function compareOrderValues (key, order){
            return _compareOrderValues(key, order);  
        } 
    };
    
 })();
/** -------------------------------/ Helper Function ------------------------------------- */

/** -------------------------------Constants---------------------------------------------- */
var cstants = {
    Orderby:{
        DESC: "desc",
        ASC: "asc"
    }
};

/** -------------------------------/Constants---------------------------------------------- */

// Filter Array
Array.prototype.kWhere = function kWhere(co) {
    if(this === undefined)
        return this;

    var result = [];
    var keys = Object.keys(co);
    this.some(function(item) {
        var isResult = false;
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
Array.prototype.kDistinct = function kDistinct() {
        if(this === undefined)
            return this;

        var result = [];
        var listResultKey = [];
        var keys = Object.keys(this[0]);
        // Distinct by list have not object
        if(typeof this[0] === "string" || typeof this[0] === "number" || typeof this[0] === "boolean"){
            this.some(function(item){
                if(result.indexOf(item) < 0){
                    result.push(item);
                }
            });
        }else{
            this.some(function(item){
                var resultKey = "";
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
Array.prototype.kGroupBy = function kGroupBy(keys) {
    if(this === undefined)
        return this;

    var result = {};
    this.some(function(item){
        var resultKey = [];
        keys.some(function(key) {
                resultKey.push(item[key]);
        });
        var keyJoin = resultKey.join().toString();
        if(result[keyJoin] === undefined){
            result[keyJoin] = [];
        }
        result[keyJoin].push(item);
    });
    return result;
}

Array.prototype.kToLookup = function kToLookup(keys){
    if(this === undefined)
        return this;
        
    var result = {};
    this.some(function(item){
        var resultKey = [];
        keys.some(function(key) {
                resultKey.push(item[key]);
        });
        var keyJoin = resultKey.join().length;
        if(result[keyJoin] === undefined){
            result[keyJoin] = [];
        }
        result[keyJoin].push(item);
    });
    return result;
}

/**Aggregation */
Array.prototype.kSumBy = function kSumBy(keys){
    if(this === undefined)
        return this;

    var result = 0;
    this.some(function(item){
        keys.some(function(key) {
            result += item[key];
        });
    });
    return result;
}

Array.prototype.kMaxBy = function kMaxBy(keys){
    if(this === undefined)
        return this;

    var result = 0;
    this.some(function(item){
        var max = 0;
        keys.some(function(key) {
            max += item[key];
        });
        if(max > result)
            result = max;
    });

    return result;
}

/**Element Operators */
Array.prototype.kFrstOrDefault = function kFirstOrDefault(co) {
    if(co === undefined){
        if(this.length === 0)
            return undefined;
        return this[0];
    }

    var result = [];
    var keys = Object.keys(co);
    this.some(function(item) {
        var isResult = false;
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
Array.prototype.kSelect = function kSelect(keys) {
    var result = [];
    if(keys === undefined || keys.length === 0){
        return this;
    }
    if(keys.length === 1){
        this.some(function(item) {
            result.push(item[keys[0]]);
        });
    }else {
        this.some(function(item) {
            var sItem = {};
            keys.some(function(key) {
                sItem[key] = item[key];
               
            });
            result.push(sItem);
        });
    }
    return result;
}

/** Sorting Operators */
Array.prototype.kOrderBy = function kOrderBy(key, order) {
    if(this === undefined)
    return this;

    var result = [];
    if(key === undefined || key.length === 0 ||  order === undefined || order.length === 0){
        return this;
    }
    var c  = this.sort(hlper.compareOrderValues(key, order.toLowerCase()));
    c.forEach(function(ic){
        result.push(ic); 
    });
    return result;
}

/** Quantifier Operator */
Array.prototype.kContains = function kContains(value) {
    if(this === undefined || value === undefined)
        return this;
    var result = [];
    var keys = Object.keys(this[0]);
    // Distinct by list have not object
    if(typeof this[0] === "string" || typeof this[0] === "number" || typeof this[0] === "boolean"){
        return this.toString().indexOf(value.toString()) > -1;
    }else{
        this.some(function(item){
            keys.some(function(key) {
                if(item[key].toString().indexOf(value.toString()) > -1){
                    result.push(item);
                    return true;
                }
            });
        });
    }
    return result;
}

/**Partitioning Operators */
Array.prototype.kSkip = function kSkip(skipIndex) {
    if(this === undefined || skipIndex === undefined)
        return this;
    var result = [];
    this.some(function(item, index){
        if(index >= skipIndex){
            result.push(item);
        }
    });
    return result;
}

Array.prototype.kTake = function kTake(takeIndex) {
    if(this === undefined || takeIndex === undefined)
        return this;
    var result = [];
    this.some(function(item, index){
        if(index < takeIndex){
            result.push(item);
        }
    });
    return result;
}

/**Set Operator */
Array.prototype.kUnion = function kUnion(ortherSource) {
    if(this === undefined || ortherSource === undefined)
        return this;
    Array.prototype.push.apply(this, ortherSource);
    var results = this.kDistinct();
    return results;
}
/**Concatenation Operator */
Array.prototype.kConcat = function kConcat(ortherSource) {
    if(this === undefined || ortherSource === undefined)
        return this;
    Array.prototype.push.apply(this, ortherSource);

    return this;
}


// var listStudents = [
// {"Name":"Pham Ngoc Khiem", "Age": 24},
// {"Name":"Pham Ngoc Khoa", "Age": 21},
// {"Name":"Pham Ngoc Phuong ", "Age": 20},
// {"Name":"Pham Ngoc Anh", "Age": 26},
// {"Name":"Pham Ngoc Khai", "Age": 27},
// {"Name":"Pham Ngoc Long", "Age": 24},
// {"Name":"Pham Ngoc Khiem", "Age": 24}]



// console.log("Ori:" ,listStudents);
// console.log("Where:" ,listStudents.kWhere({"Name":"Pham Ngoc Khiem", "Age": 24}));
// console.log("Distinct:" ,listStudents.kDistinct());
// console.log("GroupBy:" ,listStudents.kGroupBy(["Name"]));
// console.log("ToLookup:" ,listStudents.kToLookup(["Name"]));
// console.log("SumBy:" ,listStudents.kSumBy(["Age"]));
// console.log("MaxBy:" ,listStudents.kMaxBy(["Age"]));
// console.log("Select:" ,listStudents.kSelect(["Name"]));
// console.log("Select Distinct:" ,listStudents.kSelect(["Name"]).kDistinct());
// console.log("Select Any:" ,listStudents.kSelect(["Name","Age"]));
// console.log("Select Any Distinct:" ,listStudents.kSelect(["Name","Age"]).kDistinct());
// console.log("OrderBy:" ,listStudents.kOrderBy('Name','asc'));
// console.log("Contains:" ,listStudents.kContains('Khiem'));
// console.log("Skip:" ,listStudents.kSkip(2));
// console.log("Take:" ,listStudents.kTake(2));
// console.log("Union:" ,listStudents.kUnion([{'Name':'Cong Khai', 'Age': 23}]));
// console.log("Concat:" ,listStudents.kConcat([{'Name':'Cong Khai', 'Age': 23}]));