/* ========= EDIT HERE: the only place to change phone numbers, licences and prices ========= */
const CONFIG={
  phoneLocal:'0766791805',      // shown on the site and used for MTN MoMo
  phoneIntl:'256766791805',     // same number, international format for WhatsApp links
  airtelNumber:'',              // optional: Airtel Money number
  // Add these when the owner gives them. Empty = nothing is shown.
  halalCert:'',                 // e.g. Halal Bureau certificate number
  unbsCert:'',                  // e.g. UNBS certification number
  tradingLicense:'',
  pdpoReg:'',                   // Personal Data Protection Office registration number (shown in Privacy)
  // Website and social links. Empty = hidden. Use full links, e.g. https://facebook.com/yourpage
  siteUrl:'',                   // e.g. https://www.yourdomain.com
  facebook:'',
  instagram:'',
  tiktok:'',
  googleBusiness:'',            // your Google Business Profile link
  // Media. Put the files in /videos and /images. Placeholders show until they exist.
  video:'videos/farm.mp4',
  videoPoster:'images/video-poster.jpg',
  galleryCount:6,               // images/gallery-1.jpg ... gallery-6.jpg
  // Opening hours in Uganda time. Day 0 = Sunday ... 6 = Saturday. [open hour, close hour] in 24h. null = closed.
  hours:{0:[7,21],1:[7,21],2:[7,21],3:[7,21],4:[7,21],5:[7,21],6:[7,21]},            // e.g. trading licence number
  // Rating and reviews. IMPORTANT: keep these only if they come from real customers who agreed.
  // To hide them, set rating:'' and reviews:[]
  rating:'4.9',
  reviews:[
    {who:'Fatima - Kitoro',t:'Local chicken 50k worth it! Luwombo tasted like village. Delivery fast. Trusted.'},
    {who:'John - Nkumba',t:'Broiler medium 30k best seller. Soft, clean, packed. Delivered in 1 hour.'},
    {who:'Aisha - Kajjansi',t:'Local eggs tray 22k yolk deep yellow, kids love. Exotic 12k good for chapati.'}
  ]
};

/* ========= PRODUCTS (one source for cards, order form and footer prices) =========
   cat: b=broiler, l=local, i=improved, y=layers. Photo files go in /images/<photo>.jpg */
const GROUPS={
 b:{t:'🐔 Broilers',badge:'POPULAR',bg:'',btn:'btn-order',pc:''},
 l:{t:'🐓 Local Chicken (Kienyeji)',badge:'LOCAL',bg:'#7c2d12',btn:'btn-gold',pc:'local'},
 i:{t:'🐓 Improved Local - Kuroiler & Sasso',badge:'IMPROVED',bg:'#f59e0b',btn:'btn-gold',pc:''},
 y:{t:'🐓 Layers & Bulk',badge:'LAYERS',bg:'#334155',btn:'btn-primary',pc:''}
};
const PRODUCTS=[
 {c:'b',n:'Small Broiler - 4 Weeks - 1.4kg',p:25000,ph:'broiler-small',d:'Soft, 1.4kg, for 2-3 people, cooks in about 25 minutes.'},
 {c:'b',n:'Medium Broiler 1.8kg - Best Seller',p:30000,ph:'broiler-medium',d:'5 weeks, 1.8kg, for a family of 4, soft and juicy.'},
 {c:'b',n:'Big Broiler - Jumbo 2.3kg',p:35000,ph:'broiler-big',d:'6 weeks, 2.3kg jumbo, for restaurants, events and parties.'},
 {c:'b',n:'Extra Jumbo Broiler 2.7kg',p:38000,ph:'broiler-jumbo',d:'7 weeks, 2.7kg, our biggest broiler, for big family gatherings.'},
 {c:'l',n:'Small Local Chicken 1.2kg - 3 Months',p:35000,ph:'local-small',d:'Young local chicken, firm tasty meat, good for soup.'},
 {c:'l',n:'Local Hen (Enkoko) 1.3kg',p:40000,ph:'local-hen',d:'Female local hen, tasty and good for luwombo.'},
 {c:'l',n:'Medium Local 1.8kg - 5 Months - Best for Luwombo',p:50000,ph:'local-medium',d:'Free-range, very tasty, best for traditional luwombo.'},
 {c:'l',n:'Big Local Cock (Jogoo) 2.5kg - 6+ Months',p:65000,ph:'local-jogoo-big',d:'Big jogoo, very sweet, for respected guests.'},
 {c:'l',n:'Giant Local Jogoo 3.2kg - 8 Months',p:75000,ph:'local-jogoo-giant',d:'Our biggest local jogoo, for weddings and introductions.'},
 {c:'i',n:'Kuroiler Chicken 1.5kg - Dual Purpose',p:35000,ph:'kuroiler',d:'Dual purpose (meat and eggs), free-range, reaches about 1.5kg in 3 months.'},
 {c:'i',n:'Sasso Chicken 1.7kg',p:42000,ph:'sasso',d:'Dual purpose, free-range, reaches about 1.7kg in 3 months, tasty.'},
 {c:'i',n:'Big Kuroiler Jogoo 2.4kg - Dual Purpose',p:50000,ph:'kuroiler-jogoo',d:'Big Kuroiler cock, 2.4kg at about 5 months, strong and disease resistant.'},
 {c:'y',n:'Old Layer Chicken 1.5kg - Spent Layer',p:25000,ph:'layer-old',d:'Spent layer, tougher but flavourful, good for stew and cheap protein.'},
 {c:'y',n:'Young Layer 1.6kg - 1 Year',p:28000,ph:'layer-young',d:'About 1 year old, better meat than an old layer.'},
 {c:'y',n:'Bulk Pack - 5 Medium Broilers - Save 10k',p:130000,ph:'bulk-pack',d:'5 medium broilers of 1.8kg each (about 9kg), for restaurants and parties.',bulk:true}
];
const EXTRA=[
 {n:'Exotic Eggs (tray of 30)',p:12000,min:1},{n:'Local Eggs (tray of 30)',p:22000,min:1},
 {n:'Exotic Chicks day-old (each)',p:3500,min:50},{n:'Local Chicks 1 month (each)',p:9000,min:10}
];
const CATALOG=PRODUCTS.map(p=>({n:p.n,p:p.p,min:1})).concat(EXTRA);
const STATIONS=[
 ['Kitoro - HEADQUARTERS','Kitoro+Entebbe+Uganda',16,'Near Kitoro Market, opposite the mosque. Main HQ with easy delivery to all stations.','Kitoro HQ'],
 ['Katabi - Near Airport','Katabi+Entebbe+Uganda',15,'Our first branch (2020). Katabi town, near the health centre.','Katabi'],
 ['Nkumba - Near University','Nkumba+University+Entebbe',15,'Popular with students: medium broilers for hostels.','Nkumba'],
 ['Kitinda - Residential','Kitinda+Entebbe+Uganda',15,'Families order local chicken for weekend luwombo.','Kitinda'],
 ['Kajjansi - Entebbe Road','Kajjansi+Wakiso+Uganda',15,'Halfway to Kampala. Serves Kajjansi, Bwebajja and Seguku.','Kajjansi'],
 ['Zzana - Entebbe Road','Zzana+Entebbe+Road+Uganda',15,'Near Kampala. Serves Zzana, Seguku and Makindye. Bulk pack of 5 broilers available.','Zzana'],
 ['Seguku - Kampala','Seguku+Uganda',15,'Residential delivery. Order on WhatsApp and pay by MoMo.','Seguku'],
 ['Bwebajja - Entebbe Road','Bwebajja+Entebbe+Road+Uganda',15,'Serves Bwebajja town. Customers love our exotic eggs.','Bwebajja'],
 ['Munyonyo & Kampala Hub','Munyonyo+Kampala+Uganda',15,'Hub for Kampala city: Ggaba, Buziga, Makindye. Delivery fee 10-15k.','Munyonyo Kampala']
];


/* ========= BULK BONUS for restaurants, hotels and events =========
   PROPOSED VALUES: the owner decides. Applied automatically to chicken items by number of birds in one order.
   (The ready-made 5-broiler Bulk Pack already has its own saving and is not discounted again.) */
const WHOLESALE=[
 {min:5,pct:7},
 {min:10,pct:10},
 {min:20,pct:12}
];

/* ========= DELIVERY FEES by area. OWNER: please confirm every fee and time. ========= */
const DELIVERY=[
 ['Kitoro, Katabi, Nkumba, Kitinda','UGX 5,000','10-30 mins'],
 ['Kajjansi','UGX 10,000','About 1 hour'],
 ['Zzana','UGX 10,000','About 30 mins'],
 ['Seguku','UGX 10,000','About 35 mins'],
 ['Bwebajja','UGX 10,000','About 40 mins'],
 ['Munyonyo, Ggaba, Buziga, Makindye and Kampala city','UGX 10,000 - 15,000','About 60 mins']
];
const DELIVERY_NOTE='Delivery fee is added to your product total. Chick orders: delivery to Entebbe is free and Kampala is UGX 10,000. Times are estimates.';
