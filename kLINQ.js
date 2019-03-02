// Filter Array
Object.prototype.Where = function Where(co) {
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
// First item in Array
Object.prototype.FirstElement = function FirstElement() {
    return this[0];
}
// Distinct Array
Object.prototype.Distinct = function Distinct() {
		let result = [];
        let listResultKey = [];
		let keys = Object.keys(this[0]);
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
    return result;
}
/** Grouping Operators */
// Group Array by ky value
Object.prototype.GroupBy = function Distinct(keys) {
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

Object.prototype.ToLookup = function ToLookup(keys){
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
Object.prototype.SumBy = function SumBy(keys){
    let result = 0;
    this.some(function(item){
        keys.some(function(key) {
            result += item[key];
        });
    });
    return result;
}

Object.prototype.MaxBy = function MaxBy(keys){
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
Object.prototype.FirstOrDefault = function FirstOrDefault(co) {
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



let listStudents = [
{"Name":"Pham Ngoc Khiem", "Age": 24},
{"Name":"Pham Ngoc Khoa", "Age": 21},
{"Name":"Pham Ngoc Phuong ", "Age": 20},
{"Name":"Pham Ngoc Anh", "Age": 26},
{"Name":"Pham Ngoc Khai", "Age": 27},
{"Name":"Pham Ngoc Long", "Age": 24},
{"Name":"Pham Ngoc Khiem", "Age": 24}]

console.log("Ori:" ,listStudents);
console.log("Where:" ,listStudents.Where({"Name":"Pham Ngoc Khiem", "Age": 24}));
console.log("FirstElement:" ,listStudents.FirstElement());
console.log("Distinct:" ,listStudents.Distinct());
console.log("GroupBy:" ,listStudents.GroupBy(["Name"]));
console.log("ToLookup:" ,listStudents.ToLookup(["Name"]));
console.log("SumBy:" ,listStudents.SumBy(["Age"]));
console.log("MaxBy:" ,listStudents.MaxBy(["Age"]));