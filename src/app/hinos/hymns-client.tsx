"use client";
import { useEffect,useState } from "react";
import { listHymns, type Hymn } from "@/lib/firestore";
export default function HymnsClient(){const [items,setItems]=useState<Hymn[]|null>(null);useEffect(()=>{listHymns().then(setItems).catch(()=>setItems([]));},[]);if(items===null)return <p aria-live="polite">Carregando repertório…</p>;return items.length?<ol className="book">{items.map(h=><li key={h.id}><b>{h.number}. {h.title}</b><small>{h.author||"Autor não informado"}</small></li>)}</ol>:<div className="empty">Ainda não há hinos autorizados importados.</div>}
