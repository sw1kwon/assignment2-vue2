if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,t)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const u=e=>n(e,r),c={module:{uri:r},exports:o,require:u};s[r]=Promise.all(i.map((e=>c[e]||u(e)))).then((e=>(t(...e),o)))}}define(["./workbox-6567b62a"],(function(e){"use strict";e.setCacheNameDetails({prefix:"assignment2-vue2"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/assignment2-vue2/css/app.5c264aa5.css",revision:null},{url:"/assignment2-vue2/index.html",revision:"795ae763acf36c5a892942eb79cbe85f"},{url:"/assignment2-vue2/js/about.7606d338.js",revision:null},{url:"/assignment2-vue2/js/app.f12af030.js",revision:null},{url:"/assignment2-vue2/js/chunk-vendors.59937c25.js",revision:null},{url:"/assignment2-vue2/manifest.json",revision:"38a821f527f3cafe0d531931ac8dfcd2"},{url:"/assignment2-vue2/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map