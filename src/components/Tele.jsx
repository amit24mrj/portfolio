import React,{useState,useEffect} from "react";
const h=React.createElement;
export default function Tele(){const[l,setL]=useState(.0421);useEffect(()=>{let e=0;const id=setInterval(()=>{e++;setL(.02+.04*Math.exp(-(e%400)/120)+Math.random()*.004)},160);return()=>clearInterval(id)},[]);return h("div",{className:"tele"},h("i"),"model online",h("b",null,"loss "+l.toFixed(4)))}

