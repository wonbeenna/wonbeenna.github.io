(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[616],{6189:(e,t,n)=>{Promise.resolve().then(n.t.bind(n,4839,23)),Promise.resolve().then(n.bind(n,463)),Promise.resolve().then(n.bind(n,2316))},463:(e,t,n)=>{"use strict";n.d(t,{default:()=>i});var r=n(5155),a=n(2115);function o({id:e,host:t,repo:o,repoId:s,category:i,categoryId:l,mapping:c,term:m,strict:d,reactionsEnabled:u,emitMetadata:h,inputPosition:p,theme:g,lang:y,loading:f}){let[b,v]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{b||(n.e(111).then(n.bind(n,9492)),v(!0))},[]),b?(0,r.jsx)("giscus-widget",{id:e,host:t,repo:o,repoid:s,category:i,categoryid:l,mapping:c,term:m,strict:d,reactionsenabled:u,emitmetadata:h,inputposition:p,theme:g,lang:y,loading:f}):null}var s=n(7113);let i=()=>{let{systemTheme:e,theme:t}=(0,s.D)();return(0,r.jsx)("div",{className:"py-[50px]",children:(0,r.jsx)(o,{id:"comments",repo:"wonbeenna/wonbeenna.github.io",repoId:"R_kgDOKY4BEA=",category:"Announcements",categoryId:"DIC_kwDOKY4BEM4CZuWW",mapping:"og:title",term:"Welcome to @giscus/react component!",reactionsEnabled:"1",strict:"0",emitMetadata:"0",inputPosition:"top",theme:"light"===("system"===t?e:t)?"light_tritanopia":"dark_tritanopia",lang:"ko",loading:"lazy"})})}},2316:(e,t,n)=>{"use strict";n.d(t,{default:()=>r}),n(7897);let r=e=>e.component},7897:()=>{},7113:(e,t,n)=>{"use strict";n.d(t,{D:()=>m,N:()=>d});var r=n(2115),a=(e,t,n,r,a,o,s,i)=>{let l=document.documentElement,c=["light","dark"];function m(t){(Array.isArray(e)?e:[e]).forEach(e=>{let n="class"===e,r=n&&o?a.map(e=>o[e]||e):a;n?(l.classList.remove(...r),l.classList.add(t)):l.setAttribute(e,t)}),i&&c.includes(t)&&(l.style.colorScheme=t)}if(r)m(r);else try{let e=localStorage.getItem(t)||n,r=s&&"system"===e?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":e;m(r)}catch(e){}},o=["light","dark"],s="(prefers-color-scheme: dark)",i="undefined"==typeof window,l=r.createContext(void 0),c={setTheme:e=>{},themes:[]},m=()=>{var e;return null!=(e=r.useContext(l))?e:c},d=e=>r.useContext(l)?r.createElement(r.Fragment,null,e.children):r.createElement(h,{...e}),u=["light","dark"],h=e=>{let{forcedTheme:t,disableTransitionOnChange:n=!1,enableSystem:a=!0,enableColorScheme:i=!0,storageKey:c="theme",themes:m=u,defaultTheme:d=a?"system":"light",attribute:h="data-theme",value:b,children:v,nonce:w,scriptProps:E}=e,[k,C]=r.useState(()=>g(c,d)),[S,T]=r.useState(()=>g(c)),_=b?Object.values(b):m,A=r.useCallback(e=>{let t=e;if(!t)return;"system"===e&&a&&(t=f());let r=b?b[t]:t,s=n?y(w):null,l=document.documentElement,c=e=>{"class"===e?(l.classList.remove(..._),r&&l.classList.add(r)):e.startsWith("data-")&&(r?l.setAttribute(e,r):l.removeAttribute(e))};if(Array.isArray(h)?h.forEach(c):c(h),i){let e=o.includes(d)?d:null,n=o.includes(t)?t:e;l.style.colorScheme=n}null==s||s()},[w]),I=r.useCallback(e=>{let t="function"==typeof e?e(k):e;C(t);try{localStorage.setItem(c,t)}catch(e){}},[k]),L=r.useCallback(e=>{T(f(e)),"system"===k&&a&&!t&&A("system")},[k,t]);r.useEffect(()=>{let e=window.matchMedia(s);return e.addListener(L),L(e),()=>e.removeListener(L)},[L]),r.useEffect(()=>{let e=e=>{e.key===c&&(e.newValue?C(e.newValue):I(d))};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[I]),r.useEffect(()=>{A(null!=t?t:k)},[t,k]);let P=r.useMemo(()=>({theme:k,setTheme:I,forcedTheme:t,resolvedTheme:"system"===k?S:k,themes:a?[...m,"system"]:m,systemTheme:a?S:void 0}),[k,I,t,S,a,m]);return r.createElement(l.Provider,{value:P},r.createElement(p,{forcedTheme:t,storageKey:c,attribute:h,enableSystem:a,enableColorScheme:i,defaultTheme:d,value:b,themes:m,nonce:w,scriptProps:E}),v)},p=r.memo(e=>{let{forcedTheme:t,storageKey:n,attribute:o,enableSystem:s,enableColorScheme:i,defaultTheme:l,value:c,themes:m,nonce:d,scriptProps:u}=e,h=JSON.stringify([o,n,l,t,m,c,s,i]).slice(1,-1);return r.createElement("script",{...u,suppressHydrationWarning:!0,nonce:"undefined"==typeof window?d:"",dangerouslySetInnerHTML:{__html:"(".concat(a.toString(),")(").concat(h,")")}})}),g=(e,t)=>{let n;if(!i){try{n=localStorage.getItem(e)||void 0}catch(e){}return n||t}},y=e=>{let t=document.createElement("style");return e&&t.setAttribute("nonce",e),t.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(t),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(t)},1)}},f=e=>(e||(e=window.matchMedia(s)),e.matches?"dark":"light")}},e=>{var t=t=>e(e.s=t);e.O(0,[368,839,441,517,358],()=>t(6189)),_N_E=e.O()}]);