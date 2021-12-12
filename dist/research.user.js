// ==UserScript==
// @name        Super Bay - Research
// @description Better controls in seller hub research
// @namespace   https://github.com/geotrev/super-bay
// @version     1.0.15
// @author      George Treviranus
// @run-at      document-idle
// @match       https://www.ebay.com/sh/research*
// @downloadURL https://github.com/geotrev/super-bay/raw/main/dist/research.user.js
// @updateURL   https://github.com/geotrev/super-bay/raw/main/dist/research.user.js
// @grant       none
// ==/UserScript==
!function(){"use strict";const e=new class{constructor(){const e=document.createElement("div"),t=document.createElement("div");e.innerHTML='<div style="position: fixed;top: 0px;right: 0px;bottom: unset;left: 0px;z-index: 4000;padding: 48px 16px;pointer-events: none;display: flex;flex-direction: column;align-items: flex-end;"></div>',t.innerHTML='<section role="region" style="pointer-events: auto;flex-wrap: wrap;background-color: #333;margin: 0px;color: #dedede;padding: 12px 16px;border-radius: 8px;max-width: 280px;box-shadow: 0 5px 10px rgba(0,0,0,0.5);margin-bottom: 12px;"><h3 style="margin-bottom: 8px;margin-top:0;padding: 0;font-weight: bold;font-size: 12px;">[Super Bay]</h3><p style="font-size: 16px;line-height: 22px;padding: 0;margin:0;" data-notify-content></p></section>',this.notifyWrapper=e.firstElementChild,this.notifyEl=t.firstElementChild,document.body.appendChild(this.notifyWrapper),this.destroy=this.destroy.bind(this)}trigger({content:e}){const t=this.notifyEl.cloneNode(!0);t.querySelector("p").innerText=e,this.notifyWrapper.appendChild(t),setTimeout(this.destroy,2e3)}destroy(){this.notifyWrapper.removeChild(this.notifyWrapper.firstElementChild)}};async function t(t,n,o=50){let r=-1,i=null;for(;++r<o;)if(await new Promise((e=>setTimeout((()=>{i=t(),e()}),250))),i)return i;n&&e.trigger({content:n})}const n=".sold-result-table",o=".research-container input",r=".search-input-panel__dropdown",i=".search-input-panel__research-button",c=".research-table-row",a=".research-table-row__link-row-anchor",l=[".tabs__items",".category-selection-panel .filter-menu-button__items",".category-selection-panel .filter-menu-button__footer"],s=[".filters-panel .filter-menu-button__footer",".search-filter-pills .filter-pill__close"],d="#EFEFEF",u="Plugin activated!",p="Table upgraded. Removed listings have a darker background color.",f="Results table took too long to load. Try again.";let y=[];async function m(){await t((()=>document.querySelector(n)),f)&&function(){e.trigger({content:p});const t=document.querySelector(n).querySelectorAll(c);for(const e of t)e.querySelector(a)||(e.style.backgroundColor=d)}()}function h(e){e.target.disabled||setTimeout(x,2e3)}function g(e){"Enter"===e.key&&setTimeout(x,2e3)}async function x(){await m(),y.forEach((e=>e.removeEventListener("click",h))),y=[],b()}async function b(){for(const e of l){const n=await t((()=>document.querySelector(e)));n&&(n.addEventListener("click",h),y.push(n))}for(const e of s){const n=await t((()=>{const t=Array.from(document.querySelectorAll(e));return t.length?t:null}));n&&(n.forEach((e=>e.addEventListener("click",h))),y.push(...n))}}!async function(){e.trigger({content:u});const t=document.querySelector(i),n=document.querySelector(r),c=document.querySelector(o);t.addEventListener("click",h),n.addEventListener("click",h),c.addEventListener("keydown",g),await m(),await b()}()}();
