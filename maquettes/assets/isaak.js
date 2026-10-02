/* Isaak — shared components for the three landing pages.
   Each component starts only if its element is on the page. The sector switcher drives every component. */
(function(){
  "use strict";
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NS="http://www.w3.org/2000/svg";
  function el(t,a,p){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);p.appendChild(e);return e}
  function fr(n,d){return n.toFixed(d==null?1:d).replace(".",",")}
  function $(id){return document.getElementById(id)}
  function get(o,path){return path.split(".").reduce(function(v,k){return v==null?v:v[k]},o)}
  /* colors come from the stylesheet tokens */
  var cs=getComputedStyle(document.documentElement);
  function tok(n,fb){var v=cs.getPropertyValue(n).trim();return v||fb}
  var C={accent:tok("--accent","#2645F2"),ok:tok("--ok","#0E9F57"),warn:tok("--warn","#C77600"),fg:tok("--fg","#0B1226"),muted:tok("--muted","#566079"),dim:tok("--dim","#8E97AB"),panel:tok("--panel","#FFFFFF"),
    p1:tok("--plate-1","#FFFFFF"),p2:tok("--plate-2","#EEF1FE"),p3:tok("--plate-3","#F7F8FA"),pl:tok("--plate-l","#E2E7EF"),pr:tok("--plate-r","#D3DAE5"),ps:tok("--plate-stroke","#BFC8D7"),pg:tok("--plate-grid","#E6EAF0")};

  /* ---------- sector data (illustrative examples) ---------- */
  var S={
    regie:{tab:"Gérance & PPE",name:"gérance",layer:"GÉRANCE",
      traj:{mult:2.0,unit:"porté par les objets gérés",role:"assistant·es de gérance, comptables",hires:[4,9,13,18,23,27,31]},
      firm:"Une régie de 30 collaborateurs",
      fns:[["Secrétariat et téléphone",2.5,1.0],["Factures fournisseurs et comptabilité des immeubles",3.0,1.4],["Location et dossiers de candidature",2.0,1.2],["Loyers, contentieux et relances",1.5,0.6],["RH administratif",1.0,0.8]],
      head:{type:"margin",ca:5.0,m0:.10},cost:.10,
      capture:"Honoraires en pourcentage de l'état locatif : chaque heure gagnée devient de la marge.",
      hyp:"Chiffre d'affaires CHF 5 M, 30 collaborateurs dont 10 ETP administratifs, marge EBITDA de départ 10 % (ordre de grandeur indicatif du secteur), coût annuel d'Isaak CHF 100'000.",
      takeover:"Vos mandats de gérance et d'administration PPE, vos équipes et vos relations avec les propriétaires.",
      rules:"Droit du bail, délais de résiliation, clés de répartition des charges, formules officielles cantonales : Isaak applique les règles de la gérance et s'intègre à votre logiciel de gérance.",
      feed:[["Appel","Fuite cuisine, locataire Dubois","ordre de travail envoyé au sanitaire",0],["Facture","Électricité des communs CHF 1'284.60","Av. de Cour 12 · compte 4210 · confiance 98 %",0],["E-mail","Résiliation, appartement 3.2","délai vérifié, annonce rédigée",1],["Dossier","Candidature, 3.5 pièces à Prilly","note 8/10, poursuites vérifiées",0],["Relance","Loyer de septembre impayé","mise en demeure préparée",1],["E-mail","Question sur le décompte de charges","réponse rédigée",0],["Facture","Fournisseur inconnu CHF 2'860.00","contrôle humain requis",1],["PPE","Assemblée générale du 12","procès-verbal rédigé depuis l'enregistrement",1]],
      conf:[["Facture d'électricité des communs",98],["Résiliation, appartement 3.2",96],["Demande d'intervention, cuisine",94],["Facture d'entretien de l'ascenseur",97],["Candidature, 3.5 pièces",93],["Question sur le décompte de charges",91],["Facture d'un fournisseur inconnu",62],["Mise en demeure pour loyer impayé",84]]},
    courtier:{tab:"Courtage",name:"courtage",layer:"COURTAGE",
      traj:{mult:1.8,unit:"porté par les contrats en portefeuille",role:"gestionnaires de sinistres et d'offres",hires:[5,11,16,22,28]},
      firm:"Un cabinet de courtage de 15 collaborateurs",
      fns:[["Secrétariat et téléphone",1.0,0.4],["Renouvellements et comparatifs d'offres",2.0,0.9],["Sinistres",1.5,0.8],["Décomptes de commissions et comptabilité",1.0,0.4],["Conformité LSA et procès-verbaux de conseil",1.5,0.7]],
      head:{type:"margin",ca:2.7,m0:.07},cost:.08,
      capture:"Rémunération à la commission : chaque heure gagnée devient de la marge.",
      hyp:"Chiffre d'affaires CHF 2,7 M de commissions, 15 collaborateurs dont 7 ETP de back-office, marge EBITDA de départ 7 % (ordre de grandeur indicatif du secteur), coût annuel d'Isaak CHF 80'000.",
      takeover:"Votre portefeuille de clients et de polices, vos équipes et vos relations avec les assureurs.",
      rules:"LSA, accord de branche, procès-verbaux de conseil, décomptes de courtage : Isaak applique les règles du courtage et s'intègre à votre logiciel de courtage.",
      feed:[["E-mail","Police RC entreprise échue dans 120 jours","questionnaire de renouvellement envoyé",0],["Offres","5 offres d'assureurs reçues","comparatif généré",1],["Appel","Sinistre dégât des eaux, client PME","dossier ouvert, pièces demandées",0],["Décompte","Commissions du 3e trimestre","rapproché, 2 écarts signalés",1],["LSA","Entretien de conseil","procès-verbal rédigé et archivé",0],["E-mail","Avenant de police reçu en PDF","portefeuille mis à jour",0],["Relance","Assureur sans réponse depuis 10 jours","relance envoyée",0],["Analyse","Portefeuille d'une PME","2 lacunes, 1 doublon détectés",1]],
      conf:[["Avenant de police reçu en PDF",97],["Décompte de commissions du trimestre",93],["Déclaration de sinistre",91],["Offre d'assureur à comparer",95],["Procès-verbal de conseil LSA",92],["Résiliation de police d'un client",84],["Facture d'honoraires",98],["Sinistre sans police identifiée",58]]},
    notaire:{tab:"Notariat",name:"notariat",layer:"NOTARIAT",
      traj:{mult:1.6,unit:"porté par le nombre d'actes",role:"clercs, secrétaires",hires:[6,13,20,28]},
      firm:"Une étude de notaires de 15 collaborateurs",
      fns:[["Accueil, téléphone et rendez-vous",1.5,0.6],["Collecte des pièces et projets d'actes",4.0,2.4],["Réquisitions et formalités",2.0,0.9],["Émoluments, droits et comptabilité",1.5,0.7],["Contrôles LBA",1.0,0.5]],
      head:{type:"perAct"},cost:.08,
      capture:"Émolument fixé par l'acte, pas par le temps passé : chaque heure de préparation gagnée devient de la marge.",
      hyp:"Deux notaires et 13 collaborateurs, dont 10 ETP de préparation et d'administration, volume d'actes constant, coût annuel d'Isaak CHF 80'000.",
      takeover:"",
      rules:"Tarifs cantonaux des émoluments, réquisitions au registre foncier, obligations LBA : Isaak applique les règles du notariat, sous votre secret professionnel.",
      feed:[["E-mail","Pièces reçues, vente PPE à Pully","liste de contrôle complète",0],["Acte","Projet d'acte de vente","prêt à relire",1],["LBA","Ayant droit économique identifié","dossier archivé",0],["Appel","Demande d'estimation de frais","émolument calculé selon le tarif",0],["RF","Réquisition au registre foncier","préparée",1],["Relance","Extrait du registre foncier manquant","relance client envoyée",0],["Succession","Relevés bancaires reçus","inventaire pré-rempli",1],["E-mail","Demande de rendez-vous","créneau proposé",0]],
      conf:[["Pièces d'une vente PPE",95],["Extrait du registre foncier",99],["Réquisition au registre foncier",90],["Calcul de l'émolument",97],["Identification de l'ayant droit (LBA)",91],["Projet d'acte de succession",72],["Demande de rendez-vous",99],["Pièce d'identité illisible",54]]},
    gfi:{tab:"Gestion de fortune",name:"gestion de fortune",layer:"GESTION DE FORTUNE",
      traj:{mult:1.7,unit:"porté par les actifs sous gestion",role:"back-office, conformité",hires:[7,15,24,31]},
      firm:"Un gérant de fortune indépendant de 12 collaborateurs",
      fns:[["Ouvertures de compte et KYC",1.5,0.6],["Reporting multi-banques",2.0,0.6],["Contrôles LSFin et conformité",1.5,0.8],["Préparation de l'audit",0.5,0.2],["Secrétariat et correspondance",1.0,0.5]],
      head:{type:"compliance",idx:[0,1,2,3]},cost:.08,
      capture:"Rémunération sur les actifs gérés : la conformité coûte moins, la marge se reconstitue.",
      hyp:"12 collaborateurs dont 6,5 ETP de back-office et de conformité, coût annuel d'Isaak CHF 80'000.",
      takeover:"Votre clientèle, vos équipes et vos relations bancaires, sous réserve des autorisations de la FINMA.",
      rules:"LSFin, LBA, exigences de votre organisme de surveillance : Isaak applique les règles de la gestion de fortune et tient vos pièces d'audit à jour.",
      feed:[["Relevés","Relevés de 4 banques reçus","reporting consolidé mis à jour",0],["KYC","Ouverture de compte","dossier complet",1],["LSFin","Contrôle d'adéquation","1 écart signalé",1],["E-mail","Question client sur la performance","réponse rédigée",1],["Audit","Audit annuel","38 pièces rassemblées",0],["Appel","Changement d'adresse client","dossier mis à jour",0],["Reporting","Rapports mensuels de 120 clients","générés",0],["Sanctions","Listes de sanctions mises à jour","portefeuille contrôlé",0]],
      conf:[["Relevé de la banque A",99],["Relevé de la banque B",97],["Dossier KYC d'ouverture",92],["Contrôle d'adéquation LSFin",91],["Question d'un client sur la performance",76],["Mise à jour des listes de sanctions",98],["Pièce pour l'audit annuel",95],["Transaction inhabituelle",61]]},
    fidu:{tab:"Fiduciaire",name:"fiduciaire",layer:"FIDUCIAIRE",
      traj:{mult:1.8,unit:"porté par le nombre de mandats",role:"comptables, gestionnaires de salaires",hires:[4,9,14,19,25,30]},
      firm:"Une fiduciaire de 12 collaborateurs",
      fns:[["Saisie comptable et rapprochements",4.0,2.0],["Salaires",1.5,0.8],["TVA et bouclements",2.0,1.4],["Déclarations d'impôt",1.5,1.0],["Secrétariat et relation client",1.0,0.6]],
      head:{type:"capacity"},cost:.08,
      capture:"Facturation à l'heure : le gain se capte en absorbant plus de mandats, ou en passant au forfait.",
      hyp:"12 collaborateurs dont 10 ETP de production, coût annuel d'Isaak CHF 80'000 ; le gain net est calculé à volume de mandats constant.",
      takeover:"Vos mandats, vos équipes et la confiance de vos clients.",
      rules:"TVA, impôt à la source, LPP, transmission Swissdec : Isaak applique les règles fiduciaires et s'intègre à votre logiciel comptable.",
      feed:[["QR-facture","Pièce d'un client","écriture proposée · confiance 98 %",0],["E-mail","Variables de salaire d'octobre","impôt à la source contrôlé",0],["Banque","Relevé bancaire","42 rapprochements automatiques",0],["Relance","Pièces manquantes pour la TVA","relance client préparée",1],["Impôts","Déclaration d'un particulier","pré-remplie",1],["Appel","« Où en est mon bouclement ? »","statut communiqué",0],["Pièce","Ticket de caisse illisible","mis de côté pour contrôle",1],["E-mail","Nouveau mandat","dossier client créé",0]],
      conf:[["QR-facture d'un client",98],["Relevé bancaire",97],["Variables de salaire",93],["Ticket de caisse froissé",71],["Facture d'un fournisseur étranger",91],["Décompte TVA du trimestre",94],["Déclaration d'impôt d'un particulier",92],["Pièce illisible",48]]}
  };
  var keys=(document.body.getAttribute("data-sectors")||"regie,courtier,notaire,gfi,fidu").split(",");
  var cur=keys[0], hooks=[], reveal={};

  /* ---------- trajectory ---------- */
  var svg=$("traj");
  if(svg){
    var T=36,X0=56,X1=944,BASE=366,YC=346,cfg=S[cur].traj;
    var x=function(t){return X0+(t/T)*(X1-X0)};
    var kk=0.085,E=Math.exp(kk*T)-1;
    var f=function(t){return (Math.exp(kk*t)-1)/E};
    var yRev=function(t){return 296-f(t)*246*Math.min(1,cfg.mult-1)};
    var stepH=function(){return Math.min(19,140/cfg.hires.length)};
    el("line",{x1:X0,y1:BASE,x2:X1,y2:BASE,stroke:C.ps},svg);
    for(var m=0;m<=36;m+=6){el("line",{x1:x(m),y1:BASE,x2:x(m),y2:BASE+6,stroke:C.ps},svg);var tx=el("text",{x:x(m),y:BASE+26,"text-anchor":"middle",fill:C.dim,"font-family":"IBM Plex Mono, monospace","font-size":12},svg);tx.textContent="M"+m}
    var defs=el("defs",{},svg),ga=el("linearGradient",{id:"area",x1:"0",x2:"0",y1:"0",y2:"1"},defs);
    el("stop",{offset:"0","stop-color":C.accent,"stop-opacity":".16"},ga);el("stop",{offset:"1","stop-color":C.accent,"stop-opacity":"0"},ga);
    var area=el("path",{fill:"url(#area)"},svg);
    var cls=el("path",{fill:"none",stroke:C.dim,"stroke-width":2,"stroke-dasharray":"6 6"},svg);
    var isa=el("path",{fill:"none",stroke:C.ok,"stroke-width":2.5},svg);
    var rev=el("path",{fill:"none",stroke:C.accent,"stroke-width":2.5,"stroke-linecap":"round"},svg);
    var marks=el("g",{},svg);
    var gap=el("g",{opacity:0},svg),gl=el("line",{stroke:C.muted,"stroke-width":1},gap),gt=el("text",{fill:C.fg,"font-family":"IBM Plex Mono, monospace","font-size":12,"text-anchor":"end"},gap);gt.textContent="COÛTS FIXES ÉVITÉS";
    var halo=el("circle",{r:13,fill:C.accent,"class":"halo"},svg),dot=el("circle",{r:5,fill:C.accent,stroke:C.panel,"stroke-width":2},svg);
    var draw=function(t){
      var d="M"+x(0)+","+yRev(0),a="M"+x(0)+","+BASE+" L"+x(0)+","+yRev(0);
      for(var s=.25;s<=t+1e-6;s+=.25){var p=x(s).toFixed(1)+","+yRev(s).toFixed(1);d+=" L"+p;a+=" L"+p}
      rev.setAttribute("d",d);area.setAttribute("d",a+" L"+x(t).toFixed(1)+","+BASE+" Z");
      var h=stepH(),y=YC,c="M"+x(0)+","+YC,n=0;
      while(marks.firstChild)marks.removeChild(marks.firstChild);
      cfg.hires.forEach(function(hh){if(hh<=t){n++;c+=" H"+x(hh).toFixed(1);y-=h;c+=" V"+y;var tt=el("text",{x:x(hh)+5,y:y-7,fill:C.muted,"font-family":"IBM Plex Mono, monospace","font-size":11},marks);tt.textContent="+1"}});
      cls.setAttribute("d",c+" H"+x(t).toFixed(1));
      var i="M"+x(0)+","+YC+" H"+x(Math.min(t,1.5)).toFixed(1);if(t>=1.5)i+=" V"+(YC-10)+" H"+x(t).toFixed(1);isa.setAttribute("d",i);
      dot.setAttribute("cx",x(t));dot.setAttribute("cy",yRev(t));halo.setAttribute("cx",x(t));halo.setAttribute("cy",yRev(t));
      var show=t>33;gap.setAttribute("opacity",show?1:0);
      if(show){var top=YC-h*cfg.hires.length,bot=YC-10,gx=x(T)-4;gl.setAttribute("x1",gx);gl.setAttribute("x2",gx);gl.setAttribute("y1",top);gl.setAttribute("y2",bot);gt.setAttribute("x",gx-8);gt.setAttribute("y",(top+bot)/2+4)}
      $("tm").textContent=String(Math.round(t)).padStart(2,"0");
      $("mult").textContent=fr(1+(cfg.mult-1)*f(t));$("hc").textContent=n;$("hi").textContent="0";
    };
    var rafT=null;
    var playT=function(){cancelAnimationFrame(rafT);if(reduce){draw(T);return}var st=null,D=5200;function step(ts){if(!st)st=ts;var p=Math.min(1,(ts-st)/D),e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;draw(e*T);if(p<1)rafT=requestAnimationFrame(step)}rafT=requestAnimationFrame(step)};
    if($("replay-t"))$("replay-t").addEventListener("click",playT);
    hooks.push(function(anim){cfg=S[cur].traj;if(anim)playT();else draw(T)});
    reveal.traj=playT;
  }

  /* ---------- animated layers ---------- */
  var st=$("stack");
  if(st){
    var CX=420,A=210,B=121,D=12,Y=[150,290,430];
    var P=function(cy,u,v){return [CX+(u-v)*A,cy-B+(u+v)*B]};
    var pts=function(a){return a.map(function(p){return p[0].toFixed(1)+","+p[1].toFixed(1)}).join(" ")};
    var poly=function(cy,uv){return pts(uv.map(function(q){return P(cy,q[0],q[1])}))};
    var plate=function(parent,cy,fill){
      el("polygon",{points:pts([[CX-A,cy],[CX,cy+B],[CX,cy+B+D],[CX-A,cy+D]]),fill:C.pl,stroke:C.ps},parent);
      el("polygon",{points:pts([[CX,cy+B],[CX+A,cy],[CX+A,cy+D],[CX,cy+B+D]]),fill:C.pr,stroke:C.ps},parent);
      el("polygon",{points:poly(cy,[[0,0],[1,0],[1,1],[0,1]]),fill:fill,stroke:C.ps},parent);
    };
    var box=function(g,cy,u,v,s,h){
      var t=[[u,v],[u+s,v],[u+s,v+s],[u,v+s]].map(function(q){var p=P(cy,q[0],q[1]);return [p[0],p[1]-h]});
      var b=[[u+s,v],[u+s,v+s],[u,v+s]].map(function(q){return P(cy,q[0],q[1])});
      el("polygon",{points:pts([t[3],t[2],b[1],b[2]]),fill:C.pl,stroke:C.ps},g);
      el("polygon",{points:pts([t[2],t[1],b[0],b[1]]),fill:C.pr,stroke:C.ps},g);
      el("polygon",{points:pts(t),fill:C.panel,stroke:C.ps},g);
    };
    [[CX-A,0],[CX+A,0],[CX,B]].forEach(function(o){el("line",{x1:o[0],y1:Y[0]+o[1]+D,x2:o[0],y2:Y[2]+o[1],stroke:C.ps,"stroke-dasharray":"3 5"},st)});
    var o3=el("g",{},st),g3=el("g",{"class":"float f3"},o3);plate(g3,Y[2],C.p3);
    for(var i=1;i<10;i++){el("polyline",{points:poly(Y[2],[[i/10,0],[i/10,1]]),stroke:C.pg,fill:"none"},g3);el("polyline",{points:poly(Y[2],[[0,i/10],[1,i/10]]),stroke:C.pg,fill:"none"},g3)}
    el("polygon",{points:poly(Y[2],[[.4,.4],[.6,.4],[.6,.6],[.4,.6]]),fill:C.accent},g3);
    el("polygon",{points:poly(Y[2],[[.44,.48],[.56,.48],[.56,.52],[.44,.52]]),fill:C.panel},g3);
    el("polygon",{points:poly(Y[2],[[.48,.44],[.52,.44],[.52,.56],[.48,.56]]),fill:C.panel},g3);
    var o2=el("g",{},st),g2=el("g",{"class":"float f2"},o2);plate(g2,Y[1],C.p2);
    var nodes=[[.2,.2],[.5,.15],[.8,.25],[.25,.55],[.55,.5],[.85,.6],[.2,.85],[.5,.82],[.78,.85]];
    var links=[[0,1],[1,2],[0,3],[1,4],[2,5],[3,4],[4,5],[3,6],[4,7],[5,8],[6,7],[7,8]];
    links.forEach(function(l,j){var a=P(Y[1],nodes[l[0]][0],nodes[l[0]][1]),b=P(Y[1],nodes[l[1]][0],nodes[l[1]][1]);
      el("line",{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:C.accent,"stroke-opacity":.22,"stroke-width":1.2},g2);
      var lk=el("line",{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:C.accent,"stroke-width":1.6,"class":"lk"},g2);lk.style.animationDelay=(-j*.27)+"s"});
    var nodeEls=nodes.map(function(n,j){var p=P(Y[1],n[0],n[1]);return el("circle",{cx:p[0],cy:p[1],r:j===4?6:3.6,fill:C.accent},g2)});
    var o1=el("g",{},st),g1=el("g",{"class":"float"},o1);plate(g1,Y[0],C.p1);
    box(g1,Y[0],.18,.2,.18,46);box(g1,Y[0],.5,.16,.22,30);box(g1,Y[0],.3,.56,.16,22);box(g1,Y[0],.62,.55,.2,58);
    var pk=el("g",{},st);
    var labels=[st.getAttribute("data-l1")||"1 · VOTRE MÉTIER · {layer}",st.getAttribute("data-l2")||"2 · ISAAK · AUTOMATISATIONS",st.getAttribute("data-l3")||"3 · VOS DONNÉES · EN SUISSE"];
    var lblEls=Y.map(function(y,j){el("line",{x1:8,y1:y+30,x2:CX-A-14,y2:y+30,stroke:C.ps,"class":"lead-ln"},st);return el("text",{x:8,y:y+20,"class":"lbl"+(j===1?" b":"")},st)});
    hooks.push(function(){lblEls.forEach(function(t,j){t.textContent=labels[j].replace("{layer}",S[cur].layer)})});
    reveal.stack=function(){if(reduce)return;var s0=null;function sp(ts){if(!s0)s0=ts;var p=Math.min(1,(ts-s0)/1400),e=1-Math.pow(1-p,3),dd=110*(1-e);o1.setAttribute("transform","translate(0,"+dd.toFixed(1)+")");o3.setAttribute("transform","translate(0,"+(-dd).toFixed(1)+")");pk.setAttribute("opacity",e.toFixed(2));if(p<1)requestAnimationFrame(sp)}requestAnimationFrame(sp)};
    var packets=[];
    for(var q=0;q<5;q++){var g=el("g",{opacity:0},pk);packets.push({g:g,tr:el("line",{"stroke-width":2,"stroke-linecap":"round"},g),c:el("circle",{r:3.6},g),t0:-q*900,node:q%nodes.length})}
    var DUR=3200,lastHit={};
    var loop=function(ts){
      packets.forEach(function(p){
        var tt=(ts-p.t0)%(DUR*1.4);if(tt<0)tt+=DUR*1.4;
        if(tt<20)p.node=Math.floor(Math.random()*nodes.length);
        var pr=tt/DUR;if(pr>1){p.g.setAttribute("opacity",0);return}
        var n=nodes[p.node],top=P(Y[0],n[0],n[1]),bot=P(Y[2],n[0],n[1]),y=top[1]+(bot[1]-top[1])*pr,col=pr<.5?C.accent:C.ok;
        p.c.setAttribute("cx",top[0]);p.c.setAttribute("cy",y);p.c.setAttribute("fill",col);
        p.tr.setAttribute("x1",top[0]);p.tr.setAttribute("x2",top[0]);p.tr.setAttribute("y1",y-18);p.tr.setAttribute("y2",y);p.tr.setAttribute("stroke",col);p.tr.setAttribute("stroke-opacity",.35);
        p.g.setAttribute("opacity",(pr<.08?pr/.08:pr>.9?(1-pr)/.1:1).toFixed(2));
        if(pr>.48&&pr<.52){var ne=nodeEls[p.node];ne.setAttribute("r",9);ne.setAttribute("fill",C.ok);lastHit[p.node]=ts}
      });
      nodeEls.forEach(function(ne,j){if(lastHit[j]&&ts-lastHit[j]>380){ne.setAttribute("r",j===4?6:3.6);ne.setAttribute("fill",C.accent);lastHit[j]=0}});
      requestAnimationFrame(loop);
    };
    if(!reduce)requestAnimationFrame(loop);
  }

  /* ---------- operations console ---------- */
  var feed=$("feed");
  if(feed){
    var fi=0,clock=[9,12];
    var evHTML=function(e,hh,mm){return '<time>'+String(hh).padStart(2,"0")+':'+String(mm).padStart(2,"0")+'</time><span class="tag">'+e[0]+'</span><p>'+e[1]+' <em>→ '+e[2]+'</em></p><span class="st'+(e[3]?' wait':'')+'">'+(e[3]?'À valider':'Traité')+'</span>'};
    hooks.push(function(){var F=S[cur].feed;feed.innerHTML="";clock=[9,12];for(var j=0;j<6;j++){var li=document.createElement("li");li.className="ev";li.innerHTML=evHTML(F[j],9,12-j*2);feed.appendChild(li)}fi=6});
    if(!reduce)setInterval(function(){var F=S[cur].feed,e=F[fi%F.length];fi++;clock[1]+=1+Math.floor(Math.random()*2);if(clock[1]>59){clock[1]-=60;clock[0]++}
      var li=document.createElement("li");li.className="ev enter";li.innerHTML=evHTML(e,clock[0],clock[1]);feed.insertBefore(li,feed.firstChild);while(feed.children.length>6)feed.removeChild(feed.lastChild)},2400);
  }

  /* ---------- before / after ledger ---------- */
  var fns=$("fns");
  if(fns){
    var rows=[];
    var sum=function(a,ix){return a.reduce(function(s,r){return s+r[ix]},0)};
    var headline=function(sec,p){
      var b=sum(sec.fns,1),a=sum(sec.fns,2),now=b+(a-b)*p,h=sec.head;
      if(h.type==="margin"){var e0=h.ca*h.m0,e=e0+((b-now)*0.1-sec.cost*p);return {label:"Marge EBITDA",was:Math.round(h.m0*100)+" %",now:Math.round(e/h.ca*100)+" %"}}
      if(h.type==="perAct"){var c=(now*0.1+sec.cost*p)/(b*0.1);return {label:"Coût administratif par acte",was:"base 100",now:"−"+Math.round((1-c)*100)+" %"}}
      if(h.type==="compliance"){var cb=0,ca=0;h.idx.forEach(function(j){cb+=sec.fns[j][1];ca+=sec.fns[j][1]+(sec.fns[j][2]-sec.fns[j][1])*p});return {label:"Temps de conformité et de reporting",was:fr(cb)+" ETP",now:"−"+Math.round((1-ca/cb)*100)+" %"}}
      return {label:"Capacité de production, même équipe",was:"×1,0",now:"×"+fr(b/now)};
    };
    var setL=function(p){
      var sec=S[cur];
      rows.forEach(function(o){var v=o.r[1]+(o.r[2]-o.r[1])*p;o.after.style.width=(v/o.MAX*100)+"%";o.num.textContent=fr(v)});
      var b=sum(sec.fns,1),a=sum(sec.fns,2),now=b+(a-b)*p;
      $("e-now").textContent=fr(now);$("g-now").textContent=fr(Math.max(0,(b-now)*0.1-sec.cost*p),2);$("h-now").textContent=headline(sec,p).now;
    };
    var playL=function(){if(reduce){setL(1);return}var s0=null;function stp(ts){if(!s0)s0=ts;var p=Math.min(1,(ts-s0)/2400),e=1-Math.pow(1-p,3);setL(e);if(p<1)requestAnimationFrame(stp)}setL(0);requestAnimationFrame(stp)};
    hooks.push(function(anim){
      var sec=S[cur],MAX=Math.max.apply(null,sec.fns.map(function(r){return r[1]}));
      fns.innerHTML="";
      rows=sec.fns.map(function(r){var d=document.createElement("div");d.className="fn";
        d.innerHTML='<div class="name">'+r[0]+'</div><div class="nums">'+fr(r[1])+' → <b>'+fr(r[2])+'</b> ETP</div><div class="track"><div class="before" style="width:'+(r[1]/MAX*100)+'%"></div><div class="after" style="width:'+(r[2]/MAX*100)+'%"></div></div><div class="cut">−'+Math.round((1-r[2]/r[1])*100)+' %</div>';
        fns.appendChild(d);return {r:r,after:d.querySelector(".after"),num:d.querySelector("b"),MAX:MAX}});
      $("e-was").textContent=fr(sum(sec.fns,1))+" ETP";$("g-cost").textContent="CHF "+fr(sec.cost,2)+" M";
      $("g-label").textContent=sec.head.type==="capacity"?"Gain net par an à volume constant":"Gain net par an, Isaak déduit";
      var h=headline(sec,1);$("h-label").textContent=h.label;$("h-was").textContent=h.was;
      if(anim)playL();else setL(1);
    });
    if($("replay-l"))$("replay-l").addEventListener("click",playL);
    reveal.fns=playL;
  }

  /* ---------- confidence gate ---------- */
  var glist=$("g-list");
  if(glist){
    var thr=90;
    var pos=function(v){return Math.max(0,Math.min(100,(v-40)/60*100))};
    var updGate=function(){
      var a=0,h=0;
      [].forEach.call(glist.children,function(li){var au=li._it[1]>=thr;if(au)a++;else h++;
        li.querySelector(".fl").style.background=au?C.ok:C.warn;li.querySelector(".th").style.left=pos(thr)+"%";
        var p=li.querySelector(".pill");p.className="pill "+(au?"au":"hu");p.textContent=au?"Exécuté":"À valider"});
      $("n-auto").textContent=a;$("n-hum").textContent=h;$("p-auto").textContent=Math.round(a/(a+h)*100)+" %";$("thr-v").textContent=thr+" %";
    };
    hooks.push(function(){glist.innerHTML="";S[cur].conf.forEach(function(it){var li=document.createElement("li");li.className="gr";li._it=it;
      li.innerHTML='<span class="nm">'+it[0]+'</span><span class="cb"><span class="fl" style="width:'+pos(it[1])+'%"></span><span class="th"></span></span><span class="pc">'+it[1]+' %</span><span class="pill"></span>';glist.appendChild(li)});updGate()});
    $("thr").addEventListener("input",function(e){thr=+e.target.value;updGate()});
    if(!reduce)setInterval(function(){var last=glist.lastElementChild;if(!last)return;glist.removeChild(last);last.classList.remove("enter");void last.offsetWidth;last.classList.add("enter");glist.insertBefore(last,glist.firstChild)},2900);
  }

  /* ---------- text bindings ---------- */
  hooks.push(function(){
    [].forEach.call(document.querySelectorAll("[data-field]"),function(n){var v=get(S[cur],n.getAttribute("data-field"));if(v!=null)n.textContent=v});
    [].forEach.call(document.querySelectorAll("[data-list]"),function(n){var arr=get(S[cur],n.getAttribute("data-list"))||[];n.innerHTML="";arr.forEach(function(r){var li=document.createElement("li");li.textContent=r[0];n.appendChild(li)})});
    [].forEach.call(document.querySelectorAll("[data-off-for]"),function(n){n.classList.toggle("off",n.getAttribute("data-off-for").split(",").indexOf(cur)>-1)});
    [].forEach.call(document.querySelectorAll("[data-show-for]"),function(n){n.hidden=n.getAttribute("data-show-for").split(",").indexOf(cur)<0});
  });

  /* ---------- sector switcher ---------- */
  var tabsEl=$("tabs"),tabs=[];
  function select(k,anim){
    cur=k;
    tabs.forEach(function(t){var on=t.getAttribute("data-k")===k;t.setAttribute("aria-selected",on);t.tabIndex=on?0:-1});
    hooks.forEach(function(h){h(anim)});
  }
  if(tabsEl){
    keys.forEach(function(k,j){
      var b=document.createElement("button");b.className="tab";b.type="button";b.setAttribute("role","tab");b.setAttribute("data-k",k);b.id="tab-"+k;b.textContent=S[k].tab;
      b.addEventListener("click",function(){select(k,true)});
      b.addEventListener("keydown",function(e){var n=e.key==="ArrowRight"?1:e.key==="ArrowLeft"?-1:0;if(!n)return;e.preventDefault();var nt=tabs[(j+n+tabs.length)%tabs.length];nt.focus();select(nt.getAttribute("data-k"),true)});
      tabsEl.appendChild(b);tabs.push(b);
    });
  }
  select(cur,false);

  if("IntersectionObserver" in window){
    var seen={};
    var io=new IntersectionObserver(function(es){es.forEach(function(e){var id=e.target.id;if(!e.isIntersecting||seen[id])return;seen[id]=1;if(reveal[id])reveal[id]()})},{threshold:.3});
    Object.keys(reveal).forEach(function(id){io.observe($(id))});
  }
})();
