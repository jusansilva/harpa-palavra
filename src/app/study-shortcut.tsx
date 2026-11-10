"use client";
import { onAuthStateChanged,type User } from "firebase/auth";
import { useEffect,useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase";
export default function StudyShortcut(){const [user,setUser]=useState<User|null|undefined>(undefined);useEffect(()=>onAuthStateChanged(getFirebaseAuth(),setUser),[]);if(!user)return null;return <a className="app-shortcut study-shortcut" href="/estudo"><span className="app-icon" aria-hidden="true">📖</span><b>Estudo</b></a>}
