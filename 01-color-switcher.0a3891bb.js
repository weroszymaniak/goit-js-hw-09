const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),d=document.querySelector("body");let o=null;e.disabled=!0;const n=function(){return`#${Math.floor(16777215*Math.random()).toString(16)}`};function a(){t.disabled?(t.disabled=!1,e.disabled=!0):(t.disabled=!0,e.disabled=!1)}t.addEventListener("click",(a(),void(o=setInterval((()=>{d.style.backgroundColor=`${n}`}),1e3)))),e.addEventListener("click",(clearInterval(o),void a()));
//# sourceMappingURL=01-color-switcher.0a3891bb.js.map
