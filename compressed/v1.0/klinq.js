var hlper=(String.prototype.replaceAll=function(t,r){return this.replace(new RegExp(t,"g"),r)},{getKeyFromParams:function(t){return i=[],n=(r=(r=t).toString()).substring(r.indexOf("{")+1,r.indexOf("}")),o=n.substring(0,n.indexOf(".")+1),n.replaceAll(o,"").split(",").forEach(function(t){i.push(t.trim())}),i;var r,i,n,o},compareOrderValues:function(t,r){return e=t,s=r,function(t,r){if(!t.hasOwnProperty(e)||!r.hasOwnProperty(e))return 0;var i="string"==typeof t[e]?t[e].toUpperCase():t[e],n="string"==typeof r[e]?r[e].toUpperCase():r[e],o=0;return n<i?o=1:i<n&&(o=-1),"desc"==s?-1*o:o};var e,s}}),cstants={Orderby:{DESC:"desc",ASC:"asc"}};Array.prototype.kWhere=function(n){if(void 0===this)return this;var t=[],o=Object.keys(n);return this.some(function(r){var i=!1;o.some(function(t){if(null==r[t]||r[t]!==n[t])return!(i=!1);i=!0}),i&&t.push(r)}),t},Array.prototype.kDistinct=function(){if(void 0===this)return this;var n=[],t=[],o=Object.keys(this[0]);return"string"==typeof this[0]||"number"==typeof this[0]||"boolean"==typeof this[0]?this.some(function(t){n.indexOf(t)<0&&n.push(t)}):this.some(function(r){var i="";o.some(function(t){i+=r[t].toString()}),t.indexOf(i)<0&&(t.push(i),n.push(r))}),n},Array.prototype.kGroupBy=function(n){if(void 0===this)return this;var o={};return this.some(function(r){var i=[];n.some(function(t){i.push(r[t])});var t=i.join().toString();void 0===o[t]&&(o[t]=[]),o[t].push(r)}),o},Array.prototype.kToLookup=function(n){if(void 0===this)return this;var o={};return this.some(function(r){var i=[];n.some(function(t){i.push(r[t])});var t=i.join().length;void 0===o[t]&&(o[t]=[]),o[t].push(r)}),o},Array.prototype.kSumBy=function(t){if(void 0===this)return this;var i=0;return this.some(function(r){t.some(function(t){i+=r[t]})}),i},Array.prototype.kMaxBy=function(t){if(void 0===this)return this;var n=0;return this.some(function(r){var i=0;t.some(function(t){i+=r[t]}),n<i&&(n=i)}),n},Array.prototype.kFrstOrDefault=function(n){if(void 0===n){if(0===this.length)return;return this[0]}var t=[],o=Object.keys(n);return this.some(function(r){var i=!1;if(o.some(function(t){if(null==r[t]||r[t]!==n[t])return!(i=!1);i=!0}),i)return t.push(r),!0}),t},Array.prototype.kSelect=function(n){var o=[];return void 0===n||0===n.length?this:(1===n.length?this.some(function(t){o.push(t[n[0]])}):this.some(function(r){var i={};n.some(function(t){i[t]=r[t]}),o.push(i)}),o)},Array.prototype.kOrderBy=function(t,r){if(void 0===this)return this;var i=[];return void 0===t||0===t.length||void 0===r||0===r.length?this:(this.sort(hlper.compareOrderValues(t,r.toLowerCase())).forEach(function(t){i.push(t)}),i)},Array.prototype.kContains=function(i){if(void 0===this||void 0===i)return this;var n=[],t=Object.keys(this[0]);return"string"==typeof this[0]||"number"==typeof this[0]||"boolean"==typeof this[0]?-1<this.toString().indexOf(i.toString()):(this.some(function(r){t.some(function(t){if(-1<r[t].toString().indexOf(i.toString()))return n.push(r),!0})}),n)},Array.prototype.kSkip=function(i){if(void 0===this||void 0===i)return this;var n=[];return this.some(function(t,r){i<=r&&n.push(t)}),n},Array.prototype.kTake=function(i){if(void 0===this||void 0===i)return this;var n=[];return this.some(function(t,r){r<i&&n.push(t)}),n},Array.prototype.kUnion=function(t){return void 0===this||void 0===t?this:(Array.prototype.push.apply(this,t),this.kDistinct())},Array.prototype.kConcat=function(t){return void 0===this||void 0===t||Array.prototype.push.apply(this,t),this};