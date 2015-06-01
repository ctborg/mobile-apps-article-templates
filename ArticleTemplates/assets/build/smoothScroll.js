!function(e,t){"function"==typeof define&&define.amd?define("smoothScroll",[],t(e)):"object"==typeof exports?module.exports=t(e):e.smoothScroll=t(e)}(this,function(e){var t,n,o,r,a={},c=!!document.querySelector&&!!e.addEventListener,u={speed:500,easing:"easeInOutCubic",offset:0,updateURL:!0,callbackBefore:function(){},callbackAfter:function(){}},i=function(e,t,n){if("[object Object]"===Object.prototype.toString.call(e))for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(n,e[o],o,e);else for(var r=0,a=e.length;a>r;r++)t.call(n,e[r],r,e)},l=function(e,t){var n={};return i(e,function(t,o){n[o]=e[o]}),i(t,function(e,o){n[o]=t[o]}),n},s=function(e,t){for(var n=t.charAt(0);e&&e!==document;e=e.parentNode)if("."===n){if(e.classList.contains(t.substr(1)))return e}else if("#"===n){if(e.id===t.substr(1))return e}else if("["===n&&e.hasAttribute(t.substr(1,t.length-2)))return e;return!1},f=function(e){return Math.max(e.scrollHeight,e.offsetHeight,e.clientHeight)},d=function(e){for(var t,n=String(e),o=n.length,r=-1,a="",c=n.charCodeAt(0);++r<o;){if(t=n.charCodeAt(r),0===t)throw new InvalidCharacterError("Invalid character: the input contains U+0000.");a+=t>=1&&31>=t||127==t||0===r&&t>=48&&57>=t||1===r&&t>=48&&57>=t&&45===c?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&57>=t||t>=65&&90>=t||t>=97&&122>=t?n.charAt(r):"\\"+n.charAt(r)}return a},h=function(e,t){var n;return"easeInQuad"===e&&(n=t*t),"easeOutQuad"===e&&(n=t*(2-t)),"easeInOutQuad"===e&&(n=.5>t?2*t*t:-1+(4-2*t)*t),"easeInCubic"===e&&(n=t*t*t),"easeOutCubic"===e&&(n=--t*t*t+1),"easeInOutCubic"===e&&(n=.5>t?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e&&(n=t*t*t*t),"easeOutQuart"===e&&(n=1- --t*t*t*t),"easeInOutQuart"===e&&(n=.5>t?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e&&(n=t*t*t*t*t),"easeOutQuint"===e&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e&&(n=.5>t?16*t*t*t*t*t:1+16*--t*t*t*t*t),n||t},m=function(e,t,n){var o=0;if(e.offsetParent)do o+=e.offsetTop,e=e.offsetParent;while(e);return o=o-t-n,o>=0?o:0},p=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},v=function(e){return e&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(e):{}},g=function(t,n){history.pushState&&(n||"true"===n)&&history.pushState(null,null,[e.location.protocol,"//",e.location.host,e.location.pathname,e.location.search,t].join(""))},b=function(e){return null===e?0:f(e)+e.offsetTop};a.animateScroll=function(t,n,a){var c=l(c||u,a||{}),i=v(t?t.getAttribute("data-options"):null);c=l(c,i),n="#"+d(n.substr(1));var s="#"===n?document.documentElement:document.querySelector(n),f=e.pageYOffset;o||(o=document.querySelector("[data-scroll-header]")),r||(r=b(o));var O,y,S,I=m(s,r,parseInt(c.offset,10)),E=I-f,H=p(),A=0;g(n,c.updateURL);var L=function(o,r,a){var u=e.pageYOffset;(o==r||u==r||e.innerHeight+u>=H)&&(clearInterval(a),s.focus(),c.callbackAfter(t,n))},Q=function(){A+=16,y=A/parseInt(c.speed,10),y=y>1?1:y,S=f+E*h(c.easing,y),e.scrollTo(0,Math.floor(S)),L(S,I,O)},C=function(){c.callbackBefore(t,n),O=setInterval(Q,16)};0===e.pageYOffset&&e.scrollTo(0,0),C()};var O=function(e){var n=s(e.target,"[data-scroll]");n&&"a"===n.tagName.toLowerCase()&&(e.preventDefault(),a.animateScroll(n,n.hash,t))},y=function(){n||(n=setTimeout(function(){n=null,r=b(o)},66))};return a.destroy=function(){t&&(document.removeEventListener("click",O,!1),e.removeEventListener("resize",y,!1),t=null,n=null,o=null,r=null)},a.init=function(n){c&&(a.destroy(),t=l(u,n||{}),o=document.querySelector("[data-scroll-header]"),r=b(o),document.addEventListener("click",O,!1),o&&e.addEventListener("resize",y,!1))},a});
//# sourceMappingURL=smoothScroll.js
//# sourceMappingURL=smoothScroll.js.map