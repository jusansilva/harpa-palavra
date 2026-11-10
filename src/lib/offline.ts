import { collection,getDocs } from "firebase/firestore";
import { getDb } from "./firebase";
export async function downloadOffline(onProgress:(label:string)=>void){const db=getDb();onProgress("Baixando versículos para leitura offline…");const verses=await getDocs(collection(db,"bibleVerses"));onProgress(`${verses.size.toLocaleString("pt-BR")} versículos salvos. Baixando hinos…`);const hymns=await getDocs(collection(db,"hymns"));onProgress(`${verses.size.toLocaleString("pt-BR")} versículos e ${hymns.size.toLocaleString("pt-BR")} hinos disponíveis offline.`);}
