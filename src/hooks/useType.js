import {useState,useEffect} from "react";
export default function useType(words){const[s,set]=useState("");useEffect(()=>{let i=0,j=0,del=false,id;const step=()=>{const w=words[i];j+=del?-1:1;set(w.slice(0,j));let d=del?35:70;if(!del&&j===w.length){del=true;d=1500}else if(del&&j===0){del=false;i=(i+1)%words.length;d=300}id=setTimeout(step,d)};step();return()=>clearTimeout(id)},[]);return s}

