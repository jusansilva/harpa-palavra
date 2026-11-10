import { collection,getDocs } from "firebase/firestore";
import { getDb } from "./firebase";
const bibleOfflineKey="harpa-palavra:bible-offline-v1";
export function hasBibleOfflineCopy(){return typeof window!=="undefined"&&localStorage.getItem(bibleOfflineKey)==="complete";}
export async function downloadOffline(onProgress:(label:string)=>void){const db=getDb();onProgress("Baixando versículos para leitura offline…");const verses=await getDocs(collection(db,"bibleVerses"));localStorage.setItem(bibleOfflineKey,"complete");onProgress(`${verses.size.toLocaleString("pt-BR")} versículos disponíveis offline.`);}
