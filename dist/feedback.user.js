// ==UserScript==
// @name        Better Bay - Feedback
// @description Automate feedback on ebay
// @namespace   https://github.com/geotrev/better-bay
// @author      George Treviranus
// @run-at      document-idle
// @match       https://www.ebay.com/fdbk/leave_feedback*
// @version     2.0.0
// @downloadURL https://github.com/geotrev/better-bay/raw/main/dist/feedback.user.js
// @updateURL   https://github.com/geotrev/better-bay/raw/main/dist/feedback.user.js
// @grant       none
// ==/UserScript==
!function(){"use strict";const e=new function(){const e=document.createElement("div"),t=document.createElement("div");e.innerHTML='<div style="position: fixed;top: 0px;right: 0px;bottom: unset;left: 0px;z-index: 4000;padding: 48px 16px;pointer-events: none;display: flex;flex-direction: column;align-items: flex-end;"></div>',t.innerHTML='<section role="region" style="pointer-events: auto;flex-wrap: wrap;background-color: #333;margin: 0px;color: #dedede;padding: 12px 16px;border-radius: 8px;max-width: 280px;box-shadow: 0 5px 10px rgba(0,0,0,0.5);margin-bottom: 12px;"><h3 style="margin-bottom: 8px;margin-top:0;padding: 0;font-weight: bold;font-size: 12px;">[Better Bay]</h3><p style="font-size: 16px;line-height: 22px;padding: 0;margin:0;" data-notify-content></p></section>';const n=e.firstElementChild,i=t.firstElementChild;let o=0;function a(){return o<=0}function l(){a()||(n.removeChild(n.firstElementChild),o-=1)}return document.body.appendChild(n),document.addEventListener("keydown",(function(e){a()||"Escape"!==e.key||(e.preventDefault(),l())}),!0),function({content:e,delay:t=2e3}){const a=i.cloneNode(!0);a.querySelector("p").innerText=e,n.appendChild(a),o+=1,setTimeout(l,t)}},t={SUBMIT:!1,SALE_FEEDBACK_TEXT:"Great buyer + fast payment. Thanks.",PURCHASE_FEEDBACK_TEXT:"Easy purchase + item arrived as described. Thanks."},n=".single-feedback-template",i='input[value="2"][name^="ON_TIME_DELIVERY"]',o='input[value="POSITIVE"][name^="OVERALL_EXPERIENCE"]',a='input[value="5"][name^="DSR_ITEM_AS_DESCRIBED"]',l='input[value="5"][name^="DSR_SHIPPING_CHARGES"]',d='input[value="5"][name^="DSR_SHIPPING_TIME"]',r='input[value="5"][name^="DSR_COMMUNICATION"]',c='textarea[name="OVERALL_EXPERIENCE_COMMENT"]',u='input[name="OVERALL_EXPERIENCE_COMMENT"]',s='button[id^="submitFeedbackBtn-"]',E="No feedback, exiting.",p="Filling feedback...";let f=!1;function m(e,t){return t>1?e+"s":e}function x(e,t){const n=e.querySelector(t);n&&n.click()}function y(e,t,n){const i=e.querySelector(t);i&&(i.value=n,i.dispatchEvent(new Event("blur")))}function b(t,n){e({content:`Feedback completed for ${n} ${m(t,n)}.`})}function h(m){if(!window.location.pathname.startsWith("/fdbk/leave_feedback")||f||!["f","F"].includes(m.key)||!m.ctrlKey||!m.shiftKey)return;m.altKey&&(t.SUBMIT=!0),f=!0;let h=0,S=0;const C=document.querySelectorAll(n);if(0===C.length)return f=!1,e({content:E});e({content:p});for(const e of C)e.textContent.indexOf("Sold By")>-1?(x(e,i),x(e,o),x(e,a),x(e,l),x(e,d),x(e,r),y(e,c,t.PURCHASE_FEEDBACK_TEXT),h+=1):e.textContent.indexOf("Purchased by")>-1&&(x(e,o),y(e,u,t.SALE_FEEDBACK_TEXT),S+=1);if(t.SUBMIT){const e=document.querySelectorAll(s);e.length&&e.forEach((e=>!e.disabled&&e.click()))}h>0&&b("seller",h),S>0&&b("buyer",S),f=!1,t.SUBMIT=!1}e({content:"Better Bay activated! Press Ctrl+Shift+F to fill all feedback OR Ctrl+Shift+Alt+F to fill & submit feedback."}),document.addEventListener("keydown",h)}();
