import React,{useEffect,useRef} from "react";
import {LINKS,EDU,SK,PR,GH,WA} from "./data.js";
import useType from "./hooks/useType.js";
import Tele from "./components/Tele.jsx";
import {scene,office} from "./three.js";
import PHOTO from "./assets/photo.webp";
import LOGO from "./assets/logo.webp";
import ABOUT from "./assets/about.jpg";
const h=React.createElement;

export default function App(){
  const oref=useRef();useEffect(()=>scene(),[]);useEffect(()=>office(oref.current),[]);
  const role=useType(["B.Tech CSE student","AI and machine learning learner","Full stack developer","Tech teacher on YouTube"]);
  return h("main",null,
    h("nav",null,h("a",{href:"#home",className:"logo","aria-label":"Amit Kumar, home"},h("img",{src:LOGO,alt:""}),h("b",null,"Amit")),["About","Education","Skills","Projects","Contact"].map(n=>h("a",{key:n,href:"#"+n.toLowerCase()},n))),
    h("header",{className:"hero",id:"home"},h("div",{className:"wrap"},
      h("h1",null,"Amit",h("br"),"Kumar"),
      h("div",{className:"role"},"I’m a "+role,h("b")),
      h("p",null,"I study Computer Science Engineering and build web apps and AI projects. I also teach code on my YouTube channel, Quick Tech Point."),
      h("div",{className:"btns"},h("a",{className:"btn p",href:"#projects"},"See my projects"),h("a",{className:"btn",href:"#contact"},"Get in touch"),h("a",{className:"btn",href:"document/amit.pdf",download:"Amit-Kumar-CV.pdf"},"Download CV"))),
      h(Tele)),
    h("section",{id:"about"},h("div",{className:"wrap"},h("div",{className:"about"},
      h("div",{className:"ava"},h("div",{className:"in"},h("img",{src:PHOTO,alt:"Portrait of Amit Kumar"})),h("div",{className:"orbit"},h("span")),h("div",{className:"orbit r"},h("span"))),
      h("div",{className:"glass"},h("h2",{style:{marginBottom:20}},"About me"),
        h("p",null,"I’m Amit, from Maharajganj, Uttar Pradesh. I started with a diploma in Computer Science and now study B.Tech in Computer Science Engineering at Lokmata Devi Ahilyabai Holkar Rajkiya Engineering College, Mainpuri."),
        h("p",null,"I completed a 2-month Foundation AI course at NIELIT and 45 days of Core Java training at Softpro India. I like turning ideas into working software, from clean web interfaces to AI apps. Off screen, I play badminton and speak fluent Hindi."),h("img",{className:"apic",src:ABOUT,alt:"Amit Kumar"}))))),
    h("section",{id:"workspace"},h("div",{className:"wrap"},h("h2",null,"Where I build"),h("div",{className:"glass office"},h("canvas",{ref:oref})))),
    h("section",{id:"education"},h("div",{className:"wrap"},h("h2",null,"Education"),
      h("div",{className:"tl"},EDU.map(([y,t,s,n,now])=>h("div",{key:y,className:"glass ev"+(now?" now":"")},h("span",{className:"yr"},y),h("h3",null,t),h("p",null,s),h("p",null,n)))))),
    h("section",{id:"skills"},h("div",{className:"wrap"},h("h2",null,"Skills"),
      h("div",{className:"cloud"},SK.map(([n,v],i)=>h("div",{key:n,className:"sk",style:{"--d":(64+(v-60)*1.7)+"px","--c":[265,190,15][i%3],animationDelay:-(i*.9)+"s"}},h("span",null,n),h("small",null,v+"%")))))),
    h("section",{id:"projects"},h("div",{className:"wrap"},h("h2",{style:{marginBottom:22}},"Projects"),h("a",{className:"btn",style:{display:"inline-block",marginBottom:28},href:GH,target:"_blank",rel:"noopener"},"See all on GitHub"),
      h("div",{className:"grid"},PR.map(([t,d,tg,c])=>h("a",{key:t,className:"glass card",href:GH,target:"_blank",rel:"noopener"},h("div",{className:"pi",style:{"--c":c}}),h("h3",null,t),h("p",null,d),h("div",{className:"tags"},tg.map(x=>h("span",{key:x},x)))))))),
    h("section",{id:"contact"},h("div",{className:"wrap"},h("div",{className:"glass contact"},h("h2",null,"Let’s build something"),
      h("p",null,"Open to internships, collaborations and AI project ideas. Message me on any of these."),
      h("div",{className:"links",style:{marginBottom:26}},["Maharajganj, Uttar Pradesh","B.Tech at Mainpuri"].map(x=>h("span",{key:x,className:"chip"},x))),
      h("div",{className:"links"},LINKS.map(([n,u])=>h("a",{key:n,className:"btn"+(n==="WhatsApp"?" p":""),href:u,target:"_blank",rel:"noopener"},n)))))),
    h("footer",null,h("a",{href:GH,target:"_blank",rel:"noopener"},"GitHub"),"  |  ",h("a",{href:WA,target:"_blank",rel:"noopener"},"WhatsApp"),h("br"),"© 2026 Amit Kumar"))
}
