(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[819],{6946:function(e,t,n){"use strict";var r=n(2265),o=n(9843),a=r&&"object"==typeof r&&"default"in r?r:{default:r},u=function(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach(function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return e[n]}})}}),t.default=e,Object.freeze(t)}(o);"undefined"!=typeof window&&(window.requestIdleCallback=window.requestIdleCallback||function(e){var t=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},window.cancelIdleCallback=window.cancelIdleCallback||function(e){clearTimeout(e)}),t.R=function({compiledSource:e,scope:t,components:n={},lazy:o}){let[c,i]=r.useState(!o||"undefined"==typeof window);r.useEffect(()=>{if(o){let e=window.requestIdleCallback(()=>{i(!0)});return()=>window.cancelIdleCallback(e)}},[]);let l=r.useMemo(()=>{let n=Object.assign({mdx:u.mdx,React:a.default},t),r=Object.keys(n),o=Object.values(n),c=Reflect.construct(Function,r.concat(`${e}; return MDXContent;`));return c.apply(c,o)},[t,e]);if(!c)return a.default.createElement("div",{dangerouslySetInnerHTML:{__html:""},suppressHydrationWarning:!0});let f=a.default.createElement(u.MDXProvider,{components:n},a.default.createElement(l,null));return o?a.default.createElement("div",null,f):f}},9843:function(e,t,n){"use strict";n.r(t),n.d(t,{MDXContext:function(){return c},MDXProvider:function(){return f},mdx:function(){return d},useMDXComponents:function(){return l},withMDXComponents:function(){return i}});var r=n(2265);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach(function(t){var r;r=n[t],t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var c=r.createContext({}),i=function(e){return function(t){var n=l(t.components);return r.createElement(e,o({},t,{components:n}))}},l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):u(u({},t),e)),n},f=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef(function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,i=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(e,["components","mdxType","originalType","parentName"]),f=l(n),p=f["".concat(c,".").concat(o)]||f[o]||s[o]||a;return n?r.createElement(p,u(u({ref:t},i),{},{components:n})):r.createElement(p,u({ref:t},i))});function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,u=Array(a);u[0]=p;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:o,u[1]=c;for(var l=2;l<a;l++)u[l]=n[l];return r.createElement.apply(null,u)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},147:function(e,t,n){Promise.resolve().then(n.bind(n,2266))},2597:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{default:function(){return l},unstable_getImgProps:function(){return i}});let r=n(1024),o=n(3655),a=n(7707),u=n(6964),c=r._(n(5324)),i=e=>{(0,a.warnOnce)("Warning: unstable_getImgProps() is experimental and may change or be removed at any time. Use at your own risk.");let{props:t}=(0,o.getImgProps)(e,{defaultLoader:c.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,n]of Object.entries(t))void 0===n&&delete t[e];return{props:t}},l=u.Image},2266:function(e,t,n){"use strict";n.r(t);var r=n(7437);n(2265);var o=n(6946);n(3683);var a=n(6691),u=n.n(a);t.default=e=>(0,r.jsx)(o.R,{...e,components:{img:e=>(0,r.jsx)(u(),{...e,width:100,height:100,layout:"responsive",loading:"lazy"})}})},3683:function(){},622:function(e,t,n){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(2265),o=Symbol.for("react.element"),a=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),u=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};t.jsx=function(e,t,n){var r,i={},l=null,f=null;for(r in void 0!==n&&(l=""+n),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(f=t.ref),t)a.call(t,r)&&!c.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===i[r]&&(i[r]=t[r]);return{$$typeof:o,type:e,key:l,ref:f,props:i,_owner:u.current}}},7437:function(e,t,n){"use strict";e.exports=n(622)},6691:function(e,t,n){e.exports=n(2597)}},function(e){e.O(0,[964,971,864,744],function(){return e(e.s=147)}),_N_E=e.O()}]);