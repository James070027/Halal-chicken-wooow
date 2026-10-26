/* ========= helpers ========= */
const fmt=n=>n.toLocaleString('en-US');
const wa=t=>'https://wa.me/'+CONFIG.phoneIntl+'?text='+encodeURIComponent(t);
function photo(name,alt,h){return '<img src="images/'+name+'.jpg" alt="'+alt+'" loading="lazy" style="height:'+h+'px" onerror="phFallback(this,'+h+')">'}
function phFallback(img,h){const d=document.createElement('div');d.className='ph';d.style.height=h+'px';d.setAttribute('role','img');d.setAttribute('aria-label',img.alt);d.innerHTML='<i class="fa-solid fa-drumstick-bite"></i>';img.replaceWith(d)}
function range(list){const p=list.map(x=>x.p).filter(v=>v<100000);return fmt(Math.min(...p))+' - '+fmt(Math.max(...p))}

/* ========= render ========= */
function renderProducts(){
  let h='';
  for(const k of Object.keys(GROUPS)){
    const g=GROUPS[k];
    h+='<div class="category-bar"><b>'+g.t+'</b><span'+(g.bg?' style="background:'+g.bg+'"':'')+'>'+g.badge+'</span></div><div class="products-grid">';
    for(const p of PRODUCTS.filter(x=>x.c===k)){
      h+='<div class="p-card"'+(p.bulk?' style="border:2px dashed var(--gold)"':'')+'>'+photo(p.ph,p.n,220)+
      '<div class="p-card-body"><div class="p-price '+g.pc+'">UGX '+fmt(p.p)+'</div><h3>'+p.n+'</h3><p style="font-size:13px;color:#64748b">'+p.d+'</p><br>'+
      '<button class="btn '+(p.bulk?'btn-order':g.btn)+'" style="width:100%;justify-content:center" data-n="'+p.n+'" data-p="'+p.p+'" onclick="addToCart(this.dataset.n,+this.dataset.p)">ADD TO ORDER</button></div></div>';
    }
    h+='</div>';
  }
  document.getElementById('productList').innerHTML=h;
  document.getElementById('cproduct').innerHTML=CATALOG.map((c,i)=>'<option value="'+i+'">'+c.n+' - UGX '+fmt(c.p)+'</option>').join('');
  const loc=PRODUCTS.filter(p=>p.c==='l'),oth=PRODUCTS.filter(p=>p.c!=='l'&&!p.bulk);
  const line=p=>p.n.split(' - ')[0].replace(/ \d.*$/,'')+' '+(p.p/1000)+'k';
  document.getElementById('footPrices').innerHTML='Local:<br>'+loc.map(line).join('<br>')+'<br><br>Others:<br>'+oth.sort((a,b)=>a.p-b.p).map(line).join('<br>');
  document.querySelectorAll('[data-range=local]').forEach(e=>e.textContent=range(loc));
  document.querySelectorAll('[data-range=other]').forEach(e=>e.textContent=range(oth));
}
function renderStations(){
  const card=(s,i,full)=>'<div class="station'+(i?'':' hq')+'"><iframe data-src="https://maps.google.com/maps?q='+s[1]+'&z='+s[2]+'&output=embed" title="Map of '+s[0]+'"></iframe><div class="station-info"><div><b>'+(i?(i+1)+'. ':'🏆 1. ')+s[0]+'</b>'+(full?'<br><small>'+s[3]+'</small>':'')+'<br><a class="maplink" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+s[1]+'">Open in Google Maps</a></div><button class="btn btn-order" data-o="'+s[4]+'" onclick="pickStation(this.dataset.o)">ORDER HERE</button></div></div>';
  document.getElementById('stationList').innerHTML=STATIONS.map((s,i)=>card(s,i,true)).join('');
  document.getElementById('contactStations').innerHTML=STATIONS.map((s,i)=>card(s,i,false)).join('');
}
function loadMaps(page){document.getElementById(page).querySelectorAll('iframe[data-src]').forEach(f=>{if(!f.src)f.src=f.dataset.src})}
function renderConfig(){
  document.querySelectorAll('[data-phone]').forEach(e=>e.textContent=CONFIG.phoneLocal);
  document.querySelectorAll('[data-airtel]').forEach(e=>e.textContent=CONFIG.airtelNumber?': '+CONFIG.airtelNumber:'');
  const certs=[['Halal certificate',CONFIG.halalCert],['UNBS',CONFIG.unbsCert],['Trading licence',CONFIG.tradingLicense]].filter(c=>c[1]);
  const box=document.getElementById('certs');
  if(certs.length){box.style.display='block';box.innerHTML=certs.map(c=>'<span class="cert"><i class="fa-solid fa-circle-check" style="color:var(--green)"></i> '+c[0]+': '+c[1]+'</span>').join('')}
  document.getElementById('heroPhoto').innerHTML=photo('hero','Fresh halal chicken from Kitoro HQ',420).replace('style="height:420px"','style="width:100%;height:420px;object-fit:cover"');
  document.querySelectorAll('[data-photo]').forEach(e=>e.innerHTML=photo(e.dataset.photo,e.dataset.alt,+e.dataset.h));
  if(CONFIG.rating){document.getElementById('trustCard1').innerHTML='<b>'+CONFIG.rating+'★ Rating</b><br><small>From families who love our local chicken for luwombo.</small>'}
  if(CONFIG.reviews.length){document.getElementById('reviewsBox').style.display='block';document.getElementById('reviewList').innerHTML=CONFIG.reviews.map(r=>'<div style="background:#f8fafc;padding:14px;border-radius:12px;border:1px solid #e2e8f0"><b>'+r.who+'</b><br><small style="color:#64748b">"'+r.t+'"</small></div>').join('')}
  document.getElementById('yr').textContent=new Date().getFullYear();
  renderExtras();
}

/* ========= navigation and actions ========= */
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.menu a').forEach(a=>a.classList.remove('active'));
  const m=document.getElementById('m-'+id);if(m)m.classList.add('active');
  loadMaps(id);
  if(m)m.parentNode.scrollTo({left:Math.max(0,m.offsetLeft-24),behavior:'smooth'});
  window.scrollTo({top:0,behavior:'smooth'});
}
function openWhatsApp(t){window.open(wa(typeof t==='string'?t:'Salam Halal Chicken Kitoro HQ! I want to MAKE ORDER. Location: '),'_blank')}
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),1800)}

/* ----- order cart: several items in one order ----- */
let cart=[];
const stepOf=i=>i.min>=50?10:(i.min>=10?5:1);
function addToCart(n,p,min=1,q){
  q=q||min;const f=cart.find(i=>i.n===n);
  if(f)f.q+=q;else cart.push({n:n,p:p,min:min,q:q});
  renderCart();toast(T('Added')+': '+n);
}
function addFromForm(){const c=CATALOG[+document.getElementById('cproduct').value];const q=Math.max(+document.getElementById('cqty').value||1,c.min);addToCart(c.n,c.p,c.min,q)}
function changeQty(k,d){const i=cart[k];i.q+=d*stepOf(i);if(i.q<i.min)cart.splice(k,1);renderCart()}
function removeItem(k){cart.splice(k,1);renderCart()}
function cartInfo(){
  let sub=0,base=0,birds=0;
  cart.forEach(i=>{sub+=i.p*i.q;const pr=PRODUCTS.find(x=>x.n===i.n);if(pr){birds+=i.q*(pr.bulk?5:1);if(!pr.bulk)base+=i.p*i.q}});
  let tier=null;WHOLESALE.forEach(t=>{if(birds>=t.min)tier=t});
  const next=birds>0?WHOLESALE.find(t=>birds<t.min):null;
  const disc=tier?Math.round(base*tier.pct/10000)*100:0;
  return{sub,disc,tier,next,birds,total:sub-disc};
}
function renderCart(){
  const c=cartInfo();
  const b=document.getElementById('cartCount');b.textContent=cart.length;b.style.display=cart.length?'flex':'none';
  let h=cart.length?cart.map((i,k)=>'<div class="cart-row"><div><b>'+i.n+'</b><br><small>UGX '+fmt(i.p)+' '+T('each')+(i.min>1?' • '+T('minimum')+' '+i.min:'')+'</small></div><div class="qty"><button onclick="changeQty('+k+',-1)" aria-label="Less">−</button><span>'+i.q+'</span><button onclick="changeQty('+k+',1)" aria-label="More">+</button><button class="x" onclick="removeItem('+k+')" aria-label="Remove">✕</button></div></div>').join(''):'<p style="font-size:13px;color:#64748b;margin-bottom:6px">'+T('No items yet. Tap ADD TO ORDER on any product, or pick one below.')+'</p>';
  if(cart.length){
    if(c.disc>0)h+='<div class="cart-row" style="color:#166534"><span>'+T('Bulk bonus ({p}% off for {n}+ birds)',{p:c.tier.pct,n:c.tier.min})+'</span><b>− UGX '+fmt(c.disc)+'</b></div>';
    else if(c.next)h+='<div class="hint">'+T('Add {n} more bird(s) to get {p}% off. Great for restaurants and hotels.',{n:c.next.min-c.birds,p:c.next.pct})+'</div>';
    h+='<div class="cart-total">'+T('Total')+': UGX '+fmt(c.total)+' <small style="font-weight:400">'+T('(delivery fee extra)')+'</small></div>';
  }
  document.getElementById('cartBox').innerHTML=h;
}
function pickStation(name){document.getElementById('cloc').value=name;showPage('contact');toast('Location set: '+name)}
function sendOrder(){
  const v=id=>document.getElementById(id).value.trim();
  if(!cart.length){alert(T('Your order is empty. Add at least one item.'));return}
  if(!v('cphone')){alert(T('Please add your phone number'));return}
  if(!v('cloc')){alert(T('Please add your location - e.g Kitoro'));return}
  const c=cartInfo();
  const lines=cart.map((i,k)=>(k+1)+'. '+i.n+' x'+i.q+' = UGX '+fmt(i.p*i.q)).join('\n');
  const bonus=c.disc>0?'\nBulk bonus ('+c.tier.pct+'%): -UGX '+fmt(c.disc):'';
  window.open(wa('NEW ORDER - KITORO HQ\nName: '+(v('cname')||'Customer')+'\nPhone: '+v('cphone')+'\nLocation: '+v('cloc')+'\n\nItems:\n'+lines+bonus+'\n\nTotal: UGX '+fmt(c.total)+' (delivery fee extra)\nPayment: '+v('cpayment')),'_blank');
}
function sendStanding(){
  const v=id=>document.getElementById(id).value.trim();
  if(!v('sbiz')||!v('sphone')||!v('sitems')){alert('Please add the business name, phone and what you need.');return}
  window.open(wa('STANDING ORDER REQUEST\nBusiness: '+v('sbiz')+'\nContact: '+(v('sperson')||'-')+'\nPhone: '+v('sphone')+'\nLocation: '+(v('sloc')||'-')+'\nItems each time: '+v('sitems')+'\nFrequency: '+v('sfreq')+'\nDays/time: '+(v('sdays')||'-')),'_blank');
}
function openPayment(){document.getElementById('paymentModal').classList.add('active')}
function closePayment(){document.getElementById('paymentModal').classList.remove('active')}
document.getElementById('paymentModal').addEventListener('click',e=>{if(e.target.id==='paymentModal')closePayment()});
function payMTN(){window.open('tel:*165%23','_self')}
function payAirtel(){window.open('tel:*185%23','_self')}

/* keep page content below the fixed nav on every screen size */
function fixNavPadding(){const h=document.querySelector('nav').offsetHeight+20;document.querySelectorAll('.page').forEach(p=>p.style.paddingTop=h+'px')}
window.addEventListener('load',fixNavPadding);
window.addEventListener('resize',fixNavPadding);


/* installable app: needs https, manifest.webmanifest and sw.js in the same folder */
if('serviceWorker' in navigator&&location.protocol!=='file:'){
  window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
}


/* ========= extras: hours, delivery, bonus tables, media, social, schema ========= */
const DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const fh=h=>{const hh=Math.floor(h),m=Math.round((h-hh)*60);return ((hh+11)%12+1)+':'+String(m).padStart(2,'0')+' '+(hh<12?'AM':'PM')};
function openStatus(){
  const d=new Date(Date.now()+3*3600000),day=d.getUTCDay(),h=d.getUTCHours()+d.getUTCMinutes()/60,t=CONFIG.hours[day];
  if(t&&h>=t[0]&&h<t[1])return{open:true,text:T('Open now')+' • '+T('closes')+' '+fh(t[1])};
  for(let k=0;k<8;k++){const dd=(day+k)%7,tt=CONFIG.hours[dd];if(tt&&(k>0||h<tt[0]))return{open:false,text:T('Closed')+' • '+T('opens')+' '+T(k===0?'today':k===1?'tomorrow':DAYS[dd])+' '+fh(tt[0])}}
  return{open:false,text:T('Closed')};
}
function updateOpen(){const s=openStatus();document.querySelectorAll('[data-open]').forEach(e=>{e.textContent=s.text;e.classList.add('open-pill');e.classList.toggle('closed',!s.open)})}
function table(el,head,rows){document.getElementById(el).innerHTML='<tr>'+head.map(h=>'<th>'+h+'</th>').join('')+'</tr>'+rows.map(r=>'<tr>'+r.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')}
function renderBusiness(){
  document.getElementById('tierList').innerHTML=WHOLESALE.map(t=>'<div class="tier"><b>'+t.pct+'% off</b>'+t.min+'+ birds in one order</div>').join('');
  const head=['Item','Price'].concat(WHOLESALE.map(t=>t.min+'+ birds'));
  table('priceTable',head,PRODUCTS.filter(p=>!p.bulk).map(p=>[p.n,fmt(p.p)].concat(WHOLESALE.map(t=>fmt(Math.round(p.p*(100-t.pct)/10000)*100)))));
  table('deliveryTable',['Area','Delivery fee','Time'],DELIVERY);
  document.getElementById('deliveryNote').textContent=DELIVERY_NOTE;
  const rows=[];for(let k=1;k<=7;k++){const d=k%7,t=CONFIG.hours[d];rows.push([DAYS[d],t?fh(t[0])+' - '+fh(t[1]):'Closed'])}
  table('hoursTable',['Day','Hours (Uganda time)'],rows);
}
function renderMedia(){
  const slot=document.getElementById('videoSlot');
  const ph='<div class="ph vid-ph"><i class="fa-solid fa-circle-play"></i><small>Farm video coming soon</small></div>';
  if(!CONFIG.video){slot.innerHTML=ph}else{
    const v=document.createElement('video');v.className='vid';v.controls=true;v.preload='metadata';v.playsInline=true;v.poster=CONFIG.videoPoster;v.src=CONFIG.video;
    v.addEventListener('error',()=>{slot.innerHTML=ph});slot.appendChild(v);
  }
  let g='';for(let i=1;i<=CONFIG.galleryCount;i++)g+=photo('gallery-'+i,'Halal Chicken Kitoro HQ photo '+i,170);
  document.getElementById('gallery').innerHTML=g;
}
function renderSocial(){
  const L=[['facebook','fa-brands fa-facebook','Facebook'],['instagram','fa-brands fa-instagram','Instagram'],['tiktok','fa-brands fa-tiktok','TikTok'],['googleBusiness','fa-brands fa-google','Find us on Google']];
  const h=L.filter(l=>CONFIG[l[0]]).map(l=>'<a href="'+CONFIG[l[0]]+'" target="_blank" rel="noopener"><i class="'+l[1]+'"></i> '+l[2]+'</a>').join('');
  ['footSocial','contactSocial'].forEach(id=>{const e=document.getElementById(id);if(e){e.innerHTML=h;e.style.display=h?'flex':'none'}});
}
function renderSchema(){
  const t=CONFIG.hours,days=[];
  for(let d=0;d<7;d++)if(t[d])days.push({'@type':'OpeningHoursSpecification',dayOfWeek:DAYS[d],opens:String(t[d][0]).padStart(2,'0')+':00',closes:String(t[d][1]).padStart(2,'0')+':00'});
  const o={'@context':'https://schema.org','@type':'LocalBusiness',name:'Halal Chicken Kitoro HQ',telephone:'+'+CONFIG.phoneIntl,url:CONFIG.siteUrl||undefined,
    address:{'@type':'PostalAddress',streetAddress:'Kitoro, opposite Kitoro Mosque',addressLocality:'Entebbe',addressCountry:'UG'},
    openingHoursSpecification:days,sameAs:['facebook','instagram','tiktok','googleBusiness'].map(k=>CONFIG[k]).filter(Boolean)};
  const s=document.createElement('script');s.type='application/ld+json';s.textContent=JSON.stringify(o);document.head.appendChild(s);
}
function renderExtras(){
  renderBusiness();renderMedia();renderSocial();renderSchema();updateOpen();setInterval(updateOpen,60000);
  document.getElementById('pdpoLine').textContent=CONFIG.pdpoReg?'Data protection registration: '+CONFIG.pdpoReg:'';
}

/* ========= start ========= */
renderConfig();renderProducts();renderStations();renderCart();fixNavPadding();initLang();
