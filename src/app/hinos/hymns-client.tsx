"use client";

import { useEffect, useState } from "react";
import { listHymns, type Hymn } from "@/lib/firestore";

function hymnSlug(title: string) {
  return title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function cifraClubUrl(hymn: Hymn) {
  const slug = hymnSlug(hymn.title);
  return `https://www.cifraclub.com.br/harpa-crista/${slug}/`;
}

export default function HymnsClient() {
  const [items, setItems] = useState<Hymn[] | null>(null);
  const [selected, setSelected] = useState(0);
  const [error, setError] = useState("");
  useEffect(() => { listHymns().then(setItems).catch((caught) => { setError(caught instanceof Error ? caught.message : "Erro ao consultar o Firestore."); setItems([]); }); }, []);
  if (items === null) return <p aria-live="polite">Carregando repertório…</p>;
  if (!items.length) return <div className="empty">{error ? `Não foi possível carregar a Harpa: ${error}` : "Ainda não há hinos autorizados importados. Use Administração → selecione o arquivo → Iniciar importação."}</div>;
  const hymn = items[selected];
  const cifraUrl = cifraClubUrl(hymn);
  const selectHymn = (index: number) => setSelected(index);
  return <><article className="hymn-reader"><p className="eyebrow">HINO {hymn.number}{hymn.key && ` · TOM ${hymn.key}`}</p><h2>{hymn.title}</h2><div className="lyrics-source"><a href={cifraUrl} target="_blank" rel="noopener noreferrer">Abrir “{hymn.title}” no Cifra Club ↗</a><iframe key={cifraUrl} title={`${hymn.title} — Cifra Club`} src={cifraUrl} /></div><small>Conteúdo autorizado: {hymn.license}</small><div className="chapter-nav"><button disabled={selected === 0} onClick={() => selectHymn(selected - 1)}>← Hino anterior</button><button disabled={selected === items.length - 1} onClick={() => selectHymn(selected + 1)}>Próximo hino →</button></div></article><ol className="book">{items.map((item, index) => <li key={item.id}><button className="hymn-link" onClick={() => selectHymn(index)}><b>{item.number}. {item.title}</b><small>{item.author || "Autor não informado"}</small></button></li>)}</ol></>;
}
