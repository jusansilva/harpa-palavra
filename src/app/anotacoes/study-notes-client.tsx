"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase";
import { listStudyNotes, type StudyNote } from "@/lib/firestore";

export default function StudyNotesClient() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [notes, setNotes] = useState<StudyNote[] | null>(null);
  useEffect(() => onAuthStateChanged(getFirebaseAuth(), setUser), []);
  useEffect(() => { if (!user) { setNotes(null); return; } listStudyNotes(user.uid).then(setNotes).catch(() => setNotes([])); }, [user]);
  if (user === undefined) return <p>Carregando sua conta…</p>;
  if (!user) return <div className="empty">Entre para acessar suas anotações de estudo. <a href="/entrar">Entrar</a></div>;
  if (notes === null) return <p>Carregando suas anotações…</p>;
  if (!notes.length) return <div className="empty">Você ainda não criou anotações. Selecione um trecho na Bíblia e registre seu estudo.</div>;
  return <div className="study-notes">{notes.map((note) => <article key={note.id}><p className="eyebrow">{note.bookName} {note.chapter}:{note.verse}</p><q>{note.quote}</q><p>{note.body}</p><small>{new Date(note.updatedAt).toLocaleDateString("pt-BR")}</small><a className="button" href={`/biblia?book=${note.bookPosition}&chapter=${note.chapter}&verse=${note.verse}`}>Ir para o versículo</a></article>)}</div>;
}
