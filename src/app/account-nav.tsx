"use client";
import { onAuthStateChanged,signOut,type User } from "firebase/auth";
import { useEffect,useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase";
const root="jusanmagno@gmail.com";
export default function AccountNav(){const [user,setUser]=useState<User|null>(null),[open,setOpen]=useState(false);useEffect(()=>onAuthStateChanged(getFirebaseAuth(),setUser),[]);if(!user)return <a href="/entrar">Entrar</a>;const initial=(user.displayName||user.email||"U").slice(0,1).toUpperCase();return <><>{user.email===root&&<a href="/admin">Admin</a>}</><div className="account"><button aria-label="Abrir menu da conta" aria-expanded={open} className="avatar" onClick={()=>setOpen(!open)}>{user.photoURL?<img src={user.photoURL} alt=""/>:initial}</button>{open&&<div className="account-menu"><small>{user.email}</small><a href="/anotacoes" onClick={()=>setOpen(false)}>Anotações de estudo</a><button onClick={()=>signOut(getFirebaseAuth())}>Sair</button></div>}</div></>}
