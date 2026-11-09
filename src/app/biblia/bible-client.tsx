"use client";
import { useEffect,useState } from "react";
import { builtInTranslation,listTranslations,type BibleTranslation } from "@/lib/firestore";
export default function BibleClient(){const [items,setItems]=useState<BibleTranslation[]|null>(null);useEffect(()=>{listTranslations().then(setItems).catch(()=>setItems([builtInTranslation]));},[]);if(!items)return <p aria-live="polite">Carregando traduções…</p>;return <><ul className="book">{items.map(t=><li key={t.id}><b>{t.name}</b><small>{t.code} · {t.attribution}</small></li>)}</ul>{items.length===1&&items[0].id==="builtin-blivre"&&<div className="empty">Bíblia Livre está disponível como referência inicial. Entre como root e importe o arquivo em Administração para indexá-la no seu Firebase.</div>}</>}
