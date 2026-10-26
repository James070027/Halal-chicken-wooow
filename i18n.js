/* ========= LANGUAGES: English / Kiswahili / Luganda =========
   Each entry: 'English text': ['Kiswahili', 'Luganda']. An empty '' means "show English".
   NOTE: have a native speaker check these, especially Luganda, before launch.
   Orders sent to WhatsApp always stay in English so the owner can read them. */
const DICT={
 'Home':['Nyumbani','Ewaka'],'About Us':['Kuhusu Sisi','Ebitukwatako'],'Chickens':['Kuku','Enkoko'],
 'Hotels & Restaurants':['Hoteli na Migahawa','Amahotel ne Resitwaranti'],'Eggs':['Mayai','Amagi'],
 'Chicks':['Vifaranga',"Obwana bw'enkoko"],'Stations':['Vituo','Ebifo byaffe'],
 'Delivery & FAQ':['Uwasilishaji na Maswali',"Okutuusa n'Ebibuuzo"],'Contacts':['Mawasiliano','Tukwatagane'],
 'MAKE ORDER':['WEKA ODA','TUMA ODA'],'PAY MoMo':['LIPA KWA MoMo','SASULA NE MoMo'],
 'SEE CHICKENS':['ANGALIA KUKU','LABA ENKOKO'],'MAKE ORDER NOW':['WEKA ODA SASA','TUMA ODA KAAKANO'],
 'ADD TO ORDER':['ONGEZA KWENYE ODA','YONGERA MU ODA'],'SEND ORDER':['TUMA ODA','TUMA ODA'],
 'ADD ANOTHER ITEM':['ONGEZA BIDHAA NYINGINE','YONGERAMU EKINTU EKIRALA'],'ORDER HERE':['AGIZA HAPA','TUMA ODA WANO'],
 'START AN ORDER':['ANZA ODA','TANDIKA ODA'],'SEND FEEDBACK':['TUMA MAONI','TUMA ENDOWOOZA'],
 'PAY MoMo NOW':['LIPA KWA MoMo SASA','SASULA NE MoMo KAAKANO'],
 'SEND STANDING ORDER REQUEST':['TUMA OMBI LA ODA YA KUDUMU',''],
 'Pay MTN MoMo':['Lipa kwa MTN MoMo',''],'Pay Airtel Money':['Lipa kwa Airtel Money',''],
 'Why Families Choose Us':['Kwa Nini Familia Hutuchagua','Lwaki Amaka Gatulondawo'],
 'See Our Birds & Farm':['Tazama Kuku na Shamba Letu','Laba Enkoko ne Faamu Yaffe'],
 'What Customers Say':['Wateja Wanasemaje','Bakasitoma Bye Boogera'],
 'Bought from us before?':['Umewahi kununua kwetu?','Wali ogula ku ffe?'],
 'Tell us how it went. Your feedback helps other families.':['Tuambie ilivyokuwa. Maoni yako husaidia familia nyingine.',''],
 'Fresh Chickens':['Kuku Wabichi','Enkoko Embisi'],'Fresh Eggs - Tray of 30':['Mayai Mabichi - Trei ya 30','Amagi Amaggya - Ttereyi ya 30'],
 'Young Chicks For Rearing':['Vifaranga vya Kufuga',"Obwana bw'Enkoko Obw'Okulunda"],
 'Our 9 Stations':['Vituo Vyetu 9','Ebifo Byaffe 9'],'Contacts & Orders':['Mawasiliano na Oda','Tukwatagane ne Oda'],
 'Make Order':['Weka Oda','Tuma Oda'],'Your items':['Bidhaa zako','Ebintu byo'],'Find a Station':['Tafuta Kituo','Noonya Ekifo'],
 'Restaurants, Hotels & Events':['Migahawa, Hoteli na Matukio',"Resitwaranti, Amahotel n'Emikolo"],
 'Bulk Bonus':['Punguzo la Jumla',"Bonasi y'Okugula Ebingi"],'Price List (per bird)':['Orodha ya Bei (kwa kuku)',''],
 'Standing Orders (weekly or monthly)':['Oda za Kudumu (kila wiki au mwezi)',''],
 'Delivery, Hours & FAQ':['Uwasilishaji, Saa na Maswali',''],'Delivery Fees by Area':['Ada ya Uwasilishaji kwa Eneo',''],
 'Opening Hours':['Saa za Kufungua',"Essaawa z'Okuggulawo"],
 'Frequently Asked Questions':['Maswali Yanayoulizwa Mara kwa Mara','Ebibuuzo Ebibuuzibwa Ennyo'],
 'Terms & Privacy':['Masharti na Faragha',"Amateeka n'Ekyama"],'How to Pay MoMo':['Jinsi ya Kulipa kwa MoMo',"Engeri y'Okusasula ne MoMo"],
 'Halal slaughter, clean handling, cooler-box packing.':['Uchinjaji wa halal, usafi, na ufungaji kwenye boksi baridi.',''],
 '2 Hours Delivery':['Uwasilishaji Saa 2','Okutuusa mu Ssaawa 2'],
 'Entebbe 5k, Kampala 10-15k, boda with cooler box.':['Entebbe 5k, Kampala 10-15k, kwa boda na boksi baridi.',''],
 'MoMo Pay':['Lipa kwa MoMo','Sasula ne MoMo'],
 'MTN MoMo, Airtel Money, Cash on Delivery.':['MTN MoMo, Airtel Money, Pesa Taslimu Unapopokea.',''],
 'Premium Halal Chicken':['Kuku wa Halal wa Daraja la Juu',"Enkoko ya Halal Ey'Omutindo"],
 'That Families':['Anayeaminiwa na','Amaka Gye'],'Trust.':['Familia.','Beesiga.'],
 'We supply broilers, local chicken, layers, exotic and local eggs (tray of 30) and young chicks. Kitoro Branch is our headquarters. Local chicken is UGX':['Tunauza kuku wa nyama, kuku wa kienyeji, kuku wa mayai, mayai ya kisasa na ya kienyeji (trei ya 30) na vifaranga. Tawi la Kitoro ndilo makao makuu yetu. Kuku wa kienyeji ni UGX',''],
 '; other types are UGX':['; aina nyingine ni UGX',''],
 'KITORO HQ • 9 STATIONS • ENTEBBE & KAMPALA':['KITORO MAKAO MAKUU • VITUO 9 • ENTEBBE NA KAMPALA',''],
 'Your Name':['Jina Lako','Erinnya Lyo'],'Your Phone - e.g 07XXXXXXXX':['Simu Yako - mfano 07XXXXXXXX','Essimu Yo - okugeza 07XXXXXXXX'],
 'Location - e.g Kitoro':['Eneo - mfano Kitoro','Ekifo - okugeza Kitoro'],'Pay on Delivery - Cash':['Lipa Unapopokea - Pesa Taslimu',''],
 'How do I order?':['Naagizaje?','Nteeka ntya Oda?'],
 'Tap ADD TO ORDER on any product, then open Contacts, enter your name, phone and location, and send. Your order opens in WhatsApp and we confirm with you.':['Bofya ONGEZA KWENYE ODA kwenye bidhaa yoyote, kisha fungua Mawasiliano, weka jina, simu na eneo lako, kisha utume. Oda yako itafunguka WhatsApp na tutakuthibitishia.',''],
 'Can I order more than one item?':['Naweza kuagiza bidhaa zaidi ya moja?','Nsobola okuteeka ebintu ebisukka mu kimu?'],
 'Yes. Add as many items as you like. They go in one order with one total.':['Ndiyo. Ongeza bidhaa nyingi upendavyo. Zote zitakuwa oda moja yenye jumla moja.',''],
 'How do I pay?':['Nalipaje?','Nsasula ntya?'],
 'MTN MoMo, Airtel Money or cash on delivery. For MoMo, send the money to the number shown on the Contacts page, then send us the screenshot on WhatsApp.':['MTN MoMo, Airtel Money au pesa taslimu unapopokea. Kwa MoMo, tuma pesa kwenye namba iliyo kwenye ukurasa wa Mawasiliano, kisha utume picha ya skrini WhatsApp.',''],
 'Is the chicken halal?':['Je, kuku ni halal?','Enkoko ya halal?'],
 'Yes. Every bird is slaughtered the halal way with Bismillah and the blood is fully drained. Certificate details are shown on the home page when available.':['Ndiyo. Kila kuku huchinjwa kwa njia ya halal kwa kusema Bismillah na damu hutolewa yote. Maelezo ya cheti huonyeshwa kwenye ukurasa wa nyumbani yakipatikana.',''],
 'How fast is delivery?':['Uwasilishaji ni wa haraka kiasi gani?','Okutuusa kwa mangu kutya?'],
 'Delivery times depend on your area. See the table above. Birds are packed in cooler boxes.':['Muda hutegemea eneo lako. Angalia jedwali hapo juu. Kuku hufungwa kwenye boksi baridi.',''],
 /* used by the code (cart, alerts, open/closed) */
 'Added':['Imeongezwa','Kiyongeddwamu'],'each':['kila moja','buli kimu'],'minimum':['kiwango cha chini','ekitono'],
 'Total':['Jumla','Omugatte'],'(delivery fee extra)':['(ada ya uwasilishaji ni ya ziada)',''],
 'No items yet. Tap ADD TO ORDER on any product, or pick one below.':['Hakuna bidhaa bado. Bofya ONGEZA KWENYE ODA kwenye bidhaa yoyote, au chagua hapa chini.',''],
 'Bulk bonus ({p}% off for {n}+ birds)':['Punguzo la jumla ({p}% kwa kuku {n}+)',''],
 'Add {n} more bird(s) to get {p}% off. Great for restaurants and hotels.':['Ongeza kuku {n} zaidi upate punguzo la {p}%. Nzuri kwa migahawa na hoteli.',''],
 'Your order is empty. Add at least one item.':['Oda yako ni tupu. Ongeza angalau bidhaa moja.',''],
 'Please add your phone number':['Tafadhali weka namba yako ya simu',"Nsaba oteekemu ennamba yo ey'essimu"],
 'Please add your location - e.g Kitoro':['Tafadhali weka eneo lako - mfano Kitoro','Nsaba oteekemu ekifo kyo - okugeza Kitoro'],
 'Open now':['Wazi sasa','Kuggule kaakano'],'closes':['inafungwa','kuggalwa'],'Closed':['Imefungwa','Kuggaddwawo'],
 'opens':['inafunguliwa','kuggulwa'],'today':['leo','leero'],'tomorrow':['kesho','enkya']
};
let LANG='en';
const LI={sw:0,lg:1};
function T(s,vars){let o=s;const e=DICT[s];if(e&&LANG!=='en'&&e[LI[LANG]])o=e[LI[LANG]];if(vars)for(const k in vars)o=o.replace('{'+k+'}',vars[k]);return o}
const _orig=new WeakMap();
function applyLang(){
  const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
  while(n=w.nextNode()){
    if(/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName))continue;
    if(!_orig.has(n))_orig.set(n,n.nodeValue);
    const o=_orig.get(n),k=o.trim();if(!k)continue;
    const e=LANG!=='en'&&DICT[k],x=e&&e[LI[LANG]],nv=x?o.replace(k,x):o;
    if(n.nodeValue!==nv)n.nodeValue=nv;
  }
  document.querySelectorAll('[placeholder]').forEach(el=>{
    if(!el.dataset.enph)el.dataset.enph=el.placeholder;
    const e=LANG!=='en'&&DICT[el.dataset.enph];el.placeholder=(e&&e[LI[LANG]])||el.dataset.enph;
  });
}
function setLang(l){
  LANG=l;try{localStorage.setItem('lang',l)}catch(e){}
  document.documentElement.lang=l;
  if(typeof renderCart==='function'){renderCart();updateOpen()}
  applyLang();
}
function initLang(){
  let l='en';try{l=localStorage.getItem('lang')||'en'}catch(e){}
  document.getElementById('lang').value=l;setLang(l);
  let q=false;new MutationObserver(()=>{if(q||LANG==='en')return;q=true;requestAnimationFrame(()=>{q=false;applyLang()})}).observe(document.body,{childList:true,subtree:true});
}
