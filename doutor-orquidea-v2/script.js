/* === Script 1 === */
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1371183171543353');
fbq('track', 'PageView');

/* === Script 2 === */
// reveal on scroll
document.addEventListener('DOMContentLoaded', function(){
  const revealEls = document.querySelectorAll('.reveal');
  
  // Fallback: se IO nÃ£o disparar, mostrar tudo apÃ³s 2.5s
  const fallback = setTimeout(function(){
    revealEls.forEach(el => el.classList.add('in'));
  }, 2500);
  
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },{threshold:0, rootMargin:'0px 0px -50px 0px'});
  
  revealEls.forEach(el=>{
    // Se jÃ¡ estÃ¡ visÃ­vel no carregamento, mostrar imediatamente
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight){
      el.classList.add('in');
    } else {
      io.observe(el);
    }
  });
  
  // Cancelar fallback se IO funcionar
  window.addEventListener('scroll', function(){ clearTimeout(fallback); }, {once:true, passive:true});
});

/* === Script 3 === */
const slides = [
  {icon:'', name:'', desc:'', quote:'', tags:[], color:'#b0407a', final:false, empty:true},
  {icon:'ðº', name:'Variedade', desc:'EpÃ­fita ou terrestre? Cada espÃ©cie tem necessidades Ãºnicas. Entenda sua planta e tudo muda.', quote:'', tags:['EpÃ­fita','Terrestre','Habitat natural'], color:'#b0407a', final:false, empty:false},
  {icon:'ð', name:'Local', desc:'O ambiente certo vale mais que qualquer produto. Encontre o lugar ideal na sua casa.', quote:'', tags:['Luz','Clima','Cobertura'], color:'#3e6b4a', final:false, empty:false},
  {icon:'ðª¨', name:'Substrato', desc:'Leve, mÃ©dio ou pesado. Monte o substrato ideal para sua planta e sua rotina.', quote:'', tags:['Leve','MÃ©dio','Pesado'], color:'#8c5a3c', final:false, empty:false},
  {icon:'ð§', name:'IrrigaÃ§Ã£o', desc:'Rega demais ou de menos mata. Descubra o mÃ©todo certo para a sua orquÃ­dea.', quote:'', tags:['ImersÃ£o','AspersÃ£o','FrequÃªncia'], color:'#4a7c59', final:false, empty:false},
  {icon:'ð±', name:'AdubaÃ§Ã£o', desc:'OrgÃ¢nico, quÃ­mico ou lento. Saiba exatamente quando e como adubar.', quote:'', tags:['OrgÃ¢nico','LiberaÃ§Ã£o lenta','NPK equilibrado'], color:'#6b4c9a', final:false, empty:false},
  {icon:'ð§âð¾', name:'VocÃª no Centro', desc:'', quote:'Quando um muda, todos os outros respondem. VocÃª, o cultivador, Ã© quem conecta tudo.', tags:['Tudo interligado','MÃ©todo completo'], color:'#b0407a', final:true, empty:false}
];
const stage=document.getElementById('parallaxStage'),panel=document.getElementById('petalPanel'),canvas=document.getElementById('mandalaCanvas'),centerHub=document.getElementById('centerHub'),dots=document.querySelectorAll('.petal-dots .dot'),progress=document.getElementById('progressBar')||document.querySelector('.progress-bar'),petalGs=document.querySelectorAll('.petal-g ellipse, .petal-g polygon'),petalTexts=document.querySelectorAll('.petal-g text'),innerRing=document.getElementById('innerRing'),flashOverlay=document.getElementById('flashOverlay');
if(!stage||!panel||!canvas){console.warn('Mandala: elementos nÃ£o encontrados.');}
let currentSlide=-1,flashActive=false,ticking=false;
function lerp(a,b,t){return a+(b-a)*t;}
function update(){
  ticking=false;if(!stage||!panel||!canvas)return;
  const rect=stage.getBoundingClientRect(),total=stage.offsetHeight-window.innerHeight,p01=Math.min(Math.max(-rect.top/total,0),1);
  if(progress)progress.style.width=(p01*100)+'%';
  const idx=Math.min(Math.floor(p01*7),6),isFinal=idx===6;
  let tilt,scale;
  if(isFinal){tilt=0;scale=1.28;}else{tilt=lerp(10,-6,p01*(7/6));scale=lerp(0.82,1.08,p01*(7/6));}
  canvas.style.transform='perspective(560px) rotateX('+tilt+'deg) scale('+scale+')';
  if(isFinal){canvas.classList.add('glowing');if(centerHub)centerHub.classList.add('pulse');if(innerRing){innerRing.setAttribute('stroke','#b0407a');innerRing.setAttribute('opacity','0.9');innerRing.setAttribute('stroke-dasharray','none');innerRing.setAttribute('stroke-width','2');}if(!flashActive){flashActive=true;if(flashOverlay)flashOverlay.classList.add('active');}}
  else{canvas.classList.remove('glowing');if(centerHub)centerHub.classList.remove('pulse');if(innerRing){innerRing.setAttribute('stroke','#b0407a');innerRing.setAttribute('opacity','0.4');innerRing.setAttribute('stroke-dasharray','4 4');innerRing.setAttribute('stroke-width','1');}if(flashActive){flashActive=false;if(flashOverlay)flashOverlay.classList.remove('active');}}
  for(let i=0;i<petalGs.length;i++){const gi=Math.floor(i/2);if(isFinal){petalGs[i].setAttribute('opacity','1');}else if(idx===0){petalGs[i].setAttribute('opacity','0.72');}else{petalGs[i].setAttribute('opacity',gi===(idx-1)?'1':'0.35');}}
  if(petalTexts)petalTexts.forEach(t=>t.setAttribute('opacity','1'));
  if(idx!==currentSlide){currentSlide=idx;showSlide(idx);}
}
function showSlide(idx){
  const s=slides[idx];
  dots.forEach((d,i)=>d.classList.toggle('active',i===idx));
  panel.classList.remove('visible','final-panel');
  if(s.empty){return;}
  setTimeout(()=>{
    document.getElementById('panelIcon').textContent=s.icon;
    document.getElementById('panelName').textContent=s.name;
    const descEl=document.getElementById('panelDesc'),quoteEl=document.getElementById('panelQuote'),tagsEl=document.getElementById('panelTags');
    if(s.final){descEl.style.display='none';quoteEl.style.display='block';quoteEl.textContent=s.quote;panel.classList.add('final-panel');}
    else{descEl.style.display='block';quoteEl.style.display='none';descEl.textContent=s.desc;}
    tagsEl.innerHTML=s.tags.map(t=>'<span style="display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.4);color:#fff;font-size:.85rem;font-weight:700;padding:5px 14px;border-radius:20px;margin:2px">'+t+'</span>').join('');
    panel.classList.add('visible');
  },400);
}
window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
setTimeout(()=>{update();},300);

/* === Script 4 === */
function generateEventId(){return "ev_"+Date.now()+"_"+Math.random().toString(36).substr(2,9);}
function getCookie(n){var v="; "+document.cookie,p=v.split("; "+n+"=");if(p.length===2)return p.pop().split(";").shift();return "";}
function sendCAPIEvent(en,ed){fetch("https://graph.facebook.com/v18.0/1371183171543353/events",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({data:[{event_name:en,event_time:Math.floor(Date.now()/1000),event_id:generateEventId(),event_source_url:window.location.href,action_source:"website",user_data:{client_user_agent:navigator.userAgent,fbc:getCookie("_fbc"),fbp:getCookie("_fbp")},custom_data:ed||{}}],access_token:"EAAsYdqtlDmsBR4nv3d28UjMVTpmlkiFDAKFosTuYSe58bBZALlcMdhtb20ye7IqYFrVdLnJc5LItJcTYPxM80mZBKaA5pO1pWyzru4llW6OguScrykpZBRl5pFpCVkrXfMiuXupjQHxxIRLFy5y1MKW7WERgQOrJFz42UkEnTDQ55wPUQ7Q4HCgsdBbQgZDZD"})  }).catch(function(){});}
window.addEventListener("load",function(){if(typeof fbq!=="undefined")fbq("track","ViewContent",{value:67,currency:"BRL"},{eventID:generateEventId()});sendCAPIEvent("ViewContent",{value:67,currency:"BRL"});});
document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll("a[href*='hotmart']").forEach(function(b){b.addEventListener("click",function(){if(typeof fbq!=="undefined")fbq("track","InitiateCheckout",{value:67,currency:"BRL"},{eventID:generateEventId()});sendCAPIEvent("InitiateCheckout",{value:67,currency:"BRL"});});});});
