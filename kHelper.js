function getKeyFromParams(params){
    let keys = [];
    let c = params.substring( params.indexOf('{') + 1 , params.indexOf('}'))
    let key = c.substring(0, c.indexOf('.') + 1);
    keys = c.replaceAll(key,'').split(',');
    return keys;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};