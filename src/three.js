import * as THREE from "three";
THREE.ColorManagement.enabled=false;
function person(o,sit){
 const g=new THREE.Group(),M=c=>new THREE.MeshStandardMaterial({color:c,roughness:.5,metalness:.1});
 const S=(r,c,sx,sy,sz,x,y,z,p)=>{const s=new THREE.Mesh(new THREE.SphereGeometry(r,24,24),M(c));s.scale.set(sx,sy,sz);s.position.set(x,y,z);(p||g).add(s);return s};
 const Y=(r,l,c,x,y,z,rx,p)=>{const s=new THREE.Mesh(new THREE.CylinderGeometry(r,r,l,16),M(c));s.position.set(x,y,z);s.rotation.x=rx;(p||g).add(s);return s};
 S(1,o.cloth,.42,.62,.3,0,1.6,0);
 const head=new THREE.Group();head.position.set(0,2.4,0);g.add(head);
 S(.3,o.skin,1,1.08,1,0,0,0,head);S(.035,"#111",1,1,1,-.1,.03,.28,head);S(.035,"#111",1,1,1,.1,.03,.28,head);
 if(o.girl){S(.33,o.hair,1,1.05,1.05,0,.02,-.07,head);S(.15,o.hair,1,2.2,1,0,-.25,-.35,head)}else S(.31,o.hair,1,.75,1,0,.1,-.04,head);
 const arm=s=>{const p=new THREE.Group();p.position.set(.52*s,1.95,0);g.add(p);
  if(sit){Y(.09,.85,o.cloth,0,0,.42,Math.PI/2,p);S(.1,o.skin,1,1,1,0,0,.85,p)}else{Y(.09,.8,o.cloth,0,-.4,0,0,p);S(.1,o.skin,1,1,1,0,-.82,0,p)}return p};
 const leg=s=>{const p=new THREE.Group();p.position.set(.18*s,1.05,0);g.add(p);
  if(sit){Y(.13,.7,o.pants,0,0,.35,Math.PI/2,p);Y(.11,1,o.pants,0,-.5,.7,0,p);S(.13,"#1a1a24",1,.6,1.6,0,-1,.78,p)}else{Y(.13,1,o.pants,0,-.5,0,0,p);S(.13,"#1a1a24",1,.6,1.6,0,-1.02,.07,p)}return p};
 return{g,head,arms:[arm(-1),arm(1)],legs:[leg(-1),leg(1)]}}

export function office(cv){
 const R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});R.outputColorSpace=THREE.LinearSRGBColorSpace;R.setPixelRatio(Math.min(devicePixelRatio,2));
 const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(45,1,.1,100);
 S.add(new THREE.AmbientLight(0xffffff,.65));const dl=new THREE.DirectionalLight(0xaab4ff,.9);dl.position.set(3,6,6);S.add(dl);
 const M=(c,e)=>new THREE.MeshStandardMaterial({color:c,roughness:.5,metalness:.1,emissive:e||0});
 const add=(geo,mat,x,y,z,p)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);(p||S).add(m);return m};
 const SP=new THREE.SphereGeometry(1,24,24);
 add(new THREE.CylinderGeometry(6.5,6.5,.1,96),M(0x0b1030),0,-.05,0);
 add(new THREE.TorusGeometry(6.5,.04,12,160),new THREE.MeshBasicMaterial({color:0x22d3ee}),0,.02,0).rotation.x=Math.PI/2;
 const desk=p=>{add(new THREE.CylinderGeometry(.9,.9,.08,48),M(0x1b2150),0,1.28,.95,p);add(new THREE.CylinderGeometry(.08,.08,1.25,16),M(0x2a2f6e),0,.62,.95,p);add(new THREE.CylinderGeometry(.45,.45,.05,32),M(0x2a2f6e),0,.03,.95,p);
  add(SP,M(0xaab4ff),0,1.36,.8,p).scale.set(.42,.03,.3);
  const ls=add(SP,M(0xaab4ff),0,1.62,1.02,p);ls.scale.set(.42,.3,.03);ls.rotation.x=.2;
  const sc=add(SP,M(0x22d3ee,0x22d3ee),0,1.62,.99,p);sc.scale.set(.38,.26,.02);sc.rotation.x=.2;
  const pl=new THREE.PointLight(0x22d3ee,.8,4);pl.position.set(0,1.8,.7);p.add(pl);return sc};
 const chair=p=>{add(new THREE.CylinderGeometry(.55,.55,.14,40),M(0x7c5cff),0,.98,-.05,p);add(new THREE.CylinderGeometry(.06,.06,.9,12),M(0x444a80),0,.5,-.05,p);
  add(SP,M(0x7c5cff),0,1.65,-.45,p).scale.set(.5,.55,.08);
  add(new THREE.TorusGeometry(.5,.04,10,40),M(0x444a80),0,.1,-.05,p).rotation.x=Math.PI/2;
  for(let i=0;i<5;i++){const a=i*1.2566;add(new THREE.SphereGeometry(.07,12,12),M(0x111122),Math.cos(a)*.5,.06,-.05+Math.sin(a)*.5,p)}};
 const P=[[{skin:"#f1c9a5",cloth:"#ff7a59",pants:"#2a2f6e",hair:"#2b1b17",girl:1},-2.7,1],[{skin:"#c68e66",cloth:"#22d3ee",pants:"#1b2150",hair:"#120d0b"},2.7,-1]].map(([o,x,d])=>{
  const w=new THREE.Group();w.position.x=x;S.add(w);chair(w);const sc=desk(w);const p=person(o,true);w.add(p.g);return{w,p,sc,d}});
 const orbs=[add(new THREE.SphereGeometry(.5,48,48),new THREE.MeshBasicMaterial({color:0x7c5cff}),0,3.3,0),add(new THREE.SphereGeometry(.8,32,32),new THREE.MeshBasicMaterial({color:0x22d3ee,transparent:true,opacity:.18}),0,3.3,0)];
 const clk=new THREE.Clock();let raf;
 const size=()=>{const w=cv.clientWidth,hh=cv.clientHeight;R.setSize(w,hh,false);C.aspect=w/hh;C.updateProjectionMatrix()};addEventListener("resize",size);size();
 (function tick(){raf=requestAnimationFrame(tick);const t=clk.getElapsedTime();
  P.forEach(({w,p,sc,d},i)=>{w.rotation.y=d*.95+Math.sin(t*.5+i)*.08;p.arms.forEach((a,k)=>a.rotation.x=.8+Math.sin(t*13+k*2.1+i)*.1);p.head.rotation.y=Math.sin(t*.8+i)*.25;p.head.rotation.x=Math.sin(t*1.3+i)*.06;sc.material.emissiveIntensity=.7+Math.sin(t*5+i)*.25});
  orbs.forEach(o=>o.position.y=3.3+Math.sin(t*1.4)*.2);
  C.position.set(Math.sin(t*.25)*1.6,3.4,innerWidth<820?15:10.5);C.lookAt(0,1.7,0);R.render(S,C)})();
 return()=>{cancelAnimationFrame(raf);removeEventListener("resize",size)}}

export function scene(){
  const cv=document.getElementById("gl"),R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});
  R.outputColorSpace=THREE.LinearSRGBColorSpace;R.setPixelRatio(Math.min(devicePixelRatio,2));
  const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(50,1,.1,100);C.position.z=7;
  const G=new THREE.Group();S.add(G);
  S.add(new THREE.AmbientLight(0xffffff,.8));const dl=new THREE.DirectionalLight(0xffffff,.9);dl.position.set(2,5,6);S.add(dl);
  const sk=["#f1c9a5","#c68e66","#8d5a3b","#e0b08a"],W=[0xff7a59,0x22d3ee,0x7c5cff,0xf5d76e,0x4ade80,0xff6bd6,0x60a5fa].map((c,i)=>{
    const p=person({skin:sk[i%4],cloth:c,pants:0x1b2150,hair:"#1a120e",girl:i%2},false),bag=new THREE.Mesh(new THREE.SphereGeometry(1,16,16),new THREE.MeshStandardMaterial({color:0x2a2f6e}));
    bag.scale.set(.1,.24,.3);bag.position.set(.6,1.1,0);p.g.add(bag);p.g.scale.setScalar(.5);
    const g=new THREE.Group(),dir=i%2?1:-1;g.add(p.g);g.rotation.y=dir*Math.PI/2;g.position.set(-14+i*4.2,-4.35,-3-(i%3)*2);S.add(g);return{g,p,v:(.8+(i%3)*.25)*dir,ph:i}});
  const U={t:{value:0},m:{value:0}};
  const orb=new THREE.Mesh(new THREE.SphereGeometry(1.5,128,128),new THREE.ShaderMaterial({uniforms:U,transparent:true,
    vertexShader:`uniform float t,m;varying vec3 vN;varying float vD;varying vec3 vP;
    void main(){vec3 p=position;float w=t*.6;
    float n=sin(p.x*2.1+w)*sin(p.y*2.4-w*1.3)*sin(p.z*1.9+w*.8)+.5*sin(p.x*4.3-w*1.7+p.y*3.1)*cos(p.z*3.7+w*1.1);
    vD=n;vec3 q=p+normal*n*(.16+m*.14);vN=normalize(normalMatrix*normal);vP=q;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(q,1.);}`,
    fragmentShader:`uniform float t;varying vec3 vN;varying float vD;varying vec3 vP;
    void main(){float f=pow(1.-max(dot(vN,vec3(0,0,1)),0.),2.2);
    vec3 a=vec3(.49,.36,1.),b=vec3(.13,.83,.93),c=vec3(1.,.48,.35);
    vec3 col=mix(a,b,.5+.5*sin(vP.y*1.6+vD*2.+t*.5));col=mix(col,c,smoothstep(.5,1.,vD)*.6);
    col=col*(.4+.5*(.5+.5*vD))+f*b*1.2;gl_FragColor=vec4(col,.94);}`}));
  G.add(orb);
  const rings=[[2.3,0x22d3ee,.5],[2.75,0x7c5cff,-.35],[3.2,0xff7a59,.25]].map(([r,c,s],i)=>{
    const g=new THREE.Group(),sp=new THREE.Group();
    g.add(new THREE.Mesh(new THREE.TorusGeometry(r,.007,8,220),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.65})));
    const d=new THREE.Mesh(new THREE.SphereGeometry(.1-i*.015,24,24),new THREE.MeshBasicMaterial({color:c}));d.position.x=r;sp.add(d);g.add(sp);
    g.rotation.set(1+i*.7,i*.9,0);G.add(g);return{g,sp,s}});
  const N=1700,pos=new Float32Array(N*3);
  for(let i=0;i<N;i++){const r=3.6+Math.random()*7,a=Math.random()*6.283,b=Math.acos(2*Math.random()-1);pos.set([r*Math.sin(b)*Math.cos(a),r*Math.sin(b)*Math.sin(a),r*Math.cos(b)],i*3)}
  const cn=document.createElement("canvas");cn.width=cn.height=64;const x=cn.getContext("2d"),gr=x.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,"#fff");gr.addColorStop(.4,"rgba(255,255,255,.4)");gr.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=gr;x.fillRect(0,0,64,64);
  const pg=new THREE.BufferGeometry();pg.setAttribute("position",new THREE.BufferAttribute(pos,3));
  const pts=new THREE.Points(pg,new THREE.PointsMaterial({size:.11,map:new THREE.CanvasTexture(cn),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,color:0x9fb4ff}));S.add(pts);
  let mx=0,my=0,sy=0,raf,lt=0;const rm=matchMedia("(prefers-reduced-motion: reduce)").matches?.2:1,clk=new THREE.Clock();
  const mv=e=>{mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1};
  const size=()=>{R.setSize(innerWidth,innerHeight,false);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix()};
  addEventListener("pointermove",mv);addEventListener("resize",size);size();
  (function tick(){raf=requestAnimationFrame(tick);const t=clk.getElapsedTime()*rm;U.t.value=t;const dt=t-lt;lt=t;
    W.forEach(o=>{const x=o.g.position;x.x+=o.v*dt;if(x.x>15)x.x=-15;if(x.x<-15)x.x=15;const w=t*6+o.ph;o.p.legs[0].rotation.x=Math.sin(w)*.7;o.p.legs[1].rotation.x=-Math.sin(w)*.7;o.p.arms[0].rotation.x=-Math.sin(w)*.6;o.p.arms[1].rotation.x=Math.sin(w)*.6;o.p.g.position.y=Math.abs(Math.cos(w))*.04});
    const wide=innerWidth>820,small=innerWidth<600;sy+=(Math.min(scrollY/innerHeight,1)-sy)*.07;
    G.position.x=wide?2.2*(1-sy):0;G.position.y=wide?0:(small?2.75:1.5)*(1-sy);
    G.scale.setScalar((wide?1:small?.58:.72)*(1-.35*sy));cv.style.opacity=(1-.6*sy)*(wide?1:.55);
    U.m.value+=((Math.hypot(mx,my)<.55?1:0)-U.m.value)*.05;
    orb.rotation.y=t*.15;rings.forEach((o,i)=>{o.sp.rotation.z=t*o.s*2;o.g.rotation.x+=.0015*o.s;o.g.rotation.y+=.001*(i+1)});
    pts.rotation.y=t*.03+mx*.12;pts.rotation.x=my*.08;
    C.position.x+=(mx*.4-C.position.x)*.04;C.position.y+=(-my*.3-C.position.y)*.04;C.lookAt(0,0,0);R.render(S,C)})();
  return()=>{cancelAnimationFrame(raf);removeEventListener("pointermove",mv);removeEventListener("resize",size)}
}

