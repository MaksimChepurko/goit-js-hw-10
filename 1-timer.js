import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as h,i as u}from"./assets/vendor-BbbuE1sJ.js";let c=null,m=null;const o=document.querySelector("[data-start]"),d=h("#datetime-picker",{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){if(n.isActive){u.error({title:"Wait",message:"Please stop the current timer before selecting a new date.",position:"topCenter",timeout:4e3}),d.input.setAttribute("disabled","true");return}const t=new Date(e[0]);t.getTime()<=Date.now()?(u.warning({title:"Caution",message:"Please choose a date in the future",position:"topRight",timeout:2e3}),a(o,!1)):(c=t.getTime(),a(o,!0))}}),n={days:document.querySelector("[data-days]"),hours:document.querySelector("[data-hours]"),minutes:document.querySelector("[data-minutes]"),seconds:document.querySelector("[data-seconds]"),isActive:!1};a(o,!1);function a(e,t){e.disabled=!t}o.addEventListener("click",()=>{n.isActive||(n.isActive=!0,a(o,!1),d.input.setAttribute("disabled","true"),m=setInterval(()=>{const e=c-Date.now();if(e<=0){clearInterval(m),n.isActive=!1,d.input.removeAttribute("disabled"),f(0,0,0,0),u.success({title:"Time is up!",message:`It's now ${new Date(c)}`,position:"center",timeout:2e3});return}const{days:t,hours:i,minutes:s,seconds:l}=p(e);f(t,i,s,l)},1e3))});function f(e,t,i,s){n.days.textContent=r(e),n.hours.textContent=r(t),n.minutes.textContent=r(i),n.seconds.textContent=r(s)}function r(e){return e.toString().padStart(2,"0")}function p(e){return{days:Math.floor(e/864e5),hours:Math.floor(e%864e5/36e5),minutes:Math.floor(e%36e5/6e4),seconds:Math.floor(e%6e4/1e3)}}
//# sourceMappingURL=1-timer.js.map
