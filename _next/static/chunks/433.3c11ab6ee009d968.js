"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[433],{1433:(e,t,n)=>{n.r(t),n.d(t,{default:()=>i});var r=n(5155),l=n(2115),a=n(7113);let i=()=>{let{systemTheme:e,theme:t,setTheme:n}=(0,a.D)(),i="system"===t?e:t,s=(0,l.useRef)(null);return(0,l.useEffect)(()=>{if(s.current){let e=s.current,t=e.getContext("2d"),n=e.width=window.innerWidth,r=e.height=window.innerHeight,l=[];for(let e=0;e<100;e++)l.push({x:Math.random()*n,y:Math.random()*r,size:5*Math.random(),speed:2*Math.random()});let a=()=>{if(t){t.clearRect(0,0,n,r);for(let e=0;e<100;e++){let n=l[e];t.beginPath(),t.fillStyle="#fff",t.arc(n.x,n.y,n.size,0,2*Math.PI),t.fill()}}},i=()=>{for(let e=0;e<100;e++){let t=l[e];t.y+=t.speed,t.y>r&&(t.y=-5)}},f=()=>{a(),i(),requestAnimationFrame(f)};f()}},[i]),(0,r.jsx)(r.Fragment,{children:"dark"===i&&(0,r.jsx)("canvas",{ref:s,className:"pointer-events-none fixed left-0 top-0 z-50 size-full"})})}}}]);